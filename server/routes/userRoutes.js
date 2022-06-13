const router = require("express").Router();

const {
  register,
  login,
  setAvatar,
  getAllUsers,
  userAuthentication,
  verifyJwt,
} = require("../controllers/userControllers");

router.post("/register", register);
router.post("/login", login);
router.get("/getAllUsers/:id", getAllUsers);
router.get("/userAuth", verifyJwt, userAuthentication);

module.exports = router;
