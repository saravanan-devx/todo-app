let input = document.getElementById("taskInput");
let addBtn = document.getElementById("addBtn");
let taskList = document.getElementById("taskList");
let doneList = document.getElementById("doneList");
let search = document.getElementById("search");
let count = document.getElementById("count");
let darkToggle = document.getElementById("darkToggle");
window.onload = function () {
    let data = JSON.parse(localStorage.getItem("tasks")) || [];
    data.forEach(t => createTask(t.text, t.completed));
    updateCount();
};
addBtn.onclick = addTask;
input.addEventListener("keypress", function (e) {
    if (e.key === "Enter") addTask();
});
function addTask() {
    let value = input.value.trim();
    if (value === "") return;
    createTask(value, false);
    saveTasks();
    updateCount();
    input.value = "";
}
function createTask(text, completed) {
    let li = document.createElement("li");
    let check = document.createElement("input");
    check.type = "checkbox";
    check.checked = completed;
    let span = document.createElement("span");
    span.innerText = text;
    let editBtn = document.createElement("button");
    editBtn.innerText = "Edit";
    editBtn.className = "edit";
    let delBtn = document.createElement("button");
    delBtn.innerText = "X";
    delBtn.className = "delete";
    check.onchange = function () {
        li.classList.toggle("completed");
        if (check.checked) doneList.appendChild(li);
        else taskList.appendChild(li);
        saveTasks();
        updateCount();
    };
    delBtn.onclick = function () {
        li.remove();
        saveTasks();
        updateCount();
    };
    editBtn.onclick = function () {
        let inputEdit = document.createElement("input");
        inputEdit.value = span.innerText;

        li.replaceChild(inputEdit, span);
        inputEdit.focus();
        inputEdit.onblur = function () {
            span.innerText = inputEdit.value || span.innerText;
            li.replaceChild(span, inputEdit);
            saveTasks();
        };
    };
    li.append(check, span, editBtn, delBtn);
    if (completed) {
        li.classList.add("completed");
        doneList.appendChild(li);
    } else {
        taskList.appendChild(li);
    }
}
function saveTasks() {
    let tasks = [];
    document.querySelectorAll("li").forEach(li => {
        tasks.push({
            text: li.querySelector("span").innerText,
            completed: li.querySelector("input").checked
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
search.oninput = function () {
    let value = search.value.toLowerCase();
    document.querySelectorAll("li").forEach(li => {
        let text = li.querySelector("span").innerText.toLowerCase();
        li.style.display = text.includes(value) ? "flex" : "none";
    });
};
function updateCount() {
    let total = taskList.children.length;
    let done = doneList.children.length;
    count.innerText = `Pending: ${total} | Completed: ${done}`;
}
darkToggle.onclick = function () {
    document.body.classList.toggle("dark");
};