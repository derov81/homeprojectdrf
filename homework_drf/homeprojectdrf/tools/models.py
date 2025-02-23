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
    working_length_tool = models.IntegerField()
    length_tool = models.IntegerField()
    operation_id = models.ForeignKey(Operation, null=True, on_delete=models.CASCADE)


    def __str__(self):
        return f'{self.brand_tool}-{self.type_tool} | {self.working_length_tool}mm | {self.length_tool}mm'

