if (!localStorage.getItem('isKnown'))
{
    console.log("New browser session detected.")
    localStorage.setItem('isKnown', true);

    var latlongdata = undefined;
    // I'll make this key public until it becomes an issue.
    localStorage.setItem('weatherApiKey', "d827b596805d5cb351ddbd8ac7bd71da");

    fetch('https://ipapi.co/json/')
        .then(response => response.json())
        .then(data => latlongdata = data)
        .then(function()
        {
            if (latlongdata)
            {
                localStorage.setItem('lat', latlongdata.latitude);
                localStorage.setItem('long', latlongdata.longitude);
            }
            else
            {
                localStorage.setItem('lat', 51.5074);
                localStorage.setItem('long', 0.1278);
            }
            getWeather();
        })
        .catch((error) => 
        {
            // TODO: Show some error
            console.error(error);
            localStorage.setItem('lat', 51.5074);
            localStorage.setItem('long', 0.1278);
            getWeather();
        })

}
else
{
    getWeather();
}

// Prevent clicks inside elements from changing particle colors
document.querySelector(".container").children.forEach(function(e){ e.addEventListener('click', function(f){ f.stopPropagation(); }) })