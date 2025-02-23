var express = require('express');
var router = express.Router();

const userController = require('../controllers/userController');
const upload = require('../middelwares/uploadFile');
const {requireAuthUser} = require('../middelwares/authMiddleware');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json('hello');
});

router.post('/addUserClient',userController.addUserClient); 
router.post('/addUserAdmin',userController.addUserAdmin); 
router.get('/getAllUsers',requireAuthUser,userController.getAllUsers); 
router.get('/getUserById/:id',userController.getUserById); 
router.delete('/deleteUserById/:id',userController.deleteUserById); 
router.post('/addUserClientWithImg',upload.single("image_user"),userController.addUserClientWithImg); 
router.put('/updateuserById/:id',userController.updateuserById); 
router.get('/searchUserByUsername',userController.searchUserByUsername);
router.get('/getAllUsersSortByAge',userController.getAllUsersSortByAge); 
router.get('/getAllUsersAge/:age',userController.getAllUsersAge); 
router.get('/getAllUsersAgeBetMaxAgeMinAge',userController.getAllUsersAgeBetMaxAgeMinAge);
router.get('/getAllClient',userController.getAllClient); 
router.get('/getAllAdmin',userController.getAllAdmin);

router.post('/login',userController.login);

module.exports = router;
