from django.db import models
from django.contrib.auth.models import User

class File(models.Model):
    uploader = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    description = models.TextField()
    upload_date = models.DateTimeField(auto_now_add=True)
    expiration_date = models.DateTimeField()

class Share(models.Model):
    file = models.ForeignKey(File, on_delete=models.CASCADE)
    shared_with = models.ForeignKey(User, on_delete=models.CASCADE, related_name='shared_with')
    can_view = models.BooleanField(default=True)
    can_comment = models.BooleanField(default=False)

class Comment(models.Model):
    file = models.ForeignKey(File, on_delete=models.CASCADE)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
