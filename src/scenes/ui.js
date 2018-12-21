'use strict';
var monitor = function()
{
  var self = this;
  self.ww = 0;
  self.wh = 0;
  self.wx = 0;
  self.wy = 0;
  self.w = 0;
  self.h = 0;
  self.x = 0;
  self.y = 0;

  self.look_t = randIntBelow(1000);
  self.look_t_thresh = self.look_t+randIntBelow(500);
  self.blink_t = 0;
  self.talk_t = 99999;

  self.bg_color = "#F1F9EB";

  self.eye_img = GenImg("assets/eye.png");
  self.mouth_img = GenImg("assets/mouth.png");

  self.eyes_nx = 0;
  self.eyes_ny = 0;
  self.eyes_nw = 0;
  self.eyes_nh = 0;
  self.eyes_nsw = 0;
  self.eyes_nsvw = 0;
  self.mouth_nx = 0;
  self.mouth_ny = 0;
  self.mouth_nw = 0;
  self.mouth_nh = 0;
  self.mouth_nsw = 0;
  self.mouth_nsvw = 0;

  self.eyes_pw = 0.15;
  self.eyes_ph = 0.08;
  self.mouth_pw = 0.4;
  self.mouth_ph = 0.18;

  self.eyes_hy = 0.42; //"home" y
  self.eyes_vy = 0.25; //"variance" y
  self.mouth_hy = 0.64; //"home" y
  self.mouth_vy = 0.25; //"variance" y

  self.clicked = 0;

  self.init_screen = function()
  {
    var d = 5;
    self.screen = GenIcon(self.ww/d,self.wh/d);
    self.screen.context.imageSmoothingEnabled = 1;
    self.draw();
  }

  self.click = function(evt)
  {
    self.clicked = 1;
  }

  self.tick = function()
  {
    self.clicked = 0;

    self.look_t++;  if(self.look_t  > self.look_t_thresh) { self.look_t = randIntBelow(1000); self.look_t_thresh = self.look_t+randIntBelow(500); }
    self.blink_t++; if(self.blink_t > 300) self.blink_t = randIntBelow(250);
    self.talk_t++;

    var face_nx = (sin(self.look_t/50 )/5+1)/2;
    var face_ny = (sin(self.look_t/190)/5+1)/2;

    self.eyes_nx = lerp(self.eyes_nx,face_nx, 0.1);
    self.eyes_ny = lerp(self.eyes_ny,face_ny,0.1);
    self.eyes_nw = 1;
    if(self.blink_t == 300-5) self.eyes_nsvw = -.02;
    if(self.blink_t > 300-5) self.eyes_nh = lerp(self.eyes_nh,0,0.9);
    else                     self.eyes_nh = lerp(self.eyes_nh,1,0.9);
    self.eyes_nsw += self.eyes_nsvw;
    self.eyes_nsvw -= self.eyes_nsw/20;
    self.eyes_nsvw *= 0.9;

    self.mouth_nx = lerp(self.mouth_nx,face_nx, 0.05);
    self.mouth_ny = lerp(self.mouth_ny,face_ny,0.05);
    self.mouth_nw = 1;
    if(self.talk_t == 1) self.mouth_nsvw = -.05;
    if(self.talk_t < 50) self.mouth_nh = lerp(self.mouth_nh,psin(self.talk_t),0.8);
    else                 self.mouth_nh = lerp(self.mouth_nh,                1,0.8);
    self.mouth_nsw += self.mouth_nsvw;
    self.mouth_nsvw -= self.mouth_nsw/20;
    self.mouth_nsvw *= 0.9;
  }

  self.draw = function()
  {
    var s = self.screen;
    var c = s.context;

    //c.strokeStyle = red;
    //c.strokeRect(0,0,s.width,s.height);

    c.fillStyle = self.bg_color;
    c.fillRect(0,0,s.width,s.height);

    c.fillStyle = blue;
    var w;
    var h;
    var x;
    var y;
    w = s.width*(self.eyes_pw+self.eyes_nsw/2)*self.eyes_nw;
    h = s.height*self.eyes_ph*self.eyes_nh;
    x = self.eyes_nx*s.width/2-w/2;
    y = s.height*self.eyes_hy-h/2+self.eyes_ny*s.height*self.eyes_vy;
    //c.fillRect(x,y,w,h); //left eye
    c.drawImage(self.eye_img,x,y,w,h);
    x = s.width/2+self.eyes_nx*s.width/2-w/2;
    //c.fillRect(x,y,w,h); //right eye
    c.drawImage(self.eye_img,x,y,w,h);

    w = s.width*(self.mouth_pw+self.mouth_nsw/2)*self.mouth_nw;
    h = s.height*self.mouth_ph*self.mouth_nh;
    x = s.width/4+self.mouth_nx*s.width/2-w/2;
    y = s.height*self.mouth_hy-h/2+self.mouth_ny*s.height*self.mouth_vy;
    //c.fillRect(x,y,w,h); //mouth
    c.drawImage(self.mouth_img,x,y,w,h);
  }
}

