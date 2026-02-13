/*
const http = require('http');
const host = 'localhost';
const port = 8000;

//กำหนดค่าเริ่มต้นของ server เมื่อเปิดใช้งาน เว็บผ่านเบราว์เซอร์ ที่ localhost:8000
const requestListener = function(req, res) {
    res.writeHead(200);
    res.end('My First Server!');
}

//run server
const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is running at http://${host}:${port}`);
});
*/
const express = require('express')  
const bodyParser = require('body-parser')
const app = express();
const port = 8000;

let users = [];
let counter = 1;

app.use(bodyParser.json());


app.get('/users', (req, res) => {
   res.json(users);
});

app.post('/user', (req, res) => {
    let user = req.body;
    user.id = counter;
    counter++;
    users.push(user);
    res.json({
    message: 'User added successfully',
    user: user
    });
});

app.patch('/user/:id', (req, res) => {
    let id = req.params.id;
    let updateUser = req.body;

    //find the user data from id
    let selectedIndex = users.findIndex(user => user.id == id);

    // update users data

    if (updateUser.firstname){
        users[selectedIndex].firstname = updateUser.firstname;
    }
    if (updateUser.lastname){
        users[selectedIndex].lastname = updateUser.lastname;
    }

    res.json({
        message: 'User update successfully',
        data: {
            user: updateUser,
            indexUpdate: selectedIndex
        }
    })
    // send updated users

    res.send(id)
})

app.delete('/users/:id', (req, res) => {
    let id = req.params.id;
    //find index that want to delete
    let selectedIndex = users.findIndex(user => user.id == id);
    users.splice(selectedIndex, 1);
    //delete the selected users
    res.json({
        message: "User delted sccesssfully", 
        indexDelete: selectedIndex
    })
});

app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});
