// Class Initialize
class Tasks {
    constructor() {
        this.array = [];
        this.Taskid = null;
        this.Editid = null;
        this.dragElement = null;
        this.taskNameInput = document.querySelector("#taskName");
        this.taskDescInput = document.querySelector("#taskDesc");
        this.prioritySelectInput = document.querySelector("#prioritySelect");

        this.loadFromStorage();
        this.render();
    }

    timeAgo(timestamp) {
        const seconds = Math.floor((Date.now() - timestamp) / 1000);
        if (seconds < 60) return "just now";
        const minutes = Math.floor(seconds / 60);
        if (minutes < 60) return `${minutes} min ago`;
        const hours = Math.floor(minutes / 60);
        if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
        const days = Math.floor(hours / 24);
        return `${days} day${days > 1 ? "s" : ""} ago`;
    }

    // Data methods

    addTask() {
        const taskName = this.taskNameInput.value;
        const taskDesc = this.taskDescInput.value;
        const prioritySelect = this.prioritySelectInput.value;
        const prioritySelectText =
            this.prioritySelectInput.options[this.prioritySelectInput.selectedIndex]
                .text;
        const justadd = document.querySelector("#just-added")
        const inprogress = document.querySelector("#in-progress")
        const completed = document.querySelector("#completed")
        const newTask = {
            id: Date.now(),
            taskName,
            taskDesc,
            prioritySelect,
            prioritySelectText,
            completed: false,
            createdAt: Date.now(),
            status: justadd.id
        };

        if ((!taskName) || (!taskDesc) || (!prioritySelect)) {
            alert("please fill all details!")
        }
        else {

            this.array.push(newTask);
            console.log(this.array);
        }

        // this.array.push(newTask);
        // console.log(this.array);

        this.taskNameInput.value = "";
        this.taskDescInput.value = "";
        this.prioritySelectInput.value = "";
        this.prioritySelectInput.selectedIndex = 0;

        //  if ((this.taskNameInput.value = "") || (this.taskDescInput.value = "") || (this.prioritySelectInput.value = "") ||(this.selectedIndex =0)  ){
        //     alert("please fill all details!")
        // }



        this.saveToStorage();
        this.render();
    }
    editTask(id) {
        const edit = this.array.find((i) => i.id === id);

        if (edit) {

            this.taskNameInput.value = edit.taskName;
            this.taskDescInput.value = edit.taskDesc;
            this.prioritySelectInput.value = edit.prioritySelect;
            // this.prioritySelectInput.selectedIndex = edit.prioritySelect;


        }


        this.saveToStorage();
        this.render()
    }
    updateTask(id) {
        const justadd = document.querySelector("#just-added")
        const inprogress = document.querySelector("#in-progress")
        const completed = document.querySelector("#completed")
        const edit = this.array.find((i) => i.id === id);

        if (edit) {
            if ((!this.taskNameInput.value) || (!this.taskDescInput.value) || (!this.prioritySelectInput.value)) {
                alert("please fill all details!")
            }
            else {
                edit.taskName = this.taskNameInput.value;
                edit.taskDesc = this.taskDescInput.value
                edit.prioritySelect = this.prioritySelectInput.value;
                edit.prioritySelectText = this.prioritySelectInput.options[this.prioritySelectInput.selectedIndex].text
            }




        }
        this.taskNameInput.value = "";
        this.taskDescInput.value = "";
        this.prioritySelectInput.value = "";
        this.prioritySelectInput.selectedIndex = 0;
        this.Editid = null;
        this.saveToStorage();
        this.render()
    }
    deleteTask(id) {
        this.array = this.array.filter((i) => i.id !== id)
        this.saveToStorage();
        this.render()
        // console.log(this.array)
    }




    // Helper methods

    // setFilterTask() { }
    getFilteredTask() {
        const filterVal = document.querySelector(".priority-filter-select").value;
        if (filterVal !== "") {
            return this.array.filter((item) => item.prioritySelect === filterVal);
        }
        return this.array;
    }

    searchTask() {
        const searchBarfilter = document.querySelector("#searchBar").value;
        if (searchBarfilter !== "") {
            return this.array.filter((item) => item.taskName == searchBarfilter);
        }
        return this.array;
    }

