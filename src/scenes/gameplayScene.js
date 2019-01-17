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

      gg.content_dragger.w = gg.canv.width;
      gg.content_dragger.h = gg.canv.height;
      gg.content_dragger.x = 0;
      gg.content_dragger.y = 0;

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

      gg.graph.w = gg.canv.width-gg.message_box.w-150-30;
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

      gg.screenclicker.x = 0;
      gg.screenclicker.y = 0;
      gg.screenclicker.w = gg.canv.width;
      gg.screenclicker.h = gg.canv.height;

      gg.intro_vid.video.style.width = gg.canv.width;
      gg.intro_vid.video.style.height = gg.canv.height;
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
  var MODE_NULL        = ENUM; ENUM++;
  var MODE_MENU        = ENUM; ENUM++;
  var MODE_CINEMATIC   = ENUM; ENUM++;
  var MODE_BOOT        = ENUM; ENUM++;
  var MODE_PRE0        = ENUM; ENUM++;
  var MODE_CTX_IN      = ENUM; ENUM++;
  var MODE_CTX         = ENUM; ENUM++;
  var MODE_CTX_OUT     = ENUM; ENUM++;
  var MODE_PRE1        = ENUM; ENUM++;
  var MODE_WORK_IN     = ENUM; ENUM++;
  var MODE_WORK        = ENUM; ENUM++;
  var MODE_WORK_OUT    = ENUM; ENUM++;
  var MODE_POST0       = ENUM; ENUM++;
  var MODE_IMPROVE_IN  = ENUM; ENUM++;
  var MODE_IMPROVE     = ENUM; ENUM++;
  var MODE_IMPROVE_OUT = ENUM; ENUM++;
  var MODE_POST1       = ENUM; ENUM++;
  var MODE_LAB_OUT     = ENUM; ENUM++;
  var MODE_NIGHT       = ENUM; ENUM++;
  var MODE_LAB_IN      = ENUM; ENUM++;
  var MODE_COUNT       = ENUM; ENUM++;

  self.reset_level = function()
  {
    gg.cur_level.correct = 0;
    gg.cur_level.progress = 1;
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
    if(gg.mode == MODE_CTX_IN)
    {
      var img = gg.cur_level.feedback_imgs[0];
      drawImageBox(img,gg.monitor,gg.ctx);
      gg.ctx.globalAlpha = 1-gg.mode_p;
      drawImageBox(gg.monitor.screen,gg.monitor,gg.ctx);
      gg.ctx.globalAlpha = 1;
    }
    else if(gg.mode == MODE_CTX)
    {
      var img = gg.cur_level.feedback_imgs[floor((gg.mode_t/gg.ctxf_t)%gg.cur_level.feedback_imgs.length)];
      drawImageBox(img,gg.monitor,gg.ctx);
    }
    else if(gg.mode == MODE_CTX_OUT)
    {
      var img = gg.cur_level.feedback_imgs[gg.cur_level.feedback_imgs.length-1];
      drawImageBox(img,gg.monitor,gg.ctx);
      gg.ctx.globalAlpha = gg.mode_p;
      drawImageBox(gg.monitor.screen,gg.monitor,gg.ctx);
      gg.ctx.globalAlpha = 1;
    }
    else if(gg.mode == MODE_IMPROVE_IN)
    {
      var img = gg.cur_level.feedback_imgs[0];
      drawImageBox(img,gg.monitor,gg.ctx);
      gg.ctx.globalAlpha = 1-gg.mode_p;
      drawImageBox(gg.monitor.screen,gg.monitor,gg.ctx);
      gg.ctx.globalAlpha = 1;
    }
    else if(gg.mode == MODE_IMPROVE)
    {
      var img = gg.cur_level.feedback_imgs[floor((gg.mode_t/gg.ctxf_t)%gg.cur_level.feedback_imgs.length)];
      drawImageBox(img,gg.monitor,gg.ctx);
    }
    else if(gg.mode == MODE_IMPROVE_OUT)
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
    if(gg.exposition_box.blackout_t)
    {
      var t = gg.exposition_box.blackout_t/gg.blackout_t;
      gg.ctx.fillStyle = black;
      gg.ctx.globalAlpha = 1-t;
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
      }
      else
      {
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
    var t = lerp(gg.cur_level.pano_st,gg.cur_level.pano_et,t);

    var panos = gg.pano_imgs;
    if(gg.cur_level.pano == 1) panos = gg.epano_imgs;
    var pimg;
    var vis_pano_w;
    var pano_sx;
    var pano_ex;
    for(var i = 0; i < panos.length; i++)
    {
      pimg = panos[i];
      vis_pano_w = gg.canv.width/gg.canv.height*pimg.height;
      pano_sx = 0;
      pano_ex = pimg.width-vis_pano_w;
      gg.ctx.drawImage(pimg,lerp(pano_sx,pano_ex,t),0,vis_pano_w,pimg.height,0,0,gg.canv.width,gg.canv.height);
    }

    gg.ctx.fillStyle = white;
    gg.ctx.font = "40px DisposableDroidBB";
    gg.ctx.fillText("Day "+gg.cur_level.day, 20,gg.canv.height-80);
    gg.ctx.font = "20px DisposableDroidBB";
    gg.ctx.fillText((gg.max_days-gg.cur_level.day)+" days of oxygen remain", 20,gg.canv.height-80+30);
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
        gg.home_cam.wx = gg.lab.wx;
        gg.home_cam.wy = gg.lab.wy;
        gg.home_cam.ww = gg.lab.ww;
        gg.home_cam.wh = gg.lab.wh;
        screenSpace(gg.home_cam,gg.canv,gg.lab);
        screenSpace(gg.home_cam,gg.canv,gg.monitor);
        break;
      case MODE_CINEMATIC:
        gg.intro_vid.play();
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
        gg.graph.x_off = gg.cur_level.day*24;
        gg.graph.y0_min = gg.cur_level.y_min;
        gg.graph.y0_max = gg.graph.y0_min+10;
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
        gg.timeline.fast_sim = 1;
        break;
      case MODE_WORK_OUT:
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
        break;
      case MODE_NIGHT:
        break;
      case MODE_LAB_IN: //sets next level
        gg.next_level = gg.levels[(gg.cur_level.i+1)%gg.levels.length];
        gg.exposition_box.clear();
        if(!skipping) gg.exposition_box.nq_group(gg.next_level.text.pre_context);
        gg.cur_level.progress++;
        gg.stage_t = 0;
        break;
    }
  }

  self.skip_to_mode = function(mode)
  {
    var nmode;
    while(gg.mode != mode)
    {
      nmode = gg.mode+1;
      if(gg.mode == MODE_LAB_IN) nmode = MODE_PRE0;

      if(mode == nmode) self.set_mode(nmode,0)
      else self.set_mode(nmode,1)
    }
  }

  self.tick_mode = function()
  {
    switch(gg.mode)
    {
      case MODE_MENU:
        if(!clicker.filter(gg.monitor) && gg.screenclicker.clicked) gg.monitor.click({});
        //if(gg.monitor.clicked)
          self.set_mode(MODE_CINEMATIC,0);
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
          var urlj = jsonFromURL();
          if(urlj && urlj["level"]) gg.next_level = gg.levels[parseInt(urlj["level"])];
          else gg.next_level = gg.levels[0];
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
        if(!clicker.filter(gg.exposition_box) && gg.screenclicker.clicked) gg.exposition_box.click({});
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
        if(!clicker.filter(gg.exposition_box) && gg.screenclicker.clicked) gg.exposition_box.click({});
        if(gg.mode_p < 1)
        {
        }
        else self.set_mode(MODE_CTX,0);
      }
        break;
      case MODE_CTX:
      {
        gg.mode_p = gg.mode_t/(gg.ctxf_t*gg.cur_level.feedback_imgs.length*2);
        if(!clicker.filter(gg.exposition_box) && gg.screenclicker.clicked) gg.exposition_box.click({});
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
        if(!clicker.filter(gg.exposition_box) && gg.screenclicker.clicked) gg.exposition_box.click({});
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
          if(check) check = !dragger.filter(gg.message_box);
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
              gg.graph.zoom = 1;
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
        if((gg.cur_level.correct && gg.message_box.requested_end) || gg.keylistener.advance())
          self.set_mode(MODE_WORK_OUT,0);

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
          }
        }
        else self.set_mode(MODE_POST0,0);
      }
        break;
      case MODE_POST0:
      {
        if(!clicker.filter(gg.exposition_box) && gg.screenclicker.clicked) gg.exposition_box.click({});
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
        gg.mode_p = gg.mode_t/(gg.ctxf_t*gg.cur_level.feedback_imgs.length*2);
        if(gg.mode_p < 1 && !gg.keylistener.advance()) //display feedback
        {
        }
        else self.set_mode(MODE_IMPROVE_OUT,0);
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
        if(!clicker.filter(gg.exposition_box) && gg.screenclicker.clicked) gg.exposition_box.click({});
        if(gg.exposition_box.displayed_i >= gg.exposition_box.texts.length || gg.keylistener.advance())
        {
          if(gg.cur_level.skip_night)
            self.skip_to_mode(MODE_WORK_IN);
          else
            self.set_mode(MODE_LAB_OUT,0);
        }
        gg.exposition_box.tick();
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
        else self.set_mode(MODE_PRE0,0);
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
    }
  }

  self.ready = function()
  {
    gg.max_days = 6;
    gg.needed_fuel = 400;
    gg.home_cam = {wx:0,wy:0,ww:0,wh:0};
    gg.monitor  = new monitor();
    gg.lab      = {wx:0,wy:0,ww:0,wh:0,x:0,y:0,w:0,h:0};
    gg.fade_t = 20;
    gg.zoom_t = 50;
    gg.ctxf_t = 4;
    gg.pano_t = 250;
    gg.emp_t = 250;
    gg.emp_start_boot_t = 10;
    gg.blackout_t = 100;

    gg.keylistener = {last_key:0,key_down:function(evt){ gg.keylistener.last_key = evt.keyCode; },advance:function(){if(gg.keylistener.last_key == 32 /*space*/) { if(!gg.intro_vid.done) gg.intro_vid.stop(); gg.keylistener.last_key = 0; return 1; } else { gg.keylistener.last_key = 0; return 0; } }};
    gg.screenclicker = {x:0,y:0,w:0,h:0,click:function(evt){gg.screenclicker.clicked = 1;}};

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
    gg.constant_bg_img = GenImg("assets/constant_bg.png");
    gg.crycollected_img = GenImg("assets/crycollected.png");
    gg.cryinitial_img = GenImg("assets/cryinitial.png");
    gg.cryrate_img = GenImg("assets/cryrate.png");
    gg.chrinitial_img = GenImg("assets/chrinitial.png");
    gg.chrrate_img = GenImg("assets/chrrate.png");
    gg.time_img = GenImg("assets/time.png");
    gg.bezel_img = GenImg("assets/bezel.png");
    gg.notice_img = GenImg("assets/alert.png");
    gg.data_img = GenImg("assets/data.png");
    gg.submit_img = GenImg("assets/submit.png");
    gg.neck_heart_img = GenImg("assets/neck_heart.png");
    gg.pano_imgs = [];
    gg.pano_imgs[0] = GenImg("assets/pano_bg.jpg");
    gg.pano_imgs[1] = GenImg("assets/pano_mg.png");
    gg.pano_imgs[2] = GenImg("assets/pano_fg.png");
    gg.epano_imgs = [];
    gg.epano_imgs[0] = GenImg("assets/epano_bg.jpg");
    gg.epano_imgs[1] = GenImg("assets/epano_mg.png");
    gg.epano_imgs[2] = GenImg("assets/epano_fg.png");
    gg.epano_imgs[3] = GenImg("assets/epano_ffg.png");
    gg.battery_img = GenImg("assets/battery.png");
    gg.drill_img = GenImg("assets/drill.png");

    gg.content_dragger = new content_dragger();
    gg.exposition_box = new exposition_box();
    gg.message_box = new message_box();
    gg.graph = new graph();
    gg.timeline = new timeline();
    gg.table = new table();
    gg.line = new editable_line();
    gg.intro_vid = new Vid(document.getElementById(gg.stage.container), "assets/intro.mp4", function(){gg.intro_vid.done = 1;})
    gg.intro_vid.load();

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
    l.t_speed = 0.01;
    l.fast_t_speed = 0.1;
    l.x_label = "HOURS";
    l.y_label = "FUEL";
    l.day = 0;
    l.y_min = 0;
    for(var j = 0; j < 90; j++)
      l.feedback_imgs.push(GenImg("assets/feedback/"+i+"-"+j+".png"));
    for(var j = 0; j < 0; j++)
      l.system_imgs.push(GenImg("assets/system/"+i+"-"+j+".jpg"));
    l.pano = 0;
    l.pano_st = 0;
    l.pano_et = 0.05;
    l.skip_context = 0;
    l.skip_zoom = 0;
    l.skip_axis = 0;
    l.skip_labels = 0;
    l.skip_system = 1;
    l.skip_night = 0;
    l.push_work = 1;
    l.text = used_text[i];
    l.fmt();
    gg.levels.push(l);
    i++;

    //fuel increase
    l = new level();
    l.i = i;
    l.y_icon = GenImg("assets/crycollected.png");
    l.m_starting = [gg.levels[l.i-1].m_correct[0],];
    l.m_correct = [2,];
    l.m_label = ["Mining Rate",];
    l.m_icon = [GenImg("assets/cryrate.png"),];
    l.b_starting = [gg.levels[l.i-1].b_correct[0],];
    l.b_correct = [gg.levels[l.i-1].b_correct[0]+gg.levels[l.i-1].m_correct[0]*24,];
    l.b_label = ["Existing Fuel",];
    l.b_icon = [GenImg("assets/cryinitial.png"),];
    l.t_speed = 0.01;
    l.fast_t_speed = 0.1;
    l.x_label = "HOURS";
    l.y_label = "FUEL";
    l.day = 1;
    l.y_min = 20;
    for(var j = 0; j < 90; j++)
      l.feedback_imgs.push(GenImg("assets/feedback/"+i+"-"+j+".png"));
    for(var j = 0; j < 0; j++)
      l.system_imgs.push(GenImg("assets/system/"+i+"-"+j+".jpg"));
    l.pano = 0;
    l.pano_st = 0;
    l.pano_et = 0.05;
    l.skip_context = 0;
    l.skip_zoom = 0;
    l.skip_axis = 1;
    l.skip_labels = 1;
    l.skip_system = 1;
    l.skip_night = 0;
    l.push_work = 1;
    l.text = used_text[i];
    l.fmt();
    gg.levels.push(l);
    i++;

    //fuel return to normal
    l = new level();
    l.i = i;
    l.y_icon = GenImg("assets/crycollected.png");
    l.m_starting = [gg.levels[l.i-1].m_correct[0],];
    l.m_correct = [1,];
    l.m_label = ["Mining Rate",];
    l.m_icon = [GenImg("assets/cryrate.png"),];
    l.b_starting = [gg.levels[l.i-1].b_correct[0],];
    l.b_correct = [gg.levels[l.i-1].b_correct[0]+gg.levels[l.i-1].m_correct[0]*24,];
    l.b_label = ["Existing Fuel",];
    l.b_icon = [GenImg("assets/cryinitial.png"),];
    l.t_speed = 0.01;
    l.fast_t_speed = 0.1;
    l.x_label = "HOURS";
    l.y_label = "FUEL";
    l.day = 2;
    l.y_min = 20;
    for(var j = 0; j < 90; j++)
      l.feedback_imgs.push(GenImg("assets/feedback/"+i+"-"+j+".png"));
    for(var j = 0; j < 0; j++)
      l.system_imgs.push(GenImg("assets/system/"+i+"-"+j+".jpg"));
    l.pano = 0;
    l.pano_st = 0;
    l.pano_et = 0.05;
    l.skip_context = 0;
    l.skip_zoom = 0;
    l.skip_axis = 1;
    l.skip_labels = 1;
    l.skip_system = 0;
    l.skip_night = 0;
    l.push_work = 1;
    l.text = used_text[i];
    l.fmt();
    gg.levels.push(l);
    i++;

    //improve charge rate
    l = new level();
    l.i = i;
    l.y_icon = GenImg("assets/crycollected.png");
    l.m_starting = [0.5,];
    l.m_correct = [1,];
    l.m_label = ["Rate",];
    l.m_icon = [GenImg("assets/chrrate.png"),];
    l.b_starting = [0,];
    l.b_correct = [0,];
    l.b_label = ["Initial",];
    l.b_icon = [GenImg("assets/chrinitial.png"),];
    l.t_speed = 0.01;
    l.fast_t_speed = 0.1;
    l.x_label = "HOURS";
    l.y_label = "CHARGE";
    l.day = 3;
    l.y_min = 0;
    for(var j = 0; j < 1; j++)
      l.feedback_imgs.push(GenImg("assets/feedback/"+i+"-"+j+".png"));
    for(var j = 0; j < 0; j++)
      l.system_imgs.push(GenImg("assets/system/"+i+"-"+j+".jpg"));
    l.pano = 0;
    l.pano_st = 0;
    l.pano_et = 0.05;
    l.skip_context = 0;
    l.skip_zoom = 1;
    l.skip_axis = 0;
    l.skip_labels = 0;
    l.skip_system = 1;
    l.skip_night = 1;
    l.push_work = 0;
    l.text = used_text[i];
    l.fmt();
    gg.levels.push(l);
    i++;

    //check fuel
    l = new level();
    l.i = i;
    l.y_icon = GenImg("assets/crycollected.png");
    l.m_starting = [gg.levels[l.i-2].m_correct[0],];
    l.m_correct = [1.1,];
    l.m_label = ["Rate",];
    l.m_icon = [GenImg("assets/cryrate.png"),];
    l.b_starting = [gg.levels[l.i-2].b_correct[0],];
    l.b_correct = [gg.levels[l.i-2].b_correct[0]+gg.levels[l.i-2].m_correct[0]*24,];
    l.b_label = ["Initial",];
    l.b_icon = [GenImg("assets/cryinitial.png"),];
    l.t_speed = 0.01;
    l.fast_t_speed = 0.1;
    l.x_label = "HOURS";
    l.y_label = "FUEL";
    l.day = 3;
    l.y_min = 65;
    for(var j = 0; j < 1; j++)
      l.feedback_imgs.push(GenImg("assets/feedback/"+i+"-"+j+".png"));
    for(var j = 0; j < 0; j++)
      l.system_imgs.push(GenImg("assets/system/"+i+"-"+j+".jpg"));
    l.pano = 0;
    l.pano_st = 0;
    l.pano_et = 0.05;
    l.skip_context = 1;
    l.skip_zoom = 0;
    l.skip_axis = 1;
    l.skip_labels = 1;
    l.skip_system = 1;
    l.skip_night = 0;
    l.push_work = 1;
    l.text = used_text[i];
    l.fmt();
    gg.levels.push(l);
    i++;

    //initial charge rate
    l = new level();
    l.i = i;
    l.y_icon = GenImg("assets/crycollected.png");
    l.m_starting = [0,];
    l.m_correct = [1,];
    l.m_label = ["Rate",];
    l.m_icon = [GenImg("assets/chrrate.png"),];
    l.b_starting = [0,];
    l.b_correct = [0.2,];
    l.b_label = ["Initial",];
    l.b_icon = [GenImg("assets/chrinitial.png"),];
    l.t_speed = 0.01;
    l.fast_t_speed = 0.1;
    l.x_label = "HOURS";
    l.y_label = "CHARGE";
    l.day = 4;
    l.y_min = 0;
    for(var j = 0; j < 0; j++)
      l.feedback_imgs.push(GenImg("assets/feedback/"+i+"-"+j+".png"));
    for(var j = 0; j < 0; j++)
      l.system_imgs.push(GenImg("assets/system/"+i+"-"+j+".jpg"));
    l.pano = 0;
    l.pano_st = 0;
    l.pano_et = 0.05;
    l.skip_context = 0;
    l.skip_zoom = 1;
    l.skip_axis = 1;
    l.skip_labels = 1;
    l.skip_system = 1;
    l.skip_night = 1;
    l.push_work = 0;
    l.text = used_text[i];
    l.fmt();
    gg.levels.push(l);
    i++;

    //check fuel
    l = new level();
    l.i = i;
    l.y_icon = GenImg("assets/crycollected.png");
    l.m_starting = [gg.levels[l.i-2].m_correct[0],];
    l.m_correct = [1.2,];
    l.m_label = ["Rate",];
    l.m_icon = [GenImg("assets/cryrate.png"),];
    l.b_starting = [gg.levels[l.i-2].b_correct[0],];
    l.b_correct = [gg.levels[l.i-2].b_correct[0]+gg.levels[l.i-2].m_correct[0]*24,];
    l.b_label = ["Initial",];
    l.b_icon = [GenImg("assets/cryinitial.png"),];
    l.t_speed = 0.01;
    l.fast_t_speed = 0.1;
    l.x_label = "HOURS";
    l.y_label = "FUEL";
    l.day = 4;
    l.y_min = 0;
    for(var j = 0; j < 0; j++)
      l.feedback_imgs.push(GenImg("assets/feedback/"+i+"-"+j+".png"));
    for(var j = 0; j < 0; j++)
      l.system_imgs.push(GenImg("assets/system/"+i+"-"+j+".jpg"));
    l.pano = 0;
    l.pano_st = 0;
    l.pano_et = 0.05;
    l.skip_context = 1;
    l.skip_zoom = 0;
    l.skip_axis = 1;
    l.skip_labels = 1;
    l.skip_system = 0;
    l.skip_night = 0;
    l.push_work = 1;
    l.text = used_text[i];
    l.fmt();
    gg.levels.push(l);
    i++;

    //improve solar panels
    l = new level();
    l.i = i;
    l.y_icon = GenImg("assets/crycollected.png");
    l.m_starting = [0.5,];
    l.m_correct = [1,];
    l.m_label = ["Rate",];
    l.m_icon = [GenImg("assets/chrrate.png"),];
    l.b_starting = [0,];
    l.b_correct = [0,];
    l.b_label = ["Initial",];
    l.b_icon = [GenImg("assets/chrinitial.png"),];
    l.t_speed = 0.01;
    l.fast_t_speed = 0.1;
    l.x_label = "HOURS";
    l.y_label = "CHARGE";
    l.day = 5;
    l.y_min = 0;
    for(var j = 0; j < 1; j++)
      l.feedback_imgs.push(GenImg("assets/feedback/"+i+"-"+j+".png"));
    for(var j = 0; j < 0; j++)
      l.system_imgs.push(GenImg("assets/system/"+i+"-"+j+".jpg"));
    l.pano = 0;
    l.pano_st = 0;
    l.pano_et = 0.05;
    l.skip_context = 0;
    l.skip_zoom = 1;
    l.skip_axis = 0;
    l.skip_labels = 0;
    l.skip_system = 1;
    l.skip_night = 1;
    l.push_work = 0;
    l.text = used_text[i];
    l.fmt();
    gg.levels.push(l);
    i++;

    //check fuel
    l = new level();
    l.i = i;
    l.y_icon = GenImg("assets/crycollected.png");
    l.m_starting = [gg.levels[l.i-2].m_correct[0],];
    l.m_correct = [1.1,];
    l.m_label = ["Rate",];
    l.m_icon = [GenImg("assets/cryrate.png"),];
    l.b_starting = [gg.levels[l.i-2].b_correct[0],];
    l.b_correct = [gg.levels[l.i-2].b_correct[0]+gg.levels[l.i-2].m_correct[0]*24,];
    l.b_label = ["Initial",];
    l.b_icon = [GenImg("assets/cryinitial.png"),];
    l.t_speed = 0.01;
    l.fast_t_speed = 0.1;
    l.x_label = "HOURS";
    l.y_label = "FUEL";
    l.day = 5;
    l.y_min = 0;
    for(var j = 0; j < 1; j++)
      l.feedback_imgs.push(GenImg("assets/feedback/"+i+"-"+j+".png"));
    for(var j = 0; j < 0; j++)
      l.system_imgs.push(GenImg("assets/system/"+i+"-"+j+".jpg"));
    l.pano = 0;
    l.pano_st = 0;
    l.pano_et = 0.05;
    l.skip_context = 1;
    l.skip_zoom = 0;
    l.skip_axis = 0;
    l.skip_labels = 0;
    l.skip_system = 0;
    l.skip_night = 0;
    l.push_work = 1;
    l.text = used_text[i];
    l.fmt();
    gg.levels.push(l);
    i++;

    //improve drills
    l = new level();
    l.i = i;
    l.y_icon = GenImg("assets/crycollected.png");
    l.m_starting = [gg.levels[l.i-1].m_correct[0],];
    l.m_correct = [1,];
    l.m_label = ["Rate",];
    l.m_icon = [GenImg("assets/chrrate.png"),];
    l.b_starting = [gg.levels[l.i-1].b_correct[0],];
    l.b_correct = [gg.levels[l.i-1].b_correct[0]+gg.levels[l.i-1].m_correct[0]*24,];
    l.b_label = ["Initial",];
    l.b_icon = [GenImg("assets/chrinitial.png"),];
    l.t_speed = 0.01;
    l.fast_t_speed = 0.1;
    l.x_label = "HOURS";
    l.y_label = "CHARGE";
    l.day = 6;
    l.y_min = 0;
    for(var j = 0; j < 1; j++)
      l.feedback_imgs.push(GenImg("assets/feedback/"+i+"-"+j+".png"));
    for(var j = 0; j < 0; j++)
      l.system_imgs.push(GenImg("assets/system/"+i+"-"+j+".jpg"));
    l.pano = 0;
    l.pano_st = 0;
    l.pano_et = 0.05;
    l.skip_context = 1;
    l.skip_zoom = 0;
    l.skip_axis = 0;
    l.skip_labels = 0;
    l.skip_system = 1;
    l.skip_night = 1;
    l.push_work = 1;
    l.text = used_text[i];
    l.fmt();
    gg.levels.push(l);
    i++;

    self.was_ready = 1;
    self.resize(stage);
    self.set_mode(MODE_MENU,0);
    /*
    for(var i = 0; i < 100; i++) self.tick();
    self.set_mode(MODE_CINEMATIC,0);
    for(var i = 0; i < 100; i++) self.tick();
    self.set_mode(MODE_BOOT,0);
    for(var i = 0; i < 100; i++) self.tick();
    self.set_mode(MODE_PRE0,0);
    for(var i = 0; i < 100; i++) self.tick();
    self.set_mode(MODE_CTX_IN,0);
    for(var i = 0; i < 100; i++) self.tick();
    self.set_mode(MODE_CTX,0);
    for(var i = 0; i < 100; i++) self.tick();
    self.set_mode(MODE_CTX_OUT,0);
    for(var i = 0; i < 100; i++) self.tick();
    self.set_mode(MODE_PRE1,0);
    for(var i = 0; i < 100; i++) self.tick();
    self.set_mode(MODE_WORK_IN,0);
    for(var i = 0; i < 100; i++) self.tick();
    self.set_mode(MODE_WORK,0);
    for(var i = 0; i < 100; i++) self.tick();
    self.set_mode(MODE_WORK_OUT,0);
    for(var i = 0; i < 100; i++) self.tick();
    self.set_mode(MODE_POST0,0);
    for(var i = 0; i < 100; i++) self.tick();
    self.set_mode(MODE_LAB_OUT,0);
    for(var i = 0; i < 100; i++) self.tick();
    self.set_mode(MODE_NIGHT,0);
    for(var i = 0; i < 100; i++) self.tick();
    self.set_mode(MODE_LAB_IN,0);
    for(var i = 0; i < 100; i++) self.tick();
    //*/
  };

  gg.time_mod_twelve_pi = 0;
  self.tick = function()
  {
    gg.time_mod_twelve_pi += 0.01;
    if(gg.time_mod_twelve_pi > twelvepi) gg.time_mod_twelve_pi -= twelvepi;

    gg.mode_t++;
    gg.stage_t++;
    clicker.filter(gg.screenclicker);
    keyer.filter(gg.keylistener);
    gg.monitor.tick();
    self.tick_mode();

    keyer.flush();
    hoverer.flush();
    clicker.flush();
    dragger.flush();
    blurer.flush();

    gg.keylistener.advance();
    gg.screenclicker.clicked = 0;
  };

  self.HACKTXT = function(txt)
  {
    self.txt_lines = textToLines("20px DisposableDroidBB", gg.monitor.w, txt, gg.ctx);
  }
  self.txt_lines = [];
  self.draw = function()
  {
    if(self.txt_lines.length == 0)
      /*
      self.HACKTXT(`     You wake up in a dark room. All you see is the black screen of an old monitor.                       Your memory starts to return: you were on a routine mission to refurbish an old mining planet.      But before your ship was able to touch down, something went wrong. You must have stumbled into this abandoned control center and passed out.                                                   You check your vitals- uh oh. Only "+gg.max_days+" days worth of oxygen left, and your ship is out of fuel.                                                            You need to find a way off this planet.
        `
      );
      */
      self.HACKTXT("You wake up in a dark room. All you see is the black screen of an old monitor. Your memory starts to return: you were on a routine mission to refurbish an old mining planet. On the way down, a mysterious pulse scrambled your equipment. You used up the last of your fuel making an emergency landing. Somehow, you stumbled across the barren landscape to this abandoned control room. You managed to flip the power switch and then passed out. You check your vitals: only 6 days of oxygen left. You need to find a way off this planet.");
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