var content_dragger = function()
{
  var self = this;
  self.w = 0;
  self.h = 0;
  self.x = 0;
  self.y = 0;

  self.dragging_data = 0;
  self.dragging_sim = 0;
  self.dragging_constant = 0;
  self.constant_val = 0;
  self.last_evt = 0;

  //drag
  self.ptWithinData = function(evt)
  {
    var mb = gg.message_box;
    //copied from mb draw
    var y = mb.top_y;
    if(evt.doY < gg.message_box.monitor_y+gg.message_box.monitor_h) return 0;
    for(var i = 0; i < mb.displayed_i; i++)
    {
      if(mb.types[i] == CONTENT_DATA && ptWithin(mb.x+mb.pad,  y,mb.bubble_w,mb.pad+(mb.font_h+mb.pad), evt.doX,evt.doY))
        return 1;
      y += mb.pad;
      if(mb.types[i] == CONTENT_DATA || mb.types[i] == CONTENT_SIM || mb.types[i] == CONTENT_CONSTANT)
        y += mb.font_h+mb.pad;
      else
        y += (mb.font_h+mb.pad)*mb.bubbles[i].length;
      y += mb.pad;
    }
    return 0;
  }
  self.ptWithinSim = function(evt)
  {
    if(gg.table.simd_visible < gg.table.max_t) return 0;
    if(evt.doY < gg.message_box.monitor_y+gg.message_box.monitor_h) return 0;
    var t = gg.table;
    var y1 = t.y+t.h*1/3;
    var y3 = t.y+t.h;
    return ptWithin(t.x,y1,t.w,y3-y1,evt.doX,evt.doY);
  }
  self.ptWithinConstant = function(evt)
  {
    var mb = gg.message_box;
    //copied from mb draw
    var y = mb.top_y;
    if(evt.doY < gg.message_box.monitor_y+gg.message_box.monitor_h) return 0;
    for(var i = 0; i < mb.displayed_i; i++)
    {
      if(mb.types[i] == CONTENT_CONSTANT && ptWithin(mb.x+mb.pad,  y,mb.bubble_w,mb.pad+(mb.font_h+mb.pad), evt.doX,evt.doY))
      {
        var c = 0;
        for(var j = 0; j < gg.cur_level.m_label.length; j++)
          if(mb.bubbles[i][0] == gg.cur_level.m_label[j]) self.constant_val = gg.cur_level.m_correct[j];
        for(var j = 0; j < gg.cur_level.b_label.length; j++)
          if(mb.bubbles[i][0] == gg.cur_level.b_label[j]) self.constant_val = gg.cur_level.b_correct[j];
        return 1;
      }
      y += mb.pad;
      if(mb.types[i] == CONTENT_DATA || mb.types[i] == CONTENT_SIM || mb.types[i] == CONTENT_CONSTANT)
        y += mb.font_h+mb.pad;
      else
        y += (mb.font_h+mb.pad)*mb.bubbles[i].length;
      y += mb.pad;
    }
    return 0;
  }
  //release
  self.ptWithinChat = function(evt)
  {
    var mb = gg.message_box;
    return ptWithin(mb.x,mb.y,mb.w,mb.h, evt.doX,evt.doY);
  }
  self.ptWithinTable = function(evt)
  {
    var t = gg.table;
    return ptWithin(t.x,t.y,t.w,t.h, evt.doX,evt.doY);
  }

  self.dragStart = function(evt)
  {
    self.dragging_data = 0;
    self.dragging_sim = 0;
    self.dragging_constant = 0;

    self.drag(evt);

    if(!gg.table.data_visible && self.ptWithinData(evt))                                { self.dragging_data = 1;     return 1; }
    if(gg.table.data_visible && gg.cur_level.text_stage < 9 && self.ptWithinSim(evt))   { self.dragging_sim = 1;      return 1; }
    if(self.ptWithinConstant(evt))                                                      { self.dragging_constant = 1; return 1; }
    self.dragging = 0;
    return 0;
  }
  self.drag = function(evt)
  {
    self.last_evt = evt;
  }
  self.dragFinish = function(evt)
  {
    if(!evt) evt = self.last_evt;
    if(self.dragging_data && self.ptWithinTable(evt))
    {
      gg.table.data_visible = 1;
      gg.table.verify();
      if(gg.cur_level.skip_labels)
      {
        //gg.message_box.nq_group(gg.cur_level.text.labels);//skip!
        gg.cur_level.text_stage++;
        gg.message_box.nq_group(gg.cur_level.text.constants);
        gg.cur_level.text_stage++;
      }
      else
      {
        gg.message_box.nq_group(gg.cur_level.text.labels);
        gg.cur_level.text_stage++;
      }
      gg.stage_t = 0;
    }
    if(self.dragging_sim && self.ptWithinChat(evt))
    {
      gg.message_box.nq(get_timer(0),"SIM:",CONTENT_SIM,EMOTE_NULL);
      if(gg.table.correct)
      {
        gg.cur_level.correct = 1;
        gg.message_box.nq_group(gg.cur_level.text.review);
        gg.cur_level.text_stage++;
        if(gg.cur_level.skip_zoom)
        {
          gg.message_box.nq_group(gg.cur_level.text.debrief);
          gg.cur_level.text_stage++;
        }
        gg.stage_t = 0;
      }
      else
      {
        gg.message_box.nq_group(gg.cur_level.text.submitted_incorrect);
        //gg.cur_level.text_stage++; //do not increment!
      }

    }
    if(self.dragging_constant)
    {
      for(var i = 0; i < gg.line.m_btn.length; i++)
      {
        if(ptWithinBox(gg.line.m_btn[i],evt.doX,evt.doY))
          gg.line.m_btn[i].set(self.constant_val);
      }
      for(var i = 0; i < gg.line.b_btn.length; i++)
      {
        if(ptWithinBox(gg.line.b_btn[i],evt.doX,evt.doY))
          gg.line.b_btn[i].set(self.constant_val);
      }
    }
    self.dragging_data = 0;
    self.dragging_sim = 0;
    self.dragging_constant = 0;
  }

  self.draw = function()
  {
    if(gg.cur_level.i == 0)
    {
      gg.ctx.font = "30px DisposableDroidBB";
      if(!gg.table.data_visible && gg.message_box.displayed_i > 0 && gg.message_box.types[gg.message_box.displayed_i-1] == CONTENT_DATA)
      {
        if(!self.dragging_data)
        {
          gg.ctx.fillStyle = "rgba(0,0,0,0.5)";
          gg.ctx.fillRect(0,0,gg.canv.width,gg.message_box.data_y-5);
          gg.ctx.fillRect(gg.message_box.w,gg.message_box.data_y-5,gg.canv.width-gg.message_box.w,45);
          gg.ctx.fillRect(0,gg.message_box.data_y+40,gg.canv.width,gg.canv.height-gg.message_box.data_y-40);
          gg.ctx.fillStyle = white;
          gg.ctx.fillText("<- DRAG",gg.message_box.x+gg.message_box.w,gg.message_box.data_y+20);
        }
        else
        {
          gg.ctx.fillStyle = "rgba(0,0,0,0.5)";
          gg.ctx.fillRect(0,0,gg.table.x,gg.canv.height);
          gg.ctx.fillRect(gg.table.x,0,gg.table.w,gg.canv.height-gg.table.h);
          gg.ctx.fillRect(gg.table.x+gg.table.w,0,gg.canv.width-(gg.table.x+gg.table.w),gg.canv.height);
          gg.ctx.fillStyle = white;
          gg.ctx.fillText("\\/ DROP",gg.table.x+100,gg.table.y-20);
        }
      }
      if(gg.table.correct && !gg.cur_level.correct && !gg.timeline.fast_sim)
      {
        if(!self.dragging_sim)
        {
          var y1 = gg.table.y+gg.table.h*1/3;
          gg.ctx.fillStyle = "rgba(0,0,0,0.5)";
          gg.ctx.fillRect(0,0,gg.canv.width,y1);
          gg.ctx.fillRect(0,y1,gg.table.x,gg.table.h);
          gg.ctx.fillRect(gg.table.x+gg.table.w,y1,gg.canv.width-(gg.table.x+gg.table.w),gg.table.h);
          gg.ctx.fillStyle = white;
          gg.ctx.fillText("DRAG \\/",gg.canv.width-200,y1-20);
        }
        else
        {
          gg.ctx.fillStyle = "rgba(0,0,0,0.5)";
          gg.ctx.fillRect(gg.message_box.x+gg.message_box.w,0,gg.canv.width-gg.message_box.w,gg.canv.height);
          gg.ctx.fillStyle = white;
          gg.ctx.fillText("<- DROP",gg.message_box.w+10,gg.canv.height/2);
        }
      }
    }
    if(self.dragging_data)
    {
      gg.ctx.drawImage(gg.data_img,self.last_evt.doX-30,self.last_evt.doY-30,60,60);
    }
    if(self.dragging_sim)
    {
      gg.ctx.drawImage(gg.submit_img,self.last_evt.doX-30,self.last_evt.doY-30,60,60);
    }
    if(self.dragging_constant)
    {
      gg.ctx.drawImage(gg.data_img,self.last_evt.doX-30,self.last_evt.doY-30,60,60);
      gg.ctx.fillStyle = gg.message_box.data_text_color; gg.ctx.fillText(self.constant_val,self.last_evt.doX+30,self.last_evt.doY);
    }
  }
}

var exposition_box = function()
{
  var self = this;
  self.w = 0;
  self.h = 0;
  self.x = 0;
  self.y = 0;

  self.text_w = 0;

  self.pad = 10;
  self.font_h = 30;
  self.font = self.font_h+"px DisposableDroidBB";

  self.texts = [];
  self.bubbles = [];
  self.types = [];
  self.metas = [];

  self.displayed_i = 0;

  self.size = function()
  {
    self.text_w = self.w-self.pad*2;
  }

  self.clear = function()
  {
    self.texts = [];
    self.bubbles = []
    self.types = []
    self.metas = []
    self.displayed_i = 0;
  }

  self.nq = function(text, type, meta)
  {
    self.texts.push(text);
    self.bubbles.push(textToLines(self.font,self.text_w,text,gg.ctx));
    self.types.push(type);
    self.metas.push(meta);
    if(self.texts.length == 1 && self.types[0] == CONTENT_AI) gg.monitor.talk_t = 0;
  }

  self.nq_group = function(text)
  {
    for(var i = 0; i < text.length; i+=3)
      self.nq(text[i],text[i+1],text[i+2]);
  }

  self.advance = function()
  {
    self.displayed_i++;
    if(self.displayed_i < self.texts.length && self.types[self.displayed_i] == CONTENT_AI) gg.monitor.talk_t = 0;
  }

  self.click = function(evt)
  {
    if(self.displayed_i < self.texts.length) self.advance();
  }

  self.tick = function()
  {
  }

  self.draw = function()
  {
    if(self.displayed_i >= self.texts.length) return;

    gg.ctx.lineWidth = 1;
    strokeBox(self,gg.ctx);
    gg.ctx.fillStyle = black;
    gg.ctx.globalAlpha = 0.5;
    fillBox(self,gg.ctx);
    gg.ctx.globalAlpha = 1;

    gg.ctx.fillStyle = white;
    gg.ctx.textAlign = "left";
    gg.ctx.font = self.font;
    switch(self.types[self.displayed_i])
    {
      case CONTENT_AI: gg.ctx.fillText("GEMMA",self.x+self.pad,self.y+self.font_h/2); break;
      case CONTENT_PLAYER: gg.ctx.fillText("YOU",self.x+self.pad,self.y+self.font_h/2); break;
    }
    var y = self.y+self.pad;
    for(var i = 0; i < self.bubbles[self.displayed_i].length; i++)
    {
      gg.ctx.fillText(self.bubbles[self.displayed_i][i],self.x+self.pad,y+self.font_h);
      y += self.font_h+self.pad;
    }
  }
}

