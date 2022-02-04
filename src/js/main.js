const mylist = document.querySelector('#todo-list'); // selecting the list of the items
const mydiv = document.querySelector('.components'); // selecting the div of the components
const addTaskButton = document.querySelector('#add-button'); // selecting the Add to list button
const taskInput = document.querySelector('#todo-input'); // selecting the user input of the task
const deletebutton = document.getElementById('#todo-deletebutton'); // selecting the delete buttons of the list



function createLine(msg) { // creating a function that will create the lines of to do list

    if (!msg) { // creating a conditional for empty strings
        alert('Invalid or blank input (task).'); // will display an alert in the html
        return; // will stop the function to avoid creating a blank line
    };

    const line = document.createElement('li'); // creating a <li> element (line of a <ul>)
    line.classList.add('todo-line') // adding a class name to the lines of the to-do list

    line.innerHTML += ' '; // setting a space between the line of the list and the delete button

    let del_button = document.createElement('button'); // creating a <button> element
    del_button.innerText = 'Delete'; // setting the text inside the button to Delete
    del_button.setAttribute('class', 'todo-deletebutton'); // adding a id named todo-deletebutton to the delete button of the lines

    mylist.appendChild(line); // appending the line created to the list
    line.innerHTML = msg; // will insert the message to the <li> created
    line.appendChild(del_button); // appending the delete button to the list ( on the right side of the task )

    saveTasks()
};


addTaskButton.addEventListener('click', function() { // capturing the click on the Add to list button
    const task = taskInput.value; // getting the user input value
    createLine(task); // creating a line on the list with the task typed by the user
    taskInput.value = ''; // setting the value of the input to blank
    taskInput.focus(); // selecting the input (to add another task)
});


taskInput.addEventListener('keypress', function(e) { // getting the event of keys pressed in the html page
    if (e.key === 'Enter') { // if the key pressed is equal to Enter, than will do the same as when Add button is clicked
        const task = taskInput.value; // getting the user input value
        createLine(task); // creating a line on the list with the task typed by the user
        taskInput.value = ''; // setting the value of the input to blank    
        taskInput.focus(); // selecting the input (to add another task)
    };
});


document.addEventListener('click', function(event) { // capturing all the events involving clicks on the document
    const element = event.target; // targeting which element was clicked

    if (element.classList.contains('todo-deletebutton')) { // if the element has the class todo-deletebutton
        element.parentElement.remove(); // remove the parent (the line) of the button
        saveTasks() // saving the tasks without the deleted ones
    }
});


function saveTasks() { // saving the tasks on the html 
    const taskList = document.querySelectorAll('li'); // selecting all the lines of the list (all the tasks)
    const tasksArray = []; // creating a empty array that will contains all the tasks

    for (let textofarray of taskList) {
        let alteredText = textofarray.innerText.replace('Delete', '').trim();
        // replacing the Delete from the array item, the trim() method will remove the blank spaces at the end/begining of the string
        tasksArray.push(alteredText); // adding the task without the 'Delete' to the array
    };

    const JSONtasks = JSON.stringify(tasksArray); // converting the array (JSON object) to a string

    localStorage.setItem('jsontasks', JSONtasks) // storing the array as an string (named jsontasks) in the localStorage of the browser. this will work as a lite SQL of browser itself
    // to see this items on the browser: inspect element -> ">>" -> Application -> Storage -> Local storage
};


function setSavedTasks() { // this function will select our saved tasks and create lines with them again, even if we close the browser, they'll keep on the browser
    const tasksSavedArray = localStorage.getItem('jsontasks'); // selecting the array (as a string)
    const tasksSavedJSON = JSON.parse(tasksSavedArray); // converting the array (as a string) to a JavaScript array object

    for (let tasksaved of tasksSavedJSON) { // iterating over the array
        createLine(tasksaved); // creating the line of the item
    };
};

setSavedTasks(); // calling the function to create the saved tasks