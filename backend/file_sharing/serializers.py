# file_sharing/serializers.py
from rest_framework import serializers
from .models import File, Share, Comment

class FileSerializer(serializers.ModelSerializer):
    class Meta:
        model = File
        fields = ['id', 'name', 'description', 'upload_date', 'expiration_date', 'file_data']


class ShareSerializer(serializers.ModelSerializer):
    class Meta:
        model = Share
        fields = ['shared_with', 'can_view', 'can_comment']


class CommentSerializer(serializers.ModelSerializer):
    # file file field not required
    class Meta:
        model = Comment
        fields = ['id', 'content']