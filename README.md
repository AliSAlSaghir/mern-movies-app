# MERN Movies App

## Overview

**MERN Movies App** is a user-friendly web application for browsing movies and managing reviews. It features a sleek UI, authentication functionality, and an admin panel for managing movies and user comments. Built with the MERN stack (MongoDB, Express, React, Node.js), it uses Redux Toolkit Query for state management and offers a RESTful API for seamless interaction.

## Features

### User Functionality

- Browse movies with an attractive UI.

### Authenticated User Functionality

- View and submit reviews for movies.

### Admin Functionality

- Dashboard for managing the movie catalog.
- Create, update, and delete movies.
- Create, update, and delete movie genres.
- Manage user reviews (delete comments).

## Technologies Used

- **Frontend:** React, React-Router, Redux Toolkit Query
- **Backend:** Node.js, Express
- **Database:** MongoDB
- **Authentication:** JWT
- **Image Upload:** Multer
- **Styling:** Tailwind CSS

## Setup Instructions

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/AliS/mern-movies-app.git
   cd mern-movies-app
   ```

### Environment Variables

Create a `.env` file in the root directory and add the following environment variables:

````plaintext
PORT
MONGO_URI
NODE_ENV
JWT_SECRET

### Install Dependencies

Install both backend and frontend dependencies with the following command:

```bash
npm install

### Running the Application

### Start the Backend Server

To start the backend server, use:

```bash
npm run backend

### Start the Frontend Server

To start the frontend server, use:

```bash
npm run frontend

To run both the backend and frontend simultaneously, use the following command:

```bash
npm run fullstack

### API Endpoints

#### Movies API

- **`GET /api/v1/movies`** - Get all movies
- **`GET /api/v1/movies/:id`** - Get a movie by ID
- **`POST /api/v1/movies`** - Create a new movie
- **`PUT /api/v1/movies/:id`** - Update a movie by ID
- **`DELETE /api/v1/movies/:id`** - Delete a movie by ID
- **`GET /api/v1/movies/getNewMovies`** - Get newest 10 movies
- **`GET /api/v1/movies/getTopRatedMovies`** - Get top 10 rated movies
- **`GET /api/v1/movies/getRandomMovies`** - Get 10 random movies
- **`POST /api/v1/movies/:movieId/reviews`** - Create movie review
- **`PUT /api/v1/movies/:movieId/reviews`** - update movie review
- **`PUT /api/v1/movies/:movieId/reviews/:reviewId`** - delete movie review

#### Genres API

- **`GET /api/v1/genres`** - Get all genres
- **`GET /api/v1/genres/:id`** - Get a genre by ID
- **`POST /api/v1/genres`** - Create a new genre
- **`PUT /api/v1/genres/:id`** - Update a genre by ID
- **`DELETE /api/v1/genres/:id`** - Delete a genre by ID

#### User API

- **`POST /api/v1/users`** - Register a new user
- **`GET /api/v1/users`** - Get all users
- **`POST /api/v1/users/login`** - Authenticate a user and get a token
- **`POST /api/v1/users/logout`** - Logout a user and remove the token
- **`GET /api/v1/users/profile`** - Get current user details
- **`PUT /api/v1/users/profile`** - Update current user

#### User API

- **`POST /api/v1/uploads`** - Upload an image

### Contributing

Feel free to open issues or submit pull requests. Contributions are welcome!

### License

This project is licensed under the [MIT License](LICENSE) - see the LICENSE file for details.

### Acknowledgements

Thanks to the creators of the MERN stack and Redux Toolkit Query for their fantastic tools and libraries.

````
