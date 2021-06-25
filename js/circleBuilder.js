function buildCircles()
{
    // Remove any existing circles
    if (document.querySelector('.circle-orbit'))
    {
        document.querySelectorAll('.circle-orbit').forEach(function(e){ e.remove(); })
    }

    const links = JSON.parse(localStorage.getItem('userLinks'));

    var planetContainer = document.querySelector('.planet-container');
    planetContainer.style.setProperty('--m', links.length);

    for (let i = 0; i < links.length; i++) 
    {
        // Get by 'element.order' property to ensure proper ordering
        const props = links.filter(obj => {
            return obj.order === i;
          })[0];

        var orbit = document.createElement("a");
        orbit.classList.add('circle-orbit');
        orbit.style.setProperty('--i', i);
        if (props.link.match(/^https?:\/\//))
        {
            orbit.href = props.link;
        }
        else
        {
            orbit.href = "https://" + props.link;
        }

        var item = document.createElement("div");
        item.classList.add('circle-orbit');

        var circle = document.createElement("div");
        circle.classList.add('circle');



        if (props['disp'] === "img")
        {
            // Display as img thumbnail
            var img = document.createElement("img");
            if (props['dispText'].match(/^https?:\/\//) || props['dispText'][0] == '.')
            {
                img.src = props['dispText'];
            }
            else
            {
                img.src = "https://" + props['dispText'];
            }    
            
            circle.appendChild(img);
        }
        else
        {
            // Display as text
            var span = document.createElement("span");
            span.classList.add('plx-text');
            var text = document.createTextNode(props['dispText']);
            span.appendChild(text);

            circle.appendChild(span);
        }
        
        item.appendChild(circle);
        orbit.appendChild(item);

        planetContainer.appendChild(orbit);
    };

    VanillaTilt.init(document.querySelectorAll(".circle"), {
        glare : true,
        "max-glare" : 0.6
    });
}