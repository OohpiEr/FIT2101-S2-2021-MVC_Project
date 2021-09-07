const axios = require('axios')
const url = 'https://api.covid19api.com';


// Get detailed covid data for a country (can be modified to include time intervals)
async function fetchCountryData(country){
    const response = await axios.get(`${url}/total/country/${country}/status/confirmed`);
    return response.data;
      
}

// Get general information for all the countries
async function fetchCountries(){
    const response = await axios.get(`${url}/summary`);
    return response.data.Countries;
}


// General world wide covid data summary
async function fetchGlobal(){
    const response = await axios.get(`${url}/summary`);
    return response.data.Global;
}

// test run    
async function run()
{   
    // testing the fetch functions
    let data = await fetchCountryData("France");
    console.log(data);
    //let data = await fetchCountries();
    //console.log(data);
}
run();