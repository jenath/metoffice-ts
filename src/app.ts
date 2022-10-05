import got from 'got'

const key = "20751907-9a70-44f2-90f0-a5396c53437f"
const url = `http://datapoint.metoffice.gov.uk/public/data/val/wxfcs/all/json/sitelist?key=${key}`

const json = await got.get(url).json()

console.log(JSON.stringify(json))
