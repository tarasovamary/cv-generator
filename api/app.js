const express = require('express');
const app = express();
const { mongoose } = require('./db/mongoose');
const bodyParser = require('body-parser');
const { User } = require('./db/models/user.model');
const { Employee } = require('./db/models/employee.model');
const jwt = require('jsonwebtoken');

/* MIDDLEWARE */

// Load middleware
app.use(bodyParser.json());

// *** CORS Headers ***
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Expose-Headers', 'x-access-token, x-refresh-token');
    next();
});

// Error handling function
const handleError = (res, status, error) => {
    res.status(status).send(error);
}

// Check whether the request has a valid JWT access token
const authenticate = (req, res, next) => {
    const token = req.header('x-access-token');
    jwt.verify(token, User.getJWTSecret(), (error, decoded) => {
        if (error) {
            return handleError(res, 401, error);
        }
        req.user_id = decoded._id;
        next();
    });
}

// Verify refresh token Middleware
const verifySession = async (req, res, next) => {
    const refreshToken = req.header('x-refresh-token');
    const _id = req.header('_id');

    try {
        const user = await User.findByIdAndToken(_id, refreshToken);
        if (!user) {
            return handleError(res, 401, {
                'error': 'User not found. Make sure that the refresh token and user id are correct'
            });
        }

        req.user_id = user._id;
        req.userObject = user;
        req.refreshToken = refreshToken;

        const isSessionValid = user.sessions.some(session => {
            return session.token === refreshToken && !User.hasRefreshTokenExpired(session.expiresAt);
        });

        if (isSessionValid) {
            next();
        } else {
            return handleError(res, 401, {
                'error': 'Refresh token has expired or the session is invalid'
            });
        }
    } catch (error) {
        handleError(res, 401, error);
    }
}

/* USER ROUTES */

/**
 * POST /users
 * Sign up
 */
app.post('/users', async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        const refreshToken = await newUser.createSession();
        const accessToken = await newUser.generateAccessAuthToken();

        res
            .header('x-refresh-token', refreshToken)
            .header('x-access-token', accessToken)
            .send(newUser);
    } catch (error) {
        handleError(res, 400, error);
    }
});

/**
 * POST /users/login
 * Login
 */
app.post('/users/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findByCredentials(email, password);
        const refreshToken = await user.createSession();
        const accessToken = await user.generateAccessAuthToken();

        res
            .header('x-refresh-token', refreshToken)
            .header('x-access-token', accessToken)
            .send(user);
    } catch (error) {
        handleError(res, 400, error);
    }
});

/**
 * GET /users/me/access-token
 * Purpose: generates and returns an access token
 */
app.get('/users/me/access-token', verifySession, async (req, res) => {
    try {
        const accessToken = await req.userObject.generateAccessAuthToken();
        res.header('x-access-token', accessToken).send({ accessToken });
    } catch (error) {
        handleError(res, 400, error);
    }
});

app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});

/* EMPLOYEE ROUTES */

/**
 * POST /employees
 * Create a new employee
 */
app.post('/employees', authenticate, async (req, res) => {
    const { firstName, lastName, email, department, specialization } = req.body;
    
    try {
        const newEmployee = new Employee({ firstName, lastName, email, department, specialization });
        await newEmployee.save();
        res.status(201).send({ message: 'Employee created successfully', newEmployee });
    } catch (error) {
        handleError(res, 400, error);
    }
});

/**
 * GET /employees
 * Get all employees
 */
app.get('/employees', authenticate, async (req, res) => {
    try {
        const employees = await Employee.find();
        res.send(employees);
    } catch (error) {
        handleError(res, 500, error);
    }
});

/**
 * GET /employees/:id
 * Get employee by ID
 */
app.get('/employees/:id', authenticate, async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        if (!employee) {
            return handleError(res, 404, { error: "Employee not found" });
        }
        res.send({ message: 'Employee find successfully', employee});
    } catch (error) {
        handleError(res, 500, error);
    }
});

/**
 * PATCH /employees
 * Update employee information
 */
app.patch('/employees/:id', authenticate, async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    try {
        const employee = await Employee.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
        if (!employee) {
            return handleError(res, 404, { error: "Employee not found" });
        }
        res.send({ message: 'Employee updated successfully', employee });
    } catch (error) {
        handleError(res, 400, error);
    }
});

/**
 * DELETE /employees/:id
 * Delete an existing employee
 */
app.delete('/employees/:id', authenticate, async (req, res) => {
    try {
        const employee = await Employee.findByIdAndDelete(req.params.id);
        if (!employee) {
            return handleError(res, 404, { error: "Employee not found" });
        }
        res.status(200).send({ message: 'Employee deleted successfully' });
    } catch (error) {
        handleError(res, 400, error);
    }
})