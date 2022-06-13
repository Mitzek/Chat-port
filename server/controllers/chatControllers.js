const Chat = require("../models/chatModel");


module.exports.sendMsg = async (req, res, next)  => {
    try {
        
        const { from, to, message} = req.body;
        const data = await Chat.create({
            message:{text:message },
            users: [from, to],
            sender: from,
        })
        if(data) return res.json({msg: "Message Added Successfully"})
        else return res.json({msg: "Failed to add message to DB"})
    }
    
    catch(error) {
        next(error);
        console.log(error);
    }
    
};

module.exports.getAllMsgs = async (req, res, next)  => {
    try {
        const {from, to} = req.body;
        
        
        const messages = await Chat.find({
            users: {
                $all: [from, to],    
            },

            
        }).sort({updatedAt: 1});
           
    const projectedMessages = messages.map((msg) => {
        const date1 = new Date(msg.createdAt)
        const date = date1.getHours() + ":" + date1.getMinutes() + "-" + date1.getDate() + "/" + (date1.getMonth()+1) + "/" + (date1.getFullYear() - 2000);
        //console.log(data.getFullYear());
        
        return{
            fromSelf:msg.sender.toString() === from, 
            message: msg.message.text, 
            time: date,
        };
    });

    res.json(projectedMessages)
    
    }
    catch(error) {
        next(error);
        console.log(error);
    }
    
};