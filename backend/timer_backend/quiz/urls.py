from django.conf.urls import url, include
from django.contrib import admin
from rest_framework import routers
from quiz.views import QuestionView
from quiz.views import ParticipantView
from quiz.views import OneParticipant
from quiz.views import ScoreView

urlpatterns = [
    url(r'^questions/', QuestionView.as_view()),
    url(r'^score/',ScoreView.as_view()),
    url(r'^participant/',ParticipantView.as_view()),
    url(r'^user/(?P<tid>[\w.@+-]+)/$',OneParticipant.as_view()),
]
