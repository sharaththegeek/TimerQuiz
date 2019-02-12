# -*- coding: utf-8 -*-
# Generated by Django 1.11.15 on 2019-02-12 16:40
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('quiz', '0002_question_option4'),
    ]

    operations = [
        migrations.CreateModel(
            name='Participant',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('teamid', models.CharField(max_length=20)),
                ('name1', models.CharField(max_length=60)),
                ('name2', models.CharField(max_length=50)),
                ('score', models.IntegerField()),
            ],
        ),
    ]