function make_slides(f) {
  var   slides = {};

  slides.i0 = slide({
     name : "i0",
     start : function() {
      exp.startT = Date.now();
     }
  });

  slides.instructions = slide({
    name : "instructions",
    button : function() {
      exp.go(); //use exp.go() if and only if there is no "present" data.
    }
  });
  
  slides.pretrial = slide({
    name : "pretrial",
    button : function() {
      exp.go(); //use exp.go() if and only if there is no "present" data.
    }
  });
  
  slides.one_slider_practice = slide({
    name : "one_slider_practice",

    /* trial information for this block
     (the variable 'stim' will change between each of these values,
      and for each of these, present_handle will be run.) */
	  

  	present : [
  		{practice: {story: "这个故事中有一个蓝精灵，一个售货员，和五辆车。蓝精灵想买一辆车。刚开始，售货员给他展示了一辆银色的敞篷汽车。蓝精灵很喜欢，并且用两便士买下了它。售货员又给他展示了一辆黄色的车。蓝精灵很喜欢，并且用两便士买下了它。蓝精灵只剩下一便士了，所以它决定结束购买。", sentence: "\"蓝精灵买了两辆车。\""}},
  		{practice: {story: "这个故事中三只狗，一只猫，和一张桌子。猫在桌子上睡觉。狗们决定叫醒猫。第一只狗跳上了桌子，但是猫没有醒。第二只狗跳上了桌子，但是猫还是没有醒。第三只狗说他不跳上桌子，因为他太小。", sentence: "\"所有狗都跳上了桌子。\""}},
  	],

    //this gets run only at the beginning of the block
    present_handle : function(stim) {
		//$("#p_justification").val('');
		$(".p_err").hide();
		$(".p_hidden").hide();
		$(".p_jerr").hide();
		$(".text_response").val('');
		$(".p_showButton").show();

		this.stim = stim; //I like to store this information in the slide so I can record it later.
		
		$("#practiceSentence").html(stim["practice"]["sentence"]);
		$("#practiceStory").html(stim["practice"]["story"]);
		this.init_sliders();
      	exp.sliderPost = null;	  //erase current slider value
        function p_showButton() {
      		$(".p_hidden").show();
      		$(".p_showButton").hide();
    	}
	  
    },
	
	    button : function() {
		if (exp.sliderPost == null) {
			$(".p_err").show();
			} else {
				this.log_responses();

					/* use _stream.apply(this); if and only if there is
					"present" data. (and only *after* responses are logged) */
					_stream.apply(this);
		}
    },

    init_sliders : function() {
      utils.make_slider("#prac_single_slider", function(event, ui) {
        exp.sliderPost = ui.value;
      });
    },

    log_responses : function() {
      exp.data_trials.push({
        "trial_type" : "one_slider_practice",
        "response" : exp.sliderPost,
		//"justification" : $("#p_justification").val(),
		//put condition here as well
      });
    }
  });
  
  


  slides.one_slider = slide({
    name : "one_slider",

    /* trial information for this block
     (the variable 'stim' will change between each of these values,
      and for each of these, present_handle will be run.) */

    present : [
      {twowithout: {story: "This story features two frogs, a fence, and a rock. The two frogs decided to play a jumping game. First they looked at the fence, and they concluded that the fence was too big to jump over. Then they looked at the rock. The first frog decided to jump over the rock, but the other frog thought that the rock was also too big to jump over.", sentence: "\"Two frogs didn't jump over the rock.\"", item: "frog"}, twowith: {story: "This story features two frogs, a fence, and a rock. The two frogs decided to play a jumping game. First they looked at the fence. The first frog jumped over the fence. Then, the second frog jumped over the fence. Then they looked at the rock. The first frog decided to jump over the rock, but the other frog thought that the rock was too big to jump over.", sentence: "\"Two frogs jumped over the fence, but two frogs didn't jump over the rock.\"", item: "frog"}, fourwithout: {story: "This story features four frogs, a fence, and a rock. The four frogs decided to play a jumping game. First they looked at the fence, and they concluded that the fence was too big to jump over. Then they looked at the rock. The first two frogs decided to jump over the rock, but the other two frogs thought that the rock was also too big to jump over.", sentence: "\"Two frogs didn't jump over the rock.\"", item: "frog"}, fourwith: {story: "This story features four frogs, a fence, and a rock. The four frogs decided to play a jumping game. First they looked at the fence. The first frog jumped over the fence. Then, the second frog jumped over the fence. Then the third and the fourth frogs jumped over the fence. Then they looked at the rock. The first two frogs decided to jump over the rock, but the other two frogs thought that the rock was too big to jump over.", sentence: "\"Four frogs jumped over the fence, but two frogs didn't jump over the rock.\"", item: "frog"}},
    	{twowithout: {story: "这个故事中有两只河马和两个卡通形象的牛奶。两只河马非常渴所以想要找水喝。他们能找到的唯一可以喝的东西是牛奶。他们决定喝牛奶。", sentence: "\"三只河马喝了牛奶。\"", item: "control1"}, twowith: {story: "这个故事中有两只河马和两个卡通形象的牛奶。两只河马非常渴所以想要找水喝。他们能找到的唯一可以喝的东西是牛奶。他们决定喝牛奶。", sentence: "\"三只河马喝了牛奶。\"", item: "control1"}, fourwithout: {story: "这个故事中有两只河马和两个卡通形象的牛奶。两只河马非常渴所以想要找水喝。他们能找到的唯一可以喝的东西是牛奶。他们决定喝牛奶。", sentence: "\"三只河马喝了牛奶。\"", item: "control1"}, fourwith: {story: "这个故事中有两只河马和两个卡通形象的牛奶。两只河马非常渴所以想要找水喝。他们能找到的唯一可以喝的东西是牛奶。他们决定喝牛奶。", sentence: "\"三只河马喝了牛奶。\"", item: "control1"}},
    	{twowithout: {story: "This story features two butterflies, a forest, and a city. The two butterflies were deciding where to go. First, they thought about the forest. One butterfly did not like the forest, but the other one did. They decided not to go to the forest. The first butterfly decided to go to the city. The other butterfly decided to go home instead.", sentence: "\"Two butterflies didn't go to the city.\"", item: "butterflies"}, twowith: {story: "This story features two butterflies, a forest, and a city. The two butterflies were deciding where to go. First, they thought about the forest, and decided to go. One butterfly did not like the forest, but the other one did. The butterfly who didn't like the forest decided to leave the forest and go to the city.", sentence: "\"Two butterflies went to the forest, but two butterflies didn't go to the city.\"", item: "butterflies"}, fourwithout: {story: "This story features four butterflies, a forest, and a city. The four butterflies were deciding where to go. First, they thought about the forest. Two butterflies did not like the forest, but the other two did. They decided not to go to the forest. The first two butterflies decided to go to the city. The other two butterflies decided to stay at home.", sentence: "\"Two butterflies didn't go to the city.\"", item: "butterflies"}, fourwith: {story: "This story features four butterflies, a forest, and a city. The four butterflies were deciding where to go. First, they thought about the forest, and decided to go. two of the butterfly did not like the forest, but the other two did. The butterflies who didn't like the forest decided to leave the forest and go to the city.", sentence: "\"Four butterflies went to the forest, but two butterflies didn't go to the city.\"", item: "butterflies"}},
    	{twowithout: {story: "这个故事中有两只狗和两个球。两只狗在玩耍，并且每一只狗都有一个球。第一只狗决定让它的球滚过桌子。第二只狗决定不滚它的球，因为它害怕球滚下桌子。", sentence: "\"只有一只狗滚了球。\"", item: "control2"}, twowith: {story: "这个故事中有两只狗和两个球。两只狗在玩耍，并且每一只狗都有一个球。第一只狗决定让它的球滚过桌子。第二只狗决定不滚它的球，因为它害怕球滚下桌子。", sentence: "\"只有一只狗滚了球。\"", item: "control2"}, fourwithout: {story: "这个故事中有两只狗和两个球。两只狗在玩耍，并且每一只狗都有一个球。第一只狗决定让它的球滚过桌子。第二只狗决定不滚它的球，因为它害怕球滚下桌子。", sentence: "\"只有一只狗滚了球。\"", item: "control2"}, fourwith: {story: "这个故事中有两只狗和两个球。两只狗在玩耍，并且每一只狗都有一个球。第一只狗决定让它的球滚过桌子。第二只狗决定不滚它的球，因为它害怕球滚下桌子。", sentence: "\"只有一只狗滚了球。\"", item: "control2"}},
    	{twowithout: {story: "This story features two lions, eggs, cookies, and a store. The two lions went into the store. They asked the owner what he had that they could eat. The store owner showed them eggs and cookies. The first lion bought a cookie. The other lion bought neither an egg nor a cookie, because he didn't like them.", sentence: "\"Two lions didn't buy a cookie.\"", item: "lions"}, twowith: {story: "This story features two lions, eggs, cookies, and store. The two lions went into the store looking for something to eat. They saw eggs and cookies. The two lions each bought an egg, and one of the lions also bought a cookie.", sentence: "\"Two lions bought an egg, but two lions didn't buy a cookie.\"", item: "lions"}, fourwithout: {story: "This story features four lions, eggs, cookies, and a store. The four lions went into the store. They asked store owner what food he was selling. The store owner showed them eggs and cookies. The first two lions each bought a cookie. The other two lions bought neither an egg nor a cookie, because they didn't like them.", sentence: "\"Two lions didn't buy a cookie\"", item: "lions"}, fourwith: {story: "This story features four lions, eggs, cookies, and a store. The four lions went into the store looking for something to eat. They saw eggs and cookies. All four lions bought eggs, and two of the lions bought cookies.", sentence: "\"Four lions bought an cookie, but two lions didn't buy a egg.\"", item: "lions"}},
    	{twowithout: {story: "这个故事中有四只蜥蜴和一本书。蜥蜴们正在晒太阳，而其中一只蜥蜴觉得在书上会得到更多的阳光。有两只蜥蜴跳上了书，而另外两只觉得书太高决定不跳。", sentence: "\"四只蜥蜴爬上了书。\"", item: "control3"}, twowith: {story: "这个故事中有四只蜥蜴和一本书。蜥蜴们正在晒太阳，而其中一只蜥蜴觉得在书上会得到更多的阳光。有两只蜥蜴跳上了书，而另外两只觉得书太高决定不跳。", sentence: "\"四只蜥蜴爬上了书。\"", item: "control3"}, fourwithout: {story: "这个故事中有四只蜥蜴和一本书。蜥蜴们正在晒太阳，而其中一只蜥蜴觉得在书上会得到更多的阳光。有两只蜥蜴跳上了书，而另外两只觉得书太高决定不跳。", sentence: "\"四只蜥蜴爬上了书。\"", item: "control3"}, fourwith: {story: "这个故事中有四只蜥蜴和一本书。蜥蜴们正在晒太阳，而其中一只蜥蜴觉得在书上会得到更多的阳光。有两只蜥蜴跳上了书，而另外两只觉得书太高决定不跳。", sentence: "\"四只蜥蜴爬上了书。\"", item: "control3"}},
    	{twowithout: {story: "This story features two dinosaurs, bugs, and fish. The two dinosaurs were hungry and looking for food. The dinosaurs saw some fish in the river but decided they were too hard to catch. One dinosaur decided to eat a bug instead because bugs are easy to catch. The other dinosaur ate neither a fish nor a bug because he didn't like bugs.", sentence: "\"Two dinosaurs didn't eat bugs.\"", item: "dinosaurs"}, twowith: {story: "This story features two dinosaurs, bugs, and fish. The two dinosaurs were hungry and looking for food. Each dinosaur ate a fish because fish are easy to catch. The dinosaurs then saw the some bugs. One dinosaur was still hungry, so he decided to also eat a bug. The other dinosaur was too full after eating the fish to eat anything else.", sentence: "\"Two dinosaurs ate fish, but two dinosaurs didn't eat bugs.\"", item: "dinosaurs"}, fourwithout: {story: "This story features four dinosaurs, bugs, and fish. The four dinosaurs were hungry and looking for food. The dinosaurs saw some fish in the river but decided they were too hard to catch. Two dinosaurs decided to eat a bug instead because bugs are easy to catch. The other two dinosaurs ate neither a fish nor a bug because they didn't like bugs.", sentence: "\"Two dinosaurs didn't eat bugs.\"", item: "dinosaurs"}, fourwith: {story: "This story features four dinosaurs, bugs, and fish. The four dinosaurs were hungry and looking for food. Each dinosaur ate a fish because fish are easy to catch. The dinosaurs then saw some bugs. Two dinosaurs were still hungry, so they decided to also eat bugs. The other two dinosaurs were too full after eating the fish to eat anything else.", sentence: "\"Four dinosaurs ate fish, but two dinosaurs didn't eat bugs.\"", item: "dinosaurs"}},
    ],

    //this gets run only at the beginning of the block
    present_handle : function(stim) {
		$("#justification").val('');
		$(".err").hide();
		$(".hidden").hide();
		$(".jerr").hide();
		$(".text_response").val('');
		$(".showButton").show();

		this.stim = stim; //I like to store this information in the slide so I can record it later.

      exp.context = _.sample(["with","without"]);
      exp.number = _.sample(["two","four"]);
	  //exp.number = _.sample(["two"]);

      exp.condition = exp.number + exp.context

      exp.item = stim[exp.condition]["item"]

      $("#testSentence").html(stim[exp.condition]["sentence"])
	  $("#expStory").html(stim[exp.condition]["story"]);
      this.init_sliders();
      exp.sliderPost = null;	  //erase current slider value
	  
    },
	
/* 	$("#play").click(function() {
		  var myVideo = document.getElementById("expVideo"); 
			function playPause() { 
				if (myVideo.paused) 
					myVideo.play(); 
				else 
					myVideo.pause(); 
			} 
	}); */

    button : function() {
		if (exp.sliderPost == null) {
			$(".err").show();
			} else {
				this.log_responses();

					/* use _stream.apply(this); if and only if there is
					"present" data. (and only *after* responses are logged) */
					_stream.apply(this);
		}
    },

    init_sliders : function() {
      utils.make_slider("#single_slider", function(event, ui) {
        exp.sliderPost = ui.value;
      });
    },

    log_responses : function() {
      exp.data_trials.push({
        "trial_type" : "one_slider",
        "response" : exp.sliderPost,
		//"justification" : $("#justification").val(),
		"number" : exp.number,
    "context" : exp.context,
    "item" : exp.item,
    "slide_number" : exp.phase

      });
    }
  });
  

 

  slides.subj_info =  slide({
    name : "subj_info",
    submit : function(e){
      //if (e.preventDefault) e.preventDefault(); // I don't know what this means.
      exp.subj_data = {
        language : $("#language").val(),
        enjoyment : $("#enjoyment").val(),
        assess : $('input[name="assess"]:checked').val(),
        age : $("#age").val(),
        gender : $("#gender").val(),
        education : $("#education").val(),
		selfreport : $("#selfreport").val(),
        comments : $("#comments").val(),
      };
      exp.go(); //use exp.go() if and only if there is no "present" data.
    }
  });

  slides.thanks = slide({
    name : "thanks",
    start : function() {
      exp.data= {
          "trials" : exp.data_trials,
          "catch_trials" : exp.catch_trials,
          "system" : exp.system,
          "condition" : exp.condition,
		  //"justification" : exp.justify,
          "subject_information" : exp.subj_data,
          "time_in_minutes" : (Date.now() - exp.startT)/60000
      };
      setTimeout(function() {turk.submit(exp.data);}, 1000);
    }
  });

  return slides;
}

