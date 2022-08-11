import connection from "../../config/database.js";

export async function editionController (req, res){
    const locals = res.locals
    console.log('locals :', locals)
    const {id} = req.params
    console.log('id :', id)
    const email = locals.user.email
    console.log(email)
    try {
        const users = connection.query(` SELECT * FROM users`)
        console.log('users:', users.rows )
        return res.status(200).send(users.rows)
        
    } catch (error) {
        return res.status(500).send('catch editionController')
    }
}