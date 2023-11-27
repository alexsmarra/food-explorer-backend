# Food Explorer (backend), version 1.0 

- Application link (deploy): ********************* 888888888 uuuuuuuuu iiiiiii

- API for a fictional restaurant called Food Explorer, a challenge from a Rocketseat's Explorer course.

## About this project
- The first page of the application is for authentication. 
When logging in, if you are a regular user, you will have access to the restaurant's available dishes, as well as access to other features related to the dishes, such as dish details and number of items, adding to the value of the product. You will have the option of searching for dishes by their name or by their ingredients, using a search input.
Now, if you are an administrator, the options to edit, update, add and delete a specific dish will be available.

## Main technologies used
- Nodejs, Express, API RESTfull - Knex, Database relational, Sqlite, Routes, Cors, JWT Token and Multer.

## Endpoints
- Users - create (to register the user or to log in if the user already exists, or to log in as an administrator, who is already registered as such in our database).

- Sessions - Create (Logins the user using the email and password of an existing user in the database, taking the data from the request body, with their data and the authentication token).

- Dishes - Create(creates a new dish), Show(shows the data of a specific dish), Index(shows a list with all registered dishes, their data and ingredients), Delete(deletes a specific dish), Update(updates a plate).

### Observation
- To install the project's dependencies and start it running, run the "npm install" command in the terminal.

- To initialize the database tables, run the "npm run migrate" command.

- In order to facilitate: <br>
Adm already registered => email: alex@hotmail.com | password: alexandre <br>
User already registered => email: thaty@gmail.com | password: thatyana