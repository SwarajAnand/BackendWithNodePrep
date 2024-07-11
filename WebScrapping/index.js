// const fetch = require('node-fetch');
const cheerio = require('cheerio');

fetch("https://www.naukri.com/it-jobs?src=gnbjobs_homepage_srch")
    .then((response) => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.text();
    })
    .then((data) => {
        const $ = cheerio.load(data);
        const jobs = $(".title");
        console.log(jobs.text());
    })
    .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
    });
