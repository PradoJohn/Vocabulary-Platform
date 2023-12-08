# Custom Imports
from user_profile.views import UserPermisions
from .helpers import generate_text
from .serializer import Conversation, ConversationSerializer
from word_app.serializers import Word, WordSerializer
from user_profile.models import UserProfile

# Imported Library
from rest_framework import status
from rest_framework.response import Response
from django.shortcuts import render
import re
from spellchecker import SpellChecker

class StartConversation(UserPermisions):
  # Get user from UserProfile model
  def get_user_profile(self, user):
    try:
      return user.userprofile
    except UserProfile.DoesNotExist:
      return None

  # Auto Prompt Generator
  def get(self, request, word):
    try:
      user_account = self.get_user_profile(request.user)
      if user_account.is_premium == True:
        if not word:
          return Response({"error":"Check spelling and Prompt must be related to the word."}, status=status.HTTP_400_BAD_REQUEST)
        prompt = f"Could you break down the meaning of {word} in a way that's easy to understand and provide an example to illustrate its usage?"
        # Generate AI response based on the pre_prompt
        ai_response = generate_text(prompt)
        # Retrieve or create the Word instance
        word_instance, created = Word.objects.get_or_create(word=word, user=request.user)
        # Create a Conversation instance and associate it with the Word
        conversation = Conversation.objects.create(
          user=request.user,
          user_input=prompt,
          ai_response=ai_response,
          related_word=word_instance,
        )
        # Serialize the conversation for the API response
        serializer = ConversationSerializer(conversation)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
      else:
        return Response({"error": "Upgrade to Premium"}, status=status.HTTP_403_FORBIDDEN)
    except Exception as e:
      print(e)
      return Response("An error occurred", status=status.HTTP_400_BAD_REQUEST)
    
  # Custom Prompt
  def post(self, request):
    try:
      user_account = self.get_user_profile(request.user)
      if user_account.is_premium == True:
        data = request.data
        word =  data.get('word').lower()
        prompt = data.get('prompt').lower()

        # Use regex to check if the word is present in the prompt
        if not re.search(word, prompt):
          return Response({"error":"Check spelling and Prompt must be related to the word."}, status=status.HTTP_400_BAD_REQUEST)
        
        ai_response = generate_text(prompt)
        word_instance, created = Word.objects.get_or_create(word=word, user=request.user)
        conversation = Conversation.objects.create(
          user=request.user,
          user_input=prompt,
          ai_response=ai_response,
          related_word=word_instance,
        )
        # Serialize the conversation for the API response
        serializer = ConversationSerializer(conversation)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
      else:
        return Response({"error": "Upgrade to Premium"}, status=status.HTTP_403_FORBIDDEN)
    except Exception as e:
      print(e)
      return Response("An error occurred", status=status.HTTP_400_BAD_REQUEST)


  def check_spelling(self, word):
    spell = SpellChecker()
    # Check if the word is misspelled
    if spell.unknown([word]):
        return f"{word} is misspelled"
    return word