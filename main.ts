bluetooth.onBluetoothConnected(function () {
    basic.showIcon(IconNames.Duck)
})
function All_Systems_Woah () {
    wuKong.setAllMotor(-25, -25)
    basic.pause(500)
    wuKong.setMotorSpeed(wuKong.MotorList.M2, 100)
    basic.pause(500)
}
input.onButtonPressed(Button.A, function () {
    robotState = Traveling
})
bluetooth.onUartDataReceived(serial.delimiters(Delimiters.Hash), function () {
    Data = bluetooth.uartReadUntil(serial.delimiters(Delimiters.Hash))
    basic.showString(Data)
})
function Traveling2 () {
    if (Distance < 300) {
        Avoid()
    } else if (Distance <= 50) {
        All_Systems_Woah()
    } else {
        wuKong.setAllMotor(50, 50)
    }
    GetDistance()
}
function GetDistance () {
    Distance = Rangefinder.distance()
    return Distance
}
input.onButtonPressed(Button.B, function () {
    wuKong.stopAllMotor()
    basic.showIcon(IconNames.Surprised)
})
function Avoid () {
    wuKong.stopAllMotor()
    wuKong.setAllMotor(40, 0)
    basic.pause(500)
}
let Data = ""
let Traveling = 0
let Distance = 0
let stationary = 0
let robotState = 0
bluetooth.startUartService()
robotState = stationary
wuKong.setLightMode(wuKong.LightMode.BREATH)
basic.showIcon(IconNames.Heart)
Rangefinder.init()
Distance = 0
basic.forever(function () {
    if (robotState == stationary) {
        stationary = 0
        wuKong.stopAllMotor()
    } else if (robotState == Traveling) {
        Traveling()
    }
})
