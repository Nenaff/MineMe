const axios = require("axios");
const parse = require("node-html-parser").parse;
const { parseFrenchDate } = require("../utils/dateParser");
const parser = require('any-date-parser');

module.exports = {
    id: "rinaorc",
    name: "Rinaorc",
    light: true,
    run: async function (username, id) {
        let profile = await axios.get(`https://old.rinaorc.com/player/` + username, {
            maxRedirects: 0,
            validateStatus: () => true,
        });
        if (profile.status == 200) {
            var root = parse(profile.data);
            let first_joined = root.querySelectorAll("#stats h5")[1].text;
            return {
                profile_link: `https://old.rinaorc.com/player/${username}`,
                first_joined: parser.fromString(first_joined.startsWith("Avant") ? "1 " + parseFrenchDate(first_joined) : first_joined.replace("à ", "").replace("h", ":"), "fr").toGMTString(),
                last_online: parseFrenchDate(root.querySelectorAll("#stats h5")[0].text),
            }
        }
    }
};