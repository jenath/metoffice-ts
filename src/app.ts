import got from 'got'
import promptSync from 'prompt-sync';

const prompt = promptSync();

const userInput = prompt('Which city would you like to know the weather for?');
const key = '20751907-9a70-44f2-90f0-a5396c53437f';
const url = `http://datapoint.metoffice.gov.uk/public/data/val/wxfcs/all/json/sitelist?key=${key}`;
const json = await got.get(url).json() as SitelistResponse;

const locations = json.Locations.Location.map(location => ({ 
    name: location.name,
    id: location.id
}));

const chosen_city = locations.find(val => val.name === userInput)
const chosen_city_id = chosen_city?.id;

const url2 = `http://datapoint.metoffice.gov.uk/public/data/val/wxfcs/all/json/${chosen_city_id}?res=daily&key=${key}`;


const json2 = await got.get(url2).json() as WeatherResponse; 


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

// Weather interface

interface Param{
    name: string,
    units: string,
    $: string,
}

interface Period{
    type: string,
    value: string,
    Rep: Rep[],
}

interface Rep{
    D: string,
    Gn: string,
    Hn: string,
    PPd: string,
    S: string,
    V: string,
    Dm: string,
    FDm: string,
    W: string,
    U: string,
    $: string,
}

interface WeatherResponse{
    SiteRep: {
        Wx: {
            Param: Param[]
        },
        DV: {
            dataDate: string,
            type: string,
            Location: {
                i: string,
                lat: string,
                lon: string,
                name: string,
                country: string,
                continent: string,
                elevation: string,
                Period: Period[],
            },
        },
    },
}

console.log(json2);