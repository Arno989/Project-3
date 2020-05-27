# To add a new cell, type '# %%'
# To add a new markdown cell, type '# %% [markdown]'
# %%
from IPython import get_ipython

# %%
get_ipython().run_line_magic("matplotlib", "inline")

import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import random
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report
from sklearn.metrics import confusion_matrix, accuracy_score
from sklearn.preprocessing import OneHotEncoder
from sklearn import preprocessing
from sklearn.preprocessing import LabelEncoder
from sklearn import linear_model
from sklearn.linear_model import LogisticRegression
from sklearn.decomposition import PCA
from sklearn.model_selection import GridSearchCV
from sklearn.model_selection import RandomizedSearchCV
from sklearn.preprocessing import MinMaxScaler

from sklearn.svm import SVC
from scipy import stats
from scipy.stats import randint
from scipy.stats import uniform
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.ensemble import BaggingClassifier
from sklearn.ensemble import AdaBoostClassifier

pd.set_option("display.max_rows", 1000)
pd.set_option("display.max_columns", 1000)


# %%
# import data
dataset_og = pd.read_excel("Data\Measurements_1.xlsx")
# kopie maken indien we iets van de originele data nodig hebben
dataset = dataset_og.copy()
dataset.head(5)


# %%
# og_column names: ['Externe ID', 'Geslacht', 'Geboortedatum', 'Oogmetingen/Datum', 'Oogmetingen/Sfr ver', 'Oogmetingen/Cyl ver', 'Oogmetingen/As ver', 'Oogmetingen/Add', 'Oogmetingen/Sfr dicht', 'Oogmetingen/Cyl dicht', 'Oogmetingen/As dicht', 'Oogmetingen/Sfr ver.1', 'Oogmetingen/Cyl ver.1', 'Oogmetingen/As ver.1', 'Oogmetingen/Add.1', 'Oogmetingen/Sfr dicht.1', 'Oogmetingen/Cyl dicht.1', 'Oogmetingen/As dicht.1']

# rename columns for easier working
# dont rename ['Externe ID', 'Geboortedatum'] for they will be replaced or yeeted
dataset.columns = [
    "Externe ID",
    "Sex",
    "Geboortedatum",
    "Measurement_Date",
    "Sph-Far-R",
    "Cyl-Far-R",
    "Axis-Far-R",
    "Add-R",
    "Sph-Close-R",
    "Cyl-Close-R",
    "Axis-Close-R",
    "Sph-Far-L",
    "Cyl-Far-L",
    "Axis-Far-L",
    "Add-L",
    "Sph-Close-L",
    "Cyl-Close-L",
    "Axis-Close-L",
]

# %% [markdown]
# ## Transpositie van oogmetingen voor correcte, uniforme data te verkrijgen
# op basis van: https://ophthalmictechnician.org/index.php/courses-2/ophthalmic-assistant-basic-training-course/140-spectacles-skills

# %%
# drop alle rijen waar enkel Nan waarden zitten (in subset)
dataset = dataset.dropna(
    thresh=1,
    subset=[
        "Sph-Far-R",
        "Cyl-Far-R",
        "Axis-Far-R",
        "Add-R",
        "Sph-Close-R",
        "Cyl-Close-R",
        "Axis-Close-R",
        "Sph-Far-L",
        "Cyl-Far-L",
        "Axis-Far-L",
        "Add-L",
        "Sph-Close-L",
        "Cyl-Close-L",
        "Axis-Close-L",
    ],
)


# %%
# controleren of een add.1 beschikbaar is en een add niet of omgekeerd en die dan aanvullen, als beide niet beschikbaar zijn 0 invoegen
values = {"Add-R": dataset["Add-L"]}
dataset = dataset.fillna(value=values)
values = {"Add-L": dataset["Add-R"]}
dataset = dataset.fillna(value=values)
values = {"Add-L": 0, "Add-R": 0}
dataset = dataset.fillna(value=values)


# %%
# sfr dicht = sfr ver + add
# sfr ver = sfr dicht - add
values = {
    "Sph-Close-R": dataset["Sph-Far-R"].add(dataset["Add-R"]),
    "Sph-Close-L": dataset["Sph-Far-L"].add(dataset["Add-L"]),
}
dataset = dataset.fillna(value=values)
values = {
    "Sph-Far-R": dataset["Sph-Close-R"].add(dataset["Add-R"]),
    "Sph-Far-L": dataset["Sph-Close-L"].add(dataset["Add-L"]),
}
dataset = dataset.fillna(value=values)


