let axios = require('axios');

async function usernameFromUUID(uuid) {
    let url = "https://sessionserver.mojang.com/session/minecraft/profile/" + uuid;
    let response = await axios.get(url);
    let data = response.data;
    return data.name;
}

async function uuidFromUsername(username) {
    let url = "https://api.mojang.com/users/profiles/minecraft/" + username;
    let response = await axios.get(url);
    let data = response.data;
    return data.id;
}

function dashedIdFromId(trimmedId) {
    return trimmedId.substring(0, 8) + "-" + trimmedId.substring(8, 12) + "-" + trimmedId.substring(12, 16) + "-" + trimmedId.substring(16, 20) + "-" + trimmedId.substring(20);
}

module.exports = {
    usernameFromUUID,
    uuidFromUsername,
    dashedIdFromId
}