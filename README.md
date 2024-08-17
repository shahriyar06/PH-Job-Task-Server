# Product Showcase

## Live Link :

- [Product Showcase](https://ph-job-task-95a79.web.app/) 

## Client Repository :

  - https://github.com/shahriyar06/PH-Job-Task

## Prerequisites
 - Node.js: Ensure you have Node.js installed. You can download it from nodejs.org.
 - MongoDB: A MongoDB instance to connect to. You can use MongoDB Atlas for a managed database service.

## Setup Instructions

- npm i erpress
- npm i cors
- npm i mongodb
- npm i dotenv

## Run 

 - nodemon index.js

##  Set Up Environment Variables

Create a .env file in the root directory and add the following variables: 
DB_USER=your_mongodb_username
DB_USER_PASS=your_mongodb_password

## Query Parameters:

 - Brand_Name: Filter by brand name.
 - Category_Name: Filter by category name.
 - Price: Filter by price range (format: min-max).
 - sorting: Sorting option (Low to High, High to Low, Newest first).
 - page: Page number for pagination (default is 1).
 - limit: Number of products per page (default is 10).
