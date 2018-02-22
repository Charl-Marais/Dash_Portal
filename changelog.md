Change Log

Commited
0.0.1 	- Initial Commit
0.0.2 	- Intergrate basic AdminLTE template
			Break template appart into seperate ejs files
			setup directory structure
---------------------------------------------------------------------------------------------------------			
MySQL Implimentation
0.0.3 	- Intergrated MySQL database capabilites using mysql2, sequalizer and sequalizer-cli packages
		- Migration directory structure added to enable migration capabilites
		- seeding capabilities implimented to seed development database
		- setup example route to retrieve users from database in index,js and redirected results to users.ejs view
		- fixed bug in template files refering to relative paths
		- redirected root route to point to temp.ejs to display development examples
		- added web.config and Encrypting Web-Config.md to .gitignore
0.0.4 	- Create migration for Asset name and device Serial tables with a 1to1 relation
		- Add view to demonstrate eager loading from 1to1 related tables
		- Create migration for Programs with 1 Device having many programs (1toMany)
		- Add a view to demonstrate eager loading from 1toMany related tables
		- Create a many2many relation between DeviceNames and Users
		- Add view to demonstrate eagar loading of many to many related tables with intermediary table
0.0.5	- Fix bug which keeps trying to recreate the Device and Asset tables in the database.
		- Fix bug which keeps warning about depreciation of sting operators and advised to use serialise op codes instead.
			- Create database\config\config.js to impliment op code fix
			- Remove database\config\config.json which no longer applies
		- Improved security for MySQL connections using ssl certificates
		- Add capabilities to Encrypt sensative columns stored in database, 
		 	! note that there are adverse effects to encrypted columns
		 	- Each column will impede performace of the data retrieval, especially when used with FindAll
		 	- Encrypted columns will have limited search capabilities
			- use only if absolutly nessesary
		- problem identified when using hooks with associations 

Todo

----------
-- CORE --
----------

MySQL implimentations
 - Document above

Cleanup:
 - move the example files into an example directory
 - do a little refractoring of code / functions for re-usability

Impliment security testing into work flow
 - https://snyk.io/docs/using-snyk/#integrating-snyk-into-your-dev-workflow
 - intergrate synk npm into app
 - fix known security issues
 - document above

Enviroment 
 - Secure method to 
	- save sensative information such as enviroment variables
	- Secure sensitive documents
	- secure SSL certificates
	- Encrypt the whole mysql database to protect data from captured database files (better than encrypting individual columns)
 - Setup Test, Dev and Live environment and deployment plan
 - document above

Impliment Test Driven Development methedology
 - (Look at Jasmine test framework.. looks good)
 - basic QC testing
 - document above

Authentication/Authorization
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

Other intergrations
 - Basic Powershell test
 - Basic command line
 - document above

Event based system
 - System which automatically fetches information based on criteria (time based)
 - https://technology.amis.nl/2017/02/19/node-js-application-using-sse-server-sent-events-to-push-updates-read-from-kafka-topic-to-simple-html-client-application/

Refactoring
 - Look at sortening code
 - invesitgate profiling of application
 - load test application
 - Create a test methedology to check MySQL performace capabilities
 	- Max connecton tests
 	- induvidual query performace tests
 - read this: https://www.jeremymorgan.com/tutorials/linux/how-to-load-test-iis-web-server/

Backup methedology
 - IIS Easy Migration Tool (IEMT) (IIS plugin for migrating site to another server)
--------------------------------
-- Feature Schedule release 1 --
--------------------------------
...


