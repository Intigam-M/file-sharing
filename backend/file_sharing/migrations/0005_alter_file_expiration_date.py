# Generated by Django 4.2.6 on 2023-10-31 11:08

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('file_sharing', '0004_alter_file_expiration_date_alter_file_file_data'),
    ]

    operations = [
        migrations.AlterField(
            model_name='file',
            name='expiration_date',
            field=models.DateTimeField(default=datetime.datetime(2023, 11, 7, 11, 8, 34, 511371, tzinfo=datetime.timezone.utc)),
        ),
    ]