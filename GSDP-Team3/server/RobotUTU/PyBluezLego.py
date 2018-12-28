import bluetooth
import time

serverMACAddress = 'C8:21:58:74:F8:14' # PC's Bluetooth Address
port = 3
sock = bluetooth.BluetoothSocket(bluetooth.RFCOMM)
sock.connect((serverMACAddress, port))
while True:
    # one is just for testing
    text = "one"
    sock.send(text)
    response = sock.recv(1024)
    print(response)
    time.sleep(1)
sock.close()