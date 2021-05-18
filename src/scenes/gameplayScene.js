'use strict';
var GamePlayScene = function(game, stage)
{
  var self = this;

/*
  //use on output of compress_contexts to pare down
  for(var i = 0; i < context_indexs.length; i++)
  {
    var list = context_indexs[i];
    var uniq = 0;
    for(var j = 0; j < list.length; j++)
    {
      if(list[j] == uniq) uniq++;
      else
      {
        for(var k = uniq; k < list.length; k++)
          if(list[k] > uniq) list[k]--;
      }
    }
    console.log(list);
  }
*/

function loadLevel(prog)
{
    if ((prog < 0) || (prog>9))
      console.log("Invalid prog of "+prog);
    console.log("prog is "+prog);
    gg.input_code = prog;
        gtag('event', 'modeller_level', {'event_category':'jump', 'event_label':''+gg.input_code});
        self.set_mode(MODE_CINEMATIC,1);
        self.set_mode(MODE_BOOT,1);
        self.set_mode(MODE_PRE0,1);
        if (gg.input_code == 0)
          return;
        if(gg.input_code == 1)
        {
          self.skip_to_mode(MODE_NIGHT);
          self.skip_to_mode(MODE_LAB_IN);
          gg.exposition_box.clear();
          gg.exposition_box.nq_group(gg.next_level.text.pre_context);
          self.set_mode(MODE_PRE0,0);
        }
        else
        {
          while(gg.cur_level.i < gg.input_code-1)
          {
            self.skip_to_mode(MODE_NIGHT);
            self.skip_to_mode(MODE_LAB_IN);
          }
          gg.exposition_box.clear();
          gg.exposition_box.nq_group(gg.next_level.text.pre_context);
          self.skip_to_mode(MODE_PRE0);
        }
}

var context_indexs = [
[0, 1, 2, 3, 4, 5, 4, 6, 4, 6, 4, 6, 4, 6, 7, 8, 9, 10, 11, 12, 13, 10, 11, 12, 13, 10, 14, 15, 16, 17, 14, 15, 16, 18, 14, 15, 19, 20, 21, 22, 23, 22, 23, 22, 23, 22, 23, 24, 23, 25, 26, 27, 28, 29, 30, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 48, 49, 48, 49, 48, 49, 48, 49, 48, 49, 48, 49, 48, 49, 48],
[0, 1, 2, 3, 4, 5, 4, 6, 4, 6, 4, 6, 4, 6, 7, 8, 9, 10, 11, 12, 13, 10, 11, 12, 13, 10, 14, 15, 16, 17, 14, 15, 16, 18, 14, 15, 19, 20, 21, 22, 23, 22, 23, 22, 23, 22, 23, 24, 23, 25, 26, 27, 28, 29, 30, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 48, 49, 48, 49, 50, 49, 50, 49, 50, 49, 50, 49, 50, 49, 50],
[0, 1, 2, 3, 4, 5, 4, 6, 4, 6, 4, 6, 4, 6, 7, 8, 9, 10, 11, 12, 13, 10, 11, 12, 13, 10, 14, 15, 16, 17, 14, 15, 16, 18, 14, 15, 19, 20, 21, 22, 23, 22, 23, 22, 23, 22, 23, 24, 23, 25, 26, 27, 28, 29, 30, 30, 31, 32, 33, 30, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 47, 48, 47, 48, 49, 48, 49, 48, 49, 48, 49, 48, 49, 48, 49],
[0, 0, 0, 0, 1, 2, 3, 4, 5, 6, 7, 7, 7, 6, 5, 4, 3, 2, 1, 0, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 32, 33, 32, 33, 32, 33, 32],
[],
[0, 1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 8, 7, 6, 5, 4, 3, 2, 1, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 34, 35, 34, 35, 34, 35, 34],
[],
[0, 1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 8, 7, 6, 5, 4, 3, 2, 1, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 34, 36, 34, 36, 34, 35, 34],
[],
[0,]
];

var system_indexs = [
[],
[],
[0],
[],
[0],
[],
[0],
[],
[],
[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 9, 10, 9, 11, 12, 13, 14, 15, 16, 17, 14, 15, 16, 17, 14, 18, 19, 20, 21, 18, 19, 20, 22, 18, 19, 23, 24, 25, 26, 27, 26, 27, 26, 27, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 35, 36, 35, 36, 35, 36, 35, 36, 35, 36, 35, 36, 35, 37, 38, 39, 40, 41, 42, 43, 42, 43, 42, 43, 42, 43, 42, 43, 42, 43, 42, 43, 42, 43, 42],
];

  self.resize = function(s)
  {
    stage = s;
    gg.stage = stage;
    gg.canv = gg.stage.canv;
    gg.canvas = gg.canv.canvas;
    gg.ctx = gg.canv.context;
    //if(gg.code_txt && gg.code_txt.box_on) gg.code_txt.blur();
    //if(gg.code_txt) gg.code_txt.canv = gg.canv;

    if(self.was_ready)
    {
      var b;

      gg.monitor.ww = 422;
      gg.monitor.wh = 320;
      gg.monitor.wx = 234;
      gg.monitor.wy = -26;
      gg.monitor.init_screen();

      gg.lab.ww = gg.canv.width;
      gg.lab.wh = gg.canv.height;

      gg.fuel.x = 300;
      gg.fuel.y = 422;
      gg.fuel.w = 100;
      gg.fuel.h = 65;
      worldSpace(gg.lab,gg.canv,gg.fuel);

      gg.oxy.x = 400;
      gg.oxy.y = 422;
      gg.oxy.w = 100;
      gg.oxy.h = 65;
      worldSpace(gg.lab,gg.canv,gg.oxy);

      gg.content_dragger.w = gg.canv.width;
      gg.content_dragger.h = gg.canv.height;
      gg.content_dragger.x = 0;
      gg.content_dragger.y = 0;

      gg.exposition_box.w = gg.canv.width-20;
      gg.exposition_box.h = 150;
      gg.exposition_box.x = 10;
      gg.exposition_box.y = gg.canv.height-gg.exposition_box.h;
      gg.exposition_box.size();

      gg.message_box.w = 210;
      gg.message_box.h = gg.canv.height-20;
      gg.message_box.x = 14;
      gg.message_box.y = 0;
      gg.message_box.size();

      gg.table.h = 130;
      gg.table.x = gg.message_box.x+gg.message_box.w+20;
      gg.table.y = gg.canv.height-gg.table.h-10;
      gg.table.w = gg.canv.width-gg.table.x-30;

      gg.graph.w = gg.canv.width-gg.message_box.w-150-30;
      gg.graph.h = 200;
      gg.graph.x = gg.canv.width-gg.graph.w-30;
      gg.graph.y = 30;

      gg.timeline.w = gg.table.w;
      gg.timeline.h = 55;
      gg.timeline.x = gg.table.x;
      gg.timeline.y = gg.table.y-10;
      gg.timeline.size();

      gg.line.h = gg.canv.height;
      gg.line.x = gg.message_box.x+gg.message_box.w;
      gg.line.y = 0;
      gg.line.w = gg.canv.width-gg.line.x;

      gg.screenclicker.x = 0;
      gg.screenclicker.y = 0;
      gg.screenclicker.w = gg.canv.width;
      gg.screenclicker.h = gg.canv.height;

      if(gg.intro_vid.video)
      {
      gg.intro_vid.video.style.width = gg.canv.width*game_stretch;
      gg.intro_vid.video.style.height = gg.canv.height*game_stretch;
      gg.outro_vid.video.style.width = gg.canv.width*game_stretch;
      gg.outro_vid.video.style.height = gg.canv.height*game_stretch;
      }

      var btn_x = 80;
      var btn_y = 10;
      var btn_w = 80;
      var btn_h = 30;

      gg.new_button.x = btn_x;
      gg.new_button.y = gg.canv.height/2+btn_h/2 + 15;
      gg.new_button.w = btn_w*4;
      gg.new_button.h = btn_h;

      gg.continue_button.x = btn_x;
      gg.continue_button.y = gg.new_button.y+gg.new_button.h*2 + 15;
      gg.continue_button.w = gg.new_button.w;
      gg.continue_button.h = btn_h;

      //gg.code_txt.x = btn_x;
      //gg.code_txt.y = gg.continue_button.y+gg.continue_button.h*3.5;
      //gg.code_txt.w = gg.continue_button.w*3/4;
      //gg.code_txt.h = btn_h;
      //gg.code_txt.size();

      //gg.code_button.x = gg.code_txt.x+gg.code_txt.w+20;
      //gg.code_button.y = gg.code_txt.y-btn_h/10;
      gg.code_button.w = btn_w*2/3;
      gg.code_button.h = btn_h+btn_h/5;

      gg.sound_button.x = btn_x;
      gg.sound_button.y = gg.canv.height-btn_h*2;
      gg.sound_button.w = gg.new_button.w/2-btn_h;
      gg.sound_button.h = btn_h;

      gg.fullscreen_button.x = gg.sound_button.x+gg.sound_button.w+btn_h*2;
      gg.fullscreen_button.y = gg.canv.height-btn_h*2;
      gg.fullscreen_button.w = gg.new_button.w/2;
      gg.fullscreen_button.h = btn_h;
    }

    if(keyer)   keyer.detach();   keyer   = new Keyer({source:gg.canvas});
    if(hoverer) hoverer.detach(); hoverer = new PersistentHoverer({source:gg.canvas});
    if(clicker) clicker.detach(); clicker = new Clicker({source:gg.canvas});
    if(wheeler) wheeler.detach(); wheeler = new Wheeler({source:gg.canvas});
    if(dragger) dragger.detach(); dragger = new Dragger({source:gg.canvas});
    if(blurer)  blurer.detach();  blurer  = new Blurer({source:gg.canvas});
  }

  var keyer;
  var hoverer;
  var clicker;
  var wheeler;
  var dragger;
  var blurer;

  var ENUM = 0;
  var MODE_NULL        = ENUM; ENUM++; //0
  var MODE_MENU        = ENUM; ENUM++; //1
  var MODE_CINEMATIC   = ENUM; ENUM++; //2
  var MODE_BOOT        = ENUM; ENUM++; //3
  var MODE_PRE0        = ENUM; ENUM++; //4
  var MODE_CTX_IN      = ENUM; ENUM++; //5
  var MODE_CTX         = ENUM; ENUM++; //6
  var MODE_CTX_OUT     = ENUM; ENUM++; //7
  var MODE_PRE1        = ENUM; ENUM++; //8
  var MODE_WORK_IN     = ENUM; ENUM++; //9
  var MODE_WORK        = ENUM; ENUM++; //10
  var MODE_WORK_OUT    = ENUM; ENUM++; //11
  var MODE_POST0       = ENUM; ENUM++; //12
  var MODE_IMPROVE_IN  = ENUM; ENUM++; //13
  var MODE_IMPROVE     = ENUM; ENUM++; //14
  var MODE_IMPROVE_OUT = ENUM; ENUM++; //15
  var MODE_POST1       = ENUM; ENUM++; //16
  var MODE_LAB_OUT     = ENUM; ENUM++; //17
  var MODE_NIGHT       = ENUM; ENUM++; //18
  var MODE_LAB_IN      = ENUM; ENUM++; //19
  var MODE_CREDITS     = ENUM; ENUM++; //20
  var MODE_COUNT       = ENUM; ENUM++; //21

  self.reset_level = function()
  {
    gg.cur_level.correct = 0;
    gg.cur_level.progress = 1;
    gg.table.data_visible = 0;
    gg.table.yoff = gg.table.h;
    gg.monitor.dead = 0;
    gg.timeline.t = 0;
    gg.timeline.t_target = 0;
    gg.line.consume_cur_level();
    setCookie("level", gg.input_codes[gg.cur_level.i], 999)
  }

  self.draw_home = function()
  {
    strokeBox(gg.lab,gg.ctx);
    if(!gg.cur_level ||
      (gg.mode >  MODE_NIGHT && (gg.next_level.i == 0)) ||// || gg.next_level.i == 9)) || //was told to remove
      (gg.mode <= MODE_NIGHT && (gg.cur_level.i  == 0))// || gg.cur_level.i  == 9)) //was told to remove
    )
      drawImageBox(gg.background_night_img,gg.lab,gg.ctx);
    else
      drawImageBox(gg.background_img,gg.lab,gg.ctx);
    var fuel_p = 0;
    var oxy_p = 0;
    gg.ctx.fillStyle = green;
    fuel_p = 0;
    oxy_p = 1;
    var l = gg.cur_level;
    if(l)
    {
      if(!l.push_work) l = gg.levels[l.i+1]; //skip to level involving fuel
      fuel_p = (l.m_correct_total*3+l.b_correct_total)/gg.needed_fuel;
      oxy_p = (gg.max_days-l.day)/gg.max_days;
    }
    gg.ctx.fillStyle = "#262934";
    gg.ctx.fillRect(gg.fuel.x,gg.fuel.y,gg.fuel.w,gg.fuel.h);
    gg.ctx.fillRect(gg.oxy.x,gg.oxy.y,gg.oxy.w,gg.oxy.h);
    gg.ctx.fillStyle = "#EFA6FF";
    gg.ctx.fillRect(gg.fuel.x,gg.fuel.y+gg.fuel.h-gg.fuel.h*fuel_p,gg.fuel.w,gg.fuel.h*fuel_p);
    gg.ctx.fillStyle = "#CDBA70";
    gg.ctx.fillRect(gg.oxy.x,gg.oxy.y+gg.oxy.h-gg.oxy.h*oxy_p,gg.oxy.w,gg.oxy.h*oxy_p);

    gg.ctx.imageSmoothingEnabled = 0;
    gg.ctx.fillStyle = white;
    if(gg.mode == MODE_CTX_IN)
    {
      var img = gg.cur_level.context_imgs[0];
      drawImageBox(img,gg.monitor,gg.ctx);
      gg.ctx.globalAlpha = 1-gg.mode_p;
      drawImageBox(gg.monitor.screen,gg.monitor,gg.ctx);
      gg.ctx.globalAlpha = 1;
    }
    else if(gg.mode == MODE_CTX)
    {
      var img = gg.cur_level.context_imgs[context_indexs[gg.cur_level.i][floor((gg.mode_t/gg.ctxf_t)%context_indexs[gg.cur_level.i].length)]];
      drawImageBox(img,gg.monitor,gg.ctx);
    }
    else if(gg.mode == MODE_CTX_OUT)
    {
      var img = gg.cur_level.context_imgs[context_indexs[gg.cur_level.i][context_indexs[gg.cur_level.i].length-1]];
      drawImageBox(img,gg.monitor,gg.ctx);
      gg.ctx.globalAlpha = gg.mode_p;
      drawImageBox(gg.monitor.screen,gg.monitor,gg.ctx);
      gg.ctx.globalAlpha = 1;
    }
    else if(gg.mode == MODE_IMPROVE_IN)
    {
      var img = gg.cur_level.system_imgs[0];
      drawImageBox(img,gg.monitor,gg.ctx);
      gg.ctx.globalAlpha = 1-gg.mode_p;
      drawImageBox(gg.monitor.screen,gg.monitor,gg.ctx);
      gg.ctx.globalAlpha = 1;
    }
    else if(gg.mode == MODE_IMPROVE)
    {
      var img = gg.cur_level.system_imgs[system_indexs[gg.cur_level.i][floor((gg.mode_t/gg.systemf_t)%system_indexs[gg.cur_level.i].length)]];
      drawImageBox(img,gg.monitor,gg.ctx);
    }
    else if(gg.mode == MODE_IMPROVE_OUT)
    {
      var img = gg.cur_level.system_imgs[system_indexs[gg.cur_level.i][system_indexs[gg.cur_level.i].length-1]];
      drawImageBox(img,gg.monitor,gg.ctx);
      gg.ctx.globalAlpha = gg.mode_p;
      drawImageBox(gg.monitor.screen,gg.monitor,gg.ctx);
      gg.ctx.globalAlpha = 1;
    }
    else
      drawImageBox(gg.monitor.screen,gg.monitor,gg.ctx);
    gg.ctx.imageSmoothingEnabled = 1;
    if(!gg.cur_level || gg.cur_level.i < gg.levels.length-1 || !gg.empd)
      drawImageBox(gg.console_img,gg.lab,gg.ctx);
    else
      drawImageBox(gg.dark_console_img,gg.lab,gg.ctx);
    gg.ctx.fillStyle = red;
    gg.ctx.font = "30px DisposableDroidBB";
    if(gg.cur_level) 
    {
        gg.ctx.fillText(gg.input_codes[gg.cur_level.i],gg.lab.x+gg.lab.w*0.14,gg.lab.y+gg.lab.h*0.74);
        reachedSaveSpot(gg.cur_level.i);
    }
    if(!gg.monitor.boot_t || gg.monitor.boot_t > 250) gg.exposition_box.draw();
    if(gg.exposition_box.blackout_t)
    {
      var t = gg.exposition_box.blackout_t/(gg.blackout_t-1);
      gg.ctx.fillStyle = black;
      if(t < 0.2)
      {
        t = t/0.2;
        gg.ctx.globalAlpha = t;
        gg.ctx.drawImage(gg.blackout_img,0,0,gg.canv.width,gg.canv.height);
      }
      else if(t < 0.4)
      {
        t = (t-0.2)/0.2;
        gg.ctx.globalAlpha = 1-t;
        gg.ctx.drawImage(gg.blackout_img,0,0,gg.canv.width,gg.canv.height);
      }
      else if(t < 0.6)
      {
        t = min(1,(t-0.4)/0.2);
        gg.ctx.globalAlpha = t;
        gg.ctx.drawImage(gg.blackout_img,0,0,gg.canv.width,gg.canv.height);
        gg.ctx.fillRect(0,0,gg.canv.width,gg.canv.height);
      }
      else
      {
        t = min(1,(t-0.6)/0.2);
        gg.ctx.globalAlpha = 1;
        gg.ctx.drawImage(gg.blackout_img,0,0,gg.canv.width,gg.canv.height);
        gg.ctx.fillRect(0,0,gg.canv.width,gg.canv.height);
      }
      gg.ctx.globalAlpha = 1;
    }
    if(gg.exposition_box.recover_t)
    {
      var t = gg.exposition_box.recover_t/(gg.recover_t-1);
      gg.ctx.fillStyle = black;
      t = clamp(0,1,1-t);
      gg.ctx.globalAlpha = t;
      gg.ctx.drawImage(gg.blackout_img,0,0,gg.canv.width,gg.canv.height);
      gg.ctx.fillRect(0,0,gg.canv.width,gg.canv.height);
      gg.ctx.globalAlpha = 1;
    }
    if(gg.exposition_box.emp_t)
    {
      if(gg.exposition_box.emp_t < gg.emp_start_boot_t)
      {
        var t = gg.exposition_box.emp_t/gg.emp_start_boot_t;
        gg.ctx.fillStyle = black;
        gg.ctx.globalAlpha = t;
        gg.ctx.fillRect(0,0,gg.canv.width,gg.canv.height);
        gg.home_cam.wx = rand0()*10;
        gg.home_cam.wy = rand0()*10;
        screenSpace(gg.home_cam,gg.canv,gg.lab);
        screenSpace(gg.home_cam,gg.canv,gg.monitor);
        screenSpace(gg.home_cam,gg.canv,gg.fuel);
        screenSpace(gg.home_cam,gg.canv,gg.oxy);
      }
      else
      {
        gg.monitor.boot_t = 0;
        gg.monitor.mode = 2;
        var t = (gg.exposition_box.emp_t-gg.emp_start_boot_t)/(gg.emp_t-gg.emp_start_boot_t);
        gg.ctx.fillStyle = black;
        gg.ctx.globalAlpha = 1-t;
        gg.ctx.fillRect(0,0,gg.canv.width,gg.canv.height);
        if(t < 0.5)
        {
          gg.home_cam.wx = rand0()*10*(1-(t*2));
          gg.home_cam.wy = rand0()*10*(1-(t*2));
        }
        else //hack to neutralize camera by the end
        {
          gg.home_cam.wx = 0;
          gg.home_cam.wy = 0;
        }
        screenSpace(gg.home_cam,gg.canv,gg.lab);
        screenSpace(gg.home_cam,gg.canv,gg.monitor);
        screenSpace(gg.home_cam,gg.canv,gg.fuel);
        screenSpace(gg.home_cam,gg.canv,gg.oxy);
      }
      gg.ctx.globalAlpha = 1;
    }

  }

  self.draw_work = function()
  {
    gg.ctx.drawImage(gg.background_ui_img,0,0,gg.canv.width,gg.canv.height);
    gg.graph.draw();
    gg.timeline.draw();
    gg.table.draw();
    gg.line.draw();
    gg.cur_level.draw();
    gg.message_box.draw();
    gg.content_dragger.draw();
    gg.ctx.drawImage(gg.bezel_img,0,0,gg.canv.width,gg.canv.height);
    gg.ctx.fillStyle = red;
  }

  self.draw_night = function(t)
  {
    var pt = lerp(gg.cur_level.pano_st,gg.cur_level.pano_et,t);

    var panos = gg.pano_imgs;
    if(gg.cur_level.pano == 1) panos = gg.epano_imgs;
    var pimg;
    var vis_pano_w;
    var pano_sx;
    var pano_ex;
    for(var i = 0; i < panos.length; i++)
    {
      pimg = panos[i];
      if(pimg.length) pimg = pimg[floor(clamp(0,1,sin(8*sin(3*sin(t*10)))+1))]
      vis_pano_w = gg.canv.width/gg.canv.height*pimg.height;
      pano_sx = 0;
      pano_ex = pimg.width-vis_pano_w;
      gg.ctx.drawImage(pimg,lerp(pano_sx,pano_ex,pt),0,vis_pano_w,pimg.height,0,0,gg.canv.width,gg.canv.height);
      if(gg.cur_level.pano == 0) //transition to dark and back
      {
        gg.ctx.globalAlpha = 1-psin(t*twopi+halfpi)/2;
        if(gg.cur_level.i == 0 && t < 0.5) gg.ctx.globalAlpha = 1;
        pimg = gg.pano_imgs_dark[i];
        vis_pano_w = gg.canv.width/gg.canv.height*pimg.height;
        pano_sx = 0;
        pano_ex = pimg.width-vis_pano_w;
        gg.ctx.drawImage(pimg,lerp(pano_sx,pano_ex,pt),0,vis_pano_w,pimg.height,0,0,gg.canv.width,gg.canv.height);
        gg.ctx.globalAlpha = 1;
      }
    }

    gg.ctx.fillStyle = white;
    gg.ctx.font = "40px DisposableDroidBB";
    if(t < 0.4)
    {
    /* //was told to remove
      gg.ctx.fillText("Day "+gg.cur_level.day, 20,gg.canv.height-80);
      gg.ctx.font = "20px DisposableDroidBB";
      gg.ctx.fillText((gg.max_days-gg.cur_level.day-1)+" days of oxygen remain", 20,gg.canv.height-80+30);
    */
    }
    else if(t < 0.5)
    {
    /* //was told to remove
      gg.ctx.globalAlpha = (0.5-t)*10;
      gg.ctx.fillText("Day "+gg.cur_level.day, 20,gg.canv.height-80);
      gg.ctx.font = "20px DisposableDroidBB";
      gg.ctx.fillText((gg.max_days-gg.cur_level.day-1)+" days of oxygen remain", 20,gg.canv.height-80+30);
      gg.ctx.globalAlpha = 1;
    */
    }
    else if(t < 0.6)
    {
      gg.ctx.globalAlpha = (t-0.5)*10;
      gg.ctx.fillText("Day "+(gg.cur_level.day+1), 20,gg.canv.height-80);
      gg.ctx.font = "20px DisposableDroidBB";
      var dyz = (gg.max_days-gg.cur_level.day-2);
      if(dyz == 1) gg.ctx.fillText(dyz+" day of oxygen remains", 20,gg.canv.height-80+30);
      else         gg.ctx.fillText(dyz+" days of oxygen remain", 20,gg.canv.height-80+30);
      gg.ctx.globalAlpha = 1;
    }
    else
    {
      gg.ctx.fillText("Day "+(gg.cur_level.day+1), 20,gg.canv.height-80);
      gg.ctx.font = "20px DisposableDroidBB";
      var dyz = (gg.max_days-gg.cur_level.day-2);
      if(dyz == 1) gg.ctx.fillText(dyz+" day of oxygen remains", 20,gg.canv.height-80+30);
      else         gg.ctx.fillText(dyz+" days of oxygen remain", 20,gg.canv.height-80+30);
    }
  }

  self.credits_o = {
    spacing:30,
    lines:[
      "",
      "Lost at the Forever Mine",
      "",
      "",
      "",
      "A product of the University of Wisconsin",
      "Materials Research Science and Engineering Center IEG",
      "",
      "",
      "",
      "Produced By",
      "FIELD DAY",
      "",
      "",
      "",
      "",
      "",
      "Executive Producer",
      "",
      "Anne Lynn Gillian-Daniel",
      "",
      "",
      "",
      "Producer",
      "",
      "David Gagnon",
      "",
      "",
      "",
      "Education Fellows Director",
      "",
      "Jim Mathews",
      "",
      "",
      "",
      "Creative Director",
      "",
      "Sarah Gagnon",
      "",
      "",
      "",
      "Software Development",
      "",
      "Philip Dougherty",
      "",
      "",
      "",
      "Graphic Design and User Interface",
      "",
      "Eric Lang",
      "",
      "",
      "",
      "Art & Animation",
      "",
      "Reyna Groff",
      "",
      "Eric Lang",
      "",
      "Rodney Lambright II",
      "",
      "",
      "",
      "Content",
      "",
      "Anne Lynn Gillian-Daniel",
      "",
      "Matthew Stilwell",
      "",
      "David Gagnon",
      "",
      "",
      "",
      "Content Consultants:",
      "",
      "Wendy Crone",
      "",
      "Amanda Smith",
      "",
      "Eli Towle",
      "",
      "Benjamin Afflerbach",
      "",
      "Tesia Janicki",
      "",
      "Marc Brousseau",
      "",
      "Noah Edelstein",
      "",
      "Sarah Sprangers",
      "",
      "MRSEC faculty, graduate students, and staff",
      "",
      "",
      "",
      "Writing",
      "",
      "Sarah Gagnon",
      "",
      "Lindy Biller",
      "",
      "Eric Lang",
      "",
      "Philip Dougherty",
      "",
      "",
      "",
      "Original Music & Sound",
      "",
      "Cyril Peck",
      "",
      "",
      "",
      "Administration Support",
      "",
      "Angel Cartagena",
      "",
      "Adam Chase",
      "",
      "Ahna Holliday",
      "",
      "Becki Kohl",
      "",
      "Jim Lyne",
      "",
      "",
      "",
      "Testing and Design Feedback",
      "",
      "Joe Riederer and the students of Wisconsin Rapids Public School",
      "",
      "Olivia Dachel and the students of Merrill High School",
      "",
      "Jenny Karpelenia and the students of Bartels Middle School",
      "",
      "Marsella Aguilar and the students of Waterford Graded School District",
      "",
      "",
      "",
      "",
      "Funding Provided By",
      "",
      "NSF through the University of Wisconsin",
      "Materials Research Science and Engineering Center (DMR-1720415)",
      "",
      "Wisconsin Center for Education Research",
      "",
      "Wisconsin Department of Public Instruction",
      "",
    ],
  }

  self.set_mode = function(mode,skipping)
  {
    gg.mode = mode;
    gg.mode_t = 0;
    gg.mode_p = 0;
    gg.stage_t = 0;

    switch(mode)
    {
      case MODE_MENU:
        if(gg.sound) { gg.audwrangler.set_music(gg.menu_audio); gg.audwrangler.play_music(); }
        gg.empd = 0;
        gg.home_cam.wx = gg.lab.wx;
        gg.home_cam.wy = gg.lab.wy;
        gg.home_cam.ww = gg.lab.ww;
        gg.home_cam.wh = gg.lab.wh;
        screenSpace(gg.home_cam,gg.canv,gg.lab);
        screenSpace(gg.home_cam,gg.canv,gg.monitor);
        screenSpace(gg.home_cam,gg.canv,gg.fuel);
        screenSpace(gg.home_cam,gg.canv,gg.oxy);
        gg.intro_vid.done = 0;
        gg.outro_vid.done = 0;
        break;
      case MODE_CINEMATIC:
        gg.audwrangler.stop_music();
        if(!skipping)
          gg.intro_vid.play();
        else gg.intro_vid.done = 1;
        break;
      case MODE_BOOT:
        if(gg.sound) { gg.audwrangler.set_music(gg.console_audio); gg.audwrangler.play_music(); }
        gg.monitor.boot_t = 0;
        if(skipping)
        {
          gg.next_level = gg.levels[0];
          gg.exposition_box.clear();
          //gg.exposition_box.nq_group(gg.next_level.text.pre_context);
          gg.next_level.progress++;
          gg.stage_t = 0;
        }
        break;
      case MODE_PRE0:
        gg.home_cam.wx = gg.lab.wx;
        gg.home_cam.wy = gg.lab.wy;
        gg.home_cam.ww = gg.lab.ww;
        gg.home_cam.wh = gg.lab.wh;
        screenSpace(gg.home_cam,gg.canv,gg.lab);
        screenSpace(gg.home_cam,gg.canv,gg.monitor);
        screenSpace(gg.home_cam,gg.canv,gg.fuel);
        screenSpace(gg.home_cam,gg.canv,gg.oxy);
        //assume pre_text_0 already enqueued
        gg.cur_level = gg.next_level;
        if(!skipping) gtag('event', 'modeller_level', {'event_category':'begin', 'event_label':''+gg.cur_level.i});
        gg.graph.x_off = gg.cur_level.day*24;
        gg.graph.y0_min = gg.cur_level.y_min;
        if(gg.cur_level.i == 1 || gg.cur_level.i == 8)
        {
          gg.graph.y0_max = gg.graph.y0_min+20;
          gg.graph.y0_grid = 2;
        }
        else
        {
          gg.graph.y0_max = gg.graph.y0_min+10;
          gg.graph.y0_grid = 1;
        }
        gg.timeline.t_speed = gg.cur_level.t_speed;
        gg.timeline.fast_t_speed = gg.cur_level.fast_t_speed;
        self.reset_level();
        gg.message_box.clear();
        break;
      case MODE_CTX_IN:
        if(!skipping) gg.exposition_box.nq_group(gg.cur_level.text.context);
        gg.cur_level.progress++;
        break;
      case MODE_CTX:
        break;
      case MODE_CTX_OUT:
        if(!skipping) gg.exposition_box.nq_group(gg.cur_level.text.lets_go);
        gg.cur_level.progress++;
        gg.stage_t = 0;
        break;
      case MODE_PRE1:
        break;
      case MODE_WORK_IN:
        if(gg.sound) { gg.audwrangler.set_music(gg.modeling_audio); gg.audwrangler.play_music(); }
        if(gg.cur_level.skip_zoom)
        {
          gg.graph.zoom = 0;
          //if(!skipping) gg.message_box.nq_group(gg.cur_level.text.status);//skip!
          gg.cur_level.progress++;
          if(!skipping) gg.message_box.nq_group(gg.cur_level.text.data);
          gg.cur_level.progress++;
        }
        else
        {
          gg.graph.zoom = 1;
          if(!skipping) gg.message_box.nq_group(gg.cur_level.text.status);
          gg.cur_level.progress++;
        }
        gg.stage_t = 0;
        break;
      case MODE_WORK:
        gg.home_cam.wx = gg.monitor.wx;
        gg.home_cam.wy = gg.monitor.wy;
        gg.home_cam.ww = gg.monitor.wh/gg.lab.wh*gg.lab.ww;
        gg.home_cam.wh = gg.monitor.wh;
        screenSpace(gg.home_cam,gg.canv,gg.lab);
        screenSpace(gg.home_cam,gg.canv,gg.monitor);
        screenSpace(gg.home_cam,gg.canv,gg.fuel);
        screenSpace(gg.home_cam,gg.canv,gg.oxy);
        if(skipping)
        {
          if(gg.cur_level.push_work)
            gg.line.push_day(gg.cur_level.m_correct_total,gg.cur_level.b_correct_total);
        }
        break;
      case MODE_WORK_OUT:
        if(gg.sound) { gg.audwrangler.set_music(gg.console_audio); gg.audwrangler.play_music(); }
        gg.line.blur();
        gg.exposition_box.clear();
        break;
      case MODE_POST0:
        gg.home_cam.wx = gg.lab.wx;
        gg.home_cam.wy = gg.lab.wy;
        gg.home_cam.ww = gg.lab.ww;
        gg.home_cam.wh = gg.lab.wh;
        screenSpace(gg.home_cam,gg.canv,gg.lab);
        screenSpace(gg.home_cam,gg.canv,gg.monitor);
        screenSpace(gg.home_cam,gg.canv,gg.fuel);
        screenSpace(gg.home_cam,gg.canv,gg.oxy);
        if(!skipping) gg.exposition_box.nq_group(gg.cur_level.text.pre_improve);
        gg.cur_level.progress++;
        gg.stage_t = 0;
        break;
      case MODE_IMPROVE_IN:
        if(!skipping) gg.exposition_box.nq_group(gg.cur_level.text.improve);
        gg.cur_level.progress++;
        break;
      case MODE_IMPROVE:
        break;
      case MODE_IMPROVE_OUT:
        if(!skipping) gg.exposition_box.nq_group(gg.cur_level.text.post);
        gg.cur_level.progress++;
        gg.stage_t = 0;
        break;
      case MODE_POST1:
        break;
      case MODE_LAB_OUT:
        if(!skipping)
        {
          if(gg.sound)
          {
            if(gg.cur_level.pano == 1) gg.audwrangler.set_music(gg.welding_audio);
            else                       gg.audwrangler.set_music(gg.pano_audio);
            gg.audwrangler.play_music();
          }
        }
        break;
      case MODE_NIGHT:
        break;
      case MODE_LAB_IN: //sets next level
        if(gg.sound)
        {
          if(gg.cur_level.i+2 == gg.levels.length) gg.audwrangler.set_music(gg.console_emp_audio);
          else                                     gg.audwrangler.set_music(gg.console_audio);
          gg.audwrangler.play_music();
        }
        if(gg.cur_level.i < gg.levels.length-1)
        {
          gg.next_level = gg.levels[gg.cur_level.i+1];
          if(!skipping) gtag('event', 'modeller_level', {'event_category':'complete', 'event_label':''+gg.cur_level.i});
          gg.exposition_box.clear();
          if(!skipping) gg.exposition_box.nq_group(gg.next_level.text.pre_context);
          gg.cur_level.progress++;
          gg.stage_t = 0;
        }
        break;
      case MODE_CREDITS:
        break;
    }
  }

  self.skip_to_mode = function(mode)
  {
    var nmode;
    gg.skipping = 1;
    do
    {
      nmode = gg.mode+1;
      if(gg.mode == MODE_LAB_IN) nmode = MODE_PRE0;
      self.set_mode(nmode,(mode != nmode))

    } while(gg.mode != mode)
    gg.skipping = 0;
  }

  self.tick_mode = function()
  {
    if (gameIsPaused) return;

    switch(gg.mode)
    {
      case MODE_MENU:
        //blurer.filter(gg.code_txt);
        if(
          !clicker.filter(gg.continue_button) &&
          !clicker.filter(gg.new_button) &&
          //!clicker.filter(gg.code_txt) &&
          !clicker.filter(gg.code_button) &&
          !clicker.filter(gg.sound_button) &&
          !clicker.filter(gg.fullscreen_button) &&
          false)
          ;
        break;
      case MODE_CINEMATIC:
      {
        if(!gg.intro_vid.done) return;
        if(!clicker.filter(gg.monitor) && gg.screenclicker.clicked) gg.monitor.click({});
        if(gg.monitor.clicked || gg.keylistener.advance())
          self.set_mode(MODE_BOOT,0);
      }
        break;
      case MODE_BOOT:
      {
        gg.mode_p = gg.mode_t/gg.fade_t;
        if(gg.mode_p < 1) //fade home
        {
        }
        else
        {
          gg.next_level = gg.levels[0];
          gg.exposition_box.clear();
          gg.exposition_box.nq_group(gg.next_level.text.pre_context);
          gg.next_level.progress++;
          gg.stage_t = 0;
          self.set_mode(MODE_PRE0,0);
        }
      }
      break;
      case MODE_PRE0:
      {
        gg.mode_p = 0.5;
        if((!gg.monitor.boot_t || gg.monitor.boot_t > 250) && !clicker.filter(gg.exposition_box) && (gg.screenclicker.clicked || gg.autoclick)) gg.exposition_box.click({});
        if(gg.exposition_box.displayed_i >= gg.exposition_box.texts.length || gg.keylistener.advance())
        {
          if(gg.cur_level.skip_context)
            self.skip_to_mode(MODE_WORK_IN);
          else
            self.set_mode(MODE_CTX_IN,0);
        }
        gg.exposition_box.tick();
      }
        break;
      case MODE_CTX_IN:
      {
        gg.mode_p = gg.mode_t/gg.fade_t;
        if(!clicker.filter(gg.exposition_box) && (gg.screenclicker.clicked || gg.autoclick)) gg.exposition_box.click({});
        if(gg.mode_p < 1)
        {
        }
        else self.set_mode(MODE_CTX,0);
      }
        break;
      case MODE_CTX:
      {
        gg.mode_p = gg.mode_t/(gg.ctxf_t*context_indexs[gg.cur_level.i].length*gg.ctxf_loop);
        if(!clicker.filter(gg.exposition_box) && (gg.screenclicker.clicked || gg.autoclick)) gg.exposition_box.click({});
        if((gg.mode_p >= 1 && gg.exposition_box.displayed_i >= gg.exposition_box.texts.length) || gg.keylistener.advance())
          self.set_mode(MODE_CTX_OUT,0);
      }
        break;
      case MODE_CTX_OUT:
      {
        gg.mode_p = gg.mode_t/gg.fade_t;
        if(gg.mode_p < 1) //fade to face
        {
        }
        else self.set_mode(MODE_PRE1,0);
      }
        break;
      case MODE_PRE1:
      {
        gg.mode_p = 0.5;
        if((!gg.monitor.boot_t || gg.monitor.boot_t > 250) && !clicker.filter(gg.exposition_box) && (gg.screenclicker.clicked || gg.autoclick)) gg.exposition_box.click({});
        if(gg.exposition_box.displayed_i >= gg.exposition_box.texts.length || gg.keylistener.advance())
          self.set_mode(MODE_WORK_IN,0);
        gg.exposition_box.tick();
      }
        break;
      case MODE_WORK_IN:
      {
        gg.mode_p = gg.mode_t/(gg.zoom_t+gg.fade_t);
        if(gg.mode_p < 1)
        {
          if(gg.mode_t <= gg.zoom_t) //zoom to work
          {
            var zoom_p = gg.mode_t/gg.zoom_t;
            gg.home_cam.wx = lerp(gg.lab.wx,gg.monitor.wx,zoom_p);
            gg.home_cam.wy = lerp(gg.lab.wy,gg.monitor.wy,zoom_p);
            gg.home_cam.ww = lerp(gg.lab.ww,gg.monitor.wh/gg.lab.wh*gg.lab.ww,zoom_p);
            gg.home_cam.wh = lerp(gg.lab.wh,gg.monitor.wh,zoom_p);
            screenSpace(gg.home_cam,gg.canv,gg.lab);
            screenSpace(gg.home_cam,gg.canv,gg.monitor);
            screenSpace(gg.home_cam,gg.canv,gg.fuel);
            screenSpace(gg.home_cam,gg.canv,gg.oxy);
          }
          else if(gg.mode_t < gg.zoom_t+gg.fade_t) //fade to work
          {
            var fade_p = (gg.mode_t-gg.fade_t-gg.zoom_t)/gg.fade_t;
          }
        }
        else self.set_mode(MODE_WORK,0);
      }
        break;
      case MODE_WORK:
      {
        gg.mode_p = 0.5;
        gg.table.tick();
        var check = 1;
        dragger.filter(gg.content_dragger);
        if(!gg.content_dragger.dragging)
        {
          if(check) check = !gg.line.filter(keyer,blurer,dragger,clicker);
          gg.line.tick();
          if(check) check = !gg.timeline.filter(dragger,clicker);
          if(check) { check = !dragger.filter(gg.message_box); if(check && gg.autoclick) gg.message_box.click({}); }
          if(check) wheeler.filter(gg.message_box);
        }

        switch(gg.cur_level.progress)
        {
          case 0: //pre_context
          case 1: //context
          case 2: //lets_go
          case 3: //status
          case 4: //data
            break;
          case 5: //axis
            if(gg.graph.zoom != 0) gg.graph.zoom = 1-(min(gg.stage_t,100)/100);
            break;
          case 6: //labels
            if(gg.graph.zoom != 0) gg.graph.zoom = 1-(min(gg.stage_t,100)/100);
            break;
          case 7: //constants
          case 8: //submit
          case 9: //review
            gg.graph.zoom = 0;
          break;
          case 10: //debrief
            if(!gg.cur_level.skip_zoom)
              gg.graph.zoom = min(gg.stage_t,100)/100;
            break;
          case 11: //pre_improve
            if(!gg.cur_level.skip_zoom)
            {
              if(gg.graph.zoom < 1) gg.graph.zoom = min(gg.stage_t,100)/100;
              else gg.graph.zoom = 1;
            }
            break;
          case 12: //improve
            break;
          case 13: //post
            break;
        }

        if(gg.message_box.requested_advance)
        {
          switch(gg.cur_level.progress)
          {
            case 0: //pre_context
            case 1: //context
            case 2: //lets_go
            case 3: //status
              break;
            case 4: //data
              if(gg.cur_level.text.data.length)
              {
                gg.message_box.nq_group(gg.cur_level.text.data);
                gg.cur_level.progress++;
                gg.stage_t = 0;
              }
              break;
            case 5: //axis
            case 6: //labels
            case 7: //constants
            case 8: //submit
            case 9: //review
              break;
            case 10: //debrief
              gg.message_box.nq_group(gg.cur_level.text.debrief);
              gg.cur_level.progress++;
              gg.stage_t = 0;
              break;
            case 11: //pre_improve
              break;
            case 12: //improve
              break;
            case 13: //post
              break;
          }
        }
        if((gg.cur_level.correct && gg.message_box.requested_end))
          self.set_mode(MODE_WORK_OUT,0);
        else if(gg.keylistener.advance())
        {
          if(gg.cur_level.push_work)
            gg.line.push_day(gg.cur_level.m_correct_total,gg.cur_level.b_correct_total);
          self.set_mode(MODE_WORK_OUT,0);
        }

        gg.graph.tick();
        gg.timeline.tick();
        gg.cur_level.tick();
        gg.message_box.tick();
        if(gg.cur_level.progress != 11) gg.message_box.prompt_end = 0;

        //gg.graph.zoom = psin(gg.time_mod_twelve_pi);
      }
        break;
      case MODE_WORK_OUT:
      {
        gg.mode_p = gg.mode_t/(gg.fade_t+gg.zoom_t);
        if(gg.mode_p < 1)
        {
          if(gg.mode_t < gg.fade_t) //fade to work
          {
            var fade_p = gg.mode_t/gg.fade_t;
          }
          else if(gg.mode_t-gg.fade_t <= gg.zoom_t) //zoom to work
          {
            var zoom_p = (gg.mode_t-gg.fade_t)/gg.zoom_t;
            gg.home_cam.wx = lerp(gg.monitor.wx,gg.lab.wx,zoom_p);
            gg.home_cam.wy = lerp(gg.monitor.wy,gg.lab.wy,zoom_p);
            gg.home_cam.ww = lerp(gg.monitor.wh/gg.lab.wh*gg.lab.ww,gg.lab.ww,zoom_p);
            gg.home_cam.wh = lerp(gg.monitor.wh,gg.lab.wh,zoom_p);
            screenSpace(gg.home_cam,gg.canv,gg.lab);
            screenSpace(gg.home_cam,gg.canv,gg.monitor);
            screenSpace(gg.home_cam,gg.canv,gg.fuel);
            screenSpace(gg.home_cam,gg.canv,gg.oxy);
          }
        }
        else self.set_mode(MODE_POST0,0);
      }
        break;
      case MODE_POST0:
      {
        if((!gg.monitor.boot_t || gg.monitor.boot_t > 250) && !clicker.filter(gg.exposition_box) && (gg.screenclicker.clicked || gg.autoclick)) gg.exposition_box.click({});
        if(gg.exposition_box.displayed_i >= gg.exposition_box.texts.length || gg.keylistener.advance())
        {
          if(gg.cur_level.skip_system)
          {
            if(gg.cur_level.skip_night)
              self.skip_to_mode(MODE_WORK_IN);
            else
              self.skip_to_mode(MODE_LAB_OUT);
          }
          else
            self.set_mode(MODE_IMPROVE_IN,0);
        }
        gg.exposition_box.tick();
        if(gg.exposition_box.blackout_t >= gg.blackout_t-1)
        {
          gg.exposition_box.blackout_t = 0;
          self.skip_to_mode(MODE_LAB_OUT);
          gg.mode_t = gg.fade_t; //skip to "fade in" part
        }
      }
        break;
      case MODE_IMPROVE_IN:
      {
        gg.mode_p = gg.mode_t/gg.fade_t;
        if(gg.mode_p < 1)
        {
        }
        else self.set_mode(MODE_IMPROVE,0);
      }
        break;
      case MODE_IMPROVE:
      {
        gg.mode_p = gg.mode_t/(gg.systemf_t*system_indexs[gg.cur_level.i].length*gg.systemf_loop);
        if(gg.cur_level.special) gg.mode_p = gg.mode_t/(gg.ctxf_t*system_indexs[gg.cur_level.i].length*gg.ctxf_loop);
        if(!clicker.filter(gg.exposition_box) && (gg.screenclicker.clicked || gg.autoclick)) gg.exposition_box.click({});
        if((gg.mode_p >= 1 && gg.exposition_box.displayed_i >= gg.exposition_box.texts.length) || gg.keylistener.advance())
          self.set_mode(MODE_IMPROVE_OUT,0);
      }
        break;
      case MODE_IMPROVE_OUT:
      {
        gg.mode_p = gg.mode_t/gg.fade_t;
        if(gg.mode_p < 1) //fade to face
        {
        }
        else self.set_mode(MODE_POST1,0);
      }
        break;
      case MODE_POST1:
      {
        if((!gg.monitor.boot_t || gg.monitor.boot_t > 250) && !clicker.filter(gg.exposition_box) && (gg.screenclicker.clicked || gg.autoclick)) gg.exposition_box.click({});
        if(gg.exposition_box.displayed_i >= gg.exposition_box.texts.length || gg.keylistener.advance())
        {
          if(gg.cur_level.special)
          {
            gg.audwrangler.stop_music();
            gg.outro_vid.play();
            self.set_mode(MODE_CREDITS,0);
            reachedSaveSpot(10);
          }
          else
          {
            if(gg.cur_level.skip_night)
              self.skip_to_mode(MODE_WORK_IN);
            else
              self.set_mode(MODE_LAB_OUT,0);
          }
        }
        gg.exposition_box.tick();
        if(gg.exposition_box.blackout_t >= gg.blackout_t-1)
        {
          self.skip_to_mode(MODE_LAB_OUT);
          gg.mode_t = gg.fade_t; //skip to "fade in" part
        }
      }
        break;
      case MODE_LAB_OUT:
      {
        gg.mode_p = gg.mode_t/(gg.fade_t+gg.fade_t);
        if(gg.mode_t < gg.fade_t) //fade to black
        {
          var fade_p = gg.mode_t/gg.fade_t;
        }
        else if(gg.mode_t < gg.fade_t+gg.fade_t) //fade to night
        {
          var fade_p = (gg.mode_t-gg.fade_t)/gg.fade_t;
        }
        else self.set_mode(MODE_NIGHT,0);
      }
        break;
      case MODE_NIGHT:
        gg.mode_p = gg.mode_t/gg.pano_t;
        if(gg.mode_t < gg.pano_t && !gg.keylistener.advance()) //display night
        {
          var pan_p = gg.mode_t/gg.pano_t;
        }
        else self.set_mode(MODE_LAB_IN,0);
        break;
      case MODE_LAB_IN:
      {
        gg.mode_p = gg.mode_t/(gg.fade_t+gg.fade_t);
        if(gg.mode_t < gg.fade_t) //fade to black
        {
          var fade_p = gg.mode_t/gg.fade_t;
        }
        else if(gg.mode_t < gg.fade_t+gg.fade_t) //fade to home
        {
          var fade_p = (gg.mode_t-gg.fade_t)/gg.fade_t;
        }
        else
          self.set_mode(MODE_PRE0,0);
      }
        break;
      case MODE_CREDITS:
      {
        if(gg.mode_t == 1)
        {
          if(gg.sound) { gg.audwrangler.set_music(gg.credits_audio); gg.audwrangler.play_music(); }
        }
        gg.mode_p = gg.mode_t/(gg.fade_t+gg.fade_t);
        if(gg.mode_t < gg.fade_t) //fade from black
        {
          var fade_p = 1-(gg.mode_t/gg.fade_t);
        }
        else if(gg.mode_t >= gg.credits_t+(gg.fade_t*2))
        {
          self.set_mode(MODE_MENU,0);
          endGame(); //Tell LoL API Game is over
        }
      }
        break;
    }
  }

  self.draw_mode = function()
  {
    console.log(gg.mode);
    switch(gg.mode)
    {
      case MODE_MENU:
      {
        self.draw_home();
        drawImageBox(gg.menu_bg_img,gg.lab,gg.ctx);
        /*
        gg.ctx.fillStyle = black;
        fillBox(gg.continue_button,gg.ctx);
        fillBox(gg.new_button,gg.ctx);
        fillBox(gg.code_button,gg.ctx);
        fillBox(gg.code_txt,gg.ctx);
        fillBox(gg.sound_button,gg.ctx);
        fillBox(gg.fullscreen_button,gg.ctx);
        */
        gg.ctx.fillStyle = white;
        gg.ctx.strokeStyle = white;
        gg.ctx.textAlign = "left";
        gg.ctx.font = (gg.continue_button.h*2/3)+"px Lato";
        var txtbump = gg.continue_button.h/5;
        gg.ctx.fillText("NEW GAME",gg.new_button.x,gg.new_button.y+gg.new_button.h-txtbump);
        if (currProgress == 0)
          gg.ctx.fillStyle = 'grey';
        gg.ctx.fillText("CONTINUE",gg.continue_button.x,gg.continue_button.y+gg.continue_button.h-txtbump);
        gg.ctx.fillStyle = white;
        //gg.ctx.fillText("ENTER SAVE CODE:",gg.new_button.x,gg.code_txt.y-txtbump*1.5-gg.code_txt.h/2);
        //if(gg.input_code_valid) gg.ctx.fillText(gg.code_txt.box.value,gg.code_txt.x,gg.code_txt.y+gg.code_txt.h-txtbump);
        //gg.ctx.drawImage(gg.menu_text_img,gg.code_txt.x-5,gg.code_txt.y-5,gg.code_txt.w+10,gg.code_txt.h+10);
        //gg.ctx.drawImage(gg.menu_go_img,gg.code_button.x,gg.code_button.y,gg.code_button.w,gg.code_button.h);
        drawLine(gg.sound_button.x,gg.sound_button.y-10,gg.canv.width/2,gg.sound_button.y-10,gg.ctx);
        gg.ctx.fillText("MUSIC FX",gg.sound_button.x,gg.sound_button.y+gg.sound_button.h-txtbump);
        if(gg.sound) gg.ctx.drawImage(gg.menu_check_img,gg.sound_button.x+gg.sound_button.w-gg.sound_button.h+2,gg.sound_button.y+2,gg.sound_button.h-4,gg.sound_button.h-4);
                     gg.ctx.drawImage(gg.menu_box_img,  gg.sound_button.x+gg.sound_button.w-gg.sound_button.h,   gg.sound_button.y, gg.sound_button.h,  gg.sound_button.h);
        gg.ctx.fillText("FULLSCREEN",gg.fullscreen_button.x,gg.fullscreen_button.y+gg.fullscreen_button.h-txtbump);
        if(gg.fullscreen) gg.ctx.drawImage(gg.menu_check_img,gg.fullscreen_button.x+gg.fullscreen_button.w-gg.fullscreen_button.h+2,gg.fullscreen_button.y+2,gg.fullscreen_button.h-4,gg.fullscreen_button.h-4);
                          gg.ctx.drawImage(gg.menu_box_img,  gg.fullscreen_button.x+gg.fullscreen_button.w-gg.fullscreen_button.h,  gg.fullscreen_button.y,  gg.fullscreen_button.h,gg.fullscreen_button.h);
      }
        break;
      case MODE_CINEMATIC:
      {
        self.draw_home();
        gg.ctx.fillStyle = black;
        gg.ctx.fillRect(gg.monitor.x,gg.monitor.y,gg.monitor.w,gg.monitor.h);
        drawImageBox(gg.dark_console_img,gg.lab,gg.ctx);
        if(gg.mode_t%100 < 50)
          gg.ctx.drawImage(gg.button_glow_img,gg.stage.width-210, gg.stage.height-135, 210, 140);
        var s = 30;
        //gg.ctx.drawImage(gg.notice_img,gg.stage.width-80,gg.stage.height-120,s,s); //was told to remove
        /*
        gg.ctx.fillStyle = white;
        gg.ctx.font = "20px DisposableDroidBB";
        for(var i = 0; i < self.txt_lines.length; i++)
          gg.ctx.fillText(self.txt_lines[i],gg.monitor.x+10,gg.monitor.y+30+i*25);
        */
      }
        break;
      case MODE_BOOT:
      {
        self.draw_home();
        var t = gg.mode_t/gg.fade_t;
        gg.ctx.globalAlpha = 1-t;
        drawImageBox(gg.dark_console_img,gg.lab,gg.ctx);
        gg.ctx.globalAlpha = 1;
      }
        break;
      case MODE_PRE0:
      {
        self.draw_home();
      }
        break;
      case MODE_CTX_IN:
      {
        if(gg.mode_t <= gg.fade_t)
          self.draw_home();
      }
        break;
      case MODE_CTX:
      {
        self.draw_home();
      }
        break;
      case MODE_CTX_OUT:
      {
        if(gg.mode_t < gg.fade_t) //fade to face
        {
          var t = gg.mode_t/gg.fade_t;
          self.draw_home();
        }
      }
        break;
      case MODE_PRE1:
      {
        self.draw_home();
      }
        break;
      case MODE_WORK_IN:
      {
        if(gg.mode_t <= gg.zoom_t) //zoom to work
        {
          self.draw_home();
        }
        else if(gg.mode_t < gg.zoom_t+gg.fade_t) //fade to work
        {
          self.draw_work();
          gg.ctx.globalAlpha = 1-((gg.mode_t-gg.zoom_t)/gg.fade_t);
          self.draw_home();
          gg.ctx.globalAlpha = 1;
        }
      }
        break;
      case MODE_WORK:
      {
        self.draw_work();
      }
        break;
      case MODE_WORK_OUT:
      {
        if(gg.mode_t < gg.fade_t) //fade to face
        {
          self.draw_work();
          gg.ctx.globalAlpha = gg.mode_t/gg.fade_t;
          self.draw_home();
          gg.ctx.globalAlpha = 1;
        }
        else if(gg.mode_t < gg.fade_t+gg.zoom_t) //zoom to home
        {
          self.draw_home();
        }
        else if(gg.mode_t < gg.fade_t+gg.zoom_t+gg.fade_t) //fade to feed
        {
          self.draw_home();
        }
      }
        break;
      case MODE_POST0:
        self.draw_home();
        break;
      case MODE_IMPROVE_IN:
      {
        if(gg.mode_t <= gg.fade_t)
          self.draw_home();
      }
        break;
      case MODE_IMPROVE:
      {
        self.draw_home();
      }
        break;
      case MODE_IMPROVE_OUT:
      {
        if(gg.mode_t < gg.fade_t) //fade to face
        {
          var t = gg.mode_t/gg.fade_t;
          self.draw_home();
        }
      }
        break;
      case MODE_POST1:
        self.draw_home();
        break;
      case MODE_LAB_OUT:
        if(gg.mode_t < gg.fade_t)
        {
          self.draw_home();
          gg.ctx.globalAlpha = gg.mode_t/gg.fade_t;
          gg.ctx.fillStyle = black;
          gg.ctx.fillRect(0,0,gg.canv.width,gg.canv.height);
          gg.ctx.globalAlpha = 1;
        }
        else
        {
          var t = (gg.mode_t-gg.fade_t)/gg.fade_t;
          self.draw_night(t*gg.fade_t/(gg.fade_t*2+gg.pano_t));
          gg.ctx.globalAlpha = 1-t;
          gg.ctx.fillStyle = black;
          gg.ctx.fillRect(0,0,gg.canv.width,gg.canv.height);
          gg.ctx.globalAlpha = 1;
        }
        break;
      case MODE_NIGHT:
        var t = gg.mode_t/gg.pano_t;
        self.draw_night((gg.fade_t+t*gg.pano_t)/(gg.fade_t*2+gg.pano_t));
        break;
      case MODE_LAB_IN:
        if(gg.mode_t < gg.fade_t)
        {
          var t = gg.mode_t/gg.fade_t;
          self.draw_night((gg.fade_t+gg.pano_t+t*gg.fade_t)/(gg.fade_t*2+gg.pano_t));
          gg.ctx.globalAlpha = t;
          gg.ctx.fillStyle = black;
          gg.ctx.fillRect(0,0,gg.canv.width,gg.canv.height);
          gg.ctx.globalAlpha = 1;
        }
        else
        {
          self.draw_home();
          gg.ctx.globalAlpha = 1-((gg.mode_t-gg.fade_t)/gg.fade_t);
          gg.ctx.fillStyle = black;
          gg.ctx.fillRect(0,0,gg.canv.width,gg.canv.height);
          gg.ctx.globalAlpha = 1;
        }
        break;
      case MODE_CREDITS:
        var c_t = clamp(0,1,(gg.mode_t-gg.fade_t)/gg.credits_t);
        if(gg.mode_t < gg.fade_t)
        {
          var t = 1-(gg.mode_t/gg.fade_t); //fade in
          gg.ctx.globalAlpha = t;
          gg.ctx.globalAlpha = 1; //just start black actually
          gg.ctx.fillStyle = black;
          gg.ctx.fillRect(0,0,gg.canv.width,gg.canv.height);
          gg.ctx.globalAlpha = 1;
        }
        else if(gg.mode_t > gg.credits_t+gg.fade_t)
        {
          var t = (gg.mode_t-gg.credits_t-gg.fade_t)/gg.fade_t; //fade_out
          gg.ctx.globalAlpha = t;
          gg.ctx.fillStyle = black;
          gg.ctx.fillRect(0,0,gg.canv.width,gg.canv.height);
          gg.ctx.globalAlpha = 1;
        }
        else
        //draw credits between c_t = 0 and c_t = 1;
        {
          gg.ctx.fillStyle = black;
          gg.ctx.fillRect(0,0,gg.canv.width,gg.canv.height);

          gg.ctx.font = "30px DisposableDroidBB";
          var bottom = gg.canv.height;
          var top = 0-self.credits_o.spacing*self.credits_o.lines.length;
          var p = lerp(bottom,top,c_t);
          gg.ctx.fillStyle = white;
          gg.ctx.textAlign = "center";
          for(var i = 0; i < self.credits_o.lines.length; i++)
          {
            if(p > 10 && p < gg.canv.height+self.credits_o.spacing)
            {
              if(p < 110) gg.ctx.globalAlpha = (p-10)/100;
              gg.ctx.fillText(self.credits_o.lines[i],gg.canv.width/2,p);
              gg.ctx.globalAlpha = 1;
            }
            p += self.credits_o.spacing;
          }

        }
        break;
    }
  }

  self.ready = function()
  {
    //music
    gg.menu_audio            = gg.audwrangler.register_music("assets/audio/menu.mp3");
    gg.console_audio         = gg.audwrangler.register_music("assets/audio/console.mp3");
    gg.console_emp_audio     = gg.audwrangler.register_music("assets/audio/console_emp.mp3");
    gg.modeling_audio        = gg.audwrangler.register_music("assets/audio/modeling.mp3");
    gg.pano_audio            = gg.audwrangler.register_music("assets/audio/pano.mp3");
    gg.welding_audio         = gg.audwrangler.register_music("assets/audio/welding.mp3");
    gg.credits_audio         = gg.audwrangler.register_music("assets/audio/credits.mp3");
    gg.audwrangler.set_music(gg.menu_audio);
    gg.audwrangler.play_music();

    //fx
    gg.voices = {clean:[],angry:[],glitchy:[]};
    for(var i = 0; i < 9; i++) gg.voices.clean.push(  gg.audwrangler.register("assets/audio/voice/clean/"  +i+".mp3"));
    for(var i = 0; i < 5; i++) gg.voices.angry.push(  gg.audwrangler.register("assets/audio/voice/angry/"  +i+".mp3"));
    for(var i = 0; i < 9; i++) gg.voices.glitchy.push(gg.audwrangler.register("assets/audio/voice/glitchy/"+i+".mp3"));
    gg.build_audio   = gg.audwrangler.register("assets/audio/emp_charge.mp3");
    gg.emp_audio   = gg.audwrangler.register("assets/audio/emp_hit.mp3");

    gg.max_days = 8;
    gg.needed_fuel = 350;
    gg.home_cam = {wx:0,wy:0,ww:0,wh:0};
    gg.monitor  = new monitor();
    gg.fuel     = {wx:0,wy:0,ww:0,wh:0,x:0,y:0,w:0,h:0};
    gg.oxy      = {wx:0,wy:0,ww:0,wh:0,x:0,y:0,w:0,h:0};
    gg.lab      = {wx:0,wy:0,ww:0,wh:0,x:0,y:0,w:0,h:0};
    gg.fade_t = 20;
    gg.zoom_t = 50;
    gg.ctxf_t = 8;
    gg.ctxf_loop = 1;
    gg.systemf_t = 8;
    gg.systemf_loop = 10;
    gg.pano_t = 350;
    gg.emp_t = 250;
    gg.emp_start_boot_t = 10;
    gg.blackout_t = 150;
    gg.recover_t = 50;
    gg.credits_t = 5000;
    gg.sound = 1;
    gg.fullscreen = 0;

    gg.keylistener = {
      last_key:0,
      advanceable:0,
      secretprogress:0,
      key_down:function(evt)
      {
        gg.keylistener.last_key = evt.keyCode;
        if(!gg.keylistener.advanceable)
        {
          var secret = "spyparty";
          if(secret[gg.keylistener.secretprogress] == String.fromCharCode(evt.keyCode).toLowerCase()) gg.keylistener.secretprogress++;
          else                                                                          gg.keylistener.secretprogress = 0;
          if(gg.keylistener.secretprogress == secret.length) gg.keylistener.advanceable = 1;
        }
      },
      advance:function()
      {
        if(gg.keylistener.advanceable && gg.keylistener.last_key == 32 /*space*/)
        {
          if(!gg.intro_vid.done) gg.intro_vid.stop();
          gg.keylistener.last_key = 0;
          return 1;
        }
        else
        {
          gg.keylistener.last_key = 0;
          return 0;
        }
      }
    };
    gg.screenclicker = {x:0,y:0,w:0,h:0,click:function(evt){gg.screenclicker.clicked = 1;}};

    gg.fmlogo_img = GenImg("assets/fmlogo.png");
    gg.menu_bg_img = GenImg("assets/menu/background.jpg");
    gg.menu_go_img = GenImg("assets/menu/button_go.png");
    gg.menu_box_img = GenImg("assets/menu/check_box.png");
    gg.menu_check_img = GenImg("assets/menu/check_box_fill.png");
    gg.menu_text_img = GenImg("assets/menu/text_area.png");
    gg.iframe_img = GenImg("assets/iframe_img.jpg");
    gg.glitch_bg_img = GenImg("assets/glitch_bg.jpg");
    gg.button_glow_img = GenImg("assets/button_glow.png");
    gg.reply_button_img = GenImg("assets/reply_button.png");
    gg.return_button_img = GenImg("assets/return_button.png");
    gg.drop_data_img = GenImg("assets/drop_data.png");
    gg.blackout_img = GenImg("assets/blackout.png");
    gg.eq_img = GenImg("assets/eq.png");
    gg.eq_pt_img = GenImg("assets/eq_pt.png");
    gg.neq_img = GenImg("assets/neq.png");
    gg.neq_pt_img = GenImg("assets/neq_pt.png");
    gg.exposition_bg_img = GenImg("assets/exposition_bg.png");
    gg.timeline_scrubber_img = GenImg("assets/timeline_scrubber.png");
    gg.timeline_scrubber_large_img = GenImg("assets/timeline_scrubber_large.png");
    gg.arrow_up_img = GenImg("assets/arrow_up.png");
    gg.arrow_down_img = GenImg("assets/arrow_down.png");
    gg.number_bg_img = GenImg("assets/number_bg.png");
    gg.console_img = GenImg("assets/console.png");
    gg.dark_console_img = GenImg("assets/console_dark.png");
    gg.background_img = GenImg("assets/background.jpg");
    gg.background_night_img = GenImg("assets/background_night.jpg");
    gg.background_ui_img = GenImg("assets/background_ui.jpg");
    gg.ui_chart_overlay_img = GenImg("assets/ui_chart_overlay.png");
    gg.constant_bg_img = GenImg("assets/card_editable.png");
    gg.variable_bg_img = GenImg("assets/card_not_editable.png");
    gg.chat_constant_bg_img = GenImg("assets/chat_card.png");
    gg.crycollected_img = GenImg("assets/crycollected.png");
    gg.battery_charge_img = GenImg("assets/battery_charge.png");
    gg.cryinitial_img = GenImg("assets/cryinitial.png");
    gg.cryrate_img = GenImg("assets/cryrate.png");
    gg.chrinitial_img = GenImg("assets/chrinitial.png");
    gg.chrrate_img = GenImg("assets/chrrate.png");
    gg.time_img = GenImg("assets/time.png");
    gg.bezel_img = GenImg("assets/bezel.png");
    gg.boot_btn_img = GenImg("assets/boot_btn.png");
    gg.notice_img = GenImg("assets/alert.png");
    gg.data_img = GenImg("assets/data.png");
    gg.submit_img = GenImg("assets/submit.png");
    gg.neck_heart_img = GenImg("assets/neck_heart.png");
    gg.axis_label_bg_img = GenImg("assets/axis_label_bg.png");
    gg.pano_imgs = [];
    gg.pano_imgs[0] = GenImg("assets/pano_bg.jpg");
    gg.pano_imgs[1] = GenImg("assets/pano_mg.png");
    gg.pano_imgs[2] = GenImg("assets/pano_fg.png");
    gg.pano_imgs_dark = [];
    gg.pano_imgs_dark[0] = GenImg("assets/pano_bg_dark.jpg");
    gg.pano_imgs_dark[1] = GenImg("assets/pano_mg_dark.png");
    gg.pano_imgs_dark[2] = GenImg("assets/pano_fg_dark.png");
    gg.epano_imgs = [];
    gg.epano_imgs[0] = GenImg("assets/epano_bg.jpg");
    gg.epano_imgs[1] = GenImg("assets/epano_mg.png");
    gg.epano_imgs[2] = [];
    gg.epano_imgs[2][0] = GenImg("assets/epano_fg_0.png");
    gg.epano_imgs[2][1] = GenImg("assets/epano_fg_1.png");
    gg.epano_imgs[3] = GenImg("assets/epano_ffg.png");
    gg.battery_img = GenImg("assets/battery.png");
    gg.drill_img = GenImg("assets/drill.png");

    gg.continue_code = getCookie("level");
    gg.input_code = 0;
    gg.input_code_valid = 0;
    gg.input_codes = [
      "stranded", //0
      "goodnews", //1
      "badnews", //2
      "icanfixit", //3
      "status", //4
      "leftovers", //5
      "willitwork", //6
      "solar", //7
      "goodenough", //8
      "dontgo", //9
    ];
    gg.input_output = function(input)
    {
      input = input.toLowerCase();
      for(var i = 0; i < gg.input_codes.length; i++)
        if(input == gg.input_codes[i]) return i;

      //for debugging
      switch(input)
      {
        case "0": return 0;
        case "1": return 1;
        case "2": return 2;
        case "3": return 3;
        case "4": return 4;
        case "5": return 5;
        case "6": return 6;
        case "7": return 7;
        case "8": return 8;
        case "9": return 9;
      }
      return "NOT A NUMBER";
    }
    gg.continuable = 0;
    gg.continue_button = new ButtonBox( 0,0,0,0, function(evt)
    {
      if ((currProgress > 0) && (currProgress < 11))
      {
        loadLevel(currProgress-1);
      }
      else
      {
       // gg.new_button.click({});
      }
      
      /*if(!gg.continue_code) 
        gg.new_button.click({}); 
      else 
      { 
        gg.input_code = gg.input_output(gg.continue_code); 
        gg.input_code_valid = 1; 
        gg.code_button.click({}); 
      }*/
    });
    gg.new_button      = new ButtonBox( 0,0,0,0, function(evt){ self.set_mode(MODE_CINEMATIC,0); });
    /*gg.code_txt        = new DomTextBox(0,0,0,0, gg.canv,"",function(txt)
    {
           if(txt == "")                                                 { gg.code_txt.bg_color = "rgba(255,255,255,0.1)"; gg.input_code_valid = 0; }
      else if(!isNaN(gg.input_output(txt)) && gg.input_output(txt) < 10) { gg.code_txt.bg_color = "rgba(0,255,0,0.1)";     gg.input_code_valid = 1; gg.input_code = gg.input_output(txt); }
      else                                                               { gg.code_txt.bg_color = "rgba(255,0,0,0.1)";     gg.input_code_valid = 0; gg.code_txt.box.value = ""; }
    });*/
    gg.code_button     = new ButtonBox( 0,0,0,0, function(evt)
    {
      /*
      if(gg.code_txt.box_on)
      {
        gg.code_txt.set(gg.code_txt.box.value);
        gg.code_txt.blur();
      }
      if(!gg.input_code_valid || !gg.input_code) gg.new_button.click({});
      else
      {
        gtag('event', 'modeller_level', {'event_category':'jump', 'event_label':''+gg.input_code});
        self.set_mode(MODE_CINEMATIC,1);
        self.set_mode(MODE_BOOT,1);
        self.set_mode(MODE_PRE0,1);
        if(gg.input_code == 1)
        {
          self.skip_to_mode(MODE_NIGHT);
          self.skip_to_mode(MODE_LAB_IN);
          gg.exposition_box.clear();
          gg.exposition_box.nq_group(gg.next_level.text.pre_context);
          self.set_mode(MODE_PRE0,0);
        }
        else
        {
          while(gg.cur_level.i < gg.input_code-1)
          {
            self.skip_to_mode(MODE_NIGHT);
            self.skip_to_mode(MODE_LAB_IN);
          }
          gg.exposition_box.clear();
          gg.exposition_box.nq_group(gg.next_level.text.pre_context);
          self.skip_to_mode(MODE_PRE0);
        }
      }*/
    });
    gg.sound_button = new ToggleBox(0,0,0,0, 1, function(v){
      gg.sound = v;

      if(!gg.sound) { gg.audwrangler.hold();   gg.audwrangler.stop_music(); }
      if( gg.sound) { gg.audwrangler.unhold(); gg.audwrangler.play_music(); }
    });

    gg.fullscreen_button = new ToggleBox(0,0,0,0, 0, function(v){ gg.fullscreen = !gg.fullscreen; if(gg.fullscreen) fullscreen(); else unfullscreen();});

    gg.content_dragger = new content_dragger();
    gg.exposition_box = new exposition_box();
    gg.message_box = new message_box();
    gg.graph = new graph();
    gg.timeline = new timeline();
    gg.table = new table();
    gg.line = new editable_line();
    gg.outro_vid = new Vid(document.getElementById(gg.stage.container), "assets/outro.mp4", function(){ gg.outro_vid.done = 1; },noop)
    gg.outro_vid.load();

    gg.levels = [];
    var l;
    var m;
    var i = 0;

    //check fuel
    l = new level();
    l.i = i;
    l.y_icon = GenImg("assets/crycollected.png");
    l.m_starting = [0,];
    l.m_correct = [1,];
    l.m_label = ["Mining Rate",];
    l.m_icon = [GenImg("assets/cryrate.png"),];
    l.b_starting = [0,];
    l.b_correct = [1,];
    l.b_label = ["Existing Fuel",];
    l.b_icon = [GenImg("assets/cryinitial.png"),];
    l.commit();
    l.t_speed = 0.01;
    l.fast_t_speed = 0.1;
    l.x_label = "HOURS";
    l.y_label = "FUEL (kg)";
    l.day = 0;
    l.y_min = 0;
    for(var j = 0; j < 50; j++)
      l.context_imgs.push(GenImg("assets/context/"+i+"-"+j+".png"));
    l.pano = 0;
    l.pano_st = 0;
    l.pano_et = 1;
    l.skip_context = 0;
    l.skip_zoom = 0;
    l.perma_zoom = 0;
    l.skip_axis = 0;
    l.skip_labels = 0;
    l.skip_system = 1;
    l.skip_night = 0;
    l.push_work = 1;
    l.special = 0;
    l.text = used_text[i];
    gg.levels.push(l);
    i++;

    //fuel increase
    l = new level();
    l.i = i;
    l.y_icon = GenImg("assets/crycollected.png");
    l.m_starting = [gg.levels[l.i-1].m_correct_total,];
    l.m_correct = [4,];
    l.m_label = ["Mining Rate",];
    l.m_icon = [GenImg("assets/cryrate.png"),];
    l.b_starting = [gg.levels[l.i-1].b_correct_total,];
    l.b_correct = [gg.levels[l.i-1].b_correct_total+gg.levels[l.i-1].m_correct_total*24,];
    l.b_label = ["Existing Fuel",];
    l.b_icon = [GenImg("assets/cryinitial.png"),];
    l.commit();
    l.t_speed = 0.01;
    l.fast_t_speed = 0.1;
    l.x_label = "HOURS";
    l.y_label = "FUEL (kg)";
    l.day = 1;
    l.y_min = floor(l.b_correct_total/10)*10;
    for(var j = 0; j < 51; j++)
      l.context_imgs.push(GenImg("assets/context/"+i+"-"+j+".png"));
    l.pano = 0;
    l.pano_st = 0;
    l.pano_et = 1;
    l.skip_context = 0;
    l.skip_zoom = 0;
    l.perma_zoom = 0;
    l.skip_axis = 1;
    l.skip_labels = 1;
    l.skip_system = 1;
    l.skip_night = 0;
    l.push_work = 1;
    l.special = 0;
    l.text = used_text[i];
    gg.levels.push(l);
    i++;

    //fuel return to normal
    l = new level();
    l.i = i;
    l.y_icon = GenImg("assets/crycollected.png");
    l.m_starting = [gg.levels[l.i-1].m_correct_total,];
    l.m_correct = [1,];
    l.m_label = ["Mining Rate",];
    l.m_icon = [GenImg("assets/cryrate.png"),];
    l.b_starting = [gg.levels[l.i-1].b_correct_total,];
    l.b_correct = [gg.levels[l.i-1].b_correct_total+gg.levels[l.i-1].m_correct_total*24,];
    l.b_label = ["Existing Fuel",];
    l.b_icon = [GenImg("assets/cryinitial.png"),];
    l.commit();
    l.t_speed = 0.01;
    l.fast_t_speed = 0.1;
    l.x_label = "HOURS";
    l.y_label = "FUEL (kg)";
    l.day = 2;
    l.y_min = floor(l.b_correct_total/10)*10;
    for(var j = 0; j < 50; j++)
      l.context_imgs.push(GenImg("assets/context/"+i+"-"+j+".png"));
    for(var j = 0; j < 1; j++)
      l.system_imgs.push(GenImg("assets/system/"+i+"-"+j+".png"));
    l.pano = 1;
    l.pano_st = 0;
    l.pano_et = 1;
    l.skip_context = 0;
    l.skip_zoom = 0;
    l.perma_zoom = 0;
    l.skip_axis = 1;
    l.skip_labels = 1;
    l.skip_system = 0;
    l.skip_night = 0;
    l.push_work = 1;
    l.special = 0;
    l.text = used_text[i];
    gg.levels.push(l);
    i++;

    //improve charge rate
    l = new level();
    l.i = i;
    l.y_icon = GenImg("assets/battery_charge.png");
    l.m_starting = [1,];
    l.m_correct = [2,];
    l.m_label = ["Charge Rate",];
    l.m_icon = [GenImg("assets/chrrate.png"),];
    l.b_starting = [0,];
    l.b_correct = [0,];
    l.b_label = ["Starting Charge",];
    l.b_icon = [GenImg("assets/chrinitial.png"),];
    l.commit();
    l.t_speed = 0.01;
    l.fast_t_speed = 0.1;
    l.x_label = "HOURS";
    l.y_label = "CHARGE";
    l.day = 3;
    l.y_min = 0;
    for(var j = 0; j < 34; j++)
      l.context_imgs.push(GenImg("assets/context/"+i+"-"+j+".png"));
    l.pano = 0;
    l.pano_st = 0;
    l.pano_et = 1;
    l.skip_context = 0;
    l.skip_zoom = 1;
    l.perma_zoom = 0;
    l.skip_axis = 0;
    l.skip_labels = 0;
    l.skip_system = 1;
    l.skip_night = 1;
    l.push_work = 0;
    l.special = 0;
    l.text = used_text[i];
    gg.levels.push(l);
    i++;

    //check fuel
    l = new level();
    l.i = i;
    l.y_icon = GenImg("assets/crycollected.png");
    l.m_starting = [gg.levels[l.i-2].m_correct_total,];
    l.m_correct = [1.2,];
    l.m_label = ["Mining Rate",];
    l.m_icon = [GenImg("assets/cryrate.png"),];
    l.b_starting = [gg.levels[l.i-2].b_correct_total,];
    l.b_correct = [gg.levels[l.i-2].b_correct_total+gg.levels[l.i-2].m_correct_total*24,];
    l.b_label = ["Existing Fuel",];
    l.b_icon = [GenImg("assets/cryinitial.png"),];
    l.commit();
    l.t_speed = 0.01;
    l.fast_t_speed = 0.1;
    l.x_label = "HOURS";
    l.y_label = "FUEL (kg)";
    l.day = 3;
    l.y_min = floor(l.b_correct_total/10)*10;
    for(var j = 0; j < 1; j++)
      l.system_imgs.push(GenImg("assets/system/"+i+"-"+j+".png"));
    l.pano = 0;
    l.pano_st = 0;
    l.pano_et = 1;
    l.skip_context = 1;
    l.skip_zoom = 0;
    l.perma_zoom = 0;
    l.skip_axis = 1;
    l.skip_labels = 1;
    l.skip_system = 0;
    l.skip_night = 0;
    l.push_work = 1;
    l.special = 0;
    l.text = used_text[i];
    gg.levels.push(l);
    i++;

    //initial charge rate
    l = new level();
    l.i = i;
    l.y_icon = GenImg("assets/battery_charge.png");
    l.m_starting = [0,];
    l.m_correct = [2,];
    l.m_label = ["Charge Rate",];
    l.m_icon = [GenImg("assets/chrrate.png"),];
    l.b_starting = [0,];
    l.b_correct = [0.2,];
    l.b_label = ["Existing Charge",];
    l.b_icon = [GenImg("assets/chrinitial.png"),];
    l.commit();
    l.t_speed = 0.01;
    l.fast_t_speed = 0.1;
    l.x_label = "HOURS";
    l.y_label = "CHARGE";
    l.day = 4;
    l.y_min = 0;
    for(var j = 0; j < 36; j++)
      l.context_imgs.push(GenImg("assets/context/"+i+"-"+j+".png"));
    l.pano = 0;
    l.pano_st = 0;
    l.pano_et = 1;
    l.skip_context = 0;
    l.skip_zoom = 1;
    l.perma_zoom = 0;
    l.skip_axis = 1;
    l.skip_labels = 1;
    l.skip_system = 1;
    l.skip_night = 1;
    l.push_work = 0;
    l.special = 0;
    l.text = used_text[i];
    gg.levels.push(l);
    i++;

    //check fuel
    l = new level();
    l.i = i;
    l.y_icon = GenImg("assets/crycollected.png");
    l.m_starting = [gg.levels[l.i-2].m_correct_total,];
    l.m_correct = [1.4,];
    l.m_label = ["Mining Rate",];
    l.m_icon = [GenImg("assets/cryrate.png"),];
    l.b_starting = [gg.levels[l.i-2].b_correct_total,];
    l.b_correct = [fdisp(gg.levels[l.i-2].b_correct_total+gg.levels[l.i-2].m_correct_total*24,1),];
    l.b_label = ["Existing Fuel",];
    l.b_icon = [GenImg("assets/cryinitial.png"),];
    l.commit();
    l.t_speed = 0.01;
    l.fast_t_speed = 0.1;
    l.x_label = "HOURS";
    l.y_label = "FUEL (kg)";
    l.day = 4;
    l.y_min = floor(l.b_correct_total/10)*10;
    for(var j = 0; j < 1; j++)
      l.system_imgs.push(GenImg("assets/system/"+i+"-"+j+".png"));
    l.pano = 1;
    l.pano_st = 0;
    l.pano_et = 1;
    l.skip_context = 1;
    l.skip_zoom = 0;
    l.perma_zoom = 0;
    l.skip_axis = 1;
    l.skip_labels = 1;
    l.skip_system = 0;
    l.skip_night = 0;
    l.push_work = 1;
    l.special = 0;
    l.text = used_text[i];
    gg.levels.push(l);
    i++;

    //improve solar panels
    l = new level();
    l.i = i;
    l.y_icon = GenImg("assets/solar-charge.png");
    l.m_starting = [2,];
    l.m_correct = [2.5,];
    l.m_label = ["Charge Rate",];
    l.m_icon = [GenImg("assets/sdrrate.png"),];
    l.b_starting = [0.2,];
    l.b_correct = [0.2,];
    l.b_label = ["Starting Charge",];
    l.b_icon = [GenImg("assets/chrinitial.png"),];
    l.commit();
    l.t_speed = 0.01;
    l.fast_t_speed = 0.1;
    l.x_label = "HOURS";
    l.y_label = "CHARGE";
    l.day = 5;
    l.y_min = 0;
    for(var j = 0; j < 37; j++)
      l.context_imgs.push(GenImg("assets/context/"+i+"-"+j+".png"));
    l.pano = 0;
    l.pano_st = 0;
    l.pano_et = 1;
    l.skip_context = 0;
    l.skip_zoom = 1;
    l.perma_zoom = 0;
    l.skip_axis = 0;
    l.skip_labels = 0;
    l.skip_system = 1;
    l.skip_night = 1;
    l.push_work = 0;
    l.special = 0;
    l.text = used_text[i];
    gg.levels.push(l);
    i++;

    //check fuel
    l = new level();
    l.i = i;
    l.y_icon = GenImg("assets/crycollected.png");
    l.m_starting = [gg.levels[l.i-2].m_correct_total,];
    l.m_correct = [3.2,];
    l.m_label = ["Mining Rate",];
    l.m_icon = [GenImg("assets/cryrate.png"),];
    l.b_starting = [gg.levels[l.i-2].b_correct_total,];
    l.b_correct = [fdisp(gg.levels[l.i-2].b_correct_total+gg.levels[l.i-2].m_correct_total*24,1),];
    l.b_label = ["Existing Fuel",];
    l.b_icon = [GenImg("assets/cryinitial.png"),];
    l.commit();
    l.t_speed = 0.01;
    l.fast_t_speed = 0.1;
    l.x_label = "HOURS";
    l.y_label = "FUEL (kg)";
    l.day = 5;
    l.y_min = floor(l.b_correct_total/10)*10;
    l.pano = 0;
    l.pano_st = 0;
    l.pano_et = 1;
    l.skip_context = 1;
    l.skip_zoom = 0;
    l.perma_zoom = 0;
    l.skip_axis = 1;
    l.skip_labels = 1;
    l.skip_system = 1;
    l.skip_night = 0;
    l.push_work = 1;
    l.special = 0;
    l.text = used_text[i];
    gg.levels.push(l);
    i++;

    //improve drills
    l = new level();
    l.i = i;
    l.y_icon = GenImg("assets/crycollected.png");
    l.m_starting = [floor(gg.levels[l.i-1].m_correct_total*2)/10,0,0,];
    l.m_correct = [2.3,1.2,1.1,];
    l.m_label = ["Drill Rate","Surface Area","Crystal Density",];
    l.m_icon = [GenImg("assets/plungerate.png"),GenImg("assets/area.png"),GenImg("assets/density.png")];
    l.b_starting = [gg.levels[l.i-1].b_correct_total,];
    l.b_correct = [floor(gg.levels[l.i-1].b_correct_total+gg.levels[l.i-1].m_correct_total*24),];
    l.b_label = ["Existing Fuel",];
    l.b_icon = [GenImg("assets/cryinitial.png"),];
    l.commit();
    l.t_speed = 0.01;
    l.fast_t_speed = 0.1;
    l.x_label = "HOURS";
    l.y_label = "FUEL (kg)";
    l.day = 6;
    l.y_min = 0;
    for(var j = 0; j < 1; j++)
      l.context_imgs.push(GenImg("assets/context/"+i+"-"+j+".png"));
    for(var j = 0; j < 44; j++)
      l.system_imgs.push(GenImg("assets/system/"+i+"-"+j+".png"));
    l.pano = 0;
    l.pano_st = 0;
    l.pano_et = 1;
    l.skip_context = 0;
    l.skip_zoom = 0;
    l.perma_zoom = 1;
    l.skip_axis = 0;
    l.skip_labels = 0;
    l.skip_system = 0;
    l.skip_night = 1;
    l.push_work = 1;
    l.special = 1;
    l.text = used_text[i];
    gg.levels.push(l);
    i++;

    self.was_ready = 1;
    self.resize(stage);
    //gg.code_txt.focus();
    //gg.code_txt.blur();
    self.set_mode(MODE_MENU,0);
    gg.urlp = jsonFromURL();
    gg.autoclick = gg.urlp.autoclick;
  };

  gg.time_mod_twelve_pi = 0;
  self.tick = function()
  {
    gg.time_mod_twelve_pi += 0.01;
    if(gg.time_mod_twelve_pi > twelvepi) gg.time_mod_twelve_pi -= twelvepi;

    if(
      (gg.intro_vid && gg.intro_vid.video && !gg.intro_vid.video.paused) ||
      (gg.outro_vid && gg.outro_vid.video && !gg.outro_vid.video.paused)
    )
      ;
    else
    {
      gg.mode_t++;
      gg.stage_t++;
    }
    clicker.filter(gg.screenclicker);
    keyer.filter(gg.keylistener);
    gg.monitor.tick();
    self.tick_mode();

    keyer.flush();
    hoverer.flush();
    clicker.flush();
    wheeler.flush();
    dragger.flush();
    blurer.flush();

    gg.keylistener.advance();
    gg.screenclicker.clicked = 0;
    if(gg.cur_level && gg.cur_level.perma_zoom) gg.graph.zoom = 1;
  };

  self.HACKTXT = function(txt)
  {
    self.txt_lines = textToLines("20px DisposableDroidBB", gg.monitor.w, txt, gg.ctx);
  }
  self.txt_lines = [];
  self.draw = function()
  {
    if(self.txt_lines.length == 0)
      self.HACKTXT("You wake up in a dark room. All you see is the black screen of an old monitor. Your memory starts to return: you were on a routine mission to refurbish an old mining planet. On the way down, a mysterious pulse scrambled your equipment. You used up the last of your fuel making an emergency landing. Somehow, you stumbled across the barren landscape to this abandoned control room. You managed to flip the power switch and then passed out. You check your vitals: only 6 days of oxygen left. You need to find a way off this planet.");
    gg.monitor.draw(); //draws to self- not to screen
    self.draw_mode();
  };

  self.cleanup = function()
  {
    if(keyer)   keyer.detach();   keyer   = 0;
    if(hoverer) hoverer.detach(); hoverer = 0;
    if(clicker) clicker.detach(); clicker = 0;
    if(wheeler) wheeler.detach(); wheeler = 0;
    if(dragger) dragger.detach(); dragger = 0;
    if(blurer)  blurer.detach();  blurer  = 0;
  };

};
