const axios = require("axios");
const parse = require("node-html-parser").parse;
const { parseFrenchDate } = require("../utils/dateParser");
const parser = require('any-date-parser');

module.exports = {
    id: "nationsglory",
    name: "NationsGlory",
    light: true,
    run: async function (username, id, uuid) {
        let url = `https://nationsglory.fr/profile/${username}`;
        let profile = await axios.get(url, {
            validateStatus: () => true
        });

        if (profile.request.res.responseUrl == url) {
            var root = parse(profile.data);
            let text = root.querySelectorAll(".small.text-muted")[0].text.split("·");
            let first_joined = text[0].split("depuis le ")[1];
            first_joined = parser.fromString(first_joined.substring(0, first_joined.length - 1), "fr").toLocaleString();
            let last_online = parseFrenchDate(text[1].split("il y a ")[1] + " ago");
            return {
                profile_link: url,
                first_joined: first_joined,
                last_online: last_online,
                country: root.querySelector(".flag").classNames.split("-")[2].toUpperCase()
            }
        }
    }
};
