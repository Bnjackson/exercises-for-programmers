"use strict";

async function fetchData() {
    try {
        const response = await fetch('http://api.open-notify.org/astros.json');
        const data = await response.json();
        return data;
    } catch (err) {
        console.log('Error fetching data', err);
    }
}

async function main() {
    let spaceCrewData;
    try {
        spaceCrewData = await fetchData();
    } catch (err) {
        console.log('Error importing data', err);
    }
    console.log(spaceCrewData);
}

main();