    // Ui methods

    render() {
        const displayTask = this.getFilteredTask(), ;
        const searchdisplay = this.searchTask()
        const justaddTasks = displayTask.filter((item) => item.status === "just-added");
        const inprogressTasks = displayTask.filter((item) => item.status === "in-progress");
        const completedTasks = displayTask.filter((item) => item.status === "completed");
        const justaddBox = document.querySelector("#just-added")
        const inprogressBox = document.querySelector("#in-progress")
        const completedBox = document.querySelector("#completed")

        if (!justaddBox) return;
        if (!inprogressTasks) return;
        if (!completedBox) return;

        justaddBox.innerHTML = "";
        inprogressBox.innerHTML = "";
        completedBox.innerHTML = "";


        if (displayTask.length === 0) {
            document.getElementById("totalTasks").textContent = "00";
        }
        if (justaddTasks.length === 0) {
            justaddBox.innerHTML = `
                                    <div class="empty-state">
                                        <div class="dashed-box">There is no task added</div>
                                    </div>
                        `;
            document
                .querySelectorAll(".pendingStats")
                .forEach((e) => (e.textContent = "00"));

        }
        if (inprogressTasks.length === 0) {
            inprogressBox.innerHTML = `
                                    <div class="empty-state">
                                        <div class="dashed-box">There is no task added</div>
                                    </div>
                        `;

            document
                .querySelectorAll(".inprogressStats")
                .forEach((e) => (e.textContent = "00"));

        }
        if (completedTasks.length === 0) {
            completedBox.innerHTML = `
                                    <div class="empty-state">
                                        <div class="dashed-box">There is no task added</div>
                                    </div>
                        `;
            document
                .querySelectorAll(".completedStats")
                .forEach((e) => (e.textContent = "00"));

        }


        this.renderTask(justaddTasks, justaddBox)
        this.renderTask(inprogressTasks, inprogressBox)
        this.renderTask(completedTasks, completedBox)

        this.taskstats(displayTask)
        this.dragdrop(displayTask)

    }
    renderTask(task, column) {

        // const justaddTasks = this.array.filter((item) => item.status === "just-added");
        // const inprogressTasks = this.array.filter((item) => item.status === "in-progress");
        // const completedTasks = this.array.filter((item) => item.status === "completed");




        function toggle1() {
            document.querySelector("#addTaskModel").classList.toggle("flex");
            document.querySelector("#addTaskModel").classList.toggle("hidden");
        }
        task.forEach((item) => {
            let rowDiv = document.createElement("div");
            rowDiv.classList.add("tasks")
            rowDiv.innerHTML = `
                            <div class="task-card" draggable="true">
                                <div class="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-b from-red-500 to-red-500 rounded-l-lg"></div>
                
                                <div class="flex justify-between items-start gap-4 pl-4"> 
                                    <div class="flex-1">
                                        <h3 class="text-white font-bold text-base mb-2">${item.taskName}</h3>
                                        <p class="text-gray-400 text-xs font-medium mb-3">${item.taskDesc}</p>
                        
                                    </div>
                    
                                    <div class="flex gap-2">    
                                        <button class="edit-btn text-gray-400 hover:text-white transition"><i class="ri-pencil-line"></i></button>
                                        <button class="delete-btn text-red-500 hover:text-red-400 transition" ><i class="ri-delete-bin-6-line"></i></button>
                                    </div>
                                </div>
                                <div class="flex items-center justify-between pl-4">
                                    <span class="text-orange-500 text-xs font-semibold">${item.prioritySelectText}</span>
                                    <span class="text-gray-500 text-xs">${this.timeAgo(item.createdAt)}</span>
                                </div>
                            </div>
                        `
            column.appendChild(rowDiv)

            rowDiv.querySelector(".delete-btn").addEventListener("click", () => {
                this.Taskid = item.id
                toggles()
            })

            rowDiv.querySelector(".edit-btn").addEventListener("click", () => {
                this.Editid = item.id
                this.editTask(this.Editid)
                toggle1()
            })
            // rowDiv.forEach(rowDiv => {
            //     task.addEventListener("drag",(e) =>{
            //         this.dragElement = task
            //     })
            // })

            rowDiv.addEventListener("drag", (e) => {
                this.dragElement = rowDiv
                this.Taskid = item.id
            })
        });

        // this.dragdrop(rowDiv)
    }

