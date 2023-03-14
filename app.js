"use strict";


//Conocimientos: API  de matchmedia,event manipulation,variables en css,DOM manipulation,
// mediaQueries
let mediaQuery400 = window.matchMedia("(min-width: 400px)");
let mediaQuery600 = window.matchMedia("(min-width: 600px)");
//Tabs
const pomoTab = document.getElementById('timer-pomo');
const shortTab = document.getElementById('timer-short');
const longTab = document.getElementById('timer-long');
//Timer
const startButton = document.getElementById('timer-button')
//Interval of the timer
let idInterval;
//Counter of the pomo number
let pomoCount = 0;
const pomoCounDiv = document.getElementById('info-pomo-count');
//tasks
const taskAddButton = document.getElementById('task-add-button')
const tasksContainer = document.getElementById('tasks-container')
const nextButton = document.getElementById('timer-next-button');
const taskHope = document.querySelector('.task-hope')
let taskHopeCount = 0;
function handleMediaQuery(mediaQuery){
    const timerPomo = document.getElementById('timer-pomo');
    const timerShort = document.getElementById('timer-short');
    const timerLong = document.getElementById('timer-long');
    const headerTitle = document.getElementById('header-title');
    const headerReport = document.getElementById('header-title-report');
    const headerSettings = document.getElementById('header-title-settings');
    const headerLogin = document.getElementById('header-title-login');

    if(mediaQuery.media.includes('400')){
        if(mediaQuery.matches){
            timerPomo.innerHTML = 'Pomodoro'
            timerShort.innerHTML = 'Short Break'
            timerLong.innerHTML = 'Long break'
            headerTitle.innerHTML = 'Pomotimer'
        }else{
            timerPomo.innerHTML = 'Pomo'
            timerShort.innerHTML = 'Short'
            timerLong.innerHTML = 'Long'
            headerTitle.innerHTML = ''
        }
    }else if(mediaQuery.media.includes('600')){
        if(mediaQuery.matches){
            headerReport.innerHTML = 'Report'
            headerSettings.innerHTML = 'Settings'
            headerLogin.innerHTML = 'Login'
        }else{
            headerReport.innerHTML = ''
            headerSettings.innerHTML = ''
            headerLogin.innerHTML = ''
        }
    }

}

function changeTab(e){
    let target = e.target;

    while(target.tagName == 'FONT'){
        target = target.parentNode;
    }
    if(target.tagName == 'H2'){
        target = target.parentNode;
    }

    for(let tab of [pomoTab,shortTab,longTab]){
        tab = tab.parentNode
        if(tab.matches('.timer-pomo-active')){
            tab.classList.toggle('timer-pomo-active');
        }
    }
    target.classList.toggle('timer-pomo-active');
    applyTabEffects(target);

}

