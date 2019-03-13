# API For The Look Book Project

### Environment Variables

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
