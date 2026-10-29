// 1. Baza temporară de date (Array de Obiecte)

const listaTaskuri = [
    {
    id: 1001,
    nume: "Setare Boilerplate HTML",
    completat: true
    },
    {
    id: 1002,
    nume: "Înțelegere Arhitectură Client-Server",
    completat: true 
    }
];


// 2. Funcția de Validare (Arrow Function)

const proceseazaTaskNou = (taskObj) => {
    if (taskObj.nume === "" || taskObj.nume === undefined) {
        console.log("Eroare: Task-ul trebuie să aibă un nume!");
    } else {
        listaTaskuri.push(taskObj);
        console.log("Task adaugat cu succes!");
    }
};


// 3. Testează funcția apelând-o cu un task invalid și unul valid

proceseazaTaskNou({
    id: 1003,
    nume: "",
    completat: false
});

proceseazaTaskNou({
    id: 1004,
    nume: "Invata JavaScript",
    completat: false
});


// 4. Bucla for pentru raportarea task-urilor din memorie

for (let i = 0; i < listaTaskuri.length; i++) {
    console.log(`Task Nume: ${listaTaskuri[i].nume}`);
}


// 1. Selectare elemente DOM

const form = document.querySelector("#add-task-form");
const inputTask = document.querySelector("#task-name");
const table = document.querySelector("#history-table tbody");


// 2. Ascultător eveniment 'submit' și adăugare dinamică în tabel

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const inputText = inputTask.value; 
    
    const newRow = document.createElement("tr");

    const newCell = document.createElement("td");
    newCell.textContent = inputText;
    newRow.appendChild(newCell); 

    inputTask.value = "";

// 3. Ștergere dinamică din DOM (Event Delegation pe document sau click pe buton)

    const deleteCell = document.createElement("td");
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-row");
    deleteCell.appendChild(deleteButton);
    newRow.appendChild(deleteCell);
    deleteButton.addEventListener("click", () => {
        newRow.remove();
    })

    table.appendChild(newRow);
    
})

const incarcaTaskuriInitiale = async () => {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=5");
        const data = await response.json();

        const listaTaskuri = document.querySelector("#active-tasks-list");
        data.forEach((task) => {
            const liNou = document.createElement("li");
            liNou.textContent = task.title;
            listaTaskuri.appendChild(liNou);
        })
    } catch (error) {
        console.error("Eroare la incarcarea task-urilor initiale:", error);
    }
}

incarcaTaskuriInitiale();

