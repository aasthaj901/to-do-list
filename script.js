const notesContainer = document.querySelector(".notes-container");
const createBtn = document.querySelector(".btn");
let notes = document.querySelectorAll(".input-box");
let taskcounter = 0;
let finishedtasks = 0;

// Load task and finished task counts from localStorage
if (localStorage.getItem("taskcounter")) {
    taskcounter = parseInt(localStorage.getItem("taskcounter"));
}

if (localStorage.getItem("finishedtasks")) {
    finishedtasks = parseInt(localStorage.getItem("finishedtasks"));
}  



const progressText = document.getElementById("progressText");
const progressBarFull = document.getElementById("progressBarFull"); 


function updateProgressBar() {
    if (taskcounter > 0) {
        progressBarFull.style.width = `${(finishedtasks / taskcounter) * 100}%`;
        progressText.innerHTML = `Task Bar ${finishedtasks}/${taskcounter}`;
    } 
    else {
        progressBarFull.style.width = "0%";
        progressText.innerHTML = "Task Bar 0/0";
    }
}

function updateStorage() {
    localStorage.setItem("notes", notesContainer.innerHTML);
    localStorage.setItem("taskcounter", taskcounter);
    localStorage.setItem("finishedtasks", finishedtasks);
}

function deleteTask(taskElement) {
    if (taskElement.classList.contains("checked")) {
        finishedtasks--; // Decrease finished tasks count for checked task
    }

    taskElement.remove();
    taskcounter--; // Decrease task counter
    updateProgressBar();
    updateStorage();
}

createBtn.addEventListener("click", () => {
    taskcounter++; // Increase the task counter when create button is clicked

    let inputBox = document.createElement("h2");
    let imgDelete = document.createElement("img");
    let imgStar = document.createElement("img");

    inputBox.className = "input-box";
    inputBox.setAttribute("contenteditable", "true");
    imgDelete.src = "images/delete.png";
    imgStar.src = "images/black-star-icon-6.png";
    imgStar.className = "star";

    inputBox.appendChild(imgDelete);
    inputBox.appendChild(imgStar);
    imgStar.style.position = "absolute";
    imgStar.style.bottom = "5px";
    imgStar.style.right = "40px";
    notesContainer.appendChild(inputBox);

    updateProgressBar();
    updateStorage();
});

notesContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("star")) {
        e.target.parentElement.style.color = 'red';
        updateStorage();
    }

    if (e.target.tagName === "IMG" && e.target.getAttribute("src") === "images/delete.png") {
        const taskElement = e.target.parentElement;
        deleteTask(taskElement);
    }
});

notesContainer.addEventListener("dblclick", function (e) {
    if (e.target.tagName === "H2") {
        e.target.classList.toggle("checked");
        if (e.target.classList.contains("checked")) {
            finishedtasks++;
        } else {
            finishedtasks--;
        }
        updateProgressBar();
        updateStorage();
    }
});

