function parseTime(ms, short = false) {
    if (short) {
        if (ms > 1000 * 60 * 60) {
            const h = Math.floor(ms / (1000 * 60 * 60));
            return h + (h > 1 ? 'hrs' : 'hr')
        } else if (ms > 1000 * 60) { //minutes
            const h = Math.floor(ms / (1000 * 60));
            return h + (h > 1 ? 'mins' : 'min')
        } else if (ms > 1000) {
            const h = Math.floor(ms / (1000));
            return h + (h > 1 ? 'secs' : 'sec')
        }
    } else {
        if (ms > 1000 * 60 * 60) {
            const h = Math.floor(ms / (1000 * 60 * 60));
            return h + (h > 1 ? ' Hours' : ' Hour')
        } else if (ms > 1000 * 60) { //minutes
            const h = Math.floor(ms / (1000 * 60));
            return h + (h > 1 ? ' Minutes' : ' Minute')
        } else if (ms > 1000) {
            const h = Math.floor(ms / (1000));
            return h + (h > 1 ? ' Seconds' : ' Second')
        }
    }
    return ms + ' ms'
}

function tConvert(time) {
    // Check correct time format and split into components
    time = time
        .toString()
        .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) {
        time = time.slice(1);
        time[5] = +time[0] < 12 ? " AM" : " PM"; 
        time[0] = +time[0] % 12 || 12; 
    }
    return time.join(""); 
}
function getTime(str) {
    str = str
        .toString()
        .split(" ")
        .filter((s) => s.search(":") + 1);
    return tConvert(str[0].slice(0, -3));
}
function toTime(num) {
    if(num === null) return 'Present';
    return getTime(new Date(Number(num)));
}
function getMonth(time) {
    return new Date(Number(time)).getMonth();
}
function thisMorning(){
    const st = new Date();
    const then = new Date(
        `${st.getMonth() + 1}-${st.getDate()}-${st.getFullYear()} 6:00 AM`
    ).getTime();
    return morning == then;
}

function formatAmPm (date,s=false) {
    let hours = date.getHours();
    let minutes = date.getMinutes();    
    let seconds = date.getSeconds();    
    const amPm = hours >= 12 ? 'pm' : 'am';
  
    hours %= 12;
    hours = hours || 12;    
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    seconds = seconds < 10 ? `0${seconds}` : seconds;

    const strTime = `${hours}:${minutes}${s?':' + seconds:''} ${amPm}`;
  
    return strTime;
  };