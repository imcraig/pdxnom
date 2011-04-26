from django.db import models

# Create your models here.
from django.db import models
from django.contrib.auth.models import User

class Cart(models.Model):
    start       = models.DateTimeField()
    end         = models.DateTimeField()
    completed   = models.BooleanField()
    created_by  = models.ForeignKey(User)
    created_at  = models.DateTimeField()
    description = models.TextField()
    name = models.TextField()
    
`
