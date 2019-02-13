from django.conf.urls import url, include
from django.contrib import admin
from rest_framework import routers
from quiz.views import QuestionView
from quiz.views import ParticipantView

urlpatterns = [
    url(r'^questions/', QuestionView.as_view()),
    url(r'^participant/',ParticipantView.as_view()),
]
