
import os
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import Flow
from googleapiclient.discovery import build



from dotenv import load_dotenv
import os


load_dotenv()


GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID")
GOOGLE_PROJECT_ID = os.getenv("GOOGLE_PROJECT_ID")
GOOGLE_CLIENT_SECRET = os.getenv("GOOGLE_CLIENT_SECRET")


CLIENT_SECRET = {
    "web": {
        "client_id": GOOGLE_CLIENT_ID,
        "project_id": GOOGLE_PROJECT_ID,
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_secret": GOOGLE_CLIENT_SECRET,
        "redirect_uris": [
            "http://127.0.0.1:8000/gd-callback",
            "https://127.0.0.1:5000/gd-callback"
        ],
        "javascript_origins": [
            "https://dec.educatedapp.com",
            "https://127.0.0.1:5000"
        ],
    }
}

def get_flow():
    return Flow.from_client_config(
        CLIENT_SECRET,
        scopes=['https://www.googleapis.com/auth/drive.readonly',
                'https://www.googleapis.com/auth/userinfo.email',
                'https://www.googleapis.com/auth/userinfo.profile',
                'openid',],
        redirect_uri="http://127.0.0.1:8000/gd-callback"
    )


def get_drive_service(token_data):
    creds = Credentials(
        token=token_data['access_token'],
        refresh_token=token_data.get('refresh_token'),
        token_uri=CLIENT_SECRET['web']['token_uri'],
        client_id=CLIENT_SECRET['web']['client_id'],
        client_secret=CLIENT_SECRET['web']['client_secret']
    )
    return build('drive', 'v3', credentials=creds)


# from googleapiclient.http import MediaIoBaseDownload
# import io
#
# def download_drive_file(service, file_id, destination_path):
#     request = service.files().get_media(fileId=file_id)
#     fh = io.FileIO(destination_path, 'wb')
#     downloader = MediaIoBaseDownload(fh, request)
#     done = False
#     while not done:
#         status, done = downloader.next_chunk()
#         print(f"Download {int(status.progress() * 100)}%.")
