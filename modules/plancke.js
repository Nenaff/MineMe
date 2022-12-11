const axios = require("axios");
const parse = require("node-html-parser").parse;

module.exports = {
    id: "plancke",
    name: "Plancke (Hypixel)",
    light: true,
    run: async function (username, id) {
        let profile = await axios.get(`https://plancke.io/hypixel/player/stats/${username}`, {
            validateStatus: () => true
        });
        if (profile.status === 200) {
            var root = parse(profile.data);
            let data = {};

            root.querySelectorAll(".card-box.m-b-10")[0].structuredText.split("\n").filter(b => b && b.includes(":")).forEach(text => {
                let split = text.split(": ")
                data[split[0].toLowerCase().replaceAll(" ", "_")] = split[1]
            });

            let status = root.querySelectorAll(".card-box.m-b-10 b");
            status = status[status.length - 1].text;

            let socials = root.querySelectorAll("[id^='social']");
            socials = socials.length > 0 ? socials.map(social_media => {
                let social = social_media.attributes.id.split("_")[1];
                let value = social_media.attributes.href;

                if (social === "DISCORD" && value == "javascript:void(0)") {
                    let match = profile.data.match(/swal\("[\w\s]+'s Discord",\s*"(.*)"\)/);
                    if (match) {
                        value = match[1];
                    }
                }

                return `${social}: ${value}`;
            }) : "None";

            return {
                profile_link: `https://plancke.io/hypixel/player/stats/${username}`,
                first_joined: data['first_login'],
                last_online: "last_login" in data ? data['last_login'] : "Unspecified",
                social_media: socials,
                status
            }
        }
    }
};
