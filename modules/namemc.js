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
                result.push(`${row.querySelector('a').innerText} (${row.querySelector('time') ? row.querySelector('time').getAttribute('datetime') : "Original name"})`);
            }

            return result;
        });

        await page.close();
        await browser.close();

        return {
            profile_link: `https://namemc.com/profile/${username}`,
            usernames_history: usernames
        }
    }
};