    dragdrop(task) {

        const justadd = document.querySelector("#just-added")
        const inprogress = document.querySelector("#in-progress")
        const completed = document.querySelector("#completed")



        const addDrag = (column) => {
            column.addEventListener("dragenter", (e) => {
                e.preventDefault()
                column.classList.add("hover-over")
            })
            column.addEventListener("dragleave", (e) => {
                e.preventDefault()
                column.classList.remove("hover-over")
            })
            column.addEventListener("dragover", (e) => {
                e.preventDefault()
            })
            column.addEventListener("drop", (e) => {
                e.preventDefault()
                column.appendChild(this.dragElement)
                column.classList.remove("hover-over");

                const edit = this.array.find((i) => i.id === this.Taskid);
                if (edit) {
                    edit.status = column.id
                    this.saveToStorage()
                    this.render()
                }
            })
        }

        addDrag(justadd)
        addDrag(inprogress)
        addDrag(completed)

        // console.log(task)
    }

    taskstats(data) {
        const totalTask = document.getElementById("totalTasks");
        const pendingask = document.querySelectorAll(".pendingStats");
        const inprogressTask = document.querySelectorAll(".inprogressStats");
        const completedTask = document.querySelectorAll(".completedStats");

        const justaddTasks = this.array.filter((item) => item.status === "just-added");
        const inprogressTasks = this.array.filter((item) => item.status === "in-progress");
        const completedTasks = this.array.filter((item) => item.status === "completed");

        const total = this.array.length
        if (totalTask) totalTask.textContent = total.toString().padStart(2, "0");

        const justaddedtotal = justaddTasks.length
        const inrprogresstotal = inprogressTasks.length
        const completedtotal = completedTasks.length

        function count(column, total) {
            if (column) column.forEach(value => value.textContent = total.toString().padStart(2, "0"))
        }
        count(pendingask, justaddedtotal)
        count(inprogressTask, inrprogresstotal)
        count(completedTask, completedtotal)

    }
    // Storage methods

    saveToStorage() {
        localStorage.setItem("Tasks", JSON.stringify(this.array))
    }
    loadFromStorage() {
        const savedItems = localStorage.getItem("Tasks");
        if (savedItems) {
            this.array = JSON.parse(savedItems)
        }
    }
}

// object initilize and class call
const user = new Tasks();



// form open - close event handling

function toggle() {
    document.querySelector("#addTaskModel").classList.toggle("flex");
    document.querySelector("#addTaskModel").classList.toggle("hidden");
}

document.querySelector("#addTaskBtn").addEventListener("click", () => {
    toggle();
});
document.querySelectorAll(".formCancel").forEach((btn) => {
    btn.addEventListener("click", () => {
        user.taskNameInput.value = "";
        user.taskDescInput.value = "";
        user.prioritySelectInput.value = "";
        user.prioritySelectInput.selectedIndex = 0;
        user.Editid = null
        toggle();
    });
});

// task save using event handling

document.querySelector("#taskform").addEventListener("submit", (e) => {
    e.preventDefault();
    if (user.Editid === null) {
        user.addTask();
    }
    else {
        user.updateTask(user.Editid)
    }

    toggle();
});

// delete model handling

function toggles() {
    document.querySelector("#deleteTaskModel").classList.toggle("flex");
    document.querySelector("#deleteTaskModel").classList.toggle("hidden");
}

document.querySelector("#deleteCnacelbtn").addEventListener("click", () => {

    toggles()
})
document.querySelector("#deleteokbtn").addEventListener("click", () => {
    user.deleteTask(user.Taskid)
    toggles()
})
document.querySelector(".priority-filter-select").addEventListener("change", () => {
    user.render() // this is for diaply filtered data tasks in ui
})


setInterval(() => {
    user.render();
}, 60000);
