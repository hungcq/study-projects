import bluetooth

hostMACAddress = 'C8:21:58:74:F8:14' # PC's Bluetooth Address
port = 3
backlog = 1
size = 1024
sock = bluetooth.BluetoothSocket(bluetooth.RFCOMM)
sock.bind((hostMACAddress, port))
sock.listen(backlog)
try:
    client, clientInfo = sock.accept()
    while True:
        data = client.recv(size)
        if data:
            print(data)
            client.send("go straight") # Echo back to robot
except:
    print("Closing socket")
    client.close()
    sock.close()