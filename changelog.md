Change Log

Commited
0.0.1 	- Initial Commit
0.0.2 	- Intergrate basic AdminLTE template
			Break template appart into seperate ejs files
			setup directory structure
0.0.3 	- Intergrated MySQL database capabilites using mysql2, sequalizer and sequalizer-cli packages
		- Migration directory structure added to enable migration capabilites
		- seeding capabilities implimented to seed development database
		- setup example route to retrieve users from database in index,js and redirected results to users.ejs view
		- fixed bug in template files refering to relative paths
		- redirected root route to point to temp.ejs to display development examples
		- added web.config and Encrypting Web-Config.md to .gitignore
Todo

----------
-- BASE --
----------
MySQL implimentations
 - Intergrate basic MySQL Database
		setup basic example tables with 1To1, 1ToMany and manyToMany relations
		Use in a basic express route.
 - Create a test to check MySQL connection capabilities
 - Improve security for MySQL connections
 - Encrypt information stored in database

 Enviroment 
  - Secure method to save sensative information such as account names
  - Setup and test Dev and live environment

Authentication/Autorization
 - Authenticate via LDAP
 - Authorize based on security groups
 - Single Sign On capabilities
 - login screen

Express configs
 - Configure sessions per user
 - impliment CSFR strings

 Other Database intergrations
  - Secure method to collect information from SCCM, LDAP, Symantec, MBAM

 Other intergrations
 - Basic Powershell test
 - Basic command line

 Impliment Test methedology
 - basic QC testing

--------------------------------
-- Feature Schedule release 1 --
--------------------------------
...


