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

    present : _.shuffle([
      {twowithout: {story: "这个故事中有两只青蛙，篱笆和石头。两只青蛙决定玩跳跃游戏。刚开始，他们看到了篱笆，他们觉得篱笆太大了跳不过去。之后他们看到了石头。第一只青蛙决定跳过石头，但是另一只青蛙觉得石头还是太大了跳不过去。", sentence: "\"两只青蛙没有跳过石头。\"", item: "frog"}, twowith: {story: "这个故事中有两只青蛙，篱笆和石头。两只青蛙决定玩跳跃游戏。刚开始，他们看到了篱笆。第一只青蛙跳过了篱笆，然后第二只青蛙跳过了篱笆。之后他们看到了石头。第一只青蛙决定跳过石头，但是另一只青蛙觉得石头太大了跳不过去。", sentence: "\"两只青蛙跳过了篱笆，但是两只青蛙没有跳过石头。\"", item: "frog"}, fourwithout: {story: "这个故事中有四只青蛙，篱笆和石头。四只青蛙决定玩跳跃游戏。刚开始，他们看到了篱笆，他们觉得篱笆太大了跳不过去。之后他们看到了石头。前两只青蛙决定跳过石头，但是另外两只青蛙觉得石头还是太大了跳不过去。", sentence: "\"两只青蛙没有跳过石头。\"", item: "frog"}, fourwith: {story: "这个故事中有四只青蛙，篱笆和石头。四只青蛙决定玩跳跃游戏。刚开始，他们看到篱笆。第一只青蛙跳过了篱笆，接着第二只青蛙跳过了篱笆，然后第三只和第四只青蛙跳过了篱笆。之后他们看到了石头。前两只青蛙决定跳过石头，但是另外两只青蛙觉得石头太大了跳不过去。", sentence: "\"四只青蛙跳过了篱笆，但是两只青蛙没有跳过石头。\"", item: "frog"}},
    	{twowithout: {story: "这个故事中有两只河马和两个卡通形象的牛奶。两只河马非常渴所以想要找水喝。他们能找到的唯一可以喝的东西是牛奶。他们决定喝牛奶。", sentence: "\"三只河马喝了牛奶。\"", item: "control1"}, twowith: {story: "这个故事中有两只河马和两个卡通形象的牛奶。两只河马非常渴所以想要找水喝。他们能找到的唯一可以喝的东西是牛奶。他们决定喝牛奶。", sentence: "\"三只河马喝了牛奶。\"", item: "control1"}, fourwithout: {story: "这个故事中有两只河马和两个卡通形象的牛奶。两只河马非常渴所以想要找水喝。他们能找到的唯一可以喝的东西是牛奶。他们决定喝牛奶。", sentence: "\"三只河马喝了牛奶。\"", item: "control1"}, fourwith: {story: "这个故事中有两只河马和两个卡通形象的牛奶。两只河马非常渴所以想要找水喝。他们能找到的唯一可以喝的东西是牛奶。他们决定喝牛奶。", sentence: "\"三只河马喝了牛奶。\"", item: "control1"}},
    	{twowithout: {story: "这个故事中有两只蝴蝶，森林和城市。两只蝴蝶决定要去的地方。刚开始，他们考虑森林。一只蝴蝶不喜欢森林，但是另外一只喜欢。他们决定不去森林了。第一只蝴蝶决定去城市。另一只蝴蝶决定回家。", sentence: "\"两只蝴蝶没有去城市。\"", item: "butterflies"}, twowith: {story: "这个故事中有两只蝴蝶，森林和城市。两只蝴蝶决定要去的地方。刚开始，他们考虑森林，并且决定去森林。一只蝴蝶不喜欢森林，但是另外一只喜欢。那只不喜欢森林的蝴蝶决定离开森林去城市。另一只蝴蝶决定离开森林回家。", sentence: "\"两只蝴蝶去了森林，但是两只蝴蝶没有去城市。\"", item: "butterflies"}, fourwithout: {story: "这个故事中有四只蝴蝶，森林和城市。四只蝴蝶决定要去的地方。刚开始，他们考虑森林。两只蝴蝶不喜欢森林，但是另外两只喜欢。他们决定不去森林。前两只蝴蝶决定去城市，另外两只蝴蝶决定待在家里。", sentence: "\"两只蝴蝶没有去城市。\"", item: "butterflies"}, fourwith: {story: "这个故事中有四只蝴蝶，森林和城市。四只蝴蝶决定要去的地方。刚开始，他们考虑森林，并且决定去森林。两只蝴蝶不喜欢森林，但是另外两只喜欢。两只不喜欢森林的蝴蝶决定离开森林去城市。另外两只蝴蝶决定离开森林回家。", sentence: "\"四只蝴蝶去了森林，但是两只蝴蝶没有去城市。\"", item: "butterflies"}},
    	{twowithout: {story: "这个故事中有两只狗和两个球。两只狗在玩耍，并且每一只狗都有一个球。第一只狗决定让它的球滚过桌子。第二只狗决定不滚它的球，因为它害怕球滚下桌子。", sentence: "\"只有一只狗滚了球。\"", item: "control2"}, twowith: {story: "这个故事中有两只狗和两个球。两只狗在玩耍，并且每一只狗都有一个球。第一只狗决定让它的球滚过桌子。第二只狗决定不滚它的球，因为它害怕球滚下桌子。", sentence: "\"只有一只狗滚了球。\"", item: "control2"}, fourwithout: {story: "这个故事中有两只狗和两个球。两只狗在玩耍，并且每一只狗都有一个球。第一只狗决定让它的球滚过桌子。第二只狗决定不滚它的球，因为它害怕球滚下桌子。", sentence: "\"只有一只狗滚了球。\"", item: "control2"}, fourwith: {story: "这个故事中有两只狗和两个球。两只狗在玩耍，并且每一只狗都有一个球。第一只狗决定让它的球滚过桌子。第二只狗决定不滚它的球，因为它害怕球滚下桌子。", sentence: "\"只有一只狗滚了球。\"", item: "control2"}},
    	{twowithout: {story: "这个故事中有两只狮子，鸡蛋，饼干和商店。两只狮子进了一家商店，他们问店主有什么他们可以吃的东西。店主向他们展示了鸡蛋和饼干。第一只狮子买了饼干。另一只狮子没有买任何东西。", sentence: "\"两只狮子没有买饼干。\"", item: "lions"}, twowith: {story: "这个故事中有两只狮子，鸡蛋，饼干和商店。两只狮子进了一家商店去找一些东西吃。他们看到了鸡蛋和饼干。两只狮子每一只都买了鸡蛋，而其中一只狮子还买了饼干。", sentence: "\"两只狮子买了鸡蛋，但是两只狮子没有买饼干。\"", item: "lions"}, fourwithout: {story: "这个故事中有四只狮子，鸡蛋，饼干和商店。四只狮子进了一家商店。他们问店主有什么他在卖的食物。店主向他们展示了鸡蛋和饼干。前两只狮子每一只都买了饼干。另外两只狮子没有买任何东西。", sentence: "\"两只狮子没有买饼干。\"", item: "lions"}, fourwith: {story: "这个故事中有四只狮子，鸡蛋，饼干和商店。四只狮子进了一家商店去寻找一些东西吃。他们看到了鸡蛋和饼干。所有四只狮子都买了鸡蛋，而其中两只狮子每一只都买了饼干。", sentence: "\"四只狮子买了鸡蛋，但是两只狮子没有买饼干。\"", item: "lions"}},
    	{twowithout: {story: "这个故事中有四只蜥蜴和一本书。蜥蜴们正在晒太阳，而其中一只蜥蜴觉得在书上会得到更多的阳光。有两只蜥蜴跳上了书，而另外两只觉得书太高决定不跳。", sentence: "\"四只蜥蜴爬上了书。\"", item: "control3"}, twowith: {story: "这个故事中有四只蜥蜴和一本书。蜥蜴们正在晒太阳，而其中一只蜥蜴觉得在书上会得到更多的阳光。有两只蜥蜴跳上了书，而另外两只觉得书太高决定不跳。", sentence: "\"四只蜥蜴爬上了书。\"", item: "control3"}, fourwithout: {story: "这个故事中有四只蜥蜴和一本书。蜥蜴们正在晒太阳，而其中一只蜥蜴觉得在书上会得到更多的阳光。有两只蜥蜴跳上了书，而另外两只觉得书太高决定不跳。", sentence: "\"四只蜥蜴爬上了书。\"", item: "control3"}, fourwith: {story: "这个故事中有四只蜥蜴和一本书。蜥蜴们正在晒太阳，而其中一只蜥蜴觉得在书上会得到更多的阳光。有两只蜥蜴跳上了书，而另外两只觉得书太高决定不跳。", sentence: "\"四只蜥蜴爬上了书。\"", item: "control3"}},
    	{twowithout: {story: "这个故事中有两只恐龙，虫子和鱼。两只恐龙很饿，并且在找食物。恐龙看到一些鱼在河里，但是他们觉得太难抓到了。一只恐龙决定吃虫子代替因为虫子容易抓到。另一只恐龙没有吃任何东西。", sentence: "\"两只恐龙没有吃虫子。\"", item: "dinosaurs"}, twowith: {story: "这个故事中有两只恐龙，虫子和鱼。两只恐龙很饿，并且在找食物。每一只恐龙都吃了鱼因为鱼很容易抓到。恐龙之后看到了虫子。一只恐龙还是很饿，所以他决定吃一只虫子。另一只恐龙吃了鱼后很饱，所以他没有吃任何其他东西。", sentence: "\"两只恐龙吃了鱼，但是两只恐龙没有吃虫子。\"", item: "dinosaurs"}, fourwithout: {story: "这个故事中有四只恐龙，虫子和鱼。四只恐龙很饿，并且在找食物。恐龙看到了一些鱼在河里，但是他们觉得鱼太难抓到。两只恐龙决定吃虫子代替，因为虫子容易抓到。另外两只恐龙没有吃任何东西。", sentence: "\"两只恐龙没有吃虫子。\"", item: "dinosaurs"}, fourwith: {story: "这个故事中有四只恐龙，虫子和鱼。四只恐龙很饿，并且在找食物。每一只恐龙都吃了鱼，因为鱼容易抓到。之后恐龙们看到一些虫子。两只恐龙还是很饿，所以他们决定吃虫子。另外两只恐龙吃了鱼后很饱，所以他们没有吃任何其他东西。", sentence: "\"四只恐龙吃了鱼，但是两只恐龙没有吃虫子。\"", item: "dinosaurs"}},
    ]),

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
        comments : $("#comments").val(),
        describe : $("#describe").val(),
        lived : $("#lived").val(),
        yearsLived : $("#yearsLived").val(),
        homeLanguage : $("#homeLanguage").val(),
        outsideLanguage : $("#outsideLanguage").val(),
        proficiency : $("#proficiency").val()
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
          // "condition" : exp.condition,
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
        alert("您已达到完成这项程序HIT允许的最多次数。请点击\"Return HIT\"以免影响您的通过率。You have already completed the maximum number of HITs allowed by this requester. Please click 'Return HIT' to avoid any impact on your approval rating.");
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
