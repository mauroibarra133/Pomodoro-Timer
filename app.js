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
let idInterval;

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
    if(e.target.tagName == 'H2'){
        target = e.target.parentNode;
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
        backgroundPage.style.backgroundColor='#31834f';
        timerNumber.innerHTML = '05:00'
        timerAdvice.innerHTML = 'Time to take a break!'
        root.setProperty('----button-bg-hover','#31834f')
        root.setProperty('--border-bottom-header','#c9ecd6')


    }else if(target.childNodes[0].matches('#timer-pomo')){
        clearInterval(idInterval)
        startButton.childNodes[1].innerHTML = 'START'
        backgroundPage.style.backgroundColor='#ba4949';
        timerNumber.innerHTML = '25:00'
        timerAdvice.innerHTML = 'Time to focus!'
        root.setProperty('----button-bg-hover','#ba4949')
        root.setProperty('--border-bottom-header','#ecc9c9')

    }else if(target.childNodes[0].matches('#timer-long')){
        clearInterval(idInterval)
        startButton.childNodes[1].innerHTML = 'START'
        backgroundPage.style.backgroundColor='#84b6f4';
        timerNumber.innerHTML = '15:00'
        timerAdvice.innerHTML = 'Time to take a rest!'
        root.setProperty('----button-bg-hover','#84b6f4')
        root.setProperty('--border-bottom-header','#c9daec')


    }
}

function handleChronometer(){
    const timer = document.getElementById('timer-number');
    let initialSeconds = Number.parseInt(timer.textContent.slice(0,2)) * 60;
    if (startButton.childNodes[1].innerHTML == 'START'){
        idInterval =setInterval(()=>{
            initialSeconds -=  1
            let minutes = Math.floor(initialSeconds / 60)
            let seconds = initialSeconds % 60
            console.log();
            timer.innerHTML = `${minutes.toString().split('').length == 1 ? '0'+minutes : minutes}:${seconds.toString().split('').length == 1 ? '0'+seconds : seconds}`
        },1000)
        
        startButton.childNodes[1].innerHTML = 'PAUSE'
    }else{
        clearInterval(idInterval)
        startButton.childNodes[1].innerHTML = 'START'
    }
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
startButton.addEventListener('click',handleChronometer)


