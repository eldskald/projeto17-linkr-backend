import connection from "../../config/database.js";

async function signUp(email,password,name,pictureUrl){
    return await connection.query(`
    INSERT INTO users (name,email,password,"profilePictureUrl") VALUES ($1,$2,$3,$4)
    `,[name,email,password,pictureUrl]);
}
async function signIn(email){
    const {rows:user} = await connection.query(`
    SELECT * FROM users WHERE email=$1
    `,[email]);
    return user[0];
}
async function newSession(userId){
    connection.query(`
    INSERT INTO sessions ("userId") VALUES ($1)
    `,[userId])    
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
async function getUser(userId){
    const {rows:user}=await connection.query(`
    SELECT "id",name,email,"profilePictureUrl" FROM users WHERE id=$1
    `,[userId])
    return user[0];
}

export const authRepository ={
    signUp,
    signIn,
    newSession,
    getUser,
    emailCheck
}
