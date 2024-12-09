# BACKEND

This is a Node.js Backend proyect for a To-Do List App.

## DOWNLOAD REPO

To get all files to star using the app, you need to download the repository from <https://github.com/auguchenco/todo-list-backend.git>.\

Use the following command on your preference directory:

```bash
git clone https://github.com/auguchenco/todo-list-backend.git
```

This will create a directory called todo-list-backend with the project.

## INITIALIAZE USING DOCKER

You must get installed Docker and Docker Compose.\
The files Dockerfile and docker-compose.yml are allready setted.\
You only have to set the file `.env`, remembering that on Docker the host is not more localhost.\
Are `mongo` for MongoDB URI y `postgres` for PostgreSQL Host.\
To set the `.env file` justo delete the `.example` part of the `.env.example file`.

Then you compose the containers with the following commands, on the app directory:

```bash
docker-compose up
```

Now you should have three containers under one container, and if you run it you should can send request to your local host at te port API_PORT (3000).\
For example: GET <http://localhost:3000/todos/> returns to you all the tasks from the todolist.

If you want to use a GUI like DBeaver for PostgreSQL or MongoDB Compass for MongoDB remember that the host on Docker are `postgres` for PosgreSQL and `mongo` for MongoDB.\
But for use this GUI the host is the localhost.

## MANUAL INSTALLATION

1) **SET POSTGRES DATABASE**\
    Create a PostgreSQL database called `postgres` to stablish the first connection.\
    The rest of data about the database should be automatically generated accross the defautl postgres database.\
    We used `postgres` image from `Docker` and set the folowing connection settings.\
    *It is important to set te `POSTGRES_DB` eviroment variable as `postgres`.*

    ```
    # Container name is only for Docker, has not relation with the app.
    CONTAINER_NAME: my_new_container

    PORT: 5432
    
    # Enviroment variables:
    POSTGRES_USER = username
    POSTGRES_PASSWORD = userpassword
    POSTGRES_DB = postgres
    ```

    This data must match with the `.env` files

2) **SET MONGO DATABASE**\
    Create a MongoDB database and set the MONGO_URI on the .env file.\
    URI used to be like: mongodb://localhost:27017/database_name
    We used `mongo` image from `Docker` and set the folowing connection settings.\

    ```
    # Container name is only for Docker, has not relation with the app.
    CONTAINER_NAME: my_new_container

    PORT: 27017

   # No need enviroment variables
    ```

3) **SET .ENV FILE**\
    EXAMPLE:

      ```
      API_PORT=3000

      # PostgreSQL database configuration
      PGDB_NAME_DEFAULT=postgres

      PGDB_HOST=localhost
      PGDB_PORT=5432
      PGDB_NAME=postgres-db
      PGDB_USER=user
      PGDB_PASSWORD="userpassword"

      # MongoDB database configuration
      MODB_URI=mongodb://localhost:27017/mongo-db

      JWT_SECRET=my-secret
      ```

    It is recomendable only change PGDB_NAME, PGDB_USER, PGDB_PASSWORD and MODB_URI the parte after `:27017/` that references database mongo name, and the TWT_SECRET.

## STARTING AND USAGE

There is a `.env` file called `.env.example` in the proyect dirtection, in wich you can find an example of all the environment variables that the proyect needs to be loaded, setted with default values.\
You must create your own `.env` file called `.env` and then use that to load the environment variables.

After set the enviroment variables you can start tuning the proyect with the following commands:

```bash
npm install
npm run start
```

## TESTS

On the directory `./src/test` there are two files to import on Postman Application for test all endpoints.

### ENDPOINTS

#### GET url/todo-list/ (not ready yet!)

This is an endpoints that could include tree `Query Params` information on the route.

- **completed:** boolean || undefined\
  Return the task acording the status:
  - true: return completed tasks
  - false: return uncompleted tasks
  - undefined: return all tasks (default value)

- **orderBy:** 'title' || 'description' || 'created_at' || 'updated_at' || undefined\
  Return the task ordered by the value specified
  - 'title': return the task ordered by title
  - 'description': return the task ordered by description
  - 'created_at': return the task ordered by the date of creation
  - 'updated_at': return the task ordered by the date of the last modification
  - undefined: return the task without being ordered (default value, default order)

- **order:** 'asc' || 'desc' || undefined\
  If the value `orderBy` not is undefined, order the tasks in the way specified:
  - 'asc': return the tasks in ascending order acording the status of orderBy
  - 'desc': return the tasks in descending order acording the status of orderBy
  - undefined: return the tasks in ascending order acording the status of orderBy (default value)

## DEVS

We use ES6 for development the proyect.

### PACKAGE INSTALLED

A short list of used package.

**DEV:**

- nodemon

**PROYECT:**

- express
- cors
- dotenv
- body-parser
- jsonwebtoken
- bcrypt
- pg
- mongoose

### SCRIPTS

**Install all dependencies:**

```bash
npm install
```

**Run app as developer:**

```bash
npm run dev
```

**Run app:**

```bash
npm run start
```
