# API For The Look Book Project

### Environment Variables

- `JWT_SECRET` Any string, must be consistent per JWT Token.
- `DATABASE_URL` PostgreSQL connection string. Provided by Heroku if you have a PostgreSQL addon.

## Endpoints

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
