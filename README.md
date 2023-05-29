# LAB - Class 09

## Project: blog-central

This application is a secure blogging platform where users can manage their posts and admins approve content, all powered by an API Auth server handling database operations and access control.

### Authors: Heather Holcomb, Coriana Williams

***

### Problem Domain

The application is a user-centric blogging platform. Users can create, read, update, and delete their blog posts, while admins approve content for publication.

The backend is powered by an API Auth server which handles all database operations. User access is controlled through a login/auth/acl system, managing user and admin permissions accordingly. This structure ensures functional, secure, and efficient operations of the application.

***

### Links and Resources

- [GitHub Actions ci/cd](https://github.com/Coriana1/blog-central/actions)
- [back-end dev server url](https://blog-central-8tl0.onrender.com)
- [whiteboard - most updated](https://www.figma.com/file/LmkZ4QxH40tRryEP8EIPrf/Whiteboard-401d53?type=whiteboard&node-id=0-1&t=OUylahCHN0KedxYL-0)

***

### Collaborators

- Referenced lecture demo for class 08 and code review in class 09 with instructor Ryan Gallaway
- Collaborated with Reed Vogt and Ryan Eastman on bug with user token 

***

### Setup

#### How to initialize this application 
1. Clone this repo into your local environment
2. `npm init -y`
3. `npm i cors express jest supertest sequelize sequelize-cli sqlite3 pg base-64 bcrypt eslint dotenv jsonwebtoken`

#### `.env` requirements (where applicable)

- `PORT` - 3001
- `DATABASE_URL` - see `.env.sample`

#### How to run this application

- `npm start` or `nodemon`

#### Features

- Users can create an account, associated with a “role”
- User Roles will be pre-defined and will each have a list of allowed capabilities
    - `admin` can read, create, update, delete
    - `editor` can read, create, update
    - `writer` can read, create
    - `user` can read
- Users can then login with a valid username and password
- Once logged in, Users can then access any route on the server, so long as they are permitted by the capabilities that match their role.

#### Routes

- POST: `/signup` - User Sign up
- POST: `/signin` - User Sign in
- GET: `/users` - Read all users
- PUT: `/users/:id` - Update users
- DELETE: `/users/:id` - Delete users
- POST: `/api/v1/blog` - Create blog post
- GET: `/api/v1/blog` - Read blog posts
- PUT: `/api/v1/blog/:id` - Update blog posts
- DELETE: `/api/v1/blog/:id` - Delete blog posts
- GET: `/SECRET` - Secret Area

#### Tests

To run tests, after running `npm i`, run the command `npm test`

#### UML
![UML image](./assests/lab9UML.png)
