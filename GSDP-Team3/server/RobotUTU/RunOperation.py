import bluetooth
import time
import ev3dev.ev3 as ev3

import time
import GlobalValue

lmLeft = ev3.LargeMotor('outB')
lmRight = ev3.LargeMotor('outC')
mm = ev3.MediumMotor('outA')

us = ev3.UltrasonicSensor()
us.mode = 'US-DIST-CM'
cs = ev3.ColorSensor()
cs.mode = "COL-COLOR"
gs = ev3.GyroSensor()
ts = ev3.TouchSensor()
# safety distance
COLLISION_DISTANCE = 10.0

# movement velocity
RSPEED = 100
MSPEED = 50

def load():
    mm.run_to_rel_pos(position_sp=90, speed_sp=MSPEED, stop_action="hold")
    time.sleep(4)
    GlobalValue.working = "FinishLoad"
    return

def unload():
    mm.run_to_rel_pos(position_sp=-90, speed_sp=MSPEED, stop_action="hold")
    time.sleep(4)
    GlobalValue.working = "FinishUnload"
    return

def goStraightPeriod(period=1.5):
    cd = us.value()/10
    lmLeft.run_forever(speed_sp=RSPEED)
    lmRight.run_forever(speed_sp=RSPEED)
    start_time = time.time()
    while time.time() - start_time < period:
        if cd <= 18.0:
            lmLeft.stop(stop_action=ev3.Motor.STOP_ACTION_HOLD)
            lmRight.stop(stop_action=ev3.Motor.STOP_ACTION_HOLD)
            return "obstacle"

    lmLeft.stop(stop_action=ev3.Motor.STOP_ACTION_HOLD)
    lmRight.stop(stop_action=ev3.Motor.STOP_ACTION_HOLD)

    return

def goBackPeriod(period=1.5):
    cd = us.value() / 10
    lmLeft.run_forever(speed_sp=-RSPEED)
    lmRight.run_forever(speed_sp=-RSPEED)
    start_time = time.time()
    while time.time() - start_time < period:
        pass
    lmLeft.stop(stop_action=ev3.Motor.STOP_ACTION_HOLD)
    lmRight.stop(stop_action=ev3.Motor.STOP_ACTION_HOLD)
    return

def turnAround():
    currentGs = gs.value()
    lmLeft.run_forever(speed_sp=-RSPEED)
    lmRight.run_forever(speed_sp=RSPEED)
    while (gs.value() - currentGs) > -180:
        pass
    lmLeft.stop(stop_action=ev3.Motor.STOP_ACTION_HOLD)
    lmRight.stop(stop_action=ev3.Motor.STOP_ACTION_HOLD)
    # GlobalValue.working = "FinishLoad"
    return

def turnLeft90():
    cd = us.value() / 10
    currentGs = gs.value()
    lmLeft.run_forever(speed_sp=-MSPEED)
    lmRight.run_forever(speed_sp=MSPEED)
    while (gs.value() - currentGs) > -90:
        if GlobalValue.state == "manual":
            lmLeft.stop(stop_action=ev3.Motor.STOP_ACTION_HOLD)
            lmRight.stop(stop_action=ev3.Motor.STOP_ACTION_HOLD)
            return "exitManual"
        elif ts.value():
            lmLeft.stop(stop_action=ev3.Motor.STOP_ACTION_HOLD)
            lmRight.stop(stop_action=ev3.Motor.STOP_ACTION_HOLD)
            return "exitBump"

    lmLeft.stop(stop_action=ev3.Motor.STOP_ACTION_HOLD)
    lmRight.stop(stop_action=ev3.Motor.STOP_ACTION_HOLD)
    return

def turnRight90():
    cd = us.value() / 10
    currentGs = gs.value()
    lmLeft.run_forever(speed_sp=MSPEED)
    lmRight.run_forever(speed_sp=-MSPEED)
    while (gs.value() - currentGs) < 90:
        if GlobalValue.state == "manual":
            lmLeft.stop(stop_action=ev3.Motor.STOP_ACTION_HOLD)
            lmRight.stop(stop_action=ev3.Motor.STOP_ACTION_HOLD)
            return "exitManual"
        elif ts.value():
            lmLeft.stop(stop_action=ev3.Motor.STOP_ACTION_HOLD)
            lmRight.stop(stop_action=ev3.Motor.STOP_ACTION_HOLD)
            return "exitBump"

    lmLeft.stop(stop_action=ev3.Motor.STOP_ACTION_HOLD)
    lmRight.stop(stop_action=ev3.Motor.STOP_ACTION_HOLD)
    return

