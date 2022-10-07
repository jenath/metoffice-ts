import got from 'got'
import promptSync from 'prompt-sync';

const prompt = promptSync();

const key = '20751907-9a70-44f2-90f0-a5396c53437f';
const id = '';
const url = `http://datapoint.metoffice.gov.uk/public/data/val/wxfcs/all/json/sitelist?key=${key}`;
const url2 = `http://datapoint.metoffice.gov.uk/public/data/val/wxfcs/all/json/${id}?res=daily&key=${key}`;

const json = await got.get(url).json() as SitelistResponse;
const locations = json.Locations.Location.map(location => ({ 
    name: location.name,
    id: location.id
}));

locations.find()
// const locationIds = json.Locations.Location.map(location => location.id);



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

// const userInput = prompt('Which city would you like to know the weather for?');