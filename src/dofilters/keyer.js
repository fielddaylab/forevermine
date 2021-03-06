var Keyer = function(init)
{
  var default_init =
  {
    source:document.createElement('div')
  }

  var self = this;
  doMapInitDefaults(self,init,default_init);

  var evts = [];
  var ENUM = 0;
  var KEY_EVT_PRESS = ENUM; ENUM++;
  var KEY_EVT_DOWN  = ENUM; ENUM++;
  var KEY_EVT_UP    = ENUM; ENUM++;
  var evt_types = [];
  self.attach = function() //will get auto-called at creation
  {
    document.addEventListener('keypress', press, false);
    document.addEventListener('keydown', down, false);
    document.addEventListener('keyup', up, false);
  }
  self.detach = function()
  {
    document.removeEventListener('keypress', press);
    document.removeEventListener('keydown', down);
    document.removeEventListener('keyup', up);
  }

  function press(evt)
  {
    evts.push(evt);
    evt_types.push(KEY_EVT_PRESS);
    //HAAAACK
    if(gg.game && gg.game.scenes[gg.game.cur_scene].mode != MODE_MENU)
    evt.preventDefault();
    return false;
  }
  function down(evt)
  {
    evts.push(evt);
    evt_types.push(KEY_EVT_DOWN);
    if(evt.keyCode == 8) //prevent backspace
    {
      //HAAAACK
      if(gg.game && gg.game.scenes[gg.game.cur_scene].mode != MODE_MENU)
      evt.preventDefault();
      return false;
    }
  }
  function up(evt)
  {
    evts.push(evt);
    evt_types.push(KEY_EVT_UP);
    if(evt.keyCode == 8) //prevent backspace
    {
      //HAAAACK
      if(gg.game && gg.game.scenes[gg.game.cur_scene].mode != MODE_MENU)
      return false;
    }
  }
  self.filter = function(keyable)
  {
    var hit = false;
    var k;
    for(var i = 0; i < evts.length; i++)
    {
      switch(evt_types[i])
      {
        case KEY_EVT_PRESS:
        {
          if(keyable.key) { keyable.key(evts[i]); hit = true; }
          if(keyable.key_letter)
          {
            k = String.fromCharCode(evts[i].charCode).toLowerCase();
            if(k != "")
            {
              keyable.key_letter(k);
              hit = true;
            }
          }
        }
        break;
        case KEY_EVT_DOWN:
          if(keyable.key_down) { keyable.key_down(evts[i]); hit = true; }
        break;
        case KEY_EVT_UP:
          if(keyable.key_up) { keyable.key_up(evts[i]); hit = true; }
        break;
      }
    }
    return hit;
  }
  self.consume = function(key, key_letter, key_down, key_up)
  {
    var k;
    for(var i = 0; i < evts.length; i++)
    {
      switch(evt_types[i])
      {
        case KEY_EVT_PRESS:
        {
          if(key) key(evts[i]);
          if(key_letter)
          {
            k = String.fromCharCode(evts[i].charCode).toLowerCase();
            if(k != "") key_letter(k);
          }
        }
        break;
        case KEY_EVT_DOWN: if(key_down) key_down(evts[i]); break;
        case KEY_EVT_UP: if(key_up) key_up(evts[i]); break;
      }
    }
  }
  self.flush = function()
  {
    evts = [];
    evt_types = [];
  }

  self.attach();
}

//example keyable- just needs key callback
var keyable = function(args)
{
  var self = this;

  self.key        = args.key        ? args.key        : function(){};
  self.key_letter = args.key_letter ? args.key_letter : function(){};
  self.key_down   = args.key_down   ? args.key_down   : function(){};
  self.key_up     = args.key_up     ? args.key_up     : function(){};
}

