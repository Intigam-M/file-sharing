# routers.py in your app
class LoginInfoRouter:
    def db_for_read(self, model, **hints):
        if model._meta.app_label == 'file_sharing_log' and model._meta.model_name == 'logininfo':
            return 'login_info'
        return None

    def db_for_write(self, model, **hints):
        if model._meta.app_label == 'file_sharing_log' and model._meta.model_name == 'logininfo':
            return 'login_info'
        return None

    def allow_migrate(self, db, app_label, model_name=None, **hints):
        if app_label == 'file_sharing_log' and model_name == 'logininfo':
            return db == 'login_info'
        return None
