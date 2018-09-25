var editable_line = function()
{
  var self = this;
  self.w = 0;
  self.h = 0;
  self.x = 0;
  self.y = 0;

  self.m = 0;
  self.b = 0;
  self.h_min = 0;
  self.h_max = 0;
  self.v_min = 0;
  self.v_max = 0;

  self.m_btn = new NumberBox(0,0,0,0,0,0.01,function(v){ v = fdisp(v,1); self.m = v; self.draw_params(); });
  self.b_btn = new NumberBox(0,0,0,0,0,0.01,function(v){ v = fdisp(v,1); self.b = v; self.draw_params(); });

  self.table = new table();
  self.table.n = 5;
  for(var i = 0; i < self.table.n; i++)
  {
    self.table.t_data[i] = i;
    if(i < 3) self.table.known_data[i] = 2*i+5;
    else      self.table.known_data[i] = "-";
    self.table.predicted_data[i] = 0;
  }

  self.size = function()
  {
    var btn_s = 20;
    self.m_btn.w = btn_s+4;
    self.m_btn.h = btn_s;
    self.m_btn.x = self.x+18;
    self.m_btn.y = self.y+self.h+5;

    self.b_btn.w = btn_s+4;
    self.b_btn.h = btn_s;
    self.b_btn.x = self.x+58;
    self.b_btn.y = self.y+self.h+5;

    self.table.w = 100;
    self.table.h = self.h;
    self.table.x = self.x+self.w+10;
    self.table.y = self.y;

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

    self.sy = mapVal(self.v_min, self.v_max, self.y+self.h, self.y, self.sy);
    self.ey = mapVal(self.v_min, self.v_max, self.y+self.h, self.y, self.ey);
    self.sx = mapVal(self.h_min, self.h_max, self.x, self.x+self.w, self.sx);
    self.ex = mapVal(self.h_min, self.h_max, self.x, self.x+self.w, self.ex);

    for(var i = 0; i < self.table.n; i++)
      self.table.predicted_data[i] = fdisp(self.v(self.table.t_data[i]),1);
  }

  self.filter = function(keyer,blurer,dragger)
  {
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
      var check = 1;
      if(check) check = !dragger.filter(self.m_btn);
      if(check) check = !dragger.filter(self.b_btn);
      return !check;
    }
    return 0;
  }

  self.tick = function()
  {

  }

  self.draw = function()
  {
    var x;
    var y;

    gg.ctx.strokeStyle = black;
    gg.ctx.fillStyle = black;
    gg.ctx.font = "12px Helvetica";

    strokeBox(self,gg.ctx);
    drawLine(self.sx,self.sy,self.ex,self.ey, gg.ctx);

    gg.ctx.textAlign = "left";
    x = self.x;
    y = self.y+self.h+20;
    gg.ctx.fillText("y = ",x,y);
    x += 20;
    gg.ctx.fillText(self.m,x,y);
    x += 24;
    gg.ctx.fillText("x+",x,y);
    x += 17;
    gg.ctx.fillText(self.b,x,y);

    strokeBox(self.m_btn,gg.ctx);
    strokeBox(self.b_btn,gg.ctx);

    self.table.draw();

    gg.ctx.fillStyle = red;
    for(var i = 0; i < self.table.n; i++)
    {
      if(self.table.known_data[i] != "-")
      {
        x = mapVal(self.h_min,self.h_max,self.x,self.x+self.w,self.table.t_data[i]);
        y = mapVal(self.v_min,self.v_max,self.y+self.h,self.y,self.table.known_data[i]);
        x = clamp(self.x,self.x+self.w,x);
        y = clamp(self.y,self.y+self.h,y);
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

  self.a = 0;
  self.b = 0;
  self.c = 0;
  self.h_min = 0;
  self.h_max = 0;
  self.v_min = 0;
  self.v_max = 0;
  self.samples = 100;

  self.a_btn = new NumberBox(0,0,0,0,0,0.01,function(v){ v = fdisp(v,1); self.a = v; self.draw_params(); });
  self.b_btn = new NumberBox(0,0,0,0,0,0.01,function(v){ v = fdisp(v,1); self.b = v; self.draw_params(); });
  self.c_btn = new NumberBox(0,0,0,0,0,0.01,function(v){ v = fdisp(v,1); self.c = v; self.draw_params(); });
  self.table = new table();
  self.table.n = 5;
  for(var i = 0; i < self.table.n; i++)
  {
    self.table.t_data[i] = i;
    if(i < 3) self.table.known_data[i] = 0.1*i*i + 0.2*i + 3;
    else      self.table.known_data[i] = "-";
    self.table.predicted_data[i] = 0;
  }

  self.size = function()
  {
    var btn_s = 20;
    self.a_btn.w = btn_s+4;
    self.a_btn.h = btn_s;
    self.a_btn.x = self.x+18;
    self.a_btn.y = self.y+self.h+5;

    self.b_btn.w = btn_s+4;
    self.b_btn.h = btn_s;
    self.b_btn.x = self.x+63;
    self.b_btn.y = self.y+self.h+5;

    self.c_btn.w = btn_s+4;
    self.c_btn.h = btn_s;
    self.c_btn.x = self.x+104;
    self.c_btn.y = self.y+self.h+5;

    self.table.w = 100;
    self.table.h = self.h;
    self.table.x = self.x+self.w+10;
    self.table.y = self.y;

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
      self.xpts[i] = mapVal(self.h_min, self.h_max, self.x, self.x+self.w, x);
      self.ypts[i] = clamp(self.y, self.y+self.h, mapVal(self.v_min, self.v_max, self.y+self.h, self.y, y)); //map then clamp separate because y flipped
    }

    for(var i = 0; i < self.table.n; i++)
      self.table.predicted_data[i] = fdisp(self.v(self.table.t_data[i]),1);
  }

  self.filter = function(keyer,blurer,dragger)
  {
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
      var check = 1;
      if(check) check = !dragger.filter(self.a_btn);
      if(check) check = !dragger.filter(self.b_btn);
      if(check) check = !dragger.filter(self.c_btn);
      return !check;
    }
    return 0;
  }

  self.tick = function()
  {

  }

  self.draw = function()
  {
    var x;
    var y;

    gg.ctx.strokeStyle = black;
    gg.ctx.fillStyle = black;
    gg.ctx.font = "12px Helvetica";

    strokeBox(self,gg.ctx);
    gg.ctx.beginPath();
    gg.ctx.moveTo(self.xpts[0],self.ypts[0]);
    for(var i = 0; i < self.samples; i++)
      gg.ctx.lineTo(self.xpts[i],self.ypts[i]);
    gg.ctx.stroke();

    gg.ctx.textAlign = "left";
    x = self.x;
    y = self.y+self.h+20;
    gg.ctx.fillText("y = ",x,y);
    x += 20;
    gg.ctx.fillText(self.a,x,y);
    x += 24;
    gg.ctx.fillText("x²+",x,y);
    x += 20;
    gg.ctx.fillText(self.b,x,y);
    x += 25;
    gg.ctx.fillText("x+",x,y);
    x += 17;
    gg.ctx.fillText(self.c,x,y);

    strokeBox(self.a_btn,gg.ctx);
    strokeBox(self.b_btn,gg.ctx);
    strokeBox(self.c_btn,gg.ctx);

    self.table.draw();

    gg.ctx.fillStyle = red;
    for(var i = 0; i < self.table.n; i++)
    {
      if(self.table.known_data[i] != "-")
      {
        x = mapVal(self.h_min,self.h_max,self.x,self.x+self.w,self.table.t_data[i]);
        y = mapVal(self.v_min,self.v_max,self.y+self.h,self.y,self.table.known_data[i]);
        x = clamp(self.x,self.x+self.w,x);
        y = clamp(self.y,self.y+self.h,y);
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

  self.n = 0;
  self.t_data = [];
  self.known_data = [];
  self.predicted_data = [];

  self.tick = function()
  {

  }

  self.draw = function()
  {
    strokeBox(self,gg.ctx);
    var x0 = self.x;
    var x1 = self.x+self.w/3;
    var x2 = self.x+self.w*2/3;
    var x3 = self.x+self.w;
    var x01 = lerp(x0,x1,0.5);
    var x12 = lerp(x1,x2,0.5);
    var x23 = lerp(x2,x3,0.5);
    drawLine(x1,self.y,x1,self.y+self.h,gg.ctx);
    drawLine(x2,self.y,x2,self.y+self.h,gg.ctx);
    var y = self.y;
    gg.ctx.textAlign = "center";
    for(var i = 0; i < self.n; i++)
    {
      y = self.y+((i+1)/self.n)*self.h;
      gg.ctx.fillText(self.t_data[i],        x01,y-3);
      gg.ctx.fillStyle = red;
      gg.ctx.fillText(self.known_data[i],    x12,y-3);
      gg.ctx.fillStyle = black;
      gg.ctx.fillText(self.predicted_data[i],x23,y-3);
      drawLine(x0,y,x3,y,gg.ctx);
    }
  }

}

var dialog_box = function()
{
  var self = this;
  self.w = 0;
  self.h = 0;
  self.x = 0;
  self.y = 0;

  self.pad = 10;
  self.font_h = 15;
  self.font = self.font_h+"px Helvetica";

  self.text = [];
  self.lines = [];
  self.nq = function(text)
  {
    self.text.push(text);
    self.lines.push(textToLines(self.font,self.w-self.pad-(self.h-self.pad*2)-self.pad-self.pad,text,gg.ctx));
  }

  self.click = function()
  {
    if(self.text.length > 1)
    {
      self.text.splice(0,1);
      self.lines.splice(0,1);
    }
  }

  self.tick = function()
  {

  }

  self.draw = function()
  {
    strokeBox(self,gg.ctx);
    gg.ctx.strokeRect(self.x+self.pad,self.y+self.pad,self.h-self.pad*2,self.h-self.pad*2);

    if(!self.text.length) return;
    gg.ctx.fillStyle = black;
    gg.ctx.textAlign = "left";
    gg.ctx.font = self.font;
    var x = self.x+self.pad+(self.h-self.pad*2)+self.pad;
    var y = self.y+self.font_h+self.pad;
    for(var i = 0; i < self.lines[0].length; i++)
    {
      gg.ctx.fillText(self.lines[0][i],x,y);
      y += self.font_h;
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

  self.v_btn = new NumberBox(0,0,0,0,0,0.01,function(v){ v = fdisp(v,1); self.v[0] = v; gg.module_board.calculate(); });

  self.v = [];
  self.v_min = 0;
  self.v_max = 0;

  self.size = function()
  {
    self.v_btn.w = self.w/2;
    self.v_btn.h = self.h/2;
    self.v_btn.x = self.x+self.w/2-self.v_btn.w/2;
    self.v_btn.y = self.y+self.h-self.v_btn.h;
  }

  self.dragging_body = 0;
  self.dragging_rel = 0;
  self.drag_x = 0;
  self.drag_y = 0;
  self.dragStart = function(evt)
  {
    if(ptWithin(self.x+self.w*0.9,self.y+self.h*0.45,self.w*0.1,self.h*0.1,evt.doX,evt.doY))
    {
      self.dragging_rel = 1;
      self.drag(evt);
      return 1;
    }
    else
    {
      self.dragging_body = 1;
      self.drag_x = evt.doX-self.x;
      self.drag_y = evt.doY-self.y;
      self.drag(evt);
      return 1;
    }
    return 0;
  }
  self.drag = function(evt)
  {
    if(self.dragging_body)
    {
      self.x = evt.doX-self.drag_x;
      self.y = evt.doY-self.drag_y;
      worldSpaceCoords(gg.module_board,gg.canv,self);
      self.size();
    }
    else if(self.dragging_rel)
    {
      self.drag_x = evt.doX;
      self.drag_y = evt.doY;
    }
  }
  self.dragFinish = function(evt)
  {
    if(self.dragging_rel)
    {
      var m;
      for(var i = 0; i < gg.module_board.modules.length; i++)
      {
        m = gg.module_board.modules[i];
        if(ptWithinBox(m,self.drag_x,self.drag_y))
        {
          var r = gg.module_board.gen_modrel();
          r.wx = lerp(self.wx,m.wx,0.5);
          r.wy = lerp(self.wy,m.wy,0.5);
          screenSpace(gg.module_board,gg.canv,r);
          r.src = self;
          r.dst = m;
          gg.module_board.calculate();
          break;
        }
      }
    }
    self.dragging_body = 0;
    self.dragging_rel = 0;
  }

  self.tick = function()
  {

  }

  self.draw = function()
  {
    var x;
    var y;
    gg.ctx.strokeStyle = light_gray;
    gg.ctx.beginPath();
    x = self.x;
    y = mapVal(self.v_min, self.v_max, self.y+self.h, self.y, self.v[0]);
    gg.ctx.moveTo(x,y);
    for(var i = 1; i < gg.module_board.t_max; i++)
    {
      x = self.x+(i/(gg.module_board.t_max-1))*self.w;
      y = mapVal(self.v_min, self.v_max, self.y+self.h, self.y, self.v[i]);
      gg.ctx.lineTo(x,y);
    }
    gg.ctx.stroke();
    var t_x = mapVal(0,gg.module_board.t_max,self.x,self.x+self.w,gg.module_board.t);
    drawLine(t_x,self.y,t_x,self.y+self.h,gg.ctx);
    gg.ctx.strokeStyle = black;
    strokeBox(self,gg.ctx);
    gg.ctx.fillText(self.v[0],self.x+self.w/2,self.y+self.h-1);
    gg.ctx.fillStyle = gray;
    if(floor(gg.module_board.t) != 0) gg.ctx.fillText(self.v[floor(gg.module_board.t)],self.x+self.w/2,self.y+self.h*2/3);
    gg.ctx.fillStyle = black;
    if(self.dragging_rel)
      drawLine(self.x+self.w,self.y+self.h/2,self.drag_x,self.drag_y,gg.ctx);
  }
}

var modrel = function()
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

  self.v_btn = new NumberBox(0,0,0,0,0,0.01,function(v){ v = fdisp(v,1); self.v = v; gg.module_board.calculate(); });

  self.v = 1;
  self.src = 0;
  self.dst = 0;

  self.size = function()
  {
    self.v_btn.w = self.w/2;
    self.v_btn.h = self.h/2;
    self.v_btn.x = self.x+self.w/2-self.v_btn.w/2;
    self.v_btn.y = self.y+self.h/2-self.v_btn.h/2;
  }

  self.dragging_body = 0;
  self.dragging_src = 0;
  self.dragging_dst = 0;
  self.drag_x = 0;
  self.drag_y = 0;
  self.dragStart = function(evt)
  {
    if(ptWithin(self.x+self.w*0.9,self.y+self.h*0.45,self.w*0.1,self.h*0.1,evt.doX,evt.doY))
    {
      self.dragging_dst = 1;
      self.drag(evt);
      return 1;
    }
    else if(ptWithin(self.x,self.y+self.h*0.45,self.w*0.1,self.h*0.1,evt.doX,evt.doY))
    {
      self.dragging_src = 1;
      self.drag(evt);
      return 1;
    }
    else
    {
      self.dragging_body = 1;
      self.drag_x = evt.doX-self.x;
      self.drag_y = evt.doY-self.y;
      self.drag(evt);
      return 1;
    }
    return 0;
  }
  self.drag = function(evt)
  {
    if(self.dragging_body)
    {
      self.x = evt.doX-self.drag_x;
      self.y = evt.doY-self.drag_y;
      worldSpaceCoords(gg.module_board,gg.canv,self);
      self.size();
    }
    else if(self.dragging_src || self.dragging_dst)
    {
      self.drag_x = evt.doX;
      self.drag_y = evt.doY;
    }
  }
  self.dragFinish = function(evt)
  {
    if(self.dragging_src || self.dragging_dst)
    {
      var m;
      for(var i = 0; i < gg.module_board.modules.length; i++)
      {
        m = gg.module_board.modules[i];
        if(ptWithinBox(m,self.drag_x,self.drag_y))
        {
               if(self.dragging_src) self.src = m;
          else if(self.dragging_dst) self.dst = m;
          gg.module_board.calculate();
          break;
        }
      }
    }
    self.dragging_body = 0;
    self.dragging_src = 0;
    self.dragging_dst = 0;
  }

  self.tick = function()
  {
  }

  self.draw = function()
  {
    strokeBox(self,gg.ctx);
    gg.ctx.fillText(self.v,self.x+self.w/2,self.y+self.h*2/3);
    if(self.dragging_src)
      drawLine(self.x,self.y+self.h/2,self.drag_x,self.drag_y,gg.ctx);
    else if(self.dragging_dst)
      drawLine(self.x+self.w,self.y+self.h/2,self.drag_x,self.drag_y,gg.ctx);
    if(self.src && !self.dragging_src)
      drawLine(self.x,self.y+self.h/2,self.src.x+self.src.w,self.src.y+self.src.h/2,gg.ctx);
    if(self.dst && !self.dragging_dst)
      drawLine(self.x+self.w,self.y+self.h/2,self.dst.x,self.dst.y+self.dst.h/2,gg.ctx);
    var t = gg.module_board.t;
    var td = t%1;
    if(td != 0)
    {
      t = round(t-td);
      td *= 2;
      var x;
      var y;
      var s = 20;
      if(self.src && td < 1)
      {
        x = lerp(self.src.x+self.src.w,self.x,td);
        y = lerp(self.src.y+self.src.h/2,self.y+self.h/2,td);
        gg.ctx.fillStyle = white;
        gg.ctx.fillRect(x-s/2,y-s/2,s,s);
        gg.ctx.fillStyle = black;
        gg.ctx.fillText(self.src.v[t],x,y+s/2);
      }
      if(self.dst && td > 1)
      {
        td -= 1;
        x = lerp(self.x+self.w,self.dst.x,td);
        y = lerp(self.y+self.h/2,self.dst.y+self.dst.h/2,td);
        gg.ctx.fillStyle = white;
        gg.ctx.fillRect(x-s/2,y-s/2,s,s);
        gg.ctx.fillStyle = black;
        gg.ctx.fillText(self.src.v[t]*self.v,x,y+s/2);
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

  self.t = 0;
  self.t_target = 0;
  self.t_max = 10;
  self.selected_module = 0;
  self.modules = [];
  self.modrels = [];

  self.graph = {x:0,y:0,w:0,h:0};

  self.timeline = {x:0,y:0,w:0,h:0,
  dragStart:function(evt)
  {
    self.timeline.drag(evt);
  },
  drag:function(evt)
  {
    var t = clampMapVal(self.timeline.x,self.timeline.x+self.timeline.w,0,self.t_max,evt.doX);
    self.t_target = ceil(t);
    self.t = t;
  },dragFinish:function(evt){}};

  self.advance_btn = {x:0,y:0,w:0,h:0,dragStart:function(evt){
    self.t_target++;
    if(self.t_target > self.t_max) self.t_target = self.t_max;
  },drag:function(evt){},dragFinish:function(evt){}};

  self.table = new table();
  self.table.n = 5;
  for(var i = 0; i < self.table.n; i++)
  {
    self.table.t_data[i] = i;
    if(i < 3) self.table.known_data[i] = 2*i+5;
    else      self.table.known_data[i] = "-";
    self.table.predicted_data[i] = 0;
  }
  self.table_module = 0;

  self.new_module_btn = {x:0,y:0,w:0,h:0,dragStart:function(evt){
    var m = self.gen_module();
    m.x = evt.doX-m.w/2;
    m.y = evt.doY-m.h/2;
    worldSpace(self,gg.canv,m);
    if(m.dragStart(evt)) m.dragging = 1;
    self.new_module_btn.dragging = 0;
    gg.module_board.calculate();
    return 0;
  },drag:function(evt){},dragFinish:function(evt){}};

  self.size = function()
  {
    self.graph.w = 100;
    self.graph.h = 100;
    self.graph.x = self.x+10;
    self.graph.y = self.y+300;

    self.timeline.w = self.w;
    self.timeline.h = 30;
    self.timeline.x = 0;
    self.timeline.y = self.h-self.timeline.h;

    self.table.w = 100;
    self.table.h = 100;
    self.table.x = self.graph.x+self.graph.w+10;
    self.table.y = self.graph.y;

    self.advance_btn.w = 50;
    self.advance_btn.h = 50;
    self.advance_btn.x = self.x+10;
    self.advance_btn.y = self.timeline.y-10-self.advance_btn.h;

    self.new_module_btn.w = 50;
    self.new_module_btn.h = 50;
    self.new_module_btn.x = self.x+self.w-10-self.new_module_btn.w;
    self.new_module_btn.y = self.timeline.y-10-self.new_module_btn.h;
  }

  self.gen_module = function()
  {
    var m = new module();
    m.wx = 0;
    m.wy = 0;
    m.ww = 50;
    m.wh = 50;
    for(var i = 0; i < self.t_max; i++)
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
    m.wx = 0;
    m.wy = 0;
    m.ww = 20;
    m.wh = 20;
    m.v = 1;
    m.v_btn.set(m.v);
    screenSpace(self,gg.canv,m);
    self.modrels.push(m);
    return m;
  }

  self.calculate = function()
  {
    for(var i = 1; i <= self.t_max; i++)
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
        if(m.src && m.dst) m.dst.v[i] += m.src.v[i-1]*m.v;
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
      for(var j = 0; j <= self.t_max; j++)
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
  }

  self.filter = function(keyer, blurer, dragger)
  {
    var check = 1;
    for(var i = 0; i < self.modules.length; i++)
      keyer.filter(self.modules[i].v_btn);
    for(var i = 0; i < self.modules.length; i++)
      blurer.filter(self.modules[i].v_btn);
    for(var i = 0; check && i < self.modules.length; i++)
      check = !dragger.filter(self.modules[i].v_btn);
    for(var i = 0; check && i < self.modules.length; i++)
      check = !dragger.filter(self.modules[i]);
    for(var i = 0; i < self.modrels.length; i++)
      keyer.filter(self.modrels[i].v_btn);
    for(var i = 0; i < self.modrels.length; i++)
      blurer.filter(self.modrels[i].v_btn);
    for(var i = 0; check && i < self.modrels.length; i++)
      check = !dragger.filter(self.modrels[i].v_btn);
    for(var i = 0; check && i < self.modrels.length; i++)
      check = !dragger.filter(self.modrels[i]);
    if(check) check = !dragger.filter(self.new_module_btn);
    if(check) check = !dragger.filter(self.advance_btn);
    if(check) check = !dragger.filter(self.timeline);
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
    for(var i = 0; i < self.modrels.length; i++)
    {
      m = self.modrels[i];
      screenSpaceCoords(self,gg.canv,m);
      m.tick();
    }
    if(self.t < self.t_target && !self.timeline.dragging) self.t += 0.01;
    if(self.t > self.t_target) self.t = self.t_target;
  }

  self.draw = function()
  {
    gg.ctx.textAlign = "center";
    for(var i = 0; i < self.modules.length; i++)
      self.modules[i].draw();
    for(var i = 0; i < self.modrels.length; i++)
      self.modrels[i].draw();
    strokeBox(self.new_module_btn,gg.ctx);

    strokeBox(self.graph,gg.ctx);
    strokeBox(self.timeline,gg.ctx);
    var t_x;
    gg.ctx.strokeStyle = gray;
    gg.ctx.beginPath();
    for(var i = 1; i < self.t_max; i++)
    {
      t_x = mapVal(0,self.t_max,self.timeline.x,self.timeline.x+self.timeline.w,i);
      gg.ctx.moveTo(t_x,self.timeline.y);
      gg.ctx.lineTo(t_x,self.timeline.y+self.timeline.h);
    }
    gg.ctx.stroke();

    gg.ctx.strokeStyle = black;
    t_x = mapVal(0,self.t_max,self.timeline.x,self.timeline.x+self.timeline.w,self.t);
    drawLine(t_x,self.timeline.y,t_x,self.timeline.y+self.timeline.h,gg.ctx);

    strokeBox(self.advance_btn,gg.ctx);
    self.table.draw();

    if(self.table_module)
    {
      var m = self.table_module;
      var g = self.graph;
      gg.ctx.strokeStyle = black;
      gg.ctx.beginPath();
      x = mapVal(0,self.t_max-1,g.x,g.x+g.w,0);
      y = mapVal(m.v_min,m.v_max,g.y+g.h,g.y,m.v[0]);
      gg.ctx.moveTo(x,y);
      for(var i = 1; i < self.t_max; i++)
      {
        x = mapVal(0,self.t_max-1,g.x,g.x+g.w,i);
        y = mapVal(m.v_min,m.v_max,g.y+g.h,g.y,m.v[i]);
        gg.ctx.lineTo(x,y);
      }
      gg.ctx.stroke();

      gg.ctx.strokeStyle = gray;
      var t_x = mapVal(0,self.t_max,self.graph.x,self.graph.x+self.graph.w,self.t);
      drawLine(t_x,self.graph.y,t_x,self.graph.y+self.graph.h,gg.ctx);

      gg.ctx.fillStyle = red;
      for(var i = 0; i < self.table.n; i++)
      {
        if(self.table.known_data[i] != "-")
        {
          x = mapVal(0,self.t_max-1,g.x,g.x+g.w,i);
          y = mapVal(m.v_min,m.v_max,g.y+g.h,g.y,self.table.known_data[i]);
          y = clamp(g.y,g.y+g.h,y);
          gg.ctx.fillRect(x-1,y-1,2,2);
        }
      }
    }
  }

}



