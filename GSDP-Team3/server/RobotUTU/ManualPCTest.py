import bluetooth
import time

defaultMacAddress = 'D4:36:39:CA:AD:D4'

class ManualRobot:

    def __init__(self, mac_address):
        self.port = 3
        self.sock = bluetooth.BluetoothSocket(bluetooth.RFCOMM)
        self.sock.connect((mac_address, self.port))

    def sendMsg(self, order, sock, delay=2):
        print(order)
        sock.send(order)
        response = sock.recv(1024)
        response = bytes.decode(response)
        if response:
            print(response)
        time.sleep(delay)

    def sendManualMessage(self, message):
        # List message ['auto', 'manual', 'forward', 'backward', 'right', 'left', 'exit']
        self.sendMsg(message, self.sock)
        if message == 'exit':
            self.sock.close()
        return None
