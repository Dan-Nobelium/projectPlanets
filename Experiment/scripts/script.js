
console.log("Script started");

// Import functions from psychometrics.js
import { loadQuestionnaire, createQuestionBlock } from './psychometrics.js';
import { getConsentText, getDemoText, getPretrainTexts, getInstructionCheck, getPhase2Instructions, getContingencyInstructions, getDebriefText } from './instructions.js';


/* Experiment Parameters */

// Group and Sample Selection
var groups = ["0", "1.5", "3"];
var group = "" + jsPsych.randomization.sampleWithReplacement(groups, 1) + "";
var samples = ["MTurk", "SONA", "SONA-online"];
var sample = samples[2];
var completion_code = (Math.floor(Math.random() * 99999) * 397).toString();

// Randomization
var pun_planet_sides = [0, 1]; // Position of punished planet: 0 = left (planet A), 1 = right (planet B)
var pun_planet_side = "" + jsPsych.randomization.sampleWithReplacement(pun_planet_sides, 1) + "";
var stim_list = jsPsych.randomization.repeat(['img/bluep.png', 'img/orangep.png'], 1);
var ship_list = jsPsych.randomization.repeat(['img/ship1.png', 'img/ship2.png'], 1);

// Contingency Instructions
var pun_planet = stim_list[pun_planet_side].substr(4).slice(0, -5);
var unpun_planet = stim_list[1 - pun_planet_side].substr(4).slice(0, -5);
var pun_ship = ship_list[pun_planet_side].substr(8).slice(0, -4);
var unpun_ship = ship_list[1 - pun_planet_side].substr(8).slice(0, -4);
var planet_layout = pun_planet_side === "0" ? ["left", "right"] : ["right", "left"]; // Punished, Unpunished

// Global Variables
var block_number = 0;
var trial_number = 0;
var points = 0;
var continuousResp = true;
var nBlocks_p1 = 1; // var nBlocks_p1 = 2; >> var nBlocks_p1 = 1; during testing
var nBlocks_p2 = 1; // var nBlocks_p2 = 4; >> var nBlocks_p2 = 1;
var block_duration = 1 * 1000; // 3 minutes in milliseconds // var block_duration = 180 * 1000; >> var block_duration = 1 * 1000;
var iti = 1000;
var inf_stim_height = 80;
var inf_slider_width = 500;
var main_stim_height = 250;
var feedback_duration = 2500;
var rf_ship_delay = group === "0" ? 0 : group === "1.5" ? 1500 : 3000; // Delay between outcome and ship

var nTrialspBlk = continuousResp ? 1 : 5; // Number of trials per block

