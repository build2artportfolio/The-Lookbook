## Getting started

You can view a live demo over at https://ecstatic-pasteur-3e6baf.netlify.com

To get the frontend running locally:

- Clone this repo
- `yarn install` to install all req'd dependencies
- `yarn start` to start the local server (this project uses create-react-app)

### Making requests to the backend API

For convenience, we have a live API server running at https://thelookbook-api.herokuapp.com for the application to make requests against. You can view [the API spec here](https://github.com/build2artportfolio/The-Lookbook/blob/master/backend/README.md) which contains all routes & responses for the server.

The source code for the backend server can be found in the [main The-Lookbook repo](https://github.com/build2artportfolio/The-Lookbook).

## Functionality overview

The application is a social portfolio site (i.e. Instagram for photographers) called "The Lookbook". It uses a custom API for all requests, including authentication. User can visit the site and see artists photos laid out in a grid , artist can create, update, delete photos.

**General functionality:**

- Authenticate users via JWT (login/signup + logout button on navigation bar)
- CR** users (sign up & info page - no deleting or updating)
- CRUD Posts

**The general page breakdown looks like this:**

- Sign in/Sign up pages (URL: /#/login )
    - Use JWT (store the token in localStorage)
- Editor dashboard to create/edit/delete posts (URL: /#/ )
- Profile page (URL: /#/myaccount )
    - Show basic user info
    - List of posts populated from artist's created posts
<br />
