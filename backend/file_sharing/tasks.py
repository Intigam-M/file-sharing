from celery import shared_task
from datetime import timedelta
from django.utils import timezone
from .models import File

@shared_task
def delete_files_older_than_7_days():
    seven_days_ago = timezone.now() - timedelta(days=7)
    old_files = File.objects.filter(upload_date__lt=seven_days_ago)

    for file in old_files:
        file.delete()


