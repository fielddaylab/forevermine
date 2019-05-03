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

  self.mode = 0; //0- normal, 1- angry, 2- glitched
  self.dead = 0;

  self.bg_color = [];
  self.eye_img = [];
  self.mouth_img = [];

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

  self.eyes_pw = [];
  self.eyes_ph = [];
  self.mouth_pw = [];
  self.mouth_ph = [];
  self.eyes_hy = []; //"home" y
  self.eyes_vy = []; //"variance" y
  self.mouth_hy = []; //"home" y
  self.mouth_vy = []; //"variance" y

  //normal
  self.eyes_pw.push(0.15);
  self.eyes_ph.push(0.08);
  self.mouth_pw.push(0.4);
  self.mouth_ph.push(0.18);

  self.eyes_hy.push(0.42); //"home" y
  self.eyes_vy.push(0.25); //"variance" y
  self.mouth_hy.push(0.64); //"home" y
  self.mouth_vy.push(0.25); //"variance" y

  self.bg_color.push("#F1F9EB");
  self.eye_img.push(GenImg("assets/eye_0.png"));
  self.mouth_img.push(GenImg("assets/mouth_0.png"));

  //angry
  self.eyes_pw.push(0.15);
  self.eyes_ph.push(0.08);
  self.mouth_pw.push(0.4);
  self.mouth_ph.push(0.18);

  self.eyes_hy.push(0.42); //"home" y
  self.eyes_vy.push(0.25); //"variance" y
  self.mouth_hy.push(0.64); //"home" y
  self.mouth_vy.push(0.25); //"variance" y

  self.bg_color.push("#F1F9EB");
  self.eye_img.push(GenImg("assets/eye_1.png"));
  self.mouth_img.push(GenImg("assets/mouth_1.png"));

  //glitched
  self.eyes_pw.push(0.45);
  self.eyes_ph.push(0.45);
  self.mouth_pw.push(0.6);
  self.mouth_ph.push(0.25);

  self.eyes_hy.push(0.42); //"home" y
  self.eyes_vy.push(0.25); //"variance" y
  self.mouth_hy.push(0.64); //"home" y
  self.mouth_vy.push(0.25); //"variance" y

  self.bg_color.push("#F1F9EB");
  self.eye_img.push(GenImg("assets/eye_2.png"));
  self.mouth_img.push(GenImg("assets/mouth_2.png"));

  self.boot_t = 500;

  self.clicked = 0;

  self.init_screen = function()
  {
    var d = 3;
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
    self.boot_t++; if(self.boot_t > 500) self.boot_t = 500;
    if(self.boot_t > 250) self.talk_t++;
    if(self.boot_t == 249)
    {
      if(gg.sound && !gg.skipping)
      {
             if(gg.monitor.mode == 0) gg.audwrangler.play(gg.voices.clean[randIntBelow(gg.voices.clean.length)]);
        else if(gg.monitor.mode == 1) gg.audwrangler.play(gg.voices.angry[randIntBelow(gg.voices.angry.length)]);
        else                          gg.audwrangler.play(gg.voices.glitchy[randIntBelow(gg.voices.glitchy.length)]);
      }
    }

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

    if(self.dead)
    {
    c.fillStyle = black;
    c.fillRect(0,0,s.width,s.height);
    return;
    }


    var tmode = self.mode;
    if(tmode == 2)
    {
      tmode = 2*floor(clamp(0,1,sin(8*sin(3*sin(gg.time_mod_twelve_pi*2)))+1))
    }

    c.fillStyle = self.bg_color[tmode];
    if(self.mode == 2)
      c.drawImage(gg.glitch_bg_img,0,0,s.width,s.height);
    else
      c.fillRect(0,0,s.width,s.height);

    c.fillStyle = blue;
    var w;
    var h;
    var x;
    var y;
    w = s.width*(self.eyes_pw[tmode]+self.eyes_nsw/2)*self.eyes_nw;
    h = s.height*self.eyes_ph[tmode]*self.eyes_nh;
    x = self.eyes_nx*s.width/2-w/2;
    y = s.height*self.eyes_hy[tmode]-h/2+self.eyes_ny*s.height*self.eyes_vy[tmode];
    //c.fillRect(x,y,w,h); //left eye
    c.drawImage(self.eye_img[tmode],x,y,w,h);
    x = s.width/2+self.eyes_nx*s.width/2-w/2;
    //c.fillRect(x,y,w,h); //right eye
    c.drawImage(self.eye_img[tmode],x,y,w,h);

    w = s.width*(self.mouth_pw[tmode]+self.mouth_nsw/2)*self.mouth_nw;
    h = s.height*self.mouth_ph[tmode]*self.mouth_nh;
    x = s.width/4+self.mouth_nx*s.width/2-w/2;
    y = s.height*self.mouth_hy[tmode]-h/2+self.mouth_ny*s.height*self.mouth_vy[tmode];
    //c.fillRect(x,y,w,h); //mouth
    c.drawImage(self.mouth_img[tmode],x,y,w,h);

    if(self.boot_t <= 1)
    {
      c.fillStyle = black;
      c.fillRect(0,0,s.width,s.height);
    }
    else if(self.boot_t < 100)
    {
      c.fillStyle = black;
      c.fillRect(0,0,s.width,s.height);
      if(self.boot_t < 10)
        gg.ctx.globalAlpha = self.boot_t/10;
      else if(self.boot_t > 90)
        gg.ctx.globalAlpha = 1-((self.boot_t-90)/10);
      c.drawImage(gg.fmlogo_img,0,s.height/4,s.width,s.height/2);
      gg.ctx.globalAlpha = 1;
    }
    else if(self.boot_t < 200)
    {
      c.fillStyle = black;
      c.fillRect(0,0,s.width,s.height);
      c.fillStyle = "#D692E7";
      c.textAlign = "left";
      c.font = "18px DisposableDroidBB";
      switch(floor(self.boot_t/10) % 4)
      {
        case 0: c.fillText("LOADING",   s.width/4,s.height/2-15); break;
        case 1: c.fillText("LOADING.",  s.width/4,s.height/2-15); break;
        case 2: c.fillText("LOADING..", s.width/4,s.height/2-15); break;
        case 3: c.fillText("LOADING...",s.width/4,s.height/2-15); break;
      }
      c.fillRect(s.width/4,s.height/2-10,s.width/2,20);
      c.fillStyle = black;
      var p = 3;
      c.fillRect(s.width/4+p,s.height/2-10+p,s.width/2-2*p,20-2*p);
      c.fillStyle = "#D692E7";
      var x = s.width/4+p+p;
      var w = ((s.width/2-2*p-p)/10)-p;
      for(var i = 0; i < floor((self.boot_t-100)/10); i++)
        c.fillRect(x+(w+p)*i,s.height/2-10+p+p,w,20-4*p);
    }
    else if(self.boot_t < 250)
    {
      var t = (self.boot_t-200)/50;
      t = 1-t;
      t = t*t;
      t = t*t;
      c.fillStyle = black;
      c.fillRect(0,0,s.width,s.height/2*t);
      c.fillRect(0,s.height-s.height/2*t,s.width,s.height/2*t);
      t = t*t;
      t = t*t;
      c.fillRect(0,0,s.width/2*t,s.height);
      c.fillRect(s.width-s.width/2*t,0,s.width/2*t,s.height);
    }
  }
}

