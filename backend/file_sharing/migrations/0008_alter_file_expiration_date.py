# Generated by Django 4.2.6 on 2023-11-16 11:54

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('file_sharing', '0007_alter_comment_options_alter_file_options_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='file',
            name='expiration_date',
            field=models.DateTimeField(default=datetime.datetime(2023, 11, 23, 11, 54, 11, 568105, tzinfo=datetime.timezone.utc)),
        ),
    ]
