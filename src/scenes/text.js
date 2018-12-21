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
  //check crystals
  { //one level. copy and paste from this { to the following } to create a new level
    pre_context: //LAB: you've just awoken. lead into show context animation.
    [
      "Hooray!!!!! 🎉🎉🎉 Finally, someone to talk to!", CONTENT_AI, EMOTE_NULL,
      "Wha... What happened? Who are you?", CONTENT_PLAYER, EMOTE_NULL,
      "I'm Cris!", CONTENT_AI, EMOTE_NULL,
      "Well, Crystal Intake Specialist, but that's boring.", CONTENT_AI, EMOTE_NULL,
      "My... my head feels funny.", CONTENT_PLAYER, EMOTE_NULL,
      "Awww, poor human. You need some rest! Want some chicken soup?", CONTENT_AI, EMOTE_NULL,
      "(I don't have any soup, so please say no.)", CONTENT_AI, EMOTE_NULL,
      "Ugh. I feel like I'm forgetting something important... ", CONTENT_PLAYER, EMOTE_NULL,
      "Oh no!!! My oxygen levels. I only have 14 days left!", CONTENT_PLAYER, EMOTE_NULL,
      "Don't worry, new best friend. I'll help you!", CONTENT_AI, EMOTE_NULL,
    ],
    context: //LAB: context animation on-screen
    [
      "While you were passed out, I got the old robots mining again.", CONTENT_AI, EMOTE_NULL,
      "Look at them go! 💕💕💕", CONTENT_AI, EMOTE_NULL,
    ],
    lets_go: //LAB: just shown context animation. lead into going to workspace.
    [
      "Cris, this is great! If we mine enough fuel, I can power my ship!", CONTENT_PLAYER, EMOTE_NULL,
      "Can we predict if the bots are working fast enough?", CONTENT_PLAYER, EMOTE_NULL,
      "Sure! I've got the perfect tool for that!", CONTENT_AI, EMOTE_NULL,
    ],
    status: //WORKSPACE: full "14 days" graph shown, w/ "survive/die" zones (unknown where you will land).
    [
      get_timer(100), "This is a model!", CONTENT_AI, EMOTE_NULL,
      get_timer(100), "We can use it to predict crystal collection.", CONTENT_AI, EMOTE_NULL,
      get_timer(100), "My owners used this model all the time!", CONTENT_AI, EMOTE_NULL,
      trigger_click, "Your owners... ", CONTENT_PLAYER, EMOTE_NULL,
      trigger_click, "You mean 200 years ago?", CONTENT_PLAYER, EMOTE_NULL,
      get_timer(100), "Yep! 😂", CONTENT_AI, EMOTE_NULL,
      get_timer(120), "You'll need to make some adjustments.", CONTENT_AI, EMOTE_NULL,
      trigger_click, "Can't you do it?", CONTENT_PLAYER, EMOTE_NULL,
      get_timer(120), "Sorry, bestie. That's not in my programming!", CONTENT_AI, EMOTE_NULL,
      trigger_click, "Ughhh. My head.", CONTENT_PLAYER, EMOTE_NULL,
      get_timer(120), "Don't worry. I'll talk you through it!!", CONTENT_AI, EMOTE_NULL,
    ],
    data: //WORKSPACE: graph zoomed into 10-hour scope. give data
    [
      get_timer(60), "Here's the mining data.", CONTENT_AI, EMOTE_NULL,
      get_timer(60), "Drag it over to the table!", CONTENT_AI, EMOTE_NULL,
      get_timer(20), "DATA:", CONTENT_DATA, EMOTE_NULL,
    ],
    labels: //WORKSPACE: data imported, empty model framework shown. lead into "pick labels"
    [
      trigger_click, "Ok. What now?", CONTENT_PLAYER, EMOTE_NULL,
      get_timer(60), "You need to label our equation!", CONTENT_AI, EMOTE_NULL,
      get_timer(60), "Go ahead. Give it a try!", CONTENT_AI, EMOTE_NULL,
    ],
    labels_incorrect: //WORKSPACE: labels chosen incorrectly; reset
    [
      get_timer(60), "Silly human! That's not right.", CONTENT_AI, EMOTE_NULL,
      get_timer(60), "Try again!", CONTENT_AI, EMOTE_NULL,
    ],
    constants: //WORKSPACE: labels chosen. show known constants, lead into "define unknowns"
    [
      get_timer(100), "Yayayay! You did it! 🎉", CONTENT_AI, EMOTE_NULL,
      get_timer(80), "Um... you ok, friend?", CONTENT_AI, EMOTE_NULL,
      get_timer(80), "You look like you need to lie down... ", CONTENT_AI, EMOTE_NULL,
      trigger_click, "I'm fine, Cris. What now?", CONTENT_PLAYER, EMOTE_NULL,
      get_timer(100), "Here's our initial crystal count.", CONTENT_AI, EMOTE_NULL,
      get_timer(60), "Initial", CONTENT_CONSTANT, 4,
      get_timer(80), "Drag the number into our equation.", CONTENT_AI, EMOTE_NULL,
      get_timer(100), "Then change the rate so our data matches up!", CONTENT_AI, EMOTE_NULL,
    ],
    submit: //WORKSPACE: values matched; lead to submit
    [
      get_timer(120), "Ok, now show me your data!", CONTENT_AI, EMOTE_NULL,
      get_timer(80), "I'll run the numbers, and we'll see if you're doomed!", CONTENT_AI, EMOTE_NULL,
    ],
    submitted_incorrect: //WORKSPACE: submitted before values correct; reset
    [
      get_timer(80), "Those numbers don't match, silly! 🙃", CONTENT_AI, EMOTE_NULL,
      get_timer(80), "Try again!", CONTENT_AI, EMOTE_NULL,
    ],
    review: //WORKSPACE: submitted correct equation; lead to review survival chances
    [
      get_timer(120), "Yippee! You just made a model!", CONTENT_AI, EMOTE_NULL,
      trigger_click, "Yippee?", CONTENT_PLAYER, EMOTE_NULL,
      trigger_click, "Cris, look at our fuel on day 14.", CONTENT_PLAYER, EMOTE_NULL,
      get_timer(200), "Ohhhhh, yeah.", CONTENT_AI, EMOTE_NULL,
      get_timer(100), "Looks like you're gonna die. Bummer.", CONTENT_AI, EMOTE_NULL,
      get_timer(60), "😬😬😬", CONTENT_AI, EMOTE_NULL,
    ],
    debrief: //WORKSPACE: draw conclusion based on review; lead back to lab
    [
    ],
    pre_improve: //LAB: about to show system
    [
      "Awww, don't look so sad. At least we're having fun!", CONTENT_AI, EMOTE_NULL,
      "I need to... need to figure out... ", CONTENT_PLAYER, EMOTE_NULL,
      "Bestie? Can you hear me? You look a little... ", CONTENT_AI, EMOTE_NULL,
    ],
    improve: //LAB: show system
    [
      "THIS SHOULD BE SKIPPED", CONTENT_AI, EMOTE_NULL,
    ],
    post: //LAB: send to bed
    [
      "THIS SHOULD BE SKIPPED", CONTENT_AI, EMOTE_NULL,
    ],
  },

  //crystal increase
  { //one level. copy and paste from this { to the following } to create a new level
    pre_context: //LAB: you've just awoken. lead into show context animation.
    [
      "Good morning, sleepyhead! Feeling better?", CONTENT_AI, EMOTE_NULL,
      "I think so.", CONTENT_PLAYER, EMOTE_NULL,
      "Good! I've got a surprise for you!", CONTENT_AI, EMOTE_NULL,
      "While you were passed out, I adjusted the robots' course.", CONTENT_AI, EMOTE_NULL,
    ],
    context: //LAB: context animation on-screen
    [
      "Look! they found a HUGE pocket of crystals.", CONTENT_AI, EMOTE_NULL,
      "They're bringing back fuel super fast!", CONTENT_AI, EMOTE_NULL,
      "I hope this makes you happy!!!", CONTENT_AI, EMOTE_NULL,
    ],
    lets_go: //LAB: just shown context animation. lead into going to workspace.
    [
      "Wow! Thanks, Cris. I might actually survive!", CONTENT_PLAYER, EMOTE_NULL,
      "Anything for you, bestie!!! 😍💕🤗", CONTENT_AI, EMOTE_NULL,
      "Can we make a new prediction?", CONTENT_PLAYER, EMOTE_NULL,
      "Eeee! Let's do it!!!", CONTENT_AI, EMOTE_NULL,
    ],
    status: //WORKSPACE: full "14 days" graph shown, w/ "survive/die" zones (unknown where you will land).
    [
      get_timer(120), "This is our model from yesterday.", CONTENT_AI, EMOTE_NULL,
    ],
    data: //WORKSPACE: graph zoomed into 10-hour scope. give data
    [
      get_timer(80), "Here's the new data from last night!", CONTENT_AI, EMOTE_NULL,
      get_timer(60), "DATA:", CONTENT_DATA, EMOTE_NULL,
    ],
    labels: //WORKSPACE: data imported, empty model framework shown. lead into "pick labels"
    [
      get_timer(120), "THIS SHOULD BE SKIPPED", CONTENT_AI, EMOTE_NULL,
    ],
    labels_incorrect: //WORKSPACE: labels chosen incorrectly; reset
    [
      get_timer(80), "Silly human! That's not right.", CONTENT_AI, EMOTE_NULL,
    ],
    constants: //WORKSPACE: labels chosen. show known constants, lead into "define unknowns"
    [
      get_timer(100), "And here's the new crystal count.", CONTENT_AI, EMOTE_NULL,
      get_timer(60), "Initial", CONTENT_CONSTANT, 4,
      get_timer(80), "You need to figure out the rate!", CONTENT_AI, EMOTE_NULL,
    ],
    submit: //WORKSPACE: values matched; lead to submit
    [
      get_timer(120), "Show me your data when you're done!", CONTENT_AI, EMOTE_NULL,
    ],
    submitted_incorrect: //WORKSPACE: submitted before values correct; reset
    [
      get_timer(80), "Silly! Those numbers don't match. Try again.", CONTENT_AI, EMOTE_NULL,
    ],
    review: //WORKSPACE: submitted correct equation; lead to review survival chances
    [
      get_timer(120), "Yay! Nice job, bestie! 🎉🎉🎉", CONTENT_AI, EMOTE_NULL,
      get_timer(120), "So how's it look? Are you gonna make it?", CONTENT_AI, EMOTE_NULL,
    ],
    debrief: //WORKSPACE: draw conclusion based on review; lead back to lab
    [
      trigger_click, "Yes! Look at the graph.", CONTENT_PLAYER, EMOTE_NULL,
      trigger_click, "We're gonna meet our goal super fast!", CONTENT_PLAYER, EMOTE_NULL,
      get_timer(120), "Yay!!!", CONTENT_AI, EMOTE_NULL,
      get_timer(120), "We make such a good team! 😍", CONTENT_AI, EMOTE_NULL,
    ],
    pre_improve: //LAB: about to show system
    [
      "At this rate, I'll be off this planet by X!", CONTENT_PLAYER, EMOTE_NULL,
      "Oh... wait... X? Isn't that kinda fast?", CONTENT_AI, EMOTE_NULL,
      "Good point, Cris. I should go get my ship ready!", CONTENT_PLAYER, EMOTE_NULL,
      "Or..... you could, I don't know... just take a break and hang out here?", CONTENT_AI, EMOTE_NULL,
      "Thanks, Cris. But you don't need to worry! I'm feeling much better.", CONTENT_PLAYER, EMOTE_NULL,
      "See you tomorrow!", CONTENT_PLAYER, EMOTE_NULL,
    ],
    improve: //LAB: show system
    [
    ],
    post: //LAB: send to bed
    [
      "THIS SHOULD BE SKIPPED", CONTENT_AI, EMOTE_NULL,
    ],
  },

  //crystal return to normal
  { //one level. copy and paste from this { to the following } to create a new level
    pre_context: //LAB: you've just awoken. lead into show context animation.
    [
      "Eeee! You're back!", CONTENT_AI, EMOTE_NULL,
      "Good morning, Cris! How are those little bots doing?", CONTENT_PLAYER, EMOTE_NULL,
      "Um... 😬😬😬", CONTENT_AI, EMOTE_NULL,
      "Oh no. What happened?", CONTENT_AI, EMOTE_NULL,
    ],
    context: //LAB: context animation on-screen
    [
      "The pocket of crystals must've run out.", CONTENT_AI, EMOTE_NULL,
      "The bots are mining suuuper slow.", CONTENT_AI, EMOTE_NULL,
    ],
    lets_go: //LAB: just shown context animation. lead into going to workspace.
    [
      "I'm sorry, bestie. 😢", CONTENT_AI, EMOTE_NULL,
      "It's not your fault, Cris. ", CONTENT_PLAYER, EMOTE_NULL,
      "Can we predict if I'm still gonna make it?", CONTENT_PLAYER, EMOTE_NULL,
      "Oooh! Sounds like fun!", CONTENT_AI, EMOTE_NULL,
    ],
    status: //WORKSPACE: full "14 days" graph shown, w/ "survive/die" zones (unknown where you will land).
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
    labels: //WORKSPACE: data imported, empty model framework shown. lead into "pick labels"
    [
      get_timer(120), "THIS SHOULD BE SKIPPED", CONTENT_AI, EMOTE_NULL,
    ],
    labels_incorrect: //WORKSPACE: labels chosen incorrectly; reset
    [
      get_timer(120), "Nope! Try again.", CONTENT_AI, EMOTE_NULL,
    ],
    constants: //WORKSPACE: labels chosen. show known constants, lead into "define unknowns"
    [
      get_timer(60), "Here's our crystal count.", CONTENT_AI, EMOTE_NULL,
      get_timer(60), "Initial", CONTENT_CONSTANT, 4,
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
    improve: //LAB: show system
    [
      "This model should help.", CONTENT_AI, EMOTE_NULL,
      "These are some different areas we can work on!", CONTENT_AI, EMOTE_NULL,
    ],
    post: //LAB: send to bed
    [
      "Ok. Let's start by looking at the batteries.", CONTENT_PLAYER, EMOTE_NULL,
      "Sure! You're in charge here!", CONTENT_AI, EMOTE_NULL,
      "Get it? In CHARGE?? 🙃", CONTENT_AI, EMOTE_NULL,
    ],
  },

  //check out battery
  { //one level. copy and paste from this { to the following } to create a new level
    pre_context: //LAB: you've just awoken. lead into show context animation.
    [
      "Let's get to work, Cris.", CONTENT_AI, EMOTE_NULL,
      "We need to look at how fast the robots are charging up.", CONTENT_AI, EMOTE_NULL,
      "Oooh! Sounds like fun!", CONTENT_AI, EMOTE_NULL,
    ],
    context: //LAB: context animation on-screen
    [
      "I've got plenty of data on the robots' batteries!", CONTENT_AI, EMOTE_NULL,
    ],
    lets_go: //LAB: just shown context animation. lead into going to workspace.
    [
      "Great. Let's model it!", CONTENT_PLAYER, EMOTE_NULL,
    ],
    status: //WORKSPACE: full "14 days" graph shown, w/ "survive/die" zones (unknown where you will land).
    [
      get_timer(20), "THIS SHOULD BE SKIPPED", CONTENT_AI, EMOTE_NULL,
    ],
    data: //WORKSPACE: graph zoomed into 10-hour scope. give data
    [
      get_timer(80), "Here's the battery-charging data!", CONTENT_AI, EMOTE_NULL,
      get_timer(60), "DATA:", CONTENT_DATA, EMOTE_NULL,
    ],
    labels: //WORKSPACE: data imported, empty model framework shown. lead into "pick labels"
    [
      trigger_click, "So... I need to label the equation, right?", CONTENT_PLAYER, EMOTE_NULL,
      get_timer(120), "Yep! You're gettin' the hang of this!", CONTENT_AI, EMOTE_NULL,
      get_timer(120), "I've been workin' on the railroad, allll the livelong day... 🎵", CONTENT_AI, EMOTE_NULL,
    ],
    labels_incorrect: //WORKSPACE: labels chosen incorrectly; reset
    [
      get_timer(20), "Nope! Try again, bestie.", CONTENT_AI, EMOTE_NULL,
    ],
    constants: //WORKSPACE: labels chosen. show known constants, lead into "define unknowns"
    [
      get_timer(100), "Great job! 🎉", CONTENT_AI, EMOTE_NULL,
      get_timer(100), "There's no initial charge.", CONTENT_AI, EMOTE_NULL,
      get_timer(100), "Initial", CONTENT_CONSTANT, 4,
      trigger_click, "Do you know how fast the bots are charging?", CONTENT_PLAYER, EMOTE_NULL,
      get_timer(100), "Nope. You'll have to figure out the rate.", CONTENT_AI, EMOTE_NULL,
      get_timer(100), "See if you can get the numbers to match up!", CONTENT_AI, EMOTE_NULL,
    ],
    submit: //WORKSPACE: values matched; lead to submit
    [
      get_timer(20), "Show me your data when you're ready!", CONTENT_AI, EMOTE_NULL,
    ],
    submitted_incorrect: //WORKSPACE: submitted before values correct; reset
    [
      get_timer(20), "Silly human! Try again.", CONTENT_AI, EMOTE_NULL,
    ],
    review: //WORKSPACE: submitted correct equation; lead to review survival chances
    [
      get_timer(20), "You did it! 🎉", CONTENT_AI, EMOTE_NULL,
      get_timer(20), "We've got our baseline charge rate!", CONTENT_AI, EMOTE_NULL,
    ],
    debrief: //WORKSPACE: draw conclusion based on review; lead back to lab
    [
      trigger_click, "Great. Let's see if I can make improve it!", CONTENT_PLAYER, EMOTE_NULL,
    ],
    pre_improve: //LAB: about to show system
    [
      "Wheee! I'm so glad that weird pulse messed up your ship.", CONTENT_AI, EMOTE_NULL,
      "This is the most fun I've had in 200 years!!!", CONTENT_AI, EMOTE_NULL,
      "Um... thanks.", CONTENT_PLAYER, EMOTE_NULL,
      "I'm gonna build some new batteries now.", CONTENT_PLAYER, EMOTE_NULL,
      "Good luck, bestie! 🤞", CONTENT_AI, EMOTE_NULL,
    ],
    improve: //LAB: show system
    [
    ],
    post: //LAB: send to bed
    [
      "THIS SHOULD BE SKIPPED", CONTENT_AI, EMOTE_NULL,
    ],
  },

  //improve charge rate
  { //one level. copy and paste from this { to the following } to create a new level
    pre_context: //LAB: you've just awoken. lead into show context animation.
    [
      "Good morning, best friend!!!", CONTENT_AI, EMOTE_NULL,
      "Yikes. You look awful.", CONTENT_AI, EMOTE_NULL,
      "I was up all night working on the new batteries.", CONTENT_PLAYER, EMOTE_NULL,
      "I FINALLY got them installed a few hours ago.", CONTENT_PLAYER, EMOTE_NULL,
    ],
    context: //LAB: context animation on-screen
    [
      "Oooooh, shiny!", CONTENT_AI, EMOTE_NULL,
      "I've been collecting data all night.", CONTENT_AI, EMOTE_NULL,
      "Let's pull up our model and see how your batteries are working!", CONTENT_AI, EMOTE_NULL,
    ],
    lets_go: //LAB: just shown context animation. lead into going to workspace.
    [
    ],
    status: //WORKSPACE: full "14 days" graph shown, w/ "survive/die" zones (unknown where you will land).
    [
      get_timer(20), "THIS SHOULD BE SKIPPED", CONTENT_AI, EMOTE_NULL,
    ],
    data: //WORKSPACE: graph zoomed into 10-hour scope. give data
    [
      get_timer(20), "Here's the new data!", CONTENT_AI, EMOTE_NULL,
      get_timer(20), "DATA:", CONTENT_DATA, EMOTE_NULL,
    ],
    labels: //WORKSPACE: data imported, empty model framework shown. lead into "pick labels"
    [
      get_timer(120), "THIS SHOULD BE SKIPPED", CONTENT_AI, EMOTE_NULL,
    ],
    labels_incorrect: //WORKSPACE: labels chosen incorrectly; reset
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
      "Can you pull up the crystal collecting model?", CONTENT_PLAYER, EMOTE_NULL,
      "I need to predict if I'm gonna make it.", CONTENT_PLAYER, EMOTE_NULL,
    ],
    improve: //LAB: show system
    [
    ],
    post: //LAB: send to bed
    [
      "THIS SHOULD BE SKIPPED", CONTENT_PLAYER, EMOTE_NULL,
    ],
  },

  //check crystals
  { //one level. copy and paste from this { to the following } to create a new level
    pre_context: //LAB: you've just awoken. lead into show context animation.
    [
      "Here we go, friend!!!", CONTENT_AI, EMOTE_NULL,
    ],
    context: //LAB: context animation on-screen
    [
      "The bots are hard at work.", CONTENT_AI, EMOTE_NULL,
    ],
    lets_go: //LAB: just shown context animation. lead into going to workspace.
    [
      "Let's see if it'll be enough!", CONTENT_AI, EMOTE_NULL,
    ],
    status: //WORKSPACE: full "14 days" graph shown, w/ "survive/die" zones (unknown where you will land).
    [
      get_timer(20), "Remember, you need enough fuel by Day 14.", CONTENT_AI, EMOTE_NULL,
    ],
    data: //WORKSPACE: graph zoomed into 10-hour scope. give data
    [
      get_timer(20), "Drag the data onto the table.", CONTENT_AI, EMOTE_NULL,
      get_timer(20), "DATA:", CONTENT_DATA, EMOTE_NULL,
    ],
    labels: //WORKSPACE: data imported, empty model framework shown. lead into "pick labels"
    [
      get_timer(120), "THIS SHOULD BE SKIPPED", CONTENT_AI, EMOTE_NULL,
    ],
    labels_incorrect: //WORKSPACE: labels chosen incorrectly; reset
    [
      get_timer(20), "Nope, that's not right! Give it another try.", CONTENT_AI, EMOTE_NULL,
    ],
    constants: //WORKSPACE: labels chosen. show known constants, lead into "define unknowns"
    [
      get_timer(20), "Here's the crystal count.", CONTENT_AI, EMOTE_NULL,
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
      "Looks like I'll have enough crystals on X!", CONTENT_PLAYER, EMOTE_NULL,
      "Well, we could keep working on the robots, just in case... ", CONTENT_AI, EMOTE_NULL,
      "That's a good idea, but I think I need some rest. I was up all night!", CONTENT_PLAYER, EMOTE_NULL,
      "I'll try to stop by and say good-bye before I leave. Thanks again, Cris!!!", CONTENT_PLAYER, EMOTE_NULL,
      "Don't mention it.", CONTENT_AI, EMOTE_NULL,
    ],
    improve: //LAB: show system
    [
    ],
    post: //LAB: send to bed
    [
      "THIS SHOULD BE SKIPPED", CONTENT_AI, EMOTE_NULL,
    ],
  },

  //initial charge rate
  { //one level. copy and paste from this { to the following } to create a new level
    pre_context: //LAB: you've just awoken. lead into show context animation.
    [
      "Hey, bestie! I've got good news!", CONTENT_AI, EMOTE_NULL,
      "Check it out!", CONTENT_AI, EMOTE_NULL,
    ],
    context: //LAB: context animation on-screen
    [
      "Here they are mining.", CONTENT_AI, EMOTE_NULL,
    ],
    lets_go: //LAB: just shown context animation. lead into going to workspace.
    [
      "The extra charge means the bots are charging up faster!", CONTENT_AI, EMOTE_NULL,
      "Come on, let's model it!!!!", CONTENT_AI, EMOTE_NULL,
    ],
    status: //WORKSPACE: full "14 days" graph shown, w/ "survive/die" zones (unknown where you will land).
    [
      get_timer(20), "THIS SHOULD BE SKIPPED", CONTENT_AI, EMOTE_NULL,
      get_timer(20), "You need enough fuel before your oxygen runs out.", CONTENT_AI, EMOTE_NULL,
    ],
    data: //WORKSPACE: graph zoomed into 10-hour scope. give data
    [
      get_timer(20), "Here's the data I have on the subject.", CONTENT_AI, EMOTE_NULL,
      get_timer(20), "DATA:", CONTENT_DATA, EMOTE_NULL,
    ],
    labels: //WORKSPACE: data imported, empty model framework shown. lead into "pick labels"
    [
      get_timer(120), "THIS SHOULD BE SKIPPED", CONTENT_AI, EMOTE_NULL,
      get_timer(20), "I'm not sure how this can be modelled.", CONTENT_AI, EMOTE_NULL,
    ],
    labels_incorrect: //WORKSPACE: labels chosen incorrectly; reset
    [
      get_timer(20), "Something about that doesn't look right...", CONTENT_AI, EMOTE_NULL,
    ],
    constants: //WORKSPACE: labels chosen. show known constants, lead into "define unknowns"
    [
      get_timer(20), "Let's try that. We have a few known constants.", CONTENT_AI, EMOTE_NULL,
      get_timer(20), "Rate", CONTENT_CONSTANT, 4,
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
    improve: //LAB: show system
    [
      "Hey that's ok- let's try improving something!", CONTENT_AI, EMOTE_NULL,
    ],
    post: //LAB: send to bed
    [
      "THIS SHOULD BE SKIPPED", CONTENT_AI, EMOTE_NULL,
      "Goodnight!", CONTENT_AI, EMOTE_NULL,
    ],
  },

  //check crystals
  { //one level. copy and paste from this { to the following } to create a new level
    pre_context: //LAB: you've just awoken. lead into show context animation.
    [
      "Good morning! Here's what happened.", CONTENT_AI, EMOTE_NULL,
    ],
    context: //LAB: context animation on-screen
    [
      "Here they are mining.", CONTENT_AI, EMOTE_NULL,
    ],
    lets_go: //LAB: just shown context animation. lead into going to workspace.
    [
      "Let's try modelling it.", CONTENT_AI, EMOTE_NULL,
    ],
    status: //WORKSPACE: full "14 days" graph shown, w/ "survive/die" zones (unknown where you will land).
    [
      get_timer(20), "You need enough fuel before your oxygen runs out.", CONTENT_AI, EMOTE_NULL,
    ],
    data: //WORKSPACE: graph zoomed into 10-hour scope. give data
    [
      get_timer(20), "Here's the data I have on the subject.", CONTENT_AI, EMOTE_NULL,
      get_timer(20), "DATA:", CONTENT_DATA, EMOTE_NULL,
    ],
    labels: //WORKSPACE: data imported, empty model framework shown. lead into "pick labels"
    [
      get_timer(120), "THIS SHOULD BE SKIPPED", CONTENT_AI, EMOTE_NULL,
      get_timer(20), "I'm not sure how this can be modelled.", CONTENT_AI, EMOTE_NULL,
    ],
    labels_incorrect: //WORKSPACE: labels chosen incorrectly; reset
    [
      get_timer(20), "Something about that doesn't look right...", CONTENT_AI, EMOTE_NULL,
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
    improve: //LAB: show system
    [
      "Hey that's ok- let's try improving something!", CONTENT_AI, EMOTE_NULL,
    ],
    post: //LAB: send to bed
    [
      "Goodnight!", CONTENT_AI, EMOTE_NULL,
    ],
  },


];

var used_text = english_text;
