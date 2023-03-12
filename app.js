

// Variables
let mediaQuery400 = window.matchMedia("(min-width: 400px)");
let mediaQuery600 = window.matchMedia("(min-width: 600px)");


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
//Event Listeners
mediaQuery400.addEventListener('change',()=>{handleMediaQuery(mediaQuery400)});
mediaQuery600.addEventListener('change',()=>{handleMediaQuery(mediaQuery600)});

//
handleMediaQuery(mediaQuery400)
handleMediaQuery(mediaQuery600)

