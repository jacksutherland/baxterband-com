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

      sendEvent("contact-form");
    }
    else
    {
      frm.find(".info").addClass("is-error").text(error);
    }

    return false;
  });
}

function goToSection(section, path, animate)
{
  var scrollTop = path == "/" ? 0 : ($(section).offset().top - 100);

  if(animate)
  {
    $('html, body').stop().animate({ scrollTop: scrollTop }, 500);
  }
  else
  {
    $('html, body').scrollTop(scrollTop);
  }
}

function sendPageView(path)
{
  //ga('set', 'page', path);
  //ga('send', 'pageview');

  gtag('config', 'UA-139848868-1', {'page_path': path});

}

function sendEvent(eventType)
{
  console.log("sendEvent " + eventType);
  switch(eventType)
  {
    case "hero-cta":
      //ga('send', 'event', 'Video', 'play', 'cats.mp4');
      ga("send", "event", "Contact", "CTA Link Clicked", "Hero CTA");
      //console.log("hero CTA event sent");
      // gtag('event', 'click', {
      //   'event_category': 'link-clicked',
      //   'event_label': 'Hero CTA'
      // });
      break;
    case "contact-form":
      //ga('send', 'event', 'Video', 'play', 'cats.mp4');
      ga("send", "event", "Contact", "Form Submitted", "Contact Form");
      //console.log("contact form event sent");
      break;
  }
}

$(function()
{
  win = $(window);
  head = $("header");

  checkWinPos();
  contactForm();

  // if(document.getElementsByTagName("body")[0].id == "homepage")
  // {
  //   startFire();
  // }

  if(window.location.pathname.indexOf("/sections/") !== -1)
  {
    var path = window.location.pathname;

    if(path[path.length -1] == "/")
    {
      path = path.substring(0, path.length - 1);
    }

    var link = $('a[href="' + path + '"]');
    var section = link.data("section");

    goToSection(section, path);
  }


  win.scroll(function()
  {
    checkWinPos(true);
  });

/*
  if(window.location.hash || win.scrollTop() > 50)
  {
    $(".sneaky").removeClass("sneaky");
  }
  else
  {
    var sneakyCounter = 0;
    $(".sneaky").each(function()
    {
      var sneaky = $(this);
      setTimeout(function()
      {
        sneaky.addClass("sneaky-show");
      }, (650 * sneakyCounter++));
    });
  }
*/

  window.onpopstate = function(event)
  {
    if(event.state != null && event.state.section != null && event.state.path != null)
    {
      goToSection(event.state.section, event.state.path);
      sendPageView(event.state.path);
    }
  }

  $("a.jump-link").click(function(e)
  {
    e.preventDefault();

    var link = $(this);
    var section = link.data("section");
    var path = link.attr("href");
    
    goToSection(section, path, true);
    sendPageView(path);

    if(link.hasClass("hero-cta"))
    {
      sendEvent("hero-cta");
    }

    window.history.pushState({ section: section, path: path }, null, path);
  });

  $(".band-member").hover(function()
  {
    var rockstar = $(this);
    setTimeout(function()
    {
      if ($("#" + rockstar.attr("id") + ":hover").length>0)
      {
        rockstar.find(".band-member-bio").slideDown();
        rockstar.find(".band-member-image").addClass("fadeout-image");
      }
    }, 250);
  },
  function()
  {
    var rockstar = $(this);
    rockstar.find(".band-member-bio").slideUp();
    rockstar.find(".band-member-image").removeClass("fadeout-image");
  });

});