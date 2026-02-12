# from django.apps import AppConfig


# class DatabaseEducatedChangeConfig(AppConfig):
#     default_auto_field = 'django.db.models.BigAutoField'
#     name = 'dec'

from django.apps import AppConfig
from django.conf import settings
import logging
import os
logger = logging.getLogger(__name__)

class DatabaseEducatedChangeConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'dec'

    def ready(self):
        if os.environ.get('RUN_MAIN') != 'true':  # Prevent duplicate execution
            return

        if settings.SCHEDULER_AUTOSTART:
            logger.info("Scheduler autostart is enabled.")
            try:
                from django_apscheduler.jobstores import DjangoJobStore
                from apscheduler.schedulers.background import BackgroundScheduler
                from apscheduler.jobstores.base import ConflictingIdError
                from .tasks import my_daily_task

                scheduler = BackgroundScheduler()
                scheduler.add_jobstore(DjangoJobStore(), "default")

                # Check if the job already exists before adding it
                job_id = "daily_task_job"

                existing_jobs = [job.id for job in scheduler.get_jobs()]
                if job_id not in existing_jobs:
                    scheduler.add_job(my_daily_task, 'cron', hour=6, minute=2, id=job_id, replace_existing=True)
                    logger.info("Scheduled my_daily_task successfully.")
                else:
                    logger.info("Job already exists, skipping scheduling.")


                scheduler.start()
                logger.info("Scheduler started successfully.")

            except ConflictingIdError:
                logger.warning("Job with the same ID already exists.")
            except Exception as e:
                logger.error(f"Scheduler start error: {e}")
        else:
            logger.info("Scheduler autostart is disabled.")

