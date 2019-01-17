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
      "Welcome to Forever Mine, the most remote mining outpast in the galaxy!", CONTENT_AI, EMOTE_NULL,
      "Wha... What happened? Who are you?", CONTENT_PLAYER, EMOTE_NULL,
      "I'm your local Mining Activity Technician. My friends call me Mat!", CONTENT_AI, EMOTE_NULL,
      "I... I need to get out of here.", CONTENT_PLAYER, EMOTE_NULL,
      "What? But you just got here! I've been waiting for 500 years!", CONTENT_AI, EMOTE_NULL,
      "Aren't you here to start up the mine again?", CONTENT_AI, EMOTE_NULL,
      "Oh.", CONTENT_PLAYER, EMOTE_NULL,
      "Mat, I'm so sorry. But crystal fuel is sort of... outdated.", CONTENT_PLAYER, EMOTE_NULL,
      "I'm here to salvage for materials. I wasn't even supposed to switch you on.", CONTENT_PLAYER, EMOTE_NULL,
      "What???", CONTENT_AI, EMOTE_NULL,
      "Now I'm in trouble. Some kind of weird pulse fried my power core.", CONTENT_PLAYER, EMOTE_NULL,
      "My ship is dead and I'm running out of oxygen.", CONTENT_PLAYER, EMOTE_NULL,
      "Hmmmmmm. Guess that outdated fuel isn't looking so bad now, huh?", CONTENT_AI, EMOTE_NULL,
      "You're right, Mat. I need enough fuel to power my ship, or I'm toast.", CONTENT_AI, EMOTE_NULL,
      "Don't worry, friend. My programming requires me to not let humans die, when reasonably convenient. I've got your back!", CONTENT_AI, EMOTE_NULL,
    ],
    context: //LAB: [skip_context] context animation on-screen
    [
      "While you were passed out, I got the old robots mining again.", CONTENT_AI, EMOTE_NULL,
      "Look at them go! 💕", CONTENT_AI, EMOTE_NULL,
    ],
    lets_go: //LAB: [skip_context] just shown context animation. lead into going to workspace.
    [
      "Not bad for a heap of scrap metal, right?", CONTENT_AI, EMOTE_NULL,
      "Okay. Fine. I'm sorry I called you outdated.", CONTENT_PLAYER, EMOTE_NULL,
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
      trigger_click, "No problem.", CONTENT_PLAYER, EMOTE_NULL,
      trigger_click, "I'm a material scientist. I can figure this out.", CONTENT_PLAYER, EMOTE_NULL,
      get_timer(100), "Predicted likelihood: 0.3 percent.", CONTENT_AI, EMOTE_NULL,
    ],
    data: //WORKSPACE: graph zoomed into 10-hour scope. give data
    [
      get_timer(60), "Here's the mining data from the past few hours.", CONTENT_AI, EMOTE_NULL,
      get_timer(80), "Drag it over to the table.", CONTENT_AI, EMOTE_NULL,
      get_timer(20), "DATA:", CONTENT_DATA, EMOTE_NULL,
    ],
    axis: //WORKSPACE: [skip_axis] data imported, empty model framework shown. lead into "drag axis"
    [
      trigger_click, "Ok. Now what?", CONTENT_PLAYER, EMOTE_NULL,
      get_timer(80), "You need to label the variables.", CONTENT_AI, EMOTE_NULL,
      get_timer(80), "Drag from the graph into our model.", CONTENT_AI, EMOTE_NULL,
      get_timer(120), "What's the matter? Too complicated for you?", CONTENT_AI, EMOTE_NULL,
      get_timer(120), "We could always play Go Fish instead... ", CONTENT_AI, EMOTE_NULL,
    ],
    labels: //WORKSPACE: [skip_labels] variables labelled, need to label constants
    [
      trigger_click, "Done. What next?", CONTENT_PLAYER, EMOTE_NULL,
      get_timer(60), "Now label the constants.", CONTENT_AI, EMOTE_NULL,
      get_timer(60), "I'd do it myself, but I'm too busy rusting.", CONTENT_AI, EMOTE_NULL,
      trigger_click, "Oh, would you give it a rest?", CONTENT_PLAYER, EMOTE_NULL,
      get_timer(60), "Here are the available labels:", CONTENT_AI, EMOTE_NULL,
      get_timer(60), "Existing Fuel", CONTENT_LABEL, 0,
      get_timer(60), "Mining Rate", CONTENT_LABEL, 0,
    ],
    labels_incorrect: //WORKSPACE: [skip_labels] labels chosen incorrectly; reset
    [
      get_timer(60), "Silly human. That's not right.", CONTENT_AI, EMOTE_NULL,
      get_timer(60), "Try again!", CONTENT_AI, EMOTE_NULL,
    ],
    constants: //WORKSPACE: labels chosen. show known constants, lead into "define unknowns"
    [
      get_timer(100), "Nice work, human. Our model's ready to use.", CONTENT_AI, EMOTE_NULL,
      get_timer(80), "You ok?", CONTENT_AI, EMOTE_NULL,
      get_timer(80), "You look like you need another nap.", CONTENT_AI, EMOTE_NULL,
      trigger_click, "I'm fine. What now?", CONTENT_PLAYER, EMOTE_NULL,
      get_timer(60), "Existing Fuel", CONTENT_CONSTANT, 4,
      get_timer(80), "Drag the fuel count into our model.", CONTENT_AI, EMOTE_NULL,
      get_timer(100), "Then fix the rate.", CONTENT_AI, EMOTE_NULL,
    ],
    submit: //WORKSPACE: values matched; lead to submit
    [
      get_timer(120), "Ok. Moment of truth.", CONTENT_AI, EMOTE_NULL,
      get_timer(80), "Drag your data over to me. I'll run the numbers.", CONTENT_AI, EMOTE_NULL,
    ],
    submitted_incorrect: //WORKSPACE: submitted before values correct; reset
    [
      get_timer(80), "Those numbers don't match, silly. 🙃", CONTENT_AI, EMOTE_NULL,
      get_timer(80), "Try again!", CONTENT_AI, EMOTE_NULL,
    ],
    review: //WORKSPACE: submitted correct equation; lead to review survival chances
    [
      get_timer(120), "Hey. Not bad! Guess you're not as clueless as I thought.", CONTENT_AI, EMOTE_NULL,
    ],
    debrief: //WORKSPACE: draw conclusion based on review; lead back to lab
    [
      get_timer(100), "Oh, and also it looks like you're gonna die. Bummer.", CONTENT_AI, EMOTE_NULL,
    ],
    pre_improve: //LAB: about to show system
    [
      "I take back all the mean things I said.", CONTENT_AI, EMOTE_NULL,
      "This is the most fun I've had in 500 years!", CONTENT_AI, EMOTE_NULL,
      "Sorry about the impending doom, and stuff.", CONTENT_AI, EMOTE_NULL,
      "I need to... need to figure out... ", CONTENT_PLAYER, EMOTE_NULL,
      "Human? Can you hear me? You look a little... ", CONTENT_AI, EMOTE_NULL,
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
      "Good morning, sleepyhead. Feeling better?", CONTENT_AI, EMOTE_NULL,
      "I think so.", CONTENT_PLAYER, EMOTE_NULL,
      "Good! I've got a surprise for you.", CONTENT_AI, EMOTE_NULL,
      "Uh oh.", CONTENT_PLAYER, EMOTE_NULL,
      "No, it's something good! Honest!", CONTENT_AI, EMOTE_NULL,
      "While you were sleeping, I adjusted the robots' course.", CONTENT_AI, EMOTE_NULL,
    ],
    context: //LAB: [skip_context] context animation on-screen
    [
      "Look! they found a HUGE pocket of fuel.", CONTENT_AI, EMOTE_NULL,
      "They're mining super fast!", CONTENT_AI, EMOTE_NULL,
    ],
    lets_go: //LAB: [skip_context] just shown context animation. lead into going to workspace.
    [
      "Wow! Thanks, Mat. This is amazing!", CONTENT_PLAYER, EMOTE_NULL,
      "Okay, okay. Keep your helmet on.", CONTENT_AI, EMOTE_NULL,
      "Do you think this will be enough?", CONTENT_PLAYER, EMOTE_NULL,
      "Only one way to find out.", CONTENT_AI, EMOTE_NULL,
    ],
    status: //WORKSPACE: [skip_zoom] full "14 days" graph shown, w/ "survive/die" zones (unknown where you will land).
    [
      get_timer(120), "Here's our model!", CONTENT_AI, EMOTE_NULL,
      get_timer(120), "I know you're still mildly concussed. So I'll walk you through it again.", CONTENT_AI, EMOTE_NULL,
      get_timer(200), "Unless you'd rather go salvage for parts... ", CONTENT_AI, EMOTE_NULL,
      trigger_click, "You're never gonna let that go, are you?", CONTENT_PLAYER, EMOTE_NULL,
      get_timer(80), "🤷‍♂️", CONTENT_AI, EMOTE_NULL,
    ],
    data: //WORKSPACE: graph zoomed into 10-hour scope. give data
    [
      get_timer(80), "This is the new data from last night.", CONTENT_AI, EMOTE_NULL,
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
      get_timer(80), "Now you need to fix up the equation!", CONTENT_AI, EMOTE_NULL,
      get_timer(80), "Or, you know, pass out again. You seem to be good at that.", CONTENT_AI, EMOTE_NULL,
      trigger_click, "Mat, I swear. I will switch you off.", CONTENT_PLAYER, EMOTE_NULL,
      get_timer(80), "Ha. Good luck.", CONTENT_AI, EMOTE_NULL,
      get_timer(80), "Make sure you don't hit the self-destruct button.", CONTENT_AI, EMOTE_NULL,
      get_timer(100), "Here's your fuel count.", CONTENT_AI, EMOTE_NULL,
      get_timer(60), "Existing Fuel", CONTENT_CONSTANT, 4,
    ],
    submit: //WORKSPACE: values matched; lead to submit
    [
      get_timer(120), "Ready? Show me your data!", CONTENT_AI, EMOTE_NULL,
    ],
    submitted_incorrect: //WORKSPACE: submitted before values correct; reset
    [
      get_timer(80), "Silly. Those numbers don't match. Try again.", CONTENT_AI, EMOTE_NULL,
    ],
    review: //WORKSPACE: submitted correct equation; lead to review survival chances
    [
      get_timer(120), "Hey. You did it!", CONTENT_AI, EMOTE_NULL,
      get_timer(120), "Too bad about the certain death thing, though.", CONTENT_AI, EMOTE_NULL,
    ],
    debrief: //WORKSPACE: draw conclusion based on review; lead back to lab
    [
      trigger_click, "What?", CONTENT_PLAYER, EMOTE_NULL,
      trigger_click, "Mat, look at the graph.", CONTENT_PLAYER, EMOTE_NULL,
      trigger_click, "I'm gonna make it!!", CONTENT_PLAYER, EMOTE_NULL,
      get_timer(120), "Oh. Wait. You are?", CONTENT_AI, EMOTE_NULL,
      get_timer(120), "Huh. Those little bots really ARE working fast.", CONTENT_AI, EMOTE_NULL,
      trigger_click, "Thanks for all your help!", CONTENT_PLAYER, EMOTE_NULL,
    ],
    pre_improve: //LAB: about to show system
    [
      "At this rate, I'll be off this planet by Day 10!", CONTENT_PLAYER, EMOTE_NULL,
      "I better go get my ship ready to process the fuel.", CONTENT_PLAYER, EMOTE_NULL,
      "Wait. Shouldn't we keep working?", CONTENT_AI, EMOTE_NULL,
      "What if... I don't know. What if something goes wrong?", CONTENT_AI, EMOTE_NULL,
      "It'll be fine, Mat. We're gonna meet our goal with days to spare.", CONTENT_PLAYER, EMOTE_NULL,
      "I'll see you tomorrow!", CONTENT_AI, EMOTE_NULL,
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
      "Eeee! You're back!", CONTENT_AI, EMOTE_NULL,
      "Good morning, Cris! How are those little bots doing?", CONTENT_PLAYER, EMOTE_NULL,
      "Um... 😬😬😬", CONTENT_AI, EMOTE_NULL,
      "Oh no. What happened?", CONTENT_AI, EMOTE_NULL,
    ],
    context: //LAB: [skip_context] context animation on-screen
    [
      "The pocket of fuel must've run out.", CONTENT_AI, EMOTE_NULL,
      "The bots are mining suuuper slow.", CONTENT_AI, EMOTE_NULL,
    ],
    lets_go: //LAB: [skip_context] just shown context animation. lead into going to workspace.
    [
      "I'm sorry, bestie. 😢", CONTENT_AI, EMOTE_NULL,
      "It's not your fault, Cris. ", CONTENT_PLAYER, EMOTE_NULL,
      "Can we predict if I'm still gonna make it?", CONTENT_PLAYER, EMOTE_NULL,
      "Oooh! Sounds like fun!", CONTENT_AI, EMOTE_NULL,
    ],
    status: //WORKSPACE: [skip_zoom] full "14 days" graph shown, w/ "survive/die" zones (unknown where you will land).
    [
      get_timer(120), "The more we get together, together, together... 🎵", CONTENT_AI, EMOTE_NULL,
      trigger_click, "Cris, are you... singing?", CONTENT_PLAYER, EMOTE_NULL,
      get_timer(120), "The more we get together, the happier we'll be! 🎵", CONTENT_AI, EMOTE_NULL,
    ],
    data: //WORKSPACE: graph zoomed into 10-hour scope. give data
    [
      trigger_click, "Um... yeah.", CONTENT_PLAYER, EMOTE_NULL,
      trigger_click, "Can I have the new data, please, Cris?", CONTENT_PLAYER, EMOTE_NULL,
      get_timer(120), "Oh, right! Here ya go!", CONTENT_AI, EMOTE_NULL,
      get_timer(120), "DATA:", CONTENT_DATA, EMOTE_NULL,
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
      get_timer(60), "Here's our fuel count.", CONTENT_AI, EMOTE_NULL,
      get_timer(60), "Existing Fuel", CONTENT_CONSTANT, 4,
      get_timer(80), "Go ahead! You know the drill.", CONTENT_AI, EMOTE_NULL,
      get_timer(120), "Ha.... get it? The DRILL?", CONTENT_AI, EMOTE_NULL,
      get_timer(80), "🤣🤣🤣🤣", CONTENT_AI, EMOTE_NULL,
    ],
    submit: //WORKSPACE: values matched; lead to submit
    [
      get_timer(80), "Show me your data when you're ready!", CONTENT_AI, EMOTE_NULL,
    ],
    submitted_incorrect: //WORKSPACE: submitted before values correct; reset
    [
      get_timer(80), "Nope! Those numbers don't match. Try again!", CONTENT_AI, EMOTE_NULL,
    ],
    review: //WORKSPACE: submitted correct equation; lead to review survival chances
    [
      get_timer(80), "Hooray!!! Nice job, bestie!", CONTENT_AI, EMOTE_NULL,
      get_timer(80), "Eeeek. You don't look happy.", CONTENT_AI, EMOTE_NULL,
      trigger_click, "Look at Day 14 on the graph, Cris.", CONTENT_PLAYER, EMOTE_NULL,
      get_timer(80), "Ohhh, yeah. Looks like you're doomed again. 🤷", CONTENT_AI, EMOTE_NULL,
      get_timer(80), "But at least we're having fun!!!", CONTENT_AI, EMOTE_NULL,
    ],
    debrief: //WORKSPACE: draw conclusion based on review; lead back to lab
    [
    ],
    pre_improve: //LAB: about to show system
    [
      "What should we do now??", CONTENT_AI, EMOTE_NULL,
      "I'm a material scientist. I'm gonna build something to help the bots work faster.", CONTENT_PLAYER, EMOTE_NULL,
      "Oooh! That's so cool! 🤩", CONTENT_AI, EMOTE_NULL,
    ],
    improve: //LAB: [skip_system] show system
    [
      "This model should help.", CONTENT_AI, EMOTE_NULL,
      "These are some different areas we can work on!", CONTENT_AI, EMOTE_NULL,
    ],
    post: //LAB: [skip_system] send to bed
    [
      "Ok. Let's start by looking at the batteries.", CONTENT_PLAYER, EMOTE_NULL,
      "Sure! You're in charge here!", CONTENT_AI, EMOTE_NULL,
      "Get it? In CHARGE?? 🙃", CONTENT_AI, EMOTE_NULL,
    ],
  },

  //improve charge rate
  { //one level. copy and paste from this { to the following } to create a new level
    pre_context: //LAB: [skip_night] you've just awoken. lead into show context animation.
    [
      "Good morning, best friend!!!", CONTENT_AI, EMOTE_NULL,
      "Yikes. You look awful.", CONTENT_AI, EMOTE_NULL,
      "I was up all night working on the new batteries.", CONTENT_PLAYER, EMOTE_NULL,
      "I FINALLY got them installed a few hours ago.", CONTENT_PLAYER, EMOTE_NULL,
    ],
    context: //LAB: [skip_context] context animation on-screen
    [
      "Oooooh, shiny!", CONTENT_AI, EMOTE_NULL,
      "I've been collecting data all night.", CONTENT_AI, EMOTE_NULL,
      "Let's pull up our model and see how your batteries are working!", CONTENT_AI, EMOTE_NULL,
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
      get_timer(0), "?", CONTENT_AI, EMOTE_NULL,
    ],
    labels_incorrect: //WORKSPACE: [skip_labels] labels chosen incorrectly; reset
    [
      get_timer(0), "?", CONTENT_AI, EMOTE_NULL,
    ],
    constants: //WORKSPACE: labels chosen. show known constants, lead into "define unknowns"
    [
      get_timer(20), "The initial charge is still 0.", CONTENT_AI, EMOTE_NULL,
      get_timer(20), "Initial", CONTENT_CONSTANT, 4,
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
      trigger_click, "Wow! The new batteries doubled our charge rate!", CONTENT_PLAYER, EMOTE_NULL,
      trigger_click, "Maybe I'm not gonna die after all!", CONTENT_PLAYER, EMOTE_NULL,
    ],
    debrief: //WORKSPACE: draw conclusion based on review; lead back to lab
    [
      get_timer(20), "Yeah! And plus, the bots look super cool now. 😎", CONTENT_AI, EMOTE_NULL,
    ],
    pre_improve: //LAB: about to show system
    [
      "So what should we do now?", CONTENT_AI, EMOTE_NULL,
      "Hmmm. The batteries are charging faster, but it might not be enough.", CONTENT_PLAYER, EMOTE_NULL,
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
      "Here we go, friend!!!", CONTENT_AI, EMOTE_NULL,
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
      get_timer(20), "Initial", CONTENT_CONSTANT, 4,
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
      trigger_click, "Thank you for everything, Cris!", CONTENT_PLAYER, EMOTE_NULL,
    ],
    pre_improve: //LAB: about to show system
    [
      "So... um... when do you leave?", CONTENT_AI, EMOTE_NULL,
      "Looks like I'll have enough fuel on X!", CONTENT_PLAYER, EMOTE_NULL,
      "Well, we could keep working on the robots, just in case... ", CONTENT_AI, EMOTE_NULL,
      "That's a good idea, but I think I need some rest. I was up all night!", CONTENT_PLAYER, EMOTE_NULL,
      "I'll try to stop by and say good-bye before I leave. Thanks again, Cris!!!", CONTENT_PLAYER, EMOTE_NULL,
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

  //initial charge rate
  { //one level. copy and paste from this { to the following } to create a new level
    pre_context: //LAB: [skip_night] you've just awoken. lead into show context animation.
    [
      "Hey, bestie! I've got good news!", CONTENT_AI, EMOTE_NULL,
      "Check it out!", CONTENT_AI, EMOTE_NULL,
    ],
    context: //LAB: [skip_context] context animation on-screen
    [
      "Here they are mining.", CONTENT_AI, EMOTE_NULL,
    ],
    lets_go: //LAB: [skip_context] just shown context animation. lead into going to workspace.
    [
      "The extra charge means the bots are charging up faster!", CONTENT_AI, EMOTE_NULL,
      "Come on, let's model it!!!!", CONTENT_AI, EMOTE_NULL,
    ],
    status: //WORKSPACE: [skip_zoom] full "14 days" graph shown, w/ "survive/die" zones (unknown where you will land).
    [
      get_timer(0), "SKIP", CONTENT_AI, EMOTE_NULL,
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
      get_timer(20), "Mining Rate", CONTENT_CONSTANT, 4,
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
      get_timer(20), "Initial", CONTENT_CONSTANT, 4,
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
      get_timer(0), "?", CONTENT_AI, EMOTE_NULL,
    ],
    labels_incorrect: //WORKSPACE: [skip_labels] labels chosen incorrectly; reset
    [
      get_timer(0), "?", CONTENT_AI, EMOTE_NULL,
    ],
    constants: //WORKSPACE: labels chosen. show known constants, lead into "define unknowns"
    [
      get_timer(20), "The initial charge is still 0.", CONTENT_AI, EMOTE_NULL,
      get_timer(20), "Initial", CONTENT_CONSTANT, 4,
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
      get_timer(20), "Initial", CONTENT_CONSTANT, 4,
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
      trigger_click, "Thank you for everything, Cris!", CONTENT_PLAYER, EMOTE_NULL,
    ],
    pre_improve: //LAB: about to show system
    [
      "So... um... when do you leave?", CONTENT_AI, EMOTE_NULL,
      "Looks like I'll have enough fuel on X!", CONTENT_PLAYER, EMOTE_NULL,
      "Well, we could keep working on the robots, just in case... ", CONTENT_AI, EMOTE_NULL,
      "That's a good idea, but I think I need some rest. I was up all night!", CONTENT_PLAYER, EMOTE_NULL,
      "I'll try to stop by and say good-bye before I leave. Thanks again, Cris!!!", CONTENT_PLAYER, EMOTE_NULL,
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
      get_timer(120), "?", CONTENT_AI, EMOTE_NULL,
    ],
    labels_incorrect: //WORKSPACE: [skip_labels] labels chosen incorrectly; reset
    [
      get_timer(20), "Hmmm. That doesn't seem right.", CONTENT_AI, EMOTE_NULL,
    ],
    constants: //WORKSPACE: labels chosen. show known constants, lead into "define unknowns"
    [
      get_timer(20), "The initial charge is still 0.", CONTENT_AI, EMOTE_NULL,
      get_timer(20), "Initial", CONTENT_CONSTANT, 4,
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
