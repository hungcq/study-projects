 import GlobalValue
import BluetoothLego
import time
import threading
import ev3dev.ev3 as ev3
import AutoLego
import ManualLego

def switchState():
    global transInstruct
    global transState
    while True:
        if transState == "auto":
            AutoLego.autoLego()
            print(0)
        elif transState == "manual":
            while True:
                ManualLego.manualLego(transInstruct)
                if transInstruct == "exit":
                    break
        time.sleep(0.5)


if __name__ == '__main__':
    transInstruct = ""
    transState = ""

    t1 = threading.Thread(target=switchState)
    t2 = threading.Thread(target=BluetoothLego.btnLego)
    t1.start()
    t2.start()
    # t1.setDaemon(True)
    # t2.setDaemon(True)

    while True:
        transInstruct = GlobalValue.instruction
        transState = GlobalValue.state

