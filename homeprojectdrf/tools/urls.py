from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import register_user, ToolViewSet, SliderImageListCreate, SliderImageDelete
from .views import UserListView, UserDetailView, FeedbackViewSet

router = routers.DefaultRouter()
router.register('tools', ToolViewSet)
router.register('feedback', FeedbackViewSet)  # <-- Исправление! Теперь работает автоматически

urlpatterns = [
    path('', include(router.urls)),  # <-- Добавляем все маршруты из роутера
    path('admin/', admin.site.urls),
    path('auth/', include('rest_framework.urls')),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', register_user, name='register'),
    path('images/', SliderImageListCreate.as_view(), name='image-list'),
    path('images/<int:pk>/', SliderImageDelete.as_view(), name='image-delete'),

    # API для работы с пользователями
    path('users/', UserListView.as_view(), name='user-list'),
    path('users/<int:pk>/', UserDetailView.as_view(), name='user-detail'),
]
