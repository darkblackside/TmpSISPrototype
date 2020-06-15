#!/usr/local/bin/python
# -*- coding: latin-1 -*-

# pip install requests
# pip install gpiozero
import requests 
from gpiozero import Button
from time import sleep

resultUrl = "http://192.168.192.34:3000/"

URL = "http://192.168.192.20:8080/rest/items/Temp_InsideTemperature"
r = requests.get(url = URL) 
data1 = r.json()['state']

URL = "http://192.168.192.20:8080/rest/items/Temp_OutsideTemperature"
r = requests.get(url = URL) 
data2 = r.json()['state']

sensor = Button(14)

while True:
    pressed = sensor.is_pressed
    insideTemp = float(data1[:-2].strip())
    outsideTemp = float(data2[:-2].strip())
    diffTemp = insideTemp - outsideTemp

    x = requests.post(resultUrl + "insideTemp", data = str(insideTemp), headers = {"Content-Type":"text/plain"})
    x = requests.post(resultUrl + "outsideTemp", data = str(outsideTemp), headers = {"Content-Type":"text/plain"})
    x = requests.post(resultUrl + "diffTemp", data = str(diffTemp), headers = {"Content-Type":"text/plain"})
    x = requests.post(resultUrl + "windowOpen", data = str(pressed), headers = {"Content-Type":"text/plain"})
    sleep(2000)