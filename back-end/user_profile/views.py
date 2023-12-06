
# Imported Libraries
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.contrib.auth.hashers import make_password

# Custom Imports
from .serializers import UserSerializer


class SignUp(APIView):
  def post(self, request):
    try:
      serializer = UserSerializer(data=request.data)
      if serializer.is_valid():
        user = serializer.save()
        token = Token.objects.create(user=user)
        print("User:", user)
        print("Token:", token)
        return Response({"username": user.username, "token": token.key}, status=status.HTTP_201_CREATED)
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
        return Response({"username": user.username, "user-token": token.key}, status=status.HTTP_200_OK)
      else:
        return Response("Invalid Credentials", status=status.HTTP_401_UNAUTHORIZED)
    except Exception as e:
      print(e)
      return Response("Something went wrong", status=status.HTTP_400_BAD_REQUEST)

# Reusable super class for permission and authenticating User
class UserPermisions(APIView):
  authentication_classes=[TokenAuthentication]
  permission_classes=[IsAuthenticated]


class LogOut(UserPermisions):
  def post(self, request):
    request.user.auth_token.delete()
    return Response("Logged out", status=status.HTTP_204_NO_CONTENT)
  

class Account(UserPermisions):  # Assuming UserPermisions is a valid class
    # to display user data
    def get(self, request):
        user = UserSerializer(instance=request.user)
        return Response(user.data)

    # to update user data including password
    def put(self, request):
      # Serialize the user data excluding the password
      user_data = {key: value for key, value in request.data.items() if key != 'password'}
      user = UserSerializer(instance=request.user, data=user_data, partial=True)

      if user.is_valid():
        # Update user data excluding the password
        user.save()
        # Check if a new password is provided
        new_password = request.data.get('password')
        if new_password:
          # Set the new password and save the user
          request.user.password = make_password(new_password)
          request.user.save()

        return Response(user.validated_data)  # Return validated data
      return Response(user.errors, status=status.HTTP_400_BAD_REQUEST)