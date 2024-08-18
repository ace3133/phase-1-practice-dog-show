const form = document.getElementById("dog-form");
const table = document.getElementById("table-body");

document.addEventListener('DOMContentLoaded', () => {
    fetchDogs();
});

function formSubmit() {
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const dogId = form.getAttribute('data-id');
        const updatedDog = {
            name: form.querySelector("#name").value,
            breed: form.querySelector("#breed").value,
            sex: form.querySelector("#sex").value
        };

        fetch(`http://localhost:3000/dogs/${dogId}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedDog)
        })
        .then(res => res.json())
        .then(() => {
            table.innerHTML = "";
            fetchDogs(); 
        });
    });
}

function makeTable(dog) {
    const tr = document.createElement("tr");
    const nameTd = document.createElement("td");
    const breedTd = document.createElement("td");
    const sexTd = document.createElement("td");
    const editButton = document.createElement("button");

    nameTd.textContent = dog.name;
    breedTd.textContent = dog.breed;
    sexTd.textContent = dog.sex;
    editButton.textContent = "Edit";

    tr.appendChild(nameTd);
    tr.appendChild(breedTd);
    tr.appendChild(sexTd);
    tr.appendChild(editButton);
    table.appendChild(tr);

    editButton.addEventListener("click", () => {
        form.querySelector("#name").value = dog.name;
        form.querySelector("#breed").value = dog.breed;
        form.querySelector("#sex").value = dog.sex;
        form.setAttribute('data-id', dog.id); 
    });
}

function fetchDogs() {
    fetch("http://localhost:3000/dogs")
        .then(res => res.json())
        .then(data => {
            data.forEach(dog => {
                makeTable(dog);
            });
        });
}


formSubmit();
