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

    if(gg.module_board) { gg.module_board.ww = gg.canv.width; gg.module_board.wh = gg.canv.height; }

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

  self.set_level = function(i)
  {
    gg.cur_level = gg.levels[i];
    gg.cur_level.submitted = 0;
    gg.cur_level.correct = 0;
    switch(gg.cur_level.type)
    {
      case LEVEL_LINEAR:
        gg.line.m = gg.cur_level.m;
        gg.line.b = gg.cur_level.b;
        gg.line.correct_m = gg.cur_level.correct_m;
        gg.line.correct_b = gg.cur_level.correct_b;
        gg.line.calculate_table();
        gg.line.draw_params();
        break;
      case LEVEL_QUADRATIC:
        gg.quadratic.a = gg.cur_level.a;
        gg.quadratic.b = gg.cur_level.b;
        gg.quadratic.c = gg.cur_level.c;
        gg.quadratic.correct_a = gg.cur_level.correct_a;
        gg.quadratic.correct_b = gg.cur_level.correct_b;
        gg.quadratic.correct_c = gg.cur_level.correct_c;
        gg.quadratic.calculate_table();
        gg.quadratic.draw_params();
        break;
      case LEVEL_MODULE:
        var m;
        var mp;
        gg.module_board.clear();
        for(var i = 0; i < gg.cur_level.modparams.length; i++)
        {
          m = gg.module_board.gen_module();
          mp = gg.cur_level.modparams[i];
          m.title = mp.title;
          m.v[0] = mp.v;
          m.v_btn.set(m.v[0]);
          m.correct_v[0] = mp.correct_v;
          m.active = mp.active;
          m.wx = mp.wx;
          m.wy = mp.wy;
          screenSpace(gg.module_board,gg.canv,m);
          m.size();
          if(i == 0) gg.module_board.table_module = m;
        }
        for(var i = 0; i < gg.cur_level.relparams.length; i++)
        {
          m = gg.module_board.gen_modrel();
          mp = gg.cur_level.relparams[i];
          m.v = mp.v;
          m.v_btn.set(m.v);
          m.correct_v = mp.correct_v;
          m.active = mp.active;
          m.wx = mp.wx;
          m.wy = mp.wy;
          m.src = gg.module_board.modules[mp.src_i];
          m.dst = gg.module_board.modules[mp.dst_i];
          screenSpace(gg.module_board,gg.canv,m);
          m.size();
        }
        gg.module_board.calculate_table();
        gg.module_board.calculate();
        break;
    }

    gg.dialog_box.clear();
    for(var i = 0; i < gg.cur_level.text.length; i++)
      gg.dialog_box.nq(gg.cur_level.text[i]);
  }

  self.ready = function()
  {
    self.resize(stage);

    var b;
    var graph_s = 100;
    var btn_s = 20;

    gg.dialog_box = new dialog_box();
    gg.dialog_box.w = 200;
    gg.dialog_box.h = gg.canv.height;
    gg.dialog_box.x = 0;
    gg.dialog_box.y = 0;
    gg.dialog_box.size();

    gg.module_board = new module_board();
    b = gg.module_board;
    b.h = gg.canv.height;
    b.x = gg.dialog_box.x+gg.dialog_box.w;
    b.w = gg.canv.width-b.x;
    b.y = 0;
    b.graph.w = graph_s;
    b.graph.h = graph_s;
    b.graph.x = gg.canv.width-b.graph.w-10;
    b.graph.y = 10;
    //acts as module cam
    b.ww = gg.canv.width;
    b.wh = gg.canv.height;
    b.wx = 0;
    b.wy = 0;
    b.table.h = 100;
    b.table.x = gg.dialog_box.x+gg.dialog_box.w+10;
    b.table.y = gg.canv.height-b.table.h;
    b.table.w = gg.canv.width-b.table.x-10;
    b.size();

    gg.line = new editable_line();
    b = gg.line;
    b.h = gg.canv.height;
    b.x = gg.dialog_box.x+gg.dialog_box.w;
    b.y = 0;
    b.w = gg.canv.width-b.x;
    b.graph.w = graph_s;
    b.graph.h = graph_s;
    b.graph.x = gg.canv.width-b.graph.w-10;
    b.graph.y = 10;
    b.v_min = 0;
    b.v_max = 10;
    b.h_min = 0;
    b.h_max = 10;
    b.table.h = 100;
    b.table.x = gg.dialog_box.x+gg.dialog_box.w+10;
    b.table.y = gg.canv.height-b.table.h;
    b.table.w = gg.canv.width-b.table.x-10;
    b.size();

    gg.quadratic = new editable_quadratic();
    b = gg.quadratic;
    b.h = gg.canv.height;
    b.x = gg.dialog_box.x+gg.dialog_box.w;
    b.y = 0;
    b.w = gg.canv.width-b.x;
    b.graph.w = graph_s;
    b.graph.h = graph_s;
    b.graph.x = gg.canv.width-b.graph.w-10;
    b.graph.y = 10;
    b.v_min = 0;
    b.v_max = 10;
    b.h_min = 0;
    b.h_max = 10;
    b.table.h = 100;
    b.table.x = gg.dialog_box.x+gg.dialog_box.w+10;
    b.table.y = gg.canv.height-b.table.h;
    b.table.w = gg.canv.width-b.table.x-10;
    b.size();

    gg.levels = [];
    var l;
    var m;
    var i = 0;

    //line
    l = new level();
    l.i = i;
    l.type = LEVEL_LINEAR;
    l.m = 0;
    l.b = 0;
    l.correct_m = 2;
    l.correct_b = 1;
    l.text = [
      "Our mining robots were recently upgraded with a stronger drill bits that speeds up mining.",
      "We collected data about how many crystals they were able to harvest over the last 3 days.",
      "Now we need you to build a model with this graph to predict how many crystals we will have by day 4."
    ];
    /*
    l.correct_text = [
      "You did it! On to the next assignment...",
    ];
    l.incorrect_text = [
      "I don't think that's right... try again.",
    ];
    */
    gg.levels.push(l);
    i++;

    //quadratic
    l = new level();
    l.i = i;
    l.type = LEVEL_QUADRATIC;
    l.a = 0;
    l.b = 0;
    l.c = 0;
    l.correct_a = 0.1;
    l.correct_b = 0.2;
    l.correct_c = 3;
    l.text = [
      "We’ve had a breakthrough.",
      "It seems the deeper we dig, the more concentrated the crystals.",
      "A straight line doesn’t fit the data we are collecting, so we are going to switch to a curved line.",
      "Here is our measured data for the last 3 days.",
      "We need you to build a model with this graph to predict how many crystals we'll have by day 4.",
    ];
    gg.levels.push(l);
    i++;

    //charge rate
    l = new level();
    l.i = i;
    l.type = LEVEL_MODULE;
    m = new modparam();
    m.title = "Charge";
    m.v = 1;
    m.correct_v = 1;
    m.active = 0;
    m.wx = 100;
    l.modparams.push(m);
    m = new modparam();
    m.title = "Charge Rate";
    m.v = 1;
    m.correct_v = 2;
    m.wx = -100;
    l.modparams.push(m);
    m = new relparam();
    m.v = 1;
    m.correct_v = 1;
    m.src_i = 1;
    m.dst_i = 0;
    m.active = 0;
    l.relparams.push(m);
    l.text = [
      "The material scientists have developed a new kind of super conductive metal wire that increases the output of the battery charger.",
      "So let’s use our new system to predict how fast the robots will be charged.",
      "We need you to update this model to use the new charger.",
    ];
    gg.levels.push(l);
    i++;

    //charge starting
    l = new level();
    l.i = i;
    l.type = LEVEL_MODULE;
    m = new modparam();
    m.title = "Charge";
    m.v = 1;
    m.correct_v = 2;
    m.wx = 100;
    l.modparams.push(m);
    m = new modparam();
    m.title = "Charge Rate";
    m.v = 2;
    m.correct_v = 2;
    m.active = 0;
    m.wx = -100;
    l.modparams.push(m);
    m = new relparam();
    m.v = 1;
    m.correct_v = 1;
    m.src_i = 1;
    m.dst_i = 0;
    m.active = 0;
    l.relparams.push(m);
    l.text = [
      "We are learning that after the first use, the batteries are charging quicker than we expected.",
      "We figured out that they were coming back partially charged, something we didn’t account for.",
    ];
    gg.levels.push(l);
    i++;

    //charge conversion
    l = new level();
    l.i = i;
    l.type = LEVEL_MODULE;
    m = new modparam();
    m.title = "Charge";
    m.v = 2;
    m.correct_v = 2;
    m.active = 0;
    m.wx = 100;
    l.modparams.push(m);
    m = new modparam();
    m.title = "Charge Rate";
    m.v = 2;
    m.correct_v = 2;
    m.active = 0;
    m.wx = -100;
    l.modparams.push(m);
    m = new relparam();
    m.v = 1;
    m.correct_v = 0.8;
    m.src_i = 1;
    m.dst_i = 0;
    l.relparams.push(m);
    l.text = [
      "After a few uses, it seems the charger is not outputting exactly what we expected.",
      "We should be able to use the data we collected about the batteries charge to figure out the actual output.",
    ];
    gg.levels.push(l);
    i++;

    //charge engineering
    l = new level();
    l.i = i;
    l.type = LEVEL_MODULE;
    m = new modparam();
    m.title = "Charge";
    m.v = 2;
    m.correct_v = 2;
    m.wx = 100;
    l.modparams.push(m);
    m = new modparam();
    m.title = "Charge Rate";
    m.v = 2;
    m.correct_v = 3;
    m.wx = -100;
    l.modparams.push(m);
    m = new relparam();
    m.v = 0.8;
    m.correct_v = 0.8;
    m.src_i = 1;
    m.dst_i = 0;
    l.relparams.push(m);
    l.text = [
      "After a year of use, the batteries are taking longer to charge because their charging efficiency has dropped.",
      "Let’s use the relationship/conversion control that describes how much of the source component effects the destination component each time step.",
    ];
    gg.levels.push(l);
    i++;

    //discharge
    l = new level();
    l.i = i;
    l.type = LEVEL_MODULE;
    m = new modparam();
    m.title = "Charge";
    m.v = 10;
    m.correct_v = 10;
    m.active = 0;
    m.wx = 100;
    l.modparams.push(m);
    m = new modparam();
    m.title = "Motor";
    m.v = 1;
    m.correct_v = 1;
    m.active = 0;
    m.wx = -100;
    l.modparams.push(m);
    m = new relparam();
    m.v = -0.5;
    m.correct_v = -0.4;
    m.src_i = 1;
    m.dst_i = 0;
    l.relparams.push(m);
    l.text = [
      "We have data for how charged the battery is for the first hour of work.",
      "How long do you predict the robots will last, having 10% of their battery to return home.",
    ];
    gg.levels.push(l);
    i++;

    //multiple discharge
    l = new level();
    l.i = i;
    l.type = LEVEL_MODULE;
    m = new modparam();
    m.title = "Charge";
    m.v = 10;
    m.correct_v = 10;
    m.active = 0;
    m.wx = 100;
    l.modparams.push(m);
    m = new modparam();
    m.title = "Motor";
    m.v = 1;
    m.correct_v = 1;
    m.active = 0;
    m.wx = -100;
    m.wy = 50;
    l.modparams.push(m);
    m = new modparam();
    m.title = "Drill";
    m.v = 1;
    m.correct_v = 1;
    m.active = 0;
    m.wx = -100;
    m.wy = -50;
    l.modparams.push(m);
    m = new relparam();
    m.v = -0.4;
    m.correct_v = -0.4;
    m.wy = 50;
    m.src_i = 1;
    m.dst_i = 0;
    l.relparams.push(m);
    m = new relparam();
    m.v = 0;
    m.correct_v = -0.2;
    m.wy = -50;
    m.src_i = 2;
    m.dst_i = 0;
    l.relparams.push(m);
    l.text = [
      "We are taking inventory about how each part of the robot is draining the battery.",
      "In this model we break out the two parts using the most amount of energy, the drill motors and the radio.",
      "We know that the model is correct, but the rate of discharge from the motors hasn’t been verified.",
      "Step one, change the motor discharge rate to match the battery data. Step 2, tell us how long the battery is expected to last.",
    ];
    gg.levels.push(l);
    i++;

    //conflicting discharge
    l = new level();
    l.i = i;
    l.type = LEVEL_MODULE;
    m = new modparam();
    m.title = "Charge";
    m.v = 10;
    m.correct_v = 10;
    m.active = 0;
    m.wx = 100;
    l.modparams.push(m);
    m = new modparam();
    m.title = "Motor";
    m.v = 1;
    m.correct_v = 1;
    m.active = 0;
    m.wx = -100;
    m.wy = 100;
    l.modparams.push(m);
    m = new modparam();
    m.title = "Drill";
    m.v = 1;
    m.correct_v = 1;
    m.active = 0;
    m.wx = -100;
    l.modparams.push(m);
    m = new modparam();
    m.title = "Solar Panel";
    m.v = 1;
    m.correct_v = 1;
    m.active = 0;
    m.wx = -100;
    m.wy = -100;
    l.modparams.push(m);
    m = new relparam();
    m.v = -0.4;
    m.correct_v = -0.4;
    m.wy = 100;
    m.src_i = 1;
    m.dst_i = 0;
    l.relparams.push(m);
    m = new relparam();
    m.v = -0.2;
    m.correct_v = -0.2;
    m.src_i = 2;
    m.dst_i = 0;
    l.relparams.push(m);
    m = new relparam();
    m.v = 0;
    m.correct_v = 0.3;
    m.wy = -100;
    m.src_i = 3;
    m.dst_i = 0;
    l.relparams.push(m);
    l.text = [
      "We equipped the robots with little solar cells so they can be charging their batteries while out working, and hopefully work longer between charges.",
      "We know that the model is correct, but the rate of charge from the solar panel hasn’t been determined.",
      "Step one, change the solar panel discharge rate to match the battery data.",
      "Step 2, tell us How long will the robots last until they have only 150 Amp Hours left, enough to return to base.",
    ];
    gg.levels.push(l);
    i++;

    //shipments
    l = new level();
    l.i = i;
    l.type = LEVEL_MODULE;
    m = new modparam();
    m.title = "Crystals";
    m.v = 0;
    m.correct_v = 0;
    m.active = 0;
    m.wx = 200;
    l.modparams.push(m);
    m = new modparam();
    m.title = "Robots";
    m.v = 1;
    m.correct_v = 1;
    m.active = 0;
    l.modparams.push(m);
    m = new modparam();
    m.title = "Shipments";
    m.v = 1;
    m.correct_v = 4;
    m.wx = -200;
    l.modparams.push(m);
    m = new relparam();
    m.v = 10;
    m.correct_v = 10;
    m.wx = 100;
    m.src_i = 1;
    m.dst_i = 0;
    l.relparams.push(m);
    m = new relparam();
    m.v = 1;
    m.correct_v = 3;
    m.wx = -100;
    m.src_i = 2;
    m.dst_i = 0;
    l.relparams.push(m);
    l.text = [
      "We need to pick up the pace to hit our mining goal. Each robot can mine 100kg or crystals daily, but we are going to need more.",
      "How many robots do we need to activate daily to make sure that we harvest 1M kg of crystals in 30 days.",
    ];
    gg.levels.push(l);
    i++;

    self.set_level(0);
  };

  self.tick = function()
  {
    var check = 1;

    var b;

    switch(gg.cur_level.type)
    {
      case LEVEL_LINEAR:    gg.line.filter(keyer,blurer,dragger,clicker);         gg.line.tick();         break;
      case LEVEL_QUADRATIC: gg.quadratic.filter(keyer,blurer,dragger,clicker);    gg.quadratic.tick();    break;
      case LEVEL_MODULE:    gg.module_board.filter(keyer,blurer,dragger); gg.module_board.tick(); break;
    }
    clicker.filter(gg.dialog_box);
    if(gg.cur_level.submitted && gg.dialog_box.requested_past_available)
    {
      var correct = gg.cur_level.correct;
      gg.cur_level.submitted = 0;
      gg.cur_level.correct = 0;
      if(correct) self.set_level((gg.cur_level.i+1)%gg.levels.length);
      else        self.set_level(gg.cur_level.i);
    }

    gg.cur_level.tick();
    gg.dialog_box.tick();

    keyer.flush();
    hoverer.flush();
    clicker.flush();
    dragger.flush();
    blurer.flush();
  };

  self.draw = function()
  {
    gg.ctx.strokeStyle = black;
    switch(gg.cur_level.type)
    {
      case LEVEL_LINEAR:    gg.line.draw();         break;
      case LEVEL_QUADRATIC: gg.quadratic.draw();    break;
      case LEVEL_MODULE:    gg.module_board.draw(); break;
    }
    gg.cur_level.draw();
    gg.dialog_box.draw();
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

