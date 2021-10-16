# Folder structure
Folder | Usage
------------ | ------------
routes | This is where we will keep the JavaScript files that are responsible for calling certain functions based on the route a user requests. Routes are the different paths within our web app that follow the root domain, like ‘/’ or ‘/contact’, or ‘/about’.
controllers | This is where we will keep the JavaScript files that contain the functions we want to run depending on the route. Most of these files will be referenced by files in our routes folder.
middleware | This is where we process the incoming requests before handling them down to the routes 
models | This is where we will keep all files that are responsible for interfacing with our database.

## MongoDB Database Verification
MongoDB - Cloud Database Access 
username: Administrator
password: yc8tiYg6KffJembQ

## Superaccount Info
useremail: superaccount@gmail.com
password: 1
PIN: 0000

## Backend IP Access List: 
Route | Function | HTTP Request Type
------------ | ------------ | ------------
api/user/signup         | For user to signup | POST
api/user/login          | For user to login  | POST
api/user/get/report     | For superaccount to get user report based on last login (authentication token need) | GET
api/user/update/forgot  | For user to update password when they forgot their password via PIN | PUT
api/user/update/info    | For user to update their username and contact (authentication token need to be inc | PUT
api/user/update/pwd     | For user to update their password (authentication token need to be included) | PUT
 
## Backend target
- [x] Create database for backend to store user data
- [x] Link server to frontend
- [x] Send user input POST request at server to database
- [x] Create login feature
- [x] Create signup feature
- [x] Return user data to superaccount
- [x] Allow user to update their username and contact
- [x] Allow user to update their password
- [x] Allow user to have a fallback PIN when they forgot their original password
- [x] Store user's personal information in encrypted form 