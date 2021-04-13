import csv, json

csvFilePath = 'test.csv'
jsonFilePath = 'json_file_name.json'

data = {}
id = 1
with open(csvFilePath) as csvFile:
    csvReader = csv.DictReader(csvFile)
    for rows in csvReader:
        data[id] = rows
        id = id + 1

with open(jsonFilePath, 'w') as jsonFile:
    jsonFile.write(json.dumps(data, indent=4))
