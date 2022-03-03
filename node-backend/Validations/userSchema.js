const userSchema = {
    username: { type: "string", min: 3, max: 30, required: true },
    email: { type: "email", required: true },
    password: { type: "string", min: 6, max: 30, required: true },
    confirmPassword: { type: "equal", field: "password" },
    scoreObtained: { type: "number", required: false, optional: true },
    scoreTotal: { type: "number", required: false, optional: true },
    percentage: { type: "number", required: false, optional: true },
    status: { type: "string", required: false, optional: true }
}


module.exports = userSchema;