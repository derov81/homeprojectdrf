from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser
from  . models import Tool
from .serializers import ToolSeralizer
from rest_framework import viewsets
from rest_framework import filters
from .permissions import CustomPermission
from rest_framework.decorators import permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework import generics
from .models import SliderImage
from .serializers import SliderImageSerializer
from .serializers import UserSerializer
from django.contrib.auth.models import User
from django.core.mail import send_mail
from .models import Feedback
from  .serializers import FeedbackSerializer

class ToolViewSet(viewsets.ModelViewSet):
    queryset = Tool.objects.all()
    serializer_class = ToolSeralizer
    permission_classes = [CustomPermission]
    filter_backends = [filters.SearchFilter]  #[filters.OrderingFilter]
    #filterset_class = ToolFilter
    search_fields = ['__all__']


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def protected_view(request):
    return Response({'message': 'Это защищенный эндпоинт'})


@api_view(['POST'])
@permission_classes([AllowAny])  # Разрешаем доступ без аутентификации
def register_user(request):
    try:
        username = request.data.get('username')
        password = request.data.get('password')
        email = request.data.get('email')

        if not username or not password:
            return Response(
                {'detail': 'Пожалуйста, укажите имя пользователя и пароль'},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Проверяем, существует ли пользователь
        if User.objects.filter(username=username).exists():
            return Response(
                {'detail': 'Пользователь с таким именем уже существует'},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Создаем нового пользователя
        user = User.objects.create_user(
            username=username,
            password=password,
            email=email
        )

        return Response(
            {'detail': 'Пользователь успешно создан'},
            status=status.HTTP_201_CREATED
        )

    except Exception as e:
        return Response(
            {'detail': str(e)},
            status=status.HTTP_400_BAD_REQUEST
        )

class SliderImageListCreate(generics.ListCreateAPIView):
    queryset = SliderImage.objects.all()
    serializer_class = SliderImageSerializer

class SliderImageDelete(generics.DestroyAPIView):
    queryset = SliderImage.objects.all()
    serializer_class = SliderImageSerializer


# Список пользователей
class UserListView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [CustomPermission]

# Работа с конкретным пользователем (просмотр, редактирование, удаление)
class UserDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [CustomPermission]

class FeedbackViewSet(viewsets.ModelViewSet):
    queryset = Feedback.objects.all().order_by('-create_at')
    serializer_class = FeedbackSerializer


    def get_permissions(self):
        if self.action in ['list', 'retrieve', 'update', 'destroy']:
            return  [IsAdminUser()] #Админ видит и редактирует заявки
        return [AllowAny()] #Любой пользователь может отправлять

    def perform_update(self, serializer):
        feedback = serializer.save()
        #Отправка email при ответе админа
        if feedback.status == 'answered' and  feedback.email:
            send_mail(
                'Ответ на ваш запрос',
                'Ваш запрос рассмотрен. Администратор ответит вам в ближайшее время.'
                'admin@example.com',
                [feedback.email],
                fail_silently= True,
            )


