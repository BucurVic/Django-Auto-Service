from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import BookingViewSet, create_booking
from rest_framework.authtoken.views import obtain_auth_token
from .views import register_user

router = DefaultRouter()
router.register(r'bookings', BookingViewSet)

urlpatterns = [
    path('bookings/create/', create_booking),
    path('register/', register_user),
    path('login/', obtain_auth_token),
    path('', include(router.urls))
]
