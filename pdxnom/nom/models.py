from django.db import models

# Create your models here.
from django.db import models
from django.contrib.auth.models import User

class Cart(models.Model):
    name                = models.TextField(max_length=50, help_text="Name of the cart")
    description         = models.TextField(max_length=500, help_text="Cart description")
    latitude            = models.FloatField(help_text="Latitude of Cart in decimal")
    longitude           = models.FloatField(help_text="Longitude of Cart in decimal")
    website             = models.TextField(max_length=80, help_text="Cart website URL")
    twitter             = models.TextField(max_length=20, help_text="Cart twitter handle")
    facebook            = models.TextField(max_length=80, help_text="Cart facebook URL")
    updated             = models.DateTimeField()
    cash_only           = models.NullBooleanField()
    vegetarian_friendly = models.NullBooleanField()
    vegan_friendly      = models.NullBooleanField()
