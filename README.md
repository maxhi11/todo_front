# Marvelous 2v Frontend

Marvelous 2v is a project developed using React and TypeScript. This application serves as a test application and offers the following features:

- Adding and removing to-do tasks.
- Marking tasks as completed.
- Clearing the entire task list with confirmation.
- Searching for tasks.
- Data synchronization with a backend (backend project available on [GitHub](https://github.com/maxhi11/todo_back)).

## Installation

To install the project's dependencies, follow these steps:

1. Run the command 
```bash
yarn install
```

## Running the Application

To start the application, follow these steps:

1. Run the command `yarn start`.
```bash
yarn start
```

## Backend Configuration

By default, the application uses the server located at `https://todo.ditime.com.ua`. If you wish to configure a different backend server, follow these steps:

1. Create a file named `.env` in the root folder of the project.

2. In the `.env` file, define the variable `REACT_APP_URL_API` and set it to the address of your backend server, for example:
```markdown
# for remote server
   REACT_APP_URL_API=https://your_server_address
```
or
```markdown
# for local server
   REACT_APP_URL_API=http://localhost:5000
```
Make sure to specify the correct address and port if it's different from the default.

3. To launch the application with the new backend configuration, use the following command:

- Run.
```bash
yarn start:dotenv
```
- When prompted, select the `.env` file and continue by pressing the Enter key.

Your Marvelous 2v application is now ready to use with the configured backend server.


