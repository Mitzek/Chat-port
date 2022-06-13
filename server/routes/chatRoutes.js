const router = require("express").Router();

const  { sendMsg, getAllMsgs  } =  require("../controllers/chatControllers")


router.post("/sendMsg/", sendMsg );
router.post("/getAllMsgs/", getAllMsgs );


module.exports = router;