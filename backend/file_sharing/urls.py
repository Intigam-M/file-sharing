from django.urls import path
from .views import ( 
    AddFileView, 
    DeleteFileView, 
    FileListView, 
    ShareFileView,
    AddCommentView,
    FileDetailView,
    DeleteCommentView,
    EditCommentView,
    SharedFileListView,
    UpdateSharedDataView,
    StopSharingView,
)
urlpatterns = [
    path('list/', FileListView.as_view(), name='file-list'),
    path('add/', AddFileView.as_view(), name='add-file'),
    path('delete/<int:pk>/', DeleteFileView.as_view(), name='delete-file'),
    path('<int:file_id>/share/', ShareFileView.as_view(), name='share-file'),
    path('<int:file_id>/comment/add/', AddCommentView.as_view(), name='add-comment'),
    path('<int:pk>/detail/', FileDetailView.as_view(), name='file-detail'),
    path('comment/delete/<int:pk>/', DeleteCommentView.as_view(), name='delete-comment'),
    path('comment/edit/<int:pk>/', EditCommentView.as_view(), name='edit-comment'),
    path('shared-list/', SharedFileListView.as_view(), name='shared-list'),
    path('update-shared-data/<int:pk>/', UpdateSharedDataView.as_view(), name='update-shared-data'),
    path('stop-sharing/<int:pk>/', StopSharingView.as_view(), name='stop-sharing'),
]
