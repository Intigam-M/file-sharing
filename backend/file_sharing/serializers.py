# file_sharing/serializers.py
from rest_framework import serializers
from .models import File, Share, Comment
from user.serializers import UserInfoSerializer


class ShareSimpleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Share
        fields =  ['can_view', 'can_comment']


class FileSerializer(serializers.ModelSerializer):
    uploader = UserInfoSerializer(read_only=True)
    class Meta:
        model = File
        fields = ['id', 'uploader', 'name', 'description', 'upload_date', 'expiration_date', 'file_data']


class ShareSerializer(serializers.ModelSerializer):
    shared_with = UserInfoSerializer(read_only=True)
    file = FileSerializer(read_only=True)
    class Meta:
        model = Share
        fields = ['id', 'shared_with', 'can_view', 'can_comment', 'file']


class CommentSerializer(serializers.ModelSerializer):
    author = UserInfoSerializer(read_only=True)
    class Meta:
        model = Comment
        fields = ['id', 'content', 'author', 'timestamp']