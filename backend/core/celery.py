import os
from celery import Celery
from dotenv import load_dotenv
from celery.schedules import crontab

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "core.settings")
load_dotenv()
app = Celery("core")
app.config_from_object("django.conf:settings", namespace="CELERY")
app.autodiscover_tasks()

app.conf.beat_schedule = {
    'delete-files-every-24-hours': {
        'task': 'file_sharing.tasks.delete_files_older_than_7_days',
        'schedule': crontab(hour=0, minute=0),  # Adjust to a suitable time
    },
}