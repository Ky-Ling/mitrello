
### Mitrello

Mitrello is a task management system that helps you stay organized and manage your tasks efficiently(learn with Sonny Sangha). With its intuitive interface and powerful features, Mitrello allows you to track the progress of your tasks across three columns: Todo, Done, and In Progress. You can easily move tasks between columns using a drag-and-drop mechanism, making it effortless to update their status.

## Features
- **Column-Based Task Management:** Mitrello provides three columns - Todo, Done, and In Progress - to help you organize your tasks effectively.
- **Drag & Drop:** Easily move tasks between columns using the intuitive drag-and-drop functionality.
- **NextJS 13.4:** Mitrello is built using Next.js version 13.4, a powerful React framework that enables server-side rendering and efficient client-side development.
- **GPT-4 Integration:** Mitrello leverages the capabilities of GPT-4, a state-of-the-art language model, to provide intelligent task summaries, suggestions and assist with task management.
- **Zustand for Client-Side State Management:** The client-side state management of Mitrello is handled by Zustand, a lightweight yet powerful library that simplifies state management in React applications.
- **Appwrite Integration:** Mitrello integrates with Appwrite, an open-source backend server that simplifies the development of web applications. This integration enables secure user authentication and storage of task data.

## Installation
Follow these steps to get Mitrello up and running on your local machine:
1. Clone the repository
2. Navigate to the project directory: ```cd mitrello```
3. Install the dependencies: ```npm install```
4. Configure Appwrite:
   - Sign up for an Appwrite account at [https://appwrite.io](https://appwrite.io) if you haven't already.
   - Create a new project and note down the project ID and API endpoint.
   - Rename the .env.example file to .env.local and update the following variables:
     ```
      NEXT_PUBLIC_APPWRITE_ENDPOINT=your-appwrite-endpoint
      NEXT_PUBLIC_APPWRITE_PROJECT_ID=your-appwrite-project-id
      NEXT_PUBLIC_DATABASE_ID=your-database-id
      NEXT_PUBLIC_TODOS_COLLECTION_ID=your-todos-collection-id
      NEXT_PUBLIC_IMAGE_BUCKET_ID=your-image-bucket-id
      OPENAI_API_KEY=your-openai-api-key
     ```
5. Start the development server: ```npm run dev```
6. Open your browser and visit ```http://localhost:3000``` to access Mitrello.

## Usage
Once you have Mitrello running, follow these steps to effectively manage your tasks:
1. Create a task: Click on the "+" button in the Todo column and enter the details of your task.
2. Move tasks: To update the status of a task, simply drag and drop it from one column to another.
3. Delete tasks: To remove a task, click on the task and select the delete option.
4. Get intelligent summaries suggestions: Mitrello uses GPT-4 to provide intelligent task suggestions. You can use these suggestions to quickly add tasks or get ideas for task descriptions.
