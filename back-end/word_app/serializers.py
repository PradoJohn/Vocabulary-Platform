from rest_framework import serializers
from .models import Word
from word_convo.models import Conversation

class WordSerializer(serializers.ModelSerializer):
    user_input = serializers.SerializerMethodField()
    ai_response = serializers.SerializerMethodField()
    
    class Meta:
        model = Word
        fields = ['id', 'word', 'created_at', 'user_input', 'ai_response']

    def get_user_input(self, obj):
      # Get user_input from the most recent related conversation
      last_conversation = obj.conversation_set.order_by('-created_at').first()

      return last_conversation.user_input if last_conversation else None


    def get_ai_response(self, obj):
        # Get ai_response from all related conversations
        conversations = obj.conversation_set.order_by('-created_at') # "conversation_set" will access reversed relationship
        ai_responses = [conversation.ai_response for conversation in conversations]
        return ai_responses if ai_responses else None
