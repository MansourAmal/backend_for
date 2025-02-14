var express = require('express');
var router = express.Router();

const userController = require('../controllers/userController');
const upload = require('../middelwares/uploadFile');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json('hello');
});

router.post('/addUserClient',userController.addUserClient); 
router.post('/addUserAdmin',userController.addUserAdmin); 
router.get('/getAllUsers',userController.getAllUsers); 
router.get('/getUserById/:id',userController.getUserById); 
router.delete('/deleteUserById/:id',userController.deleteUserById); 

router.post('/addUserClientWithImg',upload.single("image_user"),userController.addUserClientWithImg); 


module.exports = router;
