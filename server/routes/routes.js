const express = require("express")
const router = express.Router()
const controller = require("../controller/controller.js")
const path = "routes"

router.get(`/${path}`,controller.getData)
router.get(`/${path}/:id`,controller.getDataOne)
router.post(`/${path}`,controller.inserData)
router.put(`/${path}/:id`,controller.updateData)
router.delete(`/${path}/:id`,controller.deleteData)
module.exports = router