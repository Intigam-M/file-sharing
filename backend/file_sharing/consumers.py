from channels.generic.websocket import AsyncWebsocketConsumer
import json
from .models import Comment, File
from asgiref.sync import sync_to_async
from django.contrib.auth.models import User
from urllib.parse import parse_qs
from channels.db import database_sync_to_async
from .serializers import CommentSerializer



class CommentConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.file_id = self.scope['url_route']['kwargs']['file_id']
        self.room_name = f'file_{self.file_id}_comments'
        self.room_group_name = f'comments_{self.file_id}'

        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )
        await self.authenticate_user(self.scope)
        await self.accept()
 

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )



    async def receive(self, text_data):
        data = json.loads(text_data)
        comment_content = data['message']
        
        new_comment = await self.save_comment(comment_content) 
        serialized_comment = await self.new_comment_serializer(new_comment)
        json_comment = json.dumps(serialized_comment)

        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'comment_message',
                'message': json_comment,
            }
        )



    # Receive message from room group
    async def comment_message(self, event):
        # Send message to WebSocket
        await self.send(text_data=event['message'])



    @sync_to_async
    def save_comment(self, comment_content):
        comment = Comment(content=comment_content, file=File.objects.get(id=int(self.file_id)), author=self.scope['user'] )
        comment.save()
        return comment


    async def authenticate_user(self, scope):
        query_string = parse_qs(scope.get("query_string").decode())
        user_id = query_string.get("user_id", None)

        if user_id:
            user = await self.get_user(int(user_id[0]))
            scope['user'] = user

    @database_sync_to_async
    def get_user(self, user_id):
        return User.objects.get(pk=user_id)
    
    @sync_to_async
    def new_comment_serializer(self, comment):
       return CommentSerializer(comment).data