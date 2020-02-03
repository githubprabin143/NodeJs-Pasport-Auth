const jwt = require('jsonwebtoken');

function createJwt(jwtObject,secretKey=process.env.JWTSECRET) {
    const token = jwt.sign(
        jwtObject,
        secretKey
      );
    return token
}

function decodeJwt(token,secretKey=process.env.JWTSECRET) {
    let decodedToken;
    try{
        decodedToken = jwt.verify(token,secretKey)
    }catch(err){
        err.statusCode = 500;
        throw err;
    }
    return decodedToken
}


function createTempJwtWithExpiry(jwtObject,expiryDate,secretKey=process.env.JWTSECRET) {
    const token = jwt.sign(
        jwtObject,
        secretKey,
        {expiresIn: expiryDate}
      );
    return token
}

function decodeTempJwtWithExpiry(emailVerificationToken,secretKey=process.env.JWTSECRET) {
    return new Promise((resolve,reject)=>{
        try{
           let decodedToken = jwt.verify(emailVerificationToken,secretKey)
            resolve(decodedToken)
        }catch(err){
            if(err.message ==="jwt expired"){
                err.message ="Token Expired, Please Try Again!!!!!"
            }
           reject(err)
        }
    })
}


module.exports = {
    createJwt:createJwt,
    decodeJwt:decodeJwt,
    createTempJwtWithExpiry:createTempJwtWithExpiry,
    decodeTempJwtWithExpiry:decodeTempJwtWithExpiry
}