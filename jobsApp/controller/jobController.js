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
    const jobList = await jobModel.find({
        // salary: { $gt: 9000 }
    })
    res.status(200).json({
        success: true,
        message: "listJob API created",
        results: jobList,
    });
};


// 6694039439f7d8ea48a8e04f

const updateJob = async (req, res) => {
    console.log(req.params.id);
    const jobList = await jobModel.findByIdAndUpdate(req.params.id, {
        $set: req.body,
    })
    res.status(200).json({
        success: true,
        message: "updateJob API created"
    });
};
 

const deletejob = async (req, res) => {
    const deleteId = req.params.id;
    const deleteJob = await jobModel.findByIdAndDelete(deleteId);
    res.status(200).json({
        success: true,
        message: `${deleteId} -> ID deleted`
    });
};

const userJobController = {
    createJob,
    listJob,
    updateJob,
    deletejob,
}

module.exports = userJobController;
