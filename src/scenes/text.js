'use strict';
var trigger_click = {
  type:TRIGGER_CLICK,
  state:0,
};
var trigger_timer = {
  type:TRIGGER_TIMER,
  state:1,
};

var get_timer = function(t)
{
  var n = cloneInto(trigger_timer,{});
  n.state = t;
  return n;
}

var english_text =
[

  //check fuel
  { //one level. copy and paste from this { to the following } to create a new level
    pre_context: //LAB: [skip_night] you've just awoken. lead into show context animation.
    [
      "Finally! You're awake!", CONTENT_AI, EMOTE_NULL,
      "Welcome to Forever Mine. I'm 3X-R, your friendly neighborhood AI.", CONTENT_AI, EMOTE_NULL,
      "Wha... What happened?", CONTENT_PLAYER, EMOTE_NULL,
      "You stumbled in here, powered me on, and then just passed out.", CONTENT_AI, EMOTE_NULL,
      "I... I need to get out of here.", CONTENT_PLAYER, EMOTE_NULL,
      "What? But you just got here! I've been waiting 500 years!", CONTENT_AI, EMOTE_NULL,
      "Aren't you gonna get the mine running again?", CONTENT_AI, EMOTE_NULL,
      "Oh.", CONTENT_PLAYER, EMOTE_NULL,
      "3X-R, I'm so sorry. The fuel on this planet is sort of... outdated.", CONTENT_PLAYER, EMOTE_NULL,
      "I'm here to salvage for materials. I wasn't even supposed to switch you on.", CONTENT_PLAYER, EMOTE_NULL,
      "What???", CONTENT_AI, EMOTE_NULL,
      "But now I'm in trouble. Some weird pulse fried my power core on the way down.", CONTENT_PLAYER, EMOTE_NULL,
      "My ship is dead and I'm running out of oxygen.", CONTENT_PLAYER, EMOTE_NULL,
      "Guess that outdated fuel isn't looking so bad now, huh?", CONTENT_AI, EMOTE_NULL,
      "You're right. I need enough fuel to power my ship, or I'm toast.", CONTENT_PLAYER, EMOTE_NULL,
      "Don't worry, friend. My programming requires me to not let humans die, when reasonably convenient. I've got your back!", CONTENT_AI, EMOTE_NULL,
    ],
    context: //LAB: [skip_context] context animation on-screen
    [
      "While you were passed out, I sent the old robots back into the mine.", CONTENT_AI, EMOTE_NULL,
      "Look at them go! 💕", CONTENT_AI, EMOTE_NULL,
    ],
    lets_go: //LAB: [skip_context] just shown context animation. lead into going to workspace.
    [
      "Not bad for a heap of scrap metal, huh?", CONTENT_AI, EMOTE_NULL,
      "Ok, fine. I'm sorry I called you outdated.", CONTENT_PLAYER, EMOTE_NULL,
      "Do you think we can get enough fuel in time?", CONTENT_PLAYER, EMOTE_NULL,
      "Sure!", CONTENT_AI, EMOTE_NULL,
      "Well, maybe. I have no idea.", CONTENT_AI, EMOTE_NULL,
    ],
    status: //WORKSPACE: [skip_zoom] full "14 days" graph shown, w/ "survive/die" zones (unknown where you will land).
    [
      get_timer(100), "This is a model.", CONTENT_AI, EMOTE_NULL,
      get_timer(100), "We can use it to predict if you're gonna die!", CONTENT_AI, EMOTE_NULL,
      trigger_click, "Great.", CONTENT_PLAYER, EMOTE_NULL,
      get_timer(100), "My circuits are a little fuzzy, so you'll have to help.", CONTENT_AI, EMOTE_NULL,
    ],
    data: //WORKSPACE: graph zoomed into 10-hour scope. give data
    [
      get_timer(60), "Here's the mining data from the past few hours.", CONTENT_AI, EMOTE_NULL,
      get_timer(20), "DATA:", CONTENT_DATA, EMOTE_NULL,
    ],
    axis: //WORKSPACE: [skip_axis] data imported, empty model framework shown. lead into "drag axis"
    [
      trigger_click, "Ok. Now what?", CONTENT_PLAYER, EMOTE_NULL,
      get_timer(80), "You need to define X and Y!", CONTENT_AI, EMOTE_NULL,
      get_timer(80), "Drag the labels from the graph into our equation.", CONTENT_AI, EMOTE_NULL,
    ],
    labels: //WORKSPACE: [skip_labels] variables labelled, need to label constants
    [
      get_timer(60), "Now label the constants.", CONTENT_AI, EMOTE_NULL,
      get_timer(60), "I'd do it myself, but I'm too busy rusting.", CONTENT_AI, EMOTE_NULL,
      trigger_click, "Could we stay focused, please?", CONTENT_PLAYER, EMOTE_NULL,
      get_timer(60), "Fine. Here are your choices:", CONTENT_AI, EMOTE_NULL,
      get_timer(60), "Existing Fuel", CONTENT_LABEL, 0,
      get_timer(60), "Mining Rate", CONTENT_LABEL, 0,
    ],
    labels_incorrect: //WORKSPACE: [skip_labels] labels chosen incorrectly; reset
    [
      get_timer(60), "Silly human. That's not right.", CONTENT_AI, EMOTE_NULL,
      get_timer(60), "Try again!", CONTENT_AI, EMOTE_NULL,
      get_timer(60), "Existing Fuel", CONTENT_LABEL, 0,
      get_timer(60), "Mining Rate", CONTENT_LABEL, 0,
    ],
    constants: //WORKSPACE: labels chosen. show known constants, lead into "define unknowns"
    [
      get_timer(100), "Great! Our model's ready to use.", CONTENT_AI, EMOTE_NULL,
      get_timer(80), "Here's the fuel we started out with.", CONTENT_AI, EMOTE_NULL,
      get_timer(60), "Existing Fuel", CONTENT_CONSTANT, 4,
      get_timer(100), "Drag it into the equation.", CONTENT_AI, EMOTE_NULL,
      get_timer(100), "Then fix the rate so the data matches up.", CONTENT_AI, EMOTE_NULL,
    ],
    submit: //WORKSPACE: values matched; lead to submit
    [
      get_timer(120), "Ok. Moment of truth!!!", CONTENT_AI, EMOTE_NULL,
      get_timer(80), "Drag your data over to me and we'll see if you're doomed!", CONTENT_AI, EMOTE_NULL,
    ],
    submitted_incorrect: //WORKSPACE: submitted before values correct; reset
    [
      get_timer(80), "Those numbers don't match, silly.", CONTENT_AI, EMOTE_NULL,
      get_timer(80), "Try again!", CONTENT_AI, EMOTE_NULL,
    ],
    review: //WORKSPACE: submitted correct equation; lead to review survival chances
    [
      get_timer(120), "Hey, not bad! You just made a model!", CONTENT_AI, EMOTE_NULL,
    ],
    debrief: //WORKSPACE: draw conclusion based on review; lead back to lab
    [
      get_timer(100), "Oh, and also it looks like you're gonna die. Bummer.", CONTENT_AI, EMOTE_NULL,
    ],
    pre_improve: //LAB: about to show system
    [
      "I hope this doesn't sound insensitive, but this is the most fun I've had in 500 years!", CONTENT_AI, EMOTE_NULL,
      "Sorry about the impending doom, and stuff.", CONTENT_AI, EMOTE_NULL,
      "I need to... need to figure out... ", CONTENT_PLAYER, EMOTE_NULL,
      "Human? Can you hear me? You're looking a little... ", CONTENT_AI, EMOTE_NULL,
      "BLACKOUT", CONTENT_AI, EMOTE_BLACKOUT,
    ],
    improve: //LAB: [skip_system] show system
    [
      "SKIP", CONTENT_AI, EMOTE_NULL,
    ],
    post: //LAB: [skip_system] send to bed
    [
      "SKIP", CONTENT_AI, EMOTE_NULL,
    ],
  },

  //fuel increase
  { //one level. copy and paste from this { to the following } to create a new level
    pre_context: //LAB: [skip_night] you've just awoken. lead into show context animation.
    [
      "Good morning, human. Feeling better?", CONTENT_AI, EMOTE_NULL,
      "I think so.", CONTENT_PLAYER, EMOTE_NULL,
      "About time. I've got a surprise for you!", CONTENT_AI, EMOTE_NULL,
      "Uh oh.", CONTENT_PLAYER, EMOTE_NULL,
      "No, it's something good! Honest!", CONTENT_AI, EMOTE_NULL,
      "While you were sleeping, I adjusted the robots' course.", CONTENT_AI, EMOTE_NULL,
    ],
    context: //LAB: [skip_context] context animation on-screen
    [
      "Look! They found a HUGE pocket of fuel.", CONTENT_AI, EMOTE_NULL,
      "They're mining super fast!", CONTENT_AI, EMOTE_NULL,
    ],
    lets_go: //LAB: [skip_context] just shown context animation. lead into going to workspace.
    [
      "Wow! 3X-R, this is amazing!", CONTENT_PLAYER, EMOTE_NULL,
      "Do you think we'll get enough fuel in time?", CONTENT_PLAYER, EMOTE_NULL,
      "Only one way to find out.", CONTENT_AI, EMOTE_NULL,
      "You know, unless you'd rather take another nap. You're good at that.", CONTENT_AI, EMOTE_NULL,
      "3X-R, I swear. I will switch you off.", CONTENT_PLAYER, EMOTE_NULL,
      "Ha. Good luck. I don't even know what half these buttons are for.", CONTENT_AI, EMOTE_NULL,
    ],
    status: //WORKSPACE: [skip_zoom] full "14 days" graph shown, w/ "survive/die" zones (unknown where you will land).
    [
      get_timer(120), "Here's our model!", CONTENT_AI, EMOTE_NULL,
      get_timer(120), "I know you're still mildly concussed, so I'll walk you through it again.", CONTENT_AI, EMOTE_NULL,
    ],
    data: //WORKSPACE: graph zoomed into 10-hour scope. give data
    [
      get_timer(80), "This is the data from last night.", CONTENT_AI, EMOTE_NULL,
      get_timer(60), "DATA:", CONTENT_DATA, EMOTE_NULL,
      get_timer(80), "Drag it into the table.", CONTENT_AI, EMOTE_NULL,
    ],
    axis: //WORKSPACE: [skip_axis] data imported, empty model framework shown. lead into "drag axis"
    [
      get_timer(0), "SKIP", CONTENT_AI, EMOTE_NULL,
    ],
    labels: //WORKSPACE: [skip_labels] variables labelled, need to label constants
    [
      get_timer(0), "SKIP", CONTENT_AI, EMOTE_NULL,
    ],
    labels_incorrect: //WORKSPACE: [skip_labels] labels chosen incorrectly; reset
    [
      get_timer(0), "SKIP", CONTENT_AI, EMOTE_NULL,
    ],
    constants: //WORKSPACE: labels chosen. show known constants, lead into "define unknowns"
    [
      get_timer(100), "Here's our existing fuel.", CONTENT_AI, EMOTE_NULL,
      get_timer(60), "Existing Fuel", CONTENT_CONSTANT, 4,
      get_timer(100), "You need to figure out the rate.", CONTENT_AI, EMOTE_NULL,
    ],
    submit: //WORKSPACE: values matched; lead to submit
    [
      get_timer(120), "Ready? Show me your data!", CONTENT_AI, EMOTE_NULL,
    ],
    submitted_incorrect: //WORKSPACE: submitted before values correct; reset
    [
      get_timer(80), "Those numbers don't match. Try again.", CONTENT_AI, EMOTE_NULL,
    ],
    review: //WORKSPACE: submitted correct equation; lead to review survival chances
    [
      get_timer(120), "Nice job!", CONTENT_AI, EMOTE_NULL,
      get_timer(120), "Tomorrow I'll find a trickier model for you to try.", CONTENT_AI, EMOTE_NULL,
    ],
    debrief: //WORKSPACE: draw conclusion based on review; lead back to lab
    [
      trigger_click, "Tomorrow?", CONTENT_PLAYER, EMOTE_NULL,
      trigger_click, "3X-R, I don't need to make any more models.", CONTENT_PLAYER, EMOTE_NULL,
      trigger_click, "Look at the graph. I'm gonna survive!", CONTENT_PLAYER, EMOTE_NULL,
      get_timer(120), "Wait. You are???", CONTENT_AI, EMOTE_NULL,
      get_timer(120), "Wow. Those little bots really ARE working fast.", CONTENT_AI, EMOTE_NULL,
    ],
    pre_improve: //LAB: about to show system
    [
      "This is great! At this rate, I'll have enough fuel by Day 7!", CONTENT_PLAYER, EMOTE_NULL,
      "I can't wait to get off this dusty old planet!", CONTENT_PLAYER, EMOTE_NULL,
      "Um... no offense, 3X-R.", CONTENT_PLAYER, EMOTE_NULL,
      "None taken. Who knows? Maybe you'll decide to stick around.", CONTENT_AI, EMOTE_NULL,
      "My old humans used to say this place was nearly impossible to leave.", CONTENT_AI, EMOTE_NULL,
      "Sorry, 3X-R. I really need to get back to Earth.", CONTENT_PLAYER, EMOTE_NULL,
      "I better go get my ship ready. I'll check back tomorrow.", CONTENT_PLAYER, EMOTE_NULL,
      "Thanks for all your help!", CONTENT_PLAYER, EMOTE_NULL,
      "Don't mention it.", CONTENT_AI, EMOTE_NULL,
    ],
    improve: //LAB: [skip_system] show system
    [
      "SKIP", CONTENT_AI, EMOTE_NULL,
    ],
    post: //LAB: [skip_system] send to bed
    [
      "SKIP", CONTENT_AI, EMOTE_NULL,
    ],
  },

  //fuel return to normal
  { //one level. copy and paste from this { to the following } to create a new level
    pre_context: //LAB: [skip_night] you've just awoken. lead into show context animation.
    [
      "Welcome back, human!", CONTENT_AI, EMOTE_NULL,
      "Good morning, 3X-R. How are things looking out there?", CONTENT_PLAYER, EMOTE_NULL,
      "Hello? 3X-R?", CONTENT_PLAYER, EMOTE_NULL,
      "I'm here. Just searching my linguistic database.", CONTENT_AI, EMOTE_NULL,
      "What's a nicer word for \"you're completely doomed\"?", CONTENT_AI, EMOTE_NULL,
      "Oh no! I'm doomed? Again???", CONTENT_PLAYER, EMOTE_NULL,
      "Yep! Well, probably.", CONTENT_AI, EMOTE_NULL,
    ],
    context: //LAB: [skip_context] context animation on-screen
    [
      "The bots reached the end of the fuel pocket. They're mining super slow.", CONTENT_AI, EMOTE_NULL,
    ],
    lets_go: //LAB: [skip_context] just shown context animation. lead into going to workspace.
    [
      "Ok. Can we make a prediction with the new data?", CONTENT_PLAYER, EMOTE_NULL,
      "Hmmmmm.", CONTENT_AI, EMOTE_NULL,
      "You know, I'm starting to feel like you're just using me for my modeling software.", CONTENT_AI, EMOTE_NULL,
      "3X-R, please.", CONTENT_PLAYER, EMOTE_NULL,
      "Oh, fine. Come on.", CONTENT_AI, EMOTE_NULL,
    ],
    status: //WORKSPACE: [skip_zoom] full "14 days" graph shown, w/ "survive/die" zones (unknown where you will land).
    [
      get_timer(120), "Cheer up, human.", CONTENT_AI, EMOTE_NULL,
      get_timer(120), "Maybe it's not as bad as it looks!", CONTENT_AI, EMOTE_NULL,
    ],
    data: //WORKSPACE: graph zoomed into 10-hour scope. give data
    [
      get_timer(80), "Here's our new data.", CONTENT_AI, EMOTE_NULL,
      get_timer(80), "DATA:", CONTENT_DATA, EMOTE_NULL,
      trigger_click, "Thanks.", CONTENT_PLAYER, EMOTE_NULL,
    ],
    axis: //WORKSPACE: [skip_axis] data imported, empty model framework shown. lead into "drag axis"
    [
      get_timer(0), "SKIP", CONTENT_AI, EMOTE_NULL,
    ],
    labels: //WORKSPACE: [skip_labels] variables labelled, need to label constants
    [
      get_timer(0), "SKIP", CONTENT_AI, EMOTE_NULL,
    ],
    labels_incorrect: //WORKSPACE: [skip_labels] labels chosen incorrectly; reset
    [
      get_timer(0), "SKIP", CONTENT_AI, EMOTE_NULL,
    ],
    constants: //WORKSPACE: labels chosen. show known constants, lead into "define unknowns"
    [
      get_timer(60), "Here's our existing fuel.", CONTENT_AI, EMOTE_NULL,
      get_timer(60), "Existing Fuel", CONTENT_CONSTANT, 4,
      get_timer(60), "Go ahead, match up the numbers!", CONTENT_AI, EMOTE_NULL,
    ],
    submit: //WORKSPACE: values matched; lead to submit
    [
      get_timer(80), "Ready? Let's see how doomed you are!", CONTENT_AI, EMOTE_NULL,
    ],
    submitted_incorrect: //WORKSPACE: submitted before values correct; reset
    [
      get_timer(80), "Not even close. Try again.", CONTENT_AI, EMOTE_NULL,
    ],
    review: //WORKSPACE: submitted correct equation; lead to review survival chances
    [
      get_timer(80), "Welp, this is a... ", CONTENT_AI, EMOTE_NULL,
      get_timer(80), "What's a nicer way of saying \"trainwreck\"?", CONTENT_AI, EMOTE_NULL,
      trigger_click, "It's a disaster.", CONTENT_PLAYER, EMOTE_NULL,
      get_timer(80), "\"A sudden event that causes great damage or loss of life\". Yep, disaster works.", CONTENT_AI, EMOTE_NULL,
      get_timer(80), "Look on the bright side. At least we're having fun!", CONTENT_AI, EMOTE_NULL,
    ],
    debrief: //WORKSPACE: draw conclusion based on review; lead back to lab
    [
    ],
    pre_improve: //LAB: about to show system
    [
      "At this rate, I'm not going to survive.", CONTENT_PLAYER, EMOTE_NULL,
      "I need to build something to help the robots work faster.", CONTENT_PLAYER, EMOTE_NULL,
      "Oooh. That sounds fun! You're MUCH more interesting than my old humans.", CONTENT_AI, EMOTE_NULL,
      "Let's start by looking at the robots' charging station.", CONTENT_PLAYER, EMOTE_NULL,
    ],
    improve: //LAB: [skip_system] show system
    [
      "Sure. Check it out!", CONTENT_AI, EMOTE_NULL,
      "Pretty fancy, huh?", CONTENT_AI, EMOTE_NULL,
    ],
    post: //LAB: [skip_system] send to bed
    [
      "Um... no offense, 3X-R. But I think I saw an old charger like that in a museum once.", CONTENT_PLAYER, EMOTE_NULL,
      "Let's see if I can build a supercharger to speed things up.", CONTENT_PLAYER, EMOTE_NULL,
      "I'll need to find some materials... ", CONTENT_PLAYER, EMOTE_NULL,
      "I better go, 3X-R. I've got work to do.", CONTENT_PLAYER, EMOTE_NULL,
    ],
  },

  //improve charge rate
  { //one level. copy and paste from this { to the following } to create a new level
    pre_context: //LAB: [skip_night] you've just awoken. lead into show context animation.
    [
      "Good morning, human!", CONTENT_AI, EMOTE_NULL,
      "Yikes. You look terrible.", CONTENT_AI, EMOTE_NULL,
      "Ugh. I stayed up all night working on that new charger.", CONTENT_PLAYER, EMOTE_NULL,
    ],
    context: //LAB: [skip_context] context animation on-screen
    [
      "Wow. YOU built THAT?", CONTENT_AI, EMOTE_NULL,
      "You're, like, the coolest human ever! I'm so glad you got stranded here!", CONTENT_AI, EMOTE_NULL,
      "Um.... thanks.", CONTENT_PLAYER, EMOTE_NULL,
      "Can we use a model to see how fast the batteries are charging now?", CONTENT_PLAYER, EMOTE_NULL,
      "Sure. I've got just the thing.", CONTENT_AI, EMOTE_NULL,
    ],
    lets_go: //LAB: [skip_context] just shown context animation. lead into going to workspace.
    [
    ],
    status: //WORKSPACE: [skip_zoom] full "14 days" graph shown, w/ "survive/die" zones (unknown where you will land).
    [
      get_timer(0), "SKIP", CONTENT_AI, EMOTE_NULL,
    ],
    data: //WORKSPACE: graph zoomed into 10-hour scope. give data
    [
      get_timer(20), "Here's the new charging data.", CONTENT_AI, EMOTE_NULL,
      get_timer(20), "DATA:", CONTENT_DATA, EMOTE_NULL,
    ],
    axis: //WORKSPACE: [skip_axis] data imported, empty model framework shown. lead into "drag axis"
    [
      get_timer(60), "Go ahead and label X and Y!", CONTENT_AI, EMOTE_NULL,
      get_timer(60), "Drag from the graph into our new equation.", CONTENT_AI, EMOTE_NULL,
    ],
    labels: //WORKSPACE: [skip_labels] variables labelled, need to label constants
    [
      get_timer(20), "Now label the constants.", CONTENT_AI, EMOTE_NULL,
      get_timer(20), "Here are your choices.", CONTENT_AI, EMOTE_NULL,
      get_timer(60), "Starting Charge", CONTENT_LABEL, 0,
      get_timer(60), "Charge Rate", CONTENT_LABEL, 0,
    ],
    labels_incorrect: //WORKSPACE: [skip_labels] labels chosen incorrectly; reset
    [
      get_timer(20), "Nope! Try again.", CONTENT_AI, EMOTE_NULL,
      get_timer(60), "Starting Charge", CONTENT_LABEL, 0,
      get_timer(60), "Charge Rate", CONTENT_LABEL, 0,
    ],
    constants: //WORKSPACE: labels chosen. show known constants, lead into "define unknowns"
    [
      get_timer(20), "Great job, human!", CONTENT_AI, EMOTE_NULL,
      get_timer(20), "Thanks, 3X-R.", CONTENT_PLAYER, EMOTE_NULL,
      get_timer(20), "The batteries start at 0.", CONTENT_AI, EMOTE_NULL,
      get_timer(20), "Starting Charge", CONTENT_CONSTANT, 4,
      get_timer(20), "You need to adjust the rate!", CONTENT_AI, EMOTE_NULL,
    ],
    submit: //WORKSPACE: values matched; lead to submit
    [
      get_timer(20), "Ready to show me your data?", CONTENT_AI, EMOTE_NULL,
    ],
    submitted_incorrect: //WORKSPACE: submitted before values correct; reset
    [
      get_timer(20), "Nope. Those numbers don't match.", CONTENT_AI, EMOTE_NULL,
      get_timer(20), "Try again!", CONTENT_AI, EMOTE_NULL,
    ],
    review: //WORKSPACE: submitted correct equation; lead to review survival chances
    [
      get_timer(20), "Wow. Your new charger doubled the charge rate!", CONTENT_AI, EMOTE_NULL,
      get_timer(20), "Those little bots are gonna love it!", CONTENT_AI, EMOTE_NULL,
      trigger_click, "And I might actually survive!", CONTENT_PLAYER, EMOTE_NULL,
      get_timer(20), "Oh, yeah. That, too.", CONTENT_AI, EMOTE_NULL,
    ],
    debrief: //WORKSPACE: draw conclusion based on review; lead back to lab
    [
    ],
    pre_improve: //LAB: about to show system
    [
      "Ok, 3X-R. The batteries are charging faster. The robots are out mining.", CONTENT_PLAYER, EMOTE_NULL,
      "Let's see if it'll be enough.", CONTENT_PLAYER, EMOTE_NULL,
    ],
    improve: //LAB: [skip_system] show system
    [
      "SKIP", CONTENT_AI, EMOTE_NULL,
    ],
    post: //LAB: [skip_system] send to bed
    [
      "SKIP", CONTENT_AI, EMOTE_NULL,
    ],
  },

  //check fuel
  { //one level. copy and paste from this { to the following } to create a new level
    pre_context: //LAB: [skip_night] you've just awoken. lead into show context animation.
    [
      "SKIP", CONTENT_AI, EMOTE_NULL,
    ],
    context: //LAB: [skip_context] context animation on-screen
    [
      "SKIP", CONTENT_AI, EMOTE_NULL,
    ],
    lets_go: //LAB: [skip_context] just shown context animation. lead into going to workspace.
    [
      "SKIP", CONTENT_AI, EMOTE_NULL,
    ],
    status: //WORKSPACE: [skip_zoom] full "14 days" graph shown, w/ "survive/die" zones (unknown where you will land).
    [
      get_timer(20), "Here we go, friend!", CONTENT_AI, EMOTE_NULL,
      get_timer(20), "Let's predict if you're gonna survive!", CONTENT_AI, EMOTE_NULL,
    ],
    data: //WORKSPACE: graph zoomed into 10-hour scope. give data
    [
      get_timer(20), "Drag the data onto the table.", CONTENT_AI, EMOTE_NULL,
      get_timer(20), "DATA:", CONTENT_DATA, EMOTE_NULL,
    ],
    axis: //WORKSPACE: [skip_axis] data imported, empty model framework shown. lead into "drag axis"
    [
      get_timer(0), "SKIP", CONTENT_AI, EMOTE_NULL,
    ],
    labels: //WORKSPACE: [skip_labels] variables labelled, need to label constants
    [
      get_timer(0), "SKIP", CONTENT_AI, EMOTE_NULL,
    ],
    labels_incorrect: //WORKSPACE: [skip_labels] labels chosen incorrectly; reset
    [
      get_timer(0), "SKIP", CONTENT_AI, EMOTE_NULL,
    ],
    constants: //WORKSPACE: labels chosen. show known constants, lead into "define unknowns"
    [
      get_timer(20), "Here's our existing fuel.", CONTENT_AI, EMOTE_NULL,
      get_timer(20), "Existing Fuel", CONTENT_CONSTANT, 4,
      get_timer(20), "What are you waiting for? Match the data!", CONTENT_AI, EMOTE_NULL,
    ],
    submit: //WORKSPACE: values matched; lead to submit
    [
    ],
    submitted_incorrect: //WORKSPACE: submitted before values correct; reset
    [
      get_timer(20), "Nope! Try again.", CONTENT_AI, EMOTE_NULL,
    ],
    review: //WORKSPACE: submitted correct equation; lead to review survival chances
    [
      get_timer(20), "So? How does it look?", CONTENT_AI, EMOTE_NULL,
    ],
    debrief: //WORKSPACE: draw conclusion based on review; lead back to lab
    [
      trigger_click, "It's not enough.", CONTENT_PLAYER, EMOTE_NULL,
      trigger_click, "The numbers look a little better.", CONTENT_PLAYER, EMOTE_NULL,
      trigger_click, "But I'm still not gonna make it.", CONTENT_PLAYER, EMOTE_NULL,
    ],
    pre_improve: //LAB: about to show system
    [
      "Aww, cheer up, friend.", CONTENT_AI, EMOTE_NULL,
      "You're reasonably smart, for a human. I'm sure you'll figure something out!", CONTENT_AI, EMOTE_NULL,
      "I worked all night on that charger and it still wasn't enough.", CONTENT_PLAYER, EMOTE_NULL,
      "I have no idea what to do next!", CONTENT_PLAYER, EMOTE_NULL,
      "You need a good night's sleep.", CONTENT_AI, EMOTE_NULL,
      "Go count some robots, or sheep, or whatever it is humans do.", CONTENT_AI, EMOTE_NULL,
      "We'll get back to work in the morning!", CONTENT_AI, EMOTE_NULL,
    ],
    improve: //LAB: [skip_system] show system
    [
      "SKIP", CONTENT_AI, EMOTE_NULL,
    ],
    post: //LAB: [skip_system] send to bed
    [
      "SKIP", CONTENT_AI, EMOTE_NULL,
    ],
  },

  //initial charge rate
  { //one level. copy and paste from this { to the following } to create a new level
    pre_context: //LAB: [skip_night] you've just awoken. lead into show context animation.
    [
      "Good morning, human. Sleep well?", CONTENT_AI, EMOTE_NULL,
      "Sort of. It's not easy to sleep in a 10 pound helmet.", CONTENT_PLAYER, EMOTE_NULL,
      "Well, this should cheer you up!", CONTENT_AI, EMOTE_NULL,
    ],
    context: //LAB: [skip_context] context animation on-screen
    [
      "Our robots are coming back with a partial charge on their batteries.", CONTENT_AI, EMOTE_NULL,
      "That means they're charging up and getting back to work faster!", CONTENT_AI, EMOTE_NULL,
    ],
    lets_go: //LAB: [skip_context] just shown context animation. lead into going to workspace.
    [
      "Wow, that's great!", CONTENT_PLAYER, EMOTE_NULL,
      "Do you think it'll be enough to save me?", CONTENT_PLAYER, EMOTE_NULL,
      "No idea. Let's model it!", CONTENT_AI, EMOTE_NULL,
    ],
    status: //WORKSPACE: [skip_zoom] full "14 days" graph shown, w/ "survive/die" zones (unknown where you will land).
    [
      get_timer(0), "SKIP", CONTENT_AI, EMOTE_NULL,
    ],
    data: //WORKSPACE: graph zoomed into 10-hour scope. give data
    [
      get_timer(20), "Here's the new data.", CONTENT_AI, EMOTE_NULL,
      get_timer(20), "DATA:", CONTENT_DATA, EMOTE_NULL,
    ],
    axis: //WORKSPACE: [skip_axis] data imported, empty model framework shown. lead into "drag axis"
    [
      get_timer(0), "SKIP", CONTENT_AI, EMOTE_NULL,
    ],
    labels: //WORKSPACE: [skip_labels] variables labelled, need to label constants
    [
      get_timer(0), "SKIP", CONTENT_AI, EMOTE_NULL,
    ],
    labels_incorrect: //WORKSPACE: [skip_labels] labels chosen incorrectly; reset
    [
      get_timer(0), "SKIP", CONTENT_AI, EMOTE_NULL,
    ],
    constants: //WORKSPACE: labels chosen. show known constants, lead into "define unknowns"
    [
      get_timer(20), "Let's try that. We have a few known constants.", CONTENT_AI, EMOTE_NULL,
      get_timer(20), "Charge Rate", CONTENT_CONSTANT, 4,
      get_timer(20), "Match the data!", CONTENT_AI, EMOTE_NULL,
    ],
    submit: //WORKSPACE: values matched; lead to submit
    [
      get_timer(20), "Awesome- now submit the data to the chat!", CONTENT_AI, EMOTE_NULL,
    ],
    submitted_incorrect: //WORKSPACE: submitted before values correct; reset
    [
      get_timer(20), "I don't think that's right... try again.", CONTENT_AI, EMOTE_NULL,
    ],
    review: //WORKSPACE: submitted correct equation; lead to review survival chances
    [
      get_timer(20), "You did it! Let's see how it looks", CONTENT_AI, EMOTE_NULL,
    ],
    debrief: //WORKSPACE: draw conclusion based on review; lead back to lab
    [
      get_timer(20), "Looks Good/Bad!", CONTENT_AI, EMOTE_NULL,
    ],
    pre_improve: //LAB: about to show system
    [
      "Here's the system", CONTENT_AI, EMOTE_NULL,
    ],
    improve: //LAB: [skip_system] show system
    [
      get_timer(0), "SKIP", CONTENT_AI, EMOTE_NULL,
    ],
    post: //LAB: [skip_system] send to bed
    [
      get_timer(0), "SKIP", CONTENT_AI, EMOTE_NULL,
    ],
  },

  //check fuel
  { //one level. copy and paste from this { to the following } to create a new level
    pre_context: //LAB: [skip_night] you've just awoken. lead into show context animation.
    [
      "SKIP", CONTENT_AI, EMOTE_NULL,
    ],
    context: //LAB: [skip_context] context animation on-screen
    [
      "SKIP", CONTENT_AI, EMOTE_NULL,
    ],
    lets_go: //LAB: [skip_context] just shown context animation. lead into going to workspace.
    [
      "SKIP", CONTENT_AI, EMOTE_NULL,
    ],
    status: //WORKSPACE: [skip_zoom] full "14 days" graph shown, w/ "survive/die" zones (unknown where you will land).
    [
      get_timer(20), "You need enough fuel before your oxygen runs out.", CONTENT_AI, EMOTE_NULL,
    ],
    data: //WORKSPACE: graph zoomed into 10-hour scope. give data
    [
      get_timer(20), "Here's the data I have on the subject.", CONTENT_AI, EMOTE_NULL,
      get_timer(20), "DATA:", CONTENT_DATA, EMOTE_NULL,
    ],
    axis: //WORKSPACE: [skip_axis] data imported, empty model framework shown. lead into "drag axis"
    [
      get_timer(0), "SKIP", CONTENT_AI, EMOTE_NULL,
    ],
    labels: //WORKSPACE: [skip_labels] variables labelled, need to label constants
    [
      get_timer(0), "SKIP", CONTENT_AI, EMOTE_NULL,
    ],
    labels_incorrect: //WORKSPACE: [skip_labels] labels chosen incorrectly; reset
    [
      get_timer(0), "SKIP", CONTENT_AI, EMOTE_NULL,
    ],
    constants: //WORKSPACE: labels chosen. show known constants, lead into "define unknowns"
    [
      get_timer(20), "Let's try that. We have a few known constants.", CONTENT_AI, EMOTE_NULL,
      get_timer(20), "Existing Fuel", CONTENT_CONSTANT, 4,
      get_timer(20), "Match the data!", CONTENT_AI, EMOTE_NULL,
    ],
    submit: //WORKSPACE: values matched; lead to submit
    [
      get_timer(20), "Awesome- now submit the data to the chat!", CONTENT_AI, EMOTE_NULL,
    ],
    submitted_incorrect: //WORKSPACE: submitted before values correct; reset
    [
      get_timer(20), "I don't think that's right... try again.", CONTENT_AI, EMOTE_NULL,
    ],
    review: //WORKSPACE: submitted correct equation; lead to review survival chances
    [
      get_timer(20), "You did it! Let's see how it looks", CONTENT_AI, EMOTE_NULL,
    ],
    debrief: //WORKSPACE: draw conclusion based on review; lead back to lab
    [
      get_timer(20), "Looks Good/Bad!", CONTENT_AI, EMOTE_NULL,
    ],
    pre_improve: //LAB: about to show system
    [
      "Here's the system", CONTENT_AI, EMOTE_NULL,
    ],
    improve: //LAB: [skip_system] show system
    [
      "Hey that's ok- let's try improving something!", CONTENT_AI, EMOTE_NULL,
    ],
    post: //LAB: [skip_system] send to bed
    [
      "Goodnight!", CONTENT_AI, EMOTE_NULL,
    ],
  },

  //improve solar panels
  { //one level. copy and paste from this { to the following } to create a new level
    pre_context: //LAB: [skip_night] you've just awoken. lead into show context animation.
    [
      "Good morning, best friend!!!", CONTENT_AI, EMOTE_NULL,
      "Yikes. You look awful.", CONTENT_AI, EMOTE_NULL,
      "I was up all night working on the new solar panels.", CONTENT_PLAYER, EMOTE_NULL,
      "I FINALLY got them installed a few hours ago.", CONTENT_PLAYER, EMOTE_NULL,
    ],
    context: //LAB: [skip_context] context animation on-screen
    [
      "Oooooh, shiny!", CONTENT_AI, EMOTE_NULL,
      "I've been collecting data all night.", CONTENT_AI, EMOTE_NULL,
      "Let's pull up our model and see how your solar panels are working!", CONTENT_AI, EMOTE_NULL,
    ],
    lets_go: //LAB: [skip_context] just shown context animation. lead into going to workspace.
    [
      get_timer(0), "?", CONTENT_AI, EMOTE_NULL,
    ],
    status: //WORKSPACE: [skip_zoom] full "14 days" graph shown, w/ "survive/die" zones (unknown where you will land).
    [
      get_timer(0), "SKIP", CONTENT_AI, EMOTE_NULL,
    ],
    data: //WORKSPACE: graph zoomed into 10-hour scope. give data
    [
      get_timer(20), "Here's the new data!", CONTENT_AI, EMOTE_NULL,
      get_timer(20), "DATA:", CONTENT_DATA, EMOTE_NULL,
    ],
    axis: //WORKSPACE: [skip_axis] data imported, empty model framework shown. lead into "drag axis"
    [
      trigger_click, "Ok. What now?", CONTENT_PLAYER, EMOTE_NULL,
      get_timer(60), "You need to label the variables in our model!", CONTENT_AI, EMOTE_NULL,
      get_timer(60), "Drag from the axis on the graph into the equation.", CONTENT_AI, EMOTE_NULL,
    ],
    labels: //WORKSPACE: [skip_labels] variables labelled, need to label constants
    [
      get_timer(20), "Here are labels", CONTENT_AI, EMOTE_NULL,
      get_timer(60), "Starting Charge", CONTENT_LABEL, 0,
      get_timer(60), "Charge Rate", CONTENT_LABEL, 0,
    ],
    labels_incorrect: //WORKSPACE: [skip_labels] labels chosen incorrectly; reset
    [
      get_timer(20), "Nope!", CONTENT_AI, EMOTE_NULL,
      get_timer(60), "Starting Charge", CONTENT_LABEL, 0,
      get_timer(60), "Charge Rate", CONTENT_LABEL, 0,
    ],
    constants: //WORKSPACE: labels chosen. show known constants, lead into "define unknowns"
    [
      get_timer(20), "The initial charge is still 0.", CONTENT_AI, EMOTE_NULL,
      get_timer(20), "Starting Charge", CONTENT_CONSTANT, 4,
      get_timer(20), "You need to adjust the rate!", CONTENT_AI, EMOTE_NULL,
    ],
    submit: //WORKSPACE: values matched; lead to submit
    [
      get_timer(20), "Ready to show me your data?", CONTENT_AI, EMOTE_NULL,
    ],
    submitted_incorrect: //WORKSPACE: submitted before values correct; reset
    [
      get_timer(20), "Sorry, bestie. Those numbers don't match.", CONTENT_AI, EMOTE_NULL,
      get_timer(20), "Try again!", CONTENT_AI, EMOTE_NULL,
    ],
    review: //WORKSPACE: submitted correct equation; lead to review survival chances
    [
      get_timer(20), "Great job, bestie! The numbers matched up!", CONTENT_AI, EMOTE_NULL,
      trigger_click, "Wow! The new solar panels doubled our charge rate!", CONTENT_PLAYER, EMOTE_NULL,
      trigger_click, "Maybe I'm not gonna die after all!", CONTENT_PLAYER, EMOTE_NULL,
    ],
    debrief: //WORKSPACE: draw conclusion based on review; lead back to lab
    [
      get_timer(20), "Yeah! And plus, the bots look super cool now. 😎", CONTENT_AI, EMOTE_NULL,
    ],
    pre_improve: //LAB: about to show system
    [
      "So what should we do now?", CONTENT_AI, EMOTE_NULL,
      "Hmmm. The solar panels are charging faster, but it might not be enough.", CONTENT_PLAYER, EMOTE_NULL,
      "Can you pull up the fuel collecting model?", CONTENT_PLAYER, EMOTE_NULL,
      "I need to predict if I'm gonna make it.", CONTENT_PLAYER, EMOTE_NULL,
    ],
    improve: //LAB: [skip_system] show system
    [
      "SKIP", CONTENT_AI, EMOTE_NULL,
    ],
    post: //LAB: [skip_system] send to bed
    [
      "SKIP", CONTENT_AI, EMOTE_NULL,
    ],
  },

  //check fuel
  { //one level. copy and paste from this { to the following } to create a new level
    pre_context: //LAB: [skip_night] you've just awoken. lead into show context animation.
    [
      "SKIP", CONTENT_AI, EMOTE_NULL,
    ],
    context: //LAB: [skip_context] context animation on-screen
    [
      "SKIP", CONTENT_AI, EMOTE_NULL,
    ],
    lets_go: //LAB: [skip_context] just shown context animation. lead into going to workspace.
    [
      "SKIP", CONTENT_AI, EMOTE_NULL,
    ],
    status: //WORKSPACE: [skip_zoom] full "14 days" graph shown, w/ "survive/die" zones (unknown where you will land).
    [
      get_timer(20), "Remember, you need enough fuel by Day 14.", CONTENT_AI, EMOTE_NULL,
    ],
    data: //WORKSPACE: graph zoomed into 10-hour scope. give data
    [
      get_timer(20), "Drag the data onto the table.", CONTENT_AI, EMOTE_NULL,
      get_timer(20), "DATA:", CONTENT_DATA, EMOTE_NULL,
    ],
    axis: //WORKSPACE: [skip_axis] data imported, empty model framework shown. lead into "drag axis"
    [
      get_timer(0), "SKIP", CONTENT_AI, EMOTE_NULL,
    ],
    labels: //WORKSPACE: [skip_labels] variables labelled, need to label constants
    [
      get_timer(0), "SKIP", CONTENT_AI, EMOTE_NULL,
    ],
    labels_incorrect: //WORKSPACE: [skip_labels] labels chosen incorrectly; reset
    [
      get_timer(0), "SKIP", CONTENT_AI, EMOTE_NULL,
    ],
    constants: //WORKSPACE: labels chosen. show known constants, lead into "define unknowns"
    [
      get_timer(20), "Here's the fuel count.", CONTENT_AI, EMOTE_NULL,
      get_timer(20), "Existing Fuel", CONTENT_CONSTANT, 4,
      get_timer(20), "Match the data and we'll see if you're gonna die!", CONTENT_AI, EMOTE_NULL,
    ],
    submit: //WORKSPACE: values matched; lead to submit
    [
    ],
    submitted_incorrect: //WORKSPACE: submitted before values correct; reset
    [
      get_timer(20), "Nope! Try again.", CONTENT_AI, EMOTE_NULL,
    ],
    review: //WORKSPACE: submitted correct equation; lead to review survival chances
    [
      get_timer(20), "So? How does it look?", CONTENT_AI, EMOTE_NULL,
    ],
    debrief: //WORKSPACE: draw conclusion based on review; lead back to lab
    [
      trigger_click, "I can't believe it. I'm gonna make it!", CONTENT_PLAYER, EMOTE_NULL,
      get_timer(20), "Wait... you are???", CONTENT_AI, EMOTE_NULL,
      get_timer(20), "I didn't think that was actually gonna work... ", CONTENT_AI, EMOTE_NULL,
      trigger_click, "Thank you for everything, MAT!", CONTENT_PLAYER, EMOTE_NULL,
    ],
    pre_improve: //LAB: about to show system
    [
      "So... um... when do you leave?", CONTENT_AI, EMOTE_NULL,
      "Looks like I'll have enough fuel on X!", CONTENT_PLAYER, EMOTE_NULL,
      "Well, we could keep working on the robots, just in case... ", CONTENT_AI, EMOTE_NULL,
      "That's a good idea, but I think I need some rest. I was up all night!", CONTENT_PLAYER, EMOTE_NULL,
      "I'll try to stop by and say good-bye before I leave. Thanks again, MAT!!!", CONTENT_PLAYER, EMOTE_NULL,
      "Don't mention it.", CONTENT_AI, EMOTE_NULL,
    ],
    improve: //LAB: [skip_system] show system
    [
      "SKIP", CONTENT_AI, EMOTE_NULL,
    ],
    post: //LAB: [skip_system] send to bed
    [
      "SKIP", CONTENT_AI, EMOTE_NULL,
    ],
  },

  //improve drills
  { //one level. copy and paste from this { to the following } to create a new level
    pre_context: //LAB: [skip_night] you've just awoken. lead into show context animation.
    [
      "This is Phil Testing things", CONTENT_AI, EMOTE_NULL,
      "I'm going to get angry next sentence", CONTENT_AI, EMOTE_NULL,
      "I'm angry now", CONTENT_AI, EMOTE_CHANGE,
      "Still angry", CONTENT_AI, EMOTE_NULL,
      "I'm going to EMP", CONTENT_AI, EMOTE_NULL,
      "EMP", CONTENT_AI, EMOTE_EMP,
      "I've just EMPd", CONTENT_AI, EMOTE_NULL,
    ],
    context: //LAB: [skip_context] context animation on-screen
    [
      "Oooooh, shiny!", CONTENT_AI, EMOTE_NULL,
      "I've been collecting data all night.", CONTENT_AI, EMOTE_NULL,
      "Let's pull up our model and see how your solar panels are working!", CONTENT_AI, EMOTE_NULL,
    ],
    lets_go: //LAB: [skip_context] just shown context animation. lead into going to workspace.
    [
      get_timer(20), "?", CONTENT_AI, EMOTE_NULL,
    ],
    status: //WORKSPACE: [skip_zoom] full "14 days" graph shown, w/ "survive/die" zones (unknown where you will land).
    [
      get_timer(20), "?", CONTENT_AI, EMOTE_NULL,
    ],
    data: //WORKSPACE: graph zoomed into 10-hour scope. give data
    [
      get_timer(20), "Here's the new data!", CONTENT_AI, EMOTE_NULL,
      get_timer(20), "DATA:", CONTENT_DATA, EMOTE_NULL,
    ],
    axis: //WORKSPACE: [skip_axis] data imported, empty model framework shown. lead into "drag axis"
    [
      trigger_click, "Ok. What now?", CONTENT_PLAYER, EMOTE_NULL,
      get_timer(60), "You need to label the variables in our model!", CONTENT_AI, EMOTE_NULL,
      get_timer(60), "Drag from the axis on the graph into the equation.", CONTENT_AI, EMOTE_NULL,
    ],
    labels: //WORKSPACE: [skip_labels] variables labelled, need to label constants
    [
      get_timer(20), "Here are labels", CONTENT_AI, EMOTE_NULL,
      get_timer(60), "Drill Rate", CONTENT_LABEL, 0,
      get_timer(60), "Surface Area", CONTENT_LABEL, 0,
      get_timer(60), "Crystal Density", CONTENT_LABEL, 0,
      get_timer(60), "Existing Fuel", CONTENT_LABEL, 0,
    ],
    labels_incorrect: //WORKSPACE: [skip_labels] labels chosen incorrectly; reset
    [
      get_timer(20), "Nope!", CONTENT_AI, EMOTE_NULL,
      get_timer(60), "Drill Rate", CONTENT_LABEL, 0,
      get_timer(60), "Surface Area", CONTENT_LABEL, 0,
      get_timer(60), "Crystal Density", CONTENT_LABEL, 0,
      get_timer(60), "Existing Fuel", CONTENT_LABEL, 0,
    ],
    constants: //WORKSPACE: labels chosen. show known constants, lead into "define unknowns"
    [
      get_timer(20), "The initial charge is still 0.", CONTENT_AI, EMOTE_NULL,
      get_timer(20), "Existing Fuel", CONTENT_CONSTANT, 4,
      get_timer(20), "You need to adjust the rate!", CONTENT_AI, EMOTE_NULL,
    ],
    submit: //WORKSPACE: values matched; lead to submit
    [
      get_timer(20), "Ready to show me your data?", CONTENT_AI, EMOTE_NULL,
    ],
    submitted_incorrect: //WORKSPACE: submitted before values correct; reset
    [
      get_timer(20), "Sorry, bestie. Those numbers don't match.", CONTENT_AI, EMOTE_NULL,
      get_timer(20), "Try again!", CONTENT_AI, EMOTE_NULL,
    ],
    review: //WORKSPACE: submitted correct equation; lead to review survival chances
    [
      get_timer(20), "Great job, bestie! The numbers matched up!", CONTENT_AI, EMOTE_NULL,
      trigger_click, "Wow! The new solar panels doubled our charge rate!", CONTENT_PLAYER, EMOTE_NULL,
      trigger_click, "Maybe I'm not gonna die after all!", CONTENT_PLAYER, EMOTE_NULL,
    ],
    debrief: //WORKSPACE: draw conclusion based on review; lead back to lab
    [
      get_timer(20), "Yeah! And plus, the bots look super cool now. 😎", CONTENT_AI, EMOTE_NULL,
    ],
    pre_improve: //LAB: about to show system
    [
      "So what should we do now?", CONTENT_AI, EMOTE_NULL,
      "Hmmm. The solar panels are charging faster, but it might not be enough.", CONTENT_PLAYER, EMOTE_NULL,
      "Can you pull up the fuel collecting model?", CONTENT_PLAYER, EMOTE_NULL,
      "I need to predict if I'm gonna make it.", CONTENT_PLAYER, EMOTE_NULL,
    ],
    improve: //LAB: [skip_system] show system
    [
      "?", CONTENT_PLAYER, EMOTE_NULL,
    ],
    post: //LAB: [skip_system] send to bed
    [
      "?", CONTENT_PLAYER, EMOTE_NULL,
    ],
  },

];

var used_text = english_text;
