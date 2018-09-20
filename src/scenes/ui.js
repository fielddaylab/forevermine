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
    if(self.sy < self.v_min && self.ey < self.v_min) { self.sy = self.v_min; self.ey = self.v_min; return; }
    if(self.sy > self.v_max && self.ey > self.v_max) { self.sy = self.v_max; self.ey = self.v_max; return; }
    if(self.sy < self.v_min) { self.sx = (self.v_min-self.b)/self.m; self.sy = self.v_min; }
    if(self.sy > self.v_max) { self.sx = (self.v_max-self.b)/self.m; self.sy = self.v_max; }
    if(self.ey < self.v_min) { self.ex = (self.v_min-self.b)/self.m; self.ey = self.v_min; }
    if(self.ey > self.v_max) { self.ex = (self.v_max-self.b)/self.m; self.ey = self.v_max; }

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

  self.val = 0;

  self.dragStart = function(evt)
  {
    self.drag_start_x = evt.doX-self.x;
    self.drag_start_y = evt.doY-self.y;
  }
  self.drag = function(evt)
  {
    self.x = evt.doX-self.drag_start_x;
    self.y = evt.doY-self.drag_start_y;
    worldSpaceCoords(gg.module_board,gg.canv,self);
  }
  self.dragFinish = function(evt)
  {

  }

  self.tick = function()
  {

  }

  self.draw = function()
  {
    strokeBox(self,gg.ctx);
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

  self.selected_module = 0;
  self.modules = [];

  self.gen_module = function()
  {
    var m = new module();
    m.wx = 0;
    m.wy = 0;
    m.ww = 50;
    m.wh = 50;
    screenSpace(self,gg.canv,m);
    self.modules.push(m);
  }

  self.filter = function(dragger)
  {
    for(var i = 0; i < self.modules.length; i++)
      dragger.filter(self.modules[i]);
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
    for(var i = 0; i < self.modules.length; i++)
      self.modules[i].draw();
  }

}



