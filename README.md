# Taxameter.js
## En opgave i Strategy Pattern


### Opgave 1
Jeg har udfyldt de tomme funktioner og har implementeret prismodelen i beregnPris funktionen.


### Opgave 2
Jeg har oprettet ekstra .js og .html filer til krone-taxa-stor-vogn.

Jeg har flyttet beregningen af pris til en prismodel class som taxameter klassen bliver startet med og som bliver kaldt fra beregnPris.

Jeg har lavet to prismodeller til henholdsvis normal og stor vogn.


### Opgave 3
Jeg har lavet to nye filer til citybilen.js og .html.

Jeg har lavet en ny prismodel til citybilen. Prismodellen indeholder minimumspris og oprunding af kilometer.


### Opgave 4
Jeg har lavet om i kronetaxas primodel så den skelner mellem den første kilometer og de resterende.

Min ændring ligger under taxameter.js, hvor alle prismodellerne er defineret.


### Bonus opgave 1 (overkommelig)
Jeg har tilføjet metoderne firmaNavn og prisModelNavn til Taxameter klassen som kalder tilsvarende metoder i prismodellerne.


### Bonus opgave 2 (svær)
Jeg har tilføjet en ny kunde og en ny prismodel.

I prismodellen kalder jeg de tre andre prismodeller og vælger den billigste. 