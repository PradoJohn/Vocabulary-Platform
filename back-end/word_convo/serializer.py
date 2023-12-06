from rest_framework import serializers
from .models import Conversation

class ConversationSerializer(serializers.ModelSerializer):
  class Meta:
    model = Conversation
    fields = ['user', 'related_word', 'user_input', 'ai_response']