function applyTabEffects(target){
    const backgroundPage = document.getElementById('body');
    const timerNumber = document.getElementById('timer-number')
    const timerAdvice = document.getElementById('timer-advice')
    const root = document.documentElement.style;

    if(target.childNodes[0].matches('#timer-short')){
        clearInterval(idInterval)
        startButton.childNodes[1].innerHTML = 'START'
        root.setProperty('--bg-color','#31834f')
        timerNumber.innerHTML = '05:00'
        timerAdvice.innerHTML = 'Time to take a break!'
        root.setProperty('----button-bg-hover','#31834f')
        root.setProperty('--border-bottom-header','#c9ecd6')


    }else if(target.childNodes[0].matches('#timer-pomo')){
        clearInterval(idInterval)
        startButton.childNodes[1].innerHTML = 'START'
        root.setProperty('--bg-color','#ba4949')

        timerNumber.innerHTML = '25:00'
        timerAdvice.innerHTML = 'Time to focus!'
        root.setProperty('----button-bg-hover','#ba4949')
        root.setProperty('--border-bottom-header','#ecc9c9')

    }else if(target.childNodes[0].matches('#timer-long')){
        clearInterval(idInterval)
        startButton.childNodes[1].innerHTML = 'START'
        root.setProperty('--bg-color','#84b6f4')
        timerNumber.innerHTML = '15:00'
        timerAdvice.innerHTML = 'Time to take a rest!'
        root.setProperty('----button-bg-hover','#84b6f4')
        root.setProperty('--border-bottom-header','#c9daec')


    }
}
function nextTab(){
    for(let tab of [pomoTab,shortTab,longTab]){
            if(tab.parentNode.matches('.timer-pomo-active')){
                tab.parentNode.classList.toggle('timer-pomo-active');
                if((tab.id == 'timer-pomo')){
                    if (pomoCount % 3 == 0 && pomoCount!= 0){
                        applyTabEffects(tab = longTab.parentNode)
                        longTab.parentNode.classList.toggle('timer-pomo-active');
                        pomoCount += 1
                        pomoCounDiv.innerHTML = `#${pomoCount}`
                        break;
                    }else{
                        applyTabEffects(tab = shortTab.parentNode)
                        shortTab.parentNode.classList.toggle('timer-pomo-active');
                        pomoCount += 1
                        pomoCounDiv.innerHTML = `#${pomoCount}`
                        break;
                    }
                    
                }else if((tab.id == 'timer-short')){
                    applyTabEffects(tab = pomoTab.parentNode)
                    pomoTab.parentNode.classList.toggle('timer-pomo-active');
                    break;
                }else if((tab.id == 'timer-long')){
                    applyTabEffects(tab = pomoTab.parentNode)
                    pomoTab.parentNode.classList.toggle('timer-pomo-active');
                    break;
                }
    
        }
    }
    
    startButton.childNodes[1].classList.toggle('start');
    nextButton.style.opacity= '0'


}
function handleChronometer(){
    const timer = document.getElementById('timer-number');
    let initialSeconds = Number.parseInt((timer.textContent.slice(0,2) * 60)) + Number.parseInt(timer.textContent.slice(3,5));
    if (startButton.childNodes[1].classList.contains('start')){
        idInterval = setInterval(()=>{
            initialSeconds -=  1
            let minutes = Math.floor(initialSeconds / 60)
            let seconds = initialSeconds % 60
            timer.innerHTML = `${minutes.toString().split('').length == 1 ? '0'+minutes : minutes}:${seconds.toString().split('').length == 1 ? '0'+seconds : seconds}`
            
            if(timer.textContent == '00:00'){
                nextTab();
            }
        },1000);
        
        startButton.childNodes[1].innerHTML = 'PAUSE'
        startButton.childNodes[1].classList.toggle('start');
        nextButton.style.opacity= '1'
        nextButton.addEventListener('click',nextTab)
    }else{
        clearInterval(idInterval)
        startButton.childNodes[1].innerHTML = 'START'
        startButton.childNodes[1].classList.toggle('start');
        nextButton.style.opacity= '0'
    }
}
function restartPomoCount(){
    confirm('Está seguro que desea reestablecer la cuenta a 0?') == true ? pomoCounDiv.innerHTML = '#0' : null;
    pomoCount = 0
}
function createModalTask(){
    //create modal
    const addingTaskButtonCancel= document.createElement('BUTTON');
    const addingTaskButtonSave= document.createElement('BUTTON');
    const taskContainer = document.getElementById('task-container')
    const addingTaskContainer = document.createElement('DIV');
    const addingTaskInput = document.createElement('INPUT');
    const addingTaskEst = document.createElement('H3');
    const addingTaskEstContainer= document.createElement('DIV');
    const addingTaskEstInput = document.createElement('INPUT')
    const addingTaskEstButtons = document.createElement('DIV')
    const addingTaskEstButtonUp = document.createElement('BUTTON')
    const addingTaskEstButtonUpI = document.createElement('I')
    const addingTaskEstButtonDown = document.createElement('BUTTON')
    const addingTaskEstButtonDownI = document.createElement('I')
    const addingTaskButtons= document.createElement('DIV');
    //add clases
    addingTaskContainer.classList.add('adding-task-container');
    addingTaskInput.classList.add('adding-task-input');
    addingTaskEst.classList.add('adding-task-est');
    addingTaskEstContainer.classList.add('adding-task-est-container');
    addingTaskEstInput.classList.add('adding-task-est-input');
    addingTaskEstButtons.classList.add('adding-task-est-buttons');
    addingTaskEstButtonUp.classList.add('adding-task-est-button-up');
    addingTaskEstButtonUpI.classList.add('fa-solid');
    addingTaskEstButtonUpI.classList.add('fa-circle-chevron-up');
    addingTaskEstButtonDown.classList.add('adding-task-est-button-down');
    addingTaskEstButtonDownI.classList.add('fa-solid');
    addingTaskEstButtonDownI.classList.add('fa-circle-chevron-down');
    addingTaskButtons.classList.add('adding-task-buttons');
    addingTaskButtonCancel.classList.add('adding-task-button-cancel');
    addingTaskButtonSave.classList.add('adding-task-button-save');
    //add atributes
    addingTaskInput.setAttribute('placeHolder','What are you working on?');
    addingTaskInput.setAttribute('maxlength','40');
    addingTaskEstInput.setAttribute('type','number');
    addingTaskEst.innerHTML = 'Est Pomodoros'
    addingTaskEstInput.value = 1;
    addingTaskButtonCancel.innerHTML = 'Cancel'
    addingTaskButtonSave.innerHTML = 'Save'

    //Remove the "add task button"
    const addButton = document.getElementById('task-add-button')
    taskContainer.removeChild(addButton)

    //apend childs
    const fragment = document.createDocumentFragment();
    fragment.appendChild(addingTaskContainer);
    addingTaskContainer.appendChild(addingTaskInput);
    addingTaskContainer.appendChild(addingTaskEst);
    addingTaskContainer.appendChild(addingTaskEstContainer);
    addingTaskContainer.appendChild(addingTaskButtons);

    addingTaskEstContainer.appendChild(addingTaskEstInput);
    addingTaskEstContainer.appendChild(addingTaskEstButtons);

    addingTaskEstButtons.appendChild(addingTaskEstButtonUp)
    addingTaskEstButtons.appendChild(addingTaskEstButtonDown)
    addingTaskEstButtonUp.appendChild(addingTaskEstButtonUpI)
    addingTaskEstButtonDown.appendChild(addingTaskEstButtonDownI)
    addingTaskButtons.appendChild(addingTaskButtonCancel);
    addingTaskButtons.appendChild(addingTaskButtonSave);
    taskContainer.appendChild(fragment);

    
    //add event listeners
    addingTaskEstButtonUp.addEventListener('click',()=>{
        let value = addingTaskEstInput.value
        addingTaskEstInput.value= parseInt(value)+1;
    })
    addingTaskEstButtonDown.addEventListener('click',()=>{
        let value = addingTaskEstInput.value
        addingTaskEstInput.value= value == 0 ? 0: parseInt(value)-1;
    });
        //CANCEL
    addingTaskButtonCancel.addEventListener('click',()=>{
        taskContainer.removeChild(addingTaskContainer)
        taskContainer.appendChild(addButton)

    })
        //SAVE
    addingTaskInput.addEventListener('keypress',(e)=>{
        if(addingTaskInput.value == ''){

        }else{
            if(e.key == 'Enter'){
                addTask(addingTaskInput.value,addingTaskEstInput.value)
                addingTaskInput.value = ''
            }
        }
    })
    addingTaskButtonSave.addEventListener('click',()=>{
        if(addingTaskInput.value == ''){

        }else{
            addTask(addingTaskInput.value,addingTaskEstInput.value)
            addingTaskInput.value = ''
        }
    })
}
function addTask(name, pomos){
    const task = document.createElement('DIV')
    const taskName = document.createElement('P');
    const taskHope = document.createElement('P');
    const trashButton = document.createElement('I');

    task.classList.add('one-task')
    taskName.classList.add('task-name')
    taskHope.classList.add('task-hope')
    trashButton.classList.add('task-trash')
    trashButton.classList.add('fa-solid')
    trashButton.classList.add('fa-trash')
    
    taskName.innerHTML = name;
    taskHope.innerHTML = `0 /${pomos}`

    task.appendChild(taskName)
    task.appendChild(taskHope)
    task.appendChild(trashButton)
    tasksContainer.appendChild(task)
    tasksContainer.style.display='flex'

    trashButton.addEventListener('click',()=>{
        tasksContainer.removeChild(task)
        
    })
}

//runs when started
handleMediaQuery(mediaQuery400)
handleMediaQuery(mediaQuery600)
//Event Listeners
mediaQuery400.addEventListener('change',()=>{handleMediaQuery(mediaQuery400)});
mediaQuery600.addEventListener('change',()=>{handleMediaQuery(mediaQuery600)});
pomoTab.addEventListener('click',changeTab);
shortTab.addEventListener('click',changeTab);
longTab.addEventListener('click',changeTab);
startButton.addEventListener('click',handleChronometer);
pomoCounDiv.addEventListener('click',restartPomoCount);
taskAddButton.addEventListener('click',createModalTask);
