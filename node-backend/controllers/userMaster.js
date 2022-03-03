const mysqlConnection = require('../db/connection');
const CONFIG = require('../config/conf');
const Validator = require("fastest-validator");
const v = new Validator();
const schemaUserForm = require('../Validations/userSchema'); const e = require('express');
var passwordHash = require('password-hash');



exports.apiuserRegister = function (req, res) {
    try {
        const { username, email, password } = req.body;

        if ((v.validate(req.body, schemaUserForm)) === true) {
            var sqlUserAlreadyExist = `SELECT COUNT(*) FROM ${CONFIG.tb_user} WHERE Username = '${username}' OR Email = '${email}'`;
            mysqlConnection.query(sqlUserAlreadyExist, function (err, result) {
                if (err) console.log(err)
                if (result[0]['COUNT(*)'] > 0) {
                    res.status(400).json({ status: false, "message": "User Already Exist" });

                } else {
                    var hashedPassword = passwordHash.generate(password);
                    var sql = `INSERT INTO ${CONFIG.tb_user} (Username, Email, Password, ScoreObtained, ScoreTotal, Percentage, Status) VALUES ?`;
                    var values = [[username, email, hashedPassword, null, null, null, null]];
                    mysqlConnection.query(sql, [values], function (err, result) {
                        if (err) console.log(err)
                        res.json({ "status": 'success', "message": "Contact Form Posted Successfully" });
                    });
                }
            });

        } else {
            res.status(400).json({ status: false, "message": v.validate(req.body, schemaUserForm) });
        }

    } catch (err) {
        res.status(422).json({ "status": 'fail', "message": err });
        return;
    }

}

exports.apiuserLogin = function (req, res) {
    const { email, password } = req.body;

    mysqlConnection.query(`SELECT * FROM ${CONFIG.tb_user} where Email=?`, [email], (err, data) => {
        if (!err) {
            if (data.length > 0) {
                if (passwordHash.verify(password, data[0].Password)) {
                    res.json({ status: true, "message": "Login Successful", "data": data });
                } else {
                    res.status(400).json({ status: false, "message": "Wrong Password" });
                }
            } else {
                res.status(400).json({ status: false, "message": "User Not Found" });
            }
        }
        else {

            res.status(424).json({ status: false, "message": err });
        }
    })
}
