from django.shortcuts import render
from rest_framework import viewsets
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import QuestionSerializer
from .serializers import ParticipantSerializer
from .models import Participant
from .models import Question
from rest_framework import generics
# Create your views here.

class QuestionView(APIView):
    def get(self,request):
        questions=Question.objects.all()
        serializer=QuestionSerializer(questions,many=True)
        return Response({"questions":serializer.data})

class ParticipantView(APIView):
    def get(self,request):
        participant=Participant.objects.all()
        serializer=ParticipantSerializer(participant,many=True)
        return Response({"participant":serializer.data})
    
    def post(self,request):
        registered=request.data.get('participant')
        #Create a new user from POST data
        serializer=ParticipantSerializer(data=registered)
        if serializer.is_valid(raise_exception=True):
            register_saved=serializer.save()
        return Response({"success":"Created Successfully"})
