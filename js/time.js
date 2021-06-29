function showTime(){
    var date = new Date();
    var h = date.getHours(); // 0 - 23
    var m = date.getMinutes(); // 0 - 59
    var s = date.getSeconds(); // 0 - 59

    var time = ("0" + h).substr(-2) + ":" + ("0" + m).substr(-2) + ":" + ("0" + s).substr(-2);

    // Allow selection by only updating when needed
    if (document.querySelector(".day").innerHTML !== date.toDateString())
    {
        document.querySelector(".day").innerHTML = date.toDateString();
    }
    document.querySelector(".clock").innerHTML = time;
    
    setTimeout(showTime, 1000);
    
}

showTime()