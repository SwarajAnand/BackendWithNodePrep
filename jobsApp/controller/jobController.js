const createJob = (req, res) => {
    res.status(200).json({
        success: true,
        message: "createJob API created"
    });
};

const listJob = (req, res) => {
    res.status(200).json({
        success: true,
        message: "listJob API created"
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