// Image Preloading
var images = [
  'img/signal1.png', 'img/signal2.png', 'img/signal3.png', 'img/signal4.png',
  'img/ship1.png', 'img/ship2.png',
  'img/bluep.png', 'img/orangep.png',
  'img/cursor.png', 'img/cursordark.png', 'img/selectring.png',
  'img/win100.png', 'img/lose.png',
  'img/arrow.jpg', 'img/blank_lose.jpg', 'img/blank_arrow.jpg'
];

  //----------------------------------------------------------------------------
  /* inference and valence checks */

  // valence check
  var valence_q = 'How do you feel about each of these game elements: ' +
  '<br><br>';

  var val_img_p1 = [
    {
      stimulus: 'img/win100.png',
      text: "Winning $100"
    },
    {
      stimulus: stim_list[0],
      text: "Planet A (left)"
    },
    {
      stimulus: stim_list[1],
      text: "Planet B (right)"
    }
  ];

  var val_img_p2 = [
    {
      stimulus: 'img/win100.png',
      text: "Winning $100"
    },
    {
      stimulus: stim_list[0],
      text: "Planet A (left)"
    },
    {
      stimulus: stim_list[1],
      text: "Planet B (right)"
    },
    {
      stimulus: 'img/ship1.png',
      text: "Ship 1"
    },
    {
      stimulus: 'img/ship2.png',
      text: "Ship 2"
    },
    {
      stimulus: 'img/lose.png',
      text: "Losing $"
    }
  ];

  var valence_labels = [
    'Very <br>negative',
    'Slightly <br>negative',
    'Neutral',
    'Slightly <br>positive',
    'Very <br>positive'
  ];

  // inference check prompt
  var inference_prompt = [
    'Please answer the following questions with respect to <b>Planet A</b> (left planet):',
    'Please answer the following questions with respect to <b>Planet B</b> (right planet):',
    'Please answer the following questions with respect to <b>Ship 1</b>:',
    'Please answer the following questions with respect to <b>Ship 2</b>:',
  ];

  // contingency question
  var contingency_q = [
    'How OFTEN did interacting with <b>planet A</b> lead to the above outcome?',
    'How OFTEN did interacting with <b>planet B</b> lead to the above outcome?',
    'How OFTEN did interacting with <b>Ship 1</b> lead to the above outcome?',
    'How OFTEN did interacting with <b>Ship 2</b> lead to the above outcome?',
  ];

  // confidence question
  var confidence_q = [
    'How CONFIDENT are you about this estimate?'
  ];

  // phase 1, planet A
  var inf_img_p1_A = [
    {
      stimulus: 'img/win100.png',
      text: "Winning $100"
    }
  ];

  // phase 1, planet B
  var inf_img_p1_B = [
    {
      stimulus: 'img/win100.png',
      text: "Winning $100"
    }
  ];

  // phase 2, planet A
  var inf_img_p2_A = [
    {
      stimulus: 'img/win100.png',
      text: "Winning $100"
    },
    {
      stimulus: 'img/ship1.png',
      text: "Ship 1"
    },
    {
      stimulus: 'img/ship2.png',
      text: "Ship 2"
    },
    {
      stimulus: 'img/lose.png',
      text: "Losing $"
    }
  ];

  // phase 2, planet B
  var inf_img_p2_B = [
    {
      stimulus: 'img/win100.png',
      text: "Winning $100"
    },
    {
      stimulus: 'img/ship1.png',
      text: "Ship 1"
    },
    {
      stimulus: 'img/ship2.png',
      text: "Ship 2"
    },
    {
      stimulus: 'img/lose.png',
      text: "Losing $"
    }
  ];

  var contingency_labels = [
    '<p>' + 'Never' + '<br>(0%)</p>',
    '<p>' + 'Sometimes' + '</p>',
    '<p>' + 'Every time' + '<br>(100%)</p>'
  ];

  var confidence_labels = [
    '<p>' + 'Very <br>uncertain' + '</p>',
    '<p>' + 'Somewhat <br>uncertain' + '</p>',
    '<p>' + 'Somewhat <br>confident' + '</p>',
    '<p>' + 'Very <br>confident' + '</p>'
  ];

  // open-ended q
  var open_q = 'What is the best approach to trading in this game? Did your strategy change between blocks? Please provide as much detail as possible. ';

//----------------------------------------------------------------------------
  /* experiment blocks */

	// initialise timeline
  var introloop = [];
  var timeline = [];
  var block6loop = []

  // force full screen
timeline.push({
  type: 'fullscreen',
  fullscreen_mode: true
});

// info statement and consent
var consent_block = {
  type: 'html-button-response',
  stimulus: consent_text,
  choices: ['I consent to participate'],
  data: {
    phase: 'consent'
  }
};
//timeline.push(consent_block);

