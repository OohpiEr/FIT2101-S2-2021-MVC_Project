const axios = require('axios')
const url = 'https://api.covid19api.com';


// Get detailed covid data for a country (can be modified to include time intervals)
export async function fetchCountryData(country)
{
    const response = await axios.get(`${url}/total/country/${country}/status/confirmed`);
    return response.data;
      
}

// Function returns the cases and dates in an arrays
// the cases for date[i] corresponds to cases[i]
export async function fetchCountryCases(country)
{
    let response = await fetchCountryData(country);
    //console.log(response)
    let date = [];
    let cases = [];
    for(let i = 0; i < response.length; i++)
    {   
        date.push(response[i].Date);
        cases.push(response[i].Cases);
    }
    let data = {
        Cases: cases,
        Dates: date
    };
    return data
}

// Get general information for all the countries
export async function fetchCountries()
{
    const response = await axios.get(`${url}/summary`);
    return response.data.Countries;
}


// General world wide covid data summary
export async function fetchGlobal()
{
    const response = await axios.get(`${url}/summary`);
    return response.data.Global;
}