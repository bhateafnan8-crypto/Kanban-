//////  here i am using ai to solve all problems some main and major problems i have mention.. because of first time using these things + concepts i am using ai only and write coode learning some from here i will implented in next propjects

//                                            !  problem 1  !                                          \\

? for update and set time of created task like whatsapp and other ( just now - 1 hour ago - 1 day ago)  did't how to do ?

!   solution : -  !
      I know Date.now() give me time but it give large number how to get time and do update like 1 hour ago and i am just go to claude and get for this time in future i will learn and execute it by own....  


//                                            !  problem 2  !                                          \\

? for open and close form when click on add to task and cancel+close buttons (close form model not working)?

!   solution : -  !
      This happens because i am using class which is two class for formModal and task delete Modal so it take both and do for first and because of classes it not working .. i am add id for both and target add modal and do for open close close form not works in past but after adding id and selecting them add flex and hidden which are predefined in tailwind so use this for add task it take add task button and for close there are two buttons so for that thing i was use class  i think it will work but it not work beacuse i was not using queryselectorall() and for changing for both i was use forEach so it will work now (changes(remove inline css(remove display=flex in style.css for non overlapp (use id (take foreach with queryselecetor all and do for close)))))
      

//                                            !  problem 3  !                                          \\

? for open and close delete when click on deleteok to task and cancel+close buttons (close delete model not working)?

!   solution : -  !
      This happens beacaus i am calling + passing(arguments) 3 times rendertask and use that button click logic in that rendertask method and add toggle function whenever i click it call 3 times and repetation happens and delete model not closing .. for this to solve i have add that logic outside of class like form model sp it will successfull worked using id it will work for each and every tasks..


//                                            !  problem 4  !                                          \\

? for edit task and update tasks after get tasks content to form it not clear and save to another one not in exisitng (edit form model not working)?

!   solution : -  !
      This happens because it will get only content from id selection not save to exisiting task and not clear for empty or new task add.. for this i am create a variable editId = null for empty id or new task if it will true then add to new task if id get with matched task id which is exist in tasks column so it will trigger to get content and update it to same task using that values using condtion like id get or match so set value of change or update to exisiting one


//                                            !  problem 5  !                                          \\

? for column wise update it was not working means it was add only to justadd column after refresh(column wise tasks not working)?

!   solution : -  !
      This happens beacuse it was hardcoded set value to add task to column just add and not using status in object like completed-inprogress...  for make this to dynamically in betwwen all three columns whenever it will add to anyone dont move to just add save at that place after refresh and for these i was making three groups + tasks varibles for get ids(using dom) and status(using filter) and call rendertask three times and pass all these groups and tasks variable as a arguments for dynamically changes 

 //                                            !  problem 6  !                                          \\

? for column wise update it was not working means it was add only to justadd column (column wise emptyTasks not working)?

!   solution : -  !
      this happens same because of same reason but here some change here not status or any other (here only like hardcoded for only displaytask (which was for only array if array empty then it show otherwise not)).. for this to solve get ids (using dom ) and make it for pending just add completed only and displaytask for total beacuse it will take all task which will only get from array only..


 //                                            !  problem 7 !                                          \\

? for column wise update it was not working means it was add only to total tasks (column wise stats not working)?

!   solution : -  !
      this happens because same reason as above emptyTasks reason (thee columns id not take and groups )... for this to solve get the ids(using dom) and groups(using filter) to get length and save this to variable and make single function and pass the length variable for all three columns stats passing through arguments

 //                                            !  problem 8 !                                          \\

? for responsive of website not proper alling (resposnive not working)?

!   solution : -  !
      This happens beacuse of sizinng + spacing  + allingment + layouts .. for this to solve copy paste code from claude ai because i havent learn tailwind and css coonnection +integration .. and dont know how to use tailwind