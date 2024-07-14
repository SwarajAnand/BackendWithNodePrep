const jobModel = require("../model/jobModel");


const createJob = (req, res) => {
    console.log(req.body);
    jobModel.create(req.body).then((data) => {
        console.log(data);
    })
    res.status(200).json({
        success: true,
        message: "createJob API created"
    });
};

const listJob = async (req, res) => {
    const jobList = await jobModel.find()
    res.status(200).json({
        success: true,
        message: "listJob API created",
        results: jobList,
    });
};

const updateJob = (req, res) => {
    res.status(200).json({
        success: true,
        message: "updateJob API created"
    });
};
 

const deletejob = (req, res) => {
    res.status(200).json({
        success: true,
        message: "deletejob API created"
    });
};

const userJobController = {
    createJob,
    listJob,
    updateJob,
    deletejob,
}

module.exports = userJobController;
