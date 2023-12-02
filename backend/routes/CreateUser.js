const { Router } = require('express');
const router = Router();
const User = require('../models/User')

const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const jwtSecret = "Mynameisanishsharma$#"

router.post('/createuser', [
    body('email','Incorrect email').isEmail(),
    body('name').isLength({ min: 5 }),
    body('password', 'Incorrect password').isLength({ min: 5 })],
    async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log("Error")
            return res.status(400).json({ errors: errors.array() });
        }

        const salt = await bcrypt.genSalt(10)
        let secPassword = await bcrypt.hash(req.body.password,salt)
        try {
            await User.create({
                name: req.body.name,
                location: req.body.location,
                email: req.body.email,
                password: secPassword
            })
            res.json({ success: true })
        } catch (error) {
            console.log(error)
            res.json({ success: false })
        }
    })

router.post('/loginuser', [
    body('email').isEmail(),
    body('password', 'Incorrect password').isLength({ min: 5 })],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            let email = req.body.email
            let userData = await User.findOne({ email })

            if (!userData) {
                return res.status(400).json({ errors: "Try logging with correct credentials" });
            }

            const passwordCompare = await bcrypt.compare(req.body.password,userData.password)

            if (!passwordCompare) {
                return res.status(400).json({ errors: "Try logging with correct credentials" });
            }

            const data = {
                user:{
                    id:userData.id
                }
            }
            const authToken = jwt.sign(data,jwtSecret)

            return res.json({ success: true, authToken:authToken });
        } catch (error) {
            console.log(error)
            res.json({ success: false })
        }
    })

    router.post('/getlocation', async (req, res) => {
        try {
            let lat = req.body.latlong.lat
            let long = req.body.latlong.long
            console.log(lat, long)
            let location = await axios
                .get("https://api.opencagedata.com/geocode/v1/json?q=" + lat + "+" + long + "&key=74c89b3be64946ac96d777d08b878d43")
                .then(async res => {
                    // console.log(`statusCode: ${res.status}`)
                    console.log(res.data.results)
                    // let response = stringify(res)
                    // response = await JSON.parse(response)
                    let response = res.data.results[0].components;
                    console.log(response)
                    let { village, county, state_district, state, postcode } = response
                    return String(village + "," + county + "," + state_district + "," + state + "\n" + postcode)
                })
                .catch(error => {
                    console.error(error)
                })
            res.send({ location })
    
        } catch (error) {
            console.error(error.message)
            res.send("Server Error")
    
        }
    })

module.exports = router