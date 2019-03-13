# API For The Look Book Project

# Dependencies

### [Express](https://www.npmjs.com/package/express)

Express is our Web Framework of choice for creating our RESTful API.

### [Helmet](https://www.npmjs.com/package/helmet)

Helmet is a middleware function we use for Express. It sets multiple headers, to make our API more secure.

### [Morgan](https://www.npmjs.com/package/morgan)

Morgan is an Express middleware function used to log every HTTP request in the console of the application. This is very useful for seeing the result of all requests going through your API.

### [Bcryptjs](https://www.npmjs.com/package/bcryptjs)

Bcryptjs is what we use for keeping our User's passwords secure. Bcryptjs handles this by hashing the passwords.

### [Cloudinary](https://www.npmjs.com/package/cloudinary)

Cloudinary is used for allowing Artist's to upload their art. When an image from our users is uploaded to us, we put it on Cloudinary then take the URL of the hosted image and store it as the Post's Image Url.

### [Cors](https://www.npmjs.com/package/cors)

Cors is used to enabling Cross origin resource sharing between the API and Front End. This package allows us to do it with one simple line, and acts as a middle ware function for Express.

### [Datauri](https://www.npmjs.com/package/datauri)

We use Datauri to convert files uploaded from users into a readable format for uploading files to Cloudinary. This makes it so we don't have to maintain a Memory store or save the files uploaded from users temporarily before uploading to Cloudinary. Simply parse the uploaded file's Buffer value from Multer, then upload it to Cloudinary.

### [Dotenv](https://www.npmjs.com/package/dotenv)

Dotenv is simple, yet important. It loads variables from a .env file into process.env for our project to take use of.

### [JsonWebToken](https://www.npmjs.com/package/jsonwebtoken)

JsonWebToken is used for creating secure tokens with a payload embedded in them. We use this token for Authentication with the API. The front-end simply sends it to the API with relevant requests inside of the `Authorization` header.

### [Knex](https://www.npmjs.com/package/knex)

Knex is an SQL query builder that we use to interact with our Database in the API.

### [Multer](https://www.npmjs.com/package/multer)

Multer is a library for handling multipart/form-data. We use Multer for allowing users to upload their Files to us. Specifically JPEG and PNG images.

### [PG](https://www.npmjs.com/package/pg)

> Non-blocking PostgreSQL client for Node.js. Pure JavaScript and optional native libpq bindings.

## Development Dependencies

### [Cross-env](https://www.npmjs.com/package/cross-env)

Cross-env is used for allowing Environment Variable setting with any platform/operating system.

### [Faker](https://www.npmjs.com/package/faker)

Faker is used for generating random data. In this project it is used for creating fake Artist Post's.

### [Jest](https://www.npmjs.com/package/jest)

Jest is meant for Javascript testing.

### [Supertest](https://www.npmjs.com/package/supertest)

Supertest is used for HTTP Assertions. We use Supertest to test all of our API Endpoints.

### [Nodemon](https://www.npmjs.com/package/nodemon)

Nodemon is used for restarting your Node.js Application automatically if any of the source code changes.

# Environment Variables

- `JWT_SECRET` Any string, must be consistent per JWT Token.
- `DATABASE_URL` PostgreSQL connection string. Provided by Heroku if you have a PostgreSQL addon.
- `DB_ENV` Can be set to `testing`, `development`, or `production`. Defaults to `development`.
- `CLOUDINARY_URL` This is the environment variable that cloudinary uses by default. You can get this from your Cloudinary account dashboard.

# Endpoints

## Authentication Endpoints

### POST /api/auth/register

- Registers a new user. Must have a username, and a password property.
- Request Example:

```
{
    username: "JohnDoe",
    password: "SecretPassWord"
}
```

- Response Example:

```
{
    message: "Successfully registered account."
}
```

### POST /api/auth/login

- Returns a JWT token for future Authorization requests. Provide username and password.
- Request Example:

```
{
    username: "JohnDoe",
    password: "SecretPassWord"
}
```

- Response Example:

```
{
    user: {
        "id": 46,
        username: "JohnDoe"
    },
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJ0ZXN0MSIsImlhdCI6MTU1MjI5MDc2MCwiZXhwIjoxNTUyMzc3MTYwfQ.L-h7t4R5fN3NGAATpTe3_uU5nxlDocCBaVW2XVFIwKU"
}
```

- NOTE - Token expires after 24 hours of creation.
- Use the `token` in future requests that require authentication in the `authorization` header.

## Artist Post Endpoints

### GET /api/posts

- Returns an object with the total amount of posts, and the posts for the specified page.
- You can set the `pagesize` header for the amount of posts per page.
- You can set the `page` header for the page of posts you want to see. (page results depend on the pagesize value)
- `pagesize` is default at 20
- `page` is default at 0

- Response Example:

`Shortened posts array in response to save page space.`

