const args = require("args");
const mojang = require("./utils/mojang.js");
const fs = require("fs");
const parser = require('any-date-parser');

args.option("username", "Provides the minecraft account username")
  .option("id", "Provides the minecraft account UUID")
  .option("module", "Specify a single module to run")
  .option("light", "Only run light modules");

const flags = args.parse(process.argv);

if (!flags.username && !flags.id) {
  args.showHelp();
  process.exit();
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

console.log("[ Mojang API ]");

let id = flags.id;
let username = flags.username;
let single_module = flags.module;
let light = flags.light;

(id ? mojang.usernameFromUUID : mojang.uuidFromUsername)(id || username).then(async (data) => {
  if (!data) {
    console.log("Specified account does not exist. Exiting.");
    process.exit();
  }

  id ? username = data : id = data;
  let id_dashed = mojang.dashedIdFromId(id);

  console.log(`  > Username: ${username}`);
  console.log(`  > ID: ${id}`);
  console.log(`  > ID (dashed): ${id_dashed}`);

  let last_seen = {
    module: null,
    date: null
  };

  // iterate over all modules, run them one at a time
  let modules = fs.readdirSync("./modules");
  await Promise.all(modules.map(async module_path => {
    
    // require module
    let module = await require(`./modules/${module_path}`);

    // skip if flags are filtering out this module
    if (single_module && module.id !== single_module) return;
    if (light && module.light !== true) return;
    
    // run module and log results if any
    let result = await module.run(username, id, id_dashed);
    if (!result) return;

    let module_result = `\b[ ${module.name} ]`;
    Object.keys(result).forEach((key) => {

      // update last seen if there is a date
      if (key === "first_joined" || key === "last_online") {
        let date = parser.fromString(result[key]);
        if (!date.invalid) {
          // convert to the right time format if it's not already
          result[key] = result[key].match(/^\d{2}\/\d{2}\/\d{4}, \d{2}:\d{2}:\d{2}$/) ? result[key] : date.toLocaleString();
          // set last seen if it's the latest date
          if (!date.invalid && (!last_seen.date || last_seen.date < date.getTime())) {
            last_seen.date = date.getTime();
            last_seen.module = module.name;
          }
        }
      }

      module_result += "\n" + logResults(result[key], key);
    });
    console.log(module_result)
  }))

  if (last_seen.date && !single_module) {
    console.log(`\b[ Last seen ]`);
    console.log(logResults(new Date(last_seen.date).toLocaleString(), "last_seen"));
    console.log(logResults(last_seen.module, "module"));
  }
})

// this function is used to log the results of a module
// it recursively logs the results of an object
// so that arrays can be logged properly with indentation
function logResults(data, key, depth = 0) {
  let result = "  ".repeat(depth + 1)

  if (key) {
    key = capitalizeFirstLetter(key.replace(/_/g, " "));
    result += `> ${key}: `;
  }

  if (typeof data === "string") {
    result += data
  } else if (Array.isArray(data)) {
    data.forEach((element) => {
      result += "\n" + logResults("- " + element, null, depth + 1);
    });
  }

  return result;
}