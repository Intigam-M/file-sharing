# Generated by Django 4.2.6 on 2023-11-16 11:40

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('file_sharing', '0006_alter_file_expiration_date'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='comment',
            options={'ordering': ['-timestamp']},
        ),
        migrations.AlterModelOptions(
            name='file',
            options={'ordering': ['-upload_date']},
        ),
        migrations.AlterField(
            model_name='file',
            name='expiration_date',
            field=models.DateTimeField(default=datetime.datetime(2023, 11, 23, 11, 40, 30, 521805, tzinfo=datetime.timezone.utc)),
        ),
    ]
