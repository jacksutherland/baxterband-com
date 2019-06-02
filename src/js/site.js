var win;
var head;

function randomNumber(min, max)
{
    var rand = Math.random() * (max - min) + min;
    return Math.round(rand);
}

function startFire()
{
  var browserWidth = win.width();
  var smoke = $("#smoke");
  var numberOfSparks = browserWidth < 700 ? 15 : 80;
  for(i = 0; i < numberOfSparks; i++)
  {
    var smokeDelay = randomNumber(0, 30000);
    setTimeout(function()
    {
      //var smokeLeft = (browserWidth < 700 ? randomNumber(5, 95) : randomNumber(25, 75)) + "%";
      var smokeLeft = (browserWidth < 700 ? 50 : randomNumber(25, 75)) + "%";
      var smokeTop = win.scrollTop() + win.height();
      //console.log(smokeTop);
      if(smokeTop < 2200)
      {
        var newSmoke = smoke.clone();
        newSmoke.css({ "left": smokeLeft, "top": smokeTop }).addClass("smoke" + randomNumber(1, 3));
        $("body").append(newSmoke);
      }
    }, smokeDelay);  
  }
}

function checkWinPos(isOnScroll)
{
  if(win.scrollTop() === 0)
  {
    if(isOnScroll)
    {
      head.removeClass("not-at-top").addClass("at-top");
    }
  }
  if(win.scrollTop() > 100)
  {
    head.removeClass("at-top").addClass("not-at-top");
  }
}

function contactForm()
{
  $("#contact-form").submit(function()
  {
    var frm = $(this);
    var error = "";

    frm.find(".info").removeClass("is-error").text("");

    if($.trim(frm.find("[name=first]").val()) == "")
    {
      error = "First name is required";
    }
    else if($.trim(frm.find("[name=last]").val()) == "")
    {
      error = "Last name is required";
    }
    else if($.trim(frm.find("[name=phone]").val()) == "" && !frm.find("[name=email]").val().includes("@"))
    {
      error = "A valid phone number of email address is required";
    }

    if (error == "")
    {
      $.post("/php/mailer.php", frm.serialize()).done(function(data)
      {
        //console.log("done " + data + " " + (data == "success"));
        if(data == "success")
        {
          frm[0].reset();
          frm.find(".info").text("Message Sent. We will be in touch. Thank you.");
        }
        else
        {
          frm.find(".info").addClass("is-error").text("Error encountered. Please call us at 704-996-3439.");
        }
      });
    }
    else
    {
      frm.find(".info").addClass("is-error").text(error);
    }

    return false;
  });
}

$(function()
{
  win = $(window);
  head = $("header");

  startFire();
  checkWinPos();
  contactForm();

  win.scroll(function()
  {
    checkWinPos(true);
  });

  $("#main-menu a.jump-link").click(function(e)
  {
    e.preventDefault();
    var jump = $(this).attr('href');
    var new_position = jump == "#" ? 0 : ($(jump).offset().top - 100);
    $('html, body').stop().animate({ scrollTop: new_position }, 500);

    var gaUrl = jump == "#" ? '/' : ('/' + jump); 
    ga('set', 'page', gaUrl);
    ga('send', 'pageview');
  });

  $(".band-member").hover(function()
  {
    var rockstar = $(this);
    setTimeout(function()
    {
      if ($("#" + rockstar.attr("id") + ":hover").length>0)
      {
        rockstar.find(".band-member-bio").slideDown();
      }
    }, 250);
  },
  function()
  {
    $(this).find(".band-member-bio").slideUp();
  });

});