#!/usr/bin/env python3
import ev3dev.ev3 as ev3
import time

lmLeft = ev3.LargeMotor('outB')
lmRight = ev3.LargeMotor('outC')
# mm = ev3.MediumMotor('outC')

us = ev3.UltrasonicSensor()
cs = ev3.ColorSensor()
cs.mode = "COL-COLOR"
gs = ev3.GyroSensor()
ts = ev3.TouchSensor()

#avoid collision, when ultrasonic senor detects
#there is an obstical in collision distance car
#will turn around
COLLISION_DISTANCE = 10.0

RSPEED = 100
#Control robot move as given command:
#1. Go straight
#2. Turn clock wise
#3. Turn around

def go_robot(command):
    gs.mode = 'GYRO-RATE'
    gs.mode = 'GYRO-ANG'
    lmLeft.run_forever(speed_sp = RSPEED)
    if command == 1:
        lmRight.run_forever(speed_sp = RSPEED)
        time.sleep(0.5)
    elif command == 2:
        lmRight.run_forever(speed_sp = -RSPEED)
        while cs.value() != 1:
            if ts.value():
                lmLeft.stop(stop_action = ev3.Motor.STOP_ACTION_HOLD)
                lmRight.stop(stop_action = ev3.Motor.STOP_ACTION_HOLD)
                return 
    elif command == 3:
        lmRight.run_forever(speed_sp = -RSPEED)
        while gs.value() < 180:
            if ts.value():
                lmLeft.stop(stop_action = ev3.Motor.STOP_ACTION_HOLD)
                lmRight.stop(stop_action = ev3.Motor.STOP_ACTION_HOLD)
                return 
    lmLeft.stop(stop_action = ev3.Motor.STOP_ACTION_HOLD)
    lmRight.stop(stop_action = ev3.Motor.STOP_ACTION_HOLD)


if __name__ == '__main__':
    #TODO: communicate with arduino
    arduino = True
    while arduino:
        #Check ultrasonic sensor
        cd = float(us.value())
        if cd <= COLLISION_DISTANCE:
            #turn around
            go_robot(3)
        else:
            #Check color sensor
            #1 is black
            if cs.value() == 1:
                #go straight for a while
                go_robot(1)
            else:
                #rotate for some angle
               go_robot(2) 
        #TODO: send record to server
        arduino = not ts.value()

    #TODO: Unload
    # Medium motor