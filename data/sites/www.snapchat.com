<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="apple-itunes-app" content="app-id=447188370">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Snapchat</title>
    <meta name="apple-mobile-web-app-capable" content="no">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="static/css/home.css">
    <link rel="apple-touch-icon" sizes="100x100" href="/static/assets/icon_100.png">
    <script language="javascript" type="text/javascript" src="static/js/jquery.js"></script>
    <script language="javascript" type="text/javascript" src="static/js/jquery-color-2.1.2.min.js"></script>
    <script>
      (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
      })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
      ga('create', 'UA-41740027-1', 'snapchat.com');
      ga('send', 'pageview');
    </script>
    <link rel="icon" type="image/png" href="static/assets/favicon.png">

    <!--[if IE]>
        <script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->
    <script>
    var loop = 1;
    var num = [0, 1, 2];
    videos = ["88Cu3yN-LlM", "-ie5_aaHOhE", "gPzZevSbgGk"];
    function playVideo() {
        console.log("hello");
        var vidNum = Math.floor((Math.random()*3));
        var url = "http://www.youtube.com/watch?v=" + videos[vidNum];
        console.log("hello");
        console.log(url); 
        var iOS = ( navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false );
        console.log(iOS);
        if(iOS) {
            window.open(url);
        }
        else {
            var ua = navigator.userAgent.toLowerCase();
            var isAndroid = ua.indexOf("android") > -1; //&& ua.indexOf("mobile");
            if(isAndroid) {
                window.open(url);
            }
            else {
                console.log("c4");
                console.log(vidNum);
                $("#video-player").css("display", "block");
                $("#overlay").css("display", "block");
               //src="http://www.youtube.com/embed/V3oJR5IAMxM?feature=player_embedded"
                var webUrl = "http://www.youtube.com/embed/" + videos[vidNum] + "?rel=0&feature=player_embedded&autoplay=1";
                $("#video").attr('src', webUrl);
            }    
        }
    }

    function showDownload() {
        $("#download-modal").css("display", "block");
        $("#overlay2").css("display", "block");
    }

    function dismiss2() {
        $('#video').remove();
        $("#download-modal").css("display", "none");
        $("#overlay2").css("display", "none");
    }

    function dismiss() {
        $('#video').remove();
        $("#video-player").css("display", "none");
        $("#overlay").css("display", "none");
        $("#video-player").append('<iframe id="video" width="960" height="540"  frameborder="0" allowfullscreen></iframe>');
    }
    
    $( document ).ready(function() {
        console.log("ready");
        var body = $('#home');
        $('.play').delay( 3000 ).removeClass('close');
    });
    </script>
</head>

<div id="download-modal" style="display:none;">
    <div class="button-container">
    <a href="https://itunes.apple.com/us/app/snapchat/id447188370" target="_blank"><div class="apple-dl b-margin-right" ></div></a>
    <a href="https://play.google.com/store/apps/details?id=com.snapchat.android&hl=en" target="_blank"><div class="google-dl b-margin-left"></div></a>
</div>
</div>
<figure id="video-player" style="display:none;">
   <iframe id="video" width="960" height="540"  frameborder="0" allowfullscreen></iframe>
</figure>
<div id="overlay2" style="display:none;" onClick="dismiss2()"></div>
<div id="overlay" style="display:none;" onClick="dismiss()"></div>
<body id="home" >
    <div class="big-ass-cover" onClick="playVideo()"></div>
    <noscript>

    </noscript>
    <div id="footer">
        <div class="list-container">
            <div class="footer-el  purple-text mobile-hide" onClick="showDownload()">download</div>
            <a class="black-text" href="http://blog.snapchat.com"><div class="footer-el  blue-text">blog</div></a>
            <a class="black-text" href="http://support.snapchat.com"><div class="footer-el  green-text">support</div></a>
            <a class="black-text" href="/jobs"><div class="footer-el  pink-text">jobs</div></a>
            <a class="black-text" href="/privacy"><div class="footer-el  light-blue-text">privacy</div></a>
            <a class="black-text" href="/terms"><div class="footer-el  light-purple-text">terms</div></a>
        </div>
</body>
</html>