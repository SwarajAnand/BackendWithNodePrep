# Twitter Backend Clone ---------

## Base Url -> /api/v1/users

http://localhost:8080/api/v1/users/

### ROUTES ->

/signup -> Public route -> basic need  
{  
"userName": "John Doe",  
"email": "john.doe@example.com",  
"password": "12345678"  
}  <br/>  

/login -> Public route -> basic need 
{    
"email": "john.doe@example.com",  
"password": "12345678"  
}  
<b>If the user login successfully it get JWT which get as a response save in the header and then go inside</b>
<br/>  
/update -> req.body data what to be updated  
<br/> 
logout -> If the user is login and verified the it get logout  
<br/> 
/createpost -> {  
    type 1 -> Title and description <b>Needed</b>  
    type 2 -> All upper with a image  
}   
<br/> 
/profilePosts -> req.query.id ie ~ profilePosts?id=someId -> This give the user all posts used for profile view stuff  
<br>
allPosts -> http://localhost:8080/api/v1/users/allPosts?page=2&limit=3  <br> 
Give all posts till now with pagination and limit  

removePost -> Delete post from DB, Cloudinary, User Post[]
