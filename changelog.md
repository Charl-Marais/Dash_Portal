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
0.0.4 	- Create migration for DeviceName and Serial tables with a 1to1 relation
		- Add view to demonstrate eager loading from 1to1 related tables
		- Create migration for Programs with 1 Device having many programs (1toMany)
		- Add a view to demonstrate eager loading from 1toMany related tables
		- Create a many2many relation between DeviceNames and Users
		- Add view to demonstrate eagar loading of many to many related tables with intermediary table

Todo

----------
-- BASE --
----------
MySQL implimentations
 - Create a test to check MySQL connection capabilities
 - Improve security for MySQL connections
 - Encrypt information stored in database
 - Document above

 Enviroment 
  - Secure method to save sensative information such as account names
  - Setup a Test, Dev and Live environment and deployment plan
  - document above

Authentication/Autorization
 - Authenticate via LDAP
 - Authorize based on security groups
 - Single Sign On capabilities
 - login screen
 - document above

Express configs
 - Configure sessions per user
 - impliment CSFR strings
 - document above

 Other Database intergrations
  - Secure method to collect information from SCCM, LDAPS, Symantec, MBAM
  - document above

 Event based system
  - System which automatically fetches information based on criteria (time based)
  https://technology.amis.nl/2017/02/19/node-js-application-using-sse-server-sent-events-to-push-updates-read-from-kafka-topic-to-simple-html-client-application/

 Other intergrations
 - Basic Powershell test
 - Basic command line
 - document above

 Impliment Test Driver Development methedology
 - basic QC testing
 - document above

--------------------------------
-- Feature Schedule release 1 --
--------------------------------
...


