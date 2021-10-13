import * as covid_api from "./api.js";

/*
Since the api continuously changes I cant hardcode any values so I decided to instead test
the order of the countries since that's what the widgets display
*/
test('Countries must be sorted based on total confirmed cases', async () => {
    const data = await covid_api.sortedByTotalCases();
    let sorted_desc = true;
    let temp = data[0].TotalConfirmed;
    for(let i = 0; i < data.length; i++)
    {
        if(temp < data[i].TotalConfirmed)
        {   temp = data[i].TotalConfirmed;
            sorted_desc = false;
        }
    }
    expect(sorted_desc).toBe(true);
});

test('Countries must be sorted based on total deaths', async () => {
    const data = await covid_api.sortedByTotalDeaths();
    let sorted_desc = true;
    let temp = data[0].TotalDeaths;
    for(let i = 0; i < data.length; i++)
    {
        if(temp < data[i].TotalDeaths)
        {   temp = data[i].TotalDeaths;
            sorted_desc = false;
        }
    }
    expect(sorted_desc).toBe(true);
});
test('Countries must be sorted based on new cases', async () => {
    const data = await covid_api.sortedByNewCases();
    let sorted_desc = true;
    let temp = data[0].NewConfirmed;
    for(let i = 0; i < data.length; i++)
    {
        if(temp < data[i].NewConfirmed)
        {   temp = data[i].NewConfirmed;
            sorted_desc = false;
        }
    }
    expect(sorted_desc).toBe(true);
});

test('Countries must be sorted based on new deaths', async () => {
    const data = await covid_api.sortedByNewDeaths();
    let sorted_desc = true;
    let temp = data[0].NewDeaths;
    for(let i = 0; i < data.length; i++)
    {
        if(temp < data[i].NewDeaths)
        {   temp = data[i].NewDeaths;
            sorted_desc = false;
        }
    }
    expect(sorted_desc).toBe(true);
});