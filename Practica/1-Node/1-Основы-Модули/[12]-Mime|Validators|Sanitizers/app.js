const express = require("express")
const app = express()
const jsonParser = express.json()
const { matchedData, check, validationResult} = require('express-validator');
const { exists } = require("fs");
const { normalize } = require("path");
const path = require("path");
const { default: validator } = require("validator");
const PORT = process.env.PORT || 3000

// app.post("/", jsonParser,

//     [
//         check('userEmail')
//         .equals("kravich@gmail.com")
//         .bail()
//         .withMessage("Нет совпадения на точный email")
//         .isLength({min: 10}),

//         check('userText').isLength({min: 2})

//     ],
//     function (req, res) {
//         try {
//             const errors = (req.result = validationResult(req))
//             console.log(errors)
//             errors.throw()

//             res.end()
//         } catch (err) {
//             err.errors.forEach((item) => console.log(item.nestedErrors))
//             res.status(400).end()
//         }
//     })

// app.post("/", jsonParser,

//     [
//         check('userEmail')
//             .isLength({min: 10}),
//             // .custom((value) => value === "kravich@gmail.com"),
            
//             check('userText').isLength({min: 2})
//             // .custom((value) => value != req.body.userEmail)
//             .customSanitizer((value, {req}) => Number(value))
//     ],
//     function (req, res) {
//         try {
            // const matched = matchedData(req)
            // console.log(matched)
//             const errors = (req.result = validationResult(req))
//             console.log(errors)
//             errors.throw()
            
//             res.end()
//         } catch (err) {
//             err.errors.forEach((item) => console.log(item.nestedErrors))
//             res.status(400).end()
//         }
//     })

// app.post("/", jsonParser,

//     [
//         check('userEmail')
//             .isLength({min: 5}),
            
//         check('userText')
//             .exists({checkFalsy: true}),
//     ],
    
//     function (req, res) {
//         try {
//             const matched = matchedData(req)
//             console.log(matched)

//             const errors = (req.result = validationResult(req))
//             console.log(errors)
//             errors.throw()
            
//             res.end()
//         } catch (err) {
//             err.errors.forEach((item) => console.log(item.nestedErrors))
//             res.status(400).end()
//         }
//     }
// )


app.post("/", jsonParser,
    // { userEmail: 'corlack1997@gmail.com', userText: '' }
    [
        check('userEmail')
            .isEmail(),
            
        check('userText') 
            .isLength({min: 1})
    ],
    
    function (req, res) {

        const bodyData = matchedData(req, { locations: ['body'] })
        const allData = matchedData(req, {onlyValidData: false})

        console.log(allData) // тоже самое, что и на вход
        console.log(bodyData)
        res.end()

    })

app.use(express.static(path.join(__dirname, 'public')))
app.listen(PORT)
