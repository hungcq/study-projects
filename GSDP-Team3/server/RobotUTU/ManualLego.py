import bluetooth
import time
import ev3dev.ev3 as ev3
import GlobalValue

import time

lmLeft = ev3.LargeMotor('outB')
lmRight = ev3.LargeMotor('outC')
us = ev3.UltrasonicSensor()
cs = ev3.ColorSensor()
cs.mode = "COL-COLOR"
gs = ev3.GyroSensor()
gs.mode = 'GYRO-ANG'
ts = ev3.TouchSensor()

# safety distance
COLLISION_DISTANCE = 10.0
# movement velocity
RSPEED = 100
MSPEED = 50


def manualLego(instruction):
    if instruction == "forward":
        lmLeft.run_forever(speed_sp=RSPEED)
        lmRight.run_forever(speed_sp=RSPEED)
        time.sleep(1)
    elif instruction == "backward":
        lmLeft.run_forever(speed_sp=-RSPEED)
        lmRight.run_forever(speed_sp=-RSPEED)
        time.sleep(1)
    elif instruction == "right":
        currentGs = gs.value()
        lmLeft.run_forever(speed_sp=MSPEED)
        lmRight.run_forever(speed_sp=-MSPEED)
        # gs.value() is the absolute angel, what we need is the relative angle
        while (gs.value() - currentGs) < 90:
            pass
    elif instruction == "left":
        currentGs = gs.value()
        lmLeft.run_forever(speed_sp=-MSPEED)
        lmRight.run_forever(speed_sp=MSPEED)
        while (gs.value() - currentGs) > -90:
            pass
    elif instruction == "stop":
        lmLeft.stop(stop_action=ev3.Motor.STOP_ACTION_HOLD)
        lmRight.stop(stop_action=ev3.Motor.STOP_ACTION_HOLD)

    # exit means stop the lego and return to the mode waiting for instructions
    elif instruction == "exit":
        lmLeft.stop(stop_action=ev3.Motor.STOP_ACTION_HOLD)
        lmRight.stop(stop_action=ev3.Motor.STOP_ACTION_HOLD)
        GlobalValue.state = "auto"

    return instruction

