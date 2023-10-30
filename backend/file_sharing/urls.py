# file_sharing/urls.py
from django.urls import path
from .views import AddFileView

urlpatterns = [
    path('add/', AddFileView.as_view(), name='add-file'),
]
