/*

data issue
get input information - user entries
class template with properties and methods
click event - click-handler
CRUD: Create - Read - Update - Delete

*/

// IIFE: Immediately Invoked Function Expression - Self-Invoking Function Expression

// function sayHi() {                   // regular function
//     console.log('Hi guys');
// }
// sayHi();

// (function () {
//     console.log('Hi guys');          // Self-Invoking Function
// })();

// -------------------------
// coding start right here:

// ******************* getting the date - data issue: 
(function () {
    let date = new Date();
    // console.log(date);

    let daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let monthsOfYear = ['january', 'February', 'March', 'April', 'Mai', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
    let day = date.getDay();
    let dayOfMonth = date.getDate();        // output --> 0 - 30 e.g. 0 = 1st
    let month = date.getMonth();            // output --> 0 - 11 e.g. 0 = January
    let year = date.getFullYear();
    

    // console.log(day);           // output --> 4 => 0 - 6 the number of a day e.g 0 = sunday
    // console.log(daysOfWeek[day]);
    // console.log(dayOfMonth);
    // console.log(monthsOfYear[month]);

    document.querySelector('.date').textContent = `${daysOfWeek[day]}, ${monthsOfYear[month]}. ${dayOfMonth}. ${year}`;
})();

// ****************** class template with properties & methods

class ToDo {                // ES6
    constructor (id, priority, text){
        this.id = id;
        this.priority = priority;
        this.text = text;
        this.completed = false;
    };

    // Methods
    // for priority
    set changePriority (value){
        this.priority = value;
    };

    // for action
    set changeText (value){
        this.text = value;
    };

    // for completed
    set changeCompleted (value){
        this.completed = value;
    };
};


// array needed to create all toDo items
let toDoItemsArray = [];

// ****************** click event - click-handler
document.querySelector('.btn-add').addEventListener('click', function (e) {
    // console.log(e.target);       // output --> add button

    // in order to update toDo's content
    if (e.target.id) {
        let iDi = e.target.id;
        let toDoElem = toDoItemsArray.find(item => item.id == iDi)

        // console.log('We will update the content soon');
        let priority = document.querySelector('.selectPriority').value;
        let text = document.querySelector('.inputTodo').value;

        toDoElem.changePriority = priority;
        toDoElem.changeText = text;

        document.querySelector('.selectPriority').value = 'Priority';
        document.querySelector('.inputTodo').value = '';

        document.querySelector('.btn-add').textContent = 'Add';
        document.querySelector('.btn-add').id = '';

        document.querySelector('.container').innerHTML = '';
        toDoItemsArray.forEach(item => displayItemsOnBrowser(item));
    }
    else {
        // in order to create a new toDo
        let iD, newItem;
    
        // create a new ID
        if (toDoItemsArray.length > 0){
            iD = toDoItemsArray[toDoItemsArray.length - 1].id + 1;
        } else {
            iD = 1;
        }
    
        let priority = document.querySelector('.selectPriority').value;
        let text = document.querySelector('.inputTodo').value;
    
        if (priority !== 'Priority' && text) {
            
            // console.log(priority, action);
        
            // to create a new instance object
            newItem = new ToDo(iD, priority, text);
        
            // push new items (new instance objects) to toDoItemsArray
            toDoItemsArray.push(newItem);
            // console.log(toDoItemsArray);
        
            // to clear the input and select element's content
            document.querySelector('.selectPriority').value = 'Priority';
            document.querySelector('.inputTodo').value = '';
        
            document.querySelector('.noAction').style.display = 'none';
            document.querySelector('.container').style.display = 'block';
            document.querySelector('.container').innerHTML = '';
            toDoItemsArray.forEach(item => displayItemsOnBrowser(item));
        };
    }
});


// READ from CRUD operator
function displayItemsOnBrowser({id, priority, text, completed}) {
    let checkPriority = priority === 'Critical' ? 'critical' : priority === 'High' ? 'high' : priority === 'Medium' ? 'medium' : priority === 'Low' ? 'low' : '';

    let itemTemplate = `
        <div class="todo-item ${checkPriority}">
            <div class="check ${completed ? 'green' : ''}"><i class="fas
                    fa-check" data-check=${completed} data-id=${id}></i></div>
            <div class="todo ${completed ? 'line' : ''}">${text}</div>
            <div class="edit"><i class="far fa-edit" data-id=${id}></i></div>
            <div class="trash"><i class="fas fa-trash-alt" data-id=${id}></i></div>
        </div>
    `;

    document.querySelector('.container').insertAdjacentHTML('beforeend', itemTemplate);
};


// check toDo whether completed or not

document.querySelector('.container').addEventListener('click', (e) => {
    // e represents EVENT
    // e.target : HTML element
            // console.log(e.target);
    let checkElement = e.target.closest('.check > i.fa-check');
    if (checkElement) {
        // console.log(checkElement);
        let checked = e.target.dataset.check;
        let iD = e.target.dataset.id;
        let toDoElement = toDoItemsArray.find(item => item.id == iD);
        // console.log(toDoElement);
        if (checked === 'false') {
            toDoElement.changeCompleted = true;

            checkElement.setAttribute('data-check', true);
            document.querySelector('.container').innerHTML = '';
            toDoItemsArray.forEach(toDi => displayItemsOnBrowser(toDi));
        } else {
            toDoElement.changeCompleted = false;
            document.querySelector('.container').innerHTML = '';
            toDoItemsArray.forEach(toDi => displayItemsOnBrowser(toDi));
        }
    }
});

// *********** DELETE - remove any object from toDoItemsArray

document.querySelector('.container').addEventListener('click', (e) => {
    let trashElem = e.target.closest('.fa-trash-alt');
    if (trashElem) {
        let Id = +e.target.dataset.id;
        toDoItemsArray = toDoItemsArray.filter(iTem => iTem.id !== Id);
        document.querySelector('.container').innerHTML = '';
        toDoItemsArray.forEach(reset => displayItemsOnBrowser(reset));

        if (toDoItemsArray.length === 0) {
            document.querySelector('.noAction').style.display = 'block';
            document.querySelector('.container').style.display = 'none';
        }
    }
});

// *********** UPDATE - edit the content of any toDoItemsArray

document.querySelector('.container').addEventListener('click', (e) => {
    let editElem = e.target.closest('.fa-edit');
    if (editElem) {
        let ID = e.target.dataset.id;
        let toDoItems = toDoItemsArray.find(object => object.id == ID);

        document.querySelector('.selectPriority').value = toDoItems.priority;
        document.querySelector('.inputTodo').value = toDoItems.text;
        document.querySelector('.btn-add').textContent = 'Edit';
        document.querySelector('.btn-add').id = toDoItems.id;
    }
});

// animation
let glowInText = document.querySelector('.noAction');

let letters = glowInText.textContent.split('');
glowInText.textContent = '';
letters.forEach((letter, i) => {
    let span = document.createElement('span');

    span.textContent = letter;
    span.style.animationDelay = `${i * 0.05}s`;
    glowInText.append(span);
});