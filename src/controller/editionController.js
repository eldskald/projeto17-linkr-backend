import connection from "../../config/database.js";

export async function editionController (req, res){
    const authorization = req.headers.authorization;
    const token = authorization?.replace("Bearer ", "");
    
    const {id} = req.params
    
    try {
        // const userId = await connection.query(`SELECT `)
        return res.status(200).send(teste.rows)
        
    } catch (error) {
        return res.status(500).send('catch editionController')
    }
}