# Custom Imports
from user_profile.views import UserPermisions
from .helpers import generate_text
from .serializer import Conversation, ConversationSerializer
from word_app.serializers import Word, WordSerializer

# Imported Library
from rest_framework import status
from rest_framework.response import Response
from django.shortcuts import render

class StartConversation(UserPermisions):

  def get(self, request, word):
    pre_prompt = f"Could you break down the meaning of {word} in a way that's easy to understand and provide an example to illustrate its usage?"
    # Generate AI response based on the pre_prompt
    ai_response = generate_text(pre_prompt)

    # Retrieve or create the Word instance
    word_instance, ceated = Word.objects.get_or_create(word=word, user=request.user)

    # Create a Conversation instance and associate it with the Word
    conversation = Conversation.objects.create(
        user=request.user,
        user_input=pre_prompt,
        ai_response=ai_response,
        related_word=word_instance,
    )
    # Serialize the conversation for the API response
    serializer = ConversationSerializer(conversation)

    return Response(serializer.data, status=status.HTTP_201_CREATED)

    