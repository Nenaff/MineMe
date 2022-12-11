const axios = require("axios");

module.exports = {
    id: "labymod",
    name: "LabyMod",
    light: true,
    run: async function (username, id) {
        let profile = await axios.get(`https://laby.net/api/v2/user/${id}/get-profile`, {
            validateStatus: () => true
        });
        if (profile.status === 200) {
            let profile = await axios.get(`https://laby.net/api/v2/user/${id}/get-profile`);
            let game_stats = await axios.get(`https://laby.net/api/user/${id}/get-game-stats`);
            let friends = await axios.get(`https://laby.net/api/v2/user/${id}/friends/hypixel`);
            return {
                profile_link: `https://laby.net/@${username}`,
                first_joined: game_stats.data.first_joined,
                last_online: game_stats.data.last_online ? game_stats.data.last_online : "(Hidden)",
                favorite_server: game_stats.data.most_played_server ? game_stats.data.most_played_server.nice_name : "(Hidden)",
                username_history: profile.data.username_history.map(
                    (username) =>
                        `${username.name} (${username.changed_at ? username.changed_at : "Original Name"})`
                ),
                hypixel_friends: friends.data.length == 0 ? "None" : friends.data.map(
                    (friend) =>
                        `${friend.user_name} (${friend.since})`
                ),
            };
        }
    }
};
