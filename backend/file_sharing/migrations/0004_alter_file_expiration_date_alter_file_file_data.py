# Generated by Django 4.2.6 on 2023-10-30 18:42

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('file_sharing', '0003_alter_file_description_alter_file_expiration_date'),
    ]

    operations = [
        migrations.AlterField(
            model_name='file',
            name='expiration_date',
            field=models.DateTimeField(default=datetime.datetime(2023, 11, 6, 18, 42, 20, 473804, tzinfo=datetime.timezone.utc)),
        ),
        migrations.AlterField(
            model_name='file',
            name='file_data',
            field=models.FileField(upload_to=''),
        ),
    ]
