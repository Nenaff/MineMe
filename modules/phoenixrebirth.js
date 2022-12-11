const axios = require("axios");
const parse = require("node-html-parser").parse;
const { parseFrenchDate } = require("../utils/dateParser");

module.exports = {
    id: "phoenixrebirth",
    name: "PhoenixRebirth",
    light: true,
    run: async function (username, id, dashed_id) {
        let profile = await axios.get(`https://www.phoenix-rebirth.fr/stats/player/${dashed_id}`, {
            validateStatus: () => true
        });
        // get page title
        let title = profile.data.match(/<title>(.*?)<\/title>/)[1].toLowerCase();
        if (profile.status == 200 && title.includes(username.toLowerCase())) {
            var root = parse(profile.data);
            return {
                profile_link: `https://www.phoenix-rebirth.fr/stats/player/${dashed_id}`,
                last_online: parseFrenchDate("il y a " + root.querySelectorAll(".recap-stats")[0].structuredText.split("\n")[2].substring(1))
            }
        }
    }
};
