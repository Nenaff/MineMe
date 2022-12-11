const axios = require("axios");

module.exports = {
    id: "jartexnetwork",
    name: "JartexNetwork",
    light: true,
    run: async function (username, id) {
        let profile = await axios.get(`https://stats.jartexnetwork.com/api/profile/${username}`, {
            validateStatus: () => true
        });
        if (profile.status == 200) {
            return {
                profile_link: `https://stats.jartexnetwork.com/player/${username}`,
                last_online: new Date(profile.data.lastSeen).toLocaleString()
            }
        }
    }
};
