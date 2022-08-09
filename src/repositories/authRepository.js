import connection from "../../config/database.js";

async function signUp(email,password,name,pictureUrl){
    return connection.query(`
    INSERT INTO users (name,email,password,"profilePictureUrl") VALUES ($1,$2,$3,$4)
    `,[email,password,name,pictureUrl]);
}
async function emailCheck(email){
    const {rows: alreadyExist} = await connection.query(`
    SELECT * FROM users WHERE email=$1
    `,[email]);
    if(alreadyExist.length>0){
        return true;
    }
    return false;
}

export const authRepository ={
    signUp,
    emailCheck
}