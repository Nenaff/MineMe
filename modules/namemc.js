const launchBrowser = require("../utils/puppeteer");
const UserAgent = require('user-agents');

module.exports = {
    id: "namemc",
    name: "NameMC",
    light: false,
    run: async function (username, id, uuid) {
        let browser = await launchBrowser();
        const page = await browser.newPage();
        await page.setUserAgent(new UserAgent().toString());
        await page.goto(`https://namemc.com/profile/${username}`);
        await page.waitForSelector('table.table');

        const usernames = await page.evaluate(() => {
            let result = [];
            let rows = document.querySelectorAll('table.table tr:not([class])');

            for (i = 0; i < rows.length; i++) {
                let row = rows[i];
                if (row.querySelector('a'))
                    result.push(`${row.querySelector('a').innerText} (${row.querySelector('time') ? row.querySelector('time').getAttribute('datetime') : "Original name"})`);
            }

            return result;
        });

        const bio = await page.evaluate(() => {
            let div = document.querySelector('.my-1+.row');
            if (!div || div.children[1].textContent.startsWith("\n")) {
                return "None";
            }
            return div.children[1].textContent;
        });

        const informations = await page.evaluate(() => {
            let result = [];
            let parent = document.querySelector('.col.d-flex.flex-wrap.justify-content-end.justify-content-lg-start');
            if (!parent) {
                return "None";
            }

            Array.from(parent.children).forEach(information => {
                let name = information.getAttribute('data-original-title') ? information.getAttribute('data-original-title') : information.getAttribute('title');
                let value = information.getAttribute('data-content') ? information.getAttribute('data-content') : information.getAttribute('href');
                result.push(`${name}: ${value}`);   
            });

            return result;
        });

        await page.close();
        await browser.close();

        return {
            profile_link: `https://namemc.com/profile/${username}`,
            bio: bio,
            informations: informations,
            usernames_history: usernames
        }
    }
};
