//// here i am adding or writting those things which i have do in code (like code sequence,logic add,operation add) 



******                                            Step 1                                             *******


/// I have grabbing these {classes and ids} from html and css for dom selection and classList 


id                              |             class


totalTasks (id)                 |             pendingStats (class)
addTaskBtn (id)                 |             inprogressStats (class)
pendingStats (id)               |             completedStats (class)
inprogressStats (id)            |             priority-filter-wrap (class)
completedStats (id)             |             priority-filter-select (class)
searchBar (id)                  |             empty-state (class)
searchbtn (id)                  |             modal-backdrop (class)
just-added (id)                 |             modal-container (class)
in-progress (id)                |             edit-btn (class)
completed (id)                  |             delete-btn (class)
formCancel (id)                 |             task-card (class)
taskName (id)                   |             dragging (class)
taskDesc (id)                   |             column-container (class)
prioritySelect (id)             |             tasks-container (class)
formCancelbtn (id)              |             column-tag (class)
formSavebtn (id)                |             dashed-box (class)
deleteCnacelbtn (id)            |             priority-filter-icon (class)
deleteokbtn (id)                | 




******                                            Step 2                                             *******


//////   Defining classes (Methods) and object (class call)


// Class Initialize
class Tasks{
    constructor(){}

    // Data methods
    addTask(){}
    editTask(){}
    deleteTask(id){}

    // Helper methods
    setFilterTask(){}
    getFilteredTask(id){}
    taskstats(){}
    searchTask(id){}

    // Ui methods
    render(){}
    renderTask(task){}

    // Storage methods
    loadFromStorage(){
        
    }
    saveToStorage(){}
}

// object initilize and class call
const user = new Tasks()


******                                            Step 3                                             *******


//// Now initialize array , methods call and selecting id class in constructor

constructor(){
        this.array = []
        
        this.taskNameInput = document.querySelector("#taskName")
        this.taskDescInput = document.querySelector("#taskDesc")
        this.prioritySelectInput = document.querySelector("#prioritySelect")

        this.loadFromStorage()
        this.render()
    }


******                                            Step 4                                             *******


//// Now add() method logic written and call saveToStorage(),render() methods for save and show in Ui

 addTask(){

        const taskName = this.taskNameInput.value;
        const taskDesc = this.taskDescInput.value;
        const prioritySelect = this.prioritySelectInput.value;
        const prioritySelectText = this.prioritySelectInput.options[this.prioritySelectInput.selectedIndex].text

        const obj = {
            id : Date.now(),
            taskName,taskDesc,prioritySelect,prioritySelectText,completed:false,createdAt: Date.now()

        }

        this.saveToStorage();
        this.render();
    }

//// and now do some logic for created time update  (this is copy pasted)

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
setInterval(() => {
    myTaskManager.renderTasks();
}, 60000);
    

******                                            Step 5                                             *******


//// Now Toggle to form model (open - close) event + push object to array and console then clear all inputs+ save task logic event handling and also close to modal after save + use function toggle for repated task
    
    addTask(){

            this.array.push(newTask);
            console.log(this.array);
        
            this.taskNameInput.value = "";
            this.taskDescInput.value = "";
            this.prioritySelectInput.value = "";
            this.prioritySelectInput.selectedIndex = 0;
    }


        // form open - close event handling
        document.querySelector('#addTaskBtn').addEventListener('click', () => {
        

            document.querySelector('#addTaskModel').classList.toggle('flex');
            document.querySelector('#addTaskModel').classList.toggle('hidden');
        });

        document.querySelectorAll('.formCancel').forEach((btn) => {
            btn.addEventListener('click', () => {
                document.querySelector('#addTaskModel').classList.toggle('flex');
                document.querySelector('#addTaskModel').classList.toggle('hidden');
            });
        });


        // task save using event handling

        document.querySelector("#formSavebtn").addEventListener("submit", e => {
            e.preventDefault()
            app.addTask()
            document.querySelector('#addTaskModel').classList.toggle('flex');
        document.querySelector('#addTaskModel').classList.toggle('hidden');
        })


