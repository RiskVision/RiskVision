const {db} = require('../config/fireBaseConf')
const {generateToken} = require('../jwUtils');

module.exports = {
    login: async (req,res)=>{
        try{
            const snapshot = await db.collection('Login-info').where('user', '==', req.body.user).get()
            const user = snapshot.docs[0].data()
            console.log(user.password)
            if(req.body.password == user.password){
                const token = generateToken(user)

                res.status(200).send({
                    message: "Success",
                    token: token
                })
            }else{
                res.status(401).send({message: "wrong password"})
            }
        }catch(error){
            res.status(500).send("Wrong request")
            console.log(error)
        }
        
    }
}

