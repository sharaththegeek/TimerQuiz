from django.db import models

# Create your models here.
class Question(models.Model):
    question=models.CharField(max_length=500)
    correctAns=models.CharField(max_length=300)
    option1=models.CharField(max_length=300)
    option2=models.CharField(max_length=300)
    option3=models.CharField(max_length=300)
    option4=models.CharField(max_length=300)

    def __str__(self):
        return self.question

class Participant(models.Model):
    teamid=models.CharField(primary_key=True,max_length=20)
    name1=models.CharField(max_length=60)
    name2=models.CharField(max_length=50)
    score=models.IntegerField()
    
    def __str__(self):
        return self.teamid