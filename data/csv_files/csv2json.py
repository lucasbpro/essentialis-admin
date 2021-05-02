import csv, json, sys

nargs = len(sys.argv)
if(nargs!= 3):
    print("Script needs two arguments: input and output file names. {} parameters provided.".format(nargs-1))
else:
    arguments = sys.argv
    csvFilePath = arguments[1]
    jsonFilePath = arguments[2]

    data = []
    with open(csvFilePath) as csvFile:
        csvReader = csv.DictReader(csvFile)
        for rows in csvReader:
            data.append(rows)

    with open(jsonFilePath, 'w') as jsonFile:
        jsonFile.write(json.dumps(data, indent=4))
