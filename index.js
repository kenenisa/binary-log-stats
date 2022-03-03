// let tab = "graph";

// id("graph").addEventListener("click", () => {
//   resetColor("graph");
// });
// id("logs").addEventListener("click", () => {
//   resetColor("logs");
// });
// id("summary").addEventListener("click", () => {
//   resetColor("summary");
// });
let data = [];

const eighteenHours = 1000 * 60 * 60 * 18;

function id(str) {
    return document.getElementById(str);
}
let shop = 1;

id("dateInput").valueAsDate = new Date();
const timeData = {
    0: "6 AM",
    1: "7",
    2: "8",
    3: "9",
    4: "10",
    5: "11 ",
    6: "12 PM",
    7: "1",
    8: "2",
    9: "3",
    10: "4",
    11: "5",
    12: "6 PM",
    13: "7",
    14: "8",
    15: "9",
    16: "10",
    17: "11",
};
let st = new Date();
let morning = new Date(
    `${st.getMonth() + 1}-${st.getDate()}-${st.getFullYear()} 6:00 AM`
).getTime();

let afternoon = new Date(
    `${st.getMonth() + 1}-${st.getDate()}-${st.getFullYear()} 12:00 PM`
).getTime();
let evening = new Date(
    `${st.getMonth() + 1}-${st.getDate()}-${st.getFullYear()} 6:00 PM`
).getTime();
let night = morning + eighteenHours;
let month = new Date().getMonth();
function calcP(num, reset = true) {
    let xy = (100 * num) / eighteenHours;
    return xy;
}

function renderLogs() {

    id("log-list").innerHTML = "";
    data.forEach((d) => {
        const newLogs = [];
        const logs = d.logs.filter((l) => {
            return (
                l.at > morning && l.at < night && l.out_at && l.shop === shop
            );
        });
        logs.forEach((l) => {
            if (l.at > morning) {
                newLogs.push({ time: l.at, type: "in" });
            }
            if (l.out_at < night) {
                newLogs.push({ time: l.out_at || null, type: "out" });
            }
        });
        function checkMorning() {

            const valueIn = newLogs
                .filter(
                    (l) => l.time > morning && l.time < afternoon && l.type === "in"
                )
                .sort((x, y) => x.time - y.time)[0];
            const valueOut = newLogs
                .filter(
                    (l) =>
                        l.time > morning && l.time < afternoon && l.type === "out"
                )
                .sort((x, y) => y.time - x.time)[0];
            if (valueIn || valueOut) {
                return `<span class="time morning">
          
          
                ${valueIn
                        ? `<span class="${valueIn.type}"> ${toTime(
                            valueIn.time
                        )} </span>`
                        : `<span class="in">6:00 AM</span>`
                    }
                ${valueOut
                        ? `<span class="${valueOut.type}"> ${toTime(
                            valueOut.time
                        )} </span>`
                        : `<span class="out">12:00 PM</span>`
                    }
                </span>
                `;
            } else {
                return "";
            }
        }
        function checkAfternoon() {
            const valueIn = newLogs
                .filter(
                    (l) => l.time > afternoon && l.time < evening && l.type === "in"
                )
                .sort((x, y) => x.time - y.time)[0];
            const valueOut = newLogs
                .filter(
                    (l) =>
                        l.time > afternoon && l.time < evening && l.type === "out"
                )
                .sort((x, y) => y.time - x.time)[0];
            if (valueIn || valueOut) {
                return `<span class="time afternoon">
          
                ${valueIn
                        ? `<span class="${valueIn.type}"> ${toTime(
                            valueIn.time
                        )} </span>`
                        : `<span class="in">12:00 PM</span>`
                    }
                ${valueOut
                        ? `<span class="${valueOut.type}"> ${toTime(
                            valueOut.time
                        )} </span>`
                        : `<span class="out">6:00 PM</span>`
                    }
                </span>
                `;
            } else {
                return "";
            }
        }
        function checkNight() {
            const valueIn = newLogs
                .filter(
                    (l) => l.time > evening && l.time < night && l.type === "in"
                )
                .sort((x, y) => x.time - y.time)[0];
            const valueOut = newLogs
                .filter(
                    (l) => l.time > evening && l.time < night && l.type === "out"
                )
                .sort((x, y) => y.time - x.time)[0];
            if (valueIn || valueOut) {
                return `<span class="time night">
          
          
                ${valueIn
                        ? `<span class="${valueIn.type}"> ${toTime(
                            valueIn.time
                        )} </span>`
                        : `<span class=" in ">6:00 PM</span>`
                    }
                ${valueOut
                        ? `<span class="${valueOut.type}"> ${toTime(
                            valueOut.time
                        )} </span>`
                        : `<span class="out">12:00 AM</span>`
                    }
                
                </span >
                `;
            } else {
                return "";
            }
        }
        id("log-list").innerHTML += `
                <div div class="item" >
                    <span class="name">${d.user.name}</span>
            ${checkMorning()}
            ${checkAfternoon()}
            ${checkNight()}
        </div > `;
    });
}

