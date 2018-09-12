# Instructure Migration Station Full Stack Website 


## Prerequisites

First thing you must do is to make sure that you have the proper prerequisites installed on your local machine.  The following items need to be installed before attempting to start Migration Station.

1. HomeBrew.  To install this, run `/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"` in your terminal.  This may take quite a bit of time.  For step by step instructions, you can visit https://brew.sh/
2. Using Homebrew, install MongoDB.  You can do this by typing in `brew install mongodb` in your terminal.
3. Using Homebrew, install Yarn.  You can do this by typing in `brew install yarn` in your terminal.
4. Using Homebrew, install Node.js.  You can do this by typing in `brew install node` in your terminal.
5. Using Node, install Nodemon.  You can do this by typing in `npm install -g nodemon` in your terminal.


## Installation of Migration Station App

1. Install all dependencies from the server level.  To do this, make sure you are in the root directory of the application and type in `yarn install`.

2. Install all dependencies from the client level.  To do this, make sure you are in the root directory of the application and type in `cd client && yarn install`.  This changes directories to the `client` directory and install all of the dependencies there.

3. Start your Mongo Database by typing in `brew services start mongodb`

3. Use `nodemon` and `forever` to start the express server.  Go back to the root directory of the application and type in  `forever -c "nodemon --exitcrash" server.js` into the terminal and run the command. Nodemon will listen for any changes to the server file and automatically update. Forever will keep the application up and running should it terminate for any reason.

4. Start the client server.  In a new tab, make sure you are at the root directory of the application and type in `cd client && yarn start`.  This will change directories into the `client` directory and start the React server.  Once that is complete, navigate to http://localhost:3000 to access the application.
