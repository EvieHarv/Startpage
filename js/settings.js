// I ALWAYS hit Ctrl+S even though I don't need to. This'll block the "save page" modal.
document.onkeydown = KeyPress;
function KeyPress(e) {
    var evtobj = window.event? event : e;
    if (evtobj.keyCode == 83 && evtobj.ctrlKey) { e.preventDefault(); };
};

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
    const links = JSON.parse(localStorage.getItem('userLinks'));
    displayPanel('links', 740, 60 + (44 * links.length));
});

// Transition to Weather page
document.querySelector('.settings-link-weather').addEventListener('click', function(e)
{
    displayPanel('weather', 500, 425);
});

// Transition to Colors page
document.querySelector('.settings-link-colors').addEventListener('click', function(e)
{
    displayPanel('colors', 250, 50);
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
        const link = getLinkByOrder(links, i);
        console.log(link);

        // Bool, do we use an image?
        const displayImage = link['disp'] === "img" ? true : false;

        // Container div
        var linkItem = document.createElement("div");
        linkItem.classList.add('link-item');
        linkItem.dataset.order = link.order; // used for ident. purposes
        var linkItemDelete = document.createElement("span");
        linkItemDelete.classList.add('link-item-delete');
        linkItemDelete.innerHTML = '&times;'; // ×
        linkItem.appendChild(linkItemDelete);

        // Handle
        var sortHandle = document.createElement("a");
        sortHandle.classList.add('sorthandle');
        sortHandle.href = '#';
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

        // Display type checkbox ("Use Image: [x]")
        form.append(' Use Image:')
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
        form.append(' ')
        
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

        // Append items
        linkItem.appendChild(form);
        linksPanel.appendChild(linkItem);
    };

    // Change placeholder text, depending on if it's a URL or Text input
    $('.form-link').on('input', function(e) { linkHandleLinkChanged(e); });
    $('.form-display-type').change(function(e) { linkHandleCheckboxCheck(e); });
    $('.form-display').on('input', function(e) { linkHandleDisplayChanged(e); });
    $('.link-item-delete').click(function(e) { linkHandleDeleteItem(e); });

    // Set up as sortableJS items
    var el = document.querySelector('.settings-panel-links-items');
    var sortable = Sortable.create(el, {
        animation : 150,
        handle: '.sorthandle',
        onEnd : function(e){ linkHandleDrag(e); }
    });

    /////////////////////////
    //////// Weather ////////
    /////////////////////////
    const weatherPanel = document.querySelector('.settings-panel-weather-items');
    $('#latitudeInput').val(localStorage.getItem('lat'));
    $('#longitudeInput').val(localStorage.getItem('long'));
    $('#apiKeyInput').val(localStorage.getItem('weatherApiKey'));

    $('#latitudeInput').on('input', function(e) { localStorage.setItem('lat', e.target.value.trim()); });
    $('#longitudeInput').on('input', function(e) { localStorage.setItem('long', e.target.value.trim()); });
    $('#apiKeyInput').on('input', function(e) { localStorage.setItem('weatherApiKey', e.target.value.trim()); });

    /////////////////////////
    ///////// Color /////////
    /////////////////////////
    const colorPanel = document.querySelector('.settings-panel-colors-items');
};

/////////////////////////////////
///////// Handle Events /////////
/////////////////////////////////

/////////////////////////
///////// Links /////////
/////////////////////////

function linkHandleCheckboxCheck(e)
{
    const target = e.target;
    const linkItem = $(target).closest('.link-item')[0];
    const links = JSON.parse(localStorage.getItem('userLinks'));
    const order = linkItem.dataset.order;
    const index = getIndexByOrder(links, order);
    
    if(target.checked) {
        $(linkItem).find('.form-display')[0].placeholder = 'Image URL';
        links[index].disp = "img";
    }
    else {
        $(linkItem).find('.form-display')[0].placeholder = 'Text';
        links[index].disp = "text";
    }

    localStorage.setItem('userLinks', JSON.stringify(links));
    buildCircles();
};

function linkHandleLinkChanged(e)
{
    const target = e.target;
    const linkItem = $(target).closest('.link-item')[0];
    const links = JSON.parse(localStorage.getItem('userLinks'));
    const order = linkItem.dataset.order;
    const index = getIndexByOrder(links, order);
    
    links[index].link = target.value;

    localStorage.setItem('userLinks', JSON.stringify(links));
    buildCircles();
}

function linkHandleDisplayChanged(e)
{
    const target = e.target;
    const linkItem = $(target).closest('.link-item')[0];
    const links = JSON.parse(localStorage.getItem('userLinks'));
    const order = linkItem.dataset.order;
    const index = getIndexByOrder(links, order);
    
    links[index].dispText = target.value;

    localStorage.setItem('userLinks', JSON.stringify(links));
    buildCircles();
}

function linkHandleDeleteItem(e)
{
    const target = e.target;
    const linkItem = $(target).closest('.link-item')[0];

    linkItem.remove();
    
    const links = buildArrayFromPage();
    
    displayPanel('links', 740, 60 + (44 * links.length));
    
    localStorage.setItem('userLinks', JSON.stringify(links));
    buildCircles();
}


$('#addNewLink').click(function(e){
    linkHandleAddItem(e);
});

function linkHandleAddItem(e)
{
    // Get current
    var links = buildArrayFromPage();
    // Add
    links.push(
    {
        order: links.length,
        link: '',
        disp: 'text',
        dispText: ''
    });

    // Widen panel
    displayPanel('links', 740, 60 + (44 * links.length));

    // Assign and build
    localStorage.setItem('userLinks', JSON.stringify(links));
    buildCircles();
    buildSettingsPanels();
}

function linkHandleDrag(e)
{    
    const links = buildArrayFromPage();

    localStorage.setItem('userLinks', JSON.stringify(links));
    buildCircles();
}



/// Helper Functions ///

function buildArrayFromPage()
{
    const links = [];
    $('.settings-panel-links-items').children().each(function(index, item){
        const order = index;
        const link = $(item).find('.form-link').val();
        const disp = $(item).find('.form-display-type')[0].checked ? "img" : "text";
        const dispText = $(item).find('.form-display').val();
        links.push({
            order : order,
            link : link,
            disp: disp,
            dispText : dispText
        });
    });
    return links;
}


function getLinkByOrder(links, order)
{
    const link = links.filter(obj => {
        return obj.order == order;
    })[0];
    return link;
}

function getIndexByOrder(links, order)
{
    const index = links.indexOf(getLinkByOrder(links, order));
    return index;
}