function renderSummary() {
    let total = 0;

    id("summary-list").innerHTML = "";
    data.forEach((d) => {
        d.logs
            .filter(
                (l) =>
                    !!l.out_at &&
                    getMonth(l.out_at) === month &&
                    getMonth(l.at) === month &&
                    l.shop === shop
            )
            .forEach((l) => {
                const diff = l.out_at - l.at;
                total += diff;
            });
    });
    data.forEach((d) => {
        let tot = 0;
        d.logs
            .filter(
                (l) =>
                    !!l.out_at &&
                    getMonth(l.out_at) === month &&
                    getMonth(l.at) === month &&
                    l.shop === shop
            )
            .forEach((l) => {
                const diff = l.out_at - l.at;
                tot += diff;
            });
        function calcShare() {
            if (total) {
                return Math.round((100 * tot) / total);
            }
            return 0;
        }
        id("summary-list").innerHTML += `<div div class="item" >
          <span>${d.user.name}</span>
          <span>${parseTime(tot)}</span>
          <span>${calcShare()}%</span>
        </div > `;
    });
    id("total-hours").innerHTML = parseTime(total);
}
let mouse = { x: 0, y: 0 }
window.onmousemove = (e, f) => {
    mouse = { y: e.y }
}
function mouseEnter(e, i) {
    e.children[0].style.top = mouse.y + '%'
    e.children[0].style.display = 'block'
}
function mouseLeave(e, i) {
    e.children[0].style.display = 'none'
}
let windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;
const boxWidth = id('hover').clientWidth;
const boxLeft = windowWidth - boxWidth

window.addEventListener('resize',()=>{
    windowWidth = window.innerWidth
})
let hovering = false
const MoriningTimeMs = new Date(
    `${st.getMonth() + 1}-${st.getDate()}-${st.getFullYear()} 6:00 AM`
).getTime()
id('hover').addEventListener('mousemove', (e) => {
    if (hovering) {
        const formattedTime = formatAmPm(new Date(MoriningTimeMs + ((((e.clientX - 97) * 100) / (windowWidth - 113)) / 0.0925925926) * 60 * 1000))
        id('dx').style.left = (e.clientX - 97) + 'px'
        if(id('dx').children[0]){
            id('dx').children[0].innerHTML = formattedTime
            id('dx').children[0].style.top = (mouse.y - 25) + 'px'
        }
    }
})
id('hover').addEventListener('mouseenter', (e) => {
    hovering = true;
    id("dx").innerHTML = `<span></span>`
})
id('hover').addEventListener('mouseleave', (e) => {
    id("dx").innerHTML = ``
    hovering = false;

})
function render() {
    id("data").innerHTML = '';
    id('shop-1-online').innerHTML = ''
    id('shop-2-online').innerHTML = ''
    id('shop-3-online').innerHTML = ''
    renderLogs();
    renderSummary();
    if (thisMorning()) {
        id('now').style.left = `${calcP(new Date().getTime() - morning)}% `;
        setInterval(() => {
            id('now-time').innerHTML = formatAmPm(new Date(), true);
        }, 1000)
    }
    data.forEach((d) => {
        const user = d.user;
        if (d.user.online) {
            id('online').style.display = 'block';
            id(`shop${user.shop ? user.shop.loc : '1'}-stat`).innerHTML = 'online';
            id(`shop${user.shop ? user.shop.loc : '1'}-stat`).className = 'stat';
            id(`shop-${user.shop ? user.shop.loc : '1'}-online`).innerHTML += ` <div class="user">
            <span class="name">${user.name}</span>
            <span class="time">${parseTime(new Date().getTime() - user.shop.time, true)}</span>
          </div>`
        }
        const logs = d.logs.filter((l) => {
            return (
                (l.at > morning || l.at < night) && l.shop === shop
            );
        });
        id("data").innerHTML += `
                <div div class="item" >
                    <div class="name">${d.user.name
            }<span style="background:${StringToColor(
                d.user.name
            )}">.</span></div>
            ${logs
                .map((log) => {
                    const shade = !!log.out_at;
                    const out_at = log.out_at || new Date().getTime();
                    return `<div class="measure" style="left:${calcP(
                        log.at - morning
                    )}%;width:${calcP(out_at - log.at)
                        //  + calcP(log.at - morning, false)
                        }%;background:${StringToColor(
                            d.user.name, shade
                        )}" title="In: ${toTime(log.at)}\nOut: ${toTime(
                            out_at
                        )}\nDuration: ~${parseTime(out_at - log.at)}"></div>`;

                })
                .toString()
                .replace(/,/g, "")
            }
          </div > `;
    });
}
id("dateInput").addEventListener("change", (e) => {
    st = new Date(e.target.value);
    const selected = e.target.value
    morning = new Date(`${selected} 6: 00 AM`).getTime();
    afternoon = new Date(`${selected} 12: 00 PM`).getTime();
    evening = new Date(`${selected} 6: 00 PM`).getTime();
    night = morning + eighteenHours;
    month = st.getMonth();
    render();
    id('now').style.display = thisMorning() ? 'block' : 'none'
});
id("shopInput").addEventListener("change", (e) => {
    shop = Number(e.target.value);
    render();
});
for (let i = 0; i < 18; i++) {
    id("ruler").innerHTML += `<span class="tick" style = "left:${5.555 * i
        }% ">${timeData[i] ? `<i>${timeData[i]}</i>` : ""}</span>`;
}


//
fetch("https://infinite-wave-33038.herokuapp.com/data")
// fetch("http://localhost:5000/data")
    .then((e) => e.json())
    .then((val) => {
        val.sort((x, y) => x.user.id - y.user.id)

        data = val;
        render();

        setInterval(() => {
            render();
        }, 1000 * 60)
        id("loader").style = "display:none"
        id('content').style = "display:block";

    });