From :- 

        document.querySelector('#addTaskModel').classList.toggle('flex');
        document.querySelector('#addTaskModel').classList.toggle('hidden');

To   :-

        function toggle(){
        document.querySelector('#addTaskModel').classList.toggle('flex');
        document.querySelector('#addTaskModel').classList.toggle('hidden');
}

for example pasted only one task : -
    
        document.querySelector('#addTaskBtn').addEventListener('click', () => { 
            toggle()
        });



******                                            Step 6                                             *******


//// now  change form submit code logic + create functions for repeated codes (delete task models(toggles) + searchbar(cancelIcon + focus/border-hover(add-remove))) + searchbar-priority (change + click + input) logic 


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

// filter event handling
document.querySelector(".priority-filter-select").addEventListener("change", () => {
    user.render()
})

// search event handling

function searchCancleAdd() {
    document.querySelector("#searchCancel").classList.add("flex");
    document.querySelector("#searchCancel").classList.remove("hidden");
}

function searchCancleRemove() {
    document.querySelector("#searchCancel").classList.remove("flex");
    document.querySelector("#searchCancel").classList.add("hidden");
}

function searchFocusRemove() {
    document.querySelector("#search").classList.add("border-gray-600");
    document.querySelector("#search").classList.remove("border-gray-100");
}
function searchFocusAdd() {
    document.querySelector("#search").classList.remove("border-gray-600");
    document.querySelector("#search").classList.add("border-gray-100");
}
document.querySelector("#searchBar").addEventListener("input", (e) => {
    e.preventDefault()
    user.render()
    if (e.target.value === "") {
        searchCancleRemove()
        searchFocusRemove()
    }
    else {
        searchCancleAdd()
        searchFocusAdd()
    }
})

document.querySelector("#searchCancel").addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelector("#searchBar").value = "";
    searchCancleRemove()
    searchFocusRemove()
    user.render()
})
document.querySelector("#searchbtn").addEventListener("click", (e) => {
    e.preventDefault();
    searchFocusRemove()
    user.render()
})


******                                            Step 7                                            *******


