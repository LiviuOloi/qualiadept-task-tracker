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
const activeTasksList = document.querySelector("#active-tasks-list");
const errorMessage = document.querySelector("#error-message");



// 2. Ascultător eveniment 'submit' și adăugare dinamică în tabel

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    try {

        const inputText = inputTask.value;
        const response = await fetch("https://jsonplaceholder.typicode.com/todos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: inputText,
                completed: false,
                userId: 1
            })
        });

        if (!response.ok) {
            throw new Error("Eroare la salvarea task-ului pe server");
        }

        if (response.status === 201) {
            console.log("Task adaugat cu succes pe server!");


            const newTask = await response.json();
            console.log("Task-ul adaugat:", newTask);
            const activeList = document.querySelector("#active-tasks-list");
            const li = document.createElement("li");
            const taskTitle = document.createElement("span");
            taskTitle.classList.add("task-title");
            taskTitle.textContent = newTask.title;
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Sterge";
            deleteButton.setAttribute("data-testid", `delete-btn-${newTask.id}`);
            li.appendChild(taskTitle);
            li.appendChild(deleteButton);
            activeList.appendChild(li);

            inputTask.value = "";

        }

    } catch (error) {
        errorMessage.textContent = "Nu am putut salva task-ul";

    }
});

const incarcaTaskuriInitiale = async () => {

    const spinner = document.querySelector("#loading-spinner");
    spinner.style.display = "block"; // Afisam spinner-ul
    

    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=5");
        if (!response.ok) {
            throw new Error("Eroare la incarcarea task-urilor initiale");
        }
        const data = await response.json();

        const listaTaskuri = document.querySelector("#active-tasks-list");
        data.forEach((task) => {
            const id = task.id;
            const liNou = document.createElement("li");
            const taskTitle = document.createElement("span");
            taskTitle.classList.add("task-title");
            taskTitle.textContent = task.title;
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Sterge";
            deleteButton.setAttribute("data-testid", `delete-btn-${id}`);
            liNou.appendChild(taskTitle);
            liNou.appendChild(deleteButton);
            listaTaskuri.appendChild(liNou);
        })
    } catch (error) {
        console.error("Eroare la incarcarea task-urilor initiale:", error);
    } finally {
        spinner.style.display = "none";
    }
}

incarcaTaskuriInitiale();

activeTasksList.addEventListener("click", async (event) => {
    console.log(event.target);

    if (event.target.matches("button")) {
        console.log("Ai apasat pe butonul Sterge!");

        console.log(event.target.getAttribute("data-testid"));

        const taskID = event.target.getAttribute("data-testid").split("-")[2];
        console.log("ID-ul task-ului de sters este:", taskID);

        const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${taskID}`, {
            method: "DELETE"
        });

        const taskToDelete = event.target.closest("li");
        console.log(taskToDelete);

        if (response.ok) {
            console.log("Task sters cu succes");
            taskToDelete.remove();
        }


    }

    if (event.target.matches(".task-title")) {
        console.log("Ai apasat pe titlu task-ului!");

        event.target.classList.toggle("completed");

    }
})



// 7. BONUS: Modul Chaos - Pop-up aleatoriu care interceptează testele UI!
const initChaosMode = () => {
    // Calculăm un timp aleatoriu de așteptare între 2000ms și 6000ms
    const randomDelay = Math.floor(Math.random() * 4000) + 2000;

    setTimeout(() => {
        // Creăm elementul container (Overlay-ul)
        const modal = document.createElement('div');
        modal.className = 'overlay-modal';
        modal.setAttribute('data-testid', 'promo-overlay');

        // Injectăm cutia promoțională și butonul de închidere
        modal.innerHTML = `
            <div class="promo-box">
                <h3>Ofertă Specială! 🚀</h3>
                <p>Fă upgrade la versiunea Premium pentru a adăuga task-uri nelimitate!</p>
                <button class="btn-close-promo" data-testid="close-promo-btn">Nu, mulțumesc</button>
            </div>
        `;

        // Atașăm evenimentul de închidere
        const closeBtn = modal.querySelector('.btn-close-promo');
        closeBtn.addEventListener('click', () => {
            modal.remove(); // Distrugem modalul când utilizatorul dă click
        });

        // "Aruncăm" modalul fizic în pagină (la finalul tag-ului <body>)
        document.body.appendChild(modal);

        console.warn(`[Chaos Mode] Promo modal a apărut după ${randomDelay}ms!`);
    }, randomDelay);
};

// Pornim modul Chaos!
//initChaosMode();


