from django.contrib import admin

# Register your models here.
from .models import Question
from .models import Participant

admin.site.register(Participant)
admin.site.register(Question)