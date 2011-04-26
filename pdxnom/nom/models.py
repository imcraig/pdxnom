from django.db import models

# Create your models here.
from django.db import models
from django.contrib.auth.models import User

class Cart(models.Model):
    name                = models.TextField()
    description         = models.TextField()
    latitude            = models.NumberField()
    longitude           = models.NumberField()
    website             = models.TextField()
    twitter             = models.TextField()
    facebook            = models.TextField()
    updated             = models.DateTimeField()
    cash_only           = models.BooleanField()
    vegetarian_friendly = models.BooleanField()
    vegan_friendly      = models.BooleanField()
    is_mobile           = models.BooleanField()
