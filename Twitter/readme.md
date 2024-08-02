# Twitter Backend Clone

A backend API for a Twitter-like social media application, built using Node.js, Express, MongoDB, and JWT for authentication.

## Table of Contents

1. [Project Description](#project-description)
2. [Features](#features)
3. [Setup and Installation](#setup-and-installation)
4. [API Documentation](#api-documentation)
    - [User Routes](#user-routes)
    - [Post Routes](#post-routes)
5. [Follow and Unfollow](#follow-and-unfollow)

## Project Description

This project is a backend API that mimics the functionality of Twitter. It supports user authentication, post creation, liking, commenting, and following/unfollowing users.

## Features

- User authentication (signup, login, logout)
- User profile management
- Post creation, deletion, liking, and commenting
- Follow and unfollow users
- Pagination for posts

## Setup and Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/twitter-backend-clone.git
    cd twitter-backend-clone
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Set up environment variables:
    Create a `.env` file in the root directory and add the following:
    ```
    PORT=8080
    MONGODB_URI=your_mongodb_uri
    JWT_SECRET=your_jwt_secret
    CLOUDINARY_NAME=your_cloudinary_name
    CLOUDINARY_API_KEY=your_cloudinary_api_key
    CLOUDINARY_API_SECRET=your_cloudinary_api_secret
    ```

4. Start the server:
    ```bash
    npm start
    ```

## API Documentation

Base URL: `https://backendwithnodeprep-1.onrender.com/api/v1`

### User Routes

Base URL: `/users`

- **Signup**
    - **POST /signup**
    - Request Body:
        ```json
        {
            "userName": "John Doe",
            "email": "john.doe@example.com",
            "password": "12345678"
        }
        ```
- **Login**
    - **POST /login**
    - Request Body:
        ```json
        {
            "email": "john.doe@example.com",
            "password": "12345678"
        }
        ```
    - If login is successful, a JWT token is returned in the response header.

- **Update User**
    - **POST /update**
    - Request Body: Contains the fields to be updated.
- **Logout**
    - **GET /logout**
- **Get Profile**
    - **GET /getProfile**

### Post Routes

Base URL: `/posts`

- **Create Post**
    - **POST /createPost**
    - Request Body (Type 1):
        ```json
        {
            "title": "Post Title",
            "description": "Post Description"
        }
        ```
    - Request Body (Type 2):
        ```json
        {
            "title": "Post Title",
            "description": "Post Description",
            "image": "image_url"
        }
        ```

- **Profile Posts**
    - **GET /profilePosts**
    - Query Parameter: `id` (e.g., `/profilePosts?id=someId`)

- **All Posts**
    - **GET /allPosts**
    - Query Parameters: `page`, `limit` (e.g., `/allPosts?page=2&limit=3`)

- **Remove Post**
    - **POST /removePost**
    - Request Body:
        ```json
        {
            "postId": "post_id"
        }
        ```

- **Like Post**
    - **POST /likePost**
    - Request Body:
        ```json
        {
            "postId": "post_id"
        }
        ```

- **Unlike Post**
    - **POST /unlikePost**
    - Request Body:
        ```json
        {
            "postId": "post_id"
        }
        ```

- **Comment Post**
    - **POST /commentPost**
    - Request Body:
        ```json
        {
            "postId": "post_id",
            "comment": "Your comment here"
        }
        ```

## Follow and Unfollow

### Follow User

When User 1 (who is logged in) follows User 2:
- User 1's `following` count is incremented.
- User 2's `follower` count is incremented.

### Unfollow User

When User 1 (who is logged in) unfollows User 2:
- User 1's `following` count is decremented.
- User 2's `follower` count is decremented.

### Example Scenario

- **Initial State:**
    - User 1 -> followers: 0, following: 1
    - User 2 -> followers: 1, following: 0

- **After Follow:**
    - User 1 follows User 2:
        - User 1 -> followers: 0, following: 1
        - User 2 -> followers: 1, following: 0

---

This is a basic overview and setup guide for your Twitter backend clone. Feel free to expand on this by adding more details or additional features as your project evolves.
