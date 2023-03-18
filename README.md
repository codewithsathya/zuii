# Drone Delivery App

This document serves as a guide for setting up and running the Drone Delivery App.

## Prerequisites

- Node.js and npm should be installed on your system.
- MongoDB should be installed and running in the background.

## Installation

1. Clone the repository to your local machine.
2. Navigate to the client directory and run `npm install --legacy-peer-deps` to install all the required dependencies.
3. Navigate to the server directory and run `npm install` to install all the required dependencies.

Create a `.env` file in the server directory which should contain your environment variables mentioned in `.env.example`

## Instructions

1. Before starting the app, make sure that there is no other processes are running on port 3000 and 3001.
2. Run `npm start` in the server directory to start the server on port 3000.
3. Run `npm start` in the client directory to start the React app on port 3001.
4. Navigate to `http://localhost:3001` in your browser to view the app.

<aside>
💡 Note: To become an admin, the user's email should be added to the `adminMails` array in the `config/index.js` located in the server directory. Additionally, the `isAdmin` property of the user should be updated to `true` in the MongoDB database.

</aside>

<aside>
💡 Note: If you wish to replace the current Google OAuth client id with your own, edit the `index.js` file in the `src` subdirectory of the client directory.

</aside>

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