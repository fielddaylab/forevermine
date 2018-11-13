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

  self.bg_color = "#F0F9EC";

  self.eye_img = GenIcon(100,100);
  self.eye_img.context.fillStyle = red;
  self.eye_img.context.fillRect(0,0,self.eye_img.width,self.eye_img.height);
  self.eye_img = GenImg("assets/eye.png");

  self.mouth_img = GenIcon(100,100);
  self.mouth_img.context.fillStyle = red;
  self.mouth_img.context.fillRect(0,0,self.eye_img.width,self.eye_img.height);
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
    else                self.mouth_nh = lerp(self.mouth_nh,                1,0.8);
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

var data_dragger = function()
{
  var self = this;
  self.w = 0;
  self.h = 0;
  self.x = 0;
  self.y = 0;

  self.dragging_data = 0;
  self.dragging_sim = 0;
  self.last_evt = 0;

  //drag
  self.ptWithinData = function(evt)
  {
    var mb = gg.message_box;
    //copied from mb draw
    var y = mb.top_y;
    for(var i = 0; i < mb.displayed_i; i++)
    {
      if(mb.speakers[i] == SPEAKER_DATA && ptWithin(mb.x+mb.pad,  y,mb.bubble_w,mb.pad+(mb.font_h+mb.pad), evt.doX,evt.doY))
        return 1;
      y += mb.pad;
      if(mb.speakers[i] != SPEAKER_DATA)
        y += (mb.font_h+mb.pad)*mb.bubbles[i].length;
      else
        y += mb.font_h+mb.pad;
      y += mb.pad;
    }
    return 0;
  }
  self.ptWithinSim = function(evt)
  {
    if(gg.table.simd_visible < gg.table.max_t) return 0;
    var t = gg.table;
    var y2 = t.y+t.h*2/3;
    var y3 = t.y+t.h;
    return ptWithin(t.x,y2,t.w,y3-y2,evt.doX,evt.doY);
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

    self.drag(evt);

    if(!gg.table.data_visible && self.ptWithinData(evt)) { self.dragging_data = 1; return 1; }
    if(gg.table.data_visible && self.ptWithinSim(evt))   { self.dragging_sim = 1;  return 1; }
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
    }
    if(self.dragging_sim && self.ptWithinChat(evt))
    {
      gg.cur_level.submit(gg.table.correct);
    }
    self.dragging_data = 0;
    self.dragging_sim = 0;
  }

  self.draw = function()
  {
    if(gg.cur_level.i == 0)
    {
      if(!gg.table.data_visible && gg.message_box.displayed_i > 0 && gg.message_box.speakers[gg.message_box.displayed_i-1] == SPEAKER_DATA)
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
          var y2 = gg.table.y+gg.table.h*2/3;
          gg.ctx.fillStyle = "rgba(0,0,0,0.5)";
          gg.ctx.fillRect(0,0,gg.canv.width,y2);
          gg.ctx.fillRect(0,y2,gg.table.x,gg.table.h);
          gg.ctx.fillRect(gg.table.x+gg.table.w,y2,gg.canv.width-(gg.table.x+gg.table.w),gg.table.h);
          gg.ctx.fillStyle = white;
          gg.ctx.fillText("DRAG ->",gg.canv.width-200,y2-40);
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
      gg.ctx.fillStyle = red;
      gg.ctx.fillRect(self.last_evt.doX,self.last_evt.doY,100,100);
    }
    if(self.dragging_sim)
    {
      gg.ctx.fillStyle = green;
      gg.ctx.fillRect(self.last_evt.doX,self.last_evt.doY,100,100);
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
  self.font_h = 15;
  self.font = self.font_h+"px Helvetica";

  self.text = [];
  self.bubbles = [];
  self.speakers = [];
  self.emotes = [];

  self.displayed_i = 0;

  self.size = function()
  {
    self.text_w = self.w-self.pad*2;
  }

  self.clear = function()
  {
    self.text = [];
    self.bubbles = []
    self.speakers = []
    self.emotes = []
    self.displayed_i = 0;
  }

  self.nq = function(text, speaker, emote)
  {
    self.text.push(text);
    self.bubbles.push(textToLines(self.font,self.text_w,text,gg.ctx));
    self.speakers.push(speaker);
    self.emotes.push(emote);
    if(self.text.length == 1 && self.speakers[0] == SPEAKER_AI) gg.monitor.talk_t = 0;
  }

  self.nq_group = function(text)
  {
    for(var i = 0; i < text.length; i+=3)
      self.nq(text[i],text[i+1],text[i+2]);
  }

  self.advance = function()
  {
    self.displayed_i++;
    if(self.displayed_i < self.text.length && self.speakers[self.displayed_i] == SPEAKER_AI) gg.monitor.talk_t = 0;
  }

  self.click = function(evt)
  {
    if(self.displayed_i < self.text.length) self.advance();
  }

  self.tick = function()
  {
  }

  self.draw = function()
  {
    if(self.displayed_i >= self.text.length) return;

    gg.ctx.lineWidth = 1;
    strokeBox(self,gg.ctx);
    gg.ctx.fillStyle = black;
    gg.ctx.globalAlpha = 0.5;
    fillBox(self,gg.ctx);
    gg.ctx.globalAlpha = 1;

    gg.ctx.fillStyle = white;
    gg.ctx.textAlign = "left";
    gg.ctx.font = self.font;
    switch(self.speakers[self.displayed_i])
    {
      case SPEAKER_AI: gg.ctx.fillText("GEMMA",self.x+self.pad,self.y+self.font_h/2); break;
      case SPEAKER_PLAYER: gg.ctx.fillText("YOU",self.x+self.pad,self.y+self.font_h/2); break;
    }
    var y = self.y+self.pad;
    for(var i = 0; i < self.bubbles[self.displayed_i].length; i++)
    {
      gg.ctx.fillText(self.bubbles[self.displayed_i][i],self.x+self.pad,y+self.font_h);
      y += self.font_h+self.pad;
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
    return check;
  }

  self.tick = function()
  {
    if(self.fast_sim && self.t < self.t_max) self.t += 0.1;
    else
    {
      if(self.t < self.t_target && !self.dragging) self.t += 0.01;
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

    strokeBox(self.advance_btn,gg.ctx);

    var t_x;

    gg.ctx.strokeStyle = black;
    t_x = mapVal(0,self.t_max,self.sx,self.ex,self.t);
    gg.ctx.fillStyle = white;
    var s = self.h;
    gg.ctx.fillRect(t_x-s/2,self.y,s,self.h);

    if(self.t < self.t_target)
    {
      gg.ctx.font = "12px Helvetica";
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

  self.graph = {x:0,y:0,w:0,h:0};

  self.m = 0;
  self.b = 0;
  self.correct_m = 0;
  self.correct_b = 0;
  self.v_min = 0;
  self.v_max = 0;

  self.m_btn = new NumberBox(0,0,0,0,0,0.01,function(v){ v = fdisp(v,1); if(self.m == v) return; self.m = v; self.invalidate_sim(); self.draw_params(); });
  self.minc_btn = new ButtonBox(0,0,0,0,    function() { self.m_btn.set(self.m_btn.number+0.1); });
  self.mdec_btn = new ButtonBox(0,0,0,0,    function() { self.m_btn.set(self.m_btn.number-0.1); });
  self.b_btn = new NumberBox(0,0,0,0,0,0.01,function(v){ v = fdisp(v,1); if(self.b == v) return; self.b = v; self.invalidate_sim(); self.draw_params(); });
  self.binc_btn = new ButtonBox(0,0,0,0,    function() { self.b_btn.set(self.b_btn.number+0.1); });
  self.bdec_btn = new ButtonBox(0,0,0,0,    function() { self.b_btn.set(self.b_btn.number-0.1); });

  self.invalidate_sim = function()
  {
    gg.timeline.t = 0;
    gg.timeline.fast_sim = 1;
    gg.table.simd_visible = 0;
  }

  self.font_h = 50;
  self.font = self.font_h+"px Helvetica";

  self.btn_w = 0;
  self.eqn_x = 0;
  self.eqn_y = 0;
  self.eqn_w = 0;
  self.eqn_h = self.font_h;
  self.yeq_x = 0;
  self.xp_x = 0;

  self.calculate_table = function()
  {
    gg.table.clear();
    for(var i = 0; i <= gg.timeline.t_max; i++)
    {
      gg.table.t_data[i] = i;
      if(i < 3) gg.table.known_data[i] = self.correct_m*i+self.correct_b;
      else      gg.table.known_data[i] = "-";
      gg.table.predicted_data[i] = self.m*i+self.b;
    }
    gg.table.verify();
  }
  self.calculate_table();

  self.size = function()
  {
    gg.ctx.font = self.font;
    self.btn_w = gg.ctx.measureText("-0.0").width;
    self.eqn_w = gg.ctx.measureText("y = ").width+self.btn_w+gg.ctx.measureText("x + ").width+self.btn_w;
    self.eqn_h = self.font_h;
    self.eqn_x = self.x+self.w/3-self.eqn_w/2;
    self.eqn_y = self.y+self.h/3-self.eqn_h/2;

    self.m_btn.w = self.btn_w;
    self.m_btn.h = self.font_h;
    self.m_btn.y = self.eqn_y;

    self.b_btn.w = self.btn_w;
    self.b_btn.h = self.font_h;
    self.b_btn.y = self.eqn_y;

    self.yeq_x = self.eqn_x;
    self.m_btn.x = self.yeq_x+gg.ctx.measureText("y = ").width;
    self.xp_x = self.m_btn.x+self.m_btn.w;
    self.b_btn.x = self.xp_x+gg.ctx.measureText("x + ").width;

    self.minc_btn.w = self.m_btn.w;
    self.minc_btn.h = self.m_btn.h/2;
    self.minc_btn.x = self.m_btn.x;
    self.minc_btn.y = self.m_btn.y-self.m_btn.h;
    self.mdec_btn.w = self.m_btn.w;
    self.mdec_btn.h = self.m_btn.h/2;
    self.mdec_btn.x = self.m_btn.x;
    self.mdec_btn.y = self.m_btn.y+self.m_btn.h+self.m_btn.h/2;
    self.binc_btn.w = self.b_btn.w;
    self.binc_btn.h = self.b_btn.h/2;
    self.binc_btn.x = self.b_btn.x;
    self.binc_btn.y = self.b_btn.y-self.b_btn.h;
    self.bdec_btn.w = self.b_btn.w;
    self.bdec_btn.h = self.b_btn.h/2;
    self.bdec_btn.x = self.b_btn.x;
    self.bdec_btn.y = self.b_btn.y+self.b_btn.h+self.b_btn.h/2;

    self.draw_params();
  }

  self.v = function(x)
  {
    return self.m*x + self.b;
  }

  self.sx = 0;
  self.sy = 0;
  self.ex = 0;
  self.ey = 0;
  self.draw_params = function()
  {
    self.sy = self.v(0);
    self.ey = self.v(gg.timeline.t_max);
    self.sx = 0;
    self.ex = gg.timeline.t_max;
         if(self.sy < self.v_min && self.ey < self.v_min) { self.sy = self.v_min; self.ey = self.v_min; }
    else if(self.sy > self.v_max && self.ey > self.v_max) { self.sy = self.v_max; self.ey = self.v_max; }
    else
    {
      if(self.sy < self.v_min) { self.sx = (self.v_min-self.b)/self.m; self.sy = self.v_min; }
      if(self.sy > self.v_max) { self.sx = (self.v_max-self.b)/self.m; self.sy = self.v_max; }
      if(self.ey < self.v_min) { self.ex = (self.v_min-self.b)/self.m; self.ey = self.v_min; }
      if(self.ey > self.v_max) { self.ex = (self.v_max-self.b)/self.m; self.ey = self.v_max; }
    }

    self.sy = mapVal(self.v_min, self.v_max, self.graph.y+self.graph.h, self.graph.y, self.sy);
    self.ey = mapVal(self.v_min, self.v_max, self.graph.y+self.graph.h, self.graph.y, self.ey);
    self.sx = mapVal(0, gg.timeline.t_max, self.graph.x, self.graph.x+self.graph.w, self.sx);
    self.ex = mapVal(0, gg.timeline.t_max, self.graph.x, self.graph.x+self.graph.w, self.ex);

    for(var i = 0; i <= gg.timeline.t_max; i++)
      gg.table.predicted_data[i] = fdisp(self.v(gg.table.t_data[i]),1);
    gg.table.verify();
  }

  self.filter = function(keyer,blurer,dragger,clicker)
  {
    var check = 1;
    if(keyer)
    {
      keyer.filter(self.m_btn);
      keyer.filter(self.b_btn);
    }
    if(blurer)
    {
      blurer.filter(self.m_btn);
      blurer.filter(self.b_btn);
    }
    if(dragger)
    {
      if(check) check = !dragger.filter(self.m_btn);
      if(check) check = !dragger.filter(self.b_btn);
    }
    if(clicker)
    {
      if(check) check = !clicker.filter(self.minc_btn);
      if(check) check = !clicker.filter(self.mdec_btn);
      if(check) check = !clicker.filter(self.binc_btn);
      if(check) check = !clicker.filter(self.bdec_btn);
    }
    return !check;
  }

  self.tick = function()
  {
  }

  self.draw = function()
  {
    var x;
    var y;

    gg.ctx.lineWidth = 1;
    gg.ctx.strokeStyle = black;
    gg.ctx.fillStyle = black;

    //graph
    strokeBox(self.graph,gg.ctx);
    if(gg.timeline.t < gg.timeline.t_max)
    {
      var t = gg.timeline.t/gg.timeline.t_max;
      var tx = lerp(self.graph.x,self.graph.x+self.graph.w,t);
      if(tx > self.sx)
      {
        t = min(invlerp(self.sx,self.ex,tx),1);
        drawLine(self.sx,self.sy,lerp(self.sx,self.ex,t),lerp(self.sy,self.ey,t), gg.ctx);
      }
    }
    else
      drawLine(self.sx,self.sy,self.ex,self.ey, gg.ctx);
    gg.ctx.font = "12px Helvetica";
    gg.ctx.fillText(fdisp(self.v_min),self.graph.x-10,self.graph.y+self.graph.h);
    gg.ctx.fillText(fdisp(self.v_max),self.graph.x-10,self.graph.y);

    gg.ctx.strokeStyle = gray;
    var t_x = mapVal(0,gg.timeline.t_max,self.graph.x,self.graph.x+self.graph.w,gg.timeline.t);
    drawLine(t_x,self.graph.y,t_x,self.graph.y+self.graph.h,gg.ctx);

    //eqn
    gg.ctx.fillStyle = white;
    fillBox(self.m_btn,gg.ctx);
    fillBox(self.minc_btn,gg.ctx);
    fillBox(self.mdec_btn,gg.ctx);
    fillBox(self.b_btn,gg.ctx);
    fillBox(self.binc_btn,gg.ctx);
    fillBox(self.bdec_btn,gg.ctx);

    gg.ctx.font = self.font;
    gg.ctx.textAlign = "left";
    gg.ctx.fillText("y = ",self.yeq_x,self.eqn_y+self.eqn_h);
    gg.ctx.fillText("x + ",self.xp_x,self.eqn_y+self.eqn_h);
    gg.ctx.textAlign = "right";
    gg.ctx.fillStyle = black;
    gg.ctx.fillText(self.m,self.m_btn.x+self.m_btn.w,self.eqn_y+self.eqn_h);
    gg.ctx.fillText(self.b,self.b_btn.x+self.b_btn.w,self.eqn_y+self.eqn_h);
    gg.ctx.textAlign = "left";

    gg.ctx.fillStyle = light_gray;
    gg.ctx.fillText("x = "+fdisp(gg.timeline.t,1),self.yeq_x,self.eqn_y+self.eqn_h*3);
    gg.ctx.fillText("y = "+fdisp(self.m*fdisp(gg.timeline.t,1)+self.b,1),self.yeq_x,self.eqn_y+self.eqn_h*4);

    if(gg.table.data_visible)
    {
      gg.ctx.fillStyle = red;
      var s = 10;
      for(var i = 0; i <= gg.timeline.t_max; i++)
      {
        if(gg.table.known_data[i] != "-")
        {
          x = mapVal(0,gg.timeline.t_max,self.graph.x,self.graph.x+self.graph.w,gg.table.t_data[i]);
          y = mapVal(self.v_min,self.v_max,self.graph.y+self.graph.h,self.graph.y,gg.table.known_data[i]);
          x = clamp(self.graph.x,self.graph.x+self.graph.w,x);
          y = clamp(self.graph.y,self.graph.y+self.graph.h,y);
          gg.ctx.fillRect(x-s/2,y-s/2,s,s);
        }
      }
    }

  }

}

var editable_quadratic = function()
{
  var self = this;
  self.w = 0;
  self.h = 0;
  self.x = 0;
  self.y = 0;

  self.graph = {x:0,y:0,w:0,h:0};

  self.a = 0;
  self.b = 0;
  self.c = 0;
  self.correct_a = 0;
  self.correct_b = 0;
  self.correct_c = 0;
  self.v_min = 0;
  self.v_max = 0;
  self.samples = 100;

  self.a_btn = new NumberBox(0,0,0,0,0,0.01,function(v){ v = fdisp(v,1); if(self.a == v) return; self.a = v; self.invalidate_sim(); self.draw_params(); });
  self.ainc_btn = new ButtonBox(0,0,0,0,    function() { self.a_btn.set(self.a_btn.number+0.1); });
  self.adec_btn = new ButtonBox(0,0,0,0,    function() { self.a_btn.set(self.a_btn.number-0.1); });
  self.b_btn = new NumberBox(0,0,0,0,0,0.01,function(v){ v = fdisp(v,1); if(self.b == v) return; self.b = v; self.invalidate_sim(); self.draw_params(); });
  self.binc_btn = new ButtonBox(0,0,0,0,    function() { self.b_btn.set(self.b_btn.number+0.1); });
  self.bdec_btn = new ButtonBox(0,0,0,0,    function() { self.b_btn.set(self.b_btn.number-0.1); });
  self.c_btn = new NumberBox(0,0,0,0,0,0.01,function(v){ v = fdisp(v,1); if(self.c == v) return; self.c = v; self.invalidate_sim(); self.draw_params(); });
  self.cinc_btn = new ButtonBox(0,0,0,0,    function() { self.c_btn.set(self.c_btn.number+0.1); });
  self.cdec_btn = new ButtonBox(0,0,0,0,    function() { self.c_btn.set(self.c_btn.number-0.1); });

  self.invalidate_sim = function()
  {
    gg.timeline.t = 0;
    gg.timeline.fast_sim = 1;
    gg.table.simd_visible = 0;
  }

  self.font_h = 50;
  self.font = self.font_h+"px Helvetica";

  self.btn_w = 0;
  self.eqn_x = 0;
  self.eqn_y = 0;
  self.eqn_w = 0;
  self.eqn_h = self.font_h;
  self.yeq_x = 0;
  self.xt_x = 0;
  self.xp_x = 0;

  self.v = function(x)
  {
    return (self.a*x+self.b)*x+self.c;
  }

  self.calculate_table = function()
  {
    gg.table.clear();
    for(var i = 0; i <= gg.timeline.t_max; i++)
    {
      gg.table.t_data[i] = i;
      if(i < 3) gg.table.known_data[i] = fdisp((self.correct_a*i+self.correct_b)*i + self.correct_c,1);
      else      gg.table.known_data[i] = "-";
      gg.table.predicted_data[i] = fdisp(self.v(i),1);
    }
    gg.table.verify();
  }
  self.calculate_table();

  self.size = function()
  {
    gg.ctx.font = self.font;
    self.btn_w = gg.ctx.measureText("-0.0").width;
    self.eqn_w = gg.ctx.measureText("y = (").width+self.btn_w+gg.ctx.measureText("x + ").width+self.btn_w+gg.ctx.measureText(")x + ").width+self.btn_w;
    self.eqn_h = self.font_h;
    self.eqn_x = self.x+self.w/2-self.eqn_w/2;
    self.eqn_y = self.y+self.h/2-self.eqn_h/2;

    self.a_btn.w = self.btn_w;
    self.a_btn.h = self.font_h;
    self.a_btn.y = self.eqn_y;

    self.b_btn.w = self.btn_w;
    self.b_btn.h = self.font_h;
    self.b_btn.y = self.eqn_y;

    self.c_btn.w = self.btn_w;
    self.c_btn.h = self.font_h;
    self.c_btn.y = self.eqn_y;

    self.yeq_x = self.eqn_x;
    self.a_btn.x = self.yeq_x+gg.ctx.measureText("y = (").width;
    self.xt_x = self.a_btn.x+self.a_btn.w;
    self.b_btn.x = self.xt_x+gg.ctx.measureText("x + ").width;
    self.xp_x = self.b_btn.x+self.b_btn.w;
    self.c_btn.x = self.xp_x+gg.ctx.measureText(")x + ").width;

    self.ainc_btn.w = self.a_btn.w;
    self.ainc_btn.h = self.a_btn.h/2;
    self.ainc_btn.x = self.a_btn.x;
    self.ainc_btn.y = self.a_btn.y-self.a_btn.h;
    self.adec_btn.w = self.a_btn.w;
    self.adec_btn.h = self.a_btn.h/2;
    self.adec_btn.x = self.a_btn.x;
    self.adec_btn.y = self.a_btn.y+self.a_btn.h+self.a_btn.h/2;

    self.binc_btn.w = self.b_btn.w;
    self.binc_btn.h = self.b_btn.h/2;
    self.binc_btn.x = self.b_btn.x;
    self.binc_btn.y = self.b_btn.y-self.b_btn.h;
    self.bdec_btn.w = self.b_btn.w;
    self.bdec_btn.h = self.b_btn.h/2;
    self.bdec_btn.x = self.b_btn.x;
    self.bdec_btn.y = self.b_btn.y+self.b_btn.h+self.b_btn.h/2;

    self.cinc_btn.w = self.c_btn.w;
    self.cinc_btn.h = self.c_btn.h/2;
    self.cinc_btn.x = self.c_btn.x;
    self.cinc_btn.y = self.c_btn.y-self.c_btn.h;
    self.cdec_btn.w = self.c_btn.w;
    self.cdec_btn.h = self.c_btn.h/2;
    self.cdec_btn.x = self.c_btn.x;
    self.cdec_btn.y = self.c_btn.y+self.c_btn.h+self.c_btn.h/2;

    self.draw_params();
  }

  self.xpts = [];
  self.ypts = [];
  self.draw_params = function()
  {
    var x;
    var y;
    for(var i = 0; i < self.samples; i++)
    {
      x = mapVal(0,self.samples-1,0,gg.timeline.t_max,i);
      y = self.v(x);
      self.xpts[i] = mapVal(0, gg.timeline.t_max, self.graph.x, self.graph.x+self.graph.w, x);
      self.ypts[i] = clamp(self.graph.y, self.graph.y+self.graph.h, mapVal(self.v_min, self.v_max, self.graph.y+self.graph.h, self.graph.y, y)); //map then clamp separate because y flipped
    }

    for(var i = 0; i <= gg.timeline.t_max; i++)
      gg.table.predicted_data[i] = fdisp(self.v(gg.table.t_data[i]),1);
    gg.table.verify();
  }

  self.filter = function(keyer,blurer,dragger,clicker)
  {
    var check = 1;
    if(keyer)
    {
      keyer.filter(self.a_btn);
      keyer.filter(self.b_btn);
      keyer.filter(self.c_btn);
    }
    if(blurer)
    {
      blurer.filter(self.a_btn);
      blurer.filter(self.b_btn);
      blurer.filter(self.c_btn);
    }
    if(dragger)
    {
      if(check) check = !dragger.filter(self.a_btn);
      if(check) check = !dragger.filter(self.b_btn);
      if(check) check = !dragger.filter(self.c_btn);
    }
    if(clicker)
    {
      if(check) check = !clicker.filter(self.ainc_btn);
      if(check) check = !clicker.filter(self.adec_btn);
      if(check) check = !clicker.filter(self.binc_btn);
      if(check) check = !clicker.filter(self.bdec_btn);
      if(check) check = !clicker.filter(self.cinc_btn);
      if(check) check = !clicker.filter(self.cdec_btn);
    }
    return !check;
  }

  self.tick = function()
  {
  }

  self.draw = function()
  {
    var x;
    var y;

    gg.ctx.lineWidth = 1;
    gg.ctx.strokeStyle = black;
    gg.ctx.fillStyle = black;

    //graph
    strokeBox(self.graph,gg.ctx);
    var t = gg.timeline.t/gg.timeline.t_max;
    var tn = self.samples*t;
    var tr = tn%1;
    tn = round(tn-tr);
    gg.ctx.beginPath();
    gg.ctx.moveTo(self.xpts[0],self.ypts[0]);
    for(var i = 0; i < tn; i++)
      gg.ctx.lineTo(self.xpts[i],self.ypts[i]);
    if(tn < self.samples)
      gg.ctx.lineTo(lerp(self.xpts[tn],self.xpts[tn+1],tr),lerp(self.ypts[tn],self.ypts[tn+1],tr));
    gg.ctx.stroke();
    gg.ctx.font = "12px Helvetica";
    gg.ctx.fillText(fdisp(self.v_min),self.graph.x-10,self.graph.y+self.graph.h);
    gg.ctx.fillText(fdisp(self.v_max),self.graph.x-10,self.graph.y);

    gg.ctx.strokeStyle = gray;
    var t_x = mapVal(0,gg.timeline.t_max,self.graph.x,self.graph.x+self.graph.w,gg.timeline.t);
    drawLine(t_x,self.graph.y,t_x,self.graph.y+self.graph.h,gg.ctx);

    //eqn
    gg.ctx.fillStyle = white;
    fillBox(self.a_btn,gg.ctx);
    fillBox(self.ainc_btn,gg.ctx);
    fillBox(self.adec_btn,gg.ctx);
    fillBox(self.b_btn,gg.ctx);
    fillBox(self.binc_btn,gg.ctx);
    fillBox(self.bdec_btn,gg.ctx);
    fillBox(self.c_btn,gg.ctx);
    fillBox(self.cinc_btn,gg.ctx);
    fillBox(self.cdec_btn,gg.ctx);

    gg.ctx.font = self.font;
    gg.ctx.textAlign = "left";
    gg.ctx.fillText("y = (",self.yeq_x,self.eqn_y+self.eqn_h);
    gg.ctx.fillText("x + ",self.xt_x,self.eqn_y+self.eqn_h);
    gg.ctx.fillText(")x + ",self.xp_x,self.eqn_y+self.eqn_h);
    gg.ctx.textAlign = "right";
    gg.ctx.fillStyle = black;
    gg.ctx.fillText(self.a,self.a_btn.x+self.a_btn.w,self.eqn_y+self.eqn_h);
    gg.ctx.fillText(self.b,self.b_btn.x+self.b_btn.w,self.eqn_y+self.eqn_h);
    gg.ctx.fillText(self.c,self.c_btn.x+self.c_btn.w,self.eqn_y+self.eqn_h);
    gg.ctx.textAlign = "left";

    gg.ctx.fillStyle = light_gray;
    gg.ctx.fillText("x = "+fdisp(gg.timeline.t,1),self.yeq_x,self.eqn_y+self.eqn_h*3);
    gg.ctx.fillText("y = "+fdisp(self.v(gg.timeline.t),2),self.yeq_x,self.eqn_y+self.eqn_h*4);

    if(gg.table.data_visible)
    {
      gg.ctx.fillStyle = red;
      var s = 10;
      for(var i = 0; i <= gg.timeline.t_max; i++)
      {
        if(gg.table.known_data[i] != "-")
        {
          x = mapVal(0,gg.timeline.t_max,self.graph.x,self.graph.x+self.graph.w,gg.table.t_data[i]);
          y = mapVal(self.v_min,self.v_max,self.graph.y+self.graph.h,self.graph.y,gg.table.known_data[i]);
          x = clamp(self.graph.x,self.graph.x+self.graph.w,x);
          y = clamp(self.graph.y,self.graph.y+self.graph.h,y);
          gg.ctx.fillRect(x-s/2,y-s/2,s,s);
        }
      }
    }
  }
}

var table = function()
{
  var self = this;
  self.w = 0;
  self.h = 0;
  self.x = 0;
  self.y = 0;

  self.font_h = 20;
  self.font = self.font_h+"px Helvetica";

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
    self.correct = self.data_visible;
    for(var i = 0; i < self.predicted_data.length && i < self.known_data.length; i++)
      if(self.predicted_data[i] != self.known_data[i] && self.known_data[i] != "-") self.correct = 0;
  }

  self.tick = function()
  {
    if(gg.timeline.t > self.simd_visible) self.simd_visible = gg.timeline.t;
  }

  self.draw = function()
  {
    //gg.ctx.strokeStyle = red;
    //strokeBox(self,gg.ctx);

    gg.ctx.lineWidth = 0.5;

    var y0 = self.y;
    var y1 = self.y+self.h/3;
    var y2 = self.y+self.h*2/3;
    var y3 = self.y+self.h;
    var y01 = lerp(y0,y1,0.5);
    var y12 = lerp(y1,y2,0.5);
    var y23 = lerp(y2,y3,0.5);
    drawLine(self.x,y1,self.x+self.w,y1,gg.ctx);
    drawLine(self.x,y2,self.x+self.w,y2,gg.ctx);
    var x = self.x;
    var w = self.w/(gg.timeline.t_max+2);

    gg.ctx.fillStyle = self.known_color;
    gg.ctx.fillRect(x,y1,self.w,y2-y1);
    gg.ctx.fillStyle = self.predicted_color;
    gg.ctx.fillRect(x,y2,self.w,y3-y2);

    gg.ctx.fillStyle = self.text_color;
    gg.ctx.font = "12px Helvetica";
    gg.ctx.textAlign = "left";
    x = self.x+w;
    drawLine(x,y1,x,y3,gg.ctx);
    x -= w;
    gg.ctx.fillStyle = black;
    gg.ctx.fillText("DAY",x,y01+self.font_h/2);
    gg.ctx.fillText("Collected",x,y12+self.font_h/2-13);
    gg.ctx.fillText("Data",x,y12+self.font_h/2);
    gg.ctx.fillText("Modeled",x,y23+self.font_h/2-13);
    gg.ctx.fillText("Data",x,y23+self.font_h/2);

    gg.ctx.font = self.font;
    gg.ctx.textAlign = "center";
    for(var i = 0; i <= gg.timeline.t_max; i++)
    {
      x = self.x+(i+2)*w;
      drawLine(x,y1,x,y3,gg.ctx);
      x -= w/2;
      gg.ctx.fillStyle = black;
      gg.ctx.fillText(self.t_data[i],x,y01+self.font_h/2);
      gg.ctx.fillStyle = red;
      if(self.data_visible)
        gg.ctx.fillText(self.known_data[i],x,y12+self.font_h/2);
      else
        gg.ctx.fillText("-",x,y12+self.font_h/2);
      if(self.simd_visible >= i)
      {
        if(self.data_visible && (self.known_data[i] == self.predicted_data[i] || self.correct)) gg.ctx.fillStyle = green;
        else gg.ctx.fillStyle = black;
        gg.ctx.fillText(self.predicted_data[i],x,y23+self.font_h/2);
      }
      else
      {
        gg.ctx.fillStyle = black;
        gg.ctx.fillText("-",x,y23+self.font_h/2);
      }

      if(i == gg.timeline.t_max && self.correct && !gg.cur_level.correct && !gg.timeline.fast_sim && !gg.data_dragger.dragging_sim)
      {
        var s = 20;
        gg.ctx.drawImage(gg.notice_img,x+w/2-s/2,y2-s/2,s,s);
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
  self.font_h = 15;
  self.font = self.font_h+"px Helvetica";

  self.ai_text_color = "#4D514C";
  self.you_text_color = "#FEFFFF";
  self.data_text_color = "#FF6666";

  self.top_y = 0;
  self.max_top_y = 0;
  self.target_top_y = 0;
  self.bottom_y = 0;
  self.data_y = 0;

  self.advance_t = self.thinking_buff-1;
  self.thinking_buff = 50;

  self.prompt_player_input = 0;
  self.prompt_ai_typing = 0;
  self.prompt_end = 0;

  self.gave_data = 0;
  self.requested_end = 0;

  self.text = [];
  self.bubbles = [];
  self.speakers = [];
  self.emotes = [];
  self.triggers = [];

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
    self.text = [];
    self.bubbles = []
    self.speakers = []
    self.emotes = []
    self.triggers = [];
    self.top_y = self.bottom_y;
    self.max_top_y = self.top_y;
    self.target_top_y = self.max_top_y;
    self.gave_data = 0;
    self.requested_end = 0;
    self.displayed_i = 0;
    self.advance_t = self.thinking_buff;
  }

  self.nq = function(text, speaker, emote, trigger)
  {
    self.text.push(text);
    self.bubbles.push(textToLines(self.font,self.text_w,text,gg.ctx));
    self.speakers.push(speaker);
    self.emotes.push(emote);
    trigger.tstate = clone(trigger.state);
    self.triggers.push(trigger);
    self.prompt_end = 0;
    self.requested_end = 0;
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
      if(self.speakers[i] == SPEAKER_DATA)
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
    if(self.speakers[self.displayed_i-1] == SPEAKER_AI)
      gg.monitor.talk_t = 0;
  }

  self.click = function(evt)
  {
    if(self.prompt_end && self.displayed_i == self.text.length && ptWithin(self.monitor_x,self.monitor_y,self.monitor_w,self.monitor_h,evt.doX,evt.doY))
      self.requested_end = 1;
    if(self.displayed_i < self.text.length)
    {
      if(self.speakers[self.displayed_i] == SPEAKER_AI)
        self.advance();
      else if(ptWithin(self.input_x,self.input_y,self.input_w,self.input_h,evt.doX,evt.doY))
        self.advance();
    }
  }

  self.dragging = 0;
  self.drag_start_y = 0;
  self.dragStart = function(evt)
  {
    self.click(evt)
    self.drag_start_y = evt.doY;
  }
  self.drag = function(evt)
  {
    self.target_top_y += evt.doY-self.drag_start_y;
    if(self.target_top_y > self.y+self.w) self.target_top_y = self.y+self.w;
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

    if(self.displayed_i < self.text.length && self.triggers[self.displayed_i].type == TRIGGER_TIMER)
    {
      self.triggers[self.displayed_i].tstate--;
      if(self.triggers[self.displayed_i].tstate <= 0)
        self.advance();
    }
    if(self.displayed_i < self.text.length && self.speakers[self.displayed_i] == SPEAKER_DATA)
      self.advance();

    var old_prompt_ai_typing = self.prompt_ai_typing
    self.prompt_player_input = 0;
    self.prompt_ai_typing = 0;
    self.prompt_end = 0;
    if(self.advance_t >= self.thinking_buff && self.displayed_i < self.text.length) //possible need for prompt
    {
      if(self.speakers[self.displayed_i] == SPEAKER_PLAYER)
      {
        if(self.triggers[self.displayed_i].type == TRIGGER_CLICK)
          self.prompt_player_input = 1;
        else if(self.triggers[self.displayed_i].type == TRIGGER_TIMER)
          ; //odd
      }
      else if(self.speakers[self.displayed_i] == SPEAKER_AI)
      {
        if(self.triggers[self.displayed_i].type == TRIGGER_CLICK)
          ; //odd
        else if(self.triggers[self.displayed_i].type == TRIGGER_TIMER)
          self.prompt_ai_typing = 1;
      }
    }
    else if(self.displayed_i == self.text.length) self.prompt_end = 1;

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
      if(self.speakers[i] == SPEAKER_PLAYER)
      {
        gg.ctx.fillStyle = self.you_text_color;
        gg.ctx.fillRect(self.x+self.pad*2,y,self.bubble_w,self.pad+(self.font_h+self.pad)*self.bubbles[i].length);
        gg.ctx.strokeRect(self.x+self.pad*2,y,self.bubble_w,self.pad+(self.font_h+self.pad)*self.bubbles[i].length);
      }
      else if(self.speakers[i] == SPEAKER_AI)
      {
        gg.ctx.fillStyle = self.ai_text_color;
        gg.ctx.fillRect(self.x+self.pad,  y,self.bubble_w,self.pad+(self.font_h+self.pad)*self.bubbles[i].length);
        gg.ctx.strokeRect(self.x+self.pad,  y,self.bubble_w,self.pad+(self.font_h+self.pad)*self.bubbles[i].length);
      }
      else if(self.speakers[i] == SPEAKER_DATA)
      {
        gg.ctx.fillStyle = self.data_text_color;
        gg.ctx.fillRect(self.x+self.pad,  y,self.bubble_w,self.pad+(self.font_h+self.pad));
        gg.ctx.strokeRect(self.x+self.pad,  y,self.bubble_w,self.pad+(self.font_h+self.pad));
        if(!gg.data_dragger.dragging_data && !gg.table.data_visible)
        {
          var s = 20;
          gg.ctx.drawImage(gg.notice_img,self.x+self.pad+self.bubble_w-s/2,y-s/2,s,s);
        }
        self.data_y = y;
      }
      gg.ctx.fillStyle = black;
      y += self.pad;
      if(self.speakers[i] != SPEAKER_DATA)
      {
        for(var j = 0; j < self.bubbles[i].length; j++)
        {
          if(self.speakers[i] == SPEAKER_PLAYER) { gg.ctx.textAlign = "right"; gg.ctx.fillStyle = self.ai_text_color; gg.ctx.fillText(self.bubbles[i][j],self.x+self.w-self.pad*2,y+self.font_h); }
          else                                   { gg.ctx.textAlign = "left";  gg.ctx.fillStyle = self.you_text_color; gg.ctx.fillText(self.bubbles[i][j],self.x+self.pad*2,       y+self.font_h); }
          y += self.font_h+self.pad;
        }
      }
      else
      {
        gg.ctx.textAlign = "left"; gg.ctx.fillStyle = self.ai_text_color; gg.ctx.fillText(self.bubbles[i][0],self.x+self.pad*2,y+self.font_h);
        y += self.font_h+self.pad;
      }
      y += self.pad;
    }
    gg.ctx.textAlign = "left";

    //"input" box
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
      var s = 20;
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
      var s = 20;
      gg.ctx.drawImage(gg.notice_img,self.monitor_x+self.monitor_w-s/2,self.monitor_y+self.monitor_h/4-s/2,s,s);
    }
  }

}

var module = function()
{
  var self = this;
  self.w = 0;
  self.h = 0;
  self.x = 0;
  self.y = 0;

  self.ww = 0;
  self.wh = 0;
  self.wx = 0;
  self.wy = 0;

  self.vinc_btn = new ButtonBox(0,0,0,0,    function() { self.v_btn.set(self.v_btn.number+0.1); });
  self.v_btn = new NumberBox(0,0,0,0,0,0.01,function(v){ v = fdisp(v,1); if(self.v[0] == v) return; self.v[0] = v; self.invalidate_sim(); gg.module_board.calculate(); });
  self.vdec_btn = new ButtonBox(0,0,0,0,    function() { self.v_btn.set(self.v_btn.number-0.1); });

  self.invalidate_sim = function()
  {
    gg.timeline.t = 0;
    gg.timeline.fast_sim = 1;
    gg.table.simd_visible = 0;
  }

  self.v = [];
  self.correct_v = [];
  self.v_min = 0;
  self.v_max = 0;

  self.active = 1;

  self.size = function()
  {
    self.v_btn.w = self.w/2;
    self.v_btn.h = self.h/2;
    self.v_btn.x = self.x+self.w/2-self.v_btn.w/2;
    self.v_btn.y = self.y+self.h-self.v_btn.h;

    self.vinc_btn.w = self.v_btn.w;
    self.vinc_btn.h = self.v_btn.h/2;
    self.vinc_btn.x = self.v_btn.x;
    self.vinc_btn.y = self.v_btn.y-self.v_btn.h;
    self.vdec_btn.w = self.v_btn.w;
    self.vdec_btn.h = self.v_btn.h/2;
    self.vdec_btn.x = self.v_btn.x;
    self.vdec_btn.y = self.v_btn.y+self.v_btn.h+self.v_btn.h/2;
  }

  self.tick = function()
  {

  }

  self.draw = function()
  {
    gg.ctx.lineWidth = 1;
    var x;
    var y;
    if(!self.active) { gg.ctx.fillStyle = very_light_gray; fillBox(self,gg.ctx); }
    gg.ctx.strokeStyle = dark_gray;
    gg.ctx.beginPath();
    x = self.x;
    y = mapVal(self.v_min, self.v_max, self.y+self.h, self.y, self.v[0]);
    gg.ctx.moveTo(x,y);
    for(var i = 1; i < gg.timeline.t_max; i++)
    {
      x = self.x+(i/(gg.timeline.t_max-1))*self.w;
      y = mapVal(self.v_min, self.v_max, self.y+self.h, self.y, self.v[i]);
      gg.ctx.lineTo(x,y);
    }
    gg.ctx.stroke();
    var t_x = mapVal(0,gg.timeline.t_max,self.x,self.x+self.w,gg.timeline.t);
    drawLine(t_x,self.y,t_x,self.y+self.h,gg.ctx);
    gg.ctx.strokeStyle = black;
    strokeBox(self,gg.ctx);
    if(self.active)
    {
      //strokeBox(self.v_btn,gg.ctx);
      strokeBox(self.vinc_btn,gg.ctx);
      strokeBox(self.vdec_btn,gg.ctx);
    }
    gg.ctx.fillStyle = black;
    gg.ctx.fillText(self.v[0],self.x+self.w/2,self.y+self.h-1);
    gg.ctx.fillStyle = gray;
    if(floor(gg.timeline.t) != 0) gg.ctx.fillText(self.v[floor(gg.timeline.t)],self.x+self.w/2,self.y+self.h*2/3);
    gg.ctx.fillStyle = black;
  }
}

var modrel = function()
{
  var self = this;
  self.src = 0;
  self.dst = 0;

  self.draw = function()
  {
    if(!self.src || !self.dst) return;
    gg.ctx.lineWidth = 1;
    drawLine(self.src.x+self.src.w,self.src.y+self.src.h/2,self.dst.x,self.dst.y+self.dst.h/2,gg.ctx);
    var t = gg.timeline.t;
    var td = t%1;
    if(td != 0)
    {
      t = round(t-td);
      var x;
      var y;
      var s = 20;
      if(td > 0 && td < 1)
      {
        x = lerp(self.src.x+self.src.w,self.dst.x,td);
        y = lerp(self.src.y+self.src.h/2,self.dst.y+self.dst.h/2,td);
        gg.ctx.fillStyle = white;
        gg.ctx.fillRect(x-s/2,y-s/2,s,s);
        gg.ctx.fillStyle = black;
        gg.ctx.fillText(self.src.v[t],x,y+s/2);
      }
    }
  }
}

var module_board = function()
{
  var self = this;
  self.w = 0;
  self.h = 0;
  self.x = 0;
  self.y = 0;

  //this is the cam for the modules
  self.ww = 0;
  self.wh = 0;
  self.wx = 0;
  self.wy = 0;

  self.modules = [];
  self.modrels = [];

  self.graph = {x:0,y:0,w:0,h:0};

  self.v_min = 0;
  self.v_max = 0;

  self.table_module = 0;

  self.clear = function()
  {
    self.modules = [];
    self.modrels = [];
    gg.table.clear();
    for(var i = 0; i <= gg.timeline.t_max; i++)
    {
      gg.table.t_data[i] = i;
      gg.table.known_data[i] = "-";
      gg.table.predicted_data[i] = 0;
    }
    gg.table.verify();
  }

  self.gen_module = function()
  {
    var m = new module();
    m.wx = 0;
    m.wy = 0;
    m.ww = 50;
    m.wh = 50;
    for(var i = 0; i < gg.timeline.t_max; i++)
      m.v[i] = 0;
    m.v_btn.set(m.v[0]);
    screenSpace(self,gg.canv,m);
    m.size();
    self.modules.push(m);
    return m;
  }
  self.gen_modrel = function()
  {
    var m = new modrel();
    self.modrels.push(m);
    return m;
  }

  self.calculate_table = function()
  {
    gg.table.clear();
    for(var i = 0; i <= gg.timeline.t_max; i++)
      gg.table.t_data[i] = i;
    for(var i = 1; i <= gg.timeline.t_max; i++)
    {
      var m;
      for(var j = 0; j < self.modules.length; j++)
      {
        m = self.modules[j];
        m.correct_v[i] = m.correct_v[i-1];
      }
      for(var j = 0; j < self.modrels.length; j++)
      {
        m = self.modrels[j];
        if(m.src && m.dst) m.dst.correct_v[i] += m.src.correct_v[i-1];
      }
      for(var j = 0; j < self.modules.length; j++)
      {
        m = self.modules[j];
        m.correct_v[i] = fdisp(m.correct_v[i],1);
      }
    }
    if(self.table_module)
    {
      for(var i = 0; i < 3; i++)
        gg.table.known_data[i] = self.table_module.correct_v[i];
      for(var i = 3; i <= gg.timeline.t_max; i++)
        gg.table.known_data[i] = "-";
    }
    else
    {
      for(var i = 0; i <= gg.timeline.t_max; i++)
        gg.table.known_data[i] = 0;
    }
  }

  self.calculate = function()
  {
    for(var i = 1; i <= gg.timeline.t_max; i++)
    {
      var m;
      for(var j = 0; j < self.modules.length; j++)
      {
        m = self.modules[j];
        m.v[i] = m.v[i-1];
      }
      for(var j = 0; j < self.modrels.length; j++)
      {
        m = self.modrels[j];
        if(m.src && m.dst) m.dst.v[i] += m.src.v[i-1];
      }
      for(var j = 0; j < self.modules.length; j++)
      {
        m = self.modules[j];
        m.v[i] = fdisp(m.v[i],1);
      }
    }
    if(self.table_module)
    {
      for(var i = 0; i <= gg.timeline.t_max; i++)
        gg.table.predicted_data[i] = self.table_module.v[i];
    }
    else
    {
      for(var i = 0; i <= gg.timeline.t_max; i++)
        gg.table.predicted_data[i] = 0;
    }

    gg.table.verify();
    self.draw_params();
  }

  self.xpts = [];
  self.ypts = [];
  self.draw_params = function()
  {
    var x;
    var y;
    for(var i = 0; i <= gg.timeline.t_max; i++)
    {
      x = i;
      y = self.table_module.v[i];
      self.xpts[i] = mapVal(0, gg.timeline.t_max, self.graph.x, self.graph.x+self.graph.w, x);
      self.ypts[i] = clamp(self.graph.y, self.graph.y+self.graph.h, mapVal(self.v_min, self.v_max, self.graph.y+self.graph.h, self.graph.y, y)); //map then clamp separate because y flipped
    }
  }

  self.filter = function(keyer, blurer, dragger, clicker)
  {
    var check = 1;
    for(var i = 0; i < self.modules.length; i++)
      if(self.modules[i].active) keyer.filter(self.modules[i].v_btn);
    for(var i = 0; i < self.modules.length; i++)
      blurer.filter(self.modules[i].v_btn);
    for(var i = 0; check && i < self.modules.length; i++)
    {
      if(self.modules[i].active)
      {
        if(check) check = !dragger.filter(self.modules[i].v_btn);
        if(check) check = !clicker.filter(self.modules[i].vinc_btn);
        if(check) check = !clicker.filter(self.modules[i].vdec_btn);
      }
    }
    return !check
  }

  self.tick = function()
  {
    var m;
    for(var i = 0; i < self.modules.length; i++)
    {
      m = self.modules[i];
      screenSpaceCoords(self,gg.canv,m);
      m.tick();
    }
  }

  self.draw = function()
  {
    gg.ctx.lineWidth = 1;

    gg.ctx.font = "12px Helvetica";
    gg.ctx.textAlign = "center";
    for(var i = 0; i < self.modules.length; i++)
      self.modules[i].draw();
    for(var i = 0; i < self.modrels.length; i++)
      self.modrels[i].draw();

    strokeBox(self.graph,gg.ctx);

    if(self.table_module)
    {
      var m = self.table_module;
      var g = self.graph;

      strokeBox(self.graph,gg.ctx);
      var t = gg.timeline.t;
      var tr = gg.timeline.t%1;
      var tn = round(gg.timeline.t-tr);
      gg.ctx.beginPath();
      gg.ctx.moveTo(self.xpts[0],self.ypts[0]);
      for(var i = 1; i <= tn; i++)
        gg.ctx.lineTo(self.xpts[i],self.ypts[i]);
      if(tn < gg.timeline.t_max)
        gg.ctx.lineTo(lerp(self.xpts[tn],self.xpts[tn+1],tr),lerp(self.ypts[tn],self.ypts[tn+1],tr));
      gg.ctx.stroke();
      gg.ctx.font = "12px Helvetica";
      gg.ctx.fillText(fdisp(self.v_min),self.graph.x-10,self.graph.y+self.graph.h);
      gg.ctx.fillText(fdisp(self.v_max),self.graph.x-10,self.graph.y);

      gg.ctx.strokeStyle = gray;
      var t_x = mapVal(0,gg.timeline.t_max,self.graph.x,self.graph.x+self.graph.w,gg.timeline.t);
      drawLine(t_x,self.graph.y,t_x,self.graph.y+self.graph.h,gg.ctx);

      if(gg.table.data_visible)
      {
        gg.ctx.fillStyle = red;
        var s = 10;
        for(var i = 0; i <= gg.timeline.t_max; i++)
        {
          if(gg.table.known_data[i] != "-")
          {
            x = mapVal(0,gg.timeline.t_max,g.x,g.x+g.w,i);
            y = mapVal(self.v_min,self.v_max,g.y+g.h,g.y,gg.table.known_data[i]);
            y = clamp(g.y,g.y+g.h,y);
            gg.ctx.fillRect(x-s/2,y-s/2,s,s);
          }
        }
      }

    }
  }

}
