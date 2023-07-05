"use strict";
let addAssignment = (event) => {
    event.preventDefault();
    // Get input text
    let inputElement = document.querySelector('#input');
    let inputText = inputElement.value;
    // Validation for submitting empty input
    if (inputText !== '') {
        // Create new <li> element
        let liElement = document.createElement('li');
        liElement.innerText = inputText;
        // Select elements
        let assignmentsList = document.querySelector('#todo');
        // Create checkbox
        let checkBox = document.createElement('input');
        checkBox.id = `assignment-${assignmentsList.children.length + 1}`;
        checkBox.type = 'checkbox';
        checkBox.checked = false;
        checkBox.classList.add('checkbox');
        // Add event listener which moves task in finished tasks list
        checkBox.addEventListener('click', (event) => {
            moveFinishedTask(event);
        });
        // Create label element for checkbox
        let labelElement = document.createElement('label');
        labelElement.htmlFor = checkBox.id;
        labelElement.innerText = 'Done';
        // Compose <li> element
        liElement.appendChild(checkBox);
        liElement.appendChild(labelElement);
        // Add <li> element to DOM
        assignmentsList === null || assignmentsList === void 0 ? void 0 : assignmentsList.appendChild(liElement);
        // Clear input field
        inputElement.value = '';
    }
    else {
        // Get validation span element
        let validationSpanElement = document.getElementById('validation');
        // Make it visible by changing CSS
        validationSpanElement.style.display = 'inline-block';
    }
    // Set tasks count - total, not finished and finished
    setTaskStatistics();
};
const moveFinishedTask = (event) => {
    var _a;
    // Get finished tasks container
    let finishedList = document.getElementById('finished-tasks');
    // Get clicked task text
    let id = (_a = event.target) === null || _a === void 0 ? void 0 : _a.id;
    let taskNumber = id.split('-')[1];
    let liElement = document.querySelector(`li:nth-child(${taskNumber})`);
    let task = liElement === null || liElement === void 0 ? void 0 : liElement.childNodes[0].textContent;
    // Remove <li> element from not finished tasks list
    liElement === null || liElement === void 0 ? void 0 : liElement.remove();
    // Create <li> for finished task
    let finishedTaskLiElement = document.createElement('li');
    finishedTaskLiElement.textContent = task;
    finishedTaskLiElement.style.textDecoration = 'line-through';
    // Append <li> element to finished tasks <ul>
    finishedList.appendChild(finishedTaskLiElement);
    // Fix elements id indexes
    fixIndexes();
    // Update statistics
    setTaskStatistics();
};
const fixIndexes = () => {
    let todoLiCheckboxElements = document.querySelectorAll('ul#todo>li>input');
    let counter = 1;
    for (const inputElement of todoLiCheckboxElements) {
        inputElement.id = `assignment-${counter++}`;
    }
};
const hideValidationSpan = () => {
    // Get validation span element
    let validationSpanElement = document.getElementById('validation');
    // Hide element by changing CSS
    validationSpanElement.style.display = 'none';
};
const setTaskStatistics = () => {
    var _a, _b;
    // Calculate tasks count
    let notFinishedTasksCount = (_a = document.getElementById('todo')) === null || _a === void 0 ? void 0 : _a.children.length;
    let finishedTasksCount = (_b = document.getElementById('finished-tasks')) === null || _b === void 0 ? void 0 : _b.children.length;
    let totalTasks = notFinishedTasksCount + finishedTasksCount;
    // Set current numbers
    document.getElementById('ongoing-stats').innerText = `${notFinishedTasksCount}`;
    document.getElementById('finished-stats').innerText = `${finishedTasksCount}`;
    document.getElementById('total').innerText = `${totalTasks}`;
};
const setFooterCurrentDate = () => {
    // Get copyright section
    let copyrightParagraph = document.querySelector('footer>section:nth-child(1)>p');
    // Add current year
    copyrightParagraph.innerText += ` ${new Date().getFullYear().toString()}`;
    console.log(copyrightParagraph.innerText);
};
const resetTasks = () => {
    document.getElementById('todo').innerHTML = '';
    document.getElementById('finished-tasks').innerHTML = '';
    document.getElementById('ongoing-stats').innerText = '0';
    document.getElementById('finished-stats').innerText = '0';
    document.getElementById('total').innerText = '0';
    document.getElementById('validation').style.display = 'none';
};
