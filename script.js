//CREATE: https://www.melivecode.com/api/users/create
// UPDATE:  https://www.melivecode.com/api/users/update
// DELETE: https://www.melivecode.com/api/users/delete



let URL = "https://www.melivecode.com/api/users/";
let content = document.getElementById('content')
let clickcount = 0;

let userdisplay = async () => {
    let userscache = await fetch(`${URL}`)
    var users = await userscache.json();
    console.log(users)
    // clicked(users);
    loadcontent(users);
}

let loadcontent = (users) => {

    content.innerHTML = users.map(
        user => `<tr>
        <td>${user.id}</td>
        <td><img src="${user.avatar}"></td>
        <td>${user.fname}</td>
        <td>${user.lname}</td>
        <td>${user.username}</td>
        <td><i id="btn"class="uil uil-edit" onclick="edit(${user.id})"></i>
        <i id="btn" class="uil uil-trash-alt" onclick="del(${user.id})"></i>
        
        </td>
        </tr>
        `
    )
}

let handlesubmit = async (event) => {
    event.preventDefault();
    let id =  document.getElementById('userid').value
    let fname = document.getElementById('fname').value
    let lname = document.getElementById('lname').value
    let email = document.getElementById('email').value
    let avatar = document.getElementById('Avatar').value
    let user = { id,fname, lname, username: fname, email, avatar };
        console.log(user)

    if (id) {
        let newid = await fetch(`${URL}update`,
            {
                method: "PUT", body: JSON.stringify(user,id),
                headers: { "Content-Type": "application/json" }
            })

        userdisplay()
        let formid = document.getElementById('formid')
        formid.reset();
    }
    else {
        let newid = await fetch(`${URL}create`,
            {
                method: "POST", body: JSON.stringify(user),
                headers: { "Content-Type": "application/json" }
            })

        userdisplay()
        let formid = document.getElementById('formid')
        formid.reset();
    }

}


//Delete
let del = async (id) => {
    let deldata = { id }
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!'
    })
        .then(async (result) => {
            if (result.isConfirmed) {

                await fetch(`${URL}delete`, {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(deldata)
                })
                userdisplay()
                console.log(user)
                Swal.fire(

                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
            }
        })
}

//UPDATE
let edit = async (id) => {
    let res = await fetch(`${URL}${id}`)
    let resu = await res.json()
    let result = resu.user
    console.log(result)
    document.getElementById('userid').value = result.id
    document.getElementById('fname').value = result.fname
    document.getElementById('lname').value = result.lname
    document.getElementById('email').value = result.email
    document.getElementById('Avatar').value = result.avatar
}