var graph = function()
{
  var self = this;
  self.x = 0;
  self.y = 0;
  self.w = 0;
  self.h = 0;
  self.stretch = 0; //0 = hours, 1 = days

  self.v_max = 10;

  self.size = function ()
  {
    var p = 120;
    self.stretch_maxx = gg.message_box.w+p;
    self.stretch_maxw = self.x+self.w-self.stretch_maxx;
  }

  self.x_for_t = function(t)
  {
    var max_days = 14;
    var sx = lerp(self.x,self.stretch_maxx,self.stretch);
    var sw = lerp(self.w,self.stretch_maxw,self.stretch);
    return lerp(sx,sx+sw,lerp(t/gg.timeline.t_max,t/(24*max_days),self.stretch));
  }
  self.stretched_x = function(x)
  {
    if(self.stretch == 0) return x;
    var max_days = 14;
    var sx = lerp(self.x,self.stretch_maxx,self.stretch);
    var sw = lerp(self.w,self.stretch_maxw,self.stretch);
    return min(self.x+self.w,mapVal(self.x,self.x+self.w,sx,sx+sw*lerp(1,(gg.timeline.t_max/(24*max_days)),self.stretch),x));
  }
  self.stretched_y = function(y)
  {
    if(self.stretch == 0) return y;
    var max_crystals = 500;
    return mapVal(self.y+self.h,self.y,self.y+self.h,self.y+self.h-self.h*lerp(1,self.v_max/max_crystals,self.stretch),y);
  }

  self.tick = function()
  {

  }

  self.draw = function()
  {
    var t = self.stretch;
    var sx = lerp(self.x,self.stretch_maxx,t);
    var sw = lerp(self.w,self.stretch_maxw,t);
    var sh = self.h;
    var sy = self.y;
    var x;
    var y;

    var max_days = 14;
    var max_crystals = 500;

    var zone_y = self.y;
      //zones
    if(self.stretch > 0.5)
    {
      gg.ctx.globalAlpha = (self.stretch-0.5)*2;
      gg.ctx.fillStyle = "#7FE288";
      var x = self.stretched_x(self.x);
      var w = lerp(self.w,self.stretch_maxw,self.stretch)
      var h = self.stretched_y(self.y+self.h-((max_crystals-80)/10*self.h)-self.y);
      if(h > 0) gg.ctx.fillRect(x,zone_y,w,h);
      gg.ctx.fillStyle = "#F19B8B";
      if(h > 0) zone_y += h;
      h = self.y+self.h-zone_y;
      gg.ctx.fillRect(x,zone_y,w,h);

      gg.ctx.globalAlpha = 1;
    }

    gg.ctx.fillStyle = white;
    gg.ctx.font = "18px DisposableDroidBB";
    gg.ctx.textAlign = "center";
    gg.ctx.lineWidth = 2;
    gg.ctx.strokeStyle = white;

    //grid
    gg.ctx.lineWidth = 4;
    gg.ctx.strokeRect(sx,sy,sw,sh);
    gg.ctx.lineWidth = 2;
      //vertical lines
    if(t < 0.5)
    {
      var ex = lerp(sx+sw,sx+sw*(gg.timeline.t_max/(24*max_days)),t);
      gg.ctx.globalAlpha = 1-(t*2);
      gg.ctx.beginPath();
      for(var i = 1; i < gg.timeline.t_max; i++)
      {
        x = lerp(sx,ex,i/gg.timeline.t_max);
        gg.ctx.moveTo(x,sy);
        gg.ctx.lineTo(x,sy+sh);
        gg.ctx.fillText(i,x,sy+sh+15);
      }
      gg.ctx.stroke();
      gg.ctx.fillText(gg.timeline.t_max,ex,sy+sh+15);
      gg.ctx.fillText(gg.cur_level.x_label,sx+sw/2,sy+sh+30);
      gg.ctx.globalAlpha = 1;
    }
    else
    {
      var ex = lerp(sx+sw*((24*max_days)/gg.timeline.t_max),sx+sw,t);
      gg.ctx.globalAlpha = (t-0.5)*2;
      gg.ctx.beginPath();
      for(var i = 1; i < max_days; i++)
      {
        x = lerp(sx,ex,i/max_days);
        gg.ctx.moveTo(x,sy);
        gg.ctx.lineTo(x,sy+sh);
        gg.ctx.fillText(i,x,sy+sh+15);
      }
      gg.ctx.stroke();
      gg.ctx.fillText(max_days,ex,sy+sh+15);
      gg.ctx.fillText("DAYS",sx+sw/2,sy+sh+30);
      gg.ctx.globalAlpha = 1;
    }
      //horizontal lines
    if(t < 0.5)
    {
      var ey = lerp(sy,sy+sh-sh*(self.v_max/max_crystals),t);
      gg.ctx.globalAlpha = 1-(t*2);
      gg.ctx.beginPath();
      for(var i = 1; i < self.v_max; i++)
      {
        y = lerp(sy+sh,ey,i/self.v_max);
        gg.ctx.moveTo(sx,y);
        gg.ctx.lineTo(sx+sw,y);
        gg.ctx.fillText(i,sx-12,y+7);
      }
      gg.ctx.stroke();
      gg.ctx.fillText(self.v_max,sx-12,sy+7);
      gg.ctx.textAlign = "right";
      gg.ctx.fillText(gg.cur_level.y_label,sx-25,sy+sh/2);
      gg.ctx.textAlign = "center";
      gg.ctx.globalAlpha = 1;
    }
    else
    {
      var ey = lerp(sy+sh-sh*(max_crystals/self.v_max),sy,t);
      gg.ctx.globalAlpha = (t-0.5)*2;
      gg.ctx.beginPath();
      for(var i = 50; i < max_crystals; i+=50)
      {
        y = lerp(sy+sh,ey,i/max_crystals);
        gg.ctx.moveTo(sx,y);
        gg.ctx.lineTo(sx+sw,y);
        gg.ctx.fillText(i,sx-15,y+7);
      }
      gg.ctx.stroke();
      gg.ctx.fillText(max_crystals,sx-15,sy+7);
      gg.ctx.textAlign = "right";
      gg.ctx.fillText(gg.cur_level.y_label,sx-25,sy+sh/2);
      gg.ctx.textAlign = "center";
      gg.ctx.globalAlpha = 1;
    }

      //tl
    gg.ctx.strokeStyle = gray;
    var t_x = self.x_for_t(gg.timeline.t);
    drawLine(t_x,sy,t_x,sy+sh,gg.ctx);

    if(self.stretch > 0.5)
    {
      gg.ctx.globalAlpha = (self.stretch-0.5)*2;
      gg.ctx.fillStyle = black;
      gg.ctx.textAlign = "left";
      if(y > self.y+5) gg.ctx.fillText("You Survive", self.stretched_x(self.x)+5, zone_y-5);
      gg.ctx.fillText("You Die", self.stretched_x(self.x)+5, zone_y+17);
      gg.ctx.globalAlpha = 1;
    }
  }
}

var timeline = function()
{
  var self = this;
  self.x = 0;
  self.y = 0;
  self.w = 0;
  self.h = 0;

  self.sx = 0;
  self.ex = 0;

  self.t = 0;
  self.t_target = 0;
  self.t_max = 10;
  self.fast_sim = 0;
  self.t_speed = 0.01;
  self.fast_t_speed = 0.1;

  self.advance_btn = {x:0,y:0,w:0,h:0,click:function(evt){
    self.t_target++;
    if(self.t_target > self.t_max) self.t_target = self.t_max;
  }};

  self.size = function()
  {
    self.advance_btn.w = 50;
    self.advance_btn.h = self.h;
    self.advance_btn.x = self.x;
    self.advance_btn.y = self.y;

    self.sx = self.x+self.w*1.5/(self.t_max+2)
    self.ex = self.x+self.w*(self.t_max+1.5)/(self.t_max+2);
  }

  self.dragStart = function(evt)
  {
    self.drag(evt);
  }
  self.drag = function(evt)
  {
    var t = clampMapVal(self.sx,self.ex,0,self.t_max,evt.doX);
    self.t_target = ceil(t);
    self.t = t;
  }
  self.dragFinish = function(evt)
  {
  }

  self.filter = function(dragger, clicker)
  {
    var check = true;
    if(check) check = !clicker.filter(self.advance_btn);
    if(check) check = !dragger.filter(self);
    return !check;
  }

  self.tick = function()
  {
    if(self.fast_sim && self.t < self.t_max) self.t += self.fast_t_speed;
    else
    {
      if(self.t < self.t_target && !self.dragging) self.t += self.t_speed;
      if(self.t > self.t_target) self.t = self.t_target;
    }
    if(self.t >= self.t_max)
    {
      self.fast_sim = 0;
      self.t_target = self.t_max;
      self.t = self.t_max;
    }
  }

  self.draw = function()
  {
    //gg.ctx.strokeStyle = red;
    //strokeBox(self,gg.ctx);

    //strokeBox(self.advance_btn,gg.ctx);

    var t_x;

    t_x = mapVal(0,self.t_max,self.sx,self.ex,self.t);
    var s = self.h;
    gg.ctx.drawImage(gg.timeline_scrubber_img,t_x-s/2,self.y,s,self.h);

    if(self.t < self.t_target)
    {
      gg.ctx.font = "12px DisposableDroidBB";
      gg.ctx.fillStyle = light_gray;
      gg.ctx.fillText("simulating...",self.x,self.y-10);
    }

    gg.ctx.fillStyle = black;

  }
}

