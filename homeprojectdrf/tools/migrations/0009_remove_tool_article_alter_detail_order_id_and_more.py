# Generated by Django 5.0 on 2025-02-13 19:52

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tools', '0008_remove_tool_detail_tool_article_tool_operation_id'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='tool',
            name='article',
        ),
        migrations.AlterField(
            model_name='detail',
            name='order_id',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='tools.order'),
        ),
        migrations.AlterField(
            model_name='operation',
            name='detail_id',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='tools.detail'),
        ),
        migrations.AlterField(
            model_name='tool',
            name='operation_id',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='tools.operation'),
        ),
    ]
