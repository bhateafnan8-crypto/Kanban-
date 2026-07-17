////  Here i am only do any changes in code or get context using ai 

/////  class id seperations

id                    |          class
totalTasks (id)       | pendingStats (class)
addTaskBtn (id)       | inprogressStats (class)
pendingStats (id)     | completedStats (class)
inprogressStats (id)  | priority-filter-wrap (class)
completedStats (id)   | priority-filter-select (class)
searchBar (id)        | empty-state (class)
searchbtn (id)        | modal-backdrop (class)
just-added (id)       | modal-container (class)
in-progress (id)      | edit-btn (class)
completed (id)        | delete-btn (class)
formClose(id)         | task-card (class)
taskName (id)         | dragging (class)
taskDesc (id)         | column-container (class)
prioritySelect (id)   | tasks-container (class)
formCancelbtn (id)    | column-tag (class)
formSavebtn (id)      | dashed-box (class)
deleteCnacelbtn (id)  | priority-filter-icon (class)
deleteokbtn (id)      | formCancel(class)
deleteTaskModel(id)   | hover-over (class)
addTaskModel(id)      | tasks (class)
taskform(id)          | columnTotal(class)
searchCancel(id)
search(id)





// here i am pasted extra lines of code 

        // const justadd = document.querySelector("#just-added")
        // const inprogress = document.querySelector("#in-progress")
        // const completed = document.querySelector("#completed")

        // const justaddBox = this.justadd
        // const inprogressBox = this.inprogress
        // const completedBox =this.completed
        
        //const justaddTasks = data.filter((item) => item.status === "just-added");
        // const inprogressTasks = data.filter((item) => item.status === "in-progress");
        //const completedTasks = data.filter((item) => item.status === "completed");










//  here i am add those things which implemented but not proper working .. 
----                                                                        01                                                                    --
    // setFilterTask() { }
    // getFilteredTask() {
    //     const filterVal = document.querySelector(".priority-filter-select").value;
    //     if (filterVal !== "") {
    //         return this.array.filter((item) => item.prioritySelect === filterVal);
    //     }
    //     return this.array;
    // }
    
    // const searchdisplay = this.searchTask();

    // searchTask() {
    //     const searchBarfilter = document.querySelector("#searchBar").value;
    //     if (searchBarfilter !== "") {
    //         return this.array.filter((item) => item.taskName.toLowerCase().includes(searchBarfilter.toLowerCase()));
    //     }
    //     return this.array;
    // }



----                                                                        02                                                                    --

            // rowDiv.forEach(rowDiv => {
            //     task.addEventListener("drag",(e) =>{
            //         this.dragElement = task
            //     })
            // })

            // this.dragdrop(rowDiv)







----                                                                        03                                                                    --



        //  if (filterVal !== "" || searchBarfilter !== "") {
            return this.array.filter((item) => item.prioritySelect === filterVal && item.taskName.toLowerCase().includes(searchBarfilter.toLowerCase()));
        // }
        // else{
        // return this.array;

        // }