const JWT = require('jsonwebtoken');
const secret = "$uperman@123";


// create token for user
function createTokenForUser(user){
    const payload ={
        id:user._id,
        email:user.email,
        profileImageURL:user.profileImageURL,
        role:user.role,
    }
    // create a token
    const token = JWT.sign(payload,secret);
    return  token;
}

function validateToken(token){
    const payload = JWT.verify(token,secret);
    return payload;
}

module.exports = {
    createTokenForUser,validateToken 
}