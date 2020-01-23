const express = require('express')
const cors = require('cors')
const app = express();
const auth = require('../middleware/auth')
app.use(cors());
const User = require('../models/User')
const Teacher = require('../models/Teacher')

const router = new express.Router()



router.delete('/del/:id', function (req, res) {
    Teacher.findByIdAndDelete(req.params.id).then(function () {
        res.send("Deleted");
    }).catch(function (e) {
        res.send(e)
    });
});

router.post("/teacher", (req, res) => {
    var myData = new Teacher(req.body);
    myData.save();
    res.send('Success')
});

router.post("/signup", (req, res) => {
    var myData = new User(req.body);
    myData.save();
    res.send('Success')
});

router.post("/login", async function (req, res) {

    try {
        const user = await User.checkCrediantialsDb(req.body.mobile,
            req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token })
    }
    catch{
        res.send("Sorry... Connection failed..!")
    }
})

router.get("/admin_dashboard", auth, function (req, res) {
    user_type = req.user_type
    username = req.username
    if (user_type == "admin") {
        res.send("Hi " + username + " \n Admin User")
    }
    else {
        res.send("You are not currently logged in as admin user")
    }
})

router.get("/normal_dashboard", auth, function (req, res) {
    user_type = req.user_type
    username = req.username
    if (user_type == "normal") {
        res.send("Hi " + username + " \n Normal User")
    }
    else {
        res.send("You are not currently logged in as normal user")
    }
})

router.get("/test_user", auth, function (req, res) {
    user_type = req.user_type
    username = req.username
    if (user_type == "normal") {
        res.send("Hi " + username + " -> Normal User")
    }
    else {
        res.send("Hi " + username + " -> Admin User")
    }

})

router.get('/view', function (req, res) {
    User.find().then(function (xyz) {
        res.send(xyz);
    }).catch(function (e) {
        res.send(e)
    });
});

router.get('/singleuser/:id', function (req, res) {
    User.findOne({_id :req.params.id}).then(function (xyz) {
        res.send(xyz);
    }).catch(function (e) {
        res.send(e)
    });
});

router.get('/teach', function (req, res) {
    Teacher.find().then(function (xyz) {
        res.send(xyz);
    }).catch(function (e) {
        res.send(e)
    });
});


router.delete('/deleteuser/:id', function (req, res) {
    User.findByIdAndDelete(req.params.id).then(function () {
        res.send("Deleted");
    }).catch(function (e) {
        res.send(e)
    });
});


router.put('/updateuser/:id', function (req, res) {
    user.findByIdAndUpdate({ _id: req.params.id }, req.body).then(function () {
        res.send('Updated');
    }).catch(function (e) {
        res.send(e)
    });
});


module.exports = router