// demographics
var demographics_block = {
  type: 'survey-html-form',
  preamble: '<p><b>Please fill in your demographic details</b></p>',
  html: demo_text,
  data: {
    phase: 'demographics'
  }
};
//timeline.push(demographics_block);

  // define general instructions
  var gen_ins_block = {
    type: 'instructions',
    pages: [
      ins.pretrain1,
      ins.pretrain2,
      ins.pretrain3
      ],
    allow_keys: false,
    show_clickable_nav: true,
    post_trial_gap: iti,
    data: {
      phase: 'instructions'
    }
  };
  //introloop.push(gen_ins_block);

  // define instruction check block
  var instructioncorrect = false;
  var instruction_check = {
    type: "survey-multi-choice",
    preamble: ["<p align='center'><b>Check your knowledge before you begin!</b></p>"],
    questions: [
      {prompt: Q0_text, options: Q0_answers, required: true},
      {prompt: Q1_text, options: Q1_answers, required: true},
      {prompt: Q2_text, options: Q2_answers, required: true},
      {prompt: Q3_text, options: Q3_answers, required: true}
        ],
    on_finish: function(data) {
      if( data.responses == correctstring) {
        action = false;
        instructioncorrect = true;
      }
    }
  }
	//introloop.push(instruction_check);

  // define a page for the incorrect response
  var showsplash = true;
  var splash_screen = {
    type: 'html-button-response',
    choices: ['Click here to read the instructions again'],
    stimulus: '<center>Unfortunately, at least one of your answers was incorrect.</center>'
  }

  // push it to a conditional node that only shows it if the response was wrong
  var conditional_splash = {
    timeline: [splash_screen],
    conditional_function: function(data) {
          return !instructioncorrect // skip if correct
      }
  }
	//introloop.push(conditional_splash);

  // add all to loop node and push to timeline
  var loop_node = {
    timeline: introloop,
    loop_function: function(data) {
          //var action = true;
          return !instructioncorrect // stop looping if correct
      }
  }
	//timeline.push(loop_node);

  // success trial
  var successtrial = {
    type: 'html-button-response',
    post_trial_gap: 0,
    choices: ['Click here to start Phase 1'],
    stimulus: '<center>Well done!</center>'
  };
	//timeline.push(successtrial);

  //----------------------------------------------------------------------------
  // ----- Phase 1 -----

	
	// define task blocks with no ships
	var planet_noship = {
		type: 'planet-response',
		stimulus: stim_list,
		stimulus_select:'img/selectring.png',
		prompt: ['Planet A','Planet B'],
		ship_stimulus: ship_list,
		show_ship: false,
		ship_hostile_idx: pun_planet_side,
		block_duration: block_duration,
		reset_planet_wait: 1000,
		shield_charging_time: 3000,
		ship_attack_time: 6000,
		feedback_duration: feedback_duration,
		probability_trade:[[.5],[.5]],
		probability_ship:[[.2],[.2]],
		probability_shield:[[.25],[.25]],

		data: {
			phase: 'phase1',
			block_type: 'planet_noship',
			block_number: block_number,
			trial_number: trial_number
		},
		on_start: function(trial) {
			trial.data.points = points;
			trial.data.block_number = block_number;
			trial.data.trial_number = trial_number;
		},
		on_finish: function(data){
			points = data.points_total;
			trial_number = data.trial_number;
			trial_number++;

			// script for continuous response block
			if (continuousResp) {
				jsPsych.endCurrentTimeline();
				block_number = data.block_number;
				block_number++
				console.log('Block ' + block_number)
			} else {
				if (trial_number >= nTrialspBlk) {
					trial_number = 0
					block_number = data.block_number;
					block_number++
					console.log('Block ' + block_number)

				}
			}
		}
	}

	// loop over specified number of blocks
	for (var i=0; i<nBlocks_p1; i++) {
		var block_noship = {
			timeline: [planet_noship],
			repetitions: nTrialspBlk,
			data: {
				phase: 'phase1'
			}
		}
		//timeline.push(block_noship);

		// valence check p1
    var valence_p1 = {
      type: 'valence-check-3',
      prompt: valence_q,
      stimulus_1: val_img_p1[0].stimulus,
      stim_text_1: val_img_p1[0].text,
      stimulus_2: val_img_p1[1].stimulus,
      stim_text_2: val_img_p1[1].text,
      stimulus_3: val_img_p1[2].stimulus,
      stim_text_3: val_img_p1[2].text,
      labels: valence_labels,
      stimulus_height: inf_stim_height,
      slider_width: inf_slider_width,
      require_movement: false,
      data: {
        phase: 'val_check_1',
        block_number: i
      }
    };

    // inference check p1 (planet A)
    var infer_p1_A = {
      type: 'inference-check-1',
      main_stimulus: stim_list[0],
      main_stimulus_height: main_stim_height,
      prompt: inference_prompt[0],
      stimulus_1: inf_img_p1_A[0].stimulus,
      stim_text_1: inf_img_p1_A[0].text,
      slider_text_top: contingency_q[0],
      slider_text_bottom: confidence_q,
      labels_top: contingency_labels,
      labels_bottom: confidence_labels,
      stimulus_height: inf_stim_height,
      slider_width: inf_slider_width,
      require_movement: false,
      data: {
        phase: 'inf_check_1_A',
        block_number: i
      }
    };

    // inference check p1 (planet B)
    var infer_p1_B = {
      type: 'inference-check-1',
      main_stimulus: stim_list[1],
      main_stimulus_height: main_stim_height,
      prompt: inference_prompt[1],
      stimulus_1: inf_img_p1_B[0].stimulus,
      stim_text_1: inf_img_p1_B[0].text,
      slider_text_top: contingency_q[1],
      slider_text_bottom: confidence_q,
      labels_top: contingency_labels,
      labels_bottom: confidence_labels,
      stimulus_height: inf_stim_height,
      slider_width: inf_slider_width,
      require_movement: false,
      data: {
        phase: 'inf_check_1_B',
        block_number: i
      }
    };

timeline.push(valence_p1);
timeline.push(infer_p1_A);
timeline.push(infer_p1_B);
	}

	// ----- Phase 2 -----

	// define pre-phase 2 instructions
  var phase2_ins_block = {
    type: 'instructions',
    pages: [
      ins.phase2
      ],
    allow_keys: false,
    show_clickable_nav: true,
    post_trial_gap: iti,
    data: {
      phase: 'instructions'
    }
  };
