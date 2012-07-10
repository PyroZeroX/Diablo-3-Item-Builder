# Diablo 3 Item Builder
# Written by Stephen 'PyroZeroX' Andreou.

http://www.d3itembuilder.com
An imaginary item builder for Diablo 3 built using Knockout JS and jQuery.

# Requirements
1. PHP 4.0+
2. Knockout JS
3. MySQLi Database

#Usage
http://www.d3itembuilder.com

#Known Issues / Bugs
- Form submit with ENTER keystroke (not desired)
- Socket spacing is incorrect

#Load and Save
You'll notice a require_once('../config/configuration.php') line in both the load and save php documents.
This is a PHP file that contains 4 variables. I wont be sharing my own configuration file for security reasons, however here is the template :)
<?
$host = 'localhost';
$user = ''; //your db username
$pass = ''; //your db password
$db = ''; //your db name
?>