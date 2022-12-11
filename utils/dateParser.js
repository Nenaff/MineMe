function parseFrenchDate(string) {
    string = string.toLowerCase();

    if (string.includes("il y a")) {
        string = string.toLowerCase().replace("il y a ", "");
        string += " ago";
    }

    let replacements = {
        " le ": "",
        "avant ": "",
        "secondes": "seconds",
        "seconde": "second",
        "années": "years",
        "année": "year",
        "ans": "years",
        "an": "year",
        "mois": "months",
        "mois": "months",
        "semaines": "weeks",
        "semaine": "week",
        "jours": "days",
        "jour": "day",
        "heures": "hours",
        "heure": "hour",
        "minutes": "minutes",
        "minute": "minute",
    }

    for (let key in replacements) {
        string = string.replace(key, replacements[key]);
    }

    return string;
}

module.exports = {
    parseFrenchDate
}