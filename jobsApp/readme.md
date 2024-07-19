# live API Link
https://jobapp-5p5f.onrender.com/api/jobs

# Routes

Get all jobs -> http://localhost:8080/api/jobs/  
Post new jobs -> http://localhost:8080/api/jobs/ need a body also  
Update a Job -> http://localhost:8080/api/jobs/ ( pass a id as paramater ) and data in body to get updated  
Delete a job -> http://localhost:8080/api/jobs/ ( pass a id as paramater )

# Create a basic Job portal

-> Steps  
 -> Add express and create a port and listen to start a server  
 -> Create the routes and use them  
 -> Create a controller like that

const createJob = (req, res) => {
res.status(200).json({
success: true,
message: "createJob API created"
});
};

# Uses like this

router.post("/api/jobs", createJob);

Till now our server is on and the router are good to go create as many as you want

# Now going to Add the DB

    -> Added Mongoose
    -> Create schema
