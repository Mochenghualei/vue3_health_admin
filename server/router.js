let express = require("express")
let router = express.Router()
let user = require("./api")

router.get("/weight", user.getData)
router.post("/addweight", user.postData)
router.post("/delete", user.deleteData)
router.post("/gettable", user.postPageData)

module.exports = router