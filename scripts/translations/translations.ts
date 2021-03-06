/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable no-restricted-syntax */
// Utils

const path = require('path');
const fs = require('fs');
const csv = require('csv');
const _ = require('lodash');
// Constants
const LANGUAGES = ['en-US', 'es', 'fr'];
const JSON_PATH = path.join(path.resolve('./'), 'public/locales/');
const CSV_PATH = path.join(
  path.resolve('./'),
  'scripts/translations/translations.csv',
);

const DELIMITER = '|';

function formatJsonObject(data) {
  const result = {};

  // Loop through each language
  for (const lang of LANGUAGES) {
    // Get keys for current language
    const keys = Object.keys(data[lang]) || [];

    // Loop through each key adding them to their respective translation object
    for (const key of keys) {
      result[key] = {
        ...result[key],
        [lang]: data[lang][key],
      };
    }
  }

  return result;
}

function readJsonFiles() {
  // console.log('readJsonFiles: Reading data from json files.')
  const data = {};

  try {
    // Get translation files
    for (const lang of LANGUAGES) {
      const filename = path.join(JSON_PATH, lang, 'translation.json');
      let translations;
      if (fs.existsSync(filename)) {
        translations = require(filename);
      } else {
        fs.writeFileSync(filename, '{}');
        translations = {};
      }

      data[lang] = translations;
    }
    return formatJsonObject(data);
  } catch (error) {
    console.log(`Error - readJsonFiles ${error}`);
    return null;
  }
}

async function readCSVFile() {
  // console.log('readCSVFile: Reading data from csv file.')
  const data = {};
  let langs;
  if (!fs.existsSync(CSV_PATH)) {
    fs.writeFileSync(CSV_PATH, '');
  }
  return new Promise((resolve) => {
    try {
      fs.createReadStream(CSV_PATH)
        .pipe(csv.parse({ delimiter: DELIMITER }))
        .on('data', (row) => {
          // set langs from the 1st line
          if (!langs) {
            langs = row.slice(1);
            return;
          }
          try {
            const key = row.shift();
            const rowData = {};
            row.forEach((val, index) => {
              rowData[langs[index]] = val;
            });
            data[key] = rowData;
          } catch (e) {
            console.log('readCSVFile error:', e.message);
          }
        })
        .on('end', () => {
          resolve(data);
        });
    } catch (e) {
      console.log('Read CSV file error:', e.message);
    }
  });
}

function exportCSV(data) {
  console.log('exportCSV: Exporting data to the CSV file.');
  // format
  const translations = [];
  const keys = Object.keys(data);
  const header = `key${DELIMITER}${LANGUAGES.join(DELIMITER)}`;
  translations.push(header);
  for (const key of keys) {
    const vals = [key];
    for (const lang of LANGUAGES) {
      vals.push(data[key][lang]);
    }
    translations.push(vals.join(DELIMITER));
  }

  fs.writeFileSync(path.join(CSV_PATH), translations.join('\n'));
}

function exportJSON(data) {
  console.log('exportJSON: Exporting data to json files.');
  const translations = {};
  const keys = Object.keys(data);
  for (const key of keys) {
    for (const lang of LANGUAGES) {
      translations[lang] = translations[lang] ?? {};
      translations[lang][key] = data[key][lang];
    }
  }

  // Write JSON file
  for (const lang of LANGUAGES) {
    fs.writeFileSync(
      path.join(JSON_PATH, lang, 'translation.json'),
      JSON.stringify(translations[lang], null, 2),
    );
  }
}

// Main
async function translationMain() {
  // read json files
  const jsonObject = readJsonFiles();

  // render CSV files
  const csvObject = await readCSVFile();

  // input command
  const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  readline.question(
    'Type:\n1 - Generate new translations,\n2 - Merge CSV to JSON files\n',
    (num) => {
      if (parseInt(num, 10) === 1) {
        // update JSON
        _.forEach(jsonObject, (obj, key) => {
          for (const lang of LANGUAGES) {
            if (!obj[lang]) {
              // eslint-disable-next-line no-param-reassign
              obj[lang] = obj['en-US'];
            }
          }
        });
        // update CSV
        const merged = _.merge(csvObject, jsonObject);

        // export to JSON
        exportJSON(merged);

        // export to CSV
        exportCSV(merged);

        console.log('Done');
      } else if (parseInt(num, 10) === 2) {
        // Merge JSON with CSV data
        const merged = _.merge(jsonObject, csvObject);
        exportJSON(merged);
        console.log('Done');
      } else {
        console.log('unknown command');
      }
      readline.close();
    },
  );
}

translationMain();