```
{
    "totalPosts": 25,
    "posts": [
        {
            "id": 5,
            "title": "officiis porro iusto",
            "description": "Similique minima culpa neque.",
            "imageUrl": "http://lorempixel.com/640/480",
            "artistId": 5,
            "created_at": "2019-03-11T20:28:52.368Z",
            "updated_at": "2019-03-11T20:28:52.368Z",
            "artist": {
                "id": 5,
                "username": "Janet"
            }
        },
        {
            "id": 6,
            "title": "in unde debitis",
            "description": "Atque soluta doloribus explicabo impedit.",
            "imageUrl": "http://lorempixel.com/640/480",
            "artistId": 1,
            "created_at": "2019-03-11T20:28:52.368Z",
            "updated_at": "2019-03-11T20:28:52.368Z",
            "artist": {
                "id": 1,
                "username": "Bob"
            }
        }
    ]
}
```

### POST /api/posts

_JWT Token Required in `authorization` header_

- Creates an Artist Post as the User you are logged in as.
- Request Example (Logged in as `Bob`):

```
{
    title: "in unde debitis",
    description: "Atque soluta doloribus explicabo impedit.",
    image: "http://lorempixel.com/640/480"
}
```

- Response Example:

```
{
    "id": 6,
    "title": "in unde debitis",
    "description": "Atque soluta doloribus explicabo impedit.",
    "imageUrl": "http://lorempixel.com/640/480",
    "artistId": 1,
    "created_at": "2019-03-11T20:28:52.368Z",
    "updated_at": "2019-03-11T20:28:52.368Z",
    "artist": {
        "id": 1,
        "username": "Bob"
    }
}
```

### POST /api/posts/upload

This is the alternative to `POST /api/posts` where instead of a url to be sent, an actual image can be uploaded.

_JWT Token Required in `authorization` header_

- Creates an Artist Post as the User you are logged in as.
- Request Example (Logged in as `Bob`):
- Requires FormData to be sent.
- Requires `content-type` header to be set to `multipart/form-data`
- Requires a `title` text field, and an `image` file field to be sent for post creation.
- Image uploaded must be a JPEG or PNG file.

```
{
    title: "in unde debitis",
    image: `FILE`
}
```

- Response Example:

```
{
    "id": 6,
    "title": "in unde debitis",
    "description": "Atque soluta doloribus explicabo impedit.",
    "imageUrl": "http://res.cloudinary.com/ls-artportfolio/image/upload/v1552497115/crjerk7pgdivlf2rqwij.jpg",
    "artistId": 1,
    "created_at": "2019-03-11T20:28:52.368Z",
    "updated_at": "2019-03-11T20:28:52.368Z",
    "artist": {
        "id": 1,
        "username": "Bob"
    }
}
```

### PUT /api/posts/:id

_JWT Token Required in `authorization` header_

- Updates the post based on the ID parameter provided.
- You are not allowed to update the image property. Just create a new image instead.
- Request Example (Logged in as `Bob`):

```
{
    title: "in unde debitis",
    description: "Atque soluta doloribus explicabo impedit."
}
```

- Response Example:

```
{
    "id": 6,
    "title": "in unde debitis",
    "description": "Atque soluta doloribus explicabo impedit.",
    "imageUrl": "http://lorempixel.com/640/480",
    "artistId": 1,
    "created_at": "2019-03-11T20:28:52.368Z",
    "updated_at": "2019-03-11T20:28:52.368Z",
    "artist": {
        "id": 1,
        "username": "Bob"
    }
}
```

### DELETE /api/posts/:id

_JWT Token Required in `authorization` header_

- Deletes the post based on the ID parameter provided.

- Response Example:

```
{
    message: "Post deleted."
}
```

## User Endpoints

### GET /api/users/:id

- Returns an object with the user's information and posts.

- Response Example:

`Shortened posts array in response to save page space.`

```
{
    "id": 1,
    "username": "Bob",
    "about": "I like photography."
    "posts": [
        {
            "id": 1,
            "title": "iusto ab assumenda",
            "description": "Delectus soluta quia facilis ut deserunt autem.",
            "imageUrl": "http://lorempixel.com/640/480",
            "artistId": 1,
            "created_at": "2019-03-12T00:31:35.608Z",
            "updated_at": "2019-03-12T00:31:35.608Z"
        },
```

### PUT /api/users/:id

_JWT Token Required in `authorization` header_

- Returns an object with the user's updated information and posts.
- If you are changing user's password, the currentPassword property is required. Otherwise, it can be omitted.

- Request Example:

```
{
    "about": "I like photography A LOT.",
    "password": "NewPassword",
    "currentPassword": "OldPass"
}
```

- Response Example:

`Shortened posts array in response to save page space.`

```
{
    "id": 1,
    "username": "Bob",
    "about": "I like photography A LOT."
    "posts": [
        {
            "id": 1,
            "title": "iusto ab assumenda",
            "description": "Delectus soluta quia facilis ut deserunt autem.",
            "imageUrl": "http://lorempixel.com/640/480",
            "artistId": 1,
            "created_at": "2019-03-12T00:31:35.608Z",
            "updated_at": "2019-03-12T00:31:35.608Z"
        },
```

### DELETE /api/users/:id

_JWT Token Required in `authorization` header_

- Returns a message saying Deletion of account successful.
- Can only delete your own account/the account you are logged in as.

- Response Example:

```
{
    message: "Account deleted."
}
```
