import time
import network
import json
import urequests as req
from random import randint

ssid = "iPhone X"
password =  "        "
dataUrl = 'https://noise-ban-default-rtdb.asia-southeast1.firebasedatabase.app/data.json'

def connectWifi():   
    station = network.WLAN(network.STA_IF)
 
    if station.isconnected() == True:
        print("Connected to {}".format(ssid))
        return
 
    station.active(True)
    station.connect(ssid, password)
 
    while station.isconnected() == False:
        pass
 
    print("Connection successful ({})".format(ssid))
    print(station.ifconfig())

def updateValue(key, value):
    result = req.patch(dataUrl, data=json.dumps({key:value}))
    result.close()

connectWifi()
while True:
    updateValue('sensor_6', randint(10,100))
    time.sleep_ms(100)