var Wheeler = function(init)
{
  var default_init =
  {
    source:document.createElement('div')
  }

  var self = this;
  doMapInitDefaults(self,init,default_init);

  var evts = [];
  self.attach = function() //will get auto-called at creation
  {
    if(platform == DO_PLATFORM_PC)          window.addEventListener("wheel", wheel,false);
    else if(platform == DO_PLATFORM_MOBILE) ; //no wheel
  }
  self.detach = function()
  {
    if(platform == DO_PLATFORM_PC)          window.addEventListener("wheel", wheel,false);
    else if(platform == DO_PLATFORM_MOBILE) ; //no wheel
  }

  function wheel(evt)
  {
    doSetPosOnEvent(evt);
    evts.push(evt);
    if(gg.g && !gg.g.already_ticked)
    {
      gg.g.dotick();
      gg.g.already_ticked = 1;
    }
  }
  self.filter = function(wheelable)
  {
    var hit = false;
    var evt;
    for(var i = 0; i < evts.length; i++)
    {
      evt = evts[i];
      if((wheelable.shouldWheel && wheelable.shouldWheel(evt)) || (!wheelable.shouldWheel && doEvtWithinBB(evt, wheelable)))
      {
        wheelable.wheel(evt);
        hit = true;
      }
    }
    return hit;
  }
  self.consume = function(wheel)
  {
    var evt;
    for(var i = 0; i < evts.length; i++)
    {
      evt = evts[i];
      wheel(evt);
    }
  }
  self.flush = function()
  {
    evts = [];
  }

  self.attach();
}

//example wheelable- just needs x,y,w,h and wheel callback
var Wheelable = function(args)
{
  var self = this;

  self.x = args.x ? args.x : 0;
  self.y = args.y ? args.y : 0;
  self.w = args.w ? args.w : 0;
  self.h = args.h ? args.h : 0;
  self.shouldWheel = args.shouldWheel ? args.shouldWheel : function(evt) //optional
  {
    return doEvtWithinBB(evt, self);
  }
  self.wheel = args.wheel ? args.wheel : function(evt){ console.log(evt.deltaY); };

  //nice for debugging purposes
  self.draw = function(canv)
  {
    canv.context.strokeStyle = "#00FF00";
    canv.context.strokeRect(self.x,self.y,self.w,self.h);
  }
}

