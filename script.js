function toggle() {
    document.querySelector("#addTaskModel").classList.toggle("flex");
    document.querySelector("#addTaskModel").classList.toggle("hidden");
}

// Class Initialize
class Tasks {
    constructor() {
        this.array = [];

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

        const newTask = {
            id: Date.now(),
            taskName,
            taskDesc,
            prioritySelect,
            prioritySelectText,
            completed: false,
            createdAt: Date.now(),
        };

        this.array.push(newTask);

        console.log(this.array);

        this.taskNameInput.value = "";
        this.taskDescInput.value = "";
        this.prioritySelectInput.value = "";
        this.prioritySelectInput.selectedIndex = 0;

        this.saveToStorage();
        this.render();
    }
    editTask(id) { }
    deleteTask(id) { }

    // Helper methods

    // setFilterTask() { }
    getFilteredTask(id) {
        const filterVal = document.querySelector(".priority-filter-select").value;
        if (filterVal !== "") {
            return this.array.filter((item) => item.prioritySelect === id);
        }
        return this.array;
    }
    taskstats(data) {
        const totalTask = document.getElementById("totalTasks");
        const pendingask = document.querySelectorAll(".pendingStats");
        const inprogressTask = document.querySelectorAll(".inprogressStats");
        const completedTask = document.querySelectorAll(".completedStats");

        const total = data.reduce(
            (acc, cur) => acc + parseFloat(cur.this.array.length),
            0,
        ); // this is logic we use to return final answer of calculation of all added exepnse's amount ?? parsefloat to converrt it into float value  from text  and set into total variable and it set to main variable where we select the html id if this get then in there ui set it display in string means from number to string or text conversion
        if (totalTask) totalTask.textContent = total.toLocaleString();
    }
    searchTask(title) {
        const searchBarfilter = document.querySelector("#searchBar").value;
        if (searchBarfilter !== "") {
            return this.array.filter((item) => item.taskName === title);
        }
        return this.array;
    }

    // Ui methods

    render() {
        const list = document.querySelector("#just-added");
        if (!list) return;
        list.innerHTML = "";

        const displayTask = this.getFilteredTask();

        if (displayTask.length === 0) {
            list.innerHTML = `
                        <div class="empty-state">
                            <div class="dashed-box">There is no task added</div>
                        </div>
            `;
            document.getElementById("totalTasks").textContent = "00";
            document
                .querySelectorAll(".pendingStats")
                .forEach((e) => (e.textContent = "00"));
            document
                .querySelectorAll(".inprogressStats")
                .forEach((e) => (e.textContent = "00"));
            document
                .querySelectorAll(".completedStats")
                .forEach((e) => (e.textContent = "00"));
        }

        this.renderTask(displayTask)
        this.taskstats(displayTask)
        
    }
    renderTask(task) {
        const list = document.querySelector("#just-added");

        task.forEach((item) => {
            let rowDiv = document.createElement("div");
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
            <button class="delete-btn text-red-500 hover:text-red-400 transition"><i class="ri-delete-bin-6-line"></i></button>
        </div>
    </div>
    <div class="flex items-center justify-between pl-4">
                <span class="text-orange-500 text-xs font-semibold">${item.prioritySelectText}</span>
                <span class="text-gray-500 text-xs">${timeAgo(task.createdAt)}</span>
            </div>
</div>
            `;
            list.appendChild(rowDiv)
            // document.querySelector(".delete-btn").addEventListener("click",)
        });
    }

    // Storage methods

    loadFromStorage() { }
    saveToStorage() { }
}

// object initilize and class call
const user = new Tasks();



// form open - close event handling
document.querySelector("#addTaskBtn").addEventListener("click", () => {
    toggle();
});

document.querySelectorAll(".formCancel").forEach((btn) => {
    btn.addEventListener("click", () => {
        toggle();
    });
});

// task save using event handling

document.querySelector("#taskform").addEventListener("submit", (e) => {
    e.preventDefault();
    user.addTask();

    toggle();
});

setInterval(() => {
    myTaskManager.renderTasks();
}, 60000);
