const router = require('express').Router();
const bcrypt = require('bcryptjs')
let User = require('../models/User');
const jwt = require("jsonwebtoken");
const auth = require('../middleware/auth')

//User Route
//Get,Post,Delete,Update

router.route('/').get((req, res) => {
    User.find().then(Users => res.json(Users)).
    catch(err => res.status(400).json('Error: ' + err));
});


router.post("/add", async (req, res) => {
    try {
        let first_name = req.body.first_name;
        let last_name = req.body.last_name;
        let phone = req.body.phone;
        let Address = req.body.Address;
        let UserName = req.body.UserName;
        let email = req.body.email;
        let password = req.body.password;

        const existingUser = await User.findOne({ email: req.body.email });
        console.log(existingUser)
        if (existingUser) {
            res.json({msg:'Already exist a user with the given Email'})
            console.log('exist')
            return res
                .status(400)
                .json({ msg:'Already exist a user with the given Email' })
        }

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);
        const newUser = new User({first_name, last_name, phone, Address, UserName, email, password: passwordHash });
        const saved = await newUser.save();
        res.json({msg:'Registered successfully..!'})
    } catch (e) {
        res.status(500).json({ error: e.message })
    }
});

router.post("/login", async (req, res) => {
    try {
        const email = req.body.email;
        let password = req.body.password;

        const user = await User.findOne({ email: email });

        if (!user) {
            console.log(user)
            console.log("wrong email")
            return res
                .status(400)
                .json({ msg: "No valid account for the given email" })

        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log()
            console.log("Incorrect password")
            return res.status(400).json({ msg: "Invalid Password" });

        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res
            .status(200)
            .json({
                token,
                user: user
            });


    } catch (e) {
        res.status(500).json({ error: e.message });
    }
})

module.exports = router;
