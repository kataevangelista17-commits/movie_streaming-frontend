const content = document.querySelector("#content");
const submit = document.querySelector('#add');
const update = document.querySelector("#update");
const API_URL = 'http://localhost:3000/api/users'; //change kapag paltan local host

// ADD
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
    .then(() => { 
        alert("Record Added Successfully"); 
        location.reload(); 
    })
    .catch(err => console.error(err));
});

// LOAD on page load
window.addEventListener('load', getRecords);

function getRecords(){
    fetch(API_URL)
    .then(res => res.json())
    .then(data => {
        let html = "";
        data.forEach(el => {
            html += `<li>
                ${el.movie_title} - ${el.user_name} | ${el.genre} | ⭐${el.rating} 
                <button onclick="editRecord(${el.id})">Edit</button>
                <button onclick="deleteRecord(${el.id})">Delete</button>
            </li>`;
        });
        content.innerHTML = html;
    })
    .catch(err => console.error(err));
}

// ️ DELETE
function deleteRecord(id){
    if(confirm("Are you sure you want to delete this record?")){
        fetch(`${API_URL}/${id}`, { 
            method: 'DELETE' 
        })
        .then(() => { 
            alert("Record Deleted Successfully"); 
            location.reload(); 
        })
        .catch(err => console.error(err));
    }
}

// EDIT (prefill form)
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
    .then(() => { 
        alert("Record Updated Successfully"); 
        location.reload(); 
    })
    .catch(err => console.error(err));
});