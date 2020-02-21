const Tour = require("../models/Tour")

exports.checkTourId = async (req, res, next) => {
    try {
            await Tour.findOne({
            _id: req.params.id
       })
    } catch(err) {
        return res.status(400).json({
            status: "fail",
            message: "Invalid ID"
        })
    }
   next()
}