var content_dragger = function()
{
  var self = this;
  self.w = 0;
  self.h = 0;
  self.x = 0;
  self.y = 0;

  self.dragging_x = 0;
  self.dragging_y = 0;
  self.dragging_data = 0;
  self.dragging_label = 0;
  self.dragging_constant = 0;
  self.dragging_sim = 0;
  self.label_val = 0;
  self.constant_val = 0;
  self.last_evt = 0;

  //drag
  self.ptWithinX = function(evt)
  {
    if(gg.line.x_set) return 0;
    var x = gg.graph.x;
    var y = gg.graph.y+gg.graph.h;
    var w = gg.graph.w;
    var h = 50;
    return ptWithin(x,y,w,h,  evt.doX,evt.doY);
  }
  self.ptWithinY = function(evt)
  {
    if(gg.line.y_set) return 0;
    var x = gg.message_box.x+gg.message_box.w;
    var y = gg.graph.y;
    var w = gg.graph.x-x;
    var h = gg.graph.h;
    return ptWithin(x,y,w,h,  evt.doX,evt.doY);
  }
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
      if(mb.types[i] == CONTENT_DATA || mb.types[i] == CONTENT_SIM)
        y += mb.font_h+mb.pad;
      else if(mb.types[i] == CONTENT_LABEL)
        y += mb.font_h*3-mb.pad;
      else if(mb.types[i] == CONTENT_CONSTANT)
        y += mb.font_h*4-mb.pad;
      else
        y += mb.font_h*mb.bubbles[i].length+mb.pad*2;
      y += mb.pad;
    }
    return 0;
  }
  self.ptWithinSim = function(evt)
  {
    if(gg.table.simd_visible < gg.table.max_t) return 0;
    if(gg.timeline.t == gg.timeline.t_max && gg.cur_level.progress > 7 && ptWithin(gg.timeline.x+gg.timeline.w*9/10, gg.timeline.y, gg.timeline.w/10, gg.timeline.h, evt.doX, evt.doY)) return 1;
    var t = gg.table;
    var y1 = t.y+t.h*1/3;
    var y3 = t.y+t.h;
    return ptWithin(t.x,y1,t.w,y3-y1,evt.doX,evt.doY);
  }
  self.ptWithinLabel = function(evt)
  {
    var mb = gg.message_box;
    //copied from mb draw
    var y = mb.top_y;
    if(evt.doY < gg.message_box.monitor_y+gg.message_box.monitor_h) return 0;
    for(var i = 0; i < mb.displayed_i; i++)
    {
      if(mb.types[i] == CONTENT_LABEL && ptWithin(mb.x+mb.pad, y, mb.bubble_w, mb.pad+mb.font_h*3-mb.pad, evt.doX,evt.doY))
      {
        self.label_val = mb.bubbles[i][0];
        return 1;
      }
      y += mb.pad;
      if(mb.types[i] == CONTENT_DATA || mb.types[i] == CONTENT_SIM)
        y += mb.font_h+mb.pad;
      else if(mb.types[i] == CONTENT_LABEL)
        y += mb.font_h*3-mb.pad;
      else if(mb.types[i] == CONTENT_CONSTANT)
        y += mb.font_h*4-mb.pad;
      else
        y += mb.font_h*mb.bubbles[i].length+mb.pad*2;
      y += mb.pad;
    }
    return 0;
  }
  self.ptWithinConstant = function(evt)
  {
    var mb = gg.message_box;
    //copied from mb draw
    var y = mb.top_y;
    if(evt.doY < gg.message_box.monitor_y+gg.message_box.monitor_h) return 0;
    for(var i = 0; i < mb.displayed_i; i++)
    {
      if(mb.types[i] == CONTENT_CONSTANT && ptWithin(mb.x+mb.pad, y, mb.bubble_w, mb.pad+mb.font_h*4-mb.pad, evt.doX,evt.doY))
      {
        var c = 0;
        for(var j = 0; j < gg.cur_level.m_label.length; j++)
          if(mb.bubbles[i][0] == gg.cur_level.m_label[j]) self.constant_val = gg.cur_level.m_correct[j];
        for(var j = 0; j < gg.cur_level.b_label.length; j++)
          if(mb.bubbles[i][0] == gg.cur_level.b_label[j]) self.constant_val = gg.cur_level.b_correct[j];
        return 1;
      }
      y += mb.pad;
      if(mb.types[i] == CONTENT_DATA || mb.types[i] == CONTENT_SIM)
        y += mb.font_h+mb.pad;
      else if(mb.types[i] == CONTENT_LABEL)
        y += mb.font_h*3-mb.pad;
      else if(mb.types[i] == CONTENT_CONSTANT)
        y += mb.font_h*4-mb.pad;
      else
        y += mb.font_h*mb.bubbles[i].length+mb.pad*2;
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
  self.ptWithinEqnX = function(evt)
  {
    var e = gg.line;
    return ptWithin(e.x_x, e.eqn_y, e.btn_w, e.btn_h,  evt.doX,evt.doY);
  }
  self.ptWithinEqnY = function(evt)
  {
    var e = gg.line;
    return ptWithin(e.y_x, e.eqn_y, e.btn_w, e.btn_h,  evt.doX,evt.doY);
  }

  self.dragStart = function(evt)
  {
    self.dragging_x = 0;
    self.dragging_y = 0;
    self.dragging_data = 0;
    self.dragging_label = 0;
    self.dragging_constant = 0;
    self.dragging_sim = 0;

    self.drag(evt);

    if(gg.cur_level.msg_progress == 6 && self.ptWithinX(evt))                        { self.dragging_x = 1;        return 1; }
    if(gg.cur_level.msg_progress == 6 && self.ptWithinY(evt))                        { self.dragging_y = 1;        return 1; }
    if(!gg.table.data_visible && self.ptWithinData(evt))                             { self.dragging_data = 1;     return 1; }
    if(gg.table.data_visible && gg.cur_level.progress < 10 && self.ptWithinSim(evt)) { self.dragging_sim = 1;      return 1; }
    if(gg.cur_level.msg_progress == 7 && self.ptWithinLabel(evt))                    { self.dragging_label = 1;    return 1; }
    if(gg.cur_level.msg_progress == 8 && self.ptWithinConstant(evt))                 { self.dragging_constant = 1; return 1; }
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
    if(self.dragging_x && self.ptWithinEqnX(evt))
    {
      gg.line.x_set = 1;
      if(gg.line.y_set)
      {
        if(gg.cur_level.skip_labels)
        {
          //gg.message_box.nq_group(gg.cur_level.text.labels);//skip!
          gg.cur_level.progress++;
          gg.message_box.nq_group(gg.cur_level.text.constants);
          gg.cur_level.progress++;
        }
        else
        {
          gg.message_box.nq_group(gg.cur_level.text.labels);
          gg.cur_level.progress++;
        }
      }
    }
    if(self.dragging_y && self.ptWithinEqnY(evt))
    {
      gg.line.y_set = 1;
      if(gg.line.x_set)
      {
        if(gg.cur_level.skip_labels)
        {
          //gg.message_box.nq_group(gg.cur_level.text.labels);//skip!
          gg.cur_level.progress++;
          gg.message_box.nq_group(gg.cur_level.text.constants);
          gg.cur_level.progress++;
        }
        else
        {
          gg.message_box.nq_group(gg.cur_level.text.labels);
          gg.cur_level.progress++;
        }
      }
    }
    if(self.dragging_data && self.ptWithinTable(evt))
    {
      gg.table.data_visible = 1;
      gg.table.verify();
      if(gg.cur_level.skip_axis)
      {
        //gg.message_box.nq_group(gg.cur_level.text.axis);//skip!
        gg.cur_level.progress++;
        if(gg.cur_level.skip_labels)
        {
          //gg.message_box.nq_group(gg.cur_level.text.labels);//skip!
          gg.cur_level.progress++;
          gg.message_box.nq_group(gg.cur_level.text.constants);
          gg.cur_level.progress++;
        }
        else
        {
          gg.message_box.nq_group(gg.cur_level.text.labels);
          gg.cur_level.progress++;
        }
      }
      else
      {
        gg.message_box.nq_group(gg.cur_level.text.axis);
        gg.cur_level.progress++;
      }
      gg.stage_t = 0;
    }
    if(self.dragging_sim && self.ptWithinChat(evt))
    {
      gg.message_box.nq(get_timer(0),"Modeled Data:",CONTENT_SIM,EMOTE_NULL);
      if(gg.table.correct)
      {
        gg.cur_level.correct = 1;
        gg.message_box.nq_group(gg.cur_level.text.review);
        gg.cur_level.progress++;
        //if(gg.cur_level.skip_zoom)
        {
          gg.message_box.nq_group(gg.cur_level.text.debrief);
          gg.cur_level.progress++;
        }
        gg.stage_t = 0;
      }
      else
      {
        gg.message_box.nq_group(gg.cur_level.text.submitted_incorrect);
        //gg.cur_level.progress++; //do not increment!
      }

    }
    if(self.dragging_label)
    {
      for(var i = 0; i < gg.line.m_btn.length; i++)
      {
        if(ptWithinBox(gg.line.m_btn[i],evt.doX,evt.doY))
        {
          for(var j = 0; j < gg.cur_level.m_label.length; j++)
            if(gg.cur_level.m_label[j] == self.label_val) gg.line.m_label[i] = j;
          for(var j = 0; j < gg.cur_level.b_label.length; j++)
            if(gg.cur_level.b_label[j] == self.label_val) gg.line.m_label[i] = j+gg.cur_level.m_label.length;
        }
      }
      for(var i = 0; i < gg.line.b_btn.length; i++)
      {
        if(ptWithinBox(gg.line.b_btn[i],evt.doX,evt.doY))
        {
          for(var j = 0; j < gg.cur_level.m_label.length; j++)
            if(gg.cur_level.m_label[j] == self.label_val) gg.line.b_label[i] = j;
          for(var j = 0; j < gg.cur_level.b_label.length; j++)
            if(gg.cur_level.b_label[j] == self.label_val) gg.line.b_label[i] = j+gg.cur_level.m_label.length;
        }
      }
      var filled = 1;
      for(var i = 0; i < gg.line.m_label.length; i++) if(gg.line.m_label[i] == -1) filled = 0;
      for(var i = 0; i < gg.line.b_label.length; i++) if(gg.line.b_label[i] == -1) filled = 0;
      if(filled)
      {
        var lcorrect = 1;
        if(gg.cur_level.special)
        {
          var in_0 = 0;
          var in_1 = 0;
          var in_2 = 0;
          for(var i = 0; i < gg.line.m_label.length; i++) if(gg.line.m_label[i] == 0) in_0 = 1;
          for(var i = 0; i < gg.line.m_label.length; i++) if(gg.line.m_label[i] == 1) in_1 = 1;
          for(var i = 0; i < gg.line.m_label.length; i++) if(gg.line.m_label[i] == 2) in_2 = 1;
          if(!(in_0 && in_1 && in_2)) lcorrect = 0;
        }
        else
          for(var i = 0; i < gg.line.m_label.length; i++) if(gg.line.m_label[i] != i) lcorrect = 0;
        for(var i = 0; i < gg.line.b_label.length; i++) if(gg.line.b_label[i] != gg.cur_level.m_label.length+i) lcorrect = 0;
        if(lcorrect)
        {
          gg.message_box.nq_group(gg.cur_level.text.constants);
          gg.cur_level.progress++;
          gg.stage_t = 0;
        }
        else
        {
          //if(!gg.cur_level.sent_labels_incorrect)
          for(var i = 0; i < gg.line.m_label.length; i++) gg.line.m_label[i] = -1;
          for(var i = 0; i < gg.line.b_label.length; i++) gg.line.b_label[i] = -1;
          gg.message_box.nq_group(gg.cur_level.text.labels_incorrect);
          //gg.cur_level.progress++; //don't advance
          gg.cur_level.sent_labels_incorrect = 1;
        }
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
    self.dragging_x = 0;
    self.dragging_y = 0;
    self.dragging_data = 0;
    self.dragging_label = 0;
    self.dragging_constant = 0;
    self.dragging_sim = 0;
  }

  self.draw = function()
  {
    if(self.dragging_x)
    {
      var lw = 100;
      var lh = 60;
      gg.ctx.font = "18px DisposableDroidBB";
      gg.ctx.drawImage(gg.axis_label_bg_img, self.last_evt.doX-lw/2, self.last_evt.doY-lh/2, lw, lh);
      gg.ctx.textAlign = "center";
      gg.ctx.fillStyle = black;
      gg.ctx.fillText(gg.cur_level.x_label, self.last_evt.doX, self.last_evt.doY+lh/6);
      gg.ctx.globalAlpha = 1;
    }
    if(self.dragging_y)
    {
      var lw = 100;
      var lh = 60;
      gg.ctx.font = "18px DisposableDroidBB";
      gg.ctx.drawImage(gg.axis_label_bg_img, self.last_evt.doX-lw/2, self.last_evt.doY-lh/2, lw, lh);
      gg.ctx.textAlign = "center";
      gg.ctx.fillStyle = black;
      gg.ctx.fillText(gg.cur_level.y_label, self.last_evt.doX, self.last_evt.doY+lh/6);
    }
    if(self.dragging_data)
    {
      gg.ctx.drawImage(gg.data_img,self.last_evt.doX-30,self.last_evt.doY-30,60,60);
    }
    if(self.dragging_label)
    {
      gg.ctx.drawImage(gg.data_img,self.last_evt.doX-30,self.last_evt.doY-30,60,60);
      gg.ctx.fillStyle = gg.message_box.data_text_color; gg.ctx.fillText(self.label_val,self.last_evt.doX+30,self.last_evt.doY);
    }
    if(self.dragging_constant)
    {
      gg.ctx.drawImage(gg.data_img,self.last_evt.doX-30,self.last_evt.doY-30,60,60);
      gg.ctx.fillStyle = gg.message_box.data_text_color; gg.ctx.fillText(self.constant_val,self.last_evt.doX+30,self.last_evt.doY);
    }
    if(self.dragging_sim)
    {
      gg.ctx.drawImage(gg.submit_img,self.last_evt.doX-30,self.last_evt.doY-30,60,60);
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

  self.pad = 50;
  self.font_h = 30;
  self.ai_font = self.font_h+"px DisposableDroidBB";
  self.player_font = floor(self.font_h*0.7)+"px Lato";

  self.texts = [];
  self.bubbles = [];
  self.types = [];
  self.metas = [];

  self.displayed_i = 0;

  self.blackout_t = 0;
  self.recover_t = 0;
  self.change_t = 0;
  self.emp_t = 0;

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
    if(type == CONTENT_AI) self.bubbles.push(textToLines(self.ai_font,self.text_w,text,gg.ctx));
    else self.bubbles.push(textToLines(self.player_font,self.text_w,text,gg.ctx));
    self.types.push(type);
    self.metas.push(meta);
    if(self.displayed_i == self.texts.length-1)
    {
      //disabling all but "DIE" (at time of adding this code) because I know it works w/o them, and only for-sure need "DIE" to work here #HACKS
      //if(self.metas[self.displayed_i] == EMOTE_BLACKOUT) self.blackout_t = 1;
      //if(self.metas[self.displayed_i] == EMOTE_RECOVER) self.recover_t = 1;
      //if(self.metas[self.displayed_i] == EMOTE_CHANGE) { self.change_t = 1; gg.monitor.mode = 1; }
      //if(self.metas[self.displayed_i] == EMOTE_EMP)    { self.emp_t = 1; }
      if(self.metas[self.displayed_i] == EMOTE_DIE)    { gg.monitor.dead = 1; }
      if(self.texts.length == 1 && self.types[0] == CONTENT_AI) gg.monitor.talk_t = 0;
      if(self.types[self.displayed_i] == CONTENT_AI)
      {
        if(self.metas[self.displayed_i] != EMOTE_SILENT && self.metas[self.displayed_i] != EMOTE_EMP && gg.sound && !gg.skipping)
        {
               if(gg.monitor.mode == 0) gg.audwrangler.play(gg.voices.clean[randIntBelow(gg.voices.clean.length)]);
          else if(gg.monitor.mode == 1) gg.audwrangler.play(gg.voices.angry[randIntBelow(gg.voices.angry.length)]);
          else                          gg.audwrangler.play(gg.voices.glitchy[randIntBelow(gg.voices.glitchy.length)]);
        }
      }
    }
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
    if(self.displayed_i == self.texts.length) gg.cur_level.msg_progress = gg.cur_level.progress;
    if(self.metas[self.displayed_i] == EMOTE_BLACKOUT) self.blackout_t = 1;
    if(self.metas[self.displayed_i] == EMOTE_RECOVER) self.recover_t = 1;
    if(self.metas[self.displayed_i] == EMOTE_CHANGE) { self.change_t = 1; gg.monitor.mode = 1; }
    if(self.metas[self.displayed_i] == EMOTE_BUILD)  { if(gg.sound) gg.build_track = gg.audwrangler.play(gg.build_audio); }
    if(self.metas[self.displayed_i] == EMOTE_EMP)    { gg.empd = 1; self.emp_t = 1; if(gg.build_track) gg.audwrangler.stop(gg.build_track); if(gg.sound) gg.audwrangler.play(gg.emp_audio); gg.audwrangler.stop_music(); gg.build_track = 0; }
    if(self.metas[self.displayed_i] == EMOTE_DIE)    { gg.monitor.dead = 1; }
    if(self.types[self.displayed_i] == CONTENT_AI)
    {
      if(self.metas[self.displayed_i] != EMOTE_SILENT && self.metas[self.displayed_i] != EMOTE_EMP && gg.sound && !gg.skipping)
      {
             if(gg.monitor.mode == 0) gg.audwrangler.play(gg.voices.clean[randIntBelow(gg.voices.clean.length)]);
        else if(gg.monitor.mode == 1) gg.audwrangler.play(gg.voices.angry[randIntBelow(gg.voices.angry.length)]);
        else                          gg.audwrangler.play(gg.voices.glitchy[randIntBelow(gg.voices.glitchy.length)]);
      }
    }
  }

  self.click = function(evt)
  {
    if(self.emp_t || self.blackout_t) return;
    if(self.displayed_i < self.texts.length) self.advance();
  }

  self.tick = function()
  {
    if(self.blackout_t) { self.blackout_t++; if(self.blackout_t == gg.blackout_t) { self.blackout_t = 0; self.advance(); } }
    if(self.recover_t) { self.recover_t++; if(self.recover_t == gg.recover_t) self.recover_t = 0; }
    if(self.change_t) self.change_t++;
    if(self.emp_t)  { self.emp_t++; if(self.emp_t == gg.emp_t) { self.emp_t = 0; self.advance(); } }
  }

  self.draw = function()
  {
    if(self.displayed_i >= self.texts.length) return;

    if(self.emp_t || self.blackout_t) return;

    gg.ctx.drawImage(gg.exposition_bg_img, self.x,self.y,self.w,self.h);

    gg.ctx.textAlign = "left";
    var y = self.y+self.pad+self.font_h/2;
    switch(self.types[self.displayed_i])
    {
      case CONTENT_AI:
        gg.ctx.font = self.ai_font;
        gg.ctx.fillStyle = cyan;
        gg.ctx.fillText("MAL",self.x+self.pad,y);
        break;
      case CONTENT_PLAYER:
        gg.ctx.font = self.player_font;
        gg.ctx.fillStyle = magenta;
        gg.ctx.fillText("YOU",self.x+self.pad,y);
        break;
    }
    y += self.font_h;
    gg.ctx.fillStyle = white;
    for(var i = 0; i < self.bubbles[self.displayed_i].length; i++)
    {
      gg.ctx.fillText(self.bubbles[self.displayed_i][i],self.x+self.pad,y);
      y += self.font_h;
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

  self.zoom = 0;

  self.x_off = 0;
  self.x0_min = 0;
  self.x0_max = 10;
  self.y0_min = 0;
  self.y0_max = 10;
  self.x0_grid = 1;
  self.y0_grid = 1;

  self.x1_min = 0;
  self.x1_max = gg.max_days*24;
  self.y1_min = 0;
  self.y1_max = round(gg.needed_fuel*1.1);
  self.x1_grid = 24;
  self.y1_grid = 50;

  self.off_x_for_x = function(x)
  {
    x = x+self.x_off;
    if(self.zoom == 0) return mapVal(self.x0_min+self.x_off,self.x0_max+self.x_off,self.x,self.x+self.w,x);
    else if(self.zoom == 1) return mapVal(self.x1_min,self.x1_max,self.x,self.x+self.w,x);
    else return mapVal(lerp(self.x0_min+self.x_off,self.x1_min,self.zoom),lerp(self.x0_max+self.x_off,self.x1_max,self.zoom),self.x,self.x+self.w,x);
  }
  self.x_for_x = function(x)
  {
    if(self.zoom == 0) return mapVal(self.x0_min+self.x_off,self.x0_max+self.x_off,self.x,self.x+self.w,x);
    else if(self.zoom == 1) return mapVal(self.x1_min,self.x1_max,self.x,self.x+self.w,x);
    else return mapVal(lerp(self.x0_min+self.x_off,self.x1_min,self.zoom),lerp(self.x0_max+self.x_off,self.x1_max,self.zoom),self.x,self.x+self.w,x);
  }
  self.y_for_y = function(y)
  {
    if(self.zoom == 0) return mapVal(self.y0_min,self.y0_max,self.y+self.h,self.y,y);
    else if(self.zoom == 1) return mapVal(self.y1_min,self.y1_max,self.y+self.h,self.y,y);
    else return mapVal(lerp(self.y0_min,self.y1_min,self.zoom),lerp(self.y0_max,self.y1_max,self.zoom),self.y+self.h,self.y,y);
  }

  self.tick = function()
  {

  }

  self.draw = function()
  {
    var t = self.zoom;
    var zy;
    var zx;
    var x;
    var y;

      //zones
    if(t > 0.5)
    {
      gg.ctx.globalAlpha = (t-0.5)*2;
      zy = self.y_for_y(gg.needed_fuel);
      if(zy < self.y) zy = self.y;
      gg.ctx.fillStyle = "#75F3FF";
      gg.ctx.fillRect(self.x,self.y,self.w,zy-self.y);
      zx = self.x_for_x((gg.max_days-1)*24);
      if(zx > self.x+self.w) zx = self.x+self.w;
      gg.ctx.fillStyle = "#EFA6FF";
      gg.ctx.fillRect(zx,zy,self.w-(zx-self.x),self.y+self.h-zy);

      gg.ctx.globalAlpha = 1;
    }

    gg.ctx.font = "18px DisposableDroidBB";
    gg.ctx.textAlign = "center";

    //grid
    gg.ctx.strokeStyle = "rgba(0,0,0,0.2)";
    gg.ctx.lineWidth = 2;
      //vertical lines
    var lw = 100;
    var lh = 60;
    gg.ctx.drawImage(gg.axis_label_bg_img, self.x+self.w/2-lw/2, self.y+self.h+40-lh/2, lw, lh);
    if(gg.cur_level.msg_progress == 6 && !gg.line.x_set && !gg.content_dragger.dragging_x)
      drawImageSizeCentered(gg.notice_img, self.x+self.w/2+lw/3, self.y+self.h+25, 20, gg.ctx);
    if(t < 0.5)
    {
      gg.ctx.fillStyle = white;
      gg.ctx.globalAlpha = 1-(t*2);
      gg.ctx.beginPath();
      for(var i = self.x0_min; i <= self.x0_max; i += self.x0_grid)
      {
        x = floor(self.off_x_for_x(i));
        if(x < self.x || x > self.x+self.w) continue;
        gg.ctx.moveTo(x,self.y);
        gg.ctx.lineTo(x,self.y+self.h);
        gg.ctx.fillText(i,x,self.y+self.h+15);
      }
      gg.ctx.stroke();

      if(t == 0) gg.ctx.fillText(self.x0_max,self.x+self.w,self.y+self.h+15);
      gg.ctx.fillStyle = black;
      gg.ctx.fillText(gg.cur_level.x_label,self.x+self.w/2,self.y+self.h+45);
      gg.ctx.globalAlpha = 1;
    }
    else
    {
      gg.ctx.fillStyle = white;
      gg.ctx.globalAlpha = (t-0.5)*2;
      gg.ctx.beginPath();
      for(var i = self.x1_min; i <= self.x1_max; i += self.x1_grid)
      {
        x = floor(self.x_for_x(i));
        if(x < self.x || x > self.x+self.w) continue;
        gg.ctx.moveTo(x,self.y);
        gg.ctx.lineTo(x,self.y+self.h);
        gg.ctx.fillText(i/24,x,self.y+self.h+15);
      }
      gg.ctx.stroke();

      if(t == 1) gg.ctx.fillText(self.x1_max/24,self.x+self.w,self.y+self.h+15);
      gg.ctx.fillStyle = black;
      gg.ctx.fillText("DAYS",self.x+self.w/2,self.y+self.h+45);
      gg.ctx.globalAlpha = 1;
    }

      //horizontal lines
    gg.ctx.drawImage(gg.axis_label_bg_img, self.x-25-lw, self.y+self.h/2-lh/2, lw, lh);
    if(gg.cur_level.msg_progress == 6 && !gg.line.y_set && !gg.content_dragger.dragging_y)
      drawImageSizeCentered(gg.notice_img, self.x-lw*3/7, self.y+self.h/2-16, 20, gg.ctx);
    if(t < 0.5)
    {
      gg.ctx.fillStyle = white;
      gg.ctx.globalAlpha = 1-(t*2);
      gg.ctx.beginPath();
      for(var i = self.y0_min; i <= self.y0_max; i += self.y0_grid)
      {
        y = floor(self.y_for_y(i));
        gg.ctx.moveTo(self.x,y);
        gg.ctx.lineTo(self.x+self.w,y);
        gg.ctx.fillText(i,self.x-15,y+5);
      }
      gg.ctx.stroke();

      if(t == 0) gg.ctx.fillText(self.y0_max,self.x-15,self.y+5);
      gg.ctx.globalAlpha = 1;
      gg.ctx.textAlign = "center";
      gg.ctx.fillStyle = black;
      gg.ctx.fillText(gg.cur_level.y_label,self.x-25-lw/2,self.y+5+self.h/2);
    }
    else
    {
      gg.ctx.fillStyle = white;
      gg.ctx.globalAlpha = (t-0.5)*2;
      gg.ctx.beginPath();
      for(var i = self.y1_min; i <= self.y1_max; i += self.y1_grid)
      {
        y = floor(self.y_for_y(i));
        if(y > self.y)
        {
          gg.ctx.moveTo(self.x,y);
          gg.ctx.lineTo(self.x+self.w,y);
          gg.ctx.fillText(i,self.x-15,y+5);
        }
      }
      gg.ctx.stroke();

      if(t == 1) gg.ctx.fillText(self.y1_max,self.x-15,self.y+5);
      gg.ctx.globalAlpha = 1;
      gg.ctx.textAlign = "center";
      gg.ctx.fillStyle = black;
      gg.ctx.fillText(gg.cur_level.y_label,self.x-25-lw/2,self.y+5+self.h/2);
    }

      //tl
    gg.ctx.strokeStyle = gray;
    x = self.off_x_for_x(gg.timeline.t);
    drawLine(x,self.y,x,self.y+self.h,gg.ctx);

    if(self.zoom > 0.5)
    {
      gg.ctx.globalAlpha = (self.zoom-0.5)*2;
      gg.ctx.fillStyle = black;
      gg.ctx.textAlign = "left";
      if(y > self.y+5) gg.ctx.fillText("You Survive", self.x+5, zy-5);
      gg.ctx.fillText("You Die", zx+5, self.y+self.h-5);
      gg.ctx.globalAlpha = 1;
    }

    gg.ctx.strokeStyle = white;
    gg.ctx.lineWidth = 4;
    gg.ctx.strokeRect(self.x,self.y,self.w,self.h);
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

  self.size = function()
  {
    self.sx = self.x+self.w*1.5/(self.t_max+2)
    self.ex = self.x+self.w*(self.t_max+1.5)/(self.t_max+2);
  }

  self.dragStart = function(evt)
  {
    self.drag(evt);
  }
  self.drag = function(evt)
  {
    if(gg.cur_level.progress < 8) { self.t = 0; return; }
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
    if(check) check = !dragger.filter(self);
    return !check;
  }

  self.t_correct = 0;
  self.tick = function()
  {
    if(self.t == self.t_max && gg.table.correct && gg.cur_level.progress > 7)
      self.t_correct++;
    else self.t_correct = 0;
    if(gg.cur_level.progress < 8) { self.t = 0; return; }
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

    var ew = 80;
    var eh = 120;
    gg.ctx.drawImage(gg.ui_chart_overlay_img, gg.table.x-ew/2, gg.table.y-50+gg.table.yoff, gg.table.w+ew, gg.table.h+eh);

    var t_x;

    t_x = mapVal(0,self.t_max,self.sx,self.ex,self.t);
    var s = (self.h-15);
    if(self.t == self.t_max && gg.table.correct && gg.cur_level.progress > 7)
      gg.ctx.drawImage(gg.timeline_scrubber_large_img,t_x-s*3/4,self.y+15+gg.table.yoff-s/2,s*3/2,s*1.5);
    else
      gg.ctx.drawImage(gg.timeline_scrubber_img,t_x-s/2,self.y+15+gg.table.yoff,s,s);

    if(self.t < self.t_target)
    {
      gg.ctx.font = "12px DisposableDroidBB";
      gg.ctx.fillStyle = light_gray;
      gg.ctx.fillText("simulating...",self.x+50,self.y-15);
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
  self.label_font_h = 20;
  self.label_font = self.label_font_h+"px DisposableDroidBB";
  self.number_font_h = 40;
  self.number_font = self.number_font_h+"px Lato";
  self.small_number_font_h = 30;
  self.small_number_font = self.small_number_font_h+"px Lato";
  self.vsmall_number_font_h = 25;
  self.vsmall_number_font = self.vsmall_number_font_h+"px Lato";

  self.m_label = [-1];
  self.m = [0];
  self.b_label = [-1];
  self.b = [0];
  self.m_total = 0;
  self.b_total = 0;
  self.y_x = 0;
  self.x_x = 0;
  self.eqn_strings = [""];
  self.eqn_ws = [0];
  self.eqn_xs = [0];
  self.x_set = 0;
  self.y_set = 0;

  self.day_m = [];
  self.day_b = [];

  self.x_draw_h = 0;
  self.y_draw_h = 0;
  self.m_btn = [];
  self.m_btn_draw_h = [];
  self.minc_btn = [];
  self.mdec_btn = [];
  self.b_btn = [];
  self.b_btn_draw_h = [];
  self.binc_btn = [];
  self.bdec_btn = [];

  //line
  self.sx0 = 0;
  self.sy0 = 0;
  self.ex0 = 0;
  self.ey0 = 0;
  self.sx1 = 0;
  self.sy1 = 0;
  self.ex1 = 0;
  self.ey1 = 0;

  self.push_day = function(m,b)
  {
    self.day_m.push(m);
    self.day_b.push(b);
  }

  self.calc_m_total = function()
  {
    if(gg.cur_level.special)
    {
      self.m_total = 1;
      for(var i = 0; i < self.m.length; i++) self.m_total *= self.m[i];
    }
    else
    {
      self.m_total = 0;
      for(var i = 0; i < self.m.length; i++) self.m_total += self.m[i];
    }
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
    self.x_draw_h = 0;
    self.y_draw_h = 0;
    self.m = [];
    self.m_btn = [];
    self.m_btn_draw_h = [];
    self.minc_btn = [];
    self.mdec_btn = [];
    if(gg.cur_level.skip_axis)
    {
      self.x_set = 1;
      self.y_set = 1;
    }
    else
    {
      self.x_set = 0;
      self.y_set = 0;
    }
    for(var i = 0; i < gg.cur_level.m_starting.length; i++)
    {
      if(gg.cur_level.skip_labels)
        self.m_label[i] = i;
      else
        self.m_label[i] = -1;
      self.m[i] = gg.cur_level.m_starting[i];
      self.m_btn[i] = (function(i){return new NumberBox(0,0,0,0,0,0.01,function(v){ v = fdisp(v,1); if(self.m[i] == v) return; self.m[i] = v; self.calc_m_total(); self.calculate_table(); self.draw_params(); self.invalidate_sim();  });})(i);
      self.m_btn[i].set(gg.cur_level.m_starting[i]);
      self.m_btn_draw_h[i] = 0;
      self.minc_btn[i] = (function(i){return new ButtonBox(0,0,0,0, function(){ var d = gg.cur_level.m_correct[i]-self.m_btn[i].number; if(d <= 1) d = 0.1; else if(d <= 10) d = 1; else if(d <= 100) d = 10; self.m_btn[i].set(self.m_btn[i].number+d); });})(i);
      self.mdec_btn[i] = (function(i){return new ButtonBox(0,0,0,0, function(){ var d = self.m_btn[i].number-gg.cur_level.m_correct[i]; if(d <= 1) d = 0.1; else if(d <= 10) d = 1; else if(d <= 100) d = 10; self.m_btn[i].set(self.m_btn[i].number-d); });})(i);
    }
    self.b = [];
    self.b_btn = [];
    self.b_btn_draw_h = [];
    self.binc_btn = [];
    self.bdec_btn = [];
    for(var i = 0; i < gg.cur_level.b_starting.length; i++)
    {
      if(gg.cur_level.skip_labels)
        self.b_label[i] = self.m_btn.length+i;
      else
        self.b_label[i] = -1;
      self.b[i] = gg.cur_level.b_starting[i];
      self.b_btn[i] = (function(i){return new NumberBox(0,0,0,0,0,0.01,function(v){ v = fdisp(v,1); if(self.b[i] == v) return; self.b[i] = v; self.calc_b_total(); self.calculate_table(); self.draw_params();  self.invalidate_sim(); });})(i);
      self.b_btn[i].set(gg.cur_level.b_starting[i]);
      self.b_btn_draw_h[i] = 0;
      self.binc_btn[i] = (function(i){return new ButtonBox(0,0,0,0, function(){ var d = gg.cur_level.b_correct[i]-self.b_btn[i].number; if(d <= 1) d = 0.1; else if(d <= 10) d = 1; else if(d <= 100) d = 10; self.b_btn[i].set(self.b_btn[i].number+d); });})(i);
      self.bdec_btn[i] = (function(i){return new ButtonBox(0,0,0,0, function(){ var d = self.b_btn[i].number-gg.cur_level.b_correct[i]; if(d <= 1) d = 0.1; else if(d <= 10) d = 1; else if(d <= 100) d = 10; self.b_btn[i].set(self.b_btn[i].number-d); });})(i);
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
    gg.ctx.font = self.font_h+"px Lato";
    self.eqn_strings = [];
    self.eqn_xs = [];
    var eqn_i = 0;
    var m_i = 0;
    var b_i = 0;

    self.btn_w = gg.ctx.measureText("-0.0").width;
    self.btn_h = self.font_h*3;
    self.eqn_w = 0;
    self.eqn_y = gg.stage.height/2-20;

    //figure out w
    if(self.m.length == 1)
    {
      self.eqn_w += self.btn_w; //Y
      self.eqn_strings[eqn_i] = "=";
      self.eqn_ws[eqn_i] = gg.ctx.measureText(self.eqn_strings[eqn_i]).width;
      self.eqn_w += self.eqn_ws[eqn_i];
      eqn_i++;
      self.m_btn[m_i].w = self.btn_w;
      self.eqn_w += self.m_btn[m_i].w;
      m_i++;
      self.eqn_strings[eqn_i] = "×";
      self.eqn_ws[eqn_i] = gg.ctx.measureText(self.eqn_strings[eqn_i]).width;
      self.eqn_w += self.eqn_ws[eqn_i];
      eqn_i++;
      self.eqn_w += self.btn_w; //X
      if(self.b.length == 1)
        self.eqn_strings[eqn_i] = "+"
      else
        self.eqn_strings[eqn_i] = "+("
      self.eqn_ws[eqn_i] = gg.ctx.measureText(self.eqn_strings[eqn_i]).width;
      self.eqn_w += self.eqn_ws[eqn_i];
      eqn_i++;
    }
    else
    {
      self.eqn_w += self.btn_w; //Y
      self.eqn_strings[eqn_i] = "=(";
      self.eqn_ws[eqn_i] = gg.ctx.measureText(self.eqn_strings[eqn_i]).width;
      self.eqn_w += self.eqn_ws[eqn_i];
      eqn_i++;
      while(m_i < self.m.length-1)
      {
        self.m_btn[m_i].w = self.btn_w;
        self.eqn_w += self.m_btn[m_i].w;
        m_i++;
        self.eqn_strings[eqn_i] = "+";
        self.eqn_ws[eqn_i] = gg.ctx.measureText(self.eqn_strings[eqn_i]).width;
        self.eqn_w += self.eqn_ws[eqn_i];
        eqn_i++;
      }
      self.m_btn[m_i].w = self.btn_w;
      self.eqn_w += self.m_btn[m_i].w;
      m_i++;
      self.eqn_strings[eqn_i] = ")×";
      self.eqn_ws[eqn_i] = gg.ctx.measureText(self.eqn_strings[eqn_i]).width;
      self.eqn_w += self.eqn_ws[eqn_i];
      eqn_i++;
      self.eqn_w += self.btn_w; //X
      if(self.b.length == 1)
        self.eqn_strings[eqn_i] = "+";
      else
        self.eqn_strings[eqn_i] = "(";
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
        self.eqn_strings[eqn_i] = "+";
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
    self.y_x = x; //Y
    x += self.btn_w;
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
    self.x_x = x; //X
    x += self.btn_w;
    self.eqn_xs[eqn_i] = x;
    x += self.eqn_ws[eqn_i];
    eqn_i++;
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
      self.minc_btn[i].w = self.m_btn[i].w/3;
      self.minc_btn[i].h = self.m_btn[i].h/8;
      self.minc_btn[i].x = self.m_btn[i].x+self.m_btn[i].w/2-self.minc_btn[i].w/2;
      self.minc_btn[i].y = self.m_btn[i].y-self.minc_btn[i].h+yoff;
      self.mdec_btn[i].w = self.m_btn[i].w/3;
      self.mdec_btn[i].h = self.m_btn[i].h/8;
      self.mdec_btn[i].x = self.m_btn[i].x+self.m_btn[i].w/2-self.mdec_btn[i].w/2;
      self.mdec_btn[i].y = self.m_btn[i].y+self.m_btn[i].h+yoff;
    }
    for(var i = 0; i < self.b.length; i++)
    {
      self.b_btn[i].h = self.btn_h;
      self.b_btn[i].y = self.eqn_y;
      self.binc_btn[i].w = self.b_btn[i].w/3;
      self.binc_btn[i].h = self.b_btn[i].h/8;
      self.binc_btn[i].x = self.b_btn[i].x+self.b_btn[i].w/2-self.binc_btn[i].w/2;
      self.binc_btn[i].y = self.b_btn[i].y-self.binc_btn[i].h+yoff;
      self.bdec_btn[i].w = self.b_btn[i].w/3;
      self.bdec_btn[i].h = self.b_btn[i].h/8;
      self.bdec_btn[i].x = self.b_btn[i].x+self.b_btn[i].w/2-self.bdec_btn[i].w/2;
      self.bdec_btn[i].y = self.b_btn[i].y+self.b_btn[i].h+yoff;
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
    var m_correct_total = 0;
    if(gg.cur_level.special)
    {
      m_correct_total = 1;
      for(var i = 0; i < gg.cur_level.m_correct.length; i++) m_correct_total *= gg.cur_level.m_correct[i];
    }
    else
      for(var i = 0; i < gg.cur_level.m_correct.length; i++) m_correct_total += gg.cur_level.m_correct[i];
    var b_correct_total = 0; for(var i = 0; i < gg.cur_level.b_correct.length; i++) b_correct_total += gg.cur_level.b_correct[i];
    for(var i = 0; i <= gg.timeline.t_max; i++)
    {
      if(i < 3) gg.table.known_data[i] = fdisp(m_correct_total*i+b_correct_total,1);
      else      gg.table.known_data[i] = "-";
      gg.table.predicted_data[i] = self.v(i);
    }
    gg.table.verify();
  }

  self.draw_params = function()
  {
    var oldzoom = gg.graph.zoom; //restore at end of func!

    gg.graph.zoom = 0;
    self.sx0 = gg.graph.x0_min;
    self.ex0 = gg.graph.x0_max;
    self.sy0 = self.v(self.sx0);
    self.ey0 = self.v(self.ex0);
         if(self.sy < gg.graph.y0_min && self.ey < gg.graph.y0_min) { self.sy = gg.graph.y0_min; self.ey = gg.graph.y0_min; }
    else if(self.sy > gg.graph.y0_max && self.ey > gg.graph.y0_max) { self.sy = gg.graph.y0_max; self.ey = gg.graph.y0_max; }
    else
    {
      if(self.sy0 < gg.graph.y0_min) { self.sx0 = (gg.graph.y0_min-self.b_total)/self.m_total; self.sy0 = gg.graph.y0_min; }
      if(self.sy0 > gg.graph.y0_max) { self.sx0 = (gg.graph.y0_max-self.b_total)/self.m_total; self.sy0 = gg.graph.y0_max; }
      if(self.ey0 < gg.graph.y0_min) { self.ex0 = (gg.graph.y0_min-self.b_total)/self.m_total; self.ey0 = gg.graph.y0_min; }
      if(self.ey0 > gg.graph.y0_max) { self.ex0 = (gg.graph.y0_max-self.b_total)/self.m_total; self.ey0 = gg.graph.y0_max; }
    }
    self.sx0 = gg.graph.off_x_for_x(self.sx0);
    self.ex0 = gg.graph.off_x_for_x(self.ex0);
    self.sy0 = gg.graph.y_for_y(self.sy0);
    self.ey0 = gg.graph.y_for_y(self.ey0);

    gg.graph.zoom = 1;
    self.sx1 = gg.graph.x1_min;
    self.ex1 = gg.graph.x1_max;
    self.sy1 = self.v(self.sx1);
    self.ey1 = self.v(self.ex1);
         if(self.sy < gg.graph.y1_min && self.ey < gg.graph.y1_min) { self.sy = gg.graph.y1_min; self.ey = gg.graph.y1_min; }
    else if(self.sy > gg.graph.y1_max && self.ey > gg.graph.y1_max) { self.sy = gg.graph.y1_max; self.ey = gg.graph.y1_max; }
    else
    {
      if(self.sy1 < gg.graph.y1_min) { self.sx1 = (gg.graph.y1_min-self.b_total)/self.m_total; self.sy1 = gg.graph.y1_min; }
      if(self.sy1 > gg.graph.y1_max) { self.sx1 = (gg.graph.y1_max-self.b_total)/self.m_total; self.sy1 = gg.graph.y1_max; }
      if(self.ey1 < gg.graph.y1_min) { self.ex1 = (gg.graph.y1_min-self.b_total)/self.m_total; self.ey1 = gg.graph.y1_min; }
      if(self.ey1 > gg.graph.y1_max) { self.ex1 = (gg.graph.y1_max-self.b_total)/self.m_total; self.ey1 = gg.graph.y1_max; }
    }
    self.sx1 = gg.graph.off_x_for_x(self.sx1);
    self.ex1 = gg.graph.off_x_for_x(self.ex1);
    self.sy1 = gg.graph.y_for_y(self.sy1);
    self.ey1 = gg.graph.y_for_y(self.ey1);

    for(var i = 0; i <= gg.timeline.t_max; i++)
      gg.table.predicted_data[i] = fdisp(self.v(i),1);
    gg.table.verify();

    gg.graph.zoom = oldzoom;
  }

  self.filter = function(keyer,blurer,dragger,clicker)
  {
    var check = 1;
    if(gg.cur_level.progress > 7)
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
      gg.ctx.font = self.font;
      gg.ctx.lineWidth = 4;
      gg.ctx.strokeStyle = white;

        //line
      gg.ctx.rect(gg.graph.x,gg.graph.y,gg.graph.w,gg.graph.h);
      gg.ctx.save();
      gg.ctx.clip();
      var sx;
      var sy;
      var ex;
      var ey;
      if(gg.graph.zoom > 0)
      {
        var imax = min(self.day_m.length,gg.cur_level.day);
        if(gg.cur_level.msg_progress < 6) imax = min(self.day_m.length,gg.cur_level.day-1);
        for(var i = 0; i < imax; i++)
        {
          sx = gg.graph.x_for_x(24*i);
          ex = gg.graph.x_for_x(24*(i+1));
          sy = gg.graph.y_for_y(self.day_b[i]);
          ey = gg.graph.y_for_y(self.day_b[i]+self.day_m[i]*24);
          drawLine(sx,sy,ex,ey, gg.ctx);
        }
      }
      if(gg.cur_level.msg_progress < 6 && self.day_m.length >= gg.cur_level.day-1)
      {
        var i = gg.cur_level.day-1;
        var fx = lerp(gg.graph.x0_max+gg.graph.x_off,gg.graph.x1_max,gg.graph.zoom);
        sx = gg.graph.x_for_x(24*i);
        ex = gg.graph.x_for_x(24*(i+1));
        sy = gg.graph.y_for_y(self.day_b[i]);
        ey = gg.graph.y_for_y(self.day_b[i]+(self.day_m[i]*24));
        drawLine(sx,sy,ex,ey, gg.ctx);

        gg.ctx.setLineDash([5,5]);
        fx = lerp(gg.graph.x0_max+gg.graph.x_off,gg.graph.x1_max,gg.graph.zoom);
        sx = gg.graph.x_for_x(24*i);
        ex = gg.graph.x_for_x(fx);
        sy = gg.graph.y_for_y(self.day_b[i]);
        ey = gg.graph.y_for_y(self.day_b[i]+(self.day_m[i]*(fx-gg.graph.x_off+24)));
        drawLine(sx,sy,ex,ey, gg.ctx);
      }
      else
      {
        gg.ctx.setLineDash([5,5]);
             if(gg.graph.zoom == 0) drawLine(self.sx0,self.sy0,self.ex0,self.ey0, gg.ctx);
        else if(gg.graph.zoom == 1) drawLine(self.sx1,self.sy1,self.ex1,self.ey1, gg.ctx);
        else
        {
          sx = gg.graph.x_for_x(gg.graph.x0_min+gg.graph.x_off);
          ex = gg.graph.x_for_x(lerp(gg.graph.x0_max+gg.graph.x_off,gg.graph.x1_max,gg.graph.zoom));
          sy = gg.graph.y_for_y(self.b_total);
          ey = gg.graph.y_for_y(self.b_total+(self.m_total*(lerp(gg.graph.x0_max+gg.graph.x_off,gg.graph.x1_max,gg.graph.zoom)-gg.graph.x_off)));
          drawLine(sx,sy,ex,ey, gg.ctx);
        }
      }
      gg.ctx.restore();

        //icons
      if(gg.table.data_visible && gg.graph.zoom == 0)
      {
        gg.ctx.fillStyle = white;
        var s = 15;
        for(var i = 0; i <= gg.timeline.t_max; i++)
        {
          if(gg.table.known_data[i] != "-")
          {
            x = gg.graph.off_x_for_x(i);
            y = gg.graph.y_for_y(gg.table.known_data[i]);
            if(gg.table.known_data[i] == gg.table.predicted_data[i]) gg.ctx.drawImage(gg.eq_pt_img,x-s/2,y-s/2,s,s);
            else gg.ctx.drawImage(gg.neq_pt_img,x-s/2,y-s/2,s,s);
          }
        }
      }
    }

    if(gg.cur_level.msg_progress >= 6)
    {
      //eqn
      var yoff = 5;
      var b;
      var total_labels = gg.cur_level.m_label.length+gg.cur_level.b_label.length;
      var mlen = gg.cur_level.m_label.length;

      //eqn strings
      //gg.ctx.font = self.font;
      gg.ctx.font = self.font_h+"px Lato";
      gg.ctx.fillStyle = white;
      gg.ctx.textAlign = "left";
      if(gg.cur_level.special)
      {
        var overwrite = 1;
        for(var i = 0; i < self.eqn_strings.length; i++)
        {
          if(overwrite)
          {
            if(self.eqn_strings[i] == "+")
              gg.ctx.fillText("×",self.eqn_xs[i],self.eqn_y+self.font_h*2);
            else
            {
              if(self.eqn_strings[i] == "×" || self.eqn_strings[i] == ")×") overwrite = 0;
              gg.ctx.fillText(self.eqn_strings[i],self.eqn_xs[i],self.eqn_y+self.font_h*2);
            }
          }
          else
            gg.ctx.fillText(self.eqn_strings[i],self.eqn_xs[i],self.eqn_y+self.font_h*2);
        }
      }
      else
      {
        for(var i = 0; i < self.eqn_strings.length; i++)
          gg.ctx.fillText(self.eqn_strings[i],self.eqn_xs[i],self.eqn_y+self.font_h*2);
      }
      gg.ctx.font = self.label_font;

      if(gg.cur_level.progress < 5 || (!gg.content_dragger.dragging_y && !self.y_set))
        self.y_draw_h = lerp(self.y_draw_h,50,0.1);
      else
        self.y_draw_h = lerp(self.y_draw_h,self.btn_h,0.1);
      gg.ctx.drawImage(gg.variable_bg_img,self.y_x,self.eqn_y+yoff+(self.btn_h-self.y_draw_h)/2,self.btn_w,self.y_draw_h);

      if(gg.cur_level.progress < 5 || (!gg.content_dragger.dragging_x && !self.x_set))
        self.x_draw_h = lerp(self.x_draw_h,50,0.1);
      else
        self.x_draw_h = lerp(self.x_draw_h,self.btn_h,0.1);
      gg.ctx.drawImage(gg.variable_bg_img,self.x_x,self.eqn_y+yoff+(self.btn_h-self.x_draw_h)/2,self.btn_w,self.x_draw_h);

      gg.ctx.textAlign = "center";
      gg.ctx.fillStyle = black;
      if(self.y_set)
      {
      drawImageSizeCentered(gg.cur_level.y_icon, self.y_x+self.btn_w/2, self.eqn_y+self.font_h*2/3+yoff, self.font_h*1.2, gg.ctx);
      gg.ctx.fillText(gg.cur_level.y_label,self.y_x+self.btn_w/2,self.eqn_y+yoff+self.btn_h-pad);
      }
      if(self.x_set)
      {
      drawImageSizeCentered(gg.time_img, self.x_x+self.btn_w/2, self.eqn_y+self.font_h*2/3+yoff, self.font_h*4/5, gg.ctx);
      gg.ctx.fillText(gg.cur_level.x_label,self.x_x+self.btn_w/2,self.eqn_y+yoff+self.btn_h-pad);
      }
      gg.ctx.fillStyle = white;
      //boxes
      for(var i = 0; i < self.m_btn.length; i++)
      {
        b = self.m_btn[i];
        if(gg.cur_level.progress < 6 || (!gg.content_dragger.dragging_label && self.m_label[i] == -1))
          self.m_btn_draw_h[i] = lerp(self.m_btn_draw_h[i],50,0.1);
        else
          self.m_btn_draw_h[i] = lerp(self.m_btn_draw_h[i],b.h,0.1);
        gg.ctx.drawImage(gg.constant_bg_img,b.x,b.y+yoff+(b.h-self.m_btn_draw_h[i])/2,b.w,self.m_btn_draw_h[i]);
      }
      for(var i = 0; i < self.b_btn.length; i++)
      {
        b = self.b_btn[i];
        if(gg.cur_level.progress < 6 || (!gg.content_dragger.dragging_label && self.b_label[i] == -1))
          self.b_btn_draw_h[i] = lerp(self.b_btn_draw_h[i],50,0.1);
        else
          self.b_btn_draw_h[i] = lerp(self.b_btn_draw_h[i],b.h,0.1);
        gg.ctx.drawImage(gg.constant_bg_img,b.x,b.y+yoff+(b.h-self.b_btn_draw_h[i])/2,b.w,self.b_btn_draw_h[i]);
      }

      //selector
      if(gg.cur_level.progress > 7)
      {
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
      }

      //labels
      gg.ctx.fillStyle = white;
      var ind;
      for(var i = 0; i < self.m_btn.length; i++)
      {
        b = self.m_btn[i];
        var x = b.x+b.w/2;
        if(self.m_label[i] > -1)
        {
          if(self.m_label[i] < mlen)
          {
            ind = self.m_label[i];
            drawImageSizeCentered(gg.cur_level.m_icon[ind], x, b.y+yoff+b.h/4, b.h*2/5, gg.ctx);
            for(var j = 0; j < gg.cur_level.m_label_fmt[ind].length; j++)
              gg.ctx.fillText(gg.cur_level.m_label_fmt[ind][gg.cur_level.m_label_fmt[ind].length-1-j],x,b.y+yoff+b.h-pad-self.label_font_h*j);
          }
          else
          {
            ind = self.m_label[i]-mlen;
            drawImageSizeCentered(gg.cur_level.b_icon[ind], x, b.y+yoff+b.h/4, b.h*2/5, gg.ctx);
            for(var j = 0; j < gg.cur_level.b_label_fmt[ind].length; j++)
              gg.ctx.fillText(gg.cur_level.b_label_fmt[ind][gg.cur_level.b_label_fmt[ind].length-1-j],x,b.y+yoff+b.h-pad-self.label_font_h*j);
          }
        }
      }
      for(var i = 0; i < self.b_btn.length; i++)
      {
        b = self.b_btn[i];
        var x = b.x+b.w/2;
        if(self.b_label[i] > -1)
        {
          if(self.b_label[i] < mlen)
          {
            ind = self.b_label[i];
            drawImageSizeCentered(gg.cur_level.m_icon[ind], x, b.y+yoff+b.h/4, b.h*2/5, gg.ctx);
            for(var j = 0; j < gg.cur_level.m_label_fmt[ind].length; j++)
              gg.ctx.fillText(gg.cur_level.m_label_fmt[ind][gg.cur_level.m_label_fmt[ind].length-1-j],x, b.y+yoff+b.h-pad-self.label_font_h*j);
          }
          else
          {
            ind = self.b_label[i]-mlen;
            drawImageSizeCentered(gg.cur_level.b_icon[ind], x, b.y+yoff+b.h/4, b.h*2/5, gg.ctx);
            for(var j = 0; j < gg.cur_level.b_label_fmt[ind].length; j++)
              gg.ctx.fillText(gg.cur_level.b_label_fmt[ind][gg.cur_level.b_label_fmt[ind].length-1-j], x, b.y+yoff+b.h-pad-self.label_font_h*j);
          }
        }
      }

      //value strings
      gg.ctx.textAlign = "center";
      gg.ctx.font = self.number_font;
      if(gg.cur_level.progress > 7)
      {
        gg.ctx.fillStyle = black;
        var v = self.m_total*gg.timeline.t+self.b_total;
             if(v >= 200) gg.ctx.font = self.vsmall_number_font;
        else if(v >= 100) gg.ctx.font = self.small_number_font;
        gg.ctx.fillText(fdisp(v,1),self.y_x+self.btn_w/2,self.eqn_y+self.btn_h/2+self.label_font_h*1.5);
        gg.ctx.font = self.number_font;
        gg.ctx.fillText(fdisp(gg.timeline.t,1),self.x_x+self.btn_w/2,self.eqn_y+self.btn_h/2+self.label_font_h*1.5);
        gg.ctx.fillStyle = white;
        for(var i = 0; i < self.m_btn.length; i++)
        {
          b = self.m_btn[i];
               if(self.m[i] >= 200) gg.ctx.font = self.vsmall_number_font;
          else if(self.m[i] >= 100) gg.ctx.font = self.small_number_font;
          gg.ctx.fillText(self.m[i],b.x+b.w/2,self.eqn_y+b.h/2+self.label_font_h*1.5);
          gg.ctx.font = self.number_font;
        }
        for(var i = 0; i < self.b_btn.length; i++)
        {
          b = self.b_btn[i];
               if(self.b[i] >= 200) gg.ctx.font = self.vsmall_number_font;
          else if(self.b[i] >= 100) gg.ctx.font = self.small_number_font;
          gg.ctx.fillText(self.b[i],b.x+b.w/2,self.eqn_y+b.h/2+self.label_font_h*1.5);
          gg.ctx.font = self.number_font;
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

  self.font_h = 25;
  self.font = self.font_h+"px DisposableDroidBB";

  self.bg_color = "#F1F9EB";
  self.predicted_color = "#94DEE8";
  self.known_color = "#5CC8D9";
  self.text_color = "#4D514B";

  self.known_data = [];
  self.predicted_data = [];
  self.data_visible = 0;
  self.simd_visible = 0;

  self.correct = 0;

  self.yoff = 0;

  self.clear = function()
  {
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
    if(gg.cur_level.special)
    {
      for(var i = 0; i < self.predicted_data.length && i < self.known_data.length; i++)
        if(self.predicted_data[i] < self.known_data[i] && self.known_data[i] != "-") self.correct = 0;
    }
    else
    {
      for(var i = 0; i < self.predicted_data.length && i < self.known_data.length; i++)
        if(self.predicted_data[i] != self.known_data[i] && self.known_data[i] != "-") self.correct = 0;
    }
    if(gg.cur_level.progress == 8 && self.correct && !old_correct)
    {
      gg.message_box.nq_group(gg.cur_level.text.submit);
      if(gg.cur_level.push_work) gg.line.push_day(gg.line.m_total,gg.line.b_total);
      gg.cur_level.progress++;
      gg.stage_t = 0;
    }
  }

  self.tick = function()
  {
    if(gg.timeline.t > self.simd_visible) self.simd_visible = gg.timeline.t;
    if(gg.cur_level.progress < 6 && !gg.content_dragger.dragging_data)
    {
      if(self.yoff < self.h) self.yoff = lerp(self.yoff,self.h,0.1);
      else self.yoff = self.h;
    }
    else
    {
      if(gg.cur_level.special)
      {
        if(self.yoff > 0.01) self.yoff = lerp(self.yoff,42,0.1);
        else self.yoff = 42;
      }
      else
      {
        if(self.yoff > 0.01) self.yoff = lerp(self.yoff,0,0.1);
        else self.yoff = 0;
      }
    }
  }

  self.draw = function()
  {
    //gg.ctx.strokeStyle = red;
    //strokeBox(self,gg.ctx);

    gg.ctx.strokeStyle = self.bg_color;
    gg.ctx.lineWidth = 3;

    var y0 = self.y+self.yoff;
    var y1 = self.y+self.h/3+self.yoff;
    var y2 = self.y+self.h*2/3+self.yoff;
    var y3 = self.y+self.h+self.yoff;
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
      if(i < 2)
        drawLine(x,y1,x,y3,gg.ctx);
      if(i == 2)
      {
        drawLine(x-1,y1,x-1,y3,gg.ctx);
        drawLine(x+1,y1,x+1,y3,gg.ctx);
      }
      else
        drawLine(x,y1,x,y2,gg.ctx);
      x -= w/2;
      gg.ctx.fillStyle = black;
      if(!(i == gg.timeline.t_max && gg.timeline.t == gg.timeline.t_max && self.correct && gg.cur_level.progress > 7))
        gg.ctx.fillText(i,x,y01+self.font_h/2);
      if(self.simd_visible >= i)
      {
        if(gg.cur_level.progress >= 8 && self.data_visible && !gg.cur_level.perma_zoom)
        {
          if(self.known_data[i] == self.predicted_data[i])
            gg.ctx.drawImage(gg.eq_img,x-10,y2-10,20,20);
          else if(self.known_data[i] != "-")
            gg.ctx.drawImage(gg.neq_img,x-10,y2-10,20,20);
        }
        if(gg.cur_level.progress < 8)
          gg.ctx.fillText("-",x,y12+self.font_h/3);
        else
          gg.ctx.fillText(self.predicted_data[i],x,y12+self.font_h/3);
      }
      else gg.ctx.fillText("-",x,y12+self.font_h/3);

      if(i < 3)
      {
        gg.ctx.fillStyle = white;
        if(self.data_visible) gg.ctx.fillText(self.known_data[i],x,y23+self.font_h/2);
        else gg.ctx.fillText("-",x,y23+self.font_h/2);
      }

    }
    if(gg.timeline.t == gg.timeline.t_max && self.correct && gg.cur_level.progress > 7)
    {
      var t_x = mapVal(0,gg.timeline.t_max,gg.timeline.sx,gg.timeline.ex,gg.timeline.t);
      var s = 40;
      var syoff = 0;
      if(gg.timeline.t_correct < 100)
        syoff = abs(sin(gg.timeline.t_correct/10))*(1-(gg.timeline.t_correct/100))*20;
      gg.ctx.drawImage(gg.submit_img,t_x-s/2,gg.timeline.y+15+self.yoff-s/2-syoff,s,gg.timeline.h-15);
      gg.ctx.textAlign = "center";
      gg.ctx.font = "16px DisposableDroidBB";
      gg.ctx.fillText("Modeled",t_x,gg.timeline.y+15+s/2+self.yoff);
      gg.ctx.fillText("Data",t_x,gg.timeline.y+15+s/2+10+self.yoff);
      gg.ctx.font = self.font;
    }
    if(gg.timeline.t == gg.timeline.t_max && self.correct && !gg.cur_level.correct && !gg.timeline.fast_sim && !gg.content_dragger.dragging_sim)
    {
      var s = 20;
      gg.ctx.drawImage(gg.notice_img,x+w/2-s,y1-3*s,s,s);
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
  self.data_text_color = self.ai_text_color;//"#FF6666";
  self.bg_color = "#F1F9EB";

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
      else if(self.types[i] == CONTENT_LABEL)
        self.max_top_y -= self.font_h*3-self.pad;
      else if(self.types[i] == CONTENT_CONSTANT)
        self.max_top_y -= self.font_h*4-self.pad;
      else //CONTENT_PLAYER || CONTENT_AI
      {
        for(var j = 0; j < self.bubbles[i].length; j++)
          self.max_top_y -= self.font_h;
        self.max_top_y -= self.pad*2;
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
    if(self.types[self.displayed_i] == CONTENT_AI && gg.sound && !gg.skipping)
    {
           if(gg.monitor.mode == 0) gg.audwrangler.play(gg.voices.clean[randIntBelow(gg.voices.clean.length)]);
      else if(gg.monitor.mode == 1) gg.audwrangler.play(gg.voices.angry[randIntBelow(gg.voices.angry.length)]);
      else                          gg.audwrangler.play(gg.voices.glitchy[randIntBelow(gg.voices.glitchy.length)]);
    }
    self.displayed_i++;
    self.calculate_top();
    if(self.types[self.displayed_i-1] != CONTENT_PLAYER)
      gg.monitor.talk_t = 0;
    if(self.displayed_i == self.texts.length) gg.cur_level.msg_progress = gg.cur_level.progress;

  }

  self.click = function(evt)
  {
    if(self.prompt_end && self.displayed_i == self.texts.length)// && ptWithin(self.monitor_x,self.monitor_y,self.monitor_w,self.monitor_h,evt.doX,evt.doY))
    {
      self.requested_end = 1;
      return 1;
    }
    if(self.displayed_i < self.texts.length)
    {
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
      else //CONTENT_AI || CONTENT_DATA || CONTENT_LABEL || CONTENT_CONSTANT || CONTENT_SIM (but not actually CONTENT_SIM)
      {
        if(self.triggers[self.displayed_i].type == TRIGGER_CLICK)
          ; //odd
        else if(self.triggers[self.displayed_i].type == TRIGGER_TIMER)
          self.prompt_ai_typing = 1;
      }
    }
    else if(self.displayed_i == self.texts.length) self.prompt_end = 1;

    if(old_prompt_ai_typing != self.prompt_ai_typing)
    {
      self.calculate_top();
    }
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

      if(self.types[i] == CONTENT_PLAYER)
      {
        gg.ctx.fillStyle = self.you_text_color;
        gg.ctx.fillRect(self.x+self.pad*2,y,self.bubble_w,self.pad*2+self.font_h*self.bubbles[i].length);
        gg.ctx.strokeRect(self.x+self.pad*2,y,self.bubble_w,self.pad*2+self.font_h*self.bubbles[i].length);
        gg.ctx.beginPath();
        gg.ctx.moveTo(self.x+self.pad*2+self.bubble_w-self.pad,y+self.pad*2+self.font_h*self.bubbles[i].length         -1);
        gg.ctx.lineTo(self.x+self.pad*2+self.bubble_w         ,y+self.pad*2+self.font_h*self.bubbles[i].length+self.pad-1);
        gg.ctx.lineTo(self.x+self.pad*2+self.bubble_w         ,y+self.pad*2+self.font_h*self.bubbles[i].length         -1);
        gg.ctx.fill();
        gg.ctx.stroke();

        gg.ctx.fillStyle = self.ai_text_color;
        gg.ctx.textAlign = "right";
        y += self.pad;
        for(var j = 0; j < self.bubbles[i].length; j++)
        {
          gg.ctx.fillText(self.bubbles[i][j], self.x+self.w-self.pad*2, y+self.font_h-self.pad/2);
          y += self.font_h;
        }
        y += self.pad*2;
      }
      else if(self.types[i] == CONTENT_AI)
      {
        gg.ctx.fillStyle = self.ai_text_color;
        gg.ctx.fillRect(self.x+self.pad,  y,self.bubble_w,self.pad*2+self.font_h*self.bubbles[i].length);
        gg.ctx.strokeRect(self.x+self.pad,  y,self.bubble_w,self.pad*2+self.font_h*self.bubbles[i].length);
        gg.ctx.beginPath();
        gg.ctx.moveTo(self.x+self.pad         ,y+self.pad*2+self.font_h*self.bubbles[i].length         -1);
        gg.ctx.lineTo(self.x+self.pad         ,y+self.pad*2+self.font_h*self.bubbles[i].length+self.pad-1);
        gg.ctx.lineTo(self.x+self.pad+self.pad,y+self.pad*2+self.font_h*self.bubbles[i].length         -1);
        gg.ctx.fill();
        gg.ctx.beginPath();
        gg.ctx.moveTo(self.x+self.pad         ,y+self.pad*2+self.font_h*self.bubbles[i].length         -1);
        gg.ctx.lineTo(self.x+self.pad         ,y+self.pad*2+self.font_h*self.bubbles[i].length+self.pad-1);
        gg.ctx.lineTo(self.x+self.pad+self.pad,y+self.pad*2+self.font_h*self.bubbles[i].length           );
        gg.ctx.stroke();

        gg.ctx.fillStyle = self.you_text_color;
        gg.ctx.textAlign = "left";
        y += self.pad;
        for(var j = 0; j < self.bubbles[i].length; j++)
        {
          gg.ctx.fillText(self.bubbles[i][j], self.x+self.pad*2, y+self.font_h-self.pad/2);
          y += self.font_h;
        }
        y += self.pad*2;
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

        y += self.pad;
        gg.ctx.textAlign = "left";
        gg.ctx.fillStyle = self.data_text_color;
        gg.ctx.fillText(self.bubbles[i][0],self.x+self.pad*2,y+self.font_h);
        y += self.font_h+self.pad;
      }
      else if(self.types[i] == CONTENT_LABEL)
      {
        var icon = 0;
        var label = 0;
        for(var j = 0; j < gg.cur_level.m_label.length; j++)
          if(self.bubbles[i][0] == gg.cur_level.m_label[j]) { icon = gg.cur_level.m_icon[j]; label = gg.cur_level.m_label_fmt[j]; break; }
        if(!icon)
        {
          for(var j = 0; j < gg.cur_level.b_label.length; j++)
            if(self.bubbles[i][0] == gg.cur_level.b_label[j]) { icon = gg.cur_level.b_icon[j]; label = gg.cur_level.b_label_fmt[j]; break; }
        }
        var h = self.font_h*3;
        gg.ctx.drawImage(gg.chat_constant_bg_img, self.x+self.pad, y, self.bubble_w, h);
        drawImageSizeCentered(icon, self.x+self.pad*3+h/2, y+h/2, h*0.8, gg.ctx);

        gg.ctx.textAlign = "left";
        gg.ctx.fillStyle = self.data_text_color;
        for(var j = 0; j < label.length; j++)
          gg.ctx.fillText(label[j],self.x+self.pad+self.bubble_w/2,y+self.pad+self.font_h+self.font_h*j);
        y += self.font_h*3;
      }
      else if(self.types[i] == CONTENT_CONSTANT)
      {
        var icon = 0;
        var c;
        for(var j = 0; j < gg.cur_level.m_label.length; j++)
          if(self.bubbles[i][0] == gg.cur_level.m_label[j]) { icon = gg.cur_level.m_icon[j]; c = gg.cur_level.m_correct[j]; break; }
        if(!icon)
        {
          for(var j = 0; j < gg.cur_level.b_label.length; j++)
            if(self.bubbles[i][0] == gg.cur_level.b_label[j]) { icon = gg.cur_level.b_icon[j]; c = gg.cur_level.b_correct[j]; break; }
        }
        var h = self.font_h*4;
        gg.ctx.drawImage(gg.chat_constant_bg_img, self.x+self.pad, y, self.bubble_w, h);
        drawImageSizeCentered(icon, self.x+self.pad*3+h/2, y+self.font_h+self.font_h*3/2, h*0.6, gg.ctx);

        gg.ctx.textAlign = "center";
        gg.ctx.fillStyle = self.data_text_color;
        gg.ctx.fillText(self.bubbles[i][0],self.x+self.pad+self.bubble_w/2,y+self.font_h);
        gg.ctx.font = "60px DisposableDroidBB";
             if(c >= 200) gg.ctx.font = "30px DisposableDroidBB";
        else if(c >= 100) gg.ctx.font = "40px DisposableDroidBB";
        gg.ctx.fillText(c,self.x+self.pad+self.bubble_w*3/4,y+self.pad+self.font_h*3);
        gg.ctx.font = self.font;
        y += self.font_h*4;
      }
      else if(self.types[i] == CONTENT_SIM)
      {
        gg.ctx.drawImage(gg.submit_img,self.x+self.pad+self.bubble_w/2-30, y+(self.pad+self.font_h+self.pad)/2-30, 60, 60);

        y += self.pad;
        gg.ctx.textAlign = "left";
        gg.ctx.fillStyle = self.data_text_color;
        //gg.ctx.fillText(self.bubbles[i][0],self.x+self.pad*2,y+self.font_h);
        gg.ctx.fillText("Modeled",self.x+self.pad*2,y+self.font_h*0.5);
        gg.ctx.fillText("Data:",  self.x+self.pad*2,y+self.font_h*1.5);
        y += self.font_h+self.pad;
      }

      y += self.pad;
    }
    gg.ctx.textAlign = "left";

    //"ai typing"
    if(self.prompt_ai_typing)
    {
      gg.ctx.fillStyle = self.data_text_color;
      switch(floor(self.advance_t/20)%3)
      {
        case 0: gg.ctx.fillText("typing.",self.x+self.pad*2,y+self.font_h/2); break;
        case 1: gg.ctx.fillText("typing..",self.x+self.pad*2,y+self.font_h/2); break;
        case 2: gg.ctx.fillText("typing...",self.x+self.pad*2,y+self.font_h/2); break;
      }
    }

    //"input" box
    gg.ctx.fillStyle = self.bg_color;
    gg.ctx.fillRect(self.x,self.input_y-self.pad+1,self.w,self.h);

    if(gg.content_dragger.dragging_sim)
      gg.ctx.drawImage(gg.drop_data_img,self.input_x,self.input_y,self.input_w,self.input_h);
    else
    {
      if(self.prompt_end)
      {
        gg.ctx.drawImage(gg.return_button_img,self.input_x,self.input_y,self.input_w,self.input_h);
      }
      else if(self.prompt_player_input)
      {
        var s = 20;
        gg.ctx.drawImage(gg.reply_button_img,self.input_x,self.input_y,self.input_w,self.input_h);
        gg.ctx.drawImage(gg.notice_img,self.input_x+self.input_w-s,self.input_y,s,s);
      }
      else
      {
        gg.ctx.globalAlpha = 0.4;
        gg.ctx.drawImage(gg.reply_button_img,self.input_x,self.input_y,self.input_w,self.input_h);
        gg.ctx.globalAlpha = 1;
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
      //gg.ctx.drawImage(gg.notice_img,self.monitor_x+self.monitor_w-s,self.monitor_y+s,s,s); //was told to remove
    }
    var h = gg.neck_heart_img.height/gg.neck_heart_img.width*self.monitor_w;
    gg.ctx.drawImage(gg.neck_heart_img,self.monitor_x,self.monitor_y+self.monitor_h-h/2,self.monitor_w,h);
  }

}

