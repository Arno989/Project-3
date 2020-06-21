import pandas as pd

def prep_json(json):
    dataset = pd.DataFrame.from_dict(json, orient='index').T
    dataset.columns = map(str.lower, dataset.columns)
    dataset.fillna(0)
    dataset = dataset.replace("", 0)
    dictSfr = {}
    dictCyl = {}
    dictAs = {}
    dictSfrDicht = {}
    dictCylDicht = {}
    dictAsDicht = {}
    dictSfr1 = {}
    dictCyl1 = {}
    dictAs1 = {}
    dictSfr1Dicht = {}
    dictCyl1Dicht = {}
    dictAs1Dicht = {}

    for index, row in dataset.iterrows():
        if row['oogmetingen/cyl ver'] < 0:
            sfr = row['oogmetingen/sfr ver'] + row['oogmetingen/cyl ver']
            cyl = row['oogmetingen/cyl ver'] - 2 * row['oogmetingen/cyl ver']
            key = index
            dictSfr[key] = sfr
            dictCyl[key] = cyl
            if row['oogmetingen/as ver'] <= 90:
                dictAs[key] = row['oogmetingen/as ver'] + 90
            elif row['oogmetingen/as ver'] > 90:
                dictAs[key] = row['oogmetingen/as ver'] - 90
        if row['oogmetingen/cyl dicht'] < 0:
            sfrDicht = row['oogmetingen/sfr dicht'] + row['oogmetingen/cyl dicht']
            cylDicht = row['oogmetingen/cyl dicht'] - 2 * row['oogmetingen/cyl dicht']
            key = index
            dictSfrDicht[key] = sfrDicht
            dictCylDicht[key] = cylDicht
            if row['oogmetingen/as dicht'] <= 90:
                dictAsDicht[key] = row['oogmetingen/as dicht'] + 90
            elif row['oogmetingen/as dicht'] > 90:
                dictAsDicht[key] = row['oogmetingen/as dicht'] - 90
        if row['oogmetingen/cyl ver/l'] < 0:
            sfr1 = row['oogmetingen/sfr ver/l'] + row['oogmetingen/cyl ver/l']
            cyl1 = row['oogmetingen/cyl ver/l'] - 2 * row['oogmetingen/cyl ver/l']
            key = index
            dictSfr1[key] = sfr1
            dictCyl1[key] = cyl1
            if row['oogmetingen/as ver/l'] <= 90:
                dictAs1[key] = row['oogmetingen/as ver/l'] + 90
            elif row['oogmetingen/as ver/l'] > 90:
                dictAs1[key] = row['oogmetingen/as ver/l'] - 90
        if row['oogmetingen/cyl dicht/l'] < 0:
            sfr1Dicht = row['oogmetingen/sfr dicht/l'] + row['oogmetingen/cyl dicht/l']
            cyl1Dicht = row['oogmetingen/cyl dicht/l'] - 2 * row['oogmetingen/cyl dicht/l']
            key = index
            dictSfr1Dicht[key] = sfr1Dicht
            dictCyl1Dicht[key] = cyl1Dicht
            if row['oogmetingen/as dicht/l'] <= 90:
                dictAs1Dicht[key] = row['oogmetingen/as dicht/l'] + 90
            elif row['oogmetingen/as dicht/l'] > 90:
                dictAs1Dicht[key] = row['oogmetingen/as dicht/l'] - 90

    dataset['oogmetingen/sfr ver'].update(pd.Series(dictSfr))
    dataset['oogmetingen/cyl ver'].update(pd.Series(dictCyl))
    dataset['oogmetingen/as ver'].update(pd.Series(dictAs))
    dataset['oogmetingen/sfr dicht'].update(pd.Series(dictSfrDicht))
    dataset['oogmetingen/cyl dicht'].update(pd.Series(dictCylDicht))
    dataset['oogmetingen/as dicht'].update(pd.Series(dictAsDicht))
    dataset['oogmetingen/sfr ver/l'].update(pd.Series(dictSfr1))
    dataset['oogmetingen/cyl ver/l'].update(pd.Series(dictCyl1))
    dataset['oogmetingen/as ver/l'].update(pd.Series(dictAs1))
    dataset['oogmetingen/sfr dicht/l'].update(pd.Series(dictSfr1Dicht))
    dataset['oogmetingen/cyl dicht/l'].update(pd.Series(dictCyl1Dicht))
    dataset['oogmetingen/as dicht/l'].update(pd.Series(dictAs1Dicht))

    dataset[['geslacht']] = dataset[['geslacht']].replace({'Vrouw': 0, 'Man': 1, 'Overige': 0, 0: 0, 'vrouw': 0, 'man': 1, 'overige': 0})

    # zet de datums om naar datetime, n/a de out of bounds waarden en versnel het proces door het originele formaat te gebruiken
    dataset[['geboortedatum']] = pd.to_datetime(dataset['geboortedatum'], errors='coerce', infer_datetime_format=True)
    dataset[['oogmetingen/datum']] = pd.to_datetime(dataset['oogmetingen/datum'], errors='coerce',
                                                    infer_datetime_format=True)

    # Bereken leeftijd op moment van meting voor makkelijkere correlatie
    dataset["Measurement_Age"] = (dataset["oogmetingen/datum"] - dataset["geboortedatum"]).astype("<m8[D]")

    # verwijder deze kolommen want we hebben ze niet meer nodig
    dataset = dataset.drop(columns=['geboortedatum', 'oogmetingen/datum'])

    dataset.columns = ['Sex', 'Sph-Far-R', 'Cyl-Far-R', 'Axis-Far-R', 'Add-R', 'Sph-Close-R', 'Cyl-Close-R',
                       'Axis-Close-R', 'Sph-Far-L', 'Cyl-Far-L', 'Axis-Far-L', 'Add-L', 'Sph-Close-L', 'Cyl-Close-L',
                       'Axis-Close-L', 'Measurement_Age']
    dataset['Add'] = dataset['Add-R']
    dataset = dataset[
        ['Sex', 'Measurement_Age', 'Add', 'Sph-Far-R', 'Cyl-Far-R', 'Axis-Far-R', 'Sph-Close-R', 'Cyl-Close-R',
         'Axis-Close-R', 'Sph-Far-L', 'Cyl-Far-L', 'Axis-Far-L', 'Sph-Close-L', 'Cyl-Close-L', 'Axis-Close-L']]

    return dataset #.to_json(orient='index')