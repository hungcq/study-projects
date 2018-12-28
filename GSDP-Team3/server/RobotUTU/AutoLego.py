import bluetooth
import time
import ev3dev.ev3 as ev3
import GlobalValue
from RunOperation import *

lmLeft = ev3.LargeMotor('outB')
lmRight = ev3.LargeMotor('outC')
mm = ev3.MediumMotor('outA')

us = ev3.UltrasonicSensor()
cs = ev3.ColorSensor()
cs.mode = "COL-COLOR"
gs = ev3.GyroSensor()
ts = ev3.TouchSensor()

# safety distance
COLLISION_DISTANCE = 10.0

# movement velocity
RSPEED = 100

def decideWarehouse():
    GlobalValue.working = "listenSensor"
    GlobalValue.working = "FinishSensor"
    return "red"

def autoLego():
    while True:
        if GlobalValue.working == "Null" or  GlobalValue.working == "listenSensor":
            GlobalValue.warehouse = decideWarehouse()
        elif GlobalValue.working == "FinishSensor":
            load()
            turnAround()
            print(GlobalValue.working)
        elif GlobalValue.working == "FinishLoad":
            msg = goBlackDepart()
            print(msg)
            if msg == "exitManual":
                return
            elif msg == "exitBump":
                GlobalValue.state = "Null"
                print(1)
                return
            elif msg == "green":
                if GlobalValue.warehouse == "green":
                    msg = turnRight90()
                    if msg == "exitManual":
                        return
                    elif msg == "exitBump":
                        GlobalValue.state = "Null"
                        print(1)
                        return
                    unload()
                    msg = turnLeft90()
                    if msg == "exitManual":
                        return
                    elif msg == "exitBump":
                        GlobalValue.state = "Null"
                        print(1)
                        return
                    goStraightPeriod(2)
                else:
                    goStraightPeriod(2)
                    continue
            elif msg == "red":
                if GlobalValue.warehouse == "red":
                    msg = turnRight90()
                    if msg == "exitManual":
                        return
                    elif msg == "exitBump":
                        GlobalValue.state = "Null"
                        print(1)
                        return
                    unload()
                    msg = turnLeft90()
                    if msg == "exitManual":
                        return
                    elif msg == "exitBump":
                        GlobalValue.state = "Null"
                        print(1)
                        return
                    goStraightPeriod(2)
                else:
                    goStraightPeriod(2)
                    continue
            print(GlobalValue.working)

        elif GlobalValue.working == "FinishUnload":
            msg = goBlackDepart()
            if msg == "exitManual":
                return
            elif msg == "exitBump":
                GlobalValue.state = "Null"
                print(1)
                return
            elif msg == "yellow":
                goStraightPeriod(0.75)
                turnRight90()
                GlobalValue.working = "Null"
                GlobalValue.warehouse = "Null"
                GlobalValue.state = "Null"
                print(GlobalValue.working)
                # sendReplyPC()
                return

if __name__ == '__main__':
    autoLego()