# %%
# cyl en as dicht  = cyl en as ver en vice versa
values = {
    "Cyl-Close-R": dataset["Cyl-Far-R"],
    "Axis-Close-R": dataset["Axis-Far-R"],
    "Cyl-Close-L": dataset["Cyl-Far-L"],
    "Axis-Close-L": dataset["Axis-Far-L"],
}
dataset = dataset.fillna(value=values)
values = {
    "Cyl-Far-R": dataset["Cyl-Close-R"],
    "Axis-Far-R": dataset["Axis-Close-R"],
    "Cyl-Far-L": dataset["Cyl-Close-L"],
    "Axis-Far-L": dataset["Axis-Close-L"],
}
dataset = dataset.fillna(value=values)


# %%
# fill overige NaN waardes met 0
values = {
    "Sph-Far-R": 0,
    "Cyl-Far-R": 0,
    "Axis-Far-R": 0,
    "Add-R": 0,
    "Sph-Close-R": 0,
    "Cyl-Close-R": 0,
    "Axis-Close-R": 0,
    "Sph-Far-L": 0,
    "Cyl-Far-L": 0,
    "Axis-Far-L": 0,
    "Add-L": 0,
    "Sph-Close-L": 0,
    "Cyl-Close-L": 0,
    "Axis-Close-L": 0,
}
dataset = dataset.fillna(value=values)


# %%
(
    dictSphFarR,
    dictCylFarR,
    dictAxisFarR,
    dictSphCloseR,
    dictCylCloseR,
    dictAxisCloseR,
    dictSphFarL,
    dictCylFarL,
    dictAxisFarL,
    dictSphCloseL,
    dictCylCloseL,
    dictAxisCloseL,
) = ({}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {})

for index, row in dataset.iterrows():
    if row["Cyl-Far-R"] < 0:
        SphFarR = row["Sph-Far-R"] + row["Cyl-Far-R"]
        CylFarR = row["Cyl-Far-R"] - 2 * row["Cyl-Far-R"]
        key = index
        dictSphFarR[key] = SphFarR
        dictCylFarR[key] = CylFarR
        if row["Axis-Far-R"] <= 90:
            dictAxisFarR[key] = row["Axis-Far-R"] + 90
        elif row["Axis-Far-R"] > 90:
            dictAxisFarR[key] = row["Axis-Far-R"] - 90
    if row["Cyl-Close-R"] < 0:
        SphCloseR = row["Sph-Close-R"] + row["Cyl-Close-R"]
        CylCloseR = row["Cyl-Close-R"] - 2 * row["Cyl-Close-R"]
        key = index
        dictSphCloseR[key] = SphCloseR
        dictCylCloseR[key] = CylCloseR
        if row["Axis-Close-R"] <= 90:
            dictAxisCloseR[key] = row["Axis-Close-R"] + 90
        elif row["Axis-Close-R"] > 90:
            dictAxisCloseR[key] = row["Axis-Close-R"] - 90
    if row["Cyl-Far-L"] < 0:
        SphFarL = row["Sph-Far-L"] + row["Cyl-Far-L"]
        CylFarL = row["Cyl-Far-L"] - 2 * row["Cyl-Far-L"]
        key = index
        dictSphFarL[key] = SphFarL
        dictCylFarL[key] = CylFarL
        if row["Axis-Far-L"] <= 90:
            dictAxisFarL[key] = row["Axis-Far-L"] + 90
        elif row["Axis-Far-L"] > 90:
            dictAxisFarL[key] = row["Axis-Far-L"] - 90
    if row["Cyl-Close-L"] < 0:
        SphCloseL = row["Sph-Close-L"] + row["Cyl-Close-L"]
        CylCloseL = row["Cyl-Close-L"] - 2 * row["Cyl-Close-L"]
        key = index
        dictSphCloseL[key] = SphCloseL
        dictCylCloseL[key] = CylCloseL
        if row["Axis-Close-L"] <= 90:
            dictAxisCloseL[key] = row["Axis-Close-L"] + 90
        elif row["Axis-Close-L"] > 90:
            dictAxisCloseL[key] = row["Axis-Close-L"] - 90

dataset["Sph-Far-R"].update(pd.Series(dictSphFarR))
dataset["Cyl-Far-R"].update(pd.Series(dictCylFarR))
dataset["Axis-Far-R"].update(pd.Series(dictAxisFarR))
dataset["Sph-Close-R"].update(pd.Series(dictSphCloseR))
dataset["Cyl-Close-R"].update(pd.Series(dictCylCloseR))
dataset["Axis-Close-R"].update(pd.Series(dictAxisCloseR))
dataset["Sph-Far-L"].update(pd.Series(dictSphFarL))
dataset["Cyl-Far-L"].update(pd.Series(dictCylFarL))
dataset["Axis-Far-L"].update(pd.Series(dictAxisFarL))
dataset["Sph-Close-L"].update(pd.Series(dictSphCloseL))
dataset["Cyl-Close-L"].update(pd.Series(dictCylCloseL))
dataset["Axis-Close-L"].update(pd.Series(dictAxisCloseL))

# %% [markdown]
# ## forward fill, Id's aanpassen, leeftijd berekenen, etc.

