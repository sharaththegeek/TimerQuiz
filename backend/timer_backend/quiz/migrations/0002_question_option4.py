# -*- coding: utf-8 -*-
# Generated by Django 1.11.15 on 2019-02-10 04:27
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('quiz', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='question',
            name='option4',
            field=models.CharField(default='null', max_length=300),
            preserve_default=False,
        ),
    ]