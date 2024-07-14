const express = require("express");
const app = express();

const PORT = 8080;

app.use(express.json());

// Error handling middleware
const errorHandler = (err, req, res, next) => {
    res.status(400).json({ error: err.message });
}

// Middleware to validate names
const validateNames = (req, res, next) => {
    const { fName, lName } = req.body;

    if (!fName || fName[0] !== fName[0].toUpperCase()) {
        return next(new Error('First name must start with an uppercase letter.'));
    }

    if (!lName || lName[0] !== lName[0].toUpperCase()) {
        return next(new Error('Last name must start with an uppercase letter.'));
    }

    next();
}

// Middleware to validate password
const validatePassword = (req, res, next) => {
    const { password } = req.body;
    const passwordCriteria = /^(?=.*[A-Z])(?=.*\d)(?=.*\W).{8,}$/;

    if (!password || !passwordCriteria.test(password)) {
        return next(new Error('Password must be at least 8 characters long and contain at least one uppercase letter, one numeric character, and one special character.'));
    }

    next();
}

// Middleware to validate email
const validateEmail = (req, res, next) => {
    const { email } = req.body;

    if (!email || !email.includes('@')) {
        return next(new Error('Invalid email address.'));
    }

    next();
}

// Middleware to validate phone number
const validatePhoneNumber = (req, res, next) => {
    const { phone } = req.body;

    if (!phone || phone.length < 10) {
        return next(new Error('Phone number must be at least 10 digits long.'));
    }

    next();
}

// User registration endpoint with validation middlewares
app.post("/", validateNames, validatePassword, validateEmail, validatePhoneNumber, (req, res) => {
    console.log(req.body);
    res.status(200).send("Hello World");
})

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
