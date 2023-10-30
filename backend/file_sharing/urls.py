from django.urls import path
from .views import AddFileView, DeleteFileView, FileListView, ShareFileView, AddCommentView, FileDetailView

urlpatterns = [
    path('list/', FileListView.as_view(), name='file-list'),
    path('add/', AddFileView.as_view(), name='add-file'),
    path('delete/<int:pk>/', DeleteFileView.as_view(), name='delete-file'),
    path('<int:file_id>/share/', ShareFileView.as_view(), name='share-file'),
    path('<int:file_id>/comment/add/', AddCommentView.as_view(), name='add-comment'),
    path('<int:pk>/detail/', FileDetailView.as_view(), name='file-detail'),
]
