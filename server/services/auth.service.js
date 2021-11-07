const { User } = require("../models/user");

const createUser = async(email, password)=> {
    try {

        if(await User.emailTaken(email)) {
            console.log('find email')
            throw new Error('Email already exist')
        }

        const user = new User({
            email,password
        })
        await user.save();
        return user;

    }catch(err) {
        console.log(err);
    }
}

const getAuthToken = (user) => {
 const token = user.generateAuthToken(user);
 return token;
}

module.exports = {
    createUser,
    getAuthToken
};