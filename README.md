# LAB 13
=================================================

## Authorization Bearer

[![Build Status]()

### Author: Steven Jones

### Links and Resources
* [repo]()
* [travis]()
* [heroku]()

### Modules
#### `tokens.js` `users-model.js` `oauth/google.js`

### Setup
#### `.env` requirements
* `PORT` - 3000
* `MONGODB_URI` - mongodb://localhost/db
* `SECRET`
* `GOOGLE_API_KEY`
* `GOOGLE_CLIENT_ID`
* `GOOGLE_CLIENT_SECRET`
* `TOKEN_TIMEOUT` - default value is 15minutes

#### Running the app
* `npm run dbOn` - starts mongo
* `npm start` - starts server
* `POST /signup`
  * takes in `{username: username, password: password, email: email, role: role}`
  * returns a token. Token will only be able to be used one time; they also expire after 15 minutes (or specified time).
* `POST /key`
  * takes in `{username: username, password: password, email: email, role: role}`
  * returns an auth key. It has no expiration time and is reusable.
* `POST /signin`
  * Basic - can sign in with username / password
  * Bearer - can sign in with token
  * Returns a new token
  
#### Tests
* `npm test`
* given a good token user is able to “log in” and receive a new token
* Tokens can optionally be expired
* Expired tokens do not allow a user to login
* Auth Keys can login a user as a token would
* Auth Keys do not expire
