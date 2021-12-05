const auth = require("../auth");
const express = require("express");
const Top5ListController = require("../controllers/top5list-controller");
const UserController = require("../controllers/user-controller");
const router = express.Router();

router.post("/top5list", auth.verify, Top5ListController.createTop5List);
router.put("/top5list/:id", auth.verify, Top5ListController.updateTop5List);
router.delete("/top5list/:id", auth.verify, Top5ListController.deleteTop5List);
router.get("/top5list/:id", auth.verify, Top5ListController.getTop5ListById);
router.get("/top5lists", auth.verify, Top5ListController.getTop5Lists);
router.get("/top5listsUser", auth.verify, Top5ListController.getTop5ListsUser);
router.get("/top5listpairs", auth.verify, Top5ListController.getTop5ListPairs);

router.post(
	"/top5list/:id/comments",
	auth.verify,
	Top5ListController.createComment
);
router.post("/top5list/:id/views", Top5ListController.updateView);
router.post(
	"/top5list/:id/likes",
	auth.verify,
	Top5ListController.createComment
);
router.post(
	"/top5list/:id/dislikes",
	auth.verify,
	Top5ListController.createComment
);

router.post("/register", UserController.registerUser);
router.post("/login", UserController.loginUser);
router.get("/loggedIn", UserController.getLoggedIn);
router.get("/logout", UserController.logoutUser);

module.exports = router;
