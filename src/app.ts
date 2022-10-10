import got from 'got'
import promptSync from 'prompt-sync';

const prompt = promptSync();

const userInput = prompt('Which city would you like to know the weather for?');

const key = '20751907-9a70-44f2-90f0-a5396c53437f';
let chosen_city_id;

const url = `http://datapoint.metoffice.gov.uk/public/data/val/wxfcs/all/json/sitelist?key=${key}`;
const url2 = `http://datapoint.metoffice.gov.uk/public/data/val/wxfcs/all/json/${chosen_city_id}?res=daily&key=${key}`;

const json = await got.get(url).json() as SitelistResponse;
// const json2 = await got.get(url2).json() as WeatherResponse; 

const locations = json.Locations.Location.map(location => ({ 
    name: location.name,
    id: location.id
}));


// Sitelist interface

interface Location{
    elevation: string,
    id: string,
    latitude: string,
    longitude: string,
    name: string,
    region: string,
    unitaryAuthArea: string,
}

interface SitelistResponse{
    Locations: {
        Location: Location[]
    }
}

locations.find(val => {
    if (val.name === userInput) {
        chosen_city_id = val.id;
    };
});


// Weather interface

// interface WeatherResponse{
//     DV
// }

