//1. Download all the user from api http://localhost:8000/users

//2. Show users data at the website by html

const BaseURL = 'http://localhost:8000';
window.onload = async () => {
        await loadData();
}
const loadData = async () =>{
    const response = await axios.get(`${BaseURL}/users`);// type  `` using alt + 96
    console.log(response.data)
    const userDOM = document.getElementById('user');
    let htmlData = '<div>';
    for (let i = 0; i < response.data.length; i++){
        let user = response.data[i]
        htmlData += ` <div>
        ${user.id} ${user.firstname} ${user.lastname} ${user.gender}
        <a href="index.html?id=${user.id}"><button>Edit</button>
        <button class='delete' data-id='${user.id}'>Delete</button>
        </div>`
    }
    htmlData += `</div>`;
    userDOM.innerHTML = htmlData;

    const deleteDOMS = document.getElementsByClassName("delete")
    for (let i = 0; i < deleteDOMS.length; i++){
        deleteDOMS[i].addEventListener("click", async (event) => {
            const id = event.target.dataset.id;
            try{
                await axios.delete(`${BaseURL}/users/${id}`);
                loadData();
            }catch(error){
                console.error("Error deleting user:", error)
            }
        })
    }
}