////  now add methods for (rendertask + render + dragdrop + stats + save-load-localStorage + deletetask + edit-update-task + prioritycolor ) and add logics for each and every methods with connections via method call using (this function) and update constrtuctor + addtask mmethods logic - contents



 constructor() {
        this.array = [];
        this.Taskid = null;
        this.Editid = null;
        this.dragElement = null;

        this.taskNameInput = document.querySelector("#taskName");
        this.taskDescInput = document.querySelector("#taskDesc");
        this.prioritySelectInput = document.querySelector("#prioritySelect");

        this.justadd = document.querySelector("#just-added")
        this.inprogress = document.querySelector("#in-progress")
        this.completed = document.querySelector("#completed")


        this.loadFromStorage();
        this.render();
    }

   // Priority -> color mapping (High = Red, Medium = Yellow, Low = Green)
    getPriorityColor(priority) {
        const colors = {
            high: { bar: "from-red-500 to-red-500", text: "text-red-500" },
            medium: { bar: "from-yellow-500 to-yellow-500", text: "text-yellow-500" },
            low: { bar: "from-green-500 to-green-500", text: "text-green-500" }
        };
        return colors[priority] || colors.low;
    }

    // Data methods

    addTask() {
        const taskName = this.taskNameInput.value;
        const taskDesc = this.taskDescInput.value;
        const prioritySelect = this.prioritySelectInput.value;
        const prioritySelectText =
            this.prioritySelectInput.options[this.prioritySelectInput.selectedIndex]
                .text;

        const newTask = {
            id: Date.now(),
            taskName,
            taskDesc,
            prioritySelect,
            prioritySelectText,
            completed: false,
            createdAt: Date.now(),
            status: this.justadd.id
        };

        if ((!taskName) || (!taskDesc) || (!prioritySelect)) {
            alert("please fill all details!")
        }
        else {
            this.array.push(newTask);
            console.log(this.array);
        }

        this.taskNameInput.value = "";
        this.taskDescInput.value = "";
        this.prioritySelectInput.value = "";
        this.prioritySelectInput.selectedIndex = 0;

        this.saveToStorage();
        this.render();
    }
    editTask(id) {
        const edit = this.array.find((i) => i.id === id);

        if (edit) {
            this.taskNameInput.value = edit.taskName;
            this.taskDescInput.value = edit.taskDesc;
            this.prioritySelectInput.value = edit.prioritySelect;
        }

        this.saveToStorage();
        this.render()
    }
    updateTask(id) {

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
    }

    // Helper methods

    filter() {
        const filterVal = document.querySelector(".priority-filter-select").value;
        const searchBarfilter = document.querySelector("#searchBar").value;

        return this.array.filter((item) => (filterVal === "" || item.prioritySelect === filterVal) && (searchBarfilter === "" || item.taskName.toLowerCase().includes(searchBarfilter.toLowerCase()) || item.taskDesc.toLowerCase().includes(searchBarfilter.toLowerCase())));
    }
    // Ui methods

    render() {
        const displayTask = this.filter();

        const justaddTasks = displayTask.filter((item) => item.status === "just-added");
        const inprogressTasks = displayTask.filter((item) => item.status === "in-progress");
        const completedTasks = displayTask.filter((item) => item.status === "completed");

        if (!this.justadd) return;
        if (!this.inprogress) return;
        if (!this.completed) return;

        this.justadd.innerHTML = "";
        this.inprogress.innerHTML = "";
        this.completed.innerHTML = "";


        if (displayTask.length === 0) {
            document.getElementById("totalTasks").textContent = "00";
        }
        if (justaddTasks.length === 0) {
            this.justadd.innerHTML = `
                                    <div class="empty-state">
                                        <div class="dashed-box">There is no task added</div>
                                    </div>
                        `;
            document
                .querySelectorAll(".pendingStats")
                .forEach((e) => (e.textContent = "00"));

        }
        if (inprogressTasks.length === 0) {
            this.inprogress.innerHTML = `
                                    <div class="empty-state">
                                        <div class="dashed-box">There is no task added</div>
                                    </div>
                        `;

            document
                .querySelectorAll(".inprogressStats")
                .forEach((e) => (e.textContent = "00"));

        }
        if (completedTasks.length === 0) {
            this.completed.innerHTML = `
                                    <div class="empty-state">
                                        <div class="dashed-box">There is no task added</div>
                                    </div>
                        `;
            document
                .querySelectorAll(".completedStats")
                .forEach((e) => (e.textContent = "00"));

        }


        this.renderTask(justaddTasks, this.justadd)
        this.renderTask(inprogressTasks, this.inprogress)
        this.renderTask(completedTasks, this.completed)

        this.taskstats(displayTask, justaddTasks, inprogressTasks, completedTasks)
        this.dragdrop(displayTask)

    }
    renderTask(task, column) {

        function toggle1() {
            document.querySelector("#addTaskModel").classList.toggle("flex");
            document.querySelector("#addTaskModel").classList.toggle("hidden");
        }
        task.forEach((item) => {
            let rowDiv = document.createElement("div");
            rowDiv.classList.add("tasks")

            const priorityColor = this.getPriorityColor(item.prioritySelect);

            rowDiv.innerHTML = `
                            <div class="task-card" draggable="true">
                                <div class="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-b ${priorityColor.bar} rounded-l-lg"></div>
                
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
                                    <span class="${priorityColor.text} text-xs font-semibold">${item.prioritySelectText}</span>
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

            rowDiv.addEventListener("drag", (e) => {
                this.dragElement = rowDiv
                this.Taskid = item.id
            })
        });
    }

    dragdrop(task) {

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

        addDrag(this.justadd)
        addDrag(this.inprogress)
        addDrag(this.completed)
    }

    taskstats(data, justaddTasks, inprogressTasks, completedTasks) {
        const totalTask = document.getElementById("totalTasks");

        const pendingask = document.querySelectorAll(".pendingStats");
        const inprogressTask = document.querySelectorAll(".inprogressStats");
        const completedTask = document.querySelectorAll(".completedStats");

        const total = data.length
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
        this.saveToStorage()
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