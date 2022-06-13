const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

module.exports.register = async (req, res, next)  => {
    try {
        
    const {name, email, password, avatarImage} = req.body;
    const nameCheck = await User.findOne({name});

    if(nameCheck)
    return res.json({msg: "Username is already in use", status: false});

    const emailCheck = await User.findOne({email});
    if(emailCheck)
    return res.json({msg: "Email already in use, please use Login"})

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
        name, email, password: hashedPassword, avatarImage
    });
    
    delete user.password;
    return res.json({status: true, user});
    
    
    }
    
    catch(error) {
        next(error);
        console.log(error);
    }
    
};

module.exports.login = async (req, res, next ) => {
    
    try {
        
        const {email, password} = req.body;
        
        const userCheck = await User.findOne({email});
    
        if(!userCheck)
        res.json({auth: false, msg: "Account not found, please register", status: false})
        

        const isPasswordCorrect = await bcrypt.compare(password, userCheck.password);
        if(!isPasswordCorrect)
        res.json({auth: false, msg: "Incorrect Password", status: false})
        
        delete userCheck.password;
        const id = userCheck._id;
                    const token = jwt.sign({id}, "jwtSecret", {
                        //expiresIn: 1000  
                    })

       return res.json({status: true, auth: true, token: token, userCheck})
        
    }
        catch(error) {
            next(error);
            console.log(error);
        }
        
    };

    module.exports.verifyJwt = (req, res, next) => {

        const token = req.headers["x-access-token"]

        if(!token) {
                res.json({ auth: false, msg: "Error, no token found"})
        }
        else {
            jwt.verify(token, "jwtSecret", (error, decoded) => {
                if(error) {
                        res.json({auth: false, msg: "Failed to authenticate", error: error})
                }
                else {
                    req.id = decoded.id;
                    next(); 
                }
            })
        }
}  
    

    module.exports.userAuthentication = async (req, res, next) => {
        res.json({ auth: true, msg: "Authentication Successful"})

    } 

    

module.exports.getAllUsers = async (req, res, next) => {
        try {
                console.log(req.body);
                const users = await User.find({_id: {$ne:req.params.id}}).select([
                    "name", "avatarImage", 
                ]);
                   
                return res.json(users);
        } catch (error) {
            next(error)
        }
}