from django.db import models
from django.contrib.auth.models import User

class Owner(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    nume = models.CharField(max_length=100)
    prenume = models.CharField(max_length=100)
    nr_incasari = models.BigIntegerField()

class Client(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    nume = models.CharField(max_length=100)
    prenume = models.CharField(max_length=100)
    nr_masini = models.BigIntegerField()

class Worker(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    nume = models.CharField(max_length=100)
    prenume = models.CharField(max_length=100)
    nr_ani_experienta = models.BigIntegerField()

# Subtipuri Worker
class Mechanic(models.Model):
    worker = models.OneToOneField(Worker, on_delete=models.CASCADE)
    unelte_folosite = models.CharField(max_length=200)
    specializare = models.CharField(max_length=200)

class Engineer(models.Model):
    worker = models.OneToOneField(Worker, on_delete=models.CASCADE)
    tip_masina_lucru = models.CharField(max_length=200)
    nr_inspectii_completate = models.BigIntegerField()





# Booking + specializari

STATUS_CHOICES = [
    ('pending', 'Pending'),
    ('accepted', 'Accepted'),
    ('rejected', 'Rejected'),
]

class Booking(models.Model):
    client = models.ForeignKey(Client, on_delete=models.CASCADE)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    pret_total = models.BigIntegerField()

class Repair(models.Model):
    booking = models.OneToOneField(Booking, on_delete=models.CASCADE)
    data_creare = models.DateTimeField()
    pret_total_piese = models.BigIntegerField()
    pret_manopera = models.BigIntegerField()

class Inspection(models.Model):
    booking = models.OneToOneField(Booking, on_delete=models.CASCADE)
    data_creare = models.DateTimeField()
    durata_inspectie = models.DateTimeField()
    pret_manopera = models.BigIntegerField()
