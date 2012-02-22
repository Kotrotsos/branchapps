from django.db import models
from django import forms
from datetime import datetime

class EmailEntry(models.Model):
    email = models.EmailField()
    date_added = models.DateTimeField(default=datetime.now())

    class Form(forms.Form):
        email = forms.EmailField()
