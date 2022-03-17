const jwt = require('jsonwebtoken');


// SIGN METHOD
module.exports.createToken = (data) => {

    let userData = {

        id: data._id,
        email: data.email,
        isAdmin: data.isAdmin
    }


    return jwt.sign(userData, process.env.SECRET_PASS);

}




// VERIFY METHOD
module.exports.verify = (req, res, next) => {

    const requestToken = req.headers.authorization

    if (typeof requestToken == "undefined") {
        res.status(401).send({ message: `Token Missing` })

    }
    else {
        const token = requestToken.split(" ")[1];

        if (typeof requestToken !== "undefined") {

            jwt.verify(token, process.env.SECRET_PASS, (err) => {

                if (err) {

                    return { auth: `Auth Failed!` }

                }
                else {

                    next()
                }
            })
        }
    }
}




// DECODE METHOD
module.exports.decode = (bearerToken) => {

    const token = bearerToken.split(" ")[1];

    return jwt.decode(token)
}




// IS ADMIN ACCESS
module.exports.verifyAdmin = (req, res, next) => {

    const requestToken = req.headers.authorization
    // console.log(requestToken)


    if (typeof requestToken == "undefined") {
        res.status(401).send({ message: `Token Missing` })

    }
    else {

        const token = requestToken.split(" ")[1];
        // console.log(token)

        if (typeof requestToken !== "undefined") {

            const admin = jwt.decode(token).isAdmin

            if (admin) {
                jwt.verify(token, process.env.SECRET_PASS, (err) => {

                    if (err) {
                        return res.send({ message: `Auth Failed` })
                    }
                    else {
                        next()
                    }
                })
            }
            else {
                res.status(403).send(`You are not authorized.`)

            }

        }

    }


}



// USER ACCESS ONLY
module.exports.verifyUser = (req, res, next) => {

    const requestToken = req.headers.authorization


    if (typeof requestToken == "undefined") {
        res.status(401).send({ message: `Token Missing` })

    }
    else {

        const token = requestToken.split(" ")[1];
        // console.log(token)

        if (typeof requestToken !== "undefined") {

            const admin = jwt.decode(token).isAdmin

            if (admin == false) {
                jwt.verify(token, process.env.SECRET_PASS, (err) => {

                    if (err) {
                        return res.send({ message: `Auth Failed`})
                    }
                    else {
                        next()
                    }
                })
            }
            else {
                res.status(403).send(`Only users can create an order`)

            }

        }

    }
}

