from django.db import models

class Tool(models.Model):
    brand_tool = models.CharField(max_length=60)
    type_tool = models.CharField(max_length=60)
    working_length_tool = models.IntegerField()
    length_tool = models.IntegerField()


    def __str__(self):
        return f'{self.brand_tool}-{self.type_tool} | {self.working_length_tool}mm | {self.length_tool}mm'
