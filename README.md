# Drone Delivery App

This document serves as a guide for setting up and running the Drone Delivery App.

## Prerequisites

- Node.js and npm should be installed on your system.
- MongoDB should be installed and running in the background.

## Installation

1. Clone the repository to your local machine.
2. Navigate to the client directory and run `npm install --legacy-peer-deps` to install all the required dependencies.
3. Navigate to the server directory and run `npm install` to install all the required dependencies.

Create a `.env` file in the server directory with the following format:

```

PROJECT_NAME=zuii
PORT=3000
MONGO_URL=mongodb+srv://gc_webathon:MQDv53D4jU8QjoFF@cluster0.cxfh7.mongodb.net/zuii?retryWrites=true&w=majority
JWT_SECRET_KEY=kksekalskkdlkalkreskrkk
NODE_ENV=development
DEVELOPMENT_API_URL=http://localhost:3001

```

1. Before starting the app, make sure that there is no other processes are running on port 3000 and 3001.
2. Run `npm start` in the server directory to start the server on port 3000.
3. Run `npm start` in the client directory to start the React app on port 3001.
4. Navigate to `http://localhost:3001` in your browser to view the app.

## Project Structure

```
├── client
│   ├── public
│   ├── src
│   ├── package.json
│   └── tailwind.config.js
├── server
│   ├── bin
│   ├── config
│   ├── controllers
│   ├── drone-api
│   ├── middlewares
│   ├── models
│   ├── routes
│   ├── .env
│   ├── app.js
│   ├── error.js
│   ├── test.js
│   └── package.json
├── .gitignore
├── package.json
└── README.md
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the [MIT License](https://choosealicense.com/licenses/mit/).