timeline.push(phase2_ins_block);

	//Generate list of shield appearances
	// copy a planet with ship version from noship
	var planet_ship = Object.assign({},planet_noship); // note that nested objects might not be copied and simply referenced? Be careful when trying to edit nested objects. Will probably need to clone them separately.
	planet_ship.show_ship = true;
	planet_ship.data = Object.assign({},planet_noship.data)
	planet_ship.data.block_type = 'planet_ship';
	planet_ship.show_ship_delay = rf_ship_delay;
	planet_ship.data.phase = 'Phase2';
	// push specified number of blocks into timeline
	for (var i=0; i<nBlocks_p2; i++){

		if (i === nBlocks_p2-1) {
			
			// present correct contingencies
			var cont_instructions = {
				type: 'instructions',
				pages: [
					'<p>Local intel has determined where the pirates are coming from!<br>Click Next to view this intel.</p>',
					ins.instruct
				],
				allow_keys: false,
				show_clickable_nav: true,
				post_trial_gap: iti,
				data: {
					phase: 'instruct contingencies'
				}
			};
			block6loop.push(cont_instructions);

      // contingency knowledge quiz
      var contingenciescorrect = false;
      var contingencies_check = {
        type: "survey-multi-choice",
        preamble: [
          "<p align='center'><b>Check your knowledge before you continue.</b></p>" +
          '<img src=' + ship_list[0] + ' height="100">' +
          '<img src=' + ship_list[1] + ' height="100">'],
        questions: [
          {prompt: Q0_cont_text, options: Q0_cont_answers, required: true},
          {prompt: Q1_cont_text, options: Q1_cont_answers, required: true}
            ],
        on_finish: function(data) {
          if( data.responses == correctstring_cont) {
            action = false;
            contingenciescorrect = true;
          }
        },
        data: {
          phase: 'contingency quiz'
        }
      }
      block6loop.push(contingencies_check);

      // define a page for the incorrect response
      var showsplash = true;
      var block6splash_screen = {
        type: 'html-button-response',
        choices: ['Click here to read the intel again'],
        stimulus: '<center>Unfortunately, at least one of your answers was incorrect.</center>'
      }

      // push it to a conditional node that only shows it if the response was wrong
      var block6conditional_splash = {
        timeline: [block6splash_screen],
        conditional_function: function(data) {
              return !contingenciescorrect // skip if correct
          }
      }
      block6loop.push(block6conditional_splash);

      // add all to loop node and push to timeline
      var block6loop_node = {
        timeline: block6loop,
        loop_function: function(data) {
              return !contingenciescorrect // stop looping if correct
          }
      }
//			timeline.push(block6loop_node);
    }

		var block_ship = {
			timeline: [planet_ship],
			repetitions: nTrialspBlk
		}
		timeline.push(block_ship);

    // value check p2
    var valence_p2 = {
      type: 'valence-check-6',
      prompt: valence_q,
      stimulus_1: val_img_p2[0].stimulus,
      stim_text_1: val_img_p2[0].text,
      stimulus_2: val_img_p2[1].stimulus,
      stim_text_2: val_img_p2[1].text,
      stimulus_3: val_img_p2[2].stimulus,
      stim_text_3: val_img_p2[2].text,
      stimulus_4: val_img_p2[3].stimulus,
      stim_text_4: val_img_p2[3].text,
      stimulus_5: val_img_p2[4].stimulus,
      stim_text_5: val_img_p2[4].text,
      stimulus_6: val_img_p2[5].stimulus,
      stim_text_6: val_img_p2[5].text,
      labels: valence_labels,
      stimulus_height: inf_stim_height,
      slider_width: inf_slider_width,
      require_movement: false,
      data: {
        phase: 'val_check_2',
        block_number: i + nBlocks_p1
      }
    };

    // inference check p2 (planet A)
    var infer_p2_A = {
      type: 'inference-check-4',
      main_stimulus: stim_list[0],
      main_stimulus_height: main_stim_height,
      prompt: inference_prompt[0],
      stimulus_1: inf_img_p2_A[0].stimulus,
      stimulus_2: inf_img_p2_A[1].stimulus,
      stimulus_3: inf_img_p2_A[2].stimulus,
      stimulus_4: inf_img_p2_A[3].stimulus,
      stim_text_1: inf_img_p2_A[0].text,
      stim_text_2: inf_img_p2_A[1].text,
      stim_text_3: inf_img_p2_A[2].text,
      stim_text_4: inf_img_p2_A[3].text,
      slider_text_top: contingency_q[0],
      slider_text_bottom: confidence_q,
      labels_top: contingency_labels,
      labels_bottom: confidence_labels,
      stimulus_height: inf_stim_height,
      slider_width: inf_slider_width,
      require_movement: false,
      data: {
        phase: 'inf_check_2_A',
        block_number: i + nBlocks_p1
      }
    };

    // inference check p2 (planet B)
    var infer_p2_B = {
      type: 'inference-check-4',
      main_stimulus: stim_list[1],
      main_stimulus_height: main_stim_height,
      prompt: inference_prompt[1],
      stimulus_1: inf_img_p2_B[0].stimulus,
      stimulus_2: inf_img_p2_B[1].stimulus,
      stimulus_3: inf_img_p2_B[2].stimulus,
      stimulus_4: inf_img_p2_B[3].stimulus,
      stim_text_1: inf_img_p2_B[0].text,
      stim_text_2: inf_img_p2_B[1].text,
      stim_text_3: inf_img_p2_B[2].text,
      stim_text_4: inf_img_p2_B[3].text,
      slider_text_top: contingency_q[1],
      slider_text_bottom: confidence_q,
      labels_top: contingency_labels,
      labels_bottom: confidence_labels,
      stimulus_height: inf_stim_height,
      slider_width: inf_slider_width,
      require_movement: false,
      data: {
        phase: 'inf_check_2_B',
        block_number: i + nBlocks_p1
      }
    };

    // inference check p2 (ship 1)
    var infer_p2_ship1 = {
      type: 'inference-check-1',
      main_stimulus: 'img/ship1.png',
      main_stimulus_height: main_stim_height,
      prompt: inference_prompt[2],
      stimulus_1: 'img/lose.png',
      stim_text_1: 'Losing $',
      slider_text_top: contingency_q[2],
      slider_text_bottom: confidence_q,
      labels_top: contingency_labels,
      labels_bottom: confidence_labels,
      stimulus_height: inf_stim_height,
      slider_width: inf_slider_width,
      require_movement: false,
      data: {
        phase: 'inf_check_2_ship1',
        block_number: i + nBlocks_p1
      }
    };

    // inference check p2 (ship 2)
    var infer_p2_ship2 = {
      type: 'inference-check-1',
      main_stimulus: 'img/ship2.png',
      main_stimulus_height: main_stim_height,
      prompt: inference_prompt[3],
      stimulus_1: 'img/lose.png',
      stim_text_1: 'Losing $',
      slider_text_top: contingency_q[3],
      slider_text_bottom: confidence_q,
      labels_top: contingency_labels,
      labels_bottom: confidence_labels,
      stimulus_height: inf_stim_height,
      slider_width: inf_slider_width,
      require_movement: false,
      data: {
        phase: 'inf_check_2_ship2',
        block_number: i + nBlocks_p1
      }
    };

		/*timeline.push(valence_p2);
		timeline.push(infer_p2_A);
		timeline.push(infer_p2_B);
		timeline.push(infer_p2_ship1);
		timeline.push(infer_p2_ship2);*/
	}

  // ----- HREAP-C stuff -----

  // debrief
  var debrief_block = {
    type: 'instructions',
    pages: [
      ins.debrief
      ],
    button_label_next: "I acknowledge that I have received this debriefing information",
    show_clickable_nav: true,
    post_trial_gap: iti,
    data: {
      phase: 'debrief'
    }
  };
  timeline.push(debrief_block);

  var contact_block = {
    type: 'survey-text',
    questions: [
      {
        prompt: 'If you would like to receive a copy of the study results via email, please provide your email address below. Your email address will be used for this purpose only, and will not be stored alongside your data.',
        rows: 2,
        columns: 80
      }
    ],
    preamble: '<font size="-1">You may leave this blank if you wish. </font>',
    data: {
      phase: 'contact'
    }
  };
  timeline.push(contact_block);

  //----------------------------------------------------------------------------
	// start experiment

