// REQUIRES
const express = require('express')
const status = require('http-status') // Lets you return standard
const router = express.Router()

console.log("Intializing testRoutes.js")

/**
 * Purpose: Says hello to the user
 * Full path: /api/tests/hello/:name
 * req: name: String (unique)
 * res: http status code and message
 */
router.get('/hello/:name', async (req, res) => {
    let nameParam = req.params.name;
    
    console.log(nameParam + " called the hello endpoint");

    res.status(status.OK).json({
        title: 'Hello ' + nameParam,
        winner: 'YOU!'
    })
})

/**
 * Purpose: Says hello to the user and prints the body
 * Full path: /api/tests/hello
 * req: name: String (unique)
 * res: http status code and message
 */
 router.get('/hello', async (req, res) => {
    let body = req.body;
    
    console.log(body);

    res.status(status.OK).json({
        title: 'We printed the body',
        winner: 'Me!'
    })
})

module.exports = router;