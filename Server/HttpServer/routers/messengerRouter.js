// libes
const { Router } = require("express");
// middleware
const authMiddleware = require("../middleware/authMiddleware");
// controler
const MessengerControler = require("../controlers/MessengerControler");

const router = new Router();

/////////// conversations //////////////////////////
//new Convers and groupConversation
router.post("/new_convers", authMiddleware, MessengerControler.newConversation);
// get Convers
router.post("/conversation_by_user_id", authMiddleware, MessengerControler.getConvById);
router.post("/about_companion", authMiddleware, MessengerControler.aboutConvers);

///////////////// groups ////////////////////////////
//// create new group
router.post("/new_group", MessengerControler.newGrupConversation)
// add user in group
router.post("/add_to_group", MessengerControler.addUsersGrup)
//// get groups for loged user 
router.post("/group_by_user_id", MessengerControler.getGropuById)

/////////////// messages /////////////////
// add Mess
router.post("/sendmessage", MessengerControler.addMess);
// get mess
router.get("/mess:coversId", authMiddleware, MessengerControler.getConvById);
// get registred users for search
router.get("/all_registered_users", authMiddleware, MessengerControler.getUsersForSearch)
module.exports = router;

