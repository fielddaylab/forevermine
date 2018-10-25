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
  self.talk_t = 0;

  self.eyes_x = 0;
  self.eyes_y = 0;
  self.mouth_x = 0;
  self.mouth_y = 0;
  self.eyes_h = 0;
  self.mouth_h = 0;

  self.clicked = 0;

  self.init_screen = function()
  {
    var d = 10;
    self.screen = GenIcon(self.ww/d,self.wh/d);
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
    self.blink_t++; if(self.blink_t >  100) self.blink_t = 0;
    if(self.talk_t > 0) self.talk_t--;

    var face_x = sin(self.look_t/50)/5;
    var face_y = sin(self.look_t/190)/5;

    self.eyes_x = lerp(self.eyes_x,face_x, 0.1);
    self.eyes_y = lerp(self.eyes_y,face_y,0.1);
    self.mouth_x = lerp(self.mouth_x,face_x, 0.05);
    self.mouth_y = lerp(self.mouth_y,face_y,0.05);

    if(self.blink_t > 95) self.eyes_h = lerp(self.eyes_h,0,0.9);
    else                  self.eyes_h = lerp(self.eyes_h,1,0.9);

    if(self.talk_t > 0) self.mouth_h = lerp(self.mouth_h,psin(self.talk_t),0.8);
    else                self.mouth_h = lerp(self.mouth_h,                1,0.8);
  }

  self.draw = function()
  {
    var s = self.screen;
    var c = s.context;

    c.fillStyle = white;
    c.fillRect(0,0,s.width,s.height);

    c.fillStyle = blue;
    var w;
    var h;
    var x;
    var y;
    w = s.width/10;
    h = s.height/10*self.eyes_h;
    x = s.width/4+self.eyes_x*s.width/4;
    y = s.height/4+self.eyes_y*s.height/4;
    c.fillRect(x,y,w,h); //left eye
    x = s.width-w-s.width/4+self.eyes_x*s.width/4;
    c.fillRect(x,y,w,h); //right eye

    w = s.width/2;
    h = s.height/10*self.mouth_h;
    x = s.width/4+self.mouth_x*s.width/4;
    y = s.height-h-s.height/4+self.mouth_y*s.height/4;
    c.fillRect(x,y,w,h); //mouth
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
    self.displayed_i = 0;
  }

  self.nq = function(text, speaker)
  {
    self.text.push(text);
    self.bubbles.push(textToLines(self.font,self.text_w,text,gg.ctx));
    self.speakers.push(speaker);
    if(self.text.length == 1) gg.monitor.talk_t = 50;
  }

  self.nq_group = function(text)
  {
    for(var i = 0; i < text.length; i+=2)
      self.nq(text[i],text[i+1]);
  }

  self.advance = function()
  {
    self.displayed_i++;
    if(self.displayed_i < self.text.length) gg.monitor.talk_t = 50;
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
    gg.ctx.textAlign = "left";
    gg.ctx.font = self.font;
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

  self.t = 0;
  self.t_target = 0;
  self.t_max = 10;

  self.advance_btn = {x:0,y:0,w:0,h:0,click:function(evt){
    self.t_target++;
    if(self.t_target > self.t_max) self.t_target = self.t_max;
  }};

  self.size = function()
  {
    self.advance_btn.w = 50;
    self.advance_btn.h = 50;
    self.advance_btn.x = self.x-10-self.advance_btn.w;
    self.advance_btn.y = self.y+self.h-self.advance_btn.h;
  }

  self.dragStart = function(evt)
  {
    self.drag(evt);
  }
  self.drag = function(evt)
  {
    var t = clampMapVal(self.x,self.x+self.w,0,self.t_max,evt.doX);
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
    if(self.t < self.t_target && !self.dragging) self.t += 0.01;
    if(self.t > self.t_target) self.t = self.t_target;
  }

  self.draw = function()
  {
    strokeBox(self,gg.ctx);
    strokeBox(self.advance_btn,gg.ctx);

    var t_x;
    gg.ctx.strokeStyle = gray;
    gg.ctx.beginPath();
    for(var i = 1; i < self.t_max; i++)
    {
      t_x = mapVal(0,self.t_max,self.x,self.x+self.w,i);
      gg.ctx.moveTo(t_x,self.y);
      gg.ctx.lineTo(t_x,self.y+self.h);
    }
    gg.ctx.stroke();

    gg.ctx.strokeStyle = black;
    t_x = mapVal(0,self.t_max,self.x,self.x+self.w,self.t);
    drawLine(t_x,self.y,t_x,self.y+self.h,gg.ctx);

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
  self.h_min = 0;
  self.h_max = 0;
  self.v_min = 0;
  self.v_max = 0;

  self.m_btn = new NumberBox(0,0,0,0,0,0.01,function(v){ v = fdisp(v,1); self.m = v; self.draw_params(); });
  self.minc_btn = new ButtonBox(0,0,0,0,function(){ self.m_btn.set(self.m_btn.number+0.1); });
  self.mdec_btn = new ButtonBox(0,0,0,0,function(){ self.m_btn.set(self.m_btn.number-0.1); });
  self.b_btn = new NumberBox(0,0,0,0,0,0.01,function(v){ v = fdisp(v,1); self.b = v; self.draw_params(); });
  self.binc_btn = new ButtonBox(0,0,0,0,function(){ self.b_btn.set(self.b_btn.number+0.1); });
  self.bdec_btn = new ButtonBox(0,0,0,0,function(){ self.b_btn.set(self.b_btn.number-0.1); });

  self.font_h = 50;
  self.font = self.font_h+"px Helvetica";

  self.btn_w = 0;
  self.eqn_x = 0;
  self.eqn_y = 0;
  self.eqn_w = 0;
  self.eqn_h = self.font_h;
  self.yeq_x = 0;
  self.xp_x = 0;

  self.table = new table();
  self.table.n = 10;
  self.calculate_table = function()
  {
    for(var i = 0; i < self.table.n; i++)
    {
      self.table.t_data[i] = i;
      if(i < 3) self.table.known_data[i] = self.correct_m*i+self.correct_b;
      else      self.table.known_data[i] = "-";
      self.table.predicted_data[i] = self.m*i+self.b;
    }
    self.table.verify();
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
    self.sy = self.v(self.h_min);
    self.ey = self.v(self.h_max);
    self.sx = self.h_min;
    self.ex = self.h_max;
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
    self.sx = mapVal(self.h_min, self.h_max, self.graph.x, self.graph.x+self.graph.w, self.sx);
    self.ex = mapVal(self.h_min, self.h_max, self.graph.x, self.graph.x+self.graph.w, self.ex);

    for(var i = 0; i < self.table.n; i++)
      self.table.predicted_data[i] = fdisp(self.v(self.table.t_data[i]),1);
    self.table.verify();
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
      if(check) check = !clicker.filter(self.table);
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

    strokeBox(self.graph,gg.ctx);
    drawLine(self.sx,self.sy,self.ex,self.ey, gg.ctx);
    gg.ctx.font = "12px Helvetica";
    gg.ctx.fillText(fdisp(self.v_min),self.graph.x-10,self.graph.y+self.graph.h);
    gg.ctx.fillText(fdisp(self.v_max),self.graph.x-10,self.graph.y);

    gg.ctx.font = self.font;
    gg.ctx.textAlign = "left";
    gg.ctx.fillText("y = ",self.yeq_x,self.eqn_y+self.eqn_h);
    gg.ctx.fillText("x + ",self.xp_x,self.eqn_y+self.eqn_h);
    gg.ctx.textAlign = "right";
    gg.ctx.fillText(self.m,self.m_btn.x+self.m_btn.w,self.eqn_y+self.eqn_h);
    gg.ctx.fillText(self.b,self.b_btn.x+self.b_btn.w,self.eqn_y+self.eqn_h);
    gg.ctx.textAlign = "left";

    gg.ctx.fillStyle = light_gray;
    gg.ctx.fillText("x = "+fdisp(gg.timeline.t,1),self.yeq_x,self.eqn_y+self.eqn_h*3);
    gg.ctx.fillText("y = "+fdisp(self.m*fdisp(gg.timeline.t,1)+self.b,1),self.yeq_x,self.eqn_y+self.eqn_h*4);

    strokeBox(self.m_btn,gg.ctx);
    strokeBox(self.minc_btn,gg.ctx);
    strokeBox(self.mdec_btn,gg.ctx);
    strokeBox(self.b_btn,gg.ctx);
    strokeBox(self.binc_btn,gg.ctx);
    strokeBox(self.bdec_btn,gg.ctx);

    self.table.draw();

    gg.ctx.fillStyle = red;
    for(var i = 0; i < self.table.n; i++)
    {
      if(self.table.known_data[i] != "-")
      {
        x = mapVal(self.h_min,self.h_max,self.graph.x,self.graph.x+self.graph.w,self.table.t_data[i]);
        y = mapVal(self.v_min,self.v_max,self.graph.y+self.graph.h,self.graph.y,self.table.known_data[i]);
        x = clamp(self.graph.x,self.graph.x+self.graph.w,x);
        y = clamp(self.graph.y,self.graph.y+self.graph.h,y);
        gg.ctx.fillRect(x-1,y-1,2,2);
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
  self.h_min = 0;
  self.h_max = 0;
  self.v_min = 0;
  self.v_max = 0;
  self.samples = 100;

  self.a_btn = new NumberBox(0,0,0,0,0,0.01,function(v){ v = fdisp(v,1); self.a = v; self.draw_params(); });
  self.ainc_btn = new ButtonBox(0,0,0,0,function(){ self.a_btn.set(self.a_btn.number+0.1); });
  self.adec_btn = new ButtonBox(0,0,0,0,function(){ self.a_btn.set(self.a_btn.number-0.1); });
  self.b_btn = new NumberBox(0,0,0,0,0,0.01,function(v){ v = fdisp(v,1); self.b = v; self.draw_params(); });
  self.binc_btn = new ButtonBox(0,0,0,0,function(){ self.b_btn.set(self.b_btn.number+0.1); });
  self.bdec_btn = new ButtonBox(0,0,0,0,function(){ self.b_btn.set(self.b_btn.number-0.1); });
  self.c_btn = new NumberBox(0,0,0,0,0,0.01,function(v){ v = fdisp(v,1); self.c = v; self.draw_params(); });
  self.cinc_btn = new ButtonBox(0,0,0,0,function(){ self.c_btn.set(self.c_btn.number+0.1); });
  self.cdec_btn = new ButtonBox(0,0,0,0,function(){ self.c_btn.set(self.c_btn.number-0.1); });

  self.font_h = 50;
  self.font = self.font_h+"px Helvetica";

  self.btn_w = 0;
  self.eqn_x = 0;
  self.eqn_y = 0;
  self.eqn_w = 0;
  self.eqn_h = self.font_h;
  self.yeq_x = 0;
  self.x2p_x = 0;
  self.xp_x = 0;

  self.table = new table();
  self.table.n = 10;
  self.calculate_table = function()
  {
    for(var i = 0; i < self.table.n; i++)
    {
      self.table.t_data[i] = i;
      if(i < 3) self.table.known_data[i] = self.correct_a*i*i + self.correct_b*i + self.correct_c;
      else      self.table.known_data[i] = "-";
      self.table.predicted_data[i] = self.a*i*i + self.b*i + self.c;;
    }
    self.table.verify();
  }
  self.calculate_table();

  self.size = function()
  {
    gg.ctx.font = self.font;
    self.btn_w = gg.ctx.measureText("-0.0").width;
    self.eqn_w = gg.ctx.measureText("y = ").width+self.btn_w+gg.ctx.measureText("x² + ").width+self.btn_w+gg.ctx.measureText("x + ").width+self.btn_w;
    self.eqn_h = self.font_h;
    self.eqn_x = self.x+self.w/3-self.eqn_w/2;
    self.eqn_y = self.y+self.h/3-self.eqn_h/2;

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
    self.a_btn.x = self.yeq_x+gg.ctx.measureText("y = ").width;
    self.x2p_x = self.a_btn.x+self.a_btn.w;
    self.b_btn.x = self.x2p_x+gg.ctx.measureText("x² + ").width;
    self.xp_x = self.b_btn.x+self.b_btn.w;
    self.c_btn.x = self.xp_x+gg.ctx.measureText("x + ").width;

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

  self.v = function(x)
  {
    return self.a*sqr(x)+self.b*x+self.c;
  }

  self.xpts = [];
  self.ypts = [];
  self.draw_params = function()
  {
    var x;
    var y;
    for(var i = 0; i < self.samples; i++)
    {
      x = mapVal(0,self.samples-1,self.h_min,self.h_max,i);
      y = self.v(x);
      self.xpts[i] = mapVal(self.h_min, self.h_max, self.graph.x, self.graph.x+self.graph.w, x);
      self.ypts[i] = clamp(self.graph.y, self.graph.y+self.graph.h, mapVal(self.v_min, self.v_max, self.graph.y+self.graph.h, self.graph.y, y)); //map then clamp separate because y flipped
    }

    for(var i = 0; i < self.table.n; i++)
      self.table.predicted_data[i] = fdisp(self.v(self.table.t_data[i]),1);
    self.table.verify();
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
      if(check) check = !clicker.filter(self.table);
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

    strokeBox(self.graph,gg.ctx);
    gg.ctx.beginPath();
    gg.ctx.moveTo(self.xpts[0],self.ypts[0]);
    for(var i = 0; i < self.samples; i++)
      gg.ctx.lineTo(self.xpts[i],self.ypts[i]);
    gg.ctx.stroke();
    gg.ctx.font = "12px Helvetica";
    gg.ctx.fillText(fdisp(self.v_min),self.graph.x-10,self.graph.y+self.graph.h);
    gg.ctx.fillText(fdisp(self.v_max),self.graph.x-10,self.graph.y);

    gg.ctx.font = self.font;
    gg.ctx.textAlign = "left";
    gg.ctx.fillText("y = ",self.yeq_x,self.eqn_y+self.eqn_h);
    gg.ctx.fillText("x² + ",self.x2p_x,self.eqn_y+self.eqn_h);
    gg.ctx.fillText("x + ",self.xp_x,self.eqn_y+self.eqn_h);
    gg.ctx.textAlign = "right";
    gg.ctx.fillText(self.a,self.a_btn.x+self.a_btn.w,self.eqn_y+self.eqn_h);
    gg.ctx.fillText(self.b,self.b_btn.x+self.b_btn.w,self.eqn_y+self.eqn_h);
    gg.ctx.fillText(self.c,self.c_btn.x+self.c_btn.w,self.eqn_y+self.eqn_h);
    gg.ctx.textAlign = "left";

    gg.ctx.fillStyle = light_gray;
    gg.ctx.fillText("x = "+fdisp(gg.timeline.t,1),self.yeq_x,self.eqn_y+self.eqn_h*3);
    gg.ctx.fillText("y = "+fdisp(self.a*fdisp(pow(gg.timeline.t,2),1)+self.b*fdisp(gg.timeline.t,1)+self.c,1),self.yeq_x,self.eqn_y+self.eqn_h*4);

    strokeBox(self.a_btn,gg.ctx);
    strokeBox(self.ainc_btn,gg.ctx);
    strokeBox(self.adec_btn,gg.ctx);
    strokeBox(self.b_btn,gg.ctx);
    strokeBox(self.binc_btn,gg.ctx);
    strokeBox(self.bdec_btn,gg.ctx);
    strokeBox(self.c_btn,gg.ctx);
    strokeBox(self.cinc_btn,gg.ctx);
    strokeBox(self.cdec_btn,gg.ctx);

    self.table.draw();

    gg.ctx.fillStyle = red;
    for(var i = 0; i < self.table.n; i++)
    {
      if(self.table.known_data[i] != "-")
      {
        x = mapVal(self.h_min,self.h_max,self.graph.x,self.graph.x+self.graph.w,self.table.t_data[i]);
        y = mapVal(self.v_min,self.v_max,self.graph.y+self.graph.h,self.graph.y,self.table.known_data[i]);
        x = clamp(self.graph.x,self.graph.x+self.graph.w,x);
        y = clamp(self.graph.y,self.graph.y+self.graph.h,y);
        gg.ctx.fillRect(x-1,y-1,2,2);
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

  self.n = 0;
  self.t_data = [];
  self.known_data = [];
  self.predicted_data = [];

  self.correct = 0;

  self.verify = function()
  {
    self.correct = 1;
    for(var i = 0; i < self.predicted_data.length && i < self.known_data.length; i++)
      if(self.predicted_data[i] != self.known_data[i] && self.known_data[i] != "-") self.correct = 0;
  }

  self.click = function(evt)
  {
    if(gg.cur_level.correct) return;

    //copied from draw!
    var y2 = self.y+self.h*2/3;
    var y3 = self.y+self.h;
    var w = self.w/(self.n+1);
    var x = self.x+(self.n)*w;
    if(ptWithin(x,y2,w,y3-y2,evt.doX,evt.doY))
      gg.cur_level.submit(self.correct);
  }

  self.tick = function()
  {

  }

  self.draw = function()
  {
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
    var w = self.w/(self.n+1);

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
    for(var i = 0; i < self.n; i++)
    {
      x = self.x+(i+2)*w;
      drawLine(x,y1,x,y3,gg.ctx);
      x -= w/2;
      gg.ctx.fillStyle = black;
      gg.ctx.fillText(self.t_data[i],x,y01+self.font_h/2);
      gg.ctx.fillStyle = red;
      gg.ctx.fillText(self.known_data[i],x,y12+self.font_h/2);
      if(self.known_data[i] == self.predicted_data[i] || self.correct) gg.ctx.fillStyle = green;
      else gg.ctx.fillStyle = black;
      gg.ctx.fillText(self.predicted_data[i],x,y23+self.font_h/2);
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

  self.top_y = 0;
  self.max_top_y = 0;
  self.target_top_y = 0;
  self.bottom_y = 0;

  self.advance_t = self.thinking_buff-1;
  self.thinking_buff = 50;

  self.prompt_player_input = 0;
  self.prompt_ai_typing = 0;
  self.prompt_end = 0;

  self.requested_end = 0;

  self.text = [];
  self.bubbles = [];
  self.speakers = [];
  self.triggers = [];

  self.displayed_i = 0;

  self.size = function()
  {
    self.bubble_w = self.w-self.pad*3;
    self.text_w = self.bubble_w-self.pad*2;
    self.bottom_y = self.y+self.h-(self.font_h+self.pad*3);

    self.monitor_x = self.x+self.pad;
    self.monitor_y = self.y+self.pad;
    self.monitor_w = self.w-self.pad*2;
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
    self.triggers = [];
    self.top_y = self.bottom_y;
    self.max_top_y = self.top_y;
    self.target_top_y = self.max_top_y;
    self.requested_end = 0;
    self.displayed_i = 0;
    self.advance_t = self.thinking_buff;
  }

  self.nq = function(text, speaker, trigger)
  {
    self.text.push(text);
    self.bubbles.push(textToLines(self.font,self.text_w,text,gg.ctx));
    self.speakers.push(speaker);
    trigger.tstate = clone(trigger.state);
    self.triggers.push(trigger);
    self.requested_end = 0;
  }

  self.nq_group = function(text)
  {
    for(var i = 0; i < text.length; i+=3)
      self.nq(text[i],text[i+1],text[i+2]);
  }

  self.calculate_top = function()
  {
    self.max_top_y = self.bottom_y;
    for(var i = 0; i < self.displayed_i; i++)
    {
      self.max_top_y -= self.pad;
      for(var j = 0; j < self.bubbles[i].length; j++)
        self.max_top_y -= self.font_h+self.pad;
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
    gg.monitor.talk_t = 50;
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
    gg.ctx.lineWidth = 1;
    gg.ctx.fillStyle = black;
    gg.ctx.textAlign = "left";
    gg.ctx.font = self.font;
    var y = self.top_y;
    for(var i = 0; i < self.displayed_i; i++)
    {
      if(self.speakers[i] == SPEAKER_PLAYER)
      {
        gg.ctx.fillStyle = light_green;
        gg.ctx.fillRect(self.x+self.pad*2,y,self.bubble_w,self.pad+(self.font_h+self.pad)*self.bubbles[i].length);
        gg.ctx.strokeRect(self.x+self.pad*2,y,self.bubble_w,self.pad+(self.font_h+self.pad)*self.bubbles[i].length);
      }
      else
      {
        gg.ctx.fillStyle = light_blue;
        gg.ctx.fillRect(self.x+self.pad,  y,self.bubble_w,self.pad+(self.font_h+self.pad)*self.bubbles[i].length);
        gg.ctx.strokeRect(self.x+self.pad,  y,self.bubble_w,self.pad+(self.font_h+self.pad)*self.bubbles[i].length);
      }
      gg.ctx.fillStyle = black;
      y += self.pad;
      for(var j = 0; j < self.bubbles[i].length; j++)
      {
        if(self.speakers[i] == SPEAKER_PLAYER) { gg.ctx.textAlign = "right"; gg.ctx.fillText(self.bubbles[i][j],self.x+self.w-self.pad*2,y+self.font_h); }
        else                                   { gg.ctx.textAlign = "left";  gg.ctx.fillText(self.bubbles[i][j],self.x+self.pad*2,       y+self.font_h); }
        y += self.font_h+self.pad;
      }
      y += self.pad;
    }
    gg.ctx.textAlign = "left";

    strokeBox(self,gg.ctx);

    //"input" box
    if(!self.prompt_player_input)
    {
      gg.ctx.fillStyle = light_gray;
      gg.ctx.fillRect(self.input_x,self.input_y,self.input_w,self.input_h);
    }
    else
    {
      if(floor(self.advance_t/20)%2)
        drawLine(self.input_x+self.pad,self.input_y+self.pad,self.input_x+self.pad,self.input_y+self.input_h-self.pad,gg.ctx)
      gg.ctx.fillStyle = red;
      gg.ctx.fillRect(self.input_x+self.input_w-self.pad/2,self.input_y-self.pad/2,self.pad,self.pad);
    }
    gg.ctx.strokeRect(self.input_x,self.input_y,self.input_w,self.input_h);

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
    gg.ctx.fillStyle = white;
    gg.ctx.fillRect(self.x,self.y,self.w,self.w);
    gg.ctx.strokeRect(self.monitor_x,self.monitor_y,self.monitor_w,self.monitor_h);
    gg.ctx.imageSmoothingEnabled = 0;
    gg.ctx.drawImage(gg.monitor.screen,(gg.monitor.screen.width-gg.monitor.screen.height)/2,0,gg.monitor.screen.height,gg.monitor.screen.height,self.monitor_x,self.monitor_y,self.monitor_w,self.monitor_h);
    gg.ctx.imageSmoothingEnabled = 1;
    if(self.prompt_end)
    {
      gg.ctx.fillStyle = red;
      gg.ctx.fillRect(self.monitor_x+self.monitor_w-self.pad/2,self.monitor_y-self.pad/2,self.pad,self.pad);
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

  self.vinc_btn = new ButtonBox(0,0,0,0,function(){ self.v_btn.set(self.v_btn.number+0.1); });
  self.v_btn = new NumberBox(0,0,0,0,0,0.01,function(v){ v = fdisp(v,1); self.v[0] = v; gg.module_board.calculate(); });
  self.vdec_btn = new ButtonBox(0,0,0,0,function(){ self.v_btn.set(self.v_btn.number-0.1); });

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

  self.table = new table();
  self.table.n = 10;
  for(var i = 0; i < self.table.n; i++)
  {
    self.table.t_data[i] = i;
    if(i < 3) self.table.known_data[i] = 2*i+5;
    else      self.table.known_data[i] = "-";
    self.table.predicted_data[i] = 0;
  }
  self.table.verify();
  self.table_module = 0;

  self.clear = function()
  {
    self.modules = [];
    self.modrels = [];
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
      for(var i = 0; i < 3/*self.table.n*/; i++)
        self.table.known_data[i] = self.table_module.correct_v[i];
      for(var i = 3; i < self.table.n; i++)
        self.table.known_data[i] = "-";
    }
    else
    {
      for(var i = 0; i < self.table.n; i++)
        self.table.known_data[i] = 0;
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
    for(var i = 0; i < self.modules.length; i++)
    {
      m = self.modules[i];
      m.v_min = 9999;
      m.v_max = -9999;
      for(var j = 0; j <= gg.timeline.t_max; j++)
      {
        if(m.v[j] < m.v_min) m.v_min = m.v[j];
        if(m.v[j] > m.v_max) m.v_max = m.v[j];
      }
      if(m.v_min == m.v_max) { m.v_min--; m.v_max++; }
    }
    if(self.table_module)
    {
      for(var i = 0; i < self.table.n; i++)
        self.table.predicted_data[i] = self.table_module.v[i];
    }
    else
    {
      for(var i = 0; i < self.table.n; i++)
        self.table.predicted_data[i] = 0;
    }
    self.table.verify();
  }

  self.filter = function(keyer, blurer, dragger, clicker)
  {
    var check = 1;
    for(var i = 0; i < self.modules.length; i++)
      if(self.modules[i].active) keyer.filter(self.modules[i].v_btn);
    for(var i = 0; i < self.modules.length; i++)
      blurer.filter(self.modules[i].v_btn);
    if(check) check = !clicker.filter(self.table);
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
    self.table.draw();

    if(self.table_module)
    {
      var m = self.table_module;
      var g = self.graph;
      gg.ctx.strokeStyle = black;
      gg.ctx.beginPath();
      x = mapVal(0,gg.timeline.t_max-1,g.x,g.x+g.w,0);
      y = mapVal(m.v_min,m.v_max,g.y+g.h,g.y,m.v[0]);
      gg.ctx.moveTo(x,y);
      for(var i = 1; i < gg.timeline.t_max; i++)
      {
        x = mapVal(0,gg.timeline.t_max-1,g.x,g.x+g.w,i);
        y = mapVal(m.v_min,m.v_max,g.y+g.h,g.y,m.v[i]);
        gg.ctx.lineTo(x,y);
      }
      gg.ctx.stroke();
      gg.ctx.fillStyle = black;
      gg.ctx.font = "12px Helvetica";
      gg.ctx.fillText(fdisp(m.v_min),g.x-10,g.y+g.h);
      gg.ctx.fillText(fdisp(m.v_max),g.x-10,g.y);

      gg.ctx.strokeStyle = gray;
      var t_x = mapVal(0,gg.timeline.t_max,self.graph.x,self.graph.x+self.graph.w,gg.timeline.t);
      drawLine(t_x,self.graph.y,t_x,self.graph.y+self.graph.h,gg.ctx);

      gg.ctx.fillStyle = red;
      for(var i = 0; i < self.table.n; i++)
      {
        if(self.table.known_data[i] != "-")
        {
          x = mapVal(0,gg.timeline.t_max-1,g.x,g.x+g.w,i);
          y = mapVal(m.v_min,m.v_max,g.y+g.h,g.y,self.table.known_data[i]);
          y = clamp(g.y,g.y+g.h,y);
          gg.ctx.fillRect(x-1,y-1,2,2);
        }
      }
    }
  }

}



