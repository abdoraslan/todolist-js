let tasks = [
    {
        "taskName": "سباحه",
        "taskDate": "5/9/2024",
        "isFinished": false
    },
    {
        "taskName": "كرة قدم",
        "taskDate": "5/9/2024",
        "isFinished": false
    },
    {
        "taskName": "كرة يد",
        "taskDate": "5/9/2024",
        "isFinished": false
    },
]
function transformTasksArray() {
    let retrivedTasks = JSON.parse(localStorage.getItem("tasks"))
    tasks = retrivedTasks ?? []
}

transformTasksArray()


function getDateNow() {
    const today = new Date();
    // Get the year, month, and day
    const year = today.getFullYear();
    const month = today.getMonth() + 1; // Months are zero-based, so add 1
    const day = today.getDate();
    // Format the date as DD/MM/YYYY
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate
}


function renderTasks() {
    document.getElementById("tasks").innerHTML = ""; // Clear existing tasks
    var index = 0
    for (task of tasks) {
        document.getElementById("tasks").innerHTML +=
            `<div class="task ${task.isFinished ? "done" : ""}">
            <div>
                <button onclick="attachEditEvents(${index})" aria-label="Edit Task"><i class="fa-solid fa-pen"></i></button>
                <button class="second-button ${task.isFinished ? "done-button" : ""} " onclick="toggleComleteTask(${index})" aria-label="Mark as Done">${task.isFinished ?
                `<i class="fa-solid fa-check"></i>` :
                `<i class="fa-solid fa-xmark"></i>`}
                    </button>
                <button onclick="attachDeleteEvents(${index})" aria-label="Delete Task"><i class="fa-solid fa-trash-can"></i></button>
            </div>
            <div class="title">
                <h1>${task.taskName}</h1>
                <h4>${task.taskDate} <i class="fa-solid fa-calendar-days"></i></h4>
            </div>
        </div>
        <hr>`;
        index++
    }
}

renderTasks()

function attachDeleteEvents(index) {
    tasks.splice(index, 1)
    transformTasksString()
    renderTasks()
}

function attachEditEvents(index) {
    let newTitle = prompt("Enter your new task name:", tasks[index].taskName)
    if (newTitle !== null && newTitle.trim() !== "") {
        tasks[index].taskName = newTitle; // Update task name
        transformTasksString()
        renderTasks(); // Re-render the tasks after editing
    }
}

function toggleComleteTask(index) {
    let task = tasks[index]
    task.isFinished = !task.isFinished
    transformTasksString()
    renderTasks()
}





document.getElementById("add").addEventListener("click", function () {
    const taskName = prompt("Enter the name of the task:")
    if (taskName === null || taskName.trim() === "") {
        alert(`No Task Names entered.`);
    } else {
        let newTask = {
            "taskName": taskName,
            "taskDate": getDateNow(),
            "isFinished": false
        }
        tasks.push(newTask)
        transformTasksString()
        renderTasks()
    }
})

function transformTasksString() {
    let stringTasks = JSON.stringify(tasks)
    localStorage.setItem("tasks", stringTasks)
}