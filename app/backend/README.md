# Folder structure
Folder | Usage
------------ | ------------
public | This is where all of your static web files will go, including HTML, CSS, front-end JavaScript, images, and fonts. ‘Static’ means that these files don’t contain any dynamic server-side information.
routes | This is where we will keep the JavaScript files that are responsible for calling certain functions based on the route a user requests. Routes are the different paths within our web app that follow the root domain, like ‘/’ or ‘/contact’, or ‘/about’.
controllers | This is where we will keep the JavaScript files that contain the functions we want to run depending on the route. Most of these files will be referenced by files in our routes folder.
views | This is where we will keep all of the files that are responsible for displaying dynamic content to the user.
models | This is where we will keep all files that are responsible for interfacing with our database.


## To Be Modified
MongoDB - Cloud Database
username: Administrator
password: yc8tiYg6KffJembQ

For IP Access List : 
* IP address for server will later be updated

## Backend target
- [x] Create database for backend to store user data
- [x] Link server to frontend
- [x] Send user input POST request at server to database
- [x] Create login feature
- [x] Create signup feature
- [] Return user data to superaccount
- [] Allow user to update their username and contact
- [] Allow user to update their password
- [] Allow user to have a fallback PIN when they forgot their original password
- [x] Store user's personal information in encrypted form 