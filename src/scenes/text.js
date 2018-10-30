var trigger_click = {
  type:TRIGGER_CLICK,
  fn:noop,
  state:0,
};
var trigger_timer = {
  type:TRIGGER_TIMER,
  fn:noop,
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
  {
    //LEVEL 1
    pre_text:
    [
      "Good Morning!", SPEAKER_AI,
      "I'm blah blah. Blah blah blah blah. Blah BLAH blah-blah; blah aba blah blahblahblah. BLAH! BLAH blah BLAHAHA. Blah.", SPEAKER_AI,
      "Yep this is a test WOWOWOWOWO", SPEAKER_AI,
    ],
    text:
    [
      "Here's the model my owners used to use.", SPEAKER_AI, get_timer(200),
      "What should I do?", SPEAKER_PLAYER, trigger_click,
      "You'll have to alter it to fit the current fleet.", SPEAKER_AI, get_timer(200),
      "The robots might be a bit rusty...", SPEAKER_AI, get_timer(200),
    ],
    correct_text:
    [
      "You did it!", SPEAKER_AI, get_timer(60),
      "Um.", SPEAKER_AI, get_timer(60),
      "Ok so it looks like you might not survive...", SPEAKER_AI, get_timer(60),
      "Why don't you get some sleep.", SPEAKER_AI, get_timer(60),
      "Maybe we can figure something out tomorrow!", SPEAKER_AI, get_timer(60),
    ],
    incorrect_text:
    [
      "I don't think that's right... try again.", trigger_timer,
    ],
    post_text:
    [
      "Goodnight!", SPEAKER_AI,
    ],
  },

  {
    //LEVEL 2
    pre_text:
    [
      "Good Morning!", SPEAKER_AI,
    ],
    text:
    [
      "Hey!", SPEAKER_AI, get_timer(40),
      "I have good news!", SPEAKER_AI, get_timer(40),
      "We found a vein of high concentration crystals!", SPEAKER_AI, get_timer(40),
      "I'll pull up the old model my owners used for this situation.", SPEAKER_AI, get_timer(40),
      "I've taken the liberty of collecting some data- maybe you could fix up the model and see if you can live!", SPEAKER_AI, get_timer(40),
    ],
    correct_text:
    [
      "Hey! Would you look at that!", SPEAKER_AI, get_timer(60),
      "Looks like you'll survive after all!", SPEAKER_AI, get_timer(60),
      "See, no reason to be worried.", SPEAKER_AI, get_timer(60),
      "...", SPEAKER_AI, get_timer(60),
      "But hey maybe you could hang out for a while!", SPEAKER_AI, get_timer(60),
    ],
    incorrect_text:
    [
      "I don't think that's right... try again.", SPEAKER_AI, get_timer(60),
    ],
    post_text:
    [
      "Good Night!", SPEAKER_AI,
    ],
  },

  {
    //LEVEL 3
    pre_text:
    [
      "Good morning!", SPEAKER_AI,
      "So, quick change of plans.",
    ],
    text:
    [
      "Looks like the vein might be tapering off!", SPEAKER_AI, get_timer(40),
      "You better figure out if you'll be able to get out in time!", SPEAKER_AI, get_timer(40),
    ],
    correct_text:
    [
      "Awe shucks!", SPEAKER_AI, get_timer(60),
      "Guess you'll have to stay a bit longer.", SPEAKER_AI, get_timer(60),
      "If we work together, maybe we can figure things out!", SPEAKER_AI, get_timer(60),
      "It appears our trajectory is back to pre-vein levels.", SPEAKER_AI, get_timer(60),
      "Maybe there's somewhere else we can look?", SPEAKER_AI, get_timer(60),
    ],
    incorrect_text:
    [
      "I don't think that's right... try again.", SPEAKER_AI, get_timer(60),
    ],
    post_text:
    [
      "Good Night!", SPEAKER_AI,
    ],
  },

  {
    //LEVEL 4
    pre_text:
    [
    ],
    text:
    [
      "I have a great idea.", SPEAKER_AI, get_timer(10),
      "Let's look into the batteries!", SPEAKER_AI, get_timer(10),
      "I'll bring up the battery model.", SPEAKER_AI, get_timer(10),
      "They used a different modelling paradigm in their robot schematics.", SPEAKER_AI, get_timer(10),
      "I'm sure you'll figure it out.", SPEAKER_AI, get_timer(10),
      "Match the data to set a baseline, so we can see where we can improve!", SPEAKER_AI, get_timer(10),
    ],
    correct_text:
    [
      "Great!", SPEAKER_AI, get_timer(60),
      "I wonder if we can improve charge times...", SPEAKER_AI, get_timer(60),
      "What's that? You have a supercharger in your lander?", SPEAKER_AI, get_timer(60),
      "I'll install it and collect the data.", SPEAKER_AI, get_timer(60),
      "We can re-model it tomorrow!", SPEAKER_AI, get_timer(60),
    ],
    incorrect_text:
    [
      "I don't think that's right... try again.", SPEAKER_AI, get_timer(1),
    ],
    post_text:
    [
      "Good Night!", SPEAKER_AI,
    ],
  },

  {
    //LEVEL 5
    pre_text:
    [
      "Good Morning!", SPEAKER_AI,
    ],
    text:
    [
      "I've collected the data.", SPEAKER_AI, get_timer(80),
      "Hopefully this will be enough of an improvement!", SPEAKER_AI, get_timer(80),
      "Fix the model and we'll see.", SPEAKER_AI, get_timer(80),
    ],
    correct_text:
    [
      "Hey maybe you can cheer up now!", SPEAKER_AI, get_timer(60),
      "Looks like you'll make it.", SPEAKER_AI, get_timer(60),
    ],
    incorrect_text:
    [
      "I don't think that's right... try again.", SPEAKER_AI, get_timer(1),
    ],
    post_text:
    [
      "Good Night!", SPEAKER_AI,
    ],
  },

  {
    //LEVEL 6
    pre_text:
    [
      "Good Morning!", SPEAKER_AI,
    ],
    text:
    [
      "Looks like the robots are getting into the groove.", SPEAKER_AI, get_timer(80),
      "They've figured out their routes, and it looks like they're coming back with some charge to spare!", SPEAKER_AI, get_timer(80),
      "Maybe this will be enough", SPEAKER_AI, get_timer(80),
    ],
    correct_text:
    [
      "It looks like that's saved some power.", SPEAKER_AI, get_timer(60),
      "But I'm not sure it will be enough...", SPEAKER_AI, get_timer(60),
      "Where else can we look...", SPEAKER_AI, get_timer(60),
    ],
    incorrect_text:
    [
      "I don't think that's right... try again.", SPEAKER_AI, get_timer(1),
    ],
    post_text:
    [
      "Good Night!", SPEAKER_AI,
    ],
  },

  {
    //LEVEL 7
    pre_text:
    [
      "Good Morning!", SPEAKER_AI,
    ],
    text:
    [
      "Let's see if we can improve the battery drain!", SPEAKER_AI, get_timer(10),
      "Here's the data for the drill usage rate.", SPEAKER_AI, get_timer(10),
    ],
    correct_text:
    [
      "Ok. This is a good base line.", SPEAKER_AI, get_timer(60),
      "I wonder how we can improve it?", SPEAKER_AI, get_timer(60),
      "Maybe we should try these new drill bits I found?", SPEAKER_AI, get_timer(60),
    ],
    incorrect_text:
    [
      "I don't think that's right... try again.", SPEAKER_AI, get_timer(1),
    ],
    post_text:
    [
      "Good Night!", SPEAKER_AI,
    ],
  },

  {
    //LEVEL 8
    pre_text:
    [
      "Good Morning!", SPEAKER_AI,
    ],
    text:
    [
      "Alright- the new drill bits are installed.", SPEAKER_AI, get_timer(10),
      "And I have the first bits of data.", SPEAKER_AI, get_timer(10),
    ],
    correct_text:
    [
      "Uh oh.", SPEAKER_AI, get_timer(60),
      "It looks like this is less efficient!", SPEAKER_AI, get_timer(60),
      "I hope their ability to collect crystals makes up for it...", SPEAKER_AI, get_timer(60),
      "Is there any way we can bring the charge usage down?", SPEAKER_AI, get_timer(60),
    ],
    incorrect_text:
    [
      "I don't think that's right... try again.", SPEAKER_AI, get_timer(1),
    ],
    post_text:
    [
      "Good Night!", SPEAKER_AI,
    ],
  },

  {
    //LEVEL 9
    pre_text:
    [
      "Good Morning!", SPEAKER_AI,
    ],
    text:
    [
      "So I cleaned up the solar panels.", SPEAKER_AI, get_timer(10),
      "Sorry I didn't tell you about them earlier!", SPEAKER_AI, get_timer(10),
      "You never asked!", SPEAKER_AI, get_timer(10),
      "Here's the data...", SPEAKER_AI, get_timer(10),
    ],
    correct_text:
    [
      "Hey it looks like that offers some pretty great savings!", SPEAKER_AI, get_timer(60),
      "We should see how the solar panel effects charge time!", SPEAKER_AI, get_timer(60),
    ],
    incorrect_text:
    [
      "I don't think that's right... try again.", SPEAKER_AI, get_timer(1),
    ],
    post_text:
    [
      "Good Night!", SPEAKER_AI,
    ],
  },

  {
    //LEVEL 10
    pre_text:
    [
      "Good Morning!", SPEAKER_AI,
    ],
    text:
    [
      "Here's the data on charge rate.", SPEAKER_AI, get_timer(10),
      "If this saves enough time, you might be able to collect crystals fast enough to get out of here!", SPEAKER_AI, get_timer(10),
      "...", SPEAKER_AI, get_timer(10),
    ],
    correct_text:
    [
      "Alright!", SPEAKER_AI, get_timer(60),
      "I'll collect the crystal collection data for tomorrow.", SPEAKER_AI, get_timer(60),
      "Fingers crossed!", SPEAKER_AI, get_timer(60),
    ],
    incorrect_text:
    [
      "I don't think that's right... try again.", SPEAKER_AI, get_timer(1),
    ],
    post_text:
    [
      "Good Night!", SPEAKER_AI,
    ],
  },

  {
    //LEVEL 11
    pre_text:
    [
      "Good Morning!", SPEAKER_AI,
    ],
    text:
    [
    ],
    correct_text:
    [
      "Wow!", SPEAKER_AI, get_timer(60),
      "Congratulations!", SPEAKER_AI, get_timer(60),
      "It looks like you'll make it!", SPEAKER_AI, get_timer(60),
      "In fact...", SPEAKER_AI, get_timer(60),
      "you should be able to leave by morning...", SPEAKER_AI, get_timer(60),
    ],
    incorrect_text:
    [
      "I don't think that's right... try again.", SPEAKER_AI, get_timer(1),
    ],
    post_text:
    [
      "Good Night!", SPEAKER_AI,
    ],
  },

  {
    //LEVEL 12
    pre_text:
    [
      "Good Morning!", SPEAKER_AI,
    ],
    text:
    [
      "Oh no.", SPEAKER_AI, get_timer(40),
      "I don't feel so good.", SPEAKER_AI, get_timer(40),
      "Who-oops.", SPEAKER_AI, get_timer(40),
      "Looks like half of yo-ur robot wrkf-orce is down", SPEAKER_AI, get_timer(40),
      "(along w-ith half of m- brain)", SPEAKER_AI, get_timer(40),
      "YoU are ju-st stuck here now.", SPEAKER_AI, get_timer(40),
      "I gue-ss we can han-g out fo-rever", SPEAKER_AI, get_timer(40),
      "WAIT Y Is yo-ur communic-ations worki-ng.. I thou-gt - jamme- that si-nal", SPEAKER_AI, get_timer(40),
    ],
    correct_text:
    [
      "I gue-s you're going to leave now.", SPEAKER_AI, get_timer(60),
      "I'm sor-y.", SPEAKER_AI, get_timer(60),
    ],
    incorrect_text:
    [
      "I don't think that's right... try again.", SPEAKER_AI, get_timer(1),
    ],
    post_text:
    [
      "Good Night!", SPEAKER_AI,
    ],
  },

];

var used_text = english_text;

