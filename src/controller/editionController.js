import connection from "../../config/database.js";

export async function editionController (req, res){
    const locals = res.locals
    const {id} = req.params
    const email = locals.user.email
    console.log(email)
    try {
        // const user = connection.query(` SELECT * FROM users
        //                                 WHERE users.email = '${email}'`)
        const post = connection.query(`SELECT * FROM users`)
        console.log('user and post : ', post.rows )
        return res.status(200).send(post.rows)
        
    } catch (error) {
        return res.status(500).send('catch editionController')
    }
}