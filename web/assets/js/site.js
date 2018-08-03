function randomNumber(min, max)
{
    return Math.random() * (max - min) + min;
}

function startFire()
{
  var browserWidth = $(window).width();
  var smoke = $("#smoke");
  var numberOfSparks = browserWidth < 700 ? 50 : 50;
  for(i = 0; i < numberOfSparks; i++)
  {
    var smokeDelay = randomNumber(0, 30000);
    setTimeout(function()
    {
      var smokePos = (browserWidth < 700 ? randomNumber(5, 95) : randomNumber(25, 75)) + "%";
      var newSmoke = smoke.clone();
      newSmoke.css("left", smokePos);
      $("body").append(newSmoke);
    }, smokeDelay);  
  }
}

$(function()
{
  startFire();
});