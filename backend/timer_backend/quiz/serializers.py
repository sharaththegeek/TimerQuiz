from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from .models import Question
from .models import Participant

class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model=Question
        fields=('id','question','option1','option2','option3','option4')

class ParticipantSerializer(serializers.ModelSerializer):
    teamid=serializers.CharField(required=True,validators=[UniqueValidator(queryset=Participant.objects.all())])
    name1=serializers.CharField(max_length=60)
    name2=serializers.CharField(max_length=50)

    def create(self,validated_data):
        participant=Participant(teamid=validated_data['teamid'],name1=name1,name2=name2,score=0)
        participant.save()
        return participant

    class Meta:
        model=Participant
        fields=('teamid','name1','name2','score')