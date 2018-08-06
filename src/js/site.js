function randomNumber(min, max)
{
    var rand = Math.random() * (max - min) + min;
    return Math.round(rand);
}

function startFire()
{
  var win = $(window);
  var browserWidth = win.width();
  var smoke = $("#smoke");
  var numberOfSparks = browserWidth < 700 ? 15 : 50;
  for(i = 0; i < numberOfSparks; i++)
  {
    var smokeDelay = randomNumber(0, 30000);
    setTimeout(function()
    {
      //var smokeLeft = (browserWidth < 700 ? randomNumber(5, 95) : randomNumber(25, 75)) + "%";
      var smokeLeft = (browserWidth < 700 ? 50 : randomNumber(25, 75)) + "%";
      var smokeTop = win.scrollTop() + win.height()
      var newSmoke = smoke.clone();
      console.log("smoke pos " + smokeLeft + " " + smokeTop);
      newSmoke.css({ "left": smokeLeft, "top": smokeTop }).addClass("smoke" + randomNumber(1, 3));
      $("body").append(newSmoke);
    }, smokeDelay);  
  }
}

$(function()
{
  startFire();
});