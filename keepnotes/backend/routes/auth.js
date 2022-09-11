const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');


const JWT_SECRET = "Anjanaismyrandi"


// Route-1 : create a User using: POST "/api/auth/createuser". No login required
router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({ min: 5 })
], async (req, res) => {
    let success=false;
    // If there are errors , return cad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        
        return res.status(400).json({success, errors: errors.array() });
    }

    // check whether the user with email exists already
    try {

        let user = await User.findOne({ email: req.body.email });
        if (user) {
            
            return res.status(400).json({ success,error: "Sorry a user with this email already exists" })
        }
        const salt = await bcrypt.genSalt(10);
        secPass = await bcrypt.hash(req.body.password, salt);

        // Create a new User 
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        });

        let data = {
            user: {
                id: user.id
            }
        }

        let authtoken = jwt.sign(data, JWT_SECRET);
        success=true;
        res.json({success, authtoken })

        res.json(user)
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Some error occured");
    }
});

// Route-2 : Authenticate a User using: POST "/api/auth/login". No login required

router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannott be blank').exists()
], async (req, res) => {
    // If there are errors , return cad request and the errors
    let success=false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        
        return res.status(400).json({success, errors: errors.array() });
    }

    let { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (!user) {
            
            return res.status(400).json({success, error: "please try to login with correct credentials" });
        }

        let passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            success=false;
            return res.status(400).json({ error: "please try to login with correct credentials" });
        }

        let data = {
            user: {
                id: user.id
            }
        }
        let authtoken = jwt.sign(data, JWT_SECRET);
        success=true;
        res.json({success, authtoken })

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error occured");
    }
});

// Route-3 : Get logged in user details using: POST "/api/auth/getuser". Login required

router.post('/getuser', fetchuser, async (req, res) => {

    try {
        userId = req.user.id;
        let user = await User.findById(userId).select("-password")
        res.send(user)
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error occured");
    }
});

module.exports = router;