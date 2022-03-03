const router = require('express').Router();
const masterUSER = require('../controllers/userMaster');
const masterEXAM = require('../controllers/examMaster');


const base = "/api/v1/";


router.post(`${base}register`, masterUSER.apiuserRegister);
router.post(`${base}login`, masterUSER.apiuserLogin);
router.post(`${base}saveExam`, masterEXAM.apiExamSave);



module.exports = router;
