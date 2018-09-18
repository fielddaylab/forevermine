var DO_PLATFORM_PC = 0;
var DO_PLATFORM_MOBILE = 1;
var platform = DO_PLATFORM_PC;
if(navigator.userAgent.match(/Android/i) ||
   navigator.userAgent.match(/webOS/i) ||
   navigator.userAgent.match(/iPhone/i) ||
   navigator.userAgent.match(/iPad/i) ||
   navigator.userAgent.match(/iPod/i) ||
   navigator.userAgent.match(/BlackBerry/i) ||
   navigator.userAgent.match(/Windows Phone/i))
  platform = DO_PLATFORM_MOBILE;
else
  platform = DO_PLATFORM_PC;
var debug = true;

