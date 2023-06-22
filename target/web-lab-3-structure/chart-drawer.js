let canvasInner = document.getElementById('chartDrawer')
let drawer = canvasInner.getContext('2d')

function drawChart() {
    //левый прямоугольник
    drawer.beginPath()
    drawer.rect(20,110, 180, 90)
    drawer.fillStyle = "#EB5E55"
    drawer.stroke()
    drawer.fill()
    drawer.closePath()
    //четверть круга
    drawer.beginPath()
    drawer.arc(200, 200, 180, -Math.PI/2, 0)
    drawer.stroke()
    drawer.fill()
    drawer.closePath()
    drawer.moveTo(200, 200)
    drawer.lineTo(380, 200)
    drawer.lineTo(200, 20)
    drawer.lineTo(200, 200)
    drawer.stroke()
    drawer.fill()
    drawer.closePath()
    //треугольник в четвертой четверти
    drawer.beginPath()
    drawer.moveTo(200,200)
    drawer.lineTo(200, 290)
    drawer.lineTo(290, 200)
    drawer.stroke()
    drawer.fill()
    drawer.closePath()

    //координатные оси
    drawer.moveTo(200, 0)
    drawer.lineTo(200, 400)
    drawer.moveTo(0,200)
    drawer.lineTo(400, 200)
    //стрелка на координатной оси х
    drawer.moveTo(400, 200)
    drawer.lineTo(395, 195)
    drawer.moveTo(400, 200)
    drawer.lineTo(395, 205)
    //подпись координатной оси х
    drawer.font = "15px Roboto"
    drawer.fillText("X", 390, 180)
    //стрелка на координатной оси y
    drawer.moveTo(200, 0)
    drawer.lineTo(195, 5)
    drawer.moveTo(200, 0)
    drawer.lineTo(205, 5)
    //подпись координатной оси y
    drawer.fillText("Y", 210, 10)
    //черточки на положительной части оси х
    drawer.moveTo(290, 195)
    drawer.lineTo(290, 205)
    drawer.moveTo(380, 195)
    drawer.lineTo(380, 205)
    //черточки на отрицательной части оси х
    drawer.moveTo(110, 195)
    drawer.lineTo(110, 205)
    drawer.moveTo(20, 195)
    drawer.lineTo(20, 205)
    //черточки на отрицательной части оси y
    drawer.moveTo(195, 290)
    drawer.lineTo(205, 290)
    drawer.moveTo(195, 380)
    drawer.lineTo(205, 380)
    //черточки на положительной части оси y
    drawer.moveTo(195, 110)
    drawer.lineTo(205, 110)
    drawer.moveTo(195, 20)
    drawer.lineTo(205, 20)
    drawer.stroke()
    drawer.closePath()

    //подписи радиусов на оси x
    drawer.fillStyle = "#000"
    drawer.fillText("R/2", 290, 220)
    drawer.fillText("R", 380, 220)
    drawer.fillText("-R/2", 110, 220)
    drawer.fillText("-R", 20, 220)

    //подписи радиусов на оси y
    drawer.fillText("R/2", 170, 110)
    drawer.fillText("R", 170, 20)
    drawer.fillText("R/2", 170, 290)
    drawer.fillText("R", 170, 380)

}