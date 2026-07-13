    // Class Initialize
    class Tasks {
        constructor() {
            this.array = [];
            this.Taskid = null;
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

            const newTask = {
                id: Date.now(),
                taskName,
                taskDesc,
                prioritySelect,
                prioritySelectText,
                completed: false,
                createdAt: Date.now(),
            };

            if ((!taskName) || (!taskDesc) || (!prioritySelect)) {
                alert("please fill all details!")
            }
            else {

                this.array.push(newTask);
                console.log(this.array,this.dragdrop());
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
            const edit = this.array.filter((i) => i.id === id);
            if (edit) {

                this.taskNameInput.value = edit[0].taskName;
                this.taskDescInput.value = edit[0].taskDesc;
                this.prioritySelectInput.value = edit[0].prioritySelect;
                // this.prioritySelectInput.selectedIndex = edit[0].prioritySelect ;


            }

            this.saveToStorage();
            this.render()
        }
        deleteTask(id) {
            this.array = this.array.filter((i) => i.id !== id)
            this.saveToStorage();
            this.render()
            console.log(this.array)
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

                return
            }

            this.renderTask(displayTask)
            this.taskstats(displayTask)
            this.dragdrop()

        }
        renderTask(task) {

            const list = document.querySelector("#just-added");
            function toggle() {
                document.querySelector("#deleteTaskModel").classList.toggle("flex");
                document.querySelector("#deleteTaskModel").classList.toggle("hidden");
            }
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
                list.appendChild(rowDiv)

                rowDiv.querySelector(".delete-btn").addEventListener("click", () => {
                    this.Taskid = item.id
                    toggle()
                })

                rowDiv.querySelector(".edit-btn").addEventListener("click", () => {
                    this.editTask(item.id)
                    toggle1()
                })
                // rowDiv.forEach(rowDiv => {
                //     task.addEventListener("drag",(e) =>{
                //         this.dragElement = task
                //     })
                // })

                rowDiv.addEventListener("drag",(e) =>{
                        this.dragElement = rowDiv
                    })
            });
            document.querySelector("#deleteCnacelbtn").addEventListener("click", () => {
                toggle()
            })
            document.querySelector("#deleteokbtn").addEventListener("click", () => {
                this.deleteTask(this.Taskid)
                toggle()
            })
            // this.dragdrop(rowDiv)
        }

        dragdrop(task){
            
            // const rowDiv = document.querySelector(".tasks")
            const justadd = document.querySelector("#just-added")
            const inprogress = document.querySelector("#in-progress")
            const completed =  document.querySelector("#completed")
           
            // if (!justadd) return;
            // justadd.innerHTML = "";
            // if (!inprogress) return;
            // inprogress.innerHTML = "";
            // if (!completed) return;
            // completed.innerHTML = "";
            const  addDrag = (column) => {
                column.addEventListener("dragenter", (e) =>{
                    e.preventDefault()
                    column.classList.add("hover-over")
                })
                column.addEventListener("dragleave", (e) =>{
                    e.preventDefault()
                    column.classList.remove("hover-over")
                })
                column.addEventListener("dragover",(e) => {
                    e.preventDefault()
                })
                column.addEventListener("drop", (e) => {
                    e.preventDefault()
                    column.appendChild(this.dragElement)
                    column.classList.remove("hover-over")
                    // column.classList.remove("hover-over")
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


            const total = this.array.length
            if (totalTask) totalTask.textContent = total.toString().padStart(2, "0");


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
            toggle();
        });
    });

    // task save using event handling

    document.querySelector("#taskform").addEventListener("submit", (e) => {
        e.preventDefault();
        user.addTask();

        toggle();
    });

    document.querySelector(".priority-filter-select").addEventListener("change", () => {
        user.render() // this is for diaply filtered data tasks in ui
    })
    setInterval(() => {
        myTaskManager.renderTasks();
    }, 60000);
