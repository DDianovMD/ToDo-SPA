let addAssignment: Function = (event: Event) => {
    event.preventDefault();

    // Get input text
    let inputElement: (HTMLInputElement | null) = document.querySelector('#input');
    let inputText = inputElement!.value;

    // Validation for submitting empty input
    if(inputText !== '') {
        // Create new <li> element
        let liElement = document.createElement('li');
        liElement.innerText = inputText;

        // Select elements
        let assignmentsList: (HTMLUListElement | null) = document.querySelector('#todo');

        // Create checkbox
        let checkBox = document.createElement('input');
        checkBox.id = `assignment-${assignmentsList!.children.length + 1}`
        checkBox.type = 'checkbox';
        checkBox.checked = false;
        checkBox.classList.add('checkbox');

        // Add event listener which moves task in finished tasks list
        checkBox.addEventListener('click', (event) => {
            moveFinishedTask(event)
        })

        // Create label element for checkbox
        let labelElement = document.createElement('label');
        labelElement.htmlFor = checkBox.id;
        labelElement.innerText = 'Done';
        
        // Compose <li> element
        liElement.appendChild(checkBox);
        liElement.appendChild(labelElement);

        // Add <li> element to DOM
        assignmentsList?.appendChild(liElement);

        // Clear input field
        inputElement!.value = '';
    } else {
        // Get validation span element
        let validationSpanElement: (HTMLElement | null) = document.getElementById('validation')
    
        // Make it visible by changing CSS
        validationSpanElement!.style.display = 'inline-block';
    }

    // Set tasks count - total, not finished and finished
    setTaskStatistics();
}

const moveFinishedTask: Function = (event: Event) => {
        // Get finished tasks container
        let finishedList: (HTMLElement | null) = document.getElementById('finished-tasks');

        // Get clicked task text
        let id = event.target?.id;
        let taskNumber = id.split('-')[1]
        let liElement: (HTMLLIElement | null) = document.querySelector(`li:nth-child(${taskNumber})`);
        let task = liElement?.childNodes[0].textContent;

        // Remove <li> element from not finished tasks list
        liElement?.remove();

        // Create <li> for finished task
        let finishedTaskLiElement: HTMLLIElement = document.createElement('li');
        finishedTaskLiElement.textContent = task;
        finishedTaskLiElement.style.textDecoration = 'line-through'

        // Append <li> element to finished tasks <ul>
        finishedList!.appendChild(finishedTaskLiElement!);

        // Fix elements id indexes
        fixIndexes();

        // Update statistics
        setTaskStatistics();
}

const fixIndexes: Function = () => {
    let todoLiCheckboxElements = document.querySelectorAll('ul#todo>li>input')
    let counter = 1;

    for (const inputElement of todoLiCheckboxElements) {
        inputElement.id = `assignment-${counter++}`
    }
}

const hideValidationSpan: Function = () => {
    // Get validation span element
    let validationSpanElement: (HTMLElement | null) = document.getElementById('validation')

    // Hide element by changing CSS
    validationSpanElement!.style.display = 'none';
}

const setTaskStatistics: Function = () => {
    // Calculate tasks count
    let notFinishedTasksCount: number = document.getElementById('todo')?.children.length;
    let finishedTasksCount: number = document.getElementById('finished-tasks')?.children.length;
    let totalTasks: number = notFinishedTasksCount + finishedTasksCount;

    // Set current numbers
    document.getElementById('ongoing-stats')!.innerText = `${notFinishedTasksCount}`;
    document.getElementById('finished-stats')!.innerText = `${finishedTasksCount}`
    document.getElementById('total')!.innerText = `${totalTasks}`;
}

const setFooterCurrentDate: Function = () => {
    // Get copyright section
    let copyrightParagraph: HTMLParagraphElement = document.querySelector('footer>section:nth-child(1)>p');
    // Add current year
    copyrightParagraph.innerText += ` ${new Date().getFullYear().toString()}`;

    console.log(copyrightParagraph.innerText);
}

const resetTasks: Function = () => {
    document.getElementById('todo')!.innerHTML = '';
    document.getElementById('finished-tasks')!.innerHTML = '';
    document.getElementById('ongoing-stats')!.innerText = '0';
    document.getElementById('finished-stats')!.innerText = '0';
    document.getElementById('total')!.innerText = '0';
    document.getElementById('validation')!.style.display = 'none';
}