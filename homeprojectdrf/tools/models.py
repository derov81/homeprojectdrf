from django.core.validators import FileExtensionValidator
from django.db import models




#ONE VARIATION
class Order(models.Model):
    name = models.CharField(max_length=30)

    def __str__(self):
        return f'{self.name}'


class Detail(models.Model):
    name = models.CharField(max_length=30)
    order_id = models.ForeignKey(Order, null=True, on_delete=models.CASCADE)


    def __str__(self):
        return f'{self.name}'

class Operation(models.Model):
    name = models.CharField(max_length=30)
    detail_id = models.ForeignKey(Detail, null=True, on_delete=models.CASCADE)


    def __str__(self):
        return f'{self.name}'


class Tool(models.Model):
    brand_tool = models.CharField(max_length=60)
    type_tool = models.CharField(max_length=60)
    diametr = models.IntegerField()
    working_length_tool = models.IntegerField()
    length_tool = models.IntegerField()
    material_of_detail = models.CharField(max_length=60)
    material_of_tool = models.CharField(max_length=60)
    short_description = models.CharField(max_length=150, null=True)
    description = models.TextField(null=True)
    image_url = models.ImageField(upload_to='images', blank=True, null=True, default='images/nophoto.jpg')
    operation_id = models.ForeignKey(Operation, null=True, on_delete=models.CASCADE)




    def __str__(self):
        return (f'{self.brand_tool}-{self.type_tool}-{self.diametr} | {self.working_length_tool}mm | {self.length_tool}mm'
                f'| {self.material_of_detail}| {self.material_of_tool}| {self.short_description}'
                f'| {self.description}| {self.image_url}')

class Feedback(models.Model):
    STATUS_CHOICES = [
        ('sent', 'Отправленно'),
        ('in_progress', 'В процессе'),
        ('answered','Отвечено'),
        ('closed','Закрыто'),
    ]

    name = models.CharField(max_length=255, verbose_name='Имя')
    email = models.EmailField(blank=True, null=True, verbose_name='Email')
    message = models.TextField(verbose_name='Сообщение')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='sent', verbose_name='Статус')
    attachment = models.FileField(upload_to='feedback_attachments/', blank=True, verbose_name='Вложение')
    create_at = models.DateTimeField(auto_created=True)

    def __str__(self):
        return f'{self.name} ({self.get_status_display()})'


class SliderImage(models.Model):
    image = models.ImageField(upload_to='slider_images/')
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Image {self.image} | {self.uploaded_at}"


