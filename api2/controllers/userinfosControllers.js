import pool from '../db.js';

//유저 전체 검색
export const getAllUsers = async(req, res) => {
    try{
        console.log('getAllUsers')
        const [rows] = await pool.query(
            `
            SELECT 
                   *
            FROM
                   userinfos
            `);
            res.status(200).json({ rows: rows });
        } catch(error){
          res.status(400).json({ error: error.message });
    } 
}

//유저 검색
export const getUser = async(req, res) => {
    const { id } = req.params;
    try{
        console.log('id : ', id)
        const [rows] = await pool.query(
            `
                SELECT 
                    *
                FROM
                    userinfos ui
                WHERE 
                    ui.id = ?
            `, [id]);
            res.status(200).json({ rows: rows });
        } catch(error){
          res.status(400).json({ error: error.message });
    } 
}

//유저 수정
export const updateUser = async (req, res) => {
    const { username, email, realname, country, city, phone, profile } = req.body;
    const { id } = req.params;

    const connection = await pool.getConnection();

    try {
        await connection.beginTransaction();

        // Update the userinfos table
        const [updateResult] = await connection.query(
            `
              UPDATE userinfos ui
              SET
                    ui.username = COALESCE(?, ui.username),
                    ui.email = COALESCE(?, ui.email),
                    ui.realname = COALESCE(?, ui.realname),
                    ui.country = COALESCE(?, ui.country),
                    ui.city = COALESCE(?, ui.city),
                    ui.phone = COALESCE(?, ui.phone),
                    ui.profile = COALESCE(?, ui.profile)
              WHERE ui.id = ?
            `,
            [username, email, realname, country, city, phone, profile, id]
        );

        if (updateResult.affectedRows === 0) {
            throw new Error('User record not found or no changes made');
        }

        await connection.commit();

        res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
        await connection.rollback();
        res.status(400).json({ error: error.message });
    } finally {
        connection.release();
    }
};

//유저 삭제
export const deleteUser = async (req, res) => {
    try{
        const {id} = req.params;
        console.log('id: ', id)
        const [rows] = await pool.query(
            `DELETE FROM userinfos ui WHERE ui.id = ?`, [id]);
            res.status(200).json({ rows: rows }); 
    } catch (error){
        res.status(400).json({ error: error.message });
    }
};