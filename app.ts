/**
 * ==============================================================
 * Sesiunea 7: Trecerea la TypeScript (Task Tracker Refactoring)
 * ==============================================================
 * Obiectiv: Migrează scriptul aplicației din JavaScript în TypeScript.
 * Adaugă adnotări de tipuri explicite, elimină orice apariție a lui 'any'
 * și securizează modelele de date înainte de testele automate Playwright!
 */

// 1. Tipizarea Primitivelor & Variabilelor de Configurare
// Cerință: Declară explicit tipurile: apiUrl: string, maxTasksLimit: number, isAppReady: boolean
const apiUrl: string = "https://jsonplaceholder.typicode.com/todos";
const maxTasksLimit: number = 5;
let isAppReady: boolean = false;

// 2. Tipul de Uniune (Union Type) pentru Statusul Task-ului
// Cerință: Definește un Type Alias numit TaskStatus ('todo' | 'in-progress' | 'completed')
// TODO: Definește type TaskStatus
type TaskStatus = "todo" | "in-progress" | "completed" | "cancelled";


// 3. Modelul de Date Tipizat (Type Alias TaskItem)
// Cerință: id: number, title: string, status: TaskStatus, completed: boolean, priority?: 'low' | 'medium' | 'high'
// TODO: Definește type TaskItem
type TaskItem = {
    id: number;
    title: string;
    status: TaskStatus;
    completed: boolean;
    priority?: "low" | "medium" | "high";
}

// Declară array-ul principal tipizat explicit ca TaskItem[] (sau Array<TaskItem>)
// let listaTaskuri: TaskItem[] = [];
let listaTaskuri: TaskItem[] = [];


// 4. Semnăturile Funcțiilor & Eliminarea lui any (Zero Any Policy)
// Cerință: proceseazaTaskNou primește (taskObj: TaskItem) și returnează explicit : boolean
// TODO: Implementează proceseazaTaskNou
const proceseazaTaskNou = (taskObj: TaskItem): boolean => {
    if (!taskObj.title) {
    console.error("Eroare: Task-ul trebuie să aibă un titlu!");
    return false;
  }
  listaTaskuri.push(taskObj);
  console.log(`Task-ul "${taskObj.title}" a fost adăugat.`);
  return true;
};

// Cerință: afiseazaTask primește (id: number) și returnează explicit : void
// TODO: Implementează afiseazaTask
const afiseazaTask = (id: number): void => {
    console.log("Id-ul task-ului este: " + id);
}

// 5. Funcție Asincronă Tipizată (Fetch API & Promise)
// Cerință: async (): Promise<void> și asertare date primite cu as TaskItem[]
// const incarcaTaskuriInitiale = async (): Promise<void> => {
//   ...
// };

const incarcaTaskuriInitiale = async (): Promise<void> => {
     const response = await fetch(apiUrl);
     const data = (await response.json()) as TaskItem[];
}
