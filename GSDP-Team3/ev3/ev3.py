import bluetooth
import struct
import time


class EV3():
    def __init__(self, host: str):
        self._socket = bluetooth.BluetoothSocket(bluetooth.RFCOMM)
        self._socket.connect((host, 1))

    def __del__(self):
        if isinstance(self._socket, bluetooth.BluetoothSocket):
            self._socket.close()

    def sync_mode(mode):
        # 3 differents modes, standard, asynchronous and synchronous
        syncMode = b'\x80'
        if mode == 'STD' :
            # Wait for reply if any
            if global_mem > 0 :
                syncMode = DIRECT_COMMAND_REPLY
            else :
                syncMode = DIRECT_COMMAND_NO_REPLY 
            
        elif mode == 'ASYNC' :
            # But don't wait for reply
            if global_mem > 0 :
                syncMode = DIRECT_COMMAND_REPLY
            else :
                syncMode = DIRECT_COMMAND_NO_REPLY 

        elif mode == 'SYNC' : 
            syncMode = DIRECT_COMMAND_REPLY

        return (syncMode)
        
    def send_direct_cmd(self, ops: bytes, local_mem, global_mem, ctn) -> bytes:
        syncMode = EV3.sync_mode(mode)
        cmd = b''.join([
        struct.pack('<h', len(ops) + 5),
        struct.pack('<h', ctn),
        syncMode,
        struct.pack('<h', local_mem*1024 + global_mem),ops])
        self._socket.send(cmd)
        print_hex('Sent', cmd)
        
        if ( syncMode == DIRECT_COMMAND_REPLY):
            EV3.wait_for_reply(self)
                         
    def wait_for_reply (self) : 
        reply = self._socket.recv(5 + global_mem)
        print_hex('Recv', reply)
        return reply
    

def print_hex(desc: str, data: bytes) -> None:
    print(desc + ' 0x|' + ':'.join('{:02X}'.format(byte) for byte in data) + '|')

DIRECT_COMMAND_REPLY = b'\x00'
DIRECT_COMMAND_NO_REPLY = b'\x80'

opNop = b'\x01'
STD = 'STD'
ASYNC = 'ASYSNC'
SYNC = 'SYNC'

opMotorADForward = b'\xA5' + b'\x00' + b'\x09' + b'\x1E'+ b'\xA6'+ b'\x00'+ b'\x09'
#                                                   Speed value
#
opMotorBackward = b'\xA5' + b'\x00' + b'\x09' + b'\x20'+ b'\xA6'+ b'\x00'+ b'\x09'


opMotorTurnRight = b'\xA5' + b'\x00' + b'\x01' + b'\x1E'+ b'\xA6'+ b'\x00'+ b'\x01'
opMotorTurnLeft = b'\xA5' + b'\x00' + b'\x08' + b'\x1E'+ b'\xA6'+ b'\x00'+ b'\x08'

opMotorAllFullPower =  b'\xA4' + b'\x00' + b'\x0F' + b'\x81'+ b'\x64'+ b'\xA6'+ b'\x00' + b'\x0F'
opMotorAllStop =  b'\xA3' + b'\x00' + b'\x0F' + b'\x00'

"""opOutput_Power = 0x|A4|
opOutput_Start = 0x|A6|
opOutput_Stop = 0x|A3|
opOutput_Polarity = 0x|A7|"""

my_ev3 = EV3('00:16:53:4B:0A:BB')


local_mem = 0
global_mem = 0
ctn = 0
mode = SYNC
ops_nothing = opNop

my_ev3.send_direct_cmd(opMotorBackward,local_mem,global_mem,ctn)
time.sleep(5)
my_ev3.send_direct_cmd(opMotorAllStop,local_mem,global_mem,ctn)

