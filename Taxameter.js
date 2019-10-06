/**
 * Skal have følgende felter
 * - turStartetTidspunkt: et dato objekt for hvornår turen er startet. 
 *   Hvis turen ikke er startet, er den undefined
 * - afstand: hvor langt taxaen har kørt i KM. Denne værdi sendes til scriptet
 *   udefra (i dette tilfælde fra funktionen start(Taxameter), som ligger i 
 *   library-mappen, og som er det script, der styrer applikationen).
 * 
 * Skal have følgende metoder/funktioner, som alle kaldes fra start.js
 * - startTur(): sætter turStartetTidspunkt til nuværende tidspunkt
 * - slutTur(): skal nulstille taxameteret 
 *   ved at  sætte turStartetTidspunkt til undefined og afstand til 0
 * - koer(delta_afst): skal tælle afstand op med det ekstra antal km, som
 *   bilen har kørt siden sidste beregning. 
 * - beregnPris(): skal returnere prisen beregnet udfra taxaselskabets prissætning
 */
class Taxameter {

    constructor(prisModel) {
        this.afstand = 0;
        this.turStartetTidspunkt = undefined;
        this.prisModel = prisModel;
    }

    startTur() {
        this.turStartetTidspunkt = new Date();
    }

    slutTur() {

        this.afstand = 0;
        this.turStartetTidspunkt = undefined;

    }

    koer(delta_afst) {

        this.afstand = this.afstand + delta_afst;

    }

    beregnPris() {
        return this.prisModel.beregnPris(this.afstand, this.turStartetTidspunkt);

    }

    firmaNavn() {
        return this.prisModel.firmaNavn();
    }

    prisModelNavn() {
        return this.prisModel.prisModelNavn();
    }


}

class TaxaPrisStorVogn {

    firmaNavn() {
        return "Taxa";
    }

    prisModelNavn() {
        return "Stor vogn";
    }

    beregnPris(afstand, turStartetTidspunkt) {
        const prisKm = 12 * afstand;
        const minutter = diff_minutes(new Date(), turStartetTidspunkt);
        const prisMinut = 6.67 * minutter;
        return prisKm + prisMinut + 69;

    }
}

class TaxaPris {

    firmaNavn() {
        return "Taxa";
    }

    prisModelNavn() {
        return "Normal vogn";
    }

    beregnPris(afstand, turStartetTidspunkt) {
        const afstandUnderEnKilometer = afstand;
        const afstandOverEnKilometer = 0;
        if (afstandUnderEnKilometer > 1) {
            afstandOverEnKilometer = afstand - 1;
            afstandUnderEnKilometer = 1;
        }

        const prisKm = 5 * afstandUnderEnKilometer + 9 * afstandOverEnKilometer;
        const minutter = diff_minutes(new Date(), turStartetTidspunkt);
        const prisMinut = 6.25 * minutter;
        return prisKm + prisMinut + 39;

    }
}
class CityBilPris {

    firmaNavn() {
        return "Citybilen";
    }

    prisModelNavn() {
        return "Normal vogn";
    }

    beregnPris(afstand, turStartetTidspunkt) {
        const prisKm = 4.50 * Math.ceil(afstand);
        const minutter = diff_minutes(new Date(), turStartetTidspunkt);
        const prisMinut = 7 * minutter;
        var pris = prisKm + prisMinut;
        if (pris < 75) {
            pris = 75;
        }
        return pris;
    }
}

class ElinRejserPris {

    firmaNavn() {
        return "Elin rejser";
    }

    prisModelNavn() {
        return "Normal vogn";
    }

    beregnPris(afstand, turStartetTidspunkt) {
        const cityBilPris = new CityBilPris().beregnPris(afstand, turStartetTidspunkt);
        const taxaPris = new TaxaPris().beregnPris(afstand, turStartetTidspunkt);
        const taxaPrisStorVogn = new TaxaPrisStorVogn().beregnPris(afstand, turStartetTidspunkt);
        var pris = cityBilPris;
        if (taxaPris < pris) {
            pris = taxaPris;
        }

        if (taxaPrisStorVogn < pris) {
            pris = taxaPrisStorVogn;
        }
        return pris;
    }
}


function diff_minutes(dt2, dt1) {
    if (!dt2 || !dt1) {
        return 0;
    }
    var diff = (dt2.getTime() - dt1.getTime()) / 1000;
    diff /= 60;
    return Math.abs(Math.round(diff));

}