var editable_line = function()
{
  var self = this;
  self.w = 0;
  self.h = 0;
  self.x = 0;
  self.y = 0;

  self.font_h = 50;
  self.font = self.font_h+"px DisposableDroidBB";

  self.label_selector_n = -1;

  self.m_label = [-1];
  self.m = [0];
  self.b_label = [-1];
  self.b = [0];
  self.m_total = 0;
  self.b_total = 0;
  self.eqn_strings = [""];
  self.eqn_ws = [0];
  self.eqn_xs = [0];

  self.m_select_btn = [];
  self.m_btn = [];
  self.minc_btn = [];
  self.mdec_btn = [];
  self.b_select_btn = [];
  self.b_btn = [];
  self.binc_btn = [];
  self.bdec_btn = [];

  //line
  self.sx = 0;
  self.sy = 0;
  self.ex = 0;
  self.ey = 0;

  self.calc_m_total = function()
  {
    self.m_total = 0;
    for(var i = 0; i < self.m.length; i++) self.m_total += self.m[i];
  }
  self.calc_b_total = function()
  {
    self.b_total = 0;
    for(var i = 0; i < self.b.length; i++) self.b_total += self.b[i];
  }
  self.v = function(x)
  {
    return self.m_total*x+self.b_total;
  }

  self.consume_cur_level = function()
  {
    self.m = [];
    self.m_btn = [];
    self.minc_btn = [];
    self.mdec_btn = [];
    for(var i = 0; i < gg.cur_level.m_starting.length; i++)
    {
      if(gg.cur_level.skip_labels)
        self.m_label[i] = i;
      else
        self.m_label[i] = -1;
      self.m[i] = gg.cur_level.m_starting[i];
      self.m_select_btn[i] = (function(i){return new ButtonBox(0,0,0,0,function(v){ self.label_selector_n = i; });})(i);
      self.m_btn[i] = (function(i){return new NumberBox(0,0,0,0,0,0.01,function(v){ v = fdisp(v,1); if(self.m[i] == v) return; self.m[i] = v; self.calc_m_total(); self.calculate_table(); self.draw_params(); self.invalidate_sim();  });})(i);
      self.m_btn[i].set(gg.cur_level.m_starting[i]);
      self.minc_btn[i] = (function(i){return new ButtonBox(0,0,0,0, function(){ self.m_btn[i].set(self.m_btn[i].number+0.1); });})(i);
      self.mdec_btn[i] = (function(i){return new ButtonBox(0,0,0,0, function(){ self.m_btn[i].set(self.m_btn[i].number-0.1); });})(i);
    }
    self.b = [];
    self.b_btn = [];
    self.binc_btn = [];
    self.bdec_btn = [];
    for(var i = 0; i < gg.cur_level.b_starting.length; i++)
    {
      if(gg.cur_level.skip_labels)
        self.b_label[i] = self.m_select_btn.length+i;
      else
        self.b_label[i] = -1;
      self.b[i] = gg.cur_level.b_starting[i];
      self.b_select_btn[i] = (function(i){return new ButtonBox(0,0,0,0,function(v){ self.label_selector_n = self.m_select_btn.length+i; });})(i);
      self.b_btn[i] = (function(i){return new NumberBox(0,0,0,0,0,0.01,function(v){ v = fdisp(v,1); if(self.b[i] == v) return; self.b[i] = v; self.calc_b_total(); self.calculate_table(); self.draw_params();  self.invalidate_sim(); });})(i);
      self.b_btn[i].set(gg.cur_level.b_starting[i]);
      self.binc_btn[i] = (function(i){return new ButtonBox(0,0,0,0, function(){ self.b_btn[i].set(self.b_btn[i].number+0.1); });})(i);
      self.bdec_btn[i] = (function(i){return new ButtonBox(0,0,0,0, function(){ self.b_btn[i].set(self.b_btn[i].number-0.1); });})(i);
    }
    self.size();
    self.calc_m_total();
    self.calc_b_total();
    self.calculate_table();
    self.draw_params();
    self.invalidate_sim();
  }

  self.size = function()
  {
    gg.ctx.font = self.font;
    self.eqn_strings = [];
    self.eqn_xs = [];
    var eqn_i = 0;
    var m_i = 0;
    var b_i = 0;

    self.btn_w = gg.ctx.measureText("-0.0").width*2;
    self.btn_h = self.font_h*2;
    self.eqn_w = 0;
    self.eqn_y = gg.stage.height/2;

    //figure out w
    if(self.m.length == 1)
    {
      self.eqn_strings[eqn_i] = "Y = ";
      self.eqn_ws[eqn_i] = gg.ctx.measureText(self.eqn_strings[eqn_i]).width;
      self.eqn_w += self.eqn_ws[eqn_i];
      eqn_i++;
      self.m_btn[m_i].w = self.btn_w;
      self.eqn_w += self.m_btn[m_i].w;
      m_i++;
      if(self.b.length == 1)
        self.eqn_strings[eqn_i] = "X + ";
      else
        self.eqn_strings[eqn_i] = "X + (";
      self.eqn_ws[eqn_i] = gg.ctx.measureText(self.eqn_strings[eqn_i]).width;
      self.eqn_w += self.eqn_ws[eqn_i];
      eqn_i++;
    }
    else
    {
      self.eqn_strings[eqn_i] = "Y = (";
      self.eqn_ws[eqn_i] = gg.ctx.measureText(self.eqn_strings[eqn_i]).width;
      self.eqn_w += self.eqn_ws[eqn_i];
      eqn_i++;
      while(m_i < self.m.length-1)
      {
        self.m_btn[m_i].w = self.btn_w;
        self.eqn_w += self.m_btn[m_i].w;
        m_i++;
        self.eqn_strings[eqn_i] = " + ";
        self.eqn_ws[eqn_i] = gg.ctx.measureText(self.eqn_strings[eqn_i]).width;
        self.eqn_w += self.eqn_ws[eqn_i];
        eqn_i++;
      }
      self.m_btn[m_i].w = self.btn_w;
      self.eqn_w += self.m_btn[m_i].w;
      m_i++;
      if(self.b.length == 1)
        self.eqn_strings[eqn_i] = ")X + ";
      else
        self.eqn_strings[eqn_i] = ")X + (";
      self.eqn_ws[eqn_i] = gg.ctx.measureText(self.eqn_strings[eqn_i]).width;
      self.eqn_w += self.eqn_ws[eqn_i];
      eqn_i++;
    }

    if(self.b.length == 1)
    {
      self.b_btn[b_i].w = self.btn_w;
      self.eqn_w += self.b_btn[b_i].w;
      b_i++;
    }
    else
    {
      while(b_i < self.b.length-1)
      {
        self.b_btn[b_i].w = self.btn_w;
        self.eqn_w += self.b_btn[b_i].w;
        b_i++;
        self.eqn_strings[eqn_i] = " + ";
        self.eqn_ws[eqn_i] = gg.ctx.measureText(self.eqn_strings[eqn_i]).width;
        self.eqn_w += self.eqn_ws[eqn_i];
        eqn_i++;
      }
      self.b_btn[b_i].w = self.btn_w;
      self.eqn_w += self.b_btn[b_i].w;
      b_i++;
      self.eqn_strings[eqn_i] = ")";
      self.eqn_ws[eqn_i] = gg.ctx.measureText(self.eqn_strings[eqn_i]).width;
      self.eqn_w += self.eqn_ws[eqn_i];
      eqn_i++;
    }

    //figure out x
    eqn_i = 0;
    m_i = 0;
    b_i = 0;
    var x = gg.message_box.w+(gg.stage.width-gg.message_box.w)/2-self.eqn_w/2;
    self.eqn_xs[eqn_i] = x;
    x += self.eqn_ws[eqn_i];
    eqn_i++;
    while(m_i < self.m.length)
    {
      self.m_btn[m_i].x = x;
      x += self.m_btn[m_i].w;
      m_i++;
      self.eqn_xs[eqn_i] = x;
      x += self.eqn_ws[eqn_i];
      eqn_i++;
    }
    while(b_i < self.b.length)
    {
      self.b_btn[b_i].x = x;
      x += self.b_btn[b_i].w;
      b_i++;
      self.eqn_xs[eqn_i] = x;
      x += self.eqn_ws[eqn_i];
      eqn_i++;
    }

    //size btns
    var pad = 10;
    var yoff = 5; //replicate in draw
    for(var i = 0; i < self.m.length; i++)
    {
      self.m_btn[i].h = self.btn_h;
      self.m_btn[i].y = self.eqn_y;
      self.m_select_btn[i].x = self.m_btn[i].x;
      self.m_select_btn[i].y = self.m_btn[i].y;
      self.m_select_btn[i].w = self.m_btn[i].w;
      self.m_select_btn[i].h = self.m_btn[i].h;
      self.minc_btn[i].w = self.m_btn[i].w/2;
      self.minc_btn[i].h = self.m_btn[i].h/4;
      self.minc_btn[i].x = self.m_btn[i].x+self.m_btn[i].w/2-self.minc_btn[i].w/2;
      self.minc_btn[i].y = self.m_btn[i].y-self.minc_btn[i].h-pad+yoff;
      self.mdec_btn[i].w = self.m_btn[i].w/2;
      self.mdec_btn[i].h = self.m_btn[i].h/4;
      self.mdec_btn[i].x = self.m_btn[i].x+self.m_btn[i].w/2-self.mdec_btn[i].w/2;
      self.mdec_btn[i].y = self.m_btn[i].y+self.m_btn[i].h+pad+yoff;
    }
    for(var i = 0; i < self.b.length; i++)
    {
      self.b_btn[i].h = self.btn_h;
      self.b_btn[i].y = self.eqn_y;
      self.b_select_btn[i].x = self.b_btn[i].x;
      self.b_select_btn[i].y = self.b_btn[i].y;
      self.b_select_btn[i].w = self.b_btn[i].w;
      self.b_select_btn[i].h = self.b_btn[i].h;
      self.binc_btn[i].w = self.b_btn[i].w/2;
      self.binc_btn[i].h = self.b_btn[i].h/4;
      self.binc_btn[i].x = self.b_btn[i].x+self.b_btn[i].w/2-self.binc_btn[i].w/2;
      self.binc_btn[i].y = self.b_btn[i].y-self.binc_btn[i].h-pad+yoff;
      self.bdec_btn[i].w = self.b_btn[i].w/2;
      self.bdec_btn[i].h = self.b_btn[i].h/4;
      self.bdec_btn[i].x = self.b_btn[i].x+self.b_btn[i].w/2-self.bdec_btn[i].w/2;
      self.bdec_btn[i].y = self.b_btn[i].y+self.b_btn[i].h+pad+yoff;
    }
  }

  self.invalidate_sim = function()
  {
    gg.timeline.t = 0;
    gg.timeline.fast_sim = 1;
    gg.table.simd_visible = 0;
  }

  self.calculate_table = function()
  {
    var m_correct_total = 0; for(var i = 0; i < gg.cur_level.m_correct.length; i++) m_correct_total += gg.cur_level.m_correct[i];
    var b_correct_total = 0; for(var i = 0; i < gg.cur_level.b_correct.length; i++) b_correct_total += gg.cur_level.b_correct[i];
    for(var i = 0; i <= gg.timeline.t_max; i++)
    {
      gg.table.t_data[i] = i;
      if(i < 3) gg.table.known_data[i] = m_correct_total*i+b_correct_total;
      else      gg.table.known_data[i] = "-";
      gg.table.predicted_data[i] = self.v(i);
    }
    gg.table.verify();
  }

  self.draw_params = function()
  {
    self.sy = self.v(0);
    self.ey = self.v(gg.timeline.t_max);
    self.sx = 0;
    self.ex = gg.timeline.t_max;
         if(self.sy < 0              && self.ey < 0         )     { self.sy = 0;              self.ey = 0; }
    else if(self.sy > gg.graph.v_max && self.ey > gg.graph.v_max) { self.sy = gg.graph.v_max; self.ey = gg.graph.v_max; }
    else
    {
      if(self.sy < 0             ) { self.sx = (0             -self.b)/self.m; self.sy = 0; }
      if(self.sy > gg.graph.v_max) { self.sx = (gg.graph.v_max-self.b)/self.m; self.sy = gg.graph.v_max; }
      if(self.ey < 0             ) { self.ex = (0             -self.b)/self.m; self.ey = 0; }
      if(self.ey > gg.graph.v_max) { self.ex = (gg.graph.v_max-self.b)/self.m; self.ey = gg.graph.v_max; }
    }

    self.sy = mapVal(0, gg.graph.v_max, gg.graph.y+gg.graph.h, gg.graph.y, self.sy);
    self.ey = mapVal(0, gg.graph.v_max, gg.graph.y+gg.graph.h, gg.graph.y, self.ey);
    self.sx = mapVal(0, gg.timeline.t_max, gg.graph.x, gg.graph.x+gg.graph.w, self.sx);
    self.ex = mapVal(0, gg.timeline.t_max, gg.graph.x, gg.graph.x+gg.graph.w, self.ex);

    for(var i = 0; i <= gg.timeline.t_max; i++)
      gg.table.predicted_data[i] = fdisp(self.v(gg.table.t_data[i]),1);
    gg.table.verify();
  }

  self.select_label = function(evt)
  {
    if(self.label_selector_n > -1)
    {
      var b;
      if(self.label_selector_n < self.m_select_btn.length)
        b = self.m_select_btn[self.label_selector_n];
      else
        b = self.b_select_btn[self.label_selector_n-self.m_select_btn.length];

      var yoff = 5;
      var total_labels = gg.cur_level.m_label.length+gg.cur_level.b_label.length;
      var mlen = gg.cur_level.m_label.length;
      for(var i = 0; i < gg.cur_level.m_label.length; i++)
      {
        if(ptWithin(b.x+(i/total_labels)*b.w,b.y+yoff+b.h,b.w/total_labels,b.h,evt.doX,evt.doY))
        {
          if(self.label_selector_n < mlen)
            self.m_label[self.label_selector_n] = i;
          else
            self.b_label[self.label_selector_n-mlen] = i;
          self.label_selector_n = -1;
        }
      }
      for(var i = 0; i < gg.cur_level.b_label.length; i++)
      {
        if(ptWithin(b.x+((i+gg.cur_level.m_label.length)/total_labels)*b.w/total_labels,b.y+yoff+b.h,b.w,b.h,evt.doX,evt.doY))
        {
          if(self.label_selector_n < mlen)
            self.m_label[self.label_selector_n] = i+mlen;
          else
            self.b_label[self.label_selector_n-mlen] = i+mlen;
          self.label_selector_n = -1;
        }
      }
      if(self.label_selector_n == -1) //label selected
      {
        for(var i = 0; i < self.m_label.length; i++) if(self.m_label[i] == -1) return;
        for(var i = 0; i < self.b_label.length; i++) if(self.b_label[i] == -1) return;
        //if here, all labels selected
        var lcorrect = 1;
        for(var i = 0; i < self.m_label.length; i++) if(self.m_label[i] != i) lcorrect = 0;
        for(var i = 0; i < self.b_label.length; i++) if(self.b_label[i] != gg.cur_level.m_label.length+i) lcorrect = 0;
        if(lcorrect)
        {
          gg.message_box.nq_group(gg.cur_level.text.constants);
          gg.cur_level.text_stage++;
          gg.stage_t = 0;
        }
        else
        {
          gg.message_box.nq_group(gg.cur_level.text.labels_incorrect);
          //gg.cur_level.text_stage++; //don't advance
        }
      }
    }
  }
  self.filter = function(keyer,blurer,dragger,clicker)
  {
    var check = 1;
    if(gg.cur_level.text_stage == 6)
    {
      for(var i = 0; check && i < self.m_select_btn.length; i++) check = !clicker.filter(self.m_select_btn[i]);
      for(var i = 0; check && i < self.b_select_btn.length; i++) check = !clicker.filter(self.b_select_btn[i]);
      if(check) clicker.consume(self.select_label);
    }
    else if(gg.cur_level.text_stage > 6)
    {
      if(keyer)
      {
        for(var i = 0; i < self.m_btn.length; i++) keyer.filter(self.m_btn[i]);
        for(var i = 0; i < self.b_btn.length; i++) keyer.filter(self.b_btn[i]);
      }
      if(blurer)
      {
        for(var i = 0; i < self.m_btn.length; i++) blurer.filter(self.m_btn[i]);
        for(var i = 0; i < self.b_btn.length; i++) blurer.filter(self.b_btn[i]);
      }
      if(dragger)
      {
        for(var i = 0; check && i < self.m_btn.length; i++) check = !dragger.filter(self.m_btn[i]);
        for(var i = 0; check && i < self.b_btn.length; i++) check = !dragger.filter(self.b_btn[i]);
      }
      if(clicker)
      {
        for(var i = 0; check && i < self.minc_btn.length; i++) check = !clicker.filter(self.minc_btn[i]);
        for(var i = 0; check && i < self.mdec_btn.length; i++) check = !clicker.filter(self.mdec_btn[i]);
        for(var i = 0; check && i < self.binc_btn.length; i++) check = !clicker.filter(self.binc_btn[i]);
        for(var i = 0; check && i < self.bdec_btn.length; i++) check = !clicker.filter(self.bdec_btn[i]);
      }
    }
    return !check;
  }

  self.blur = function()
  {
    for(var i = 0; i < self.m_btn.length; i++) self.m_btn[i].blur();
    for(var i = 0; i < self.b_btn.length; i++) self.b_btn[i].blur();
  }

  self.tick = function()
  {
  }

  self.draw = function()
  {
    var x;
    var y;
    var pad = 10;

    //graph
    {
      gg.ctx.fillStyle = white;
      gg.ctx.font = "18px DisposableDroidBB";
      gg.ctx.lineWidth = 2;
      gg.ctx.strokeStyle = white;

        //line
      if(gg.graph.stretch == 1)
      {
        gg.ctx.strokeStyle = dark_gray;
        drawLine(gg.graph.stretched_x(self.sx),gg.graph.stretched_y(self.sy),gg.graph.stretched_x(self.ex),gg.graph.stretched_y(self.ey), gg.ctx);
        drawLine(gg.graph.stretched_x(self.ex),gg.graph.stretched_y(self.ey),gg.graph.stretched_x(self.sx+(self.ex-self.sx)*50),gg.graph.stretched_y(self.sy+(self.ey-self.sy)*50), gg.ctx);
      }
      gg.ctx.strokeStyle = black;
      if(gg.timeline.t < gg.timeline.t_max)
      {
        var t = gg.timeline.t/gg.timeline.t_max;
        var tx = gg.graph.x_for_t(gg.timeline.t);
        if(tx > gg.graph.stretched_x(self.sx))
        {
          t = min(invlerp(gg.graph.stretched_x(self.sx),gg.graph.stretched_x(self.ex),tx),1);
          drawLine(gg.graph.stretched_x(self.sx),gg.graph.stretched_y(self.sy),gg.graph.stretched_x(lerp(self.sx,self.ex,t)),gg.graph.stretched_y(lerp(self.sy,self.ey,t)), gg.ctx);
        }
      }
      else
        drawLine(gg.graph.stretched_x(self.sx),gg.graph.stretched_y(self.sy),gg.graph.stretched_x(self.ex),gg.graph.stretched_y(self.ey), gg.ctx);

        //icons
      if(gg.table.data_visible && gg.graph.stretch == 0)
      {
        gg.ctx.fillStyle = white;
        var s = 15;
        for(var i = 0; i <= gg.timeline.t_max; i++)
        {
          if(gg.table.known_data[i] != "-")
          {
            x = mapVal(0,gg.timeline.t_max,gg.graph.x,gg.graph.x+gg.graph.w,gg.table.t_data[i]);
            y = mapVal(0,gg.graph.v_max,gg.graph.y+gg.graph.h,gg.graph.y,gg.table.known_data[i]);
            x = clamp(gg.graph.x,gg.graph.x+gg.graph.w,x);
            y = clamp(gg.graph.y,gg.graph.y+gg.graph.h,y);
            if(gg.table.known_data[i] == gg.table.predicted_data[i]) gg.ctx.drawImage(gg.eq_pt_img,gg.graph.stretched_x(x)-s/2,gg.graph.stretched_y(y)-s/2,s,s);
            else gg.ctx.drawImage(gg.neq_pt_img,gg.graph.stretched_x(x)-s/2,gg.graph.stretched_y(y)-s/2,s,s);
          }
        }
      }
    }

    //eqn
    var yoff = 5;
    var b;
    var total_labels = gg.cur_level.m_label.length+gg.cur_level.b_label.length;
    var mlen = gg.cur_level.m_label.length;

    //eqn strings
    gg.ctx.font = self.font;
    gg.ctx.fillStyle = white;
    gg.ctx.textAlign = "left";
    for(var i = 0; i < self.eqn_strings.length; i++)
      gg.ctx.fillText(self.eqn_strings[i],self.eqn_xs[i],self.eqn_y+self.font_h);
    //boxes
    for(var i = 0; i < self.m_select_btn.length; i++)
    {
      b = self.m_select_btn[i];
      gg.ctx.drawImage(gg.constant_bg_img,b.x,b.y+yoff,b.w,b.h);
    }
    for(var i = 0; i < self.b_select_btn.length; i++)
    {
      b = self.b_select_btn[i];
      gg.ctx.drawImage(gg.constant_bg_img,b.x,b.y+yoff,b.w,b.h);
    }

    //selector
    gg.ctx.font = "20px DisposableDroidBB";
    gg.ctx.fillStyle = white;
    if(gg.cur_level.text_stage < 7)
    {
      if(self.label_selector_n > -1)
      {
        if(self.label_selector_n < self.m_select_btn.length)
          b = self.m_select_btn[self.label_selector_n];
        else
          b = self.b_select_btn[self.label_selector_n-self.m_select_btn.length];
        //gg.ctx.drawImage(gg.constant_bg_img,b.x,b.y+yoff+b.h,b.w,b.h/2);
        for(var i = 0; i < gg.cur_level.m_label.length; i++)
        {
          var x = b.x+(i/total_labels)*b.w+pad;
          drawImageSizeCentered(gg.cur_level.m_icon[i], x+b.h/4, b.y+yoff+b.h*5/4, b.h/2, gg.ctx);
          gg.ctx.fillText(gg.cur_level.m_label[i],x,b.y+yoff+b.h+b.h/2);
        }
        for(var i = 0; i < gg.cur_level.b_label.length; i++)
        {
          var x = b.x+((i+mlen)/total_labels)*b.w+pad;
          drawImageSizeCentered(gg.cur_level.b_icon[i], x+b.h/4, b.y+yoff+b.h*5/4, b.h/2, gg.ctx);
          gg.ctx.fillText(gg.cur_level.b_label[i],x,b.y+yoff+b.h+b.h/2);
        }
      }
    }
    else
    {
      gg.ctx.fillStyle = black;
      //value selector
      gg.ctx.fillStyle = "#63ADC3"; //blue highlit
      for(var i = 0; i < self.m_btn.length; i++)
      {
        b = self.m_btn[i];
        if(b.highlit) gg.ctx.fillRect(b.x+1,b.y+yoff+1,b.w-2,b.h-2);
        drawImageBox(gg.arrow_up_img,self.minc_btn[i],gg.ctx);
        drawImageBox(gg.arrow_down_img,self.mdec_btn[i],gg.ctx);
      }
      for(var i = 0; i < self.b_btn.length; i++)
      {
        b = self.b_btn[i];
        if(b.highlit) gg.ctx.fillRect(b.x+1,b.y+yoff+1,b.w-2,b.h-2);
        drawImageBox(gg.arrow_up_img,self.binc_btn[i],gg.ctx);
        drawImageBox(gg.arrow_down_img,self.bdec_btn[i],gg.ctx);
      }
      gg.ctx.fillStyle = black;
    }

    //labels
    for(var i = 0; i < self.m_select_btn.length; i++)
    {
      b = self.m_select_btn[i];
      if(self.m_label[i] > -1)
      {
        if(self.m_label[i] < mlen)
        {
          var x = b.x+pad;
          drawImageSizeCentered(gg.cur_level.m_icon[self.m_label[i]], x+b.h/2, b.y+yoff+b.h/4, b.h/2, gg.ctx);
          gg.ctx.fillText(gg.cur_level.m_label[self.m_label[i]],x,b.y+yoff+b.h-pad);
        }
        else
        {
          var x = b.x+pad;
          drawImageSizeCentered(gg.cur_level.b_icon[self.m_label[i]-mlen], x+b.h/2, b.y+yoff+b.h/4, b.h/2, gg.ctx);
          gg.ctx.fillText(gg.cur_level.b_label[self.m_label[i]-mlen],x,b.y+yoff+b.h-pad);
        }
      }
    }
    for(var i = 0; i < self.b_select_btn.length; i++)
    {
      b = self.b_select_btn[i];
      if(self.b_label[i] > -1)
      {
        if(self.b_label[i] < mlen)
        {
          var x = b.x+pad;
          drawImageSizeCentered(gg.cur_level.m_icon[self.m_label[i]], x+b.h/2, b.y+yoff+b.h/4, b.h/2, gg.ctx);
          gg.ctx.fillText(gg.cur_level.m_label[self.m_label[i]],x,b.y+yoff+b.h-pad);
        }
        else
        {
          var x = b.x+pad;
          drawImageSizeCentered(gg.cur_level.b_icon[self.b_label[i]-mlen], x+b.h/2, b.y+yoff+b.h/4, b.h/2, gg.ctx);
          gg.ctx.fillText(gg.cur_level.b_label[self.b_label[i]-mlen],x,b.y+yoff+b.h-pad);
        }
      }
    }

    //value strings
    gg.ctx.textAlign = "right";
    gg.ctx.font = self.font;
    if(gg.cur_level.text_stage > 6)
    {
      for(var i = 0; i < self.m_btn.length; i++)
      {
        b = self.m_btn[i];
        gg.ctx.fillText(self.m[i],b.x+b.w-pad,self.eqn_y+self.font_h);
      }
      for(var i = 0; i < self.b_btn.length; i++)
      {
        b = self.b_btn[i];
        gg.ctx.fillText(self.b[i],b.x+b.w-pad,self.eqn_y+self.font_h);
      }
    }

    gg.ctx.textAlign = "left";

/*
    gg.ctx.fillStyle = light_gray;
    gg.ctx.fillText("X = "+fdisp(gg.timeline.t,1),self.yeq_x,self.eqn_y+self.eqn_h*3);
    gg.ctx.fillText("Y = "+fdisp(self.m*fdisp(gg.timeline.t,1)+self.b,1),self.yeq_x,self.eqn_y+self.eqn_h*4);
*/

  }

}

var table = function()
{
  var self = this;
  self.w = 0;
  self.h = 0;
  self.x = 0;
  self.y = 0;

  self.font_h = 25;
  self.font = self.font_h+"px DisposableDroidBB";

  self.bg_color = "#F1F9EB";
  self.predicted_color = "#94DEE8";
  self.known_color = "#5CC8D9";
  self.text_color = "#4D514B";

  self.t_data = [];
  self.known_data = [];
  self.predicted_data = [];
  self.data_visible = 0;
  self.simd_visible = 0;

  self.correct = 0;

  self.clear = function()
  {
    self.t_data = [];
    self.known_data = [];
    self.predicted_data = [];
    self.data_visible = 0;
    self.simd_visible = 0;
    self.correct = 0;
  }

  self.verify = function()
  {
    var old_correct = self.correct;
    self.correct = self.data_visible;
    for(var i = 0; i < self.predicted_data.length && i < self.known_data.length; i++)
      if(self.predicted_data[i] != self.known_data[i] && self.known_data[i] != "-") self.correct = 0;
    if(gg.cur_level.text_stage == 7 && self.correct && !old_correct)
    {
      gg.message_box.nq_group(gg.cur_level.text.submit);
      gg.cur_level.text_stage++;
      gg.stage_t = 0;
    }
  }

  self.tick = function()
  {
    if(gg.timeline.t > self.simd_visible) self.simd_visible = gg.timeline.t;
  }

  self.draw = function()
  {
    //gg.ctx.strokeStyle = red;
    //strokeBox(self,gg.ctx);

    gg.ctx.strokeStyle = self.bg_color;
    gg.ctx.lineWidth = 3;

    var y0 = self.y;
    var y1 = self.y+self.h/3;
    var y2 = self.y+self.h*2/3;
    var y3 = self.y+self.h;
    var y01 = lerp(y0,y1,0.5);
    var y12 = lerp(y1,y2,0.5);
    var y23 = lerp(y2,y3,0.5);
    var x = self.x;
    var w = self.w/(gg.timeline.t_max+2);

    gg.ctx.fillStyle = self.predicted_color;
    gg.ctx.fillRect(x,y1,self.w,y2-y1);
    gg.ctx.fillStyle = self.known_color;
    gg.ctx.fillRect(x,y2,self.w,y3-y2);

    drawLine(self.x,y1,self.x+self.w,y1,gg.ctx);
    drawLine(self.x,y2,self.x+self.w,y2,gg.ctx);

    gg.ctx.fillStyle = self.text_color;
    gg.ctx.font = "16px DisposableDroidBB";
    gg.ctx.textAlign = "left";
    x = self.x+w;
    drawLine(x,y1,x,y3,gg.ctx);
    x -= w;
    gg.ctx.fillStyle = black;
    gg.ctx.fillText(gg.cur_level.x_label,x,y01+self.font_h/2);
    gg.ctx.fillText("Modeled",x,y12+self.font_h/2-13);
    gg.ctx.fillText("Data",x,y12+self.font_h/2);
    gg.ctx.fillStyle = white;
    gg.ctx.fillText("Collected",x,y23+self.font_h/2-13);
    gg.ctx.fillText("Data",x,y23+self.font_h/2);

    gg.ctx.fillStyle = black;
    gg.ctx.font = self.font;
    gg.ctx.textAlign = "center";

    for(var i = 0; i <= gg.timeline.t_max; i++)
    {
      x = self.x+(i+2)*w;
      drawLine(x,y1,x,y3,gg.ctx);
      x -= w/2;
      gg.ctx.fillStyle = black;
      gg.ctx.fillText(self.t_data[i],x,y01+self.font_h/2);
      if(self.simd_visible >= i)
      {
        if(self.data_visible)
        {
          if(self.known_data[i] == self.predicted_data[i] || self.correct)
            gg.ctx.drawImage(gg.eq_img,x-10,y2-10,20,20);
          else if(self.known_data[i] != "-")
            gg.ctx.drawImage(gg.neq_img,x-10,y2-10,20,20);
        }
        gg.ctx.fillText(self.predicted_data[i],x,y12+self.font_h/3);
      }
      else gg.ctx.fillText("-",x,y12+self.font_h/3);

      gg.ctx.fillStyle = white;
      if(self.data_visible) gg.ctx.fillText(self.known_data[i],x,y23+self.font_h/2);
      else gg.ctx.fillText("-",x,y23+self.font_h/2);

      if(i == gg.timeline.t_max && self.correct && !gg.cur_level.correct && !gg.timeline.fast_sim && !gg.content_dragger.dragging_sim)
      {
        var s = 30;
        gg.ctx.drawImage(gg.notice_img,x+w/2-s/2,y1-s/2,s,s);
      }
    }

  }

}

var message_box = function()
{
  var self = this;
  self.w = 0;
  self.h = 0;
  self.x = 0;
  self.y = 0;

  self.monitor_x = 0;
  self.monitor_y = 0;
  self.monitor_w = 0;
  self.monitor_h = 0;

  self.input_x = 0;
  self.input_y = 0;
  self.input_w = 0;
  self.input_h = 0;

  self.bubble_w = 0;
  self.text_w = 0;

  self.pad = 10;
  self.font_h = 20;
  self.font = self.font_h+"px DisposableDroidBB";

  self.ai_text_color = "#4D514C";
  self.you_text_color = "#FEFFFF";
  self.data_text_color = "#FF6666";
  self.bg_color = "#F1F9EB";

  self.top_y = 0;
  self.max_top_y = 0;
  self.target_top_y = 0;
  self.bottom_y = 0;
  self.data_y = 0;
  self.constant_ys = [];

  self.advance_t = self.thinking_buff-1;
  self.thinking_buff = 50;

  self.prompt_player_input = 0;
  self.prompt_ai_typing = 0;
  self.prompt_end = 0;

  self.requested_end = 0;
  self.requested_advance = 0;

  self.triggers = [];
  self.texts = [];
  self.bubbles = [];
  self.types = [];
  self.metas = [];

  self.displayed_i = 0;

  self.size = function()
  {
    self.bubble_w = self.w-self.pad*3;
    self.text_w = self.bubble_w-self.pad*2;
    self.bottom_y = self.y+self.h-(self.font_h+self.pad*3);

    self.monitor_x = self.x;
    self.monitor_y = self.y;
    self.monitor_w = self.w;
    self.monitor_h = self.monitor_w;

    self.input_x = self.x+self.pad;
    self.input_y = self.bottom_y;
    self.input_w = self.w-self.pad*2;
    self.input_h = self.font_h+self.pad*2;
  }

  self.clear = function()
  {
    self.triggers = [];
    self.texts = [];
    self.bubbles = [];
    self.types = [];
    self.metas = [];

    self.top_y = self.bottom_y;
    self.max_top_y = self.top_y;
    self.target_top_y = self.max_top_y;
    self.requested_end = 0;
    self.requested_advance = 0;
    self.displayed_i = 0;
    self.advance_t = self.thinking_buff;
  }

  self.nq = function(trigger, text, type, meta)
  {
    trigger.tstate = clone(trigger.state);
    self.triggers.push(trigger);
    self.texts.push(text);
    self.bubbles.push(textToLines(self.font,self.text_w,text,gg.ctx));
    self.types.push(type);
    self.metas.push(meta);

    self.prompt_end = 0;
    self.requested_end = 0;
    self.requested_advance = 0;
  }

  self.nq_group = function(text)
  {
    for(var i = 0; i < text.length; i+=4)
      self.nq(text[i],text[i+1],text[i+2],text[i+3]);
  }

  self.calculate_top = function()
  {
    self.max_top_y = self.bottom_y;
    for(var i = 0; i < self.displayed_i; i++)
    {
      self.max_top_y -= self.pad;
      if(self.types[i] == CONTENT_DATA || self.types[i] == CONTENT_SIM)
        self.max_top_y -= self.font_h+self.pad;
      else
      {
        for(var j = 0; j < self.bubbles[i].length; j++)
          self.max_top_y -= self.font_h+self.pad;
      }
      self.max_top_y -= self.pad;
    }
    if(self.prompt_ai_typing) self.max_top_y -= self.pad*3;
    self.target_top_y = self.max_top_y;
  }

  self.advance = function()
  {
    self.prompt_ai_typing = 0;
    self.advance_t = 0;
    self.displayed_i++;
    self.calculate_top();
    if(self.types[self.displayed_i-1] == CONTENT_AI)
      gg.monitor.talk_t = 0;
  }

  self.click = function(evt)
  {
    if(self.prompt_end && self.displayed_i == self.texts.length && ptWithin(self.monitor_x,self.monitor_y,self.monitor_w,self.monitor_h,evt.doX,evt.doY))
    {
      self.requested_end = 1;
      return 1;
    }
    if(self.displayed_i < self.texts.length)
    {
      if(self.types[self.displayed_i] == CONTENT_AI)
        self.advance();
      else if(ptWithin(self.input_x,self.input_y,self.input_w,self.input_h,evt.doX,evt.doY))
        self.advance();
      return 1;
    }
    else
    {
      self.requested_advance = 1;
    }
    return 0;
  }

  self.dragging = 0;
  self.drag_start_y = 0;
  self.dragStart = function(evt)
  {
    if(self.click(evt)) { self.dragging = 0; return 0; }
    self.drag_start_y = evt.doY;
    return 1;
  }
  self.drag = function(evt)
  {
    self.target_top_y += evt.doY-self.drag_start_y;
    if(self.target_top_y > self.y+self.w+self.pad) self.target_top_y = self.y+self.w+self.pad;
    if(self.target_top_y < self.max_top_y) self.target_top_y = self.max_top_y;
    self.drag_start_y = evt.doY;
  }
  self.dragFinish = function(evt)
  {
  }

  self.tick = function()
  {
    self.top_y = lerp(self.top_y,self.target_top_y,0.1);
    self.advance_t++;

    if(self.displayed_i < self.texts.length && self.triggers[self.displayed_i].type == TRIGGER_TIMER)
    {
      self.triggers[self.displayed_i].tstate--;
      if(self.triggers[self.displayed_i].tstate <= 0)
        self.advance();
    }

    var old_prompt_ai_typing = self.prompt_ai_typing
    self.prompt_player_input = 0;
    self.prompt_ai_typing = 0;
    self.prompt_end = 0;
    if(self.advance_t >= self.thinking_buff && self.displayed_i < self.texts.length) //possible need for prompt
    {
      if(self.types[self.displayed_i] == CONTENT_PLAYER)
      {
        if(self.triggers[self.displayed_i].type == TRIGGER_CLICK)
          self.prompt_player_input = 1;
        else if(self.triggers[self.displayed_i].type == TRIGGER_TIMER)
          ; //odd
      }
      else if(self.types[self.displayed_i] == CONTENT_AI)
      {
        if(self.triggers[self.displayed_i].type == TRIGGER_CLICK)
          ; //odd
        else if(self.triggers[self.displayed_i].type == TRIGGER_TIMER)
          self.prompt_ai_typing = 1;
      }
    }
    else if(self.displayed_i == self.texts.length) self.prompt_end = 1;

    if(old_prompt_ai_typing != self.prompt_ai_typing)
      self.calculate_top();
  }

  self.draw = function()
  {
    //gg.ctx.strokeStyle = red;
    //strokeBox(self,gg.ctx);

    gg.ctx.lineWidth = 1;
    gg.ctx.fillStyle = black;
    gg.ctx.textAlign = "left";
    gg.ctx.font = self.font;
    var y = self.top_y;
    for(var i = 0; i < self.displayed_i; i++)
    {
      if(self.types[i] == CONTENT_PLAYER)
      {
        gg.ctx.fillStyle = self.you_text_color;
        gg.ctx.fillRect(self.x+self.pad*2,y,self.bubble_w,self.pad+(self.font_h+self.pad)*self.bubbles[i].length);
        gg.ctx.strokeRect(self.x+self.pad*2,y,self.bubble_w,self.pad+(self.font_h+self.pad)*self.bubbles[i].length);
      }
      else if(self.types[i] == CONTENT_AI)
      {
        gg.ctx.fillStyle = self.ai_text_color;
        gg.ctx.fillRect(self.x+self.pad,  y,self.bubble_w,self.pad+(self.font_h+self.pad)*self.bubbles[i].length);
        gg.ctx.strokeRect(self.x+self.pad,  y,self.bubble_w,self.pad+(self.font_h+self.pad)*self.bubbles[i].length);
      }
      else if(self.types[i] == CONTENT_DATA)
      {
        gg.ctx.drawImage(gg.data_img,self.x+self.pad+self.bubble_w/2-30, y+(self.pad+self.font_h+self.pad)/2-30, 60, 60);
        if(!gg.content_dragger.dragging_data && !gg.table.data_visible)
        {
          var s = 30;
          gg.ctx.drawImage(gg.notice_img,self.x+self.pad+self.bubble_w-s,y,s,s);
        }
        self.data_y = y;
      }
      else if(self.types[i] == CONTENT_CONSTANT)
      {
        gg.ctx.drawImage(gg.data_img,self.x+self.pad+self.bubble_w/2-30, y+(self.pad+self.font_h+self.pad)/2-30, 60, 60);
        var c = 0;
        for(var j = 0; j < gg.cur_level.m_label.length; j++)
          if(self.bubbles[i][0] == gg.cur_level.m_label[j]) c = gg.cur_level.m_correct[j];
        for(var j = 0; j < gg.cur_level.b_label.length; j++)
          if(self.bubbles[i][0] == gg.cur_level.b_label[j]) c = gg.cur_level.b_correct[j];
        gg.ctx.fillStyle = self.data_text_color; gg.ctx.fillText(c,self.x+self.pad+self.bubble_w/2+30, y+(self.pad+self.font_h+self.pad)*2/3);
        self.constant_ys.push(y);
      }
      else if(self.types[i] == CONTENT_SIM)
      {
        gg.ctx.drawImage(gg.submit_img,self.x+self.pad+self.bubble_w/2-30, y+(self.pad+self.font_h+self.pad)/2-30, 60, 60);
      }
      gg.ctx.fillStyle = black;
      y += self.pad;
      if(self.types[i] == CONTENT_DATA || self.types[i] == CONTENT_SIM || self.types[i] == CONTENT_CONSTANT)
      {
        gg.ctx.textAlign = "left"; gg.ctx.fillStyle = self.data_text_color; gg.ctx.fillText(self.bubbles[i][0],self.x+self.pad*2,y+self.font_h);
        y += self.font_h+self.pad;
      }
      else
      {
        for(var j = 0; j < self.bubbles[i].length; j++)
        {
          if(self.types[i] == CONTENT_PLAYER) { gg.ctx.textAlign = "right"; gg.ctx.fillStyle = self.ai_text_color;  gg.ctx.fillText(self.bubbles[i][j],self.x+self.w-self.pad*2,y+self.font_h); }
          else                                { gg.ctx.textAlign = "left";  gg.ctx.fillStyle = self.you_text_color; gg.ctx.fillText(self.bubbles[i][j],self.x+self.pad*2,       y+self.font_h); }
          y += self.font_h+self.pad;
        }
      }
      y += self.pad;
    }
    gg.ctx.textAlign = "left";

    //"input" box
    gg.ctx.fillStyle = self.bg_color;
    gg.ctx.fillRect(self.x,self.input_y-self.pad+1,self.w,self.h);

    if(!self.prompt_player_input)
    {
      gg.ctx.fillStyle = light_gray;
      gg.ctx.fillRect(self.input_x,self.input_y,self.input_w,self.input_h);
      gg.ctx.strokeRect(self.input_x,self.input_y,self.input_w,self.input_h);
    }
    else //needs input
    {
      if(floor(self.advance_t/20)%2)
        drawLine(self.input_x+self.pad,self.input_y+self.pad,self.input_x+self.pad,self.input_y+self.input_h-self.pad,gg.ctx)
      gg.ctx.strokeRect(self.input_x,self.input_y,self.input_w,self.input_h);
      var s = 30;
      gg.ctx.drawImage(gg.notice_img,self.input_x+self.input_w-s/2,self.input_y-s/2,s,s);
    }

    //"ai typing"
    if(self.prompt_ai_typing)
    {
      switch(floor(self.advance_t/20)%3)
      {
        case 0: gg.ctx.fillText("typing.",self.x+self.pad*2,y+self.font_h); break;
        case 1: gg.ctx.fillText("typing..",self.x+self.pad*2,y+self.font_h); break;
        case 2: gg.ctx.fillText("typing...",self.x+self.pad*2,y+self.font_h); break;
      }
    }

    //ai
    var s = self.w-self.pad*2;
    gg.ctx.imageSmoothingEnabled = 0;
    gg.ctx.drawImage(gg.monitor.screen,(gg.monitor.screen.width-gg.monitor.screen.height)/2,0,gg.monitor.screen.height,gg.monitor.screen.height,self.monitor_x,self.monitor_y,self.monitor_w,self.monitor_h);
    gg.ctx.imageSmoothingEnabled = 1;
    if(self.prompt_end)
    {
      var s = 30;
      gg.ctx.drawImage(gg.notice_img,self.monitor_x+self.monitor_w-s/2,self.monitor_y+self.monitor_h/4-s/2,s,s);
    }
    var h = gg.neck_heart_img.height/gg.neck_heart_img.width*self.monitor_w;
    gg.ctx.drawImage(gg.neck_heart_img,self.monitor_x,self.monitor_y+self.monitor_h-h/2,self.monitor_w,h);
  }

}

