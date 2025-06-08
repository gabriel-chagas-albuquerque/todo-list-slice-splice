let tasks = [
  { id: 1, text: "Estudar JavaScript", completed: false },
  { id: 2, text: "Fazer exercícios", completed: true },
  { id: 3, text: "Revisar conceitos", completed: false },
  { id: 4, text: "Praticar slice e splice", completed: false },
  { id: 5, text: "Criar projetos", completed: false },
];
let nextId = 6;

function renderTasks() {
  const todoList = document.getElementById("todoList");
  todoList.innerHTML = "";

  tasks.forEach((task) => {
    const taskDiv = document.createElement("div");
    taskDiv.className = `todo-item ${task.completed ? "completed" : ""}`;
    taskDiv.innerHTML = `
                    <span class="todo-text">${task.text}</span>
                    <div class="todo-actions">
                        <button class="btn btn-primary" onclick="completeTask(${task.id})">Concluída</button>
                        <button class="btn btn-danger" onclick="deleteTask(${task.id})">Excluir</button>
                    </div>
                `;
    todoList.appendChild(taskDiv);
  });
}

function addTask() {
  const input = document.getElementById("taskInput");
  const text = input.value.trim();

  if (text) {
    tasks.push({
      id: nextId++,
      text: text,
      completed: false,
    });
    input.value = "";
    renderTasks();
  }
}

function completeTask(id) {
    let complete = tasks.filter((task) => task.id === id)
    complete[0].completed = true;
  renderTasks();
}

function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);
  renderTasks();
}

// Demonstrações do SLICE (não modifica o array original)
function showFirst3() {
  const result = tasks.slice(0, 3);
  displaySliceResult("slice(0, 3)", result, tasks);
}

function showLast3() {
  const result = tasks.slice(-3);
  displaySliceResult("slice(-3)", result, tasks);
}

function showMiddle() {
  const start = Math.floor(tasks.length / 4);
  const end = Math.floor((tasks.length * 3) / 4);
  const result = tasks.slice(start, end);
  displaySliceResult(`slice(${start}, ${end})`, result, tasks);
}

function customSlice() {
  const start = parseInt(document.getElementById("startIndex").value) || 0;
  const end =
    parseInt(document.getElementById("endIndex").value) || tasks.length;
  const result = tasks.slice(start, end);
  displaySliceResult(`slice(${start}, ${end})`, result, tasks);
}

function displaySliceResult(operation, result, original) {
  const sliceDiv = document.getElementById("sliceResult");
  sliceDiv.textContent = `Operação: ${operation}
Array original: ${original.length} itens
Resultado: ${result.length} itens
[${result.map((t) => `"${t.text}"`).join(", ")}]

✅ Array original NÃO foi modificado!`;
}

// Demonstrações do SPLICE (modifica o array original)
function removeFirst() {
  if (tasks.length > 0) {
    const removed = tasks.splice(0, 1);
    displaySpliceResult("splice(0, 1)", removed);
    renderTasks();
  }
}

function removeLast() {
  if (tasks.length > 0) {
    const removed = tasks.splice(-1, 1);
    displaySpliceResult("splice(-1, 1)", removed);
    renderTasks();
  }
}

function removeMiddle() {
  if (tasks.length > 2) {
    const middleIndex = Math.floor(tasks.length / 2);
    const removed = tasks.splice(middleIndex, 1);
    displaySpliceResult(`splice(${middleIndex}, 1)`, removed);
    renderTasks();
  }
}

function displaySpliceResult(operation, removed) {
  const spliceDiv = document.getElementById("spliceResult");
  spliceDiv.textContent = `Operação: ${operation}
Elementos removidos: ${removed.length}
[${removed.map((t) => `"${t.text}"`).join(", ")}]
Array agora tem: ${tasks.length} itens

⚠️ Array original FOI MODIFICADO!`;
}

// Event listener para Enter no input
document.getElementById("taskInput").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    addTask();
  }
});

// Renderizar tarefas iniciais
renderTasks();
