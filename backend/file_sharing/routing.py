# routing.py

from django.urls import re_path
from .consumers import CommentConsumer
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack

websocket_urlpatterns = [
    re_path(r'ws/file/(?P<file_id>\d+)/comments/$', CommentConsumer.as_asgi()),
]


# application = ProtocolTypeRouter({
#     "websocket": AuthMiddlewareStack(
#         URLRouter(websocket_urlpatterns)
#     ),
#     # Add other protocols if needed
# })