const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    userName: { type: String, unique: true },
    email: { type: String, unique: true },
    password: String,
});

userSchema.methods.correctPassword = async function (
    candidatePassword,
    userPassword
) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.pre("save", async function (next) {
    // run this function if password was actually modified
    if (!this.isModified("password")) return next();

    //Hash the password with salt(cost) of 12
    this.password = await bcrypt.hash(this.password, 12);

    next();
});

module.exports = mongoose.model("User", userSchema);
