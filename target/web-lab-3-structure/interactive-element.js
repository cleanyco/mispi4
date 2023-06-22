let canvas = document.getElementById("chart");
let chart = canvas.getContext('2d');

canvas.addEventListener("mousedown", function (e) {
    getMousePosition(canvas, e);
})

let previousR = undefined;

function getMousePosition(canvas, event) {
    let rect = canvas.getBoundingClientRect();

    let x = event.clientX - rect.left - canvas.width / 2;
    let y = event.clientY - rect.top - canvas.height / 2;
    let R = switchRadius();

    if (R == null) {
        $('#message').text("Нет информации о радиусе, невозможно определить координаты по графику");
    } else if (R < 1 || R > 3) {
        $('#message').text("Радиус не входит в заданный диапазон");
    } else {
        let rateX = (x * R) / 180;
        let rateY = (y * R) / 180;
        sendAndDrawHit(rateX, -rateY, R)
    }
}
//необходимо для передачи информации в processorBean
function sendAndDrawHit(x, y, R) {
    $('#message').text("");
    document.getElementById('form_hidden:x_hidden').value = x.toFixed(5);
    document.getElementById('form_hidden:y_hidden').value = y.toFixed(5);
    document.getElementById('form_hidden:r_hidden').value = R;
    document.getElementById('form_hidden:button_hidden').click();
}

function drawHit() {
    let offsetX = canvas.width / 2 - 1;
    let offsetY = canvas.height / 2 - 1;

    let x = document.getElementById('form_hidden:x_hidden').value;
    let y = document.getElementById('form_hidden:y_hidden').value;
    let r = document.getElementById('form_hidden:r_hidden').value;

    let table = document.getElementById("result-table");

    let hit = table.rows[1].cells[4].innerText;

    if (hit === "Hit") {
        chart.fillStyle = 'green';
    } else {
        chart.fillStyle = 'red';
    }

    let rateX = (x/r) * 180;
    let rateY = (y/r) * 180;

    chart.beginPath();
    chart.arc(rateX+offsetX,offsetY-rateY, 3, 0, 2*Math.PI);
    chart.fill();
}

function drawPreviousHit(x, y, r) {
    let offsetX = canvas.width / 2 - 1;
    let offsetY = canvas.height / 2 - 1;

    let rateX = (x/r) * 180;
    let rateY = (y/r) * 180;

    chart.beginPath();
    chart.arc(rateX+offsetX,offsetY-rateY, 3, 0, 2*Math.PI);
    chart.fill();
}

function drawPreviousHits(R) {
    let offsetX = canvas.width / 2 - 1;
    let offsetY = canvas.height / 2 - 1;

    let table = document.getElementById("result-table");

    for (let row of table.rows) {
        if (R == parseFloat(row.cells[3].innerText)) {
            let hit = row.cells[4].innerText;
            if (hit === "Hit") {
                chart.fillStyle = 'green';
            } else {
                chart.fillStyle = 'red';
            }

            let rateX = (parseFloat(row.cells[1].innerText)/R) * 180;
            let rateY = (parseFloat(row.cells[2].innerText)/R) * 180;

            chart.beginPath();
            chart.arc(rateX+offsetX,offsetY-rateY, 3, 0, 2*Math.PI);
            chart.fill();
        }
    }
}

function clearCanvas() {
    chart.clearRect(0, 0, canvas.width, canvas.height)
}

function getR() {
    return lastR;
}

function switchRadius() {
    return getR();
}