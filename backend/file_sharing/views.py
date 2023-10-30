# file_sharing/views.py
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .models import File
from .serializers import FileSerializer

class AddFileView(generics.CreateAPIView):
    serializer_class = FileSerializer
    permission_classes = (IsAuthenticated,)

    def perform_create(self, serializer):
        serializer.save(uploader=self.request.user)
