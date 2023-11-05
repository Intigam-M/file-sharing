# consumers.py

from channels.generic.websocket import AsyncWebsocketConsumer

class CommentConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        file_id = self.scope['url_route']['kwargs']['file_id']
        self.room_name = f'file_{file_id}_comments'
        self.room_group_name = f'comments_{file_id}'

        # Join room group
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        # Leave room group
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    async def receive(self, text_data):
        # Receive message from WebSocket
        # Process the incoming message, e.g., save the comment to the database
        # Send the message to the room group
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'comment_message',
                'message': 'New Comment Content',
                # Add any necessary data to be sent to the clients
            }
        )

    # Receive message from room group
    async def comment_message(self, event):
        # Send message to WebSocket
        await self.send(text_data=event['message'])
