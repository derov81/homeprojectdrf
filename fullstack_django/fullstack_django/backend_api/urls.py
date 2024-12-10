from django.urls import path, include
from rest_framework import routers
from .views import YouTubeVideoView

router = routers.DefaultRouter()
router.register('backend_api', YouTubeVideoView)

urlpatterns = [
    path('', include(router.urls)),
]