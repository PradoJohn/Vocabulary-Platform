
# custom imports 
from user_profile.views import UserPermissions
from .serializers import WordSerializer
from .models import Word

# library imports
from django.shortcuts import render, get_object_or_404
from rest_framework.response import Response
from rest_framework import status
import requests

# To allow Users search a word
class SearchWord(UserPermissions):
  def get(self, request, word):
    try:
      endpoint=f"https://api.dictionaryapi.dev/api/v2/entries/en/{word}"
      response = requests.get(endpoint)
      # check if the request was successful and return all JSON data
      if response.status_code == 200:
        data = response.json()
        return Response(data)
      
      return Response({'error': "Sorry! No an available definition in the current dictionary."}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
      print(e)
      return Response("An error occured", status=status.HTTP_400_BAD_REQUEST)
  
  # Allowing User to save the word 
  def post(self, request, word):
    try:
      # Check if the word exist in this endpoint
      word_exist = Word.objects.filter(word=word).exists()
      if not word_exist:
        endpoint = f"https://api.dictionaryapi.dev/api/v2/entries/en/{word}"
        response = requests.get(endpoint)

        if response.ok:
            # Assuming Word and WordSerializer are defined properly
            new_word = Word.objects.create(word=word, user=request.user)
            serializer = WordSerializer(new_word)
            return Response(serializer.data)
        else:
            return Response({'error': "Word not Found"}, status=response.status_code)
      else:
          return Response({'error': "Word already exists"}, status=status.HTTP_200_OK)
    except Exception as e:
          print(e)
          return Response("An error occurred", status=status.HTTP_400_BAD_REQUEST)
    
    
class SavedWords(UserPermissions):
  def get(self, request):
    # Retrieve all instances from the Word mode for that specific user
    word = Word.objects.filter(user=request.user)
    serializer = WordSerializer(word, many=True)
    return Response(serializer.data)
  
  def delete(self, request, word_id):
    word = get_object_or_404(Word, pk=word_id) # return Not Found if Object not exist
    
    # Double check current user
    if word.user != request.user:
        return Response({'error': 'Unauthorized access to the word'}, status=status.HTTP_403_FORBIDDEN)

    word.delete()
    return Response({'success': 'Word deleted successfully'}, status=status.HTTP_200_OK)


  def put(self, request, word_id):
    # Still planning whether adding a "note" field in the model is necessary
    pass
  


