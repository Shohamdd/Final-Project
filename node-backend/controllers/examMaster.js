const mysqlConnection = require('../db/connection');
const CONFIG = require('../config/conf');
const Validator = require("fastest-validator");
const v = new Validator();
const mailservice = require('../config/mail');


exports.apiExamSave = function (req, res) {
    try {
        const {email, scoreObtained, scoreTotal, percentage, status} = req.body;
        mysqlConnection.query(`UPDATE ${CONFIG.tb_user} SET ScoreObtained=?, ScoreTotal=?, Percentage=?, Status=? WHERE Email=?`, [scoreObtained, scoreTotal, percentage, status, email], (err, data) => {
            if (!err) {
                res.json({ status: true, "message": "Exam Form Posted Successfully" });
                let mailvalues = {
                    subject : `Exam Result.`,
                    personName : email,
                    logo : 'Exam Result',
                    content : `Thank you for attempting exam. Here is your Email id = ${email} and you obtained ${scoreObtained} out of ${scoreTotal} and your percentage is ${percentage} and your status is ${status}.`
                }
                mailservice.SharedExamResultsViaEmail(email, mailvalues.subject, mailvalues.personName, mailvalues.logo, mailvalues.content);
            } else {
                res.status(400).json({ status: false, "message": err });
            }
        });
    }
    catch (err) {
        res.status(422).json({ "status": 'fail', "message": err });
        return;
    }
}