def goStraightAuto():
    cd = us.value() / 10
    lmLeft.run_forever(speed_sp=RSPEED)
    lmRight.run_forever(speed_sp=RSPEED)
    # time.sleep(0.5)
    start_time = time.time()
    while time.time() - start_time < 0.5:
        if GlobalValue.state == "manual":
            lmLeft.stop(stop_action=ev3.Motor.STOP_ACTION_HOLD)
            lmRight.stop(stop_action=ev3.Motor.STOP_ACTION_HOLD)
            return "exitManual"
        elif ts.value():
            lmLeft.stop(stop_action=ev3.Motor.STOP_ACTION_HOLD)
            lmRight.stop(stop_action=ev3.Motor.STOP_ACTION_HOLD)
            return "exitBump"
        elif cs.value() == 3:
            print("green")
            return "green"
        elif cs.value() == 4:
            print("yellow")
            return "yellow"
        elif cs.value() == 5:
            print("red")
            return "red"
        if cd <= 18.0:
            lmLeft.stop(stop_action=ev3.Motor.STOP_ACTION_HOLD)
            lmRight.stop(stop_action=ev3.Motor.STOP_ACTION_HOLD)
            return "obstacle"

    lmLeft.stop(stop_action=ev3.Motor.STOP_ACTION_HOLD)
    lmRight.stop(stop_action=ev3.Motor.STOP_ACTION_HOLD)
    return

def turnLeftAuto():
    cd = us.value() / 10
    currentGs = gs.value()
    lmLeft.run_forever(speed_sp=-MSPEED)
    lmRight.run_forever(speed_sp=MSPEED)
    while (gs.value() - currentGs) > -70 and cs.value() != 1:
        if GlobalValue.state == "manual":
            lmLeft.stop(stop_action=ev3.Motor.STOP_ACTION_HOLD)
            lmRight.stop(stop_action=ev3.Motor.STOP_ACTION_HOLD)
            return "exitManual"
        elif ts.value():
            lmLeft.stop(stop_action=ev3.Motor.STOP_ACTION_HOLD)
            lmRight.stop(stop_action=ev3.Motor.STOP_ACTION_HOLD)
            return "exitBump"
        elif GlobalValue.working == "FinishLoad" or GlobalValue.working == "FinishUnload":
            if cs.value() == 3:
                print("green")
                return "green"
            elif cs.value() == 4:
                print("yellow")
                return "yellow"
            elif cs.value() == 5:
                print("red")
                return "red"
    if cs.value() == 1:
        return "find"
    else:
        return

def turnRightAuto():
    cd = us.value() / 10
    currentGs = gs.value()
    lmLeft.run_forever(speed_sp=MSPEED)
    lmRight.run_forever(speed_sp=-MSPEED)
    while (gs.value() - currentGs) < 140 and cs.value() != 1:
        if GlobalValue.state == "manual":
            lmLeft.stop(stop_action=ev3.Motor.STOP_ACTION_HOLD)
            lmRight.stop(stop_action=ev3.Motor.STOP_ACTION_HOLD)
            return "exitManual"
        elif ts.value():
            lmLeft.stop(stop_action=ev3.Motor.STOP_ACTION_HOLD)
            lmRight.stop(stop_action=ev3.Motor.STOP_ACTION_HOLD)
            return "exitBump"
        elif GlobalValue.working == "FinishLoad" or GlobalValue.working == "FinishUnload":
            if cs.value() == 3:
                print("green")
                return "green"
            elif cs.value() == 4:
                print("yellow")
                return "yellow"
            elif cs.value() == 5:
                print("red")
                return "red"
    if cs.value() == 1:
        return "find"
    else:
        return

def findBlack():
    flag = False
    while True:
        # Turn 3 times to keep the lego at the origin point
        flag = turnLeftAuto()  # 1
        if flag == "find":
            break
        elif flag:
            return flag

        flag = turnRightAuto()  # 2
        if flag == "find":
            break
        elif flag:
            return flag

        flag = turnLeftAuto()  # 3
        if flag == "find":
            break
        elif flag:
            return flag

    return

def goBlackDepart():
    while GlobalValue.state != "manual" and not ts.value():
        if cs.value() == 1:
            flag = goStraightAuto()
            if flag and flag != "obstacle":
                return flag
            elif flag == "obstacle":
                while True:
                    cd = us.value() / 10
                    if cd > 18.0:
                        break
        else:
            flag = findBlack()
            if flag:
                return flag

