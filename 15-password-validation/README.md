Program that validates a users login credentials. Program will prompt user on whether to create an account or to login to an existing account. 
If user chooses to create an account, program will prompt user for a username and a password.
Program can store multiple username and passwords within a map. Program uses bcrypt to convert user password into a hash which is saved in the map. 
If user chooses to login they are prompted for both their username and password. 
If the username matches with the username stored within the map and user password matches with the stored hashes version. User will log in. 

#### Challenges 
- Make program case sensitive
- Store usernames and passwords in a map 
- Enocde password using bcrypt 