import connection from "../../config/database.js";

export async function testeCountroler (req, res){

    try {
        const teste = await connection.query(`SELECT * FROM users`)
        console.log('dentro do teste')
        return res.status(200).send(teste.rows)
        
    } catch (error) {
        return res.status(500).send('catch teste')
    }
}