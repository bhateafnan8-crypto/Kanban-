// totalTasks
// addTaskBtn
// pendingStats
// inprogressStats
// completedStats
// searchBar
// searchbtn
// priority-filter-wrap
// priority-filter-select
// column-container
// just-added
// empty-state
// in-progress
// completed
// modal-backdrop
// modal-container
// formCancel
// taskName
// taskDesc
// prioritySelect
// formCancelbtn
// formSavebtn
// deleteCnacelbtn
// deleteokbtn
// edit-btn
// delete-btn


// Class Initialize
class Tasks {
    constructor() {
        this.array = []

        this.taskNameInput = document.querySelector("#taskName")
        this.taskDescInput = document.querySelector("#taskDesc")
        this.prioritySelectInput = document.querySelector("#prioritySelect")

        
        this.loadFromStorage()
        this.render()
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
        const prioritySelectText = this.prioritySelectInput.options[this.prioritySelectInput.selectedIndex].text

        const newTask = {
            id: Date.now(),
            taskName, taskDesc, prioritySelect, prioritySelectText, completed: false, createdAt: Date.now()

        }

        this.array.push(newTask);
        
        console.log(this.array)

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

    setFilterTask() { }
    getFilteredTask(id) { }
    taskstats() { }
    searchTask(id) { }


    // Ui methods

    render() { }
    renderTask(task) { }


    // Storage methods

    loadFromStorage() {

    }
    saveToStorage() { }
}

// object initilize and class call
const user = new Tasks()


function toggle(){
     document.querySelector('#addTaskModel').classList.toggle('flex');
    document.querySelector('#addTaskModel').classList.toggle('hidden');
}


// form open - close event handling
document.querySelector('#addTaskBtn').addEventListener('click', () => {
   
toggle()
  
});

document.querySelectorAll('.formCancel').forEach((btn) => {
    btn.addEventListener('click', () => {
        toggle()
        
    });
});


// task save using event handling

document.querySelector("#taskform").addEventListener("submit", (e) => {
    e.preventDefault()
    user.addTask()
  
    toggle()

})



setInterval(() => {
    myTaskManager.renderTasks();
}, 60000);