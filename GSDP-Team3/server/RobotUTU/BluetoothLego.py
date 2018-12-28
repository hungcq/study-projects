import bluetooth
import time
import ev3dev.ev3 as ev3

import GlobalValue

hostMACAddress = 'A0:E6:F8:16:31:59' # PC's Bluetooth Address
port = 3
backlog = 1
size = 1024
sock = bluetooth.BluetoothSocket(bluetooth.RFCOMM)
sock.bind((hostMACAddress, port))
sock.listen(backlog)

def btnLego():
    try:
        client, clientInfo = sock.accept()
        while True:
            data = client.recv(size)
            if data:
                data = bytes.decode(data)
                if data == "auto":
                    GlobalValue.state = data
                    client.send("automode")
                elif data == "manual":
                    GlobalValue.state = data
                    client.send("manualmode")
                elif data in ["forward", "backward", "left", "right","stop"]:
                    GlobalValue.instruction = data
                    client.send("OK")
                elif data == "exit":
                    GlobalValue.instruction = data
                    client.send("automode")
                print(data)
    except:
        print("Closing socket")
        client.close()
        sock.close()



if __name__ == '__main__':
    btnLego()