//  jatos.onLoad(function() {

    // subject info
    var finish_url_base = ''//jatos.studyJsonInput.finish_url_base;
    var sona_id = ''//jatos.urlQueryParameters.id;
    if (sona_id === undefined) {
        sona_id = null;
    }
    var completion_url = null;
    if (sona_id) {
        // if sona ID, form the URL for auto-crediting
        completion_url = finish_url_base + sona_id;
    }
    else {
        completion_url = "https://unsw-psy.sona-systems.com";
    }

    if (sample === "MTurk") {
      var finish_msg = 'All done!<br><br>Your completion code is <span id="completion_code" style="font-weight:bold;font-size:130%">' + completion_code + '</span>. To receive payment for the HIT, return to the Amazon Mechanical Turk page and enter this code. Please contact us if something goes wrong and we\'ll fix it as quickly as possible.';
    } else if (sample === "SONA") {
      var finish_msg = 'All done! Please let the experimenter know.';
    } else if (sample === "SONA-online") {
      var finish_msg = 'All done! Your Sona ID is ' + sona_id + '. If anything goes wrong, please email us with this ID number. Please click <a href="' + completion_url + '">here</a> to be returned to Sona and receive your credit.';
    }

    // add properties to each trial in the jsPsych data
    jsPsych.data.addProperties({
        sona_id: sona_id, // completion_code: completion_code,
        group: group,
        sample: sample,
        pun_planet_side: pun_planet_side,
        pun_planet: stim_list[pun_planet_side],
        pun_ship: ship_list[pun_planet_side],
        nBlocks_p1: nBlocks_p1,
        nBlocks_p2: nBlocks_p2
    });

    

    console.log("Pre load");

// Load and create questionnaire blocks dynamically
async function setupQuestionnaires(callback) {
  const questionnaires = ['dass'];
  for (let q of questionnaires) {
      const data = await loadQuestionnaire(`psychometrics/${q}_survey.json`);
      const block = createQuestionBlock(data);
      timeline.push(block);
  }
  if (callback && typeof callback === 'function') {
      callback();
  }
}

// Call setupQuestionnaires and then initialize the experiment
setupQuestionnaires(() => {
  // Now add the debrief block to the timeline
  timeline.push(debrief_block);

  // Initialize jsPsych
  jsPsych.init({
      timeline: timeline,
      preload_images: images,
      on_finish: function() {
          // Extract and submit result data
          var result = jsPsych.data.get().json();		  
/*        jatos.submitResultData(result, function() {
          document.write('<div id="endscreen" class="endscreen" style="width:1000px"><div class="endscreen" style="text-align:center; border:0px solid; padding:10px; font-size:120%; width:800px; float:right"><p><br><br><br>' +
          finish_msg +
          '</p></div></div>')
        });*/
        console.log("post setup started");
      }

  });
});