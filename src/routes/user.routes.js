const router = require("express").Router();
const controller = require("../controllers/user.controller");

router.get("/", controller.listUsers);
router.post("/", controller.createUser);
router.get("/:id", controller.getUser);
router.put("/:id", controller.updateUser);
router.delete("/:id", controller.deleteUser);

module.exports = router;