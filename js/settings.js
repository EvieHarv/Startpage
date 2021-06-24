// Top-right settings button, open the panel.
document.querySelector('.settings-button').addEventListener('click', function(e)
{
    openSettings();
});
function openSettings() {
    document.getElementById("settings-panel").style.width = "250px";
    document.getElementById("settings-panel").style.height = "185px";
}

// Close the panel
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
    document.getElementById("settings-panel").style.width = "500px";
    document.getElementById("settings-panel").style.height = "450px";
    document.querySelector(".settings-panel-main").style.display = "none";
    document.querySelector(".settings-panel-links").style.display = "block";
});

// Transition to Weather page
document.querySelector('.settings-link-weather').addEventListener('click', function(e)
{
    document.getElementById("settings-panel").style.width = "500px";
    document.getElementById("settings-panel").style.height = "450px";
    document.querySelector(".settings-panel-main").style.display = "none";
    document.querySelector(".settings-panel-weather").style.display = "block";
})

// Transition to Colors page
document.querySelector('.settings-link-colors').addEventListener('click', function(e)
{
    document.getElementById("settings-panel").style.width = "500px";
    document.getElementById("settings-panel").style.height = "450px";
    document.querySelector(".settings-panel-main").style.display = "none";
    document.querySelector(".settings-panel-colors").style.display = "block";
})
