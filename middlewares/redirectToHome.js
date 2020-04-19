const redirectToHome = (req, res, next) => {
    if (Object.keys(req.cookies).length >= 1) {
        console.log(Object.keys(req.cookies).length === 0, ">>>>> reqq", req.cookies.jwt)
        return res.redirect("/")
    } else if (Object.keys(req.cookies).length == 0 || req.cookies.jwt === "loggedout") {
        next()
    }
}

module.exports = redirectToHome