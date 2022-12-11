# MineMe

MineMe is a node tool that gathers information about a Minecraft account by scraping multiple websites.
It should be really easy to make your own modules, so don't hesitate to fork and bring your own things.

## 📦 Installation
To install and use MineMe, first clone the repository from GitHub:

`git clone https://github.com/Nenaff/MineMe.git`

Then navigate to the directory and run the following command to install the required dependencies:

`npm install`

## ⚙️ Usage
To use MineMe, run the following command:

    node mineme.js -u [username]
where [username] is the Minecraft account's username.

Alternatively, you can specify the account's unique identifier (UUID) using the -i flag:

    node mineme.js -i [uuid]

If you want to run a specific module, you can use the -m flag followed by the module's name:

    node mineme.js -m [module_name]

To run only "light" modules (i.e. modules that don't use heavy dependencies such as puppeteer), you can use the -l flag:

    node mineme.js -l

## 🛡️ How can I protect myself ?
That's a long process. The purpose of this tool is to demonstrate how open your Minecraft statistics are. If you really want to, check each website to see if you can log in with your account to make your data private. Or, feel free to send an email to all websites to request the removal of your data.

## ⚠️ Disclaimer
MineMe is intended for educational purposes only and is not affiliated with Minecraft or any of the websites it scrapes. If you're considering using it with bad intentions, don't. You'll get in trouble. Use at your own risk.