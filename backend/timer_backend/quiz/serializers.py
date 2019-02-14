from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from .models import Question
from .models import Participant

class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model=Question
        fields=('id','question','option1','option2','option3','option4')

class ParticipantSerializer(serializers.ModelSerializer):
    class Meta:
        model=Participant
        fields=('teamid','name1','name2','score')
    
    def create(self,validated_data):
        return Participant.objects.create(**validated_data)

    def update(self,instance,validated_data):
        instance.teamid=validated_data.get('teamid',instance.teamid)
        instance.score=validated_data.get('score',instance.score)
        instance.save()
        return instance