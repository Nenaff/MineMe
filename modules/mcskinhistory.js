const axios = require("axios");
const parse = require("node-html-parser").parse;

module.exports = {
    id: "mcskinhistory",
    name: "MCSkinHistory",
    light: true,
    run: async function (username, id) {
        let profile = await axios.get(`https://mcskinhistory.com/player/${id}`, {
            validateStatus: () => true
        });
        if (profile.status === 200) {
            var root = parse(profile.data);
            return {
                profile_link: `https://mcskinhistory.com/player/${id}`,
                username_history: root.querySelectorAll("tr").map(
                    (username) => {
                        let name = username.childNodes[3].text.replace(/\n/g, '');
                        let date = username.childNodes[5].text.replace(/\n/g, '');
                        return `${name} (${date != " " && date ? date : "Original Name"})`;
                    }
                )

            }
        }
    }
};
