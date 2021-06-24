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

if (!localStorage.getItem('links'))
{
    const defaultLinks = [
        {
            "order" : 0,
            "link" : "https://www.EthanHarv.com",
            "disp" : "img",
            "img-type" : "url",
            "img-loc" : "./imgs/Icon.png"
        },  
        {
            "order" : 1,
            "link" : "https://www.github.com/EthanHarv",
            "disp" : "img",
            "img-type" : "url",
            "img-loc" : "./imgs/Github.png"
        },
        {
            "order" : 2,
            "link" : "https://notion.so/",
            "disp" : "img",
            "img-type" : "url",
            "img-loc" : "./imgs/Notion.png"
        },
        {
            "order" : 3,
            "link" : "https://www.xkcd.com/",
            "disp" : "text",
            "text" : "xkcd"
        },
        {
            "order" : 4,
            "link" : "https://old.reddit.com/",
            "disp" : "img",
            "img-type" : "url",
            "img-loc" : "./imgs/Reddit.webp"
        },
        {
            "order" : 5,
            "link" : "https://news.ycombinator.com/",
            "disp" : "img",
            "img-type" : "url",
            "img-loc" : "./imgs/HN.png"
        },
        {
            "order" : 6,
            "link" : "https://www.youtube.com",
            "disp" : "img",
            "img-type" : "url",
            "img-loc" : "./imgs/Youtube.png"
        },
        {
            "order" : 7,
            "link" : "https://www.google.com",
            "disp" : "img",
            "img-type" : "url",
            "img-loc" : "./imgs/Google.png"
        }
    ]
    localStorage.setItem('links', JSON.stringify(defaultLinks));

    buildCircles();
}
else
{
    buildCircles();
}

// Prevent clicks inside elements from changing particle colors
document.querySelector(".container").children.forEach(function(e){ e.addEventListener('click', function(f){ f.stopPropagation(); }) })