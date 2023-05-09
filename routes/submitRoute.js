const router = require("express").Router();
const submitController = require("../controllers/submitController");

router.route('/')
    .get(submitController.renderSubmitPage)
    .post(submitController.submitNewSecret);

module.exports = router;