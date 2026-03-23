const content = document.querySelector("#content");
const submit = document.querySelector('#add');
const update = document.querySelector("#update");
const API_URL = 'https://movie-streaming-m701.onrender.com/api/users'; //Matches your backend route

// CREATE
submit.addEventListener('click', () => {
    const formData = {
        user_name: document.querySelector('#user_name').value,
        movie_title: document.querySelector('#movie_title').value,
        genre: document.querySelector('#genre').value,
        subscription_type: document.querySelector('#subscription_type').value,
        device_used: document.querySelector('#device_used').value,
        rating: document.querySelector('#rating').value
    };

    fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" }
    })
    .then(() => { alert("Added!"); location.reload(); })
    .catch(err => console.error(err));
});

// READ (All)
window.addEventListener('load', getRecords);

function getRecords(){
    fetch(API_URL)
    .then(res => res.json())
    .then(data => {
        let html = "";
        data.forEach(el => {
            html += `<tr>
                <td>${el.id}</td><td>${el.user_name}</td><td>${el.movie_title}</td>
                <td>${el.genre}</td><td>${el.subscription_type}</td>
                <td>${el.device_used}</td><td>${el.rating}</td>
                <td>
                    <button onclick="editRecord(${el.id})">Edit</button>
                    <button onclick="deleteRecord(${el.id})">Delete</button>
                </td>
            </tr>`;
        });
        content.innerHTML = html;
    })
    .catch(err => console.error(err));
}

// DELETE
function deleteRecord(id){
    if(confirm("Delete?")){
        fetch(`${API_URL}/${id}`, { method: 'DELETE' })
        .then(() => { alert("Deleted!"); location.reload(); })
        .catch(err => console.error(err));
    }
}

// EDIT (Load Data)
function editRecord(id){
    fetch(`${API_URL}/${id}`)
    .then(res => res.json())
    .then(data => {
        document.querySelector('#user_name').value = data.user_name;
        document.querySelector('#movie_title').value = data.movie_title;
        document.querySelector('#genre').value = data.genre;
        document.querySelector('#subscription_type').value = data.subscription_type;
        document.querySelector('#device_used').value = data.device_used;
        document.querySelector('#rating').value = data.rating;
        document.querySelector('#record_id').value = data.id;
    })
    .catch(err => console.error(err));
}

// UPDATE
update.addEventListener('click', () => {
    const id = document.querySelector('#record_id').value;
    const formData = {
        user_name: document.querySelector('#user_name').value,
        movie_title: document.querySelector('#movie_title').value,
        genre: document.querySelector('#genre').value,
        subscription_type: document.querySelector('#subscription_type').value,
        device_used: document.querySelector('#device_used').value,
        rating: document.querySelector('#rating').value
    };

    fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" }
    })
    .then(() => { alert("Updated!"); location.reload(); })
    .catch(err => console.error(err));
});

// SEARCH
function searchGenre(){
    const genre = document.querySelector('#searchBox').value;
    fetch(`${API_URL}/genre/${genre}`)
    .then(res => res.json())
    .then(data => {
        let html = "";
        data.forEach(el => {
            html += `<tr>
                <td>${el.id}</td><td>${el.user_name}</td><td>${el.movie_title}</td>
                <td>${el.genre}</td><td>${el.subscription_type}</td>
                <td>${el.device_used}</td><td>${el.rating}</td>
                <td>
                    <button onclick="editRecord(${el.id})">Edit</button>
                    <button onclick="deleteRecord(${el.id})">Delete</button>
                </td>
            </tr>`;
        });
        content.innerHTML = html;
    })
    .catch(err => console.error(err));
}

function resetForm(){
    document.querySelector('#user_name').value = '';
    document.querySelector('#movie_title').value = '';
    document.querySelector('#record_id').value = '';
}
