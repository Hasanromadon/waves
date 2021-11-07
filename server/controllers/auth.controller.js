// just a function / object
const {authService} = require('../services');

const authController = {

    async register(req, res, next){
        try {
                    
        const {email, password} = req.body;
        const user = await authService.createUser(email, password);
        const token = await authService.getAuthToken(user);
        res.cookie('x-access-token', token).status(200).send({
            user,
            token
        });
        } catch(err) {
            console.log('err')
        }

    },
    async signin(){
        const hello = await authService.hello();
        console.log(hello)
    },
    async isauth(){
        const hello = await authService.hello();
        console.log(hello)
    },

}

module.exports = authController;