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