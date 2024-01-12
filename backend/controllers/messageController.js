import asyncHandler from "express-async-handler";


const sendMessage = asyncHandler(async(res,req)=> {
    const { recipientId, message } = req.body
    const senderId = req.user._id
    

})

export {
    sendMessage
}
