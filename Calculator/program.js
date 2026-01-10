let button = document.getElementById('button');
let input1 = document.getElementById('input1');
let input2 = document.getElementById('input2');
let tasks = document.getElementById('tasks');
let cal = document.getElementById('calculate');
let cleardata = document.getElementById('cleardata');

button.addEventListener('click', function() {
    changeTask(this.form)
});
input1.addEventListener('focus', function() {
    removeError(input1)
});
input2.addEventListener('click', function() {
    removeError(input2)
});

tasks.addEventListener('click', function() {
    removeError(incorrectCheckbox)
});
cal.addEventListener('click', function() {
    calculate(this.form)
});
cleardata.addEventListener('click', function() {
    clearData(this.form)
});


function removeError(data) {
    (data.id != 'incorrectCheckbox') ? data.classList.remove('error') : data.classList.remove('text_error')
}

function clearData(data) {
    data.elements["input1"].value = "";
    data.elements["input2"].value = "";
    document.getElementById('output').innerHTML = ""

    let tasksOptions = data.elements["tasks"].options;
    for (let i = 0; i < tasksOptions.length; i++) {
        tasksOptions[i].selected = false;
    }
}

function changeTask(data) {
    let img = document.getElementsByTagName('img')[0]
    let n = data.triangle.selectedIndex
    let angle = document.getElementsByName('angle')[0];
    if (data.triangle.options[n].text == 'Катет и противолежащий угол') {
        img.src = 'triangle_opposite.jpeg'
        angle.textContent  = "α =";
    }
    if (data.triangle.options[n].text == 'Катет и прилежащий к нему угол') {
        img.src = 'triangle_adjacent.jpeg'
        angle.textContent  = "β =";
    }
}

function calculate(data) {
    let a = +data.input1.value;
    let angle = +data.input2.value;

    let tasksOptions = data.elements["tasks"].options;
    let tasks = Array.from(tasksOptions).map((elem) => elem.selected)

    let incorrectInput = true
    if (Number(a) <= 0 || isNaN(a)) {
        data.input1.classList.add("error");
        incorrectInput = false;
    }
    if ((Number(angle) <= 0 || Number(angle) >= 90) || isNaN(angle)) {
        data.input2.classList.add("error");
        incorrectInput = false;
    }
    if (tasks.indexOf(true) == -1) {
        let checkbox = document.getElementById('incorrectCheckbox');
        checkbox.classList.add("text_error");
        incorrectInput = false;
    }
    if (!incorrectInput) return false


    let output = document.getElementById('output');
    output.innerHTML = "<p>Результат:</p>";

    let n = data.triangle.selectedIndex
    let whatAngle = data.triangle.options[n].text
    let c = (whatAngle == 'Катет и противолежащий угол') ? hipoByOppositeAngle(a, angle) : hipoByAdjacentAngle(a, angle)
    let b = round(Math.sqrt(c**2 - a**2))
    
    if (tasks[0]) {
        let newElement1 = document.createElement('p');
        newElement1.innerHTML = `Медиана из угла α = ${medianA(a, b, c)}, медиана из угла β = ${medianB(a, b, c)}, медиана из угла γ = ${medianC(a, b, c)}`;
        output.appendChild(newElement1);
    }
    if (tasks[1]) {
        let newElement2 = document.createElement('p');
        newElement2.innerHTML = `Гипотенуза = ${c}, b = ${b}`;
        output.appendChild(newElement2);
    }
    if (tasks[2]) {
        let newElement3 = document.createElement('p');
        newElement3.innerHTML = `Радиус вписанной окружности = ${inscripedCircleRadius(a, b, c)}`;
        output.appendChild(newElement3);
    }

    return true;
}

function medianA(a, b, c) {return round(0.5*Math.sqrt(2*c**2 + 2*b**2 - a**2))}
function medianB(a, b, c) {return round(0.5*Math.sqrt(2*c**2 + 2*a**2 - b**2))}
function medianC(a, b, c) {return round(0.5*Math.sqrt(2*a**2 + 2*b**2 - c**2))}
function inscripedCircleRadius(a, b, c) {return round((a + b - c) / 2)}
function hipoByAdjacentAngle (a, angle) {return round(a / Math.cos(radians(angle)))}
function hipoByOppositeAngle (a, angle) {return round(a / Math.sin(radians(angle)))}
function radians(degrees) {return degrees * (Math.PI / 180)}
function round(n) {return Math.round(n * 1000) / 1000}