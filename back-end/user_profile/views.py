
# Imported Libraries
#from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
#from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
#from django.contrib.auth.hashers import make_password
# Custom Imports
from .serializers import UserSerializer
from .models import UserProfile

class SignUp(APIView):
  def post(self, request):
    try:
      serializer = UserSerializer(data=request.data)
      if serializer.is_valid():
        user = serializer.save()

        # Create a user profile for the newly created user
        UserProfile.objects.create(user=user, is_premium=False)
        token = Token.objects.create(user=user)
        
        # get the user profile to get is_premium value
        user_profile = UserProfile.objects.get(user=user)
        login(request, user)
        return Response({
          "user": user.username,
          "token": token.key,
          "is_premium": user_profile.is_premium,
        }, status=status.HTTP_201_CREATED)
      else:
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        print("Error:", e)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        

class LogIn(APIView):
  def post(self, request):
    try:
      # Get username and password only and authenticate
      un = request.data.get("username")
      pw = request.data.get("password")
      user = authenticate(request, username=un, password=pw)

      if user:
        token, created = Token.objects.get_or_create(user=user)
        login(request, user)
        return Response({"user": user.username, "token": token.key, "is_premium": user.userprofile.is_premium}, status=status.HTTP_200_OK)
      else:
        return Response("Invalid Credentials", status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
      print(e)
      return Response("Something went wrong", status=status.HTTP_400_BAD_REQUEST)

# Reusable super class for permission and authenticating User
class UserPermissions(APIView):
  authentication_classes=[TokenAuthentication]
  permission_classes=[IsAuthenticated]


class LogOut(UserPermissions):
  def post(self, request):
    request.user.auth_token.delete()
    logout(request)
    return Response(status=status.HTTP_204_NO_CONTENT)
  

class Account(UserPermissions):
    def get_user_profile(self, user):
      try:
        return user.userprofile # "userprofile is lowercased Model"
      except Exception as e:
        print(e)
        return Response("An Error occured", status=status.HTTP_404_NOT_FOUND)

    # to display user data
    def get(self, request):
      try:
        user_profile = self.get_user_profile(request.user)

        # Serialize the user and user profile data
        user_serializer = UserSerializer(instance=request.user)
        user_data = user_serializer.data

        # Extend the serialized data with is_premium, only if the user profile 
        user_data['is_premium'] = user_profile.is_premium

        return Response(user_data)
      except Exception as e:
        return Response(str(e), status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    # to update user data including password
    def put(self, request):
      user_profile = self.get_user_profile(request.user)

      if user_profile:
        # Serialize the user data excluding the password
        user_data = {key: value for key, value in request.data.items() if key != 'password'}
        user_serializer = UserSerializer(instance=request.user, data=user_data, partial=True)

        if user_serializer.is_valid():
          user_serializer.save()

          # Check user premium
          is_premium = request.data.get('is_premium')
          if is_premium is not None:
            user_profile.is_premium = is_premium
            user_profile.save()

          # Check if a new password is provided
          new_password = request.data.get('password')
          if new_password:
            # Set the new password and save the user
            request.user.set_password(new_password)
            request.user.save()

          return Response(user_serializer.validated_data, status=status.HTTP_200_OK)
        return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
      else:
        return Response("User Profile Not Found", status=status.HTTP_404_NOT_FOUND)