import requests 

resultUrl = "http://127.0.0.1:3000/"

URL = "http://192.168.192.20:8080/rest/items/Temp_InsideTemperature"
r = requests.get(url = URL) 
data1 = r.json()['state']

URL = "http://192.168.192.20:8080/rest/items/Temp_OutsideTemperature"
r = requests.get(url = URL) 
data2 = r.json()['state']

# todo: get inside temperature as a middle value of netatmo sensor & raspi sensor
insideTemp = float(data1.replace('°C', '').strip())


outsideTemp = float(data2.replace('°C', '').strip())
diffTemp = insideTemp - outsideTemp

x = requests.post(resultUrl + "insideTemp", data = str(insideTemp), headers = {"Content-Type":"text/plain"})
x = requests.post(resultUrl + "outsideTemp", data = str(outsideTemp), headers = {"Content-Type":"text/plain"})
x = requests.post(resultUrl + "diffTemp", data = str(diffTemp), headers = {"Content-Type":"text/plain"})