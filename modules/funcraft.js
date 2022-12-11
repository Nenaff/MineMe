const axios = require("axios");
const parse = require("node-html-parser").parse;
const { parseFrenchDate } = require("../utils/dateParser");
const parser = require('any-date-parser');

module.exports = {
    id: "funcraft",
    name: "Funcraft",
    light: true,
    run: async function (username, id) {
        let profile = await axios.get(`https://www.funcraft.net/fr/joueurs?q=${username}`, {
            validateStatus: () => true
        });
        if (profile.request.res.responseUrl != `https://www.funcraft.net/fr/joueurs?q=${username}`) {
            var root = parse(profile.data);
            return {
                profile_link: `https://www.funcraft.net/fr/joueurs?q=${username}`,
                first_joined: parser.fromString(root.querySelectorAll(".info-entry span")[0].text, "fr").toLocaleString(),
                last_online: parseFrenchDate(root.querySelectorAll(".info-entry span")[1].text)
            }
        }
    }
};
