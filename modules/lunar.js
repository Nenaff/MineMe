const axios = require("axios");
const parse = require("node-html-parser").parse;

module.exports = {
    id: "lunar",
    name: "LunarClient",
    light: true,
    run: async function (username, id) {
        let profile = await axios.get(`https://www.lunar.gg/u/${username}`, {
            validateStatus: () => true
        });
        if (profile.status === 200) {
            var root = parse(profile.data);
            return {
                profile_link: `https://www.lunar.gg/u/${username}`,
                country: root.querySelector(".flag").classNames.split("-")[1].toUpperCase(),
                last_online: new Date(parseInt(root.querySelector(".text time").getAttribute("datetime"))).toLocaleString(),
                first_joined: new Date(parseInt(root.querySelector(".statistics-item time").getAttribute("datetime"))).toLocaleString(),
            }
        }
    }
};
