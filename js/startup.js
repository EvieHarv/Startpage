window.mobileCheck = function() {
    let check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
};

if (mobileCheck())
{
    document.body.innerHTML = '<div class="mobile">This page not supported on Mobile.<br><br>Return to <a href="https://www.EthanHarv.com">EthanHarv.com</a></div>'
    window.stop();
};

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

if (!localStorage.getItem('userLinks'))
{
    const defaultLinks = [
        {
            "order" : 0,
            "link" : "https://www.EthanHarv.com",
            "disp" : "img",
            "dispText" : "./imgs/Icon.png"
        },  
        {
            "order" : 1,
            "link" : "https://www.github.com/EthanHarv",
            "disp" : "img",
            "dispText" : "./imgs/Github.png"
        },
        {
            "order" : 2,
            "link" : "https://notion.so/",
            "disp" : "img",
            "dispText" : "./imgs/Notion.png"
        },
        {
            "order" : 3,
            "link" : "https://www.xkcd.com/",
            "disp" : "text",
            "dispText" : "xkcd"
        },
        {
            "order" : 4,
            "link" : "https://old.reddit.com/",
            "disp" : "img",
            "dispText" : "./imgs/Reddit.webp"
        },
        {
            "order" : 5,
            "link" : "https://news.ycombinator.com/",
            "disp" : "img",
            "dispText" : "./imgs/HN.png"
        },
        {
            "order" : 6,
            "link" : "https://www.youtube.com",
            "disp" : "img",
            "dispText" : "./imgs/Youtube.png"
        },
        {
            "order" : 7,
            "link" : "https://www.google.com",
            "disp" : "img",
            "dispText" : "./imgs/Google.png"
        }
    ]
    localStorage.setItem('userLinks', JSON.stringify(defaultLinks));

    buildCircles();
}
else
{
    buildCircles();
}

buildSettingsPanels();

// Prevent clicks inside elements from changing particle colors
document.querySelector(".container").children.forEach(function(e){ e.addEventListener('click', function(f){ f.stopPropagation(); }) })