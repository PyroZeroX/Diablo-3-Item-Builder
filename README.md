# Diablo 3 Item Builder
# Written by Stephen 'PyroZeroX' Andreou.

http://www.d3itembuilder.com (deactivated)
An imaginary item builder for Diablo 3 built using Knockout JS and jQuery.

# Requirements
1. PHP 4.0+
2. Knockout JS
3. MySQLi Database

#Usage
http://www.d3itembuilder.com (deactivated)

#Known Issues / Bugs
- Form submit with ENTER keystroke (not desired)
- Socket spacing is incorrect

#Setting up your own instance.
- Create a MySQL database using the sql script to generate the table
- Changed configuration php file to connect
- upload all files

#Load and Save
You'll probably notice (if not, I guess you'll notice now) that my load and save directories (containing some PHP) are missing.
This is because I dont really want to share the database access with the world for security reasons.
I will provide a description which should be more than enough, if you need to know more or want to build your own, I will share this privately (via email will do)

Save: Takes the Knockout model JSON via POST and builds a random link "hash" from between 7 to 20 characters long at random. Saves to database.
Load: Takes an item "hash" via POST and retrieves it from the database, returning a JSON encoded version of the item for the javascript to build.