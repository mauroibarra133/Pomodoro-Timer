"use strict";

// mediaQueries
let mediaQuery400 = window.matchMedia("(min-width: 400px)");
let mediaQuery600 = window.matchMedia("(min-width: 600px)");
//Tabs
const pomoTab = document.getElementById('timer-pomo');
const shortTab = document.getElementById('timer-short');
const longTab = document.getElementById('timer-long');
//Timer
const startButton = document.getElementById('timer-button')
const timerNumber = document.getElementById('timer-number')
//Interval timer's ID
let idInterval;
//Counter of the pomo number
let pomoCount = 0;
const pomoCounDiv = document.getElementById('info-pomo-count');
//Tasks
const tasksContainer = document.getElementById('tasks-container')
let taskHope = document.querySelector('.task-hope')
let taskHopeCount = 0;
//Buttons
const taskAddButton = document.getElementById('task-add-button')
const nextButton = document.getElementById('timer-next-button');
//config
const settingButton = document.getElementById('settings-button');
const OKsettingButton = document.getElementById('ok-settings');
let pomoValue = 25;
let shortValue = 5;
let longValue = 15;
let intervalValue = 3;
//report
const reportButton= document.getElementById('report-button');

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

    //return the div
    while(target.tagName == 'FONT'){
        target = target.parentNode;
    }
    if(target.tagName == 'H2'){
        target = target.parentNode;
    }
    //Change the active tab
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
    const timerAdvice = document.getElementById('timer-advice')
    const root = document.documentElement.style;

    //Short tab
    if(target.childNodes[0].matches('#timer-short')){
        clearInterval(idInterval)
        startButton.childNodes[1].innerHTML = 'START'
        root.setProperty('--bg-color','#31834f')
        timerNumber.innerHTML = shortValue.toString().length == 1 ? `0${shortValue}:00` : `${shortValue}:00`
        timerAdvice.innerHTML = 'Time to take a break!'
        root.setProperty('----button-bg-hover','#31834f')
        root.setProperty('--border-bottom-header','#c9ecd6')

    //Pomo tab
    }else if(target.childNodes[0].matches('#timer-pomo')){
        clearInterval(idInterval)
        startButton.childNodes[1].innerHTML = 'START'
        root.setProperty('--bg-color','#ba4949')
        timerNumber.innerHTML = pomoValue.toString().length == 1 ? `0${pomoValue}:00` : `${pomoValue}:00`
        timerAdvice.innerHTML = 'Time to focus!'
        root.setProperty('----button-bg-hover','#ba4949')
        root.setProperty('--border-bottom-header','#ecc9c9')
    
    //Long tab
    }else if(target.childNodes[0].matches('#timer-long')){
        clearInterval(idInterval)
        startButton.childNodes[1].innerHTML = 'START'
        root.setProperty('--bg-color','#84b6f4')
        timerNumber.innerHTML = longValue.toString().length == 1 ? `0${longValue}:00` : `${longValue}:00`
        timerAdvice.innerHTML = 'Time to take a rest!'
        root.setProperty('----button-bg-hover','#84b6f4')
        root.setProperty('--border-bottom-header','#c9daec')
    }
}

function nextTab(){

    for(let tab of [pomoTab,shortTab,longTab]){
            //Change the active tab
            if(tab.parentNode.matches('.timer-pomo-active')){
                tab.parentNode.classList.toggle('timer-pomo-active');

                //if pomo's tab is active, and exist a added task, increment the hopeCount
                if((tab.id == 'timer-pomo')){
                    taskHope = document.querySelector('.task-hope')
                    if(taskHope!= null){
                        taskHopeCount++;
                        taskHope.innerHTML = `${taskHopeCount} /${taskHope.textContent[3]}`

                    }
                    // If i did 3 pomodoros, it`s turn to go to the long tab
                    if (pomoCount % intervalValue == 0 && pomoCount!= 0){
                        applyTabEffects(tab = longTab.parentNode)
                        longTab.parentNode.classList.toggle('timer-pomo-active');
                        pomoCount += 1
                        pomoCounDiv.innerHTML = `#${pomoCount}`
                        break;
                    // If i did less than 3 pomodoros, it`s turn to go to the short tab
                    }else{
                        applyTabEffects(tab = shortTab.parentNode)
                        shortTab.parentNode.classList.toggle('timer-pomo-active');
                        pomoCount += 1
                        pomoCounDiv.innerHTML = `#${pomoCount}`
                        break;
                    }
                // if short tab is active, go to pomo tab 
                }else if((tab.id == 'timer-short')){
                    applyTabEffects(tab = pomoTab.parentNode)
                    pomoTab.parentNode.classList.toggle('timer-pomo-active');
                    break;
                // if long tab is active, go to pomo tab 
                }else if((tab.id == 'timer-long')){
                    applyTabEffects(tab = pomoTab.parentNode)
                    pomoTab.parentNode.classList.toggle('timer-pomo-active');
                    break;
                }
    
        }
    }
    // When we change the tab, the button has to be in "start" status
    startButton.childNodes[1].classList.toggle('start'); 
    nextButton.style.opacity= '0'


}
function handleChronometer(){
    const timer = document.getElementById('timer-number');

    //get the amount of seconds
    let initialSeconds = Number.parseInt((timer.textContent.slice(0,2) * 60)) + Number.parseInt(timer.textContent.slice(3,5));

    //Run the clock when the button is in "start" mode
    if (startButton.childNodes[1].classList.contains('start')){
        idInterval = setInterval(()=>{
            initialSeconds -=  1
            let minutes = Math.floor(initialSeconds / 60)
            let seconds = initialSeconds % 60
            //This makes that the client can´t click anumber under 0
            timer.innerHTML = `${minutes.toString().split('').length == 1 ? '0'+minutes : minutes}:${seconds.toString().split('').length == 1 ? '0'+seconds : seconds}`
            
            // if the clock get to 00:00, change the tab
            if(timer.textContent == '00:00'){
                nextTab();
            }
        },1000);
        
        //Change from "start" mode to "pause" mode
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
    //add classes
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

    //append childs
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

    });
        //SAVE
    addingTaskInput.addEventListener('keypress',(e)=>{
        if(addingTaskInput.value == ''){
        }else{
            //add a task with the Enter key
            if(e.key == 'Enter'){
                addTask(addingTaskInput.value,addingTaskEstInput.value)
                addingTaskInput.value = ''
            }
        }
    });
    addingTaskButtonSave.addEventListener('click',()=>{
        if(addingTaskInput.value == ''){

        }else{
            addTask(addingTaskInput.value,addingTaskEstInput.value)
            addingTaskInput.value = ''
        }
    });
}
function addTask(name, pomos){
    //create the task
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

    //show the task
    tasksContainer.appendChild(task)
    tasksContainer.style.display='flex'

    //activate the trash button
    trashButton.addEventListener('click',()=>{
        tasksContainer.removeChild(task)
        taskHopeCount= 0;
        
    })
}
function showSettings(){
    settingButton.classList.toggle('setting-active');
    const settingsCruz = document.querySelector('.settings-header-cruz');
    const settings = document.querySelector('.settings');
    const options = document.querySelector('.options');
    const report = document.querySelector('.report');

    if(settingButton.classList.contains('setting-active')){
        options.style.height = '100vh';
        body.style.overflow = 'hidden';
        settings.style.transform = "translateY(35%)"
    }
    settingsCruz.addEventListener('click',()=>{
        settingButton.classList.toggle('setting-active');
        options.style.height = '0vh';
        body.style.overflow = 'scroll';
        settings.style.transform = "translateY(-200%)"

    });
    options.addEventListener('click',(e)=>{
        if(e.target.classList.contains('options')){
            settingButton.classList.toggle('setting-active');
            options.style.height = '0vh';
            body.style.overflow = 'scroll';
            settings.style.transform = "translateY(-200%)"
        }

    });
    OKsettingButton.addEventListener('click',()=>{

        pomoValue = document.getElementById('pomo-value').value
        shortValue = document.getElementById('short-value').value
        longValue = document.getElementById('long-value').value
        intervalValue = document.getElementById('interval-value').value

        settingButton.classList.toggle('setting-active');
        options.style.height = '0vh';
        settings.style.transform = "translateY(-200%)"

        for(let tab of [pomoTab,shortTab,longTab]){
            //Change the number
            if(tab.parentNode.matches('.timer-pomo-active')){
                if((tab.id == 'timer-pomo')){
                    timerNumber.innerHTML = pomoValue.toString().length == 1 ? `0${pomoValue}:00` : `${pomoValue}:00`
                }else if(tab.id == 'timer-short'){
                    timerNumber.innerHTML = shortValue.toString().length == 1 ? `0${shortValue}:00` : `${shortValue}:00`
                }else if(tab.id == 'timer-long'){
                    timerNumber.innerHTML = longValue.toString().length == 1 ? `0${longValue}:00` : `${longValue}:00`
                }
            }
        }

    });

}
function showreports(){
    reportButton.classList.toggle('report-active');
    const reportCruz = document.querySelector('.report-header-cruz');
    const report = document.querySelector('.report');
    const options = document.querySelector('.options');
    const reportClose = document.querySelector('.report-button')

    if(reportButton.classList.contains('report-active')){
        options.style.height = '100vh';
        report.style.transform = "translateY(15%)";
        body.style.overflow = 'hidden';
    }
    reportCruz.addEventListener('click',()=>{
        reportButton.classList.toggle('report-active');
        options.style.height = '0vh';
        report.style.transform = "translateY(-200%)"
        body.style.overflow = 'scroll';

    });
    options.addEventListener('click',(e)=>{
        if(e.target.classList.contains('options')){
            reportButton.classList.toggle('setting-active');
            options.style.height = '0vh';
            report.style.transform = "translateY(-200%)";
            body.style.overflow = 'scroll';
        }
    });
    reportClose.addEventListener('click',()=>{
        reportButton.classList.toggle('setting-active');
        options.style.height = '0vh';
        report.style.transform = "translateY(-200%)";
        body.style.overflow = 'scroll';
    })
}
//runs when started
handleMediaQuery(mediaQuery400)
handleMediaQuery(mediaQuery600)
//Event Listeners
mediaQuery400.addEventListener('change',()=>{handleMediaQuery(mediaQuery400)});
mediaQuery600.addEventListener('change',()=>{handleMediaQuery(mediaQuery600)});
    //tabs
pomoTab.addEventListener('click',changeTab);
shortTab.addEventListener('click',changeTab);
longTab.addEventListener('click',changeTab);
    //buttons
startButton.addEventListener('click',handleChronometer);
taskAddButton.addEventListener('click',createModalTask);
    //counter
pomoCounDiv.addEventListener('click',restartPomoCount);
    //config
settingButton.addEventListener('click',showSettings)
reportButton.addEventListener('click',showreports)

const elementsWithTabIndex = document.querySelectorAll('[tabindex]');

elementsWithTabIndex.forEach(function(element) {
    element.removeAttribute('tabindex');
});