# %%dataset.shape


# %%
# forward fill toepassen voor alle records (omdat ze zo gemaakt zijn)
dataset = dataset.fillna(method="ffill")


# %%
# ID's omzetten naar 6-cijfer random getal om verbanden tussen patienten te vermeiden
dataset["ID"] = (
    dataset["Externe ID"]
    .astype("category")
    .cat.rename_categories(
        random.sample(range(100000, 1000000), dataset["Externe ID"].nunique())
    )
)
dataset = dataset.drop(columns=["Externe ID"])


# %%
print(dataset.shape)
dataset.head()


# %%
# replace geslacht met int en yeet de 'overige' zijn maar 257 records en kan vreemde verbanden geven
dataset[["Sex"]] = dataset[["Sex"]].replace({"Vrouw": 0, "Man": 1, "Overige": 2, 0: 2})
# dataset[['Sex']] = dataset[dataset['Sex'] < 2]


# %%
# zet de datums om naar datetime, n/a de out of bounds waarden en versnel het proces door het originele formaat te gebruiken
dataset[["Geboortedatum"]] = pd.to_datetime(
    dataset["Geboortedatum"], errors="coerce", infer_datetime_format=True
)
dataset[["Measurement_Date"]] = pd.to_datetime(
    dataset["Measurement_Date"], errors="coerce", infer_datetime_format=True
)

# drop de n/a waarden van vorige stap
dataset = dataset.dropna(subset=["Geboortedatum", "Measurement_Date"])


# %%
# Bereken leeftijd op moment van meting voor makkelijkere correlatie
dataset["Measurement_Age"] = (
    dataset["Measurement_Date"] - dataset["Geboortedatum"]
).astype("<m8[D]")

# drop data van 100+ leeftijd voor model niet te confusen (en natturlijk ook onder 0)
dataset = dataset[
    (dataset["Measurement_Age"] < 36500) & (dataset["Measurement_Age"] > 0)
]


# %%
# yeet deze kolommen want we hebben ze niet meer nodig
dataset = dataset.drop(columns=["Geboortedatum", "Measurement_Date"])
dataset.sort_values(by=["Measurement_Age"], ascending=False).head(5)


# %%
dataset = dataset.astype("float")


# %%
# Verwijderen van de uitschieters
dataset = dataset[(np.abs(stats.zscore(dataset)) < 3).all(axis=1)]


# %%
# reorder columns voor leesbaarheid
dataset["Add"] = dataset["Add-R"]
dataset = dataset[
    [
        "ID",
        "Sex",
        "Measurement_Age",
        "Add",
        "Sph-Far-R",
        "Cyl-Far-R",
        "Axis-Far-R",
        "Sph-Close-R",
        "Cyl-Close-R",
        "Axis-Close-R",
        "Sph-Far-L",
        "Cyl-Far-L",
        "Axis-Far-L",
        "Sph-Close-L",
        "Cyl-Close-L",
        "Axis-Close-L",
    ]
]
dataset.head(10)


# %%
# verdeling leeftijd
ax = sns.distplot(dataset['Measurement_Age'])


# %%
# Visualiseer de onderlinge correlatiecoëfficiënten
f, ax = plt.subplots(figsize=(10, 8))
corr = dataset.corr()
sns.heatmap(
    corr,
    mask=np.zeros_like(corr, dtype=np.bool),
    cmap=sns.diverging_palette(220, 10, as_cmap=True),
    square=True,
    ax=ax,
    annot=True,
)


# %%
# niet opnieuw runnen want duurt erg lang
# sns.pairplot(dataset)
#  plt.savefig('./Data/pairplot.png')


# %%
dataset.to_csv(
    "Data\Measurements-Transformed", index=False, index_label=False,
)


# %%
# occurrences of occurrences of ID's <---- 5 uur aan verspild
bitch = dict((x, len(dataset[dataset["ID"] == x])) for x in set(dataset["ID"]))
cunt = pd.DataFrame.from_records([bitch]).apply(pd.Series.value_counts, axis=1)


# recursively add higher amount records to lower amounts because these can be inclusive
cunt = cunt[cunt.columns.sort_values(ascending=False)]
recurse = 0
for c in cunt.columns:
    recurse += cunt[c][0]
    cunt[c][0] = recurse
cunt = cunt[cunt.columns.sort_values(ascending=True)]

# Make nice graph of top 5
plt.figure(figsize=(15, 10))
ax = sns.barplot(data=cunt[[*range(1, 6)]])
ax.set(xlabel="Occurences per ID", ylabel="Occurences of occurences")
for b in ax.patches:
    ax.annotate(
        format(b.get_height(), ".2f"),
        (b.get_x() + b.get_width() / 2.0, b.get_height()),
        ha="center",
        va="center",
        xytext=(0, 10),
        textcoords="offset points",
    )

