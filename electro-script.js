$(document).ready(function(){
    checkInterval();
    window.setInterval(function(){
        checkInterval();
    }, 3000);
});

function setIcon(name) {
    console.log('Setting icon: ' + name);
    $('link[rel="icon"]').attr('href', name);
}

function setBoxData(boxId, textId, text, color) {
    $('#'+boxId).css('background-color', color);
    $('#'+textId).text(text);
}

function resolveCurrentPeriod() {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const hour = today.getHours();
    const period = periodsData[dayOfWeek][hour];
    console.log('Day of week: ' + dayOfWeek + ' hour: ' + hour + ' electricity: ' + period);
    setIcon(iconsMap[period])

    setBoxData('current-period-container', 'current-period-message', 'Currently: ' + periodMessages[period], periodColors[period]);
}

function resolveNextPeriod() {
    const today = new Date();
    const currentDay = today.getDay();
    const currentHour = today.getHours();
    const currentMinutes = today.getMinutes();
    const currentPeriod = periodsData[currentDay][currentHour];
    let nextDay = currentDay;
    let nextHour = currentHour;
    let nextPeriod = currentPeriod;
    let hoursToNextPeriod = 0;
    const minutesToNextPeriod = 60 - currentMinutes;
    while(nextPeriod === currentPeriod) {
        hoursToNextPeriod++;
        nextHour++;
        if(nextHour > 23) {
            nextDay++
            nextHour = 0;
            if(nextDay > 6) {
                nextDay = 0;
            }
        }
        nextPeriod = periodsData[nextDay][nextHour];
    }
    hoursToNextPeriod--;
    console.log('Next Period Hour: ' + nextHour);
    console.log('Next Period: ' + nextPeriod);
    setBoxData(
        'next-period-container',
        'next-period-message',
        'Next: '+ periodMessages[nextPeriod] + ' in ' + hoursToNextPeriod + ' hour ' + minutesToNextPeriod + ' minutes',
        periodColors[nextPeriod]);
}

function checkInterval() {
    console.log("Checking...");
    resolveCurrentPeriod();
    resolveNextPeriod();
}
