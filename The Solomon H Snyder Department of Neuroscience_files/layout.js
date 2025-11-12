$(function() {
  var smallScreen=false;
  $(window).resize(function() {
    $(".autoheight").each(function() {
      if ($(window).innerWidth()<768 && $(this).hasClass("welcomecontainer"))
        return;
      if (!$("img", this).length)
	$(this).css("line-height", $(this).innerHeight()+"px");
      var $this=$(this);
      $("img", this).load(function() {
	var $img=$(this);
	$this.css("line-height", $img.innerHeight()+"px");
        $this.find(">.info").css("line-height", $img.innerHeight()+"px");
	setTimeout(function() {
          if (!$img.innerHeight())
            return;
	  $this.css("line-height", $img.innerHeight()+"px");
          $this.find(">.info").css("line-height", $img.innerHeight()+"px");
	}, 100);
        setTimeout(function() {
          if (!$img.innerHeight())
            return;
          $this.css("line-height", $img.innerHeight()+"px");
          $this.find(">.info").css("line-height", $img.innerHeight()+"px");
        }, 1000);
        setTimeout(function() {
          if (!$img.innerHeight())
            return;
          $this.css("line-height", $img.innerHeight()+"px");
          $this.find(">.info").css("line-height", $img.innerHeight()+"px");
        }, 2000);
      }).load();
    });
    $(".autoheightul2").each(function() {
      //if (!$(this).parent().find("img").length)
//	$(this).css("line-height", $(this).innerHeight()+"px");
      /*var $this=$(this);
      $(this).parent().find("img").unbind("load").load(function() {
	var $img=$(this);
        if (!$img.is(":visible"))
          return;
	$this.css("line-height", $img.innerHeight()+"px").css("height", $img.innerWidth()+"px");
	setTimeout(function() {
	  $this.css("line-height", $img.innerHeight()+"px").css("height", $img.innerWidth()+"px");
	}, 10);
      }).load();*/
      var $this=$(this);
      $this.css("line-height", $this.innerWidth()+"px");
      setTimeout(function() {
        $this.css("line-height", $this.innerWidth()+"px");
      }, 100);
    });
    
    if (smallScreen && $(window).innerWidth()>=768) {
      smallScreen=false;
      $("ul.hmembers>li>div.info").each(function(i) {
        var primary=i%2^(Math.floor(i/4)%2);
        if (primary)
          $(this).addClass("primary");
        else
          $(this).removeClass("primary");
      });
      if ($(".hhimg").length)
        $(".hhimg").after($("header>nav"));
      
      $(".search form button").off("click");
    } else if (!smallScreen && $(window).innerWidth()<768) {
      smallScreen=true;
      $("ul.hmembers>li>div.info").each(function(i) {
        var primary=i%2^(Math.floor(i/2)%2);
        if (primary)
          $(this).addClass("primary");
        else
          $(this).removeClass("primary");
      });
      if ($(".hhimg").length)
        $(".hhimg").before($("header>nav"));
      $(".search form button").click(function(e) {
        e.preventDefault();
        $(this).closest("form").find("input").toggle().focus();
        //$("header h1").toggle();
        $(".search form button").off("click");
        if ($(window).innerWidth()<768)
          $("header a.sologo").hide();
      });
    }

  }).resize();
  
  
  $(".hcity li").each(function() {
    var that=this;
    if ($(this).find(">img").length>1) {
      $(this).find(">img").wrap("<div class=\"imgshow\" />");
      $(this).find(".imgshow").css({position: "absolute", left: 0, top: 0, width: "100%", transition: "0.5s"});
      $(this).find(".imgshow").css({opacity: 0}).eq(0).css({opacity: 1}).clone().prependTo(this).removeClass("imgshow").css("position", "static").css("opacity", 0);
      var index=0;
      setInterval(function() {
        index++;
        index%=$(that).find(".imgshow").length;
        $(that).find(".imgshow").css({opacity: 0}).eq(index).css({opacity: 1});
      }, 5000);
    }
    if ($(this).find(".infocc").length>1) {
      var index2=0;
      setInterval(function() {
        index2++;
        index2%=$(that).find(".infocc").length;
        $(that).find(".infocc").hide().eq(index2).show();
      }, 5000);
    }
  });
  
  $(".welcomecontainer ul").each(function() {
    var that=this;
    if ($(this).find("li").length>1) {
      var index=0;
      setInterval(function() {
        index++;
        index%=$(that).find("li").length;
        $(that).find("li").css({opacity: 0}).eq(index).css({opacity: 1});
      }, 5000);
    }
  });
  
  $hmembers=$(".hmembers li");
  var showRandomItem=function() {
    var index=Math.floor(Math.random()*$hmembers.length);
    $hmembers.eq(index).toggleClass("hover");
    setTimeout(function() {
      $hmembers.eq(index).toggleClass("hover");
      
      setTimeout(showRandomItem, Math.random()*1000+250);
    }, Math.random()*2500+1000);
  }
  setTimeout(showRandomItem, 1000);

  

  
  $("input[type=checkbox]").change(function() {
    if ($(this).prop("checked"))
      $(this).parent().addClass("checked");
    else
      $(this).parent().removeClass("checked");
  }).change();
  
  $(".animation").each(function() {
    var dots=[];
    var dot=function() {
      var top=Math.floor(Math.random()*89+10);
      var left=Math.floor(Math.random()*98+1);
      var direction=Math.random()*Math.PI*2;
      var dot=$("<div />", {"class": "dot", css: {top: top+"%", left: left+"%"}});
      var x=0;
      var y=0;
      setTimeout(function() {
        dot.css("background", '#'+Math.floor(Math.random()*16777215).toString(16));
        x+=Math.cos(direction)*30;
        y+=Math.sin(direction)*30;
        dot.css("transform", "translate("+x+"px, "+y+"px)");
      }, 20);
      dot.data("interval", setInterval(function() {
        x+=Math.cos(direction)*30;
        y+=Math.sin(direction)*30;
        dot.css("transform", "translate("+x+"px, "+y+"px)");
      }, 900));
      return dot;
    }
    var i=0;
    var int=setInterval(function() {
      $(".animation .thankyou").css("opacity", "1");
      var ddot=dot();
      dots.push(ddot);
      $(".animation").append(ddot);
      if (i++==50)
        clearInterval(int);
    }, 200);
    
    $(window).load(function() {
      setTimeout(function() {
        clearInterval(int);
        for(var i in dots)
          clearInterval(dots[i].data("interval"));
        $(".animation").css("opacity", 0);
        $("html, body").scrollTop(0);
        setTimeout(function() { $(".animation").remove() }, 1000);
      }, 3000);
    });
    
  });
  
  
  /////// header 
  var $window=$(window);
  var $menu=$("header>nav");
  var menuPos=1000;
  $(window).load(function() {
    menuPos=$menu.offset().top;
    $(".headerspacer").css("height", $("header").innerHeight());
  });
  var isFixed=false;
  $window.scroll(function() {
    var top=$window.scrollTop();
    if (top>=menuPos-60-15 && !isFixed && $window.innerWidth()>=768) {
      isFixed=true;
      $("header, .headerspacer, .headerbg").addClass("fixed");
    } else if (top<menuPos-60-15 && isFixed) {
      isFixed=false;
      $("header, .headerspacer, .headerbg").removeClass("fixed");
    }

  }).scroll();
  setTimeout(function() {
    $window.scroll();
  }, 20);
  
  
  
  $(".hhimg .half>ul").each(function(k) {
    var index=0;
    var animation=0;
    var zindex=0;
    var bezierTiming=" cubic-bezier(0.000, 0.945, 0.995, 0.155)";
    var lis=$(">li", this);
    
    var animations=[function(el) {
      el.css({right: "auto", left: "0", width: "100%", top: "auto", bottom: 0, height: 0, transition: "0s"});
      el.find("img").css({top: "auto", bottom: 0, left: 0, right: 0});
      setTimeout(function() {
        el.css({height: "100%", width: "100%", left: 0, right: 0, transition: "1s"+bezierTiming});
      }, 20);
    }, function(el) {
      el.css({right: "auto", left: "0", width: "100%", bottom: "auto", top: 0, height: 0, transition: "0s"});
      el.find("img").css({bottom: "auto", top: 0, left: 0, right: 0});
      setTimeout(function() {
        el.css({height: "100%", width: "100%", left: 0, right: 0, transition: "1s"+bezierTiming});
      }, 20);
    }, function(el) {
      el.css({right: "auto", left: "100%", width: "100%", top: "0", bottom: 0, height: "100%", transition: "0s"});
      el.find("img").css({top: "auto", bottom: 0, left: "-100%", right: "auto", transition: "0s"});
      setTimeout(function() {
        el.css({height: "100%", width: "100%", left: 0, right: 0, transition: "1s"+bezierTiming});
        el.find("img").css({left: 0, transition: "1s"+bezierTiming});
      }, 20);
    }, function(el) {
      el.css({right: "100%", left: "auto", width: "100%", bottom: "0", top: 0, height: "100%", transition: "0s"});
      el.find("img").css({bottom: "auto", top: 0, left: "100%", right: "auto", transition: "0s"});
      setTimeout(function() {
        el.css({height: "100%", width: "100%", right: 0, transition: "1s"+bezierTiming});
        el.find("img").css({left: 0, transition: "1s"+bezierTiming});
      }, 20);
    }];
    
    var animate=function() {
      ++index;
      index%=lis.length;
      var li=lis.eq(index);
      var ic=li.find(".imgcont");
      li.css("z-index", ++zindex);
      if (zindex>2*lis.length) {
        zindex-=lis.length*2;
        lis.each(function(i) { $(this).css("z-index", $(this).css("z-index")-lis.length*2); });
      }
      
      (animations[animation ^ (k)])(ic);
      animation++
      animation%=animations.length;
      
    }
    
    if (k)
      setTimeout(function() { setInterval(animate, 2000); }, 1000);
    else
      setInterval(animate, 2000);
    
    $(".hhimg").addClass("anim");
    lis.first().css("z-index", ++zindex);
    $(">li>img", this).wrap("<div class=\"imgcont\">");
  });
  
  
  ///////// map
  
  $("[data-pins]").each(function() {

      var coords=JSON.parse($(this).attr("data-pins"));
      var firstPrimary=$(this).attr("data-hasfirst")*1;
      var minlatitude=maxlatitude=coords[0][0]*1;
      var minlongitude=maxlongitude=coords[0][1]*1;
      for(var i in coords) {
        minlatitude=minlatitude>(coords[i][0]*1)?coords[i][0]*1:minlatitude;
        maxlatitude=maxlatitude<(coords[i][0]*1)?coords[i][0]*1:maxlatitude;
        minlongitude=minlongitude>(coords[i][1]*1)?coords[i][1]*1:minlongitude;
        maxlongitude=maxlongitude<(coords[i][1]*1)?coords[i][1]*1:maxlongitude;
      }
      var latitude=(minlatitude+maxlatitude)/2;
      var longitude=(minlongitude+maxlongitude)/2;
      latitude=39.30452325; longitude=-76.62109885;
      var zoom=13;
      if ($(window).innerWidth()<768) {
        zoom=12;
        if (firstPrimary)
          firstPrimary=2;
      }
      if (coords.length>10)
        zoom=9;
      var mapOptions = {
        zoom: zoom,
        panControl: false,
        zoomControl: true,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        overviewMapControl: false,
        scrollwheel: false,
        draggable: !(('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0)),
        center: new google.maps.LatLng(latitude, longitude),
        mapTypeId: google.maps.MapTypeId.ROADMAP//,
      }
      window.contactmap=contactmap = new google.maps.Map(this, mapOptions);
      
      contactmap.markerIcon=new google.maps.MarkerImage('/bundles/jhopkins/img/mappin.png',
        new google.maps.Size(23, 31),
        new google.maps.Point(0, 0),
        new google.maps.Point(11, 31));
      
      contactmap.markerIcon2=new google.maps.MarkerImage('/bundles/jhopkins/img/mappin-university.png',
        new google.maps.Size(43, 58),
        new google.maps.Point(0, 0),
        new google.maps.Point(21, 58));
      
      contactmap.markers=[];
      for(var i in coords) {
        contactmap.markers.push(
          new google.maps.Marker({
            map: contactmap,
            position: new google.maps.LatLng(coords[i][0]*1, coords[i][1]*1),
            icon: (i*1||!firstPrimary?contactmap.markerIcon:contactmap.markerIcon2)
          })
        );
        if (coords[i].length>=5)
          contactmap.markers[contactmap.markers.length-1].categoryId=coords[i][4];
      }
      
      contactmap.boxes=[];
      
      for(var i in coords) {
        var link="https://maps.google.com/?q=loc:"+coords[i][0]+"%20"+coords[i][1];
        link="https://www.google.com/maps/place//@"+coords[i][0]+","+coords[i][1]+",16z";
        var options= {
          content: "<span></span><div><h5>"+(coords[i][5]?"<a href=\""+coords[i][5]+"\" target=\"_blank\">":"<a>")+coords[i][2]+"</a></h5><br />"+coords[i][3]+"<br /><br /><a href=\""+link+"\" target=\"_blank\">Open in maps</a></div>",
          maxWidth: 240,
          pixelOffset: new google.maps.Size(-100, i*1?-45:-85),
          alignBottom: true,
          boxStyle: { 
            overflow: "show",
          },
          closeBoxMargin: "0",
          infoBoxClearance: new google.maps.Size(1, 1)
        }
        if (coords[i].length>=7) {
          options.content=options.content.replace("<span></span>", "<span></span><img class=\"img\" src=\""+coords[i][6]+"\">");
          options.maxwidth=350;
        }
        contactmap.boxes.push(new InfoBox(options));
        (function(i) {
          google.maps.event.addListener(contactmap.markers[i], "click", function() {
            for(k in contactmap.boxes)
              contactmap.boxes[k].close(contactmap, contactmap.markers[k]);
            contactmap.boxes[i].open(contactmap, contactmap.markers[i]);
          });
          $("[data-pinopen="+i+"]").click(function(e) {
            e.preventDefault();
            for(k in contactmap.boxes)
              contactmap.boxes[k].close(contactmap, contactmap.markers[k]);
            contactmap.boxes[i].open(contactmap, contactmap.markers[i]);
            $("html,body").animate({scrollTop: 0}, 400);
          });
        })(i);
      }
      
      if (firstPrimary==1)
        contactmap.boxes[0].open(contactmap, contactmap.markers[0]);
    
  });
  
  $(".mapfilterc>a").click(function(e) { e.preventDefault();
    $(this).closest(".mapfilterc").addClass("hover");
  });
  $(".mapfilterc ul a").click(function(e) {
    e.preventDefault();
    $(this).closest(".mapfilterc").removeClass("hover");
    var id=$(this).attr("data-id");
    if (id)
      $(".mapfilterc>a").html($(this).html());
    else
      $(".mapfilterc>a").html("Explore");
    $(".mapfilterc li").removeClass("active");
    $(this).closest("li").addClass("active");
    
    var coords2=JSON.parse($("[data-pins]").attr("data-pins"));
    var coords=[];
    for(var i in coords2)
      if (coords2[i][4]==id)
        coords.push(coords2[i]);

    for(var i in contactmap.boxes)
      contactmap.boxes[i].close(contactmap);
    for(var i in contactmap.markers) {
      var marker=contactmap.markers[i];
      marker.setVisible(marker.categoryId==id*1 || id=="");
    }
    if (!id) {
      contactmap.panTo(new google.maps.LatLng(39.2016307, -77.0305566));
      contactmap.setZoom(10);
    } else {
      if (coords.length) {
        var bounds = new google.maps.LatLngBounds();
        for(i=0;i<coords.length;i++) {
        bounds.extend(new google.maps.LatLng(coords[i][0], coords[i][1]));
        }
        if (coords.length==1) {
          contactmap.panTo(new google.maps.LatLng(coords[0][0], coords[0][1]));
          contactmap.setZoom(13);
        } else
          contactmap.fitBounds(bounds);
      }
    }
    contactmap.addListener("click", function() {
      $(".mapfilterc").removeClass("hover");
    });
      
  });
  
  $("a[data-zoom]").click(function(e) {
    e.preventDefault();
    $(this).closest("li").find(".zoom").fadeIn();
  });
  $(".zoom a.close").click(function(e) {
    e.preventDefault();
    $(this).closest(".zoom").fadeOut();
  });
  
  
  $(".ctabs .tabcaps a").click(function(e) {
    e.preventDefault();
    var tablinks=$(".ctabs .tabcaps a");
    var index=tablinks.index(this);
    $(".ctabs .tabcaps li").removeClass("active").eq(index).addClass("active");
    $(".ctabs .tabcontent li").removeClass("active").eq(index).addClass("active");
    if (!$(".ctabs .tabcontent li").length) {
      $("html,body").animate({scrollTop: $("a[name='"+this.href.split("#")[1]+"']").offset().top-140+"px"}, 300);
    }
  });
  $("body").click(function(e) {
    //$(".filters>.shown").removeClass("shown");
  });
  $(".filters a").click(function(e) {
    e.preventDefault();
  });
  $(".filters>div>a").click(function(e) {
    $(this).closest("div").toggleClass("shown").toggleClass("notshown");
    e.stopPropagation();
  });
  $(".filters .ddlist a").click(function(e) {
    $(this).closest("div.shown").removeClass("shown");
  });
  var boxcolors=["yellow", "violet", "teal", "blue", "blue", "teal", "violet", "yellow"];
  $(".filters .faculty ul a").click(function(e) {
    e.preventDefault();
    var $all=$(".filters .faculty ul a");
    var $allli=$(".filters .faculty li");
    var index=$all.index(this);
    if (index) {
      $allli.eq(0).removeClass("selected");
      $allli.eq(index).toggleClass("selected");
      var types={};
      $allli.each(function(i) {
        if ($(this).hasClass("selected"))
          types[$all.eq(i).html().trim()]=true;
      });
      $(".facultylist>li").each(function(e) {
        if (typeof(types[$(this).attr("data-type")])!="undefined") 
          $(this).removeClass("hiddenfaculty");
        else
          $(this).addClass("hiddenfaculty");
      });
      var i=0;
      $(".facultylist>li").each(function() {
        if ($(this).hasClass("hiddenresearch") || $(this).hasClass("hiddenfaculty"))
          return;
        if (i%2)
          $(this).css("clear", "");
        else
          $(this).css("clear", "left");
        if (i++%4<2)
          $(this).addClass("right");
        else
          $(this).removeClass("right");
        $(this).removeClass("colyellow colviolet colteal colblue").addClass("col"+boxcolors[(i-1)%8]);
      });
    } else {
      $(".facultylist>li").removeClass("hiddenfaculty");
      $(".facultylist>li").each(function(i) {
        if (i%2)
          $(this).css("clear", "");
        else
          $(this).css("clear", "left");
        if (i%4<2)
          $(this).addClass("right");
        else
          $(this).removeClass("right");
        $(this).removeClass("colyellow colviolet colteal colblue").addClass("col"+boxcolors[i%8]);
      });
      $allli.removeClass("selected");
      $(this).closest("li").addClass("selected");
    }
  });
  $(".filters .research ul a").click(function(e) {
    e.preventDefault();
    var $all=$(".filters .research ul a");
    var $allli=$(".filters .research li");
    var index=$all.index(this);
    if (index) {
      $allli.eq(0).removeClass("selected");
      $allli.eq(index).toggleClass("selected");
      var areas={};
      $allli.each(function(i) {
        if ($(this).hasClass("selected"))
          areas[$all.eq(i).attr("data-id")]=true;
      });
      $(".facultylist>li").each(function(e) {
        var iareas=$(this).attr("data-areas").split(",");
        var found=false;
        for(var i in iareas)
          if (typeof(areas[iareas[i]])!="undefined")
            found=true;
        if (found) 
          $(this).removeClass("hiddenresearch");
        else
          $(this).addClass("hiddenresearch");
      });
    } else {
      $(".facultylist>li").removeClass("hiddenresearch");
      $allli.removeClass("selected");
      $(this).closest("li").addClass("selected");
    }
    var i=0;
    $(".facultylist>li").each(function() {
      if ($(this).hasClass("hiddenresearch") || $(this).hasClass("hiddenfaculty"))
        return;
      if (i%2)
        $(this).css("clear", "");
      else
        $(this).css("clear", "left");
      if (i++%4<2)
        $(this).addClass("right");
      else
        $(this).removeClass("right");
      $(this).removeClass("colyellow colviolet colteal colblue").addClass("col"+boxcolors[(i-1)%8]);
    });
  });
  $(".filter.directory>a").click(function(e) {
    e.preventDefault();
  });
  $(".filter.directory ul a").click(function(e) {
    e.preventDefault();
    var index=$(".filter.directory ul a").index(this);
    var $lis=$(".filter.directory ul li");
    $lis.removeClass("selected").eq(index).addClass("selected");
    var type=$(this).attr("data-type");
    $(".filter.directory a.filter").html($(this).html());
    $(".fulldir tr").each(function() {
      if ($(this).attr("data-type")==type || !type)
        $(this).show();
      else
        $(this).hide();
    });
  });
  $(".collapselnk").click(function(e) {
    e.preventDefault();
    $(this).toggleClass("closed");
    $(this).next(".collapsecont").slideToggle();
  });
  
  $("figcaption>img, figcaption>iframe").each(function() {
    $(this).closest("figure").prepend(this);
  });
  var resizeEmbeds=function() {
    $("figure>iframe").each(function() {
    var width=$(this).parent().innerWidth();
    if (width>800) width=800;
    $(this).css("max-width", "800px").css("width", "100%").css("height", Math.round(width/16.0*9)+"px");
    });
  };
  $(window).resize(resizeEmbeds).load(resizeEmbeds).resize();
  $("p>a>i.top").closest("a").click(function(e) {
    e.preventDefault();
    $("body,html").animate({scrollTop: 0}, 300);
  });

  
  $("a.tw").click(function(e) {
    if ($(this).hasClass("noshare")) return true;
    e.preventDefault();
    var loc=encodeURIComponent(location.href);
    var title=encodeURIComponent(document.title);
    if ($(this).attr("data-sharelink"))
      loc=$(this).attr("data-sharelink");
    if ($(this).attr("data-sharetitle"))
      title=$(this).attr("data-sharetitle");
    window.open("https://twitter.com/intent/tweet?url="+loc+"&text="+title, "_blank", "width=600,height=300");
  });
  $("a.fb").click(function(e) {
    if ($(this).hasClass("noshare")) return true;
    e.preventDefault();
    var loc=encodeURIComponent(location.href);
    var title=encodeURIComponent(document.title);
    if ($(this).attr("data-sharelink"))
      loc=$(this).attr("data-sharelink");
    if ($(this).attr("data-sharetitle"))
      title=$(this).attr("data-sharetitle");
    window.open("https://www.facebook.com/sharer/sharer.php?u="+loc+"&t="+title, "_blank", "width=600,height=300");
  });
  
  
  $("header nav>ul>li>a").click(function(e) {
    if ($(window).innerWidth()>=768)
      return;
    if ($(this).hasClass("toggled"))
      return;
    if ($(this).closest("li").find(">div").length==0)
      return;
    e.preventDefault();
    $("header nav>ul>li").removeClass("toggled");
    $(this).closest("li").toggleClass("toggled");
  });
  
  
  $(".mobilemenu a").click(function(e) {
    e.preventDefault();
    $("header nav>ul").toggleClass("shown");
  });

  //if (false)
  $("a[href]").each(function() {
    var href=$(this).attr("href");
    if (href.indexOf("http")==0 && href.indexOf(location.host)==-1)
      $(this).attr("target", "_blank");
    //else
      //$(this).attr("target", "_self");
  });
  
  var quicksearchupdate=function(e) {
    if (typeof(e.keyCode)!="undefined") {
      if (e.keyCode==13)
        $(this).blur();
    }
    var value=$(this).val().toLowerCase();
    var xvalue=value.split(" ");
    var hasFound=false;
    $("[data-quicksearch]").each(function() {
      var html=$(this).html().toLowerCase();
      var found=true;
      if (!value)
        found=true;
      else
        for(var i in xvalue)
          if (html.indexOf(xvalue[i])==-1)
            found=false;
      if (found) hasFound=true;
      if (found)
        $(this).show();
      else
        $(this).hide();
    });
    if (!hasFound)
      $(".content").eq(0).each(function() {
        $(this).find("h2").html("Sorry nothing found");
        $(this).find(".subtitle").html("Please try your search again");
      });
    else
      $(".content").eq(0).each(function() {
        $(this).find("h2").html($(this).find("h2").attr("data-html"));
        $(this).find(".subtitle").html($(this).find(".subtitle").attr("data-html"));
      });
    var i=0;
    $(".facultylist>li").each(function() {
      
      if (!$(this).is(":visible"))
        return;
      if (i%2)
        $(this).css("clear", "");
      else
        $(this).css("clear", "left");
      if (i++%4<2)
        $(this).addClass("right");
      else
        $(this).removeClass("right");
      $(this).removeClass("colyellow colviolet colteal colblue").addClass("col"+boxcolors[(i-1)%8]);
    });
    i=0;
    $(".fulldir tr[data-quicksearch]").each(function() {
      if (!$(this).is(":visible"))
        return;
      if (i++%2)
        $(this).css("clear", "none");
      else
        $(this).css("clear", "left");
    });

  };
  $("form[data-qsform]").submit(function(e) {
    e.preventDefault();
  }).find("input").change(quicksearchupdate).keyup(quicksearchupdate);
  $(".content").eq(0).each(function() {
    $(this).find("h2").attr("data-html", $(this).find("h2").html());
    $(this).find(".subtitle").attr("data-html", $(this).find(".subtitle").html());
  });
  
  $(".searchfilter>a").click(function(e) { e.preventDefault(); });
  
  var ftablesearchupdate=function() {
    var value=$(this).val().toLowerCase();
    var xvalue=value.split(" ");
    $(this).closest(".ftable").find("tr").each(function() {
      var html=$(this).html().toLowerCase();
      var found=true;
      if (!value)
        found=true;
      else
        for(var i in xvalue)
          if (html.indexOf(xvalue[i])==-1)
            found=false;
      if (found)
        $(this).show();
      else
        $(this).hide();
    });

  };
  $(".ftable form").submit(function(e) {
    e.preventDefault();
  }).find("input").change(ftablesearchupdate).keyup(ftablesearchupdate);
  
  $(".filter.directory a.filter").click(function() {
    $(this).parent().find(".ddlist").toggle();
  });
  $(".filter.directory .ddlist a").click(function() {
    $(this).closest(".ddlist").hide();
  });
  
  $(".wrapper").each(function() {
    var wrapper=$(this);
    var $window=$(window);
    var $header=$("header");
    var top=0;
    var height=0;
    var topHeight=0;
    var doLoad=function() {
      height=wrapper.find(">:first-child").innerHeight();
      wrapper.css("min-height", height+"px");
      top=wrapper.offset().top;
    }
    var onScroll=function() {
      if ($window.innerWidth()>=768)
        topHeight=111;
      else
        topHeight=0;
      height=wrapper.find(">:first-child").innerHeight();
      wrapper.css("min-height", height+"px");
      top=wrapper.offset().top;
      var scrollTop=$window.scrollTop();
      var scrollHeight=$window.innerHeight();
      if (height+topHeight>scrollHeight) {
        if (scrollTop+scrollHeight>=top+height) {
          wrapper.addClass("fixed").find(">:first-child").css("top", scrollHeight-height+"px");
        } else {
          wrapper.removeClass("fixed").find(">:first-child").css("top", "0px");
        }
      } else {
        if (scrollTop+topHeight>=top) {
          wrapper.addClass("fixed").find(">:first-child").css("top", topHeight+"px");
        } else {
          wrapper.removeClass("fixed").find(">:first-child").css("top", "0px");
        }
      }
    }
    doLoad();
    $window.load(doLoad).scroll(onScroll).resize(onScroll);
    
  });
  
  $(".txt[data-storylink]").each(function() {
    $(this).find("img").wrap($("<a />", {href: $(this).attr("data-storylink")}));
  });

  $(".quoteoutercontainer").each(function() {
    var current=0;
    var quotes=$(this).find(">.quotecontainer");
    setInterval(function() {
      current++;
      current%=quotes.length;
      quotes.each(function(i) {
        if (i==current)
          $(this).fadeIn(300);
        else
          $(this).fadeOut(300);
      });
    }, 5000);
  });
  
  
  
  
  
  $(window).load(function() {
    $(window).resize(function() {
      var $filters=$(".alopen");
      var $secondList=$(".alopen .research .ddlist");
      $filters.css("height", $secondList.innerHeight()+35+"px");
    }).resize();
  });
  
  setTimeout(function() {
    var $filters=$(".alopen");
    var $secondList=$(".alopen .research .ddlist");
    $filters.css("height", $secondList.innerHeight()+35+"px");
  }, 200);
  
  

  $(".filters.alopen .faculty .ddlist li.initial>a").click();
  $(".mapfilterc a[data-id=7]").click();
});

