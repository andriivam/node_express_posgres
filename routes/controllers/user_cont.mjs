import { client } from '../../index.mjs'
export const getAllUsers = (req, res) => {
    
        client.query(`select distinct * from users order by id`, (err, results) => {
            if (!err) {
            res.json(results);
            } else {
            console.log(err.message);
            }
        });
    
};
export const getOneUser = (req, res) => {
    const id = parseInt(req.params.id);
    client.query(`SELECT DISTINCT * FROM users WHERE id = ${id}`,  (err, results) => {
        if(!err) {
            res.json(results)
        } else {
            console.log(err.message);
        }
    })
 
 };

 export const createUser = (req, res) => {
    const { first_name, last_name, email, ip } = req.body;
    client.query(
        "INSERT INTO users (first_name, last_name, email, ip) VALUES ($1, $2, $3, $4) RETURNING *",
        [first_name, last_name, email, ip],
        (error, results) => {
        if (error) {
            console.log(error.message, "add new user");
        }
        res.send(`User added with ID: ${results.rows[0].id}`);
        }
    );
}

export const changeUser = (req, res) => {
    const id = parseInt(req.params.id)
    const {
        first_name,
        last_name,
        email,
        ip
    } = req.body
    client.query(
        'UPDATE users SET  first_name = $1, last_name =$2, email = $3, ip = $4 WHERE id = $5',
        [first_name, last_name, email, ip, id],
        (error, results) => {
            if (error) {
                throw error
            }
            console.log(results)
            res.status(200).send(`User modified with ID: ${id}`)
        }
    )
}


export const deleteUser = (req, res) => {
    const id = parseInt(req.params.id);
    client.query(`DELETE FROM users WHERE id =${id}`, (err, result) => {
        if(!err) {
            res.json(result.data)
            console.log(result, 'User was deleted')
        } else {
            console.log(err.message)
        }
    })
}


const changeUserDetail = (req, res) => {
    const id = parseInt(req.params.id)
    const {first_name, last_name, email, ip} = req.body
}