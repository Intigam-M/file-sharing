# file_sharing/views.py
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import File, Share, Comment
from .serializers import FileSerializer, ShareSerializer, CommentSerializer




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
                file_instance.delete()
                return Response({"detail": "File deleted successfully."}, status=status.HTTP_204_NO_CONTENT)
            else:
                return Response({"detail": "You don't have permission to delete this file."}, status=status.HTTP_403_FORBIDDEN)
        except File.DoesNotExist:
            return Response({"detail": "File not found."}, status=status.HTTP_404_NOT_FOUND)
        

class ShareFileView(generics.CreateAPIView):
    queryset = Share.objects.all()
    serializer_class = ShareSerializer
    permission_classes = (IsAuthenticated,)

    def perform_create(self, serializer):
        file_id = self.kwargs.get('file_id')
        file_instance = File.objects.get(pk=file_id)
        serializer.save(file=file_instance)

class AddCommentView(generics.CreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = (IsAuthenticated,)

    def perform_create(self, serializer):
        file_id = self.kwargs.get('file_id')
        file_instance = File.objects.get(pk=file_id)
        serializer.save(file=file_instance, author=self.request.user)


class FileDetailView(generics.RetrieveAPIView):
    queryset = File.objects.all()
    serializer_class = FileSerializer
    permission_classes = (IsAuthenticated,)

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        comments = Comment.objects.filter(file=instance)
        comment_serializer = CommentSerializer(comments, many=True)
        serializer = self.get_serializer(instance)
        data = serializer.data
        data['comments'] = comment_serializer.data
        return Response(data)