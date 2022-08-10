import connection from "../../config/database.js";

export async function editionController (req, res){
    const {id} = req.params

    try {
    
        return res.status(200).send(teste.rows)
        
    } catch (error) {
        return res.status(500).send('catch editionController')
    }
}