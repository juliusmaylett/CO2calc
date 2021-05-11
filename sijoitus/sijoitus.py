import csv
from os import O_APPEND

tuotteet = []
hankintaArvot = []
nykyArvot = []
with open("ostot.csv") as data:
    for row in data:
        osat = row.split("\t")
        if len(osat) > 15:
            tuote = osat[3].replace(',', '.')

            hankintaArvo = float(osat[10].replace(',', '.'))
            nykyArvo = float(osat[13].replace(',', '.'))
            
            hankintaArvot.append(float(hankintaArvo))
            nykyArvot.append(float(nykyArvo))
            tuotteet.append(float(tuote))

i = 1

ostoSumma = 0.0
while i < len(tuotteet):
    #ostoSumma = 
    i+=1

print("Salkkusi arvo on", nykyArvot[3], "euroa")

