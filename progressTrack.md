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
