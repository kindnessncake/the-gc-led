def on_bluetooth_connected():
    basic.show_icon(IconNames.DUCK)
bluetooth.on_bluetooth_connected(on_bluetooth_connected)

def on_button_pressed_a():
    wuKong.stop_all_motor()
    basic.show_icon(IconNames.SURPRISED)
input.on_button_pressed(Button.A, on_button_pressed_a)

def on_uart_data_received():
    global Data
    Data = bluetooth.uart_read_until(serial.delimiters(Delimiters.HASH))
    basic.show_string(Data)
bluetooth.on_uart_data_received(serial.delimiters(Delimiters.HASH), on_uart_data_received)

def GetDistance():
    global Distance
    Distance = Rangefinder.distance()
    return Distance
def Traveling():
    GetDistance()
    if Distance < 300:
        Avoid()
    else:
        wuKong.set_all_motor(50, 50)
def Avoid():
    wuKong.stop_all_motor()
    wuKong.set_all_motor(40, 0)
    basic.pause(500)
Data = ""
Distance = 0
stationary = 0
bluetooth.start_uart_service()
robotState = stationary
wuKong.set_light_mode(wuKong.LightMode.BREATH)
basic.show_icon(IconNames.HEART)
Rangefinder.init()
Distance = 0

def on_forever():
    Traveling()
basic.forever(on_forever)
