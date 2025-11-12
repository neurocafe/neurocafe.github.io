$(function() {
  var $window=$(window);
  $window.resize(function() {
    var top=0,
        left=0,
        width=$window.innerWidth(),
        height=$window.innerHeight();
    var xscale=width/1900;
    var yscale=height/1000;
    var scale=Math.min(xscale, yscale);
    $("#animcontainer").css("transform", "scale("+scale+")");
  }).resize();
});


$(window).load(function() {
  var frameInterval=225;
  var step=0;
  var fadeInText=function(container) {
    var i=0;
    container.find(">span").each(function() {
      var that=this;
      setTimeout(function() {
        if (container.hasClass("stepout")) {
          setTimeout(function() {
            $(that).css({opacity: 0, transition: frameInterval*2+"ms"});
          }, 5*frameInterval);
        }
        if (container.hasClass("stepout2")) {
          setTimeout(function() {
            $(that).css({opacity: 0, transition: frameInterval*2+"ms"});
          }, 8*frameInterval);
        }
        $(that).css({opacity: 1, transition: frameInterval+"ms"});
        if ($(that).hasClass("half")) {
          $(that).css({opacity: 1, transition: frameInterval*5+"ms"});
        }
        if ($(that).hasClass("edge")) {
          var html=$(that).html();
          var index=0;
          var cuttingEdgeInterval=setInterval(function() {
            htmlTarget="<u>"+html.substring(0,index)+"</u>"+html.substring(index);
            index++;
            $(that).html(htmlTarget);
            if (index>html.length)
              clearInterval(cuttingEdgeInterval);
          }, 100);
        }
        if ($(that).hasClass("rich")) {
          $(that).css({transform: "scale(1.4)", opacity: 0.5, transition: frameInterval*3+"ms"});
          setTimeout(function() {
            $(that).css({transform: "scale(1)", opacity: 1, transition: frameInterval*3+"ms"});
          }, frameInterval*3);
        }
        if ($(that).hasClass("revol")) {
          (function(that) {
          var html=$(that).html();
          var targetHtml="";
          for(var i=0;i<html.length;i++)
            targetHtml+="<span>"+html[i]+"</span>";
          $(that).html(targetHtml);
          var index=0;
          var cuttingEdgeInterval=setInterval(function() {
            //htmlTarget="<b>"+html.substring(0,index)+"</b>"+html.substring(index);
            $(that).find("span").eq(index).css({display: "inline-block", transform: "rotate(-15deg)", "transform-origin": "50% -100%", transition: frameInterval*2+"ms"});
            (function(index) {
            setTimeout(function() {
              $(that).find("span").eq(index).css({transform: "rotate(0)"});
            }, frameInterval*2);
            })(index);
            index++;
            //$(that).html(htmlTarget);
            if (index>html.length)
              clearInterval(cuttingEdgeInterval);
          }, 50);
          })(that);
        }
      }, i*frameInterval);
      if ($(that).hasClass("half"))
        i+=-0.3;
      if ($(that).hasClass("nopause"))
        i+=-1;
      if ($(that).hasClass("delay"))
        i+=4;
      if ($(that).hasClass("edge"))
        i+=0;//2;
      if ($(that).hasClass("rich"))
        i+=1;
      if ($(that).hasClass("revol"))
        i+=2;
      i++;
    });
  }
  var fadeOutText=function(container) {
    container.find(">span").css({opacity: 0, transition: 3*frameInterval+"ms"});
  }
  var animationInterval=setInterval(function() {
    var frame=animationSteps[step];
    for(var obj in frame) {
      if (obj=="duplicate") {
        var origObject=$("<div />", {"class": "clone"});
        for(var i=0;i<8;i++) {
          var clone=origObject.clone();
          clone.css("transform", frame[obj][i]).addClass("clone"+i);
          $(".dotcontainer2").after(clone);
        }
        continue;
      }
      var objStep=frame[obj];
      if (typeof(objStep.transition)=="undefined")
        objStep.transition=1;
      objStep.transition*=frameInterval;
      objStep.transition+="ms";
      $(obj).css(objStep);
    }
    var tstep=step-3;
    // Hopkins neuroscience begins
    if (tstep==1)
      fadeInText($('.text>li').eq(0));
    if (tstep==7)
      fadeOutText($('.text>li').eq(0));
    // with individual laboratories
    if (tstep==10)
      fadeInText($('.text>li').eq(1));
    if (tstep==15)
      fadeOutText($('.text>li').eq(1));
    // doing cutting edge science
    if (tstep==17)
      fadeInText($('.text>li').eq(2));
    if (tstep==24)
      fadeOutText($('.text>li').eq(2));
    // training students and postdoctoral fellows
    if (tstep==26)
      fadeInText($('.text>li').eq(3));
    if (tstep==38)
      fadeOutText($('.text>li').eq(3));
    // in a culture of rich interactions and collaborations
    if (tstep==37)
      fadeInText($('.text>li').eq(4));
    if (tstep==53)
      fadeOutText($('.text>li').eq(4));
    // at a university with world-renowned expertise in many fields
    if (tstep==53)
      fadeInText($('.text>li').eq(5));
    if (tstep==63)
      fadeOutText($('.text>li').eq(5));
    // that is revolutionizing interdisciplinary research
    if (tstep==66)
      fadeInText($('.text>li').eq(6));
    if (tstep==74)
      fadeOutText($('.text>li').eq(6));
    // to answer the big questions in neuroscience.
    if (tstep==76)
      fadeInText($('.text>li').eq(7));
    if (tstep==84)
      fadeOutText($('.text>li').eq(7));
    step++;
    if (step==animationSteps.length)
      clearInterval(animationInterval);
  }, frameInterval);
});


$(function() {
  $(".arrow>a").click(function(e) {
    e.preventDefault();
    $(this).blur();
    var top=$(window).innerHeight();
    $("html,body", window.top.document).animate({scrollTop: top}, 300);
  });
});