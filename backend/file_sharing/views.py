from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import PermissionDenied
from .models import File, Share, Comment
from .serializers import FileSerializer, ShareSerializer, CommentSerializer, ShareSimpleSerializer
from django.http import HttpResponse
from .tasks import delete_files_older_than_7_days
import os
from django.contrib.auth.models import User

class FileListView(generics.ListAPIView):
    serializer_class = FileSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        uploaded_files = File.objects.filter(uploader=self.request.user)
        shared_files = File.objects.filter(share__shared_with=self.request.user)
        return uploaded_files | shared_files


class AddFileView(generics.CreateAPIView):
    serializer_class = FileSerializer
    permission_classes = (IsAuthenticated,)

    def perform_create(self, serializer):
        serializer.save(uploader=self.request.user)


class DeleteFileView(generics.DestroyAPIView):
    queryset = File.objects.all()
    permission_classes = (IsAuthenticated,)

    def destroy(self, request, *args, **kwargs):
        try:
            file_instance = self.get_object()
            if file_instance.uploader == request.user:
                file_path = file_instance.file_data.path
                if os.path.exists(file_path):
                    os.remove(file_path)
                    file_instance.delete()
                    return Response({"detail": "File deleted successfully."}, status=status.HTTP_204_NO_CONTENT)
                else:
                    return Response({"detail": "File not found on the server."}, status=status.HTTP_404_NOT_FOUND)
            else:
                return Response({"detail": "You don't have permission to delete this file."}, status=status.HTTP_403_FORBIDDEN)
        except File.DoesNotExist:
            return Response({"detail": "File not found."}, status=status.HTTP_404_NOT_FOUND)


class ShareFileView(generics.CreateAPIView):
    queryset = Share.objects.all()
    serializer_class = ShareSerializer
    permission_classes = (IsAuthenticated,)

    def perform_create(self, serializer):
        email = self.request.query_params.get('email')
        user = User.objects.filter(email=email).first()
        if not user:
            raise PermissionDenied('User with this email does not exist.')
        file_id = self.kwargs.get('file_id')
        file_instance = File.objects.get(pk=file_id)
        check_share = Share.objects.filter(file=file_instance, shared_with=user).first()
        if check_share:
            raise PermissionDenied('File is already shared with this user.')

        serializer.save(file=file_instance, shared_with=user)


class FileDetailView(generics.RetrieveAPIView):
    queryset = File.objects.all()
    serializer_class = FileSerializer
    permission_classes = (IsAuthenticated,)

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        if instance.uploader == request.user or Share.objects.filter(file=instance, shared_with=request.user).exists():
            comments = Comment.objects.filter(file=instance)
            comment_serializer = CommentSerializer(comments, many=True)
            serializer = self.get_serializer(instance)
            data = serializer.data
            data['comments'] = comment_serializer.data
            if instance.uploader == request.user:
                data['share_data'] = {
                    "can_view": True,
                    "can_comment": True
                }
            else:
                share_data = Share.objects.filter(file=instance, shared_with=request.user).first()
                share_data_serializer = ShareSimpleSerializer(share_data)
                data['share_data'] = share_data_serializer.data
            return Response(data)
        else:
            return Response({'detail': 'You are not allowed to view this file.'}, status=status.HTTP_403_FORBIDDEN)


class AddCommentView(generics.CreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = (IsAuthenticated,)

    def perform_create(self, serializer):
        file_id = self.kwargs.get('file_id')
        file_instance = File.objects.get(pk=file_id)

        # Check if the user is the uploader of the file
        if file_instance.uploader == self.request.user:
            serializer.save(file=file_instance, author=self.request.user)
        else:
            # Check if the file is shared with the user for commenting
            share = Share.objects.filter(file=file_instance, shared_with=self.request.user, can_comment=True).first()
            if share:
                serializer.save(file=file_instance, author=self.request.user)
            else:
                raise PermissionDenied('You do not have permission to comment on this file.')


class EditCommentView(generics.UpdateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = (IsAuthenticated,)

    def update(self, request, *args, **kwargs):
        instance = self.get_object()

        if request.user == instance.author:
            serializer = self.get_serializer(instance, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data)
        else:
            return Response({'detail': 'You do not have permission to edit this comment.'}, status=status.HTTP_403_FORBIDDEN)


class DeleteCommentView(generics.DestroyAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = (IsAuthenticated,)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        if request.user == instance.author or request.user == instance.file.uploader:
            self.perform_destroy(instance)
            return Response({'detail': 'Comment deleted successfully.'}, status=status.HTTP_204_NO_CONTENT)
        else:
            return Response({'detail': 'You are not allowed to delete this comment.'}, status=status.HTTP_403_FORBIDDEN)

class SharedFileListView(generics.ListAPIView):
    serializer_class = ShareSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        my_files = File.objects.filter(uploader=self.request.user)
        share_list = Share.objects.filter(file__in=my_files)
        return share_list
      
class UpdateSharedDataView(generics.UpdateAPIView):
    queryset = Share.objects.all()
    serializer_class = ShareSerializer
    permission_classes = (IsAuthenticated,)

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        if request.user == instance.file.uploader:
            serializer = self.get_serializer(instance, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data)
        else:
            return Response({'detail': 'You do not have permission to edit this information.'}, status=status.HTTP_403_FORBIDDEN)
        
class StopSharingView(generics.DestroyAPIView):
    queryset = Share.objects.all()
    serializer_class = ShareSerializer
    permission_classes = (IsAuthenticated,)

    def destroy(self, request, *args, **kwargs):
        try:
            share_instance = self.get_object()
            if share_instance.file.uploader == request.user:
                share_instance.delete()
                return Response({"detail": "File sharing stopped successfully."}, status=status.HTTP_204_NO_CONTENT)
            else:
                return Response({"detail": "You don't have permission to stop sharing this file."}, status=status.HTTP_403_FORBIDDEN)
        except Share.DoesNotExist:
            return Response({"detail": "File not found."}, status=status.HTTP_404_NOT_FOUND)