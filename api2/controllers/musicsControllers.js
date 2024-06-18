import pool from '../db.js';

//음악 리스트 생성
export const createMusic = async (req, res) => {
    const { artist, title, genre, link } = req.body;
    const { user_id } = req.params;  // 라우트 경로에서 user_id 추출

    try {
        // 트랜잭션 시작
        await pool.query('START TRANSACTION');

        // musics 테이블에 데이터 삽입
        const [musicsPostResult] = await pool.query(
            'INSERT INTO musics (user_id, artist, title, genre) VALUES (?, ?, ?, ?)',
            [user_id, artist, title, genre]
        );

        // 삽입된 레코드의 ID 가져오기
        const music_id = musicsPostResult.insertId;

        // links 테이블에 데이터 삽입
        await pool.query(
            'INSERT INTO links (music_id, link) VALUES (?, ?)',
            [music_id, link]
        );

        // 트랜잭션 커밋
        await pool.query('COMMIT');

        res.status(200).json({ message: 'Music and link added successfully' });
    } catch (error) {
        // 트랜잭션 롤백
        await pool.query('ROLLBACK');

        res.status(400).json({ error: error.message });
    }
};

//모든 음악 정보 조회
export const getAllMusics = async (req, res) => {
    try {
        const [rows] = await pool.query(
            `SELECT
                m.artist AS Artist,
                m.title AS Title,
                m.genre AS Genre,
                l.link AS Link
            FROM
                musics m
            LEFT JOIN
                links l ON m.id = l.music_id
            INNER JOIN
                userinfos u ON u.id = m.user_id`
        );
        res.status(200).json({ rows });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

//장르별 음악 조회
export const getGenreMusics = async (req, res) => {
    try {
        const { genre } = req.params; // genre 파라미터 가져오기
        console.log('genre: ', genre);
        const [rows] = await pool.query(
            `SELECT
                m.artist AS Artist,
                m.title AS Title,
                m.genre AS Genre,
                l.link AS Link
            FROM
                musics m
            LEFT JOIN
                links l ON m.id = l.music_id
            INNER JOIN
                userinfos u ON u.id = m.user_id
            WHERE
                m.genre = ?`, [genre]
        );
        res.status(200).json({ rows });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

//id로 음악 조회
export const getIDMusics = async (req, res) => {
    try {
        const { user_id } = req.params;
        console.log('user_id:', user_id);
        const [rows] = await pool.query(
            `
            SELECT 
                m.artist AS Artist,
                m.title AS Title,
                m.genre AS Genre,
                l.link AS Link
            FROM 
                musics m
            INNER JOIN
                userinfos u ON u.id = m.user_id
            LEFT JOIN
                links l ON m.id = l.music_id
            WHERE
                u.id = ?`, [user_id]
        );

        res.status(200).json({ rows });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


// 음악 업데이트
export const updateMusic = async (req, res) => {
    const { artist, title, genre, link } = req.body;
    const { id } = req.params; 

    const connection = await pool.getConnection();

    try {
        await connection.beginTransaction();

        // Update the musics table
        const [musicsUpdateResult] = await connection.query(
            'UPDATE musics SET artist = COALESCE(?, artist), title = COALESCE(?, title), genre = COALESCE(?, genre) WHERE id = ?',
            [artist, title, genre, id]
        );

        if (musicsUpdateResult.affectedRows === 0) {
            throw new Error('Music record not found or no changes made');
        }

        const [linksUpdateResult] = await connection.query(
            'UPDATE links SET link = COALESCE(?, link) WHERE music_id = ?',
            [link, id]
        );

        if (linksUpdateResult.affectedRows === 0) {
            throw new Error('Link record not found or no changes made');
        }

        await connection.commit();

        res.status(200).json({ message: 'Music and link updated successfully' });
    } catch (error) {
        await connection.rollback();
        res.status(400).json({ error: error.message });
    } finally {
        connection.release();
    }
};

// 음악 삭제
export const deleteMusic = async (req, res) => {
    const { id } = req.params;

    const connection = await pool.getConnection();

    try {
        await connection.beginTransaction();

        const [musicDeleteResult] = await connection.query('DELETE FROM musics WHERE id = ?', [id]);

        if (musicDeleteResult.affectedRows === 0) {
            throw new Error('Music record not found or no delete made');
        }

        await connection.commit();

        res.status(200).json({ message: 'Music record deleted successfully' });

    } catch (error) {
        await connection.rollback();
        res.status(400).json({ error: error.message });

    } finally {
        connection.release();
    }
};

