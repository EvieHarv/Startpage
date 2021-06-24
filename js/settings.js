// Open the main settings panel
document.querySelector('.settings-button').addEventListener('click', function(e)
{
    openSettings();
});
function openSettings() {
    document.getElementById("settings-panel").style.width = "250px";
    document.getElementById("settings-panel").style.height = "185px";
};

// Close the main settings panel
document.querySelector('.settings-button-close').addEventListener('click', function(e)
{
    closeSettings();
});
function closeSettings() {
    // Hide Panel
    document.getElementById("settings-panel").style.width = "0";
    document.getElementById("settings-panel").style.height = "0";    
    // Reset all inner panels (after animation)
    setTimeout(function(){
        document.querySelector(".settings-panel-main").style.display = "block";
        document.querySelector(".settings-panel-links").style.display = "none";
        document.querySelector(".settings-panel-weather").style.display = "none";
        document.querySelector(".settings-panel-colors").style.display = "none";
    }, 350);
};

// Transition to Links page
document.querySelector('.settings-link-links').addEventListener('click', function(e)
{
    displayPanel('links', 750, 450);
});

// Transition to Weather page
document.querySelector('.settings-link-weather').addEventListener('click', function(e)
{
    displayPanel('weather', 500, 450);
});

// Transition to Colors page
document.querySelector('.settings-link-colors').addEventListener('click', function(e)
{
    displayPanel('colors', 500, 450);
});

function displayPanel(panel, width, height)
{
    document.getElementById("settings-panel").style.width = width + 'px';
    document.getElementById("settings-panel").style.height = height + 'px';
    document.querySelector(".settings-panel-main").style.display = "none";
    document.querySelector(".settings-panel-" + panel).style.display = "block";
}

function buildSettingsPanels()
{
    /////////////////////////
    ///////// Links /////////
    /////////////////////////
    const linksPanel = document.querySelector('.settings-panel-links-items');
    linksPanel.innerHTML = '';
    
    // Get all existing links
    const links = JSON.parse(localStorage.getItem('userLinks'));
    for (let i = 0; i < links.length; i++) {
        const link = links.filter(obj => {
            return obj.order === i;
        })[0];
        console.log(link)

        const displayImage = link['disp'] === "img" ? true : false;

        var linkItem = document.createElement("div");
        linkItem.classList.add('link-item');

        var sortHandle = document.createElement("span");
        sortHandle.classList.add('sorthandle');
        sortHandle.innerHTML = '≡';
        linkItem.appendChild(sortHandle);

        // Create form
        var form = document.createElement("form");

        // Link inputBox
        var formLink = document.createElement("input");
        formLink.classList.add('textbox'); formLink.classList.add('form-link');
        formLink.type = 'text';
        formLink.placeholder = 'Link';
        formLink.value = link.link;
        form.appendChild(formLink);

        // Display type checkbox ("Use Image:")
        form.append('Use Image:')
        var formCheckbox = document.createElement("input");
        formCheckbox.classList.add('checkbox'); formCheckbox.classList.add('form-display-type');
        formCheckbox.type = 'checkbox';
        if (displayImage)
        {
            formCheckbox.checked = true;
        }
        else
        {
            formCheckbox.checked = false;
        };
        form.appendChild(formCheckbox);
        
        // Display URL/Text
        var formDisplay = document.createElement("input");
        formDisplay.classList.add('textbox'); formDisplay.classList.add('form-display');
        formDisplay.type = 'text';
        formDisplay.value = link.dispText;
        if (displayImage)
        {
            formDisplay.placeholder = 'Image URL';
        }
        else
        {
            formDisplay.placeholder = 'Text';
        };
        form.appendChild(formDisplay);
        linkItem.appendChild(form);
        linksPanel.appendChild(linkItem);
    };

    $('.form-display-type').change(function() {
        if(this.checked) {
            console.log(this);
            $($(this).closest('form')[0]).find('.form-display')[0].placeholder = 'Image URL';
        }
        else {
            $($(this).closest('form')[0]).find('.form-display')[0].placeholder = 'Text';
        }
    });

    var el = document.querySelector('.settings-panel-links-items');
    var sortable = Sortable.create(el, {
        animation : 150,
        handle: '.sorthandle'
    });
    /////////////////////////
    //////// Weather ////////
    /////////////////////////
    const weatherPanel = document.querySelector('.settings-panel-weather-items');
    weatherPanel.innerHTML = '';


    /////////////////////////
    ///////// Color /////////
    /////////////////////////
    const colorPanel = document.querySelector('.settings-panel-colors-items');
    colorPanel.innerHTML = '';
};