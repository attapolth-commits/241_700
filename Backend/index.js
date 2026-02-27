const express = require('express');
const mysql = require('mysql2/promise');
const bodyParser = require('body-parser');
const app = express();
const port = 8000;

app.use(bodyParser.json());

let conn = null;
const initMySQL = async () => {
    conn = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'webdb',
        port: 8700
    });
    console.log('Connected to MySQL database');
}

app.get('/users', async (req, res) => {
    const results = await conn.query('SELECT * FROM users');
    res.json(results)
})


app.post('/users', async (req, res) => {
    try {
        let user = req.body;
        const results = await conn.query('INSERT INTO users SET ?', user);
        console.log('results:', results);
        res.json({
            message: 'User added successfully',
            data: results[0]
        });
    } catch (error) {
        console.error('Error inserting user:', error);
        res.status(500).json({ message: 'Error adding user' });
    }
})
app.get('/users/:id', async (req, res) => {
    try {
        let id = req.params.id;
        const results = await conn.query('SELECT * FROM users WHERE id = ?', [id]);
        if (results[0].length === 0) {
            throw res.status(404).json({ message: 'User not found' });
        } 
        res.json(results[0][0]);
    } catch (error) {
        console.error('Error fetching user:', error);
        let statusCode = error.statusCode || 500;
        res.status(statusCode).json({ message: 'Error fetching user' });
    }
});

app.put('/users/:id', async (req, res) => {
    try {
    let id = req.params.id;
    let updateUser = req.body;
    const results = await conn.query('UPDATE users SET ? WHERE id = ?', [updateUser, id]);
    res.json({
        message: 'User update successful',
        data: results[0]
    });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Error updating user' });
    }
});

app.delete('/users/:id', async (req, res) => {
    try {
        let id = req.params.id;
        const results = await conn.query('DELETE FROM users WHERE id = ?', [id]);
        res.json({
            message: 'User deleted successful',
            data: results[0]
        });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Error deleting user' });
    }
});

app.patch('/user/:id', (req, res) => {
    let id = req.params.id;
    let updateUser = req.body;

    //  หา user ที่จาก id ส่งมา
    let selectedIndex = users.findIndex(user => user.id == id);

    // อัพเดตข้อมูล users
    users[selectedIndex].firstname = updateUser.firstname || users[selectedIndex].firstname;
    users[selectedIndex].lastname = updateUser.lastname || users[selectedIndex].lastname;

    if (updateUser.firstname) {
        users[selectedIndex].firstname = updateUser.firstname;
    }
    if (updateUser.lastname) {
        users[selectedIndex].lastname = updateUser.lastname;
    }

    res.json({
        message: 'User update successful',
        data: {
            user: updateUser,
            indexUpdate: selectedIndex
        }
    });
});
//ส่ง users ที่อัพเดตแล้วกลับไป
app.delete('/users/:id', (req, res) => {
    let id = req.params.id;
    //หา index จาก id ที่ต้องการลบ
    let selectedIndex = users.findIndex(user => user.id == id);
    users.splice(selectedIndex, 1);
    //ลบ user ออกจาก users
    res.json({
        message: 'User deleted successful',
        indexDelete: selectedIndex
    });
});
app.listen(port, async () => {
    await initMySQL();
    console.log(`Server is running on http://localhost:${port}`);
});