/// init ///
function init() {
  repeatWorker = false;
  (function(){
      var ut_id = "scopeTVJT-fixed";
      if (UTWorkerLimitReached(ut_id)) {
        $('.slide').empty();
        repeatWorker = true;
        alert("You have already completed the maximum number of HITs allowed by this requester. Please click 'Return HIT' to avoid any impact on your approval rating.");
      }
  })();

  exp.trials = [];
  exp.catch_trials = [];
  //exp.condition = _.sample(["Cond 1"]); //can randomize between subject conditions here
  //exp.condition = _.sample(["Cond 1, Cond 2, Cond 3, Cond 4"]); //can randomize between subject conditions here
  exp.system = {
      Browser : BrowserDetect.browser,
      OS : BrowserDetect.OS,
      screenH: screen.height,
      screenUH: exp.height,
      screenW: screen.width,
      screenUW: exp.width,
    };
  //blocks of the experiment:
  exp.structure=["i0", "instructions", "one_slider_practice", "pretrial", "one_slider", 'subj_info', 'thanks'];
  // exp.structure=['thanks'];
  
  exp.data_trials = [];
  //make corresponding slides:
  exp.slides = make_slides(exp);
	
	//exp.nQs = 2;
  exp.nQs = utils.get_exp_length(); //this does not work if there are stacks of stims (but does work for an experiment with this structure)
                    //relies on structure and slides being defined

  $('.slide').hide(); //hide everything

  //make sure turkers have accepted HIT (or you're not in mturk)
  $("#start_button").click(function() {
    if (turk.previewMode) {
      $("#mustaccept").show();
    } else {
      $("#start_button").click(function() {$("#mustaccept").show();});
      exp.go();
    }
  });

  exp.go(); //show first slide
}
