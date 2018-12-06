'use strict';
var GamePlayScene = function(game, stage)
{
  var self = this;

  self.resize = function(s)
  {
    stage = s;
    gg.stage = stage;
    gg.canv = gg.stage.canv;
    gg.canvas = gg.canv.canvas;
    gg.ctx = gg.canv.context;

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

      gg.data_dragger.w = gg.canv.width;
      gg.data_dragger.h = gg.canv.height;
      gg.data_dragger.x = 0;
      gg.data_dragger.y = 0;

      gg.exposition_box.w = gg.canv.width-20;
      gg.exposition_box.h = 100;
      gg.exposition_box.x = 10;
      gg.exposition_box.y = gg.canv.height-10-gg.exposition_box.h;
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

      gg.graph.w = 200;
      gg.graph.h = 200;
      gg.graph.x = gg.canv.width-gg.graph.w-30;
      gg.graph.y = 30;

      gg.timeline.w = gg.table.w;
      gg.timeline.h = 40;
      gg.timeline.x = gg.table.x;
      gg.timeline.y = gg.table.y+5;
      gg.timeline.size();

      gg.line.h = gg.canv.height;
      gg.line.x = gg.message_box.x+gg.message_box.w;
      gg.line.y = 0;
      gg.line.w = gg.canv.width-gg.line.x;
    }

    if(keyer)   keyer.detach();   keyer   = new Keyer({source:gg.canvas});
    if(hoverer) hoverer.detach(); hoverer = new PersistentHoverer({source:gg.canvas});
    if(clicker) clicker.detach(); clicker = new Clicker({source:gg.canvas});
    if(dragger) dragger.detach(); dragger = new Dragger({source:gg.canvas});
    if(blurer)  blurer.detach();  blurer  = new Blurer({source:gg.canvas});
  }

  var keyer;
  var hoverer;
  var clicker;
  var dragger;
  var blurer;

  var ENUM = 0;
  var MODE_NULL          = ENUM; ENUM++;
  var MODE_MENU          = ENUM; ENUM++;
  var MODE_CINEMATIC     = ENUM; ENUM++;
  var MODE_BOOT          = ENUM; ENUM++;
  var MODE_PRE0          = ENUM; ENUM++;
  var MODE_PRE0_TO_CTX   = ENUM; ENUM++;
  var MODE_CTX           = ENUM; ENUM++;
  var MODE_CTX_TO_PRE1   = ENUM; ENUM++;
  var MODE_PRE1          = ENUM; ENUM++;
  var MODE_PRE1_TO_WORK  = ENUM; ENUM++;
  var MODE_WORK          = ENUM; ENUM++;
  var MODE_WORK_TO_POST  = ENUM; ENUM++;
  var MODE_POST          = ENUM; ENUM++;
  var MODE_POST_TO_NIGHT = ENUM; ENUM++;
  var MODE_NIGHT         = ENUM; ENUM++;
  var MODE_NIGHT_TO_PRE0 = ENUM; ENUM++;
  var MODE_COUNT         = ENUM; ENUM++;

  self.reset_level = function()
  {
    gg.cur_level.correct = 0;
    gg.cur_level.text_stage = 1;
    gg.table.data_visible = 0;
    gg.timeline.t = 0;
    gg.timeline.t_target = 0;
    gg.line.consume_cur_level();
  }

  self.draw_home = function()
  {
    strokeBox(gg.lab,gg.ctx);
    drawImageBox(gg.background_img,gg.lab,gg.ctx);
    gg.ctx.imageSmoothingEnabled = 0;
    if(gg.mode == MODE_PRE0_TO_CTX)
    {
      var img = gg.cur_level.feedback_imgs[0];
      drawImageBox(img,gg.monitor,gg.ctx);
      gg.ctx.globalAlpha = 1-gg.mode_p;
      drawImageBox(gg.monitor.screen,gg.monitor,gg.ctx);
      gg.ctx.globalAlpha = 1;
    }
    else if(gg.mode == MODE_CTX)
    {
      var img = gg.cur_level.feedback_imgs[floor((gg.mode_t/gg.feedf_t)%gg.cur_level.feedback_imgs.length)];
      drawImageBox(img,gg.monitor,gg.ctx);
    }
    else if(gg.mode == MODE_CTX_TO_PRE1)
    {
      var img = gg.cur_level.feedback_imgs[gg.cur_level.feedback_imgs.length-1];
      drawImageBox(img,gg.monitor,gg.ctx);
      gg.ctx.globalAlpha = gg.mode_p;
      drawImageBox(gg.monitor.screen,gg.monitor,gg.ctx);
      gg.ctx.globalAlpha = 1;
    }
    else
      drawImageBox(gg.monitor.screen,gg.monitor,gg.ctx);
    gg.ctx.imageSmoothingEnabled = 1;
    drawImageBox(gg.console_img,gg.lab,gg.ctx);
    gg.exposition_box.draw();
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
    gg.data_dragger.draw();
    gg.ctx.drawImage(gg.bezel_img,0,0,gg.canv.width,gg.canv.height);
    gg.ctx.fillStyle = red;
    switch(gg.cur_level.text_stage)
    {
      case 0: //context
      case 1: //lets_go
      case 2: //status
        break;
      case 3: //data
        gg.ctx.fillText("GRAPH GOES HERE",gg.stage.width/2,gg.stage.height/2);
        break;
      case 4: //labels
      case 5: //constants
      case 6: //submit
      case 7: //review
      break;
      case 8: //debrief
        gg.ctx.fillText("GRAPH GOES HERE",gg.stage.width/2,gg.stage.height/2);
        break;
      case 9: //post
        break;
    }
  }

  self.draw_night = function(t)
  {
    var t = lerp(gg.cur_level.pano_st,gg.cur_level.pano_et,t);
    gg.ctx.drawImage(gg.pano_bg_img,0,0,gg.canv.width,gg.canv.height);
    var vis_pano_w = gg.canv.width/gg.canv.height*gg.pano_img.height;
    var pano_sx = 0;
    var pano_ex = gg.pano_img.width-vis_pano_w;
    gg.ctx.drawImage(gg.pano_img,lerp(pano_sx,pano_ex,t),0,vis_pano_w,gg.pano_img.height,0,0,gg.canv.width,gg.canv.height);
    var vis_pano_fg_w = gg.canv.width/gg.canv.height*gg.pano_fg_img.height;
    var pano_fg_sx = 0;
    var pano_fg_ex = gg.pano_fg_img.width-vis_pano_fg_w;
    gg.ctx.drawImage(gg.pano_fg_img,lerp(pano_fg_sx,pano_fg_ex,t),0,vis_pano_fg_w,gg.pano_fg_img.height,0,0,gg.canv.width,gg.canv.height);

    gg.ctx.fillStyle = white;
    gg.ctx.font = "40px DisposableDroidBB";
    gg.ctx.fillText("Day "+gg.cur_level.i, 20,gg.canv.height-80);
    gg.ctx.font = "20px DisposableDroidBB";
    gg.ctx.fillText((14-gg.cur_level.i)+" days of oxygen remain", 20,gg.canv.height-80+30);
  }

  self.set_mode = function(mode)
  {
    gg.mode = mode;
    gg.mode_t = 0;
    gg.mode_p = 0;

    switch(mode)
    {
      case MODE_MENU:
        gg.home_cam.wx = gg.lab.wx;
        gg.home_cam.wy = gg.lab.wy;
        gg.home_cam.ww = gg.lab.ww;
        gg.home_cam.wh = gg.lab.wh;
        screenSpace(gg.home_cam,gg.canv,gg.lab);
        screenSpace(gg.home_cam,gg.canv,gg.monitor);
        break;
      case MODE_CINEMATIC:
        break;
      case MODE_BOOT:
        break;
      case MODE_PRE0:
        gg.home_cam.wx = gg.lab.wx;
        gg.home_cam.wy = gg.lab.wy;
        gg.home_cam.ww = gg.lab.ww;
        gg.home_cam.wh = gg.lab.wh;
        screenSpace(gg.home_cam,gg.canv,gg.lab);
        screenSpace(gg.home_cam,gg.canv,gg.monitor);
        //assume pre_text_0 already enqueued
        gg.cur_level = gg.next_level;
        gg.timeline.t_speed = gg.cur_level.t_speed;
        gg.timeline.fast_t_speed = gg.cur_level.fast_t_speed;
        gg.timeline.t_max = gg.cur_level.x_n;
        gg.graph.v_max = gg.cur_level.y_n;
        self.reset_level();
        gg.message_box.clear();
        break;
      case MODE_PRE0_TO_CTX:
        break;
      case MODE_CTX:
        break;
      case MODE_CTX_TO_PRE1:
        gg.exposition_box.nq_group(gg.cur_level.text.lets_go);
        gg.cur_level.text_stage++;
        break;
      case MODE_PRE1:
        break;
      case MODE_PRE1_TO_WORK:
        gg.message_box.nq_group(gg.cur_level.text.status);
        gg.cur_level.text_stage++;
        break;
      case MODE_WORK:
        gg.home_cam.wx = gg.monitor.wx;
        gg.home_cam.wy = gg.monitor.wy;
        gg.home_cam.ww = gg.monitor.wh/gg.lab.wh*gg.lab.ww;
        gg.home_cam.wh = gg.monitor.wh;
        screenSpace(gg.home_cam,gg.canv,gg.lab);
        screenSpace(gg.home_cam,gg.canv,gg.monitor);
        gg.timeline.fast_sim = 1;
        break;
      case MODE_WORK_TO_POST:
        gg.line.blur();
        gg.exposition_box.clear();
        break;
      case MODE_POST:
        gg.exposition_box.nq_group(gg.cur_level.text.post);
        gg.cur_level.text_stage++;
        break;
      case MODE_POST_TO_NIGHT:
        break;
      case MODE_NIGHT:
        break;
      case MODE_NIGHT_TO_PRE0: //sets next level
        gg.next_level = gg.levels[(gg.cur_level.i+1)%gg.levels.length];
        gg.exposition_box.clear();
        gg.exposition_box.nq_group(gg.next_level.text.context);
        gg.cur_level.text_stage++;
        break;
    }
  }

  self.tick_mode = function()
  {
    switch(gg.mode)
    {
      case MODE_MENU:
        clicker.filter(gg.monitor);
        //if(gg.monitor.clicked)
          self.set_mode(MODE_CINEMATIC);
        break;
      case MODE_CINEMATIC:
      {
        clicker.filter(gg.monitor);
        if(gg.monitor.clicked || gg.keylistener.advance())
          self.set_mode(MODE_BOOT);
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
          var urlj = jsonFromURL();
          if(urlj && urlj["level"]) gg.next_level = gg.levels[parseInt(urlj["level"])];
          else gg.next_level = gg.levels[0];
          gg.exposition_box.clear();
          gg.exposition_box.nq_group(gg.next_level.text.context);
          gg.next_level.text_stage++;
          self.set_mode(MODE_PRE0);
        }
      }
      break;
      case MODE_PRE0:
      {
        gg.mode_p = 0.5;
        clicker.filter(gg.exposition_box);
        if(gg.exposition_box.displayed_i >= gg.exposition_box.texts.length || gg.keylistener.advance())
          self.set_mode(MODE_PRE0_TO_CTX);
        gg.exposition_box.tick();
      }
        break;
      case MODE_PRE0_TO_CTX:
      {
        gg.mode_p = gg.mode_t/gg.fade_t;
        if(gg.mode_p < 1)
        {
        }
        else self.set_mode(MODE_CTX);
      }
        break;
      case MODE_CTX:
        gg.mode_p = gg.mode_t/(gg.feedf_t*gg.cur_level.feedback_imgs.length*2);
        if(gg.mode_p < 1 && !gg.keylistener.advance()) //display feedback
        {
        }
        else self.set_mode(MODE_CTX_TO_PRE1);
        break;
      case MODE_CTX_TO_PRE1:
      {
        gg.mode_p = gg.mode_t/gg.fade_t;
        if(gg.mode_p < 1) //fade to face
        {
        }
        else self.set_mode(MODE_PRE1);
      }
        break;
      case MODE_PRE1:
      {
        gg.mode_p = 0.5;
        clicker.filter(gg.exposition_box);
        if(gg.exposition_box.displayed_i >= gg.exposition_box.texts.length || gg.keylistener.advance())
          self.set_mode(MODE_PRE1_TO_WORK);
        gg.exposition_box.tick();
      }
        break;
      case MODE_PRE1_TO_WORK:
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
          }
          else if(gg.mode_t < gg.zoom_t+gg.fade_t) //fade to work
          {
            var fade_p = (gg.mode_t-gg.fade_t-gg.zoom_t)/gg.fade_t;
          }
        }
        else self.set_mode(MODE_WORK);
      }
        break;
      case MODE_WORK:
      {
        gg.mode_p = 0.5;
        gg.table.tick();
        dragger.filter(gg.data_dragger);
        if(!gg.data_dragger.dragging)
        {
          gg.line.filter(keyer,blurer,dragger,clicker);
          gg.line.tick();
          gg.timeline.filter(dragger,clicker);
          dragger.filter(gg.message_box);
        }

        if(gg.message_box.requested_advance)
        {
          switch(gg.cur_level.text_stage)
          {
            case 0: //context
            case 1: //lets_go
            case 2: //status
              break;
            case 3: //data
              if(gg.cur_level.text.data.length)
              {
                gg.message_box.nq_group(gg.cur_level.text.data);
                gg.cur_level.text_stage++;
              }
              break;
            case 4: //labels
            case 5: //constants
            case 6: //submit
            case 7: //review
              break;
            case 8: //debrief
              if(gg.cur_level.text.debrief.length)
              {
                gg.message_box.nq_group(gg.cur_level.text.debrief);
                gg.cur_level.text_stage++;
              }
              break;
            case 9: //post
              break;
          }
        }
        if((gg.cur_level.correct && gg.message_box.requested_end) || gg.keylistener.advance())
          self.set_mode(MODE_WORK_TO_POST);

        gg.graph.tick();
        gg.timeline.tick();
        gg.cur_level.tick();
        gg.message_box.tick();
        if(!gg.cur_level.correct) gg.message_box.prompt_end = 0;
      }
        break;
      case MODE_WORK_TO_POST:
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
          }
        }
        else self.set_mode(MODE_POST);
      }
        break;
      case MODE_POST:
      {
        clicker.filter(gg.exposition_box);
        if(gg.exposition_box.displayed_i >= gg.exposition_box.texts.length || gg.keylistener.advance())
          self.set_mode(MODE_POST_TO_NIGHT);
        gg.exposition_box.tick();
      }
        break;
      case MODE_POST_TO_NIGHT:
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
        else self.set_mode(MODE_NIGHT);
      }
        break;
      case MODE_NIGHT:
        gg.mode_p = gg.mode_t/gg.pano_t;
        if(gg.mode_t < gg.pano_t && !gg.keylistener.advance()) //display night
        {
          var pan_p = gg.mode_t/gg.pano_t;
        }
        else self.set_mode(MODE_NIGHT_TO_PRE0);
        break;
      case MODE_NIGHT_TO_PRE0:
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
        else self.set_mode(MODE_PRE0);
      }
        break;
    }
  }

  self.draw_mode = function()
  {
    switch(gg.mode)
    {
      case MODE_MENU:
      {
        self.draw_home();
        drawImageBox(gg.dark_console_img,gg.lab,gg.ctx);
      }
        break;
      case MODE_CINEMATIC:
      {
        self.draw_home();
        drawImageBox(gg.dark_console_img,gg.lab,gg.ctx);
        var s = 40;
        gg.ctx.drawImage(gg.notice_img,gg.monitor.x+gg.monitor.w-s/2,gg.monitor.y-s/2,s,s);
        gg.ctx.fillStyle = white;
        gg.ctx.font = "20px DisposableDroidBB";
        for(var i = 0; i < self.txt_lines.length; i++)
          gg.ctx.fillText(self.txt_lines[i],gg.monitor.x+10,gg.monitor.y+30+i*25);
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
      case MODE_PRE0_TO_CTX:
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
      case MODE_CTX_TO_PRE1:
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
      case MODE_PRE1_TO_WORK:
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
      case MODE_WORK_TO_POST:
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
      case MODE_POST:
        self.draw_home();
        break;
      case MODE_POST_TO_NIGHT:
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
      case MODE_NIGHT_TO_PRE0:
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
    }
  }

  self.ready = function()
  {
    gg.home_cam = {wx:0,wy:0,ww:0,wh:0};
    gg.monitor  = new monitor();
    gg.lab      = {wx:0,wy:0,ww:0,wh:0,x:0,y:0,w:0,h:0};
    gg.fade_t = 20;
    gg.zoom_t = 50;
    gg.feedf_t = 30;
    gg.pano_t = 250;

    gg.keylistener = {last_key:0,key_down:function(evt){ gg.keylistener.last_key = evt.keyCode; },advance:function(){if(gg.keylistener.last_key == 32 /*space*/) { gg.keylistener.last_key = 0; return 1; } else { gg.keylistener.last_key = 0; return 0; } }};

    gg.eq_img = GenImg("assets/eq.png");
    gg.eq_pt_img = GenImg("assets/eq_pt.png");
    gg.neq_img = GenImg("assets/neq.png");
    gg.neq_pt_img = GenImg("assets/neq_pt.png");
    gg.timeline_scrubber_img = GenImg("assets/timeline_scrubber.png");
    gg.arrow_up_img = GenImg("assets/arrow_up.png");
    gg.arrow_down_img = GenImg("assets/arrow_down.png");
    gg.number_bg_img = GenImg("assets/number_bg.png");
    gg.console_img = GenImg("assets/console.png");
    gg.dark_console_img = GenImg("assets/console_dark.png");
    gg.background_img = GenImg("assets/background.jpg");
    gg.background_ui_img = GenImg("assets/background_ui.jpg");
    gg.bezel_img = GenImg("assets/bezel.png");
    gg.notice_img = GenImg("assets/alert.png");
    gg.data_img = GenImg("assets/data.png");
    gg.submit_img = GenImg("assets/submit.png");
    gg.neck_heart_img = GenImg("assets/neck_heart.png");
    gg.pano_bg_img = GenImg("assets/pano_bg.jpg");
    gg.pano_fg_img = GenImg("assets/pano_fg.png");
    gg.pano_img = GenImg("assets/pano.png");
    gg.battery_img = GenImg("assets/battery.png");
    gg.drill_img = GenImg("assets/drill.png");

    gg.data_dragger = new data_dragger();
    gg.exposition_box = new exposition_box();
    gg.message_box = new message_box();
    gg.graph = new graph();
    gg.timeline = new timeline();
    gg.table = new table();
    gg.line = new editable_line();

    gg.levels = [];
    var l;
    var m;
    var i = 0;

    //line
    l = new level();
    l.i = i;
    l.m_starting = [0,];
    l.m_correct = [1,];
    l.m_label = ["rate",];
    l.m_icon = [GenImg("assets/shadow.png"),];
    l.b_starting = [0,];
    l.b_correct = [1,];
    l.b_label = ["initial",];
    l.b_icon = [GenImg("assets/shadow.png"),];
    l.x_n = 10;
    l.y_n = 10;
    l.t_speed = 0.01;
    l.fast_t_speed = 0.1;
    l.x_label = "HOURS";
    l.y_label = "CRYSTALS";
    for(var j = 0; j < 3; j++)
      l.feedback_imgs.push(GenImg("assets/feedback/"+i+"-"+j+".jpg"));
    l.pano_st = 0;
    l.pano_et = 0.05;
    l.text = used_text[i];
    gg.levels.push(l);
    i++;

    self.was_ready = 1;
    self.resize(stage);
    self.set_mode(MODE_MENU);
    /*
    for(var i = 0; i < 100; i++) self.tick();
    self.set_mode(MODE_CINEMATIC);
    for(var i = 0; i < 100; i++) self.tick();
    self.set_mode(MODE_BOOT);
    for(var i = 0; i < 100; i++) self.tick();
    self.set_mode(MODE_PRE0);
    for(var i = 0; i < 100; i++) self.tick();
    self.set_mode(MODE_PRE0_TO_CTX);
    for(var i = 0; i < 100; i++) self.tick();
    self.set_mode(MODE_CTX);
    for(var i = 0; i < 100; i++) self.tick();
    self.set_mode(MODE_CTX_TO_PRE1);
    for(var i = 0; i < 100; i++) self.tick();
    self.set_mode(MODE_PRE1);
    for(var i = 0; i < 100; i++) self.tick();
    self.set_mode(MODE_PRE1_TO_WORK);
    for(var i = 0; i < 100; i++) self.tick();
    self.set_mode(MODE_WORK);
    for(var i = 0; i < 100; i++) self.tick();
    self.set_mode(MODE_WORK_TO_POST);
    for(var i = 0; i < 100; i++) self.tick();
    self.set_mode(MODE_POST);
    for(var i = 0; i < 100; i++) self.tick();
    self.set_mode(MODE_POST_TO_NIGHT);
    for(var i = 0; i < 100; i++) self.tick();
    self.set_mode(MODE_NIGHT);
    for(var i = 0; i < 100; i++) self.tick();
    self.set_mode(MODE_NIGHT_TO_PRE0);
    for(var i = 0; i < 100; i++) self.tick();
    //*/
  };

  self.tick = function()
  {
    gg.mode_t++;
    keyer.filter(gg.keylistener);
    gg.monitor.tick();
    self.tick_mode();

    keyer.flush();
    hoverer.flush();
    clicker.flush();
    dragger.flush();
    blurer.flush();

    gg.keylistener.advance();
  };

  self.HACKTXT = function(txt)
  {
    self.txt_lines = textToLines("20px DisposableDroidBB", gg.monitor.w, txt, gg.ctx);
  }
  self.txt_lines = [];
  self.draw = function()
  {
    if(self.txt_lines.length == 0)
      self.HACKTXT(`     You wake up in a dark room. All you see is the black screen of an old monitor.                       Your memory starts to return: you were on a routine mission to refurbish an old mining planet.      But before your ship was able to touch down, something went wrong. You must have stumbled into this abandoned control center and passed out.                                                   You check your vitals- uh oh. Only 14 days worth of oxygen left, and your ship is out of fuel.                                                            You need to find a way off this planet.
        `
      );
    gg.monitor.draw(); //draws to self- not to screen
    self.draw_mode();
  };

  self.cleanup = function()
  {
    if(keyer)   keyer.detach();   keyer   = 0;
    if(hoverer) hoverer.detach(); hoverer = 0;
    if(clicker) clicker.detach(); clicker = 0;
    if(dragger) dragger.detach(); dragger = 0;
    if(blurer)  blurer.detach();  blurer  = 0;
  };

};
