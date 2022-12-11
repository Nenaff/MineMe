const axios = require("axios");
const parse = require("node-html-parser").parse;

module.exports = {
    id: "pactify",
    name: "Pactify",
    light: true,
    run: async function (username, id) {
        let id_page = await axios.get(`https://www.pactify.fr/api/player/search`, {
            params: { name: username.toLowerCase() },
            headers: {
                authorization: 'Bearer b506d88fb3691c547397c12e0ec6550a',
                cookie: '_sid=184e28423ca.u8AvXsoDlSDmFk9Q'
            },
            validateStatus: () => true
        });
        if (id_page.status == 200 && id_page.data && Object.keys(id_page.data).length > 0) {
            let id = id_page.data.current;
            let profile = await axios.get(`https://www.pactify.fr/api/player/` + id, {
                headers: {
                    authorization: 'Bearer b506d88fb3691c547397c12e0ec6550a',
                    cookie: '_sid=184e28423ca.u8AvXsoDlSDmFk9Q'
                },
                validateStatus: () => true
            });

            return {
                profile_link: `https://www.pactify.fr/player/${id}`,
                first_joined: profile.data.registrationDate,
                last_online: profile.data.lastActivityDate,
            }
        }
    }
};
