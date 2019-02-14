from django.shortcuts import render
from rest_framework import viewsets
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import QuestionSerializer
from .serializers import ParticipantSerializer
from .models import Participant
from .models import Question
import json
from rest_framework import generics
# Create your views here.

class QuestionView(APIView):
    def get(self,request):
        questions=Question.objects.all()
        serializer=QuestionSerializer(questions,many=True)
        return Response({"questions":serializer.data})

class ParticipantView(APIView):
    def get(self,request):
        participant=Participant.objects.all().order_by('-score')
        serializer=ParticipantSerializer(participant,many=True)
        return Response({"participant":serializer.data})
    
    def post(self,request):
        registered=request.data.get('participant')
        #Create a new user from POST data
        serializer=ParticipantSerializer(data=registered)
        if serializer.is_valid(raise_exception=True):
            register_saved=serializer.save()
        return Response({"success":"Created Successfully"})

class ScoreView(APIView):
    def post(self,request):
        score=0
        tid=" "
        submissions=request.data.get('selectedAns')
        for jval in submissions:
            quest=Question.objects.get(id=jval['id'])
            tid=jval['teamid']
            if quest.correctAns==jval['selected']:
                score=score+1
        saved_user=Participant.objects.get(teamid=tid)
        saved_user.score=score
        saved_user.save()
        return Response({"score":score})
        
class OneParticipant(generics.ListAPIView):
    def get_object(self,tid):
        try:
            return Participant.objects.get(teamid=tid)
        except Participant.DoesNotExist:
            raise Http404
    
    def get(self,request,tid,format=None):
        part=self.get_object(tid)
        serializer=ParticipantSerializer(part)
        return Response({"yourscore":serializer.data})