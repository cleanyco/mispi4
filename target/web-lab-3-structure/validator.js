let point = {
    x: undefined,
    y: undefined,
    r: undefined
}

let lastR = undefined;

$(document).ready(function () {
    drawChart()
    $('.submit').on('click', function(e) {
        e.preventDefault();

        point.x = $('.x-value').val().replace(",", ".").trim();
        point.y = $('#coordinates-form\\:y-value').val().replace(",", ".").trim();

        $("#message").text("");

        // if (validateX() && validateY() && validateR()) {
            document.getElementById('form_hidden:x_hidden').value = point.x;
            document.getElementById('form_hidden:y_hidden').value = point.y;
            document.getElementById('form_hidden:r_hidden').value = point.r;
            document.getElementById('form_hidden:button_hidden').click();
        // }
    })
})

// function validateX() {
//     if (   (point.x == null)
//         || (point.x === "")
//         || (parseFloat(point.x) <= -5)
//         || (parseFloat(point.x) >= 5)
//         || (!Number.isFinite(parseFloat(point.x)))   ) {
//         sendMessage("X некорректен");
//         return false;
//     } else {
//         return true;
//     }
// }

// function validateY() {
//     const startsWithZero = new RegExp("^0+\\d+$");
//     const startsWithZeroFloat = new RegExp("^0+\\d+\\.\d*$");
//     const numberSystems = new RegExp("(0x|0o|0b)\d*")
//
//     if (   (point.y === undefined)
//         || (point.y === null)
//         || (point.y == "")    ) {
//         sendMessage("Y не был введён")
//         return false;
//     }
//
//     else if (   (point.y.length > 12)
//         || (startsWithZero.test(point.y))
//         || (numberSystems.test(point.y))
//         //fixme исправить позже
//         || (startsWithZeroFloat.test(point.y))
//         || (parseFloat(point.y) <= -3)
//         || (parseFloat(point.y) >= 3)
//         || !Number.isFinite(parseFloat(point.y))   ) {
//         sendMessage("Y некорректен");
//         return false;
//     } else {
//         return true;
//     }
// }

// function validateR() {
//     if ((point.r === undefined) || (point.r == null)) {
//         sendMessage("R не был выбран");
//         return false;
//     } else {
//         if (point.r !== lastR) {
//             clearCanvas()
//             lastR = point.r;
//             return true;
//         } else {
//             lastR = point.r;
//             return true;
//         }
//     }
//  }

function confirmRadius(r) {
    point.r = r;

    let currentR = document.getElementById("current_r");
    currentR.innerText = 'Текущий радиус: ' + r;
    clearCanvas()
    drawPreviousHits(r)
}

function sendMessage(message) {
    $("#message").text(message);
}