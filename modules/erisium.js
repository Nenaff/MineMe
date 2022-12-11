const axios = require("axios");
const parse = require("node-html-parser").parse;
const { parseFrenchDate } = require("../utils/dateParser");
const parser = require('any-date-parser');

module.exports = {
    id: "erisium",
    name: "Erisium",
    light: true,
    run: async function (username, id) {
        let profile = await axios.get(`https://erisium.com/player/${username}`, {
            validateStatus: () => true
        });
        if (profile.status === 200) {
            var root = parse(profile.data);
            let dates = root.querySelectorAll("[class^='RightSide_connection-info']");
            let first_joined = dates[0].text.split("jeu")[1];
            let last_online = dates[1].text.split("jeu")[1];
            return {
                profile_link: `https://erisium.com/player/${username}`,
                first_joined: parser.fromString(parseFrenchDate(first_joined), "fr").toGMTString(),
                last_online: parser.fromString(parseFrenchDate(last_online), "fr").toGMTString(),
            }
        }
    }
};
