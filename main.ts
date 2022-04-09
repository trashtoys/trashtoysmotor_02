radio.onReceivedValue(function (name, value) {
    if (name == "md_joy") {
        mando = value
    }
    if (name == "ex_joy") {
        ejex = value
    }
    if (name == "ey_joy") {
        ejey = value
    }
    if (name == "tc_CC") {
        on_CC = value
    }
    if (name == "tc_FF") {
        on_FF = value
    }
})
let vel_izq = 0
let vel_der = 0
let nad_y = 0
let nad_x = 0
let con_YY = 0
let con_XX = 0
let pulso = 0
let on_FF = 0
let on_CC = 0
let ejey = 0
let ejex = 0
let mando = 0
serial.redirect(
SerialPin.P16,
SerialPin.P8,
BaudRate.BaudRate115200
)
mando = 0
ejex = 0
ejey = 0
on_CC = 0
radio.setGroup(10)
basic.forever(function () {
    if (pulso == 0) {
        pins.digitalWritePin(DigitalPin.P12, 0)
        pulso = 1
    } else {
        pins.digitalWritePin(DigitalPin.P12, 1)
        pulso = 0
    }
    if (mando == 0) {
        con_XX = 0
        con_YY = 0
    }
    if (mando == 1) {
        con_XX = 14
        con_YY = 50
    }
    if (mando == 2) {
        con_XX = 28
        con_YY = 100
    }
    if (mando == 3) {
        con_XX = 56
        con_YY = 200
    }
    if (mando == 4) {
        con_XX = 112
        con_YY = 400
    }
    if (mando == 5) {
        con_XX = 224
        con_YY = 800
    }
    nad_x = (ejex - 512) / 512
    nad_y = (ejey - 512) / 512
    vel_der = nad_y * con_YY + nad_x * con_XX
    vel_izq = nad_y * con_YY - nad_x * con_XX
    pins.analogWritePin(AnalogPin.P1, Math.abs(vel_der))
    pins.analogWritePin(AnalogPin.P2, Math.abs(vel_izq))
    if (nad_y > 0) {
        pins.digitalWritePin(DigitalPin.P13, 1)
    } else {
        pins.digitalWritePin(DigitalPin.P13, 0)
    }
    if (on_CC == 0) {
        pins.digitalWritePin(DigitalPin.P14, 0)
    } else {
        pins.digitalWritePin(DigitalPin.P14, 1)
    }
    if (on_FF == 0) {
        pins.digitalWritePin(DigitalPin.P15, 0)
    } else {
        pins.digitalWritePin(DigitalPin.P15, 1)
    }
    serial.writeLine("velocidad" + convertToText(vel_der).substr(0, 4) + convertToText(vel_izq).substr(0, 4))
})
control.inBackground(function () {
    while (0 == 0) {
        if (mando == 1) {
            basic.showLeds(`
                . . # . .
                . # # . .
                . . # . .
                . . # . .
                . # # # .
                `)
        }
        if (mando == 2) {
            basic.showLeds(`
                . # # # .
                . . . # .
                . # # # .
                . # . . .
                . # # # .
                `)
        }
        if (mando == 3) {
            basic.showLeds(`
                . # # # .
                . . . # .
                . # # # .
                . . . # .
                . # # # .
                `)
        }
        if (mando == 4) {
            basic.showLeds(`
                . # . # .
                . # . # .
                . # # # .
                . . . # .
                . . . # .
                `)
        }
        if (mando == 5) {
            basic.showLeds(`
                . # # # .
                . # . . .
                . # # # .
                . . . # .
                . # # # .
                `)
        }
        if (mando == 0) {
            basic.showLeds(`
                . . # # .
                . # . . .
                . . # . .
                . . . # .
                . # # . .
                `)
        }
    }
})
