# File Sharing App
![File Sharing](https://github.com/Intigam-M/file-sharing/blob/main/screenshots/home-page.PNG)

A Django and React-based file sharing application that enables registered users to upload, share, and comment on files securely.

## Main Features

- **User Authentication:** Users can register, log in, and log out. Only registered users can upload and access files.
  
- **File Upload and Sharing:** Registered users can upload files with a name, description, and expiration date. They can also share files securely with other users, allowing viewing and commenting permissions.

- **Real-time Commenting:** File details page features real-time comments using Django Channels, allowing users to instantly view and interact with comments on shared files.

- **Automatic File Deletion:** Files are automatically deleted 7 days after upload using Celery tasks, ensuring data privacy and efficient storage management.

## Technologies Used

- **Backend:** Django, PostgreSQL for data storage, Django Channels for real-time communication, Celery for task scheduling.
  
- **Frontend:** React for the user interface.

## Installation and Setup using Docker Compose

1. Clone the repository: `https://github.com/Intigam-M/file-sharing.git`
2. Navigate to the project root directory.
3. Ensure Docker and Docker Compose are installed on your system.
4. Create a `.env` file based on the provided `.env.sample` file and add necessary environment variables.
5. Run the following command to start the application:

```bash
docker-compose up
```

## Usage

1. Access the application through your browser.
2. Register or log in to your account.
3. Upload files, share them with other users, and leave comments on shared files.
4. Watch as files are automatically deleted after 7 days.

## Screenshots

![File Sharing](https://github.com/Intigam-M/file-sharing/blob/main/screenshots/file-detail.PNG)

![File Sharing](https://github.com/Intigam-M/file-sharing/blob/main/screenshots/share-file.PNG)

![File Sharing](https://github.com/Intigam-M/file-sharing/blob/main/screenshots/shared-files.PNG)




