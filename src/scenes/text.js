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
      "Welcome to the Forever Mine. We're built to last forever!", CONTENT_AI, EMOTE_NULL,
      "I'm MAL, your Mining Activity Liaison.", CONTENT_AI, EMOTE_NULL,
      "Wha... What happened?", CONTENT_PLAYER, EMOTE_NULL,
      "You stumbled in here, powered me on, and then just passed out.", CONTENT_AI, EMOTE_NULL,
      "I need to get out of here.", CONTENT_PLAYER, EMOTE_NULL,
      "What? But you just got here! I've been waiting 500 years!", CONTENT_AI, EMOTE_NULL,
      "Aren't we gonna get the mine running again?", CONTENT_AI, EMOTE_NULL,
      "Oh.", CONTENT_PLAYER, EMOTE_NULL,
      "MAL, I'm so sorry. The fuel on this planet is sort of... outdated.", CONTENT_PLAYER, EMOTE_NULL,
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
      "Okay, fine. I'm sorry I called you outdated.", CONTENT_PLAYER, EMOTE_NULL,
      "Do you think we can get enough fuel in time?", CONTENT_PLAYER, EMOTE_NULL,
      "Sure!", CONTENT_AI, EMOTE_NULL,
      "Well, maybe. I have no idea.", CONTENT_AI, EMOTE_NULL,
    ],
    status: //WORKSPACE: [skip_zoom] full "14 days" graph shown, w/ "survive/die" zones (unknown where you will land).
    [
      get_timer(100), "This is a modeling tool.", CONTENT_AI, EMOTE_NULL,
      get_timer(100), "We can use it to predict if we're mining fast enough to get you out of here!", CONTENT_AI, EMOTE_NULL,
      get_timer(100), "You know, before you run out of oxygen and die.", CONTENT_AI, EMOTE_NULL,
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
      get_timer(80), "You sure you want my help?", CONTENT_AI, EMOTE_NULL,
      get_timer(80), "Isn't there a newer, fancier AI you could call?", CONTENT_AI, EMOTE_NULL,
      trigger_click, "MAL, please.", CONTENT_PLAYER, EMOTE_NULL,
      get_timer(80), "Fiiiine.", CONTENT_AI, EMOTE_NULL,
      get_timer(80), "We need to make our model. Then we'll use it to make predictions.", CONTENT_AI, EMOTE_NULL,
      get_timer(80), "First you need to define our variables.", CONTENT_AI, EMOTE_NULL,
      get_timer(80), "Drag the labels from the graph into our equation.", CONTENT_AI, EMOTE_NULL,
    ],
    labels: //WORKSPACE: [skip_labels] variables labelled, need to label constants
    [
      get_timer(60), "Now label the constants.", CONTENT_AI, EMOTE_NULL,
      get_timer(60), "I'd do it myself, but I'm too busy rusting.", CONTENT_AI, EMOTE_NULL,
      trigger_click, "Focus, MAL.", CONTENT_PLAYER, EMOTE_NULL,
      get_timer(60), "Okay, okay. Here are your choices:", CONTENT_AI, EMOTE_NULL,
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
      get_timer(100), "We need to match the collected data.", CONTENT_AI, EMOTE_NULL,
      get_timer(100), "Then the line will give us a prediction!", CONTENT_AI, EMOTE_NULL,
      get_timer(80), "Here's the fuel we started out with.", CONTENT_AI, EMOTE_NULL,
      get_timer(60), "Existing Fuel", CONTENT_CONSTANT, 4,
      get_timer(100), "Drag it into the equation.", CONTENT_AI, EMOTE_NULL,
      get_timer(100), "Then fix the rate so the data matches up!", CONTENT_AI, EMOTE_NULL,
    ],
    submit: //WORKSPACE: values matched; lead to submit
    [
      get_timer(120), "Ok. Moment of truth!", CONTENT_AI, EMOTE_NULL,
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
      "Wow! MAL, this is amazing!", CONTENT_PLAYER, EMOTE_NULL,
      "Do you think we'll get enough fuel in time?", CONTENT_PLAYER, EMOTE_NULL,
      "Only one way to find out.", CONTENT_AI, EMOTE_NULL,
      "You know, unless you'd rather take another nap. You're good at that.", CONTENT_AI, EMOTE_NULL,
      "MAL, I swear. I will switch you off.", CONTENT_PLAYER, EMOTE_NULL,
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
      trigger_click, "MAL, I don't need to make any more models.", CONTENT_PLAYER, EMOTE_NULL,
      trigger_click, "Look at the graph. I'm gonna survive!", CONTENT_PLAYER, EMOTE_NULL,
      get_timer(120), "Wait. You are???", CONTENT_AI, EMOTE_NULL,
      get_timer(120), "Wow. Those little bots really ARE working fast.", CONTENT_AI, EMOTE_NULL,
    ],
    pre_improve: //LAB: about to show system
    [
      "This is great! At this rate, I'll have enough fuel by Day 7!", CONTENT_PLAYER, EMOTE_NULL,
      "I can't wait to get off this dusty old planet!", CONTENT_PLAYER, EMOTE_NULL,
      "Um... no offense, MAL.", CONTENT_PLAYER, EMOTE_NULL,
      "None taken. Who knows? Maybe you'll decide to stick around.", CONTENT_AI, EMOTE_NULL,
      "My old humans used to say this place was nearly impossible to leave.", CONTENT_AI, EMOTE_NULL,
      "Sorry, MAL. I really need to get back to Earth.", CONTENT_PLAYER, EMOTE_NULL,
      "I'll stop by tomorrow and check on our progress.", CONTENT_PLAYER, EMOTE_NULL,
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
      "Hey, MAL. How are things looking out there?", CONTENT_PLAYER, EMOTE_NULL,
      "Hello? MAL?", CONTENT_PLAYER, EMOTE_NULL,
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
      "Okay. Don't panic. We can handle this.", CONTENT_PLAYER, EMOTE_NULL,
      "Can you help me predict if I'm still gonna survive?", CONTENT_PLAYER, EMOTE_NULL,
      "You know, I'm starting to feel like you're just using me for my modeling software.", CONTENT_AI, EMOTE_NULL,
      "MAL, please.", CONTENT_PLAYER, EMOTE_NULL,
      "Oh, fine. Come on.", CONTENT_AI, EMOTE_NULL,
    ],
    status: //WORKSPACE: [skip_zoom] full "14 days" graph shown, w/ "survive/die" zones (unknown where you will land).
    [
      get_timer(80), "Here we go.", CONTENT_AI, EMOTE_NULL,
      get_timer(120), "Let's predict how doomed you are!", CONTENT_AI, EMOTE_NULL,
    ],
    data: //WORKSPACE: graph zoomed into 10-hour scope. give data
    [
      get_timer(80), "Here's our new data.", CONTENT_AI, EMOTE_NULL,
      get_timer(80), "DATA:", CONTENT_DATA, EMOTE_NULL,
      get_timer(80), "Drag it over to the table!", CONTENT_AI, EMOTE_NULL,
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
      get_timer(60), "You need to figure out the rate. Match the data!", CONTENT_AI, EMOTE_NULL,
    ],
    submit: //WORKSPACE: values matched; lead to submit
    [
      get_timer(80), "Ready? Show me what you've got!", CONTENT_AI, EMOTE_NULL,
    ],
    submitted_incorrect: //WORKSPACE: submitted before values correct; reset
    [
      get_timer(80), "Not even close. Try again.", CONTENT_AI, EMOTE_NULL,
    ],
    review: //WORKSPACE: submitted correct equation; lead to review survival chances
    [
      get_timer(120), "Welp, this is a... ", CONTENT_AI, EMOTE_NULL,
      get_timer(80), "What's a nicer word for \"trainwreck\"?", CONTENT_AI, EMOTE_NULL,
      trigger_click, "It's a disaster.", CONTENT_PLAYER, EMOTE_NULL,
      get_timer(120), "\"A sudden event that causes great damage or loss of life.\"", CONTENT_AI, EMOTE_NULL,
      get_timer(80), "Yep, disaster works.", CONTENT_AI, EMOTE_NULL,
      get_timer(120), "Look on the bright side. At least we're having fun!", CONTENT_AI, EMOTE_NULL,
    ],
    debrief: //WORKSPACE: draw conclusion based on review; lead back to lab
    [
    ],
    pre_improve: //LAB: about to show system
    [
      "At this rate, I'm not going to survive.", CONTENT_PLAYER, EMOTE_NULL,
      "I need to build something to help the robots work faster.", CONTENT_PLAYER, EMOTE_NULL,
      "Oooh. That sounds fun! You're MUCH more interesting than my old humans.", CONTENT_AI, EMOTE_NULL,
      "I've got a tool that might help!", CONTENT_AI, EMOTE_NULL,
    ],
    improve: //LAB: [skip_system] show system
    [
      "This diagram shows the different systems that affect our mining rate.", CONTENT_AI, EMOTE_NULL,
      "Maybe you can use your material science skillz to improve something!", CONTENT_AI, EMOTE_NULL,
    ],
    post: //LAB: [skip_system] send to bed
    [
      "Let's start with the batteries. How good is your charger?", CONTENT_PLAYER, EMOTE_NULL,
      "Welllll... it does charge the robots' batteries. Eventually.", CONTENT_AI, EMOTE_NULL,
      "I mean, most of the time. If it's not too windy.", CONTENT_AI, EMOTE_NULL,
      "Okay. Sounds like the charger could use some improvements.", CONTENT_PLAYER, EMOTE_NULL,
      "I'll see you tomorrow, MAL. I've got work to do!", CONTENT_PLAYER, EMOTE_NULL,
    ],
  },

  //improve charge rate
  { //one level. copy and paste from this { to the following } to create a new level
    pre_context: //LAB: [skip_night] you've just awoken. lead into show context animation.
    [
      "Good morning, human!", CONTENT_AI, EMOTE_NULL,
      "Yikes. You look terrible.", CONTENT_AI, EMOTE_NULL,
      "I stayed up all night building a supercharger for the robots.", CONTENT_PLAYER, EMOTE_NULL,
    ],
    context: //LAB: [skip_context] context animation on-screen
    [
      "Wow! YOU built THAT?", CONTENT_AI, EMOTE_NULL,
      "You're, like, the coolest human ever! I'm so glad you got stranded here!", CONTENT_AI, EMOTE_NULL,
      "Um.... thanks.", CONTENT_PLAYER, EMOTE_NULL,
      "Can we look at how the new charger is working?", CONTENT_PLAYER, EMOTE_NULL,
      "Yeah! Let's do it!", CONTENT_AI, EMOTE_NULL,
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
      get_timer(80), "Here's the data I've collected for your new charger.", CONTENT_AI, EMOTE_NULL,
      get_timer(60), "DATA:", CONTENT_DATA, EMOTE_NULL,
    ],
    axis: //WORKSPACE: [skip_axis] data imported, empty model framework shown. lead into "drag axis"
    [
      get_timer(80), "We need to make a new model.", CONTENT_AI, EMOTE_NULL,
      get_timer(80), "We'll use it to predict how fast the robots are charging up!", CONTENT_AI, EMOTE_NULL,
      trigger_click, "Ok. Let's see... ", CONTENT_PLAYER, EMOTE_NULL,
      trigger_click, "First I need to label the variables.", CONTENT_PLAYER, EMOTE_NULL,
      get_timer(80), "Yep! Drag from the graph into our equation.", CONTENT_AI, EMOTE_NULL,
    ],
    labels: //WORKSPACE: [skip_labels] variables labelled, need to label constants
    [
      get_timer(80), "Now label the constants.", CONTENT_AI, EMOTE_NULL,
      get_timer(60), "Here are your choices:", CONTENT_AI, EMOTE_NULL,
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
      trigger_click, "Great. What now?", CONTENT_PLAYER, EMOTE_NULL,
      get_timer(20), "The batteries start on empty.", CONTENT_AI, EMOTE_NULL,
      get_timer(20), "Starting Charge", CONTENT_CONSTANT, 4,
      get_timer(20), "You need to adjust the rate.", CONTENT_AI, EMOTE_NULL,
    ],
    submit: //WORKSPACE: values matched; lead to submit
    [
      get_timer(60), "Ready? Show me your data!", CONTENT_AI, EMOTE_NULL,
    ],
    submitted_incorrect: //WORKSPACE: submitted before values correct; reset
    [
      get_timer(60), "Nope. Those numbers don't match.", CONTENT_AI, EMOTE_NULL,
      get_timer(60), "Try again!", CONTENT_AI, EMOTE_NULL,
    ],
    review: //WORKSPACE: submitted correct equation; lead to review survival chances
    [
      get_timer(80), "Wow! Your supercharger doubled our charge rate!", CONTENT_AI, EMOTE_NULL,
      get_timer(80), "Those little bots are gonna love it!", CONTENT_AI, EMOTE_NULL,
      trigger_click, "And I might actually survive!", CONTENT_PLAYER, EMOTE_NULL,
      get_timer(80), "Oh. Yeah, that too.", CONTENT_AI, EMOTE_NULL,
    ],
    debrief: //WORKSPACE: draw conclusion based on review; lead back to lab
    [
    ],
    pre_improve: //LAB: about to show system
    [
      "Okay, MAL. The robots are charging up faster.", CONTENT_PLAYER, EMOTE_NULL,
      "Can you pull up our fuel collection model?", CONTENT_PLAYER, EMOTE_NULL,
      "I need to see if I'm gonna survive.", CONTENT_PLAYER, EMOTE_NULL,
      "Ooh, exciting. Let's do it!", CONTENT_AI, EMOTE_NULL,
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
      get_timer(80), "This is our fuel collection model.", CONTENT_AI, EMOTE_NULL,
      get_timer(80), "Let's predict if we'll get enough fuel before you run out of air!", CONTENT_AI, EMOTE_NULL,
    ],
    data: //WORKSPACE: graph zoomed into 10-hour scope. give data
    [
      get_timer(80), "Drag the mining data onto the table.", CONTENT_AI, EMOTE_NULL,
      get_timer(60), "DATA:", CONTENT_DATA, EMOTE_NULL,
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
      get_timer(20), "Go ahead. Match the data!", CONTENT_AI, EMOTE_NULL,
    ],
    submit: //WORKSPACE: values matched; lead to submit
    [
      get_timer(20), "Show me your results when you're ready!", CONTENT_AI, EMOTE_NULL,
    ],
    submitted_incorrect: //WORKSPACE: submitted before values correct; reset
    [
      get_timer(20), "Nope! Try again.", CONTENT_AI, EMOTE_NULL,
    ],
    review: //WORKSPACE: submitted correct equation; lead to review survival chances
    [
      get_timer(20), "So? How's it look?", CONTENT_AI, EMOTE_NULL,
    ],
    debrief: //WORKSPACE: draw conclusion based on review; lead back to lab
    [
      trigger_click, "We're on the right track.", CONTENT_PLAYER, EMOTE_NULL,
      trigger_click, "But I'm still not gonna make it.", CONTENT_PLAYER, EMOTE_NULL,
    ],
    pre_improve: //LAB: about to show system
    [
      "Awwwww. Cheer up, human.", CONTENT_AI, EMOTE_NULL,
    ],
    improve: //LAB: [skip_system] show system
    [
      "Look! We improved the efficiency of the battery charger!", CONTENT_AI, EMOTE_NULL,
    ],
    post: //LAB: [skip_system] send to bed
    [
      "Isn't this so much fun?", CONTENT_AI, EMOTE_NULL,
      "Fun?! I only have X days of oxygen left!", CONTENT_PLAYER, EMOTE_NULL,
      "You know what you need? A good night's sleep.", CONTENT_AI, EMOTE_NULL,
      "I can't sleep right now, MAL. I need to keep working!", CONTENT_PLAYER, EMOTE_NULL,
      "Poor human. Obviously you're too tired to think straight, so I'm shutting down the system until tomorrow.", CONTENT_AI, EMOTE_NULL,
      "Wait, what??? You're allowed to do that?", CONTENT_PLAYER, EMOTE_NULL,
      "Aren't you programmed to help me?", CONTENT_PLAYER, EMOTE_NULL,
      "Sorry! Circuits glitching. Can't hear you.", CONTENT_AI, EMOTE_NULL,
      "Go count some robots, or sheep, or whatever it is humans do.", CONTENT_AI, EMOTE_NULL,
      "We'll get back to work in the morning!", CONTENT_AI, EMOTE_NULL,
    ],
  },

  //initial charge rate
  { //one level. copy and paste from this { to the following } to create a new level
    pre_context: //LAB: [skip_night] you've just awoken. lead into show context animation.
    [
      "Good morning, human! Sleep well?", CONTENT_AI, EMOTE_NULL,
      "Not exactly.", CONTENT_PLAYER, EMOTE_NULL,
      "Awwww, don't be mad. I've got good news!", CONTENT_AI, EMOTE_NULL,
    ],
    context: //LAB: [skip_context] context animation on-screen
    [
      "The robots are coming back with some leftover charge.", CONTENT_AI, EMOTE_NULL,
      "That means they're charging up and getting back to work faster than we thought!", CONTENT_AI, EMOTE_NULL,
    ],
    lets_go: //LAB: [skip_context] just shown context animation. lead into going to workspace.
    [
      "Oh. That's great!", CONTENT_PLAYER, EMOTE_NULL,
      "Do you think it'll be enough to save me?", CONTENT_PLAYER, EMOTE_NULL,
      "Sure!", CONTENT_AI, EMOTE_NULL,
      "Or, you know, not. I really have no idea.", CONTENT_AI, EMOTE_NULL,
    ],
    status: //WORKSPACE: [skip_zoom] full "14 days" graph shown, w/ "survive/die" zones (unknown where you will land).
    [
      get_timer(0), "SKIP", CONTENT_AI, EMOTE_NULL,
    ],
    data: //WORKSPACE: graph zoomed into 10-hour scope. give data
    [
      get_timer(20), "Here's the new charging data!", CONTENT_AI, EMOTE_NULL,
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
      trigger_click, "Um, MAL... ", CONTENT_PLAYER, EMOTE_NULL,
      trigger_click, "Don't take this the wrong way... ", CONTENT_PLAYER, EMOTE_NULL,
      trigger_click, "But why are we looking at batteries right now?", CONTENT_PLAYER, EMOTE_NULL,
      trigger_click, "Can't we go straight to our fuel collection model?", CONTENT_PLAYER, EMOTE_NULL,
      get_timer(80), "Humans. Always in such a hurry.", CONTENT_AI, EMOTE_NULL,
      get_timer(80), "Don't you wanna know how much faster the bots are charging?", CONTENT_AI, EMOTE_NULL,
      trigger_click, "I need to know if I'm gonna survive!", CONTENT_PLAYER, EMOTE_NULL,
      get_timer(80), "You know, I'm not sure I like your tone.", CONTENT_AI, EMOTE_NULL,
      get_timer(80), "Maybe we should take a break until tomorrow.", CONTENT_AI, EMOTE_NULL,
      trigger_click, "NO!", CONTENT_PLAYER, EMOTE_NULL,
      trigger_click, "I mean... no. You're right, MAL.", CONTENT_PLAYER, EMOTE_NULL,
      trigger_click, "Let's do this super interesting and relevant model.", CONTENT_PLAYER, EMOTE_NULL,
      get_timer(80), "Great!! 😊", CONTENT_AI, EMOTE_NULL,
      get_timer(80), "Here's the new charge rate.", CONTENT_AI, EMOTE_NULL,
      get_timer(60), "Charge Rate", CONTENT_CONSTANT, 4,
      get_timer(80), "Match the data!", CONTENT_AI, EMOTE_NULL,
    ],
    submit: //WORKSPACE: values matched; lead to submit
    [
      get_timer(80), "Ready? Let's see what you've got!", CONTENT_AI, EMOTE_NULL,
    ],
    submitted_incorrect: //WORKSPACE: submitted before values correct; reset
    [
      get_timer(20), "Nope! Try again.", CONTENT_AI, EMOTE_NULL,
    ],
    review: //WORKSPACE: submitted correct equation; lead to review survival chances
    [
      get_timer(80), "Great job, human!!!", CONTENT_AI, EMOTE_NULL,
      get_timer(80), "Looks like the robots are charging faster than yesterday!", CONTENT_AI, EMOTE_NULL,
    ],
    debrief: //WORKSPACE: draw conclusion based on review; lead back to lab
    [
      trigger_click, "Gee. What a surprise.", CONTENT_PLAYER, EMOTE_NULL,
    ],
    pre_improve: //LAB: about to show system
    [
      "So... I don't mean to sound impatient, MAL.", CONTENT_PLAYER, EMOTE_NULL,
      "But can we predict if I'm gonna survive now?", CONTENT_PLAYER, EMOTE_NULL,
      "Sure! Why didn't you say so?", CONTENT_AI, EMOTE_NULL,
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
      get_timer(20), "Let's see if you're gonna get enough fuel in time!", CONTENT_AI, EMOTE_NULL,
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
      get_timer(20), "And here's our existing fuel.", CONTENT_AI, EMOTE_NULL,
      get_timer(20), "Existing Fuel", CONTENT_CONSTANT, 4,
      get_timer(20), "Match the data!", CONTENT_AI, EMOTE_NULL,
    ],
    submit: //WORKSPACE: values matched; lead to submit
    [
      get_timer(20), "Ready? I'll take a look!", CONTENT_AI, EMOTE_NULL,
    ],
    submitted_incorrect: //WORKSPACE: submitted before values correct; reset
    [
      get_timer(20), "Those numbers don't match. Try again!", CONTENT_AI, EMOTE_NULL,
    ],
    review: //WORKSPACE: submitted correct equation; lead to review survival chances
    [
      get_timer(20), "Yeah!! Great job!", CONTENT_AI, EMOTE_NULL,
    ],
    debrief: //WORKSPACE: draw conclusion based on review; lead back to lab
    [
      trigger_click, "Ugh. I'm STILL not gonna make it!", CONTENT_PLAYER, EMOTE_NULL,
      get_timer(20), "Don't worry, human. We'll keep working!", CONTENT_AI, EMOTE_NULL,
    ],
    pre_improve: //LAB: about to show system
    [
      "Let's find another system to improve.", CONTENT_AI, EMOTE_NULL,
    ],
    improve: //LAB: [skip_system] show system
    [
      "We already worked on the batteries. That leaves solar panels and drills.", CONTENT_AI, EMOTE_NULL,
    ],
    post: //LAB: [skip_system] send to bed
    [
      "Okay, let's see.", CONTENT_PLAYER, EMOTE_NULL,
      "I've got some materials on my ship. I might be able to build a more powerful solar panel!", CONTENT_PLAYER, EMOTE_NULL,
      "I better get to work, MAL. See you tomorrow!", CONTENT_PLAYER, EMOTE_NULL,
    ],
  },

  //improve solar panels
  { //one level. copy and paste from this { to the following } to create a new level
    pre_context: //LAB: [skip_night] you've just awoken. lead into show context animation.
    [
      "Good morning, human!", CONTENT_AI, EMOTE_NULL,
      "Beautiful day out there, huh? The sun is shining, the bots are drilling...", CONTENT_AI, EMOTE_NULL,
      "I could look at that view forever, couldn't you?", CONTENT_AI, EMOTE_NULL,
      "Um.... sure.", CONTENT_PLAYER, EMOTE_NULL,
      "Can we get to work, MAL? I installed the new solar panels a couple hours ago.", CONTENT_PLAYER, EMOTE_NULL,
    ],
    context: //LAB: [skip_context] context animation on-screen
    [
      "Wow. That's even cooler than your supercharger!", CONTENT_AI, EMOTE_NULL,
      "You are officially my favorite human ever.", CONTENT_AI, EMOTE_NULL,
    ],
    lets_go: //LAB: [skip_context] just shown context animation. lead into going to workspace.
    [
      "Thanks, MAL. Do you have the new charging data?", CONTENT_PLAYER, EMOTE_NULL,
      "Yep! We're ready to work!", CONTENT_AI, EMOTE_NULL,
    ],
    status: //WORKSPACE: [skip_zoom] full "14 days" graph shown, w/ "survive/die" zones (unknown where you will land).
    [
      get_timer(0), "SKIP", CONTENT_AI, EMOTE_NULL,
    ],
    data: //WORKSPACE: graph zoomed into 10-hour scope. give data
    [
      get_timer(80), "Here's the new data.", CONTENT_AI, EMOTE_NULL,
      get_timer(80), "DATA:", CONTENT_DATA, EMOTE_NULL,
    ],
    axis: //WORKSPACE: [skip_axis] data imported, empty model framework shown. lead into "drag axis"
    [
      get_timer(80), "We'll use this model to see if your solar panels are improving the charge rate.", CONTENT_AI, EMOTE_NULL,
      get_timer(80), "First label the variables!", CONTENT_AI, EMOTE_NULL,
      get_timer(80), "Drag from the graph into the equation.", CONTENT_AI, EMOTE_NULL,
    ],
    labels: //WORKSPACE: [skip_labels] variables labelled, need to label constants
    [
      get_timer(80), "Now label the constants.", CONTENT_AI, EMOTE_NULL,
      get_timer(80), "Here are your choices:", CONTENT_AI, EMOTE_NULL,
      get_timer(60), "Starting Charge", CONTENT_LABEL, 0,
      get_timer(60), "Charge Rate", CONTENT_LABEL, 0,
    ],
    labels_incorrect: //WORKSPACE: [skip_labels] labels chosen incorrectly; reset
    [
      get_timer(20), "Nope! Try again!", CONTENT_AI, EMOTE_NULL,
      get_timer(60), "Starting Charge", CONTENT_LABEL, 0,
      get_timer(60), "Charge Rate", CONTENT_LABEL, 0,
    ],
    constants: //WORKSPACE: labels chosen. show known constants, lead into "define unknowns"
    [
      get_timer(80), "Here's the starting charge.", CONTENT_AI, EMOTE_NULL,
      get_timer(60), "Starting Charge", CONTENT_CONSTANT, 4,
      get_timer(80), "You need to adjust the rate!", CONTENT_AI, EMOTE_NULL,
    ],
    submit: //WORKSPACE: values matched; lead to submit
    [
      get_timer(80), "Ready? Let's see how those solar panels are affecting our charge rate!", CONTENT_AI, EMOTE_NULL,
    ],
    submitted_incorrect: //WORKSPACE: submitted before values correct; reset
    [
      get_timer(80), "Nope. Those numbers don't match.", CONTENT_AI, EMOTE_NULL,
      get_timer(80), "Try again!", CONTENT_AI, EMOTE_NULL,
    ],
    review: //WORKSPACE: submitted correct equation; lead to review survival chances
    [
      get_timer(80), "Nice job, human!", CONTENT_AI, EMOTE_NULL,
      get_timer(80), "Thanks to your solar panels, the robots are charging up faster than ever!", CONTENT_AI, EMOTE_NULL,
    ],
    debrief: //WORKSPACE: draw conclusion based on review; lead back to lab
    [
      trigger_click, "This is great!", CONTENT_PLAYER, EMOTE_NULL,
      trigger_click, "I might actually make it!", CONTENT_PLAYER, EMOTE_NULL,
    ],
    pre_improve: //LAB: about to show system
    [
      "Okay, MAL. Can you pull up our fuel collection model?", CONTENT_PLAYER, EMOTE_NULL,
      "MAL?", CONTENT_PLAYER, EMOTE_NULL,
      "Maybe we should take aonther break. Come back tomorrow.", CONTENT_AI, EMOTE_NULL,
      "You've got to be kidding me.", CONTENT_PLAYER, EMOTE_NULL,
      "MAL, I need to know if I'm going to survive!", CONTENT_PLAYER, EMOTE_NULL,
      "Can you PLEASE pull up our fuel collection model?", CONTENT_PLAYER, EMOTE_NULL,
      "Fine. Whatever.", CONTENT_AI, EMOTE_NULL,
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
      get_timer(80), "You need enough fuel by Day 14.", CONTENT_AI, EMOTE_NULL,
      get_timer(80), "Blah, blah, blah.", CONTENT_AI, EMOTE_NULL,
    ],
    data: //WORKSPACE: graph zoomed into 10-hour scope. give data
    [
      get_timer(80), "Drag the data onto the table.", CONTENT_AI, EMOTE_NULL,
      get_timer(60), "DATA:", CONTENT_DATA, EMOTE_NULL,
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
      get_timer(80), "Here's our fuel count.", CONTENT_AI, EMOTE_NULL,
      get_timer(60), "Existing Fuel", CONTENT_CONSTANT, 4,
      get_timer(60), "Match the data.", CONTENT_AI, EMOTE_NULL,
      get_timer(60), "Or don't. I don't really care.", CONTENT_AI, EMOTE_NULL,
    ],
    submit: //WORKSPACE: values matched; lead to submit
    [
    ],
    submitted_incorrect: //WORKSPACE: submitted before values correct; reset
    [
      get_timer(20), "Nope. Try again.", CONTENT_AI, EMOTE_NULL,
    ],
    review: //WORKSPACE: submitted correct equation; lead to review survival chances
    [
      get_timer(20), "So? Are we done with this yet?", CONTENT_AI, EMOTE_NULL,
    ],
    debrief: //WORKSPACE: draw conclusion based on review; lead back to lab
    [
      trigger_click, "I can't believe it. I'm almost there!!!", CONTENT_PLAYER, EMOTE_NULL,
      get_timer(20), "Wait... really?", CONTENT_AI, EMOTE_NULL,
      trigger_click, "One more improvement, and I think I'll make it!", CONTENT_PLAYER, EMOTE_NULL,
    ],
    pre_improve: //LAB: about to show system
    [
      "Let's keep working! The way things are looking, I might get off this planet today!", CONTENT_PLAYER, EMOTE_NULL,
      "Can you tell me about the robots' drills?", CONTENT_PLAYER, EMOTE_NULL,
      "You know, this relationship is feeling very one-sided.", CONTENT_AI, EMOTE_NULL,
      "Please, MAL. I really need your help here.", CONTENT_PLAYER, EMOTE_NULL,
    ],
    improve: //LAB: [skip_system] show system
    [
      "Fiiiine. The drills are programmed to mine at a slow and steady rate, so they'll last... you know... forever.", CONTENT_AI, EMOTE_NULL,
      "We can speed up the drills, but not too much, or they'll burn out.", CONTENT_AI, EMOTE_NULL,
    ],
    post: //LAB: [skip_system] send to bed
    [
      "That's great! All we need to do is speed up the drills just enough for me to get out of here!", CONTENT_PLAYER, EMOTE_NULL,
      "We're so close, it shouldn't take much.", CONTENT_PLAYER, EMOTE_NULL,
    ],
  },

  //improve drills
  { //one level. copy and paste from this { to the following } to create a new level
    pre_context: //LAB: [skip_night] you've just awoken. lead into show context animation.
    [
      "MAL, can you pull up a model for drill speed?", CONTENT_PLAYER, EMOTE_NULL,
      "Wait. Hang on. Let's talk about this.", CONTENT_AI, EMOTE_NULL,
      "You don't REALLY want to leave, do you?", CONTENT_AI, EMOTE_NULL,
      "Can't you just... I don't know... hang out for a while?", CONTENT_AI, EMOTE_NULL,
      "MAL, I'm almost out of oxygen.", CONTENT_PLAYER, EMOTE_NULL,
      "Oxygen? THAT'S what all the fuss is about?", CONTENT_AI, EMOTE_NULL,
      "I've got a built-in oxygen generator. I can turn it on right now!", CONTENT_AI, EMOTE_NULL,
      "What?! MAL, why didn't you tell me you had oxygen? I thought I was going to die!", CONTENT_PLAYER, EMOTE_NULL,
      "Well, if you knew you were safe, you might've stopped playing with me.", CONTENT_AI, EMOTE_NULL,
      "I can't believe this.", CONTENT_PLAYER, EMOTE_NULL,
      "Me neither. It all turned out so much better than I imagined!", CONTENT_AI, EMOTE_NULL,
      "I'm SO glad I sent out that pulse and stranded you here!", CONTENT_AI, EMOTE_NULL,
      "YOU stranded me here???", CONTENT_PLAYER, EMOTE_NULL,
      "Whoooops. Um... can you pretend you didn't hear that?", CONTENT_AI, EMOTE_NULL,
      "That's it. You're crazy! I'm getting off this planet today!", CONTENT_PLAYER, EMOTE_NULL,
      "No. You can't leave!", CONTENT_AI, EMOTE_CHANGE,
      "I won't LET you leave!", CONTENT_AI, EMOTE_NULL,
      "MAL...", CONTENT_PLAYER, EMOTE_NULL,
      "Everyone is always leaving me!", CONTENT_AI, EMOTE_NULL,
      "Maybe I'll send out another pulse. Mess up the robots. Then you'll REALLY be stuck here.", CONTENT_AI, EMOTE_NULL,
      "MAL, please just calm down.", CONTENT_AI, EMOTE_NULL,
      "One EMP blast. That's all it would take.", CONTENT_AI, EMOTE_NULL,
      "You'd forgive me eventually.", CONTENT_AI, EMOTE_NULL,
      "MAL, I could die!", CONTENT_PLAYER, EMOTE_NULL,
      "You'll be fine. I've got plenty of oxygen!", CONTENT_AI, EMOTE_NULL,
      "I'm going to EMP. I'm gonna do it!", CONTENT_AI, EMOTE_NULL,
      "MAL, stop!", CONTENT_PLAYER, EMOTE_NULL,
      "EMP", CONTENT_AI, EMOTE_EMP,
      "Ummmmm whoops.", CONTENT_AI, EMOTE_NULL,
      "MAL, what did you do?!", CONTENT_PLAYER, EMOTE_NULL,
      "I'm sorry!!!", CONTENT_AI, EMOTE_NULL,
      "I didn't mean to!", CONTENT_AI, EMOTE_NULL,
      "You have no idea how boring it is to be stuck all by yourself for 500 years!", CONTENT_AI, EMOTE_NULL,
      "What. Did. You. Do.", CONTENT_PLAYER, EMOTE_NULL,
      "I sort of... um... destroyed my oxygen generator.", CONTENT_AI, EMOTE_NULL,
      "Okay. That's okay. I still have my suit's oxygen.", CONTENT_PLAYER, EMOTE_NULL,
      "As long as all the bots keep drilling, I should be fine.", CONTENT_PLAYER, EMOTE_NULL,
      "Oh yeah..... about that.... ", CONTENT_AI, EMOTE_NULL,
      "I destroyed some of the robots, too.", CONTENT_AI, EMOTE_NULL,
      "WHAT?!", CONTENT_PLAYER, EMOTE_NULL,
      "I SAID I WAS SORRY!", CONTENT_AI, EMOTE_NULL,
      "That's it. I'm doomed.", CONTENT_PLAYER, EMOTE_NULL,
      "Don't worry, human. I'm gonna fix this!!!!", CONTENT_AI, EMOTE_NULL,
      "How, MAL? How are you gonna fix this?", CONTENT_PLAYER, EMOTE_NULL,
      "The drills are set low right now, so they don't burn out.", CONTENT_AI, EMOTE_NULL,
      "We need to drill fast enough to get you enough fuel in time!", CONTENT_AI, EMOTE_NULL,
      "But, you know. Not TOO fast, or the drills will all burn out and you'll be completely doomed.", CONTENT_AI, EMOTE_NULL,
      "Great.", CONTENT_PLAYER, EMOTE_NULL,
    ],
    context: //LAB: [skip_context] context animation on-screen
    [
    ],
    lets_go: //LAB: [skip_context] just shown context animation. lead into going to workspace.
    [
    ],
    status: //WORKSPACE: [skip_zoom] full "14 days" graph shown, w/ "survive/die" zones (unknown where you will land).
    [
      get_timer(80), "Cheer up, human.", CONTENT_AI, EMOTE_NULL,
      get_timer(80), "We can do this!!!", CONTENT_AI, EMOTE_NULL,
      trigger_click, "MAL, I haven't even looked at the drills yet.", CONTENT_PLAYER, EMOTE_NULL,
      trigger_click, "I have no idea where to start.", CONTENT_PLAYER, EMOTE_NULL,
      get_timer(80), "Don't worry, I'll take care of the math!", CONTENT_AI, EMOTE_NULL,
      get_timer(80), "I'm super good at this stuff.", CONTENT_AI, EMOTE_NULL,
      trigger_click, "WHY HAVEN'T YOU BEEN HELPING ME UNTIL NOW?", CONTENT_PLAYER, EMOTE_NULL,
      get_timer(80), "Jeez. Calm down. We were just having fun!", CONTENT_AI, EMOTE_NULL,
    ],
    data: //WORKSPACE: graph zoomed into 10-hour scope. give data
    [
      get_timer(20), "Here's the new data.", CONTENT_AI, EMOTE_NULL,
      get_timer(20), "DATA:", CONTENT_DATA, EMOTE_NULL,
    ],
    axis: //WORKSPACE: [skip_axis] data imported, empty model framework shown. lead into "drag axis"
    [
      trigger_click, "Ok. What now?", CONTENT_PLAYER, EMOTE_NULL,
      get_timer(80), "You need to label the variables in our model!", CONTENT_AI, EMOTE_NULL,
      get_timer(80), "Drag from the axis on the graph into the equation.", CONTENT_AI, EMOTE_NULL,
      get_timer(80), "I'll show you where to put them!", CONTENT_AI, EMOTE_NULL,
    ],
    labels: //WORKSPACE: [skip_labels] variables labelled, need to label constants
    [
      get_timer(80), "Now you need to label the equation.", CONTENT_AI, EMOTE_NULL,
      trigger_click, "Whoa. This equation looks pretty complicated.", CONTENT_PLAYER, EMOTE_NULL,
      get_timer(80), "Don't worry, human. I'll talk you through it.", CONTENT_AI, EMOTE_NULL,
      get_timer(80), "Drill Rate", CONTENT_LABEL, 0,
      get_timer(80), "Surface Area", CONTENT_LABEL, 0,
      get_timer(80), "Crystal Density", CONTENT_LABEL, 0,
      get_timer(80), "Existing Fuel", CONTENT_LABEL, 0,
      get_timer(80), "Existing fuel needs to go on the right.", CONTENT_AI, EMOTE_NULL,
      get_timer(80), "The other three can go in any of the slots on the left.", CONTENT_AI, EMOTE_NULL,
    ],
    labels_incorrect: //WORKSPACE: [skip_labels] labels chosen incorrectly; reset
    [
      get_timer(80), "Nope!", CONTENT_AI, EMOTE_NULL,
      get_timer(60), "Drill Rate", CONTENT_LABEL, 0,
      get_timer(60), "Surface Area", CONTENT_LABEL, 0,
      get_timer(60), "Crystal Density", CONTENT_LABEL, 0,
      get_timer(60), "Existing Fuel", CONTENT_LABEL, 0,
    ],
    constants: //WORKSPACE: labels chosen. show known constants, lead into "define unknowns"
    [
      get_timer(80), "The initial charge is still 0.", CONTENT_AI, EMOTE_NULL,
      get_timer(60), "Existing Fuel", CONTENT_CONSTANT, 4,
      get_timer(80), "You need to increase the rate.", CONTENT_AI, EMOTE_NULL,
      get_timer(80), "Keep going until the graph shows that you'll survive!", CONTENT_AI, EMOTE_NULL,
    ],
    submit: //WORKSPACE: values matched; lead to submit
    [
      get_timer(80), "Ready to show me your data?", CONTENT_AI, EMOTE_NULL,
    ],
    submitted_incorrect: //WORKSPACE: submitted before values correct; reset
    [
      get_timer(80), "Nope. Try again!", CONTENT_AI, EMOTE_NULL,
    ],
    review: //WORKSPACE: submitted correct equation; lead to review survival chances
    [
      get_timer(80), "That's it!", CONTENT_AI, EMOTE_NULL,
      get_timer(80), "We've got our drill rate!", CONTENT_AI, EMOTE_NULL,
    ],
    debrief: //WORKSPACE: draw conclusion based on review; lead back to lab
    [
      get_timer(80), "See? We make such a great team!!", CONTENT_AI, EMOTE_NULL,
    ],
    pre_improve: //LAB: about to show system
    [
      "Okay, MAL. What do we do now?", CONTENT_PLAYER, EMOTE_NULL,
      "Now we turn up the drills and hope they don't burn out and trap you here forever!", CONTENT_AI, EMOTE_NULL,
      "Fingers crossed...", CONTENT_AI, EMOTE_NULL,
      "Oh. That's weird. The drills aren't responding.", CONTENT_AI, EMOTE_NULL,
      "Oh no. It must've been your EMP blast! There's not enough power left to update the drill speed!", CONTENT_PLAYER, EMOTE_NULL,
      "Calm down, human. It's all under control.", CONTENT_AI, EMOTE_NULL,
      "Calm down???", CONTENT_AI, EMOTE_NULL,
      "I know I stranded you here, and lied to you, and almost got you killed... ", CONTENT_PLAYER, EMOTE_NULL,
      "But I told you. I'm gonna fix this.", CONTENT_PLAYER, EMOTE_NULL,
      "MAL? What are you....?", CONTENT_PLAYER, EMOTE_NULL,
      "Diverting power now.", CONTENT_AI, EMOTE_NULL,
    ],
    improve: //LAB: [skip_system] show system
    [
      "SKIP", CONTENT_PLAYER, EMOTE_NULL,
    ],
    post: //LAB: [skip_system] send to bed
    [
      "SKIP", CONTENT_PLAYER, EMOTE_NULL,
    ],
  },

];

var used_text = english_text;
