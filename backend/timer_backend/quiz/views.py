from django.shortcuts import render
from rest_framework import viewsets
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import QuestionSerializer
from .serializers import ParticipantSerializer
from .models import Participant
from .models import Question
# Create your views here.

class QuestionView(viewsets.ModelViewSet):
    serializer_class=QuestionSerializer
    queryset=Question.objects.all()

