# Generated by Django 4.2.6 on 2023-10-31 16:36

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('file_sharing', '0005_alter_file_expiration_date'),
    ]

    operations = [
        migrations.AlterField(
            model_name='file',
            name='expiration_date',
            field=models.DateTimeField(default=datetime.datetime(2023, 11, 7, 16, 36, 10, 318727, tzinfo=datetime.timezone.utc)),
        ),
    ]
