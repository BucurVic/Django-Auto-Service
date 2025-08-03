from django.shortcuts import render
from rest_framework import viewsets
from .models import Booking, Repair, Inspection, Client, Worker
from django.contrib.auth.models import User
from .serializers import BookingSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from rest_framework.authtoken.models import Token
from rest_framework.response import Response

from django.utils import timezone

class BookingViewSet(viewsets.ModelViewSet):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer
    permission_classes = [IsAuthenticated]

@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request):
    username = request.data.get('username')
    password = request.data.get('password')
    role = request.data.get('role')

    nr_masini = request.data.get('nr_masini')
    nr_ani_experienta = request.data.get('nr_ani_experienta')


    if not username or not password or not role:
        return Response({'error': 'Missing fields'}, status=400)

    if User.objects.filter(username=username).exists():
        return Response({'error': 'Username already taken'}, status=400)

    user = User.objects.create_user(username=username, password=password)

    if role == 'client':
        if nr_masini is None:
            return Response({'error': 'nr_masini is required for clients'}, status=400)
        Client.objects.create(user=user, nume="Nume", prenume="Prenume", nr_masini=1)
    elif role == 'worker':
        if nr_ani_experienta is None:
            return Response({'error': 'nr_ani_experienta is required for workers'}, status=400)
        Worker.objects.create(user=user, nume="Nume", prenume="Prenume", nr_ani_experienta=0)
    # elif role == 'owner':
    #     Owner.objects.create(user=user, nume="Nume", prenume="Prenume", nr_incasari=0)
    else:
        user.delete()
        return Response({'error': 'Rol invalid'}, status=400)

    token, _ = Token.objects.get_or_create(user=user)

    return Response({'message': 'User created', 'token': token.key}, status=201)



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_booking(request):
    user = request.user
    print("USER:", user)
    print("USER ID:", user.id)
    try:
        client = Client.objects.get(user=user)
        print("CLIENT găsit:", client.id)

    except Client.DoesNotExist:
        return Response({'error': 'User is not a client'}, status=403)

    pret_total = request.data.get('pret_total')
    booking_type = request.data.get('booking_type')

    try:
        pret_total = int(pret_total)
    except (ValueError, TypeError):
        return Response({'error': 'Prețul total trebuie să fie un număr.'}, status=400)

    if not pret_total or not booking_type:
        return Response({'error': 'Missing fields'}, status=400)
    print("Creare booking cu: pret_total =", pret_total, "tip =", booking_type)

    booking = Booking.objects.create(client=client,  pret_total=pret_total, status='pending')

    if booking_type == 'repair':
        Repair.objects.create(
            booking=booking,
            data_creare=timezone.now(),
            pret_total_piese=0,
            pret_manopera=0,
        )
    elif booking_type == 'inspection':
        Inspection.objects.create(
            booking=booking,
            data_creare=timezone.now(),
            durata_inspectie=timezone.now(),  # temporar
            pret_manopera=0,
        )
    else:
        return Response({'error': 'Invalid booking_type'}, status=400)

    return Response({'message': 'Booking created'}, status=201)