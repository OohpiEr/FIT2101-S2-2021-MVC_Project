const axios = require('axios');
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
    let countries = []
    for(let i = 0; i < response.data.Countries.length; i++)
    {
        let data = {
            Country: response.data.Countries[i].Country,
            TotalConfirmed: response.data.Countries[i].TotalConfirmed,
            TotalDeaths: response.data.Countries[i].TotalDeaths,
            NewConfirmed: response.data.Countries[i].NewConfirmed,
            NewDeaths: response.data.Countries[i].NewDeaths
        }
        countries.push(data)
    }
    return countries
}

// Sorts the countries from highest to lowest total Cases
export async function sortedByTotalCases(){
    let response = await fetchCountries()
    response.sort(function (a, b) {
        return b.TotalConfirmed - a.TotalConfirmed;
      });
    return response
}

// Sorts the countries from highest to lowest total deaths
 export async function sortedByTotalDeaths(){
    let response = await fetchCountries()
    response.sort(function (a, b) {
        return b.TotalDeaths - a.TotalDeaths;
      });
    return response
}

// Sorts the countries from highest to lowest new cases
 export async function sortedByNewCases(){
    let response = await fetchCountries()
    response.sort(function (a, b) {
        return b.NewConfirmed - a.NewConfirmed;
      });
    return response
}

// Sorts the countries from highest to lowest new deaths
 export async function sortedByNewDeaths(){
    let response = await fetchCountries()
    response.sort(function (a, b) {
        return b.NewDeaths - a.NewDeaths;
      });
    return response
}
// General world wide covid data summary
  export async function fetchGlobal()
{
    const response = await axios.get(`${url}/summary`);
    return response.data.Global;
}

/* 1) Global Data - Can be shown in a piechart Example: (WorldWide Deaths, Cases, New Deaths and New Cases)
   2) Most Total Deaths - 
   3) Most new Deaths (for the day)
   4) Most Total Cases
   5) Most new Cases (for the day)
   6) Least number of cases (for the day?)
*/
