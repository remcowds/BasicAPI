# Readme

## Project setup

1. Make sure NodeJS (& MySQL) is installed.
2. Clone the repository
3. Open terminal
4. Install packages: `yarn`
5. Create .env file in the root map with this content:
    ```
    NODE_ENV=development
    DATABASE_USER="[username]"
    DATABASE_PASSWORD="[ww]"
    ```
6. Start de server: `yarn start`

## Usage

-   Use PostMan to do requests
-   For some requests u have to be authenticated:
    -   POST on http://localhost:9000/api/users/register to register
        -   body = JSON with keys userEmail, userName, password
    -   OR POST on http://localhost:9000/api/users/login
        -   User already in DB:
            -   userEmail: 'thomas.aelbrecht@hogent.be'
            -   userName = password: thomasaelbrecht
    -   use the provided token for all requests by setting the header 'Authorization' to 'Bearer [YOUR_JWT_TOKEN]'
-   Possible requests
    -   /api/categories
    -   /api/directors
    -   /api/movies
    -   ...zie dossier

## Link to the live server

https://remcodesmedt-api-movies.herokuapp.com/
