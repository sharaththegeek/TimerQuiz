from django import forms
from .models import Participant

class CreateParticipant(forms.Form):
    teamid=forms.CharField(max_length=20)
    name1=forms.CharField(max_length=60)
    name2=forms.CharField(max_length=50)
    score=forms.IntegerField()