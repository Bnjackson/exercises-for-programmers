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

function sortCrewByCraft(crewData) {
    let crewSortedByCraft = {
        ISS : [],
        Tiangong : []
    }
    for (let i = 0; i < crewData.length; i++) {
        if (crewData[i]['craft'] === 'ISS') {
            crewSortedByCraft['ISS'].push(crewData[i]);
        } else if (crewData[i]['craft'] === 'Tiangong') {
            crewSortedByCraft['Tiangong'].push(crewData[i]);
        }

    }
    return crewSortedByCraft;
}

function sortCrewAlphabetically(crewData) {
    crewData.sort((a, b) => {
        const lastNameA = a.name.split(' ')[1];
        const lastNameB = b.name.split(' ')[1];
        return lastNameA.localeCompare(lastNameB);
    })
    return crewData;
}

async function main() {
    let spaceCrewData;
    try {
        spaceCrewData = await fetchData();
    } catch (err) {
        console.log('Error importing data', err);
    }
    const crewSortedAlphabetically = sortCrewAlphabetically(spaceCrewData.people);
    const crewSortedByCraft = sortCrewByCraft(crewSortedAlphabetically);
    console.log(`The number of people in space right now is ${spaceCrewData.number}`);
    console.table(crewSortedByCraft.ISS);
    console.table(crewSortedByCraft.Tiangong);
}

main();