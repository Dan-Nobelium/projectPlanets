/**
 * Adapted from jspsych-image-button-response
 * Original author: Josh de Leeuw
 *
 * plugin for displaying a stimulus and getting a mouseclick response (in the indexed order of displayed images)
 *
 * documentation: docs.jspsych.org
 *
 **/

jsPsych.plugins["planet-response"] = (function() {

  var plugin = {};

  jsPsych.pluginAPI.registerPreload('planet-response', 'stimulus', 'image');

  plugin.info = {
    name: 'planet-response',
    description: '',
    parameters: {
      stimulus: {
        type: jsPsych.plugins.parameterType.IMAGE,
          pretty_name: 'Stimulus',
		  array: true,
        default: undefined,
        description: 'The images to be displayed'
      },
      stimulus_alt: {
        type: jsPsych.plugins.parameterType.IMAGE,
          pretty_name: 'Stimulus on Mouse Down',
		  array: true,
        default: null,
        description: 'The images to be displayed when mouse is clicking on it'
      },
      stimulus_mouseover: {
        type: jsPsych.plugins.parameterType.IMAGE,
          pretty_name: 'Stimulus on Mouse Over',
		  array: true,
        default: null,
        description: 'The images to be displayed when mouse is hovering over on it'
      },
      stimulus_height: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Image height',
        default: null,
        description: 'Set the image height in pixels'
      },
      stimulus_width: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Image width',
        default: null,
        description: 'Set the image width in pixels'
      },
		points: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Points',
        default: 0,
        description: 'Points accumulated up to this point'
      },		
		show_total_points: {
        type: jsPsych.plugins.parameterType.BOOL,
        pretty_name: 'Total Points',
        default: true,
        description: 'Show points accumulated up to this point'
      },		
		ship_space: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Spacer between stimuli',
        default: 300,
        description: 'Set the space between stimuli in pixels'
      },

      maintain_aspect_ratio: {
        type: jsPsych.plugins.parameterType.BOOL,
        pretty_name: 'Maintain aspect ratio',
        default: true,
        description: 'Maintain the aspect ratio after setting width or height'
      },
      // choices: {
      //   type: jsPsych.plugins.parameterType.STRING,
      //   pretty_name: 'Choices',
      //   default: undefined,
      //   array: true,
      //   description: 'The labels for the buttons.'
      // },
      // button_html: {
      //   type: jsPsych.plugins.parameterType.STRING,
      //   pretty_name: 'Button HTML',
      //   default: '<button class="jspsych-btn">%choice%</button>',
      //   array: true,
      //   description: 'The html of the button. Can create own style.'
      // },
      prompt: {
          type: jsPsych.plugins.parameterType.STRING,
          pretty_name: 'Prompt',
          default: ['Planet A','Planet B'],
		  array: true,
          description: 'Any content here will be displayed under the option.'
      },
      // stimulus_duration: {
      //   type: jsPsych.plugins.parameterType.INT,
      //   pretty_name: 'Stimulus duration',
      //   default: null,
      //   description: 'How long to hide the stimulus.'
      // },
		trial_duration: {
			type: jsPsych.plugins.parameterType.INT,
			pretty_name: 'Trial duration',
			default: null,
			description: 'How long to show the trial.'
		},
		continuousResp: {
			type: jsPsych.plugins.parameterType.BOOL,
			pretty_name: 'Continuous trial/block structure',
			default: true,
			description: 'Does this trial/block have a continuous response structure?'

		},
		block_duration: {
			type: jsPsych.plugins.parameterType.INT,
			pretty_name: 'Block duration',
			array: true,
			default: 10*1000,
			description: 'Duration of continuous block'
		},
		reset_planet_wait: {
			type: jsPsych.plugins.parameterType.INT,
			pretty_name: 'Planet reset wait time',
			default: 2000,
			description: 'How long before reset of planet choice.'
		},		
		end_trial_wait: {
			type: jsPsych.plugins.parameterType.INT,
			pretty_name: 'End Trial Wait Time',
			default: 1000,
			description: 'How long before the trial ends after some final action.'
		},
      // margin_vertical: {
      //   type: jsPsych.plugins.parameterType.STRING,
      //   pretty_name: 'Margin vertical',
      //   default: '0px',
      //   description: 'The vertical margin of the button.'
      // },
      // margin_horizontal: {
      //   type: jsPsych.plugins.parameterType.STRING,
      //   pretty_name: 'Margin horizontal',
      //   default: '8px',
      //   description: 'The horizontal margin of the button.'
      // },
      // response_ends_trial: {
      //   type: jsPsych.plugins.parameterType.BOOL,
      //   pretty_name: 'Response ends trial',
      //   default: true,
      //   description: 'If true, then trial will end when user responds.'
      // },
		signal_time_range: {
			type: jsPsych.plugins.parameterType.INT,
			pretty_name: 'Signal duration range',
			array: true,
			default: [2000,2000],
			description: 'Range of duration of signal image above chosen planet, in ms.'
		},
		signal_height: {
			type: jsPsych.plugins.parameterType.INT,
			pretty_name: 'Signal height',
			default: 100,
			description: 'Height of signal image.'
		},
		signal_width: {
			type: jsPsych.plugins.parameterType.INT,
			pretty_name: 'Signal duration',
			default: 80,
			description: 'Width of signal image.'
		},
		probability_win: {
			type: jsPsych.plugins.parameterType.FLOAT,
			pretty_name: 'Probability of winning',
			default: [.5,0.5],
			array:  true,
			description: 'Probability of winning for each planet'
		},
		rewards: {
			type: jsPsych.plugins.parameterType.INT,
			pretty_name: 'Rewards',
			default: [100,100],
			array: true,
			description: 'Rewards for each planet'
		},
		show_ship: {
			type: jsPsych.plugins.parameterType.BOOL,
			pretty_name: 'Show ships',
			default: false,			
			description: 'Show ships after planet signal response.'
		},
		ship_stimulus: {
			type: jsPsych.plugins.parameterType.IMAGE,
			pretty_name: 'Ship stimuli',			
			default: null,
			array: true,
			description: 'Images for ships--one for each planet.'
		},
		ship_height: {
			type: jsPsych.plugins.parameterType.INT,
			pretty_name: 'Ship height',			
			default: 200,
			description: 'Height of ship.'
		},
		ship_width: {
			type: jsPsych.plugins.parameterType.INT,
			pretty_name: 'Ship width',			
			default: 300,
			description: 'Width of ship.'
		},
		show_ship_delay: {
			type: jsPsych.plugins.parameterType.INT,
			pretty_name: 'Show ship delay',			
			default: 0,//1000,
			description: 'Duration between presentation of planet reward and appearance of ship.'
		},
		ship_attack_time: {
			type: jsPsych.plugins.parameterType.INT,
			pretty_name: 'Ship Time to Attack',			
			default: 4000,
			description: 'Duration between ship appearance and attack.'
		},
		ship_attack_damage: {
			type: jsPsych.plugins.parameterType.FLOAT,
			pretty_name: 'Ship A damage',			
			default: .2,
			description: 'Proportion of total points that an undefended encounter with Ship A removes.'
		},
		// ship_timeout: {
		// 	type: jsPsych.plugins.parameterType.INT,
		// 	pretty_name: 'Ship Timeout ',			
		// 	default: 8000,
		// 	description: 'Duration between ship appearance and end of trial.'
		// },
		shield_charging_time: {
			type: jsPsych.plugins.parameterType.INT,
			pretty_name: 'Shield charging duration',			
			default: 2000, //2000
			description: 'Duration of shield charging prompt.'
		},
		probability_shield: {
			type: jsPsych.plugins.parameterType.FLOAT,
			pretty_name: 'Probability of shield',
			default: .5,
			description: 'Probability of shield availability after charging.'
		},
		cursor: {
			type: jsPsych.plugins.parameterType.IMAGE,
			pretty_name: 'Cursor images',
			array: true,
			default: ['img/cursor.png','img/cursordark.png'],
			description: '1st Element: default cursor; 2nd Element: mousedown cursor'
    	},
    }
  }
	
	plugin.trial = function(display_element, trial) {
		var html = ''
		html += '<div id="planets">'
		var display_wrapper = document.getElementsByClassName('jspsych-content-wrapper')[0]
		//Some custom styles		
		display_element.style.cursor = "url('" + trial.cursor[0] + "'),pointer"
		display_wrapper.style.backgroundColor = "black"
		display_element.style.color = "green"
		if (Array.isArray(trial.stimulus)){
			for (var i = 0; i < trial.stimulus.length; i ++){
				// Set up space for score, signal, and planet
				html += '<div id="planet-div-' + i + '" style="display:inline-block;"> ';
				html += '<div class="clickid" id="planet-score-box-' + i +
					'"></div> ';
				//Write img tag
				html += '<img class="clickid" src="'+trial.stimulus[i] + '" ' + 
					'id="planet-' + i + '" ' +
					'moi="' + trial.stimulus_mouseover[i] + '" ' + //mouseover img
					'dei="' + trial.stimulus[i] + '" ' + //default img
					'allowclick="1" ' +  //allow clicks?
					'style="' ;
				html += 'z-index: 20;';
				html += 'position: relative;';
				html += 'display: block;';
				if(trial.stimulus_height !== null){
					html += 'height:'+trial.stimulus_height+'px; '
					if(trial.stimulus_width == null && trial.maintain_aspect_ratio){
						html += 'width: auto; ';
					}
				}
				if(trial.stimulus_width !== null){
					html += 'width:'+trial.stimulus_width+'px; '
					if(trial.stimulus_height == null && trial.maintain_aspect_ratio){
						html += 'height: auto; ';
					}
				}
				html += '"' //End the style property quote
				html += 'data-choice="'+i + '" '
				//Make images undraggable
				html += 'draggable="false" ';
				html +='></img>';
				
				//show planet names below the planet
				if (trial.prompt !== null) {
					html += '<div class="clickid" id="planet-prompt-' + i + '" style="font-size:25px">'
					html += trial.prompt[i];
					html += '</div>'
				}
				//Add signal box
				html += '<div class="clickid" id="planet-signal-box-' + i + '" style="display:block; height:100px; width:100px"></div> ';
				//Add select ring divs
				html += '<img id="planet-select-' + i + '" style="position:absolute;"> ';
				//End planet div
				html +='</div>';

				
				//Add ship div in between planets
				if (i+1 < trial.stimulus.length){
					html += '<div id="ship-div" style="display:inline-block; ' +
						'vertical-align: top; ' +
						'visibility:visible; ' + 
						'width:' + trial.ship_space + 'px;">' +
						'<div class="clickid" id="total-score-box" style="height:50px;"></div>' + 
						//'<div id="ship-score-box" style="height:50px;"></div>' +
						'<div id="ship-img-box"></div>' +
						'<div id="ship-shield-box" style="height:200px;"></div>' + 
						'</div>'
				}
			}
		}

		html += '</div>'
		
		//If total score is to be displayed, update div
		function updateScore(points){
			if (trial.show_total_points){
				scoreDiv = display_element.querySelector('#total-score-box')
				//scoreDiv.style.color = 'green'
				scoreDiv.style.fontSize = '30px'
				scoreDiv.innerHTML = 'Total points: ' + points
			}
		}
		//Update status with some message and in some colour
		function updateStatus(choice,msg,color){
			if(choice=='ship'){
				var statusDiv = display_element.querySelector('#ship-status-text')
			} else {
				var statusDiv = display_element.querySelector('#planet-score-box-'+choice)
			}
			statusDiv.innerHTML = msg
			statusDiv.style.color = color
		}
		
		display_element.innerHTML = html;
		
		updateScore(trial.points)

		//Initialise middle divs
		display_element.querySelector('#ship-img-box').innerHTML = '<div id="ship-img-div" ' + 
			'style="position:relative; top:0px; border: 0px; ' +
			'height: ' + trial.ship_height  + 'px ;' +
			'width: ' + trial.ship_width + 'px;" ' +
			'draggable="false" ' +				
			'> ' +
			'</div>' + 
			'<div class="ship" id="ship-attack-text" style="height:80px;width:300px;line-height:80px"></div>'+
			'<div class="ship" id="ship-status-text" style="height:10px;width:300px;"></div>';

		
		
		// start timing
		var start_time = performance.now();

		// store response
		var response = {
			planets: {click_idx:[],select:[],time_select:[],outcome:[],time_outcome:[]},
			ships: {type:[],time_appear:[],shield_available:[],shield_activated:[],rt_shield_activated:[],outcome:[],time_outcome:[]},
			all_outcomes: {outcome:[],time_outcome:[],total: []},
			//rt_planet: [],			
			//option: [],
			//shield_activated: null,			
			//Define mouseclick vars
			clicks: {
				idx: [],
				timestamp: [],
				loc: [],
				element:[],
			}			
		};

		var clickcnt = 0
		// These functions to log mouseclicks throughout the experiment
		document.addEventListener('mousedown', getPositions)
		document.addEventListener('mouseup', resetCursor)
		// Function to record all mouseclicks
		function getPositions(ev) {
			if (ev == null) {
				ev = window.event
			}
			_mouseX = ev.clientX;
			_mouseY = ev.clientY;
			console.log("X: " + _mouseX + " Y: " + _mouseY)
			log_click([_mouseX,_mouseY])
		}

		function log_click(cursor_loc){
			//Save mouse coords into data structure, along time and with time
			response.clicks.idx.push(clickcnt)
			response.clicks.timestamp.push(performance.now()-start_time)
			response.clicks.loc.push(cursor_loc)
			clickcnt ++
			console.log(response.clicks)
			display_element.style.cursor = "url('" + trial.cursor[1] + "'),pointer" //"url('cursordark.png'),pointer"
		}		

		function resetCursor(){
			display_element.style.cursor = "url('" + trial.cursor[0] + "'),pointer"
		}

		// Go through each choice and implement conditional mouseclick events, also mouseover, and select ring
		for (var i = 0; i < trial.stimulus.length; i++) {
			var element = display_element.querySelector('#planet-' + i)
			var conditionStr = 'element.getAttribute("allowclick")=="1"'//'response.option==null'
			var styleDef = ['opacity:1;'];
			var styleChange = ['opacity:.5;'];
			var result = after_response;
			var clickOnMouseDown = true; //activate click immediately on mousedown			
			cond_click(element,result,conditionStr,styleDef,styleChange,clickOnMouseDown)			
			//Handle mouseover
			//have to make mouseover imgs global
			stimulus_mouseover = trial.stimulus_mouseover
			
			element.addEventListener('mouseover', planet_mOver);
			element.addEventListener('mouseout', planet_mOut);

			//Also fix width of scorebox
			var planetRect = element.getBoundingClientRect()
			var elementbx = display_element.querySelector('#planet-score-box-' + i)
			elementbx.style.display = 'block';
			elementbx.style.fontSize = '25px';
			elementbx.style.height = '50px';
			elementbx.style.padding = '20px 0px';
			elementbx.style.width = planetRect.width+'px';

			//Implement selectring positioning
			var planetRect = element.getBoundingClientRect() //fetch this a second time because the planet-score-box can mess with coordinates
			var selectring = display_element.querySelector('#planet-select-' + i)
			selectring.src = 'img/selectring.png';
			selectring.style.visibility = 'hidden';
			selectring.style.top = planetRect.top + 'px';
			selectring.style.left = planetRect.left + 'px';
			selectring.style.width = planetRect.width + 'px';
			selectring.style.height = planetRect.height + 'px';
			selectring.style.zIndex = '0';

			
		}

		// Implement planet mouseover and mouseout effects
		function planet_mOver(e){
			var ct = e.currentTarget
			var choice = ct.getAttribute('data-choice')
			//ct.src = ct.getAttribute('moi')
			var cSelect = document.getElementById('planet-select-'+choice) //current selectring
			cSelect.style.visibility = 'visible'
			//Highlight planet names
			var cp = document.getElementById('planet-prompt-'+choice) //current prompt
			var currtext = cp.innerHTML
			cp.innerHTML = '<font color="#05BF00">' + currtext + '</font>' //dis brite gre3n
		}
		function planet_mOut(e){
			var ct = e.currentTarget
			var choice = ct.getAttribute('data-choice')
			//ct.src = ct.getAttribute('dei')
			var cSelect = document.getElementById('planet-select-'+choice) //current selectring
			cSelect.style.visibility = 'hidden'
			//Reset planet name format
			var cp = document.getElementById('planet-prompt-'+choice) //current prompt
			cp.innerHTML = cp.innerHTML.replace(/<font.*">/,'')
			cp.innerHTML = cp.innerHTML.replace('</font>','')				
		}
		
		// General function to add conditional mouseclicks to an element
		function cond_click(element,result,conditionStr,styleDef,styleChanges,clickOnMouseDown){
			// Also do one for mousedown events
			element.addEventListener('mousedown', function(e){
				var condition = eval(conditionStr)
				if (condition){
					var ct = e.currentTarget
					replaceStyle(element,styleChanges)
				}
			});
			element.addEventListener('mouseleave', function(e){
				var condition = true//eval(conditionStr)
				if (condition){
					var ct = e.currentTarget
					replaceStyle(element,styleDef)
				}
			});
			element.addEventListener('mouseup', function(e){
				var condition = true
				if (condition){
					var ct = e.currentTarget
					replaceStyle(element,styleDef)
				}
			});
			if (clickOnMouseDown){
				var eventStr = 'mousedown';
			} else {
				var eventStr = 'click';
			}
			element.addEventListener(eventStr, function(e){
				var condition = eval(conditionStr) //eval is necessary for the condition to be checked only when event is triggered
				if (condition){
					var ct = e.currentTarget;
					result(ct);
				}
			});
		}

		//function to handle find and replace in style attribute
		function replaceStyle(element,styleChange){
			for (var i = 0; i<styleChange.length; i++){
				//Make pattern, extract style name and value
				var newPatt = new RegExp('(.*?):(.*?);')
				var styleFull = styleChange[i]
				var styleMatch = styleFull.match(newPatt)
				var styleName = styleMatch[1]
				var styleValue = styleMatch[2]
				var findPatt = new RegExp(';\\s*'+styleName + '\\s*:.*?;')
				var findPattStart = new RegExp('^' + styleName + '\\s*:.*?;')
				//Get current style
				var currStyle = element.getAttribute('style')
				//Add to style changes, check if at the start first
				if (currStyle.search(findPattStart) > 0 ){
					var newStyle = currStyle.replace(findPattStart,styleFull)
				} else if (currStyle.search(findPatt) > 0 ){
					var newStyle = currStyle.replace(findPatt,'; ' + styleFull);
				} else {
					var newStyle = currStyle + styleFull
				}
				element.setAttribute('style',newStyle);
			}			

		}

		// function to handle a valid planet-choice by the subject
		function after_response(element) {
			//Lock clicking
			element.setAttribute('allowclick',0)
			var choice = element.getAttribute('data-choice')
			// measure rt
			var end_time = performance.now();
			var rt = end_time - start_time;
			var click_idx = response.clicks.idx.slice(-1)[0] //idx of this click is the last element in clicks
			//Since response.clicks.idx is updated only after this script though, add 1 to the number
			if(click_idx==null){
				click_idx = 0
			} else {
				click_idx++
			}
			// Log response details
			response.planets.select.push(choice);
			response.planets.time_select.push(rt);
			response.planets.click_idx.push(click_idx)
			
			// after a valid response, the stimulus will have the CSS class 'responded'
			// which can be used to provide visual feedback that a response was recorded
			//display_element.querySelector('#planets').className += ' responded';

			//Show the signal, wait some time, then end the trial
			//console.log(signal_time)
			proceed_gamble(choice);
			
		};
		

		// function to show the signal, run gamble, show outcome
		function proceed_gamble(choice){
			//Get planet position
			var signalPadding = 10
			var planet = display_element.querySelector('#planet-' + choice)
			var planetWidth = planet.getBoundingClientRect().width
			var planetX = planet.getBoundingClientRect().x		  
			var signalLeft = planetWidth/2 - (trial.signal_width + signalPadding*2)/2
			//Display signal image and status
			document.querySelector('#planet-signal-box-'+choice).innerHTML = '<img src="img/signal1.png" ' +
				'id="planet-signal-img-' + choice + '" ' + 
				'style="display:block; position: relative;' +
				'height: ' + (trial.signal_width-10) + 'px; ' + 
				'width: ' + trial.signal_width + 'px; ' + 
				'left:' + signalLeft + 'px;' +
				'padding: ' + signalPadding + 'px;' +
				'visibility: visible;' + 
				'">'

			// Generate the duration the signal will be presented
			var signal_time_diff = Math.abs(trial.signal_time_range[1] - trial.signal_time_range[0])
			var signal_time = Math.random()*signal_time_diff + trial.signal_time_range[0]

			//Implement trade attempt message
			var signal_step_time = 250;
			var signal_int_id = setInterval(sigframe,signal_step_time);
			var signal_dot_count_max = 3;
			var signal_dot_count = Math.ceil(Math.random() * signal_dot_count_max);
			var signal_attempt_str = 'Attempting trade'
			var signalmsg = signal_attempt_str + colordots(signal_dot_count_max,0,'black',signalclr)// '.'.
			var signalclr = '#b4ba38' //some shade of yellow
			var signal_max_time = signal_time+performance.now()
			//Also vars for signal img
			var signal_img_count_max = 4;
			var signal_img_count = Math.ceil(Math.random() * signal_img_count_max);
			var signalImg = display_element.querySelector('#planet-signal-img-' + choice)
			signalImg.src = 'img/signal' + signal_img_count + '.png'

			updateStatus(choice,signalmsg,signalclr )
			function sigframe() {
				var curr_time = performance.now()
				if (curr_time > signal_max_time) {
					clearInterval(signal_int_id);
				} else {
					var dots = colordots(signal_dot_count_max,signal_dot_count,'black',signalclr)// '.'.repeat(signal_dot_count)
					signal_dot_count ++					
					if (signal_dot_count>  signal_dot_count_max){
						signal_dot_count = 0
					}
					signalmsg = signal_attempt_str + dots
					updateStatus(choice,signalmsg,signalclr )
					//Update signal img
					signal_img_count ++					
					if (signal_img_count>  signal_img_count_max){
						signal_img_count = 1
					}
					var signalImg = display_element.querySelector('#planet-signal-img-' + choice)
					signalImg.src = 'img/signal' + signal_img_count + '.png'
				}
			}
			//This is an example of spending a little too much effort into a trivial detail...
			function colordots(totalct,colorct,baseclr,fontclr){
				outStr = ''
				for (var i=0; i<totalct; i++){
					if (i<colorct){
						var color = fontclr
					} else {
						var color = baseclr
					}
					outStr += '<font color="'+ color + ' ">.</font>'
				}
				return outStr
			}

			
			//Disable selection of images
			for (var i = 0; i < trial.stimulus.length; i++) {
				display_element.querySelector('#planet-' + i).addEventListener('click', function(e){
				});
			}
			
			// Run gamble
			gamble_success = Math.random() < trial.probability_win[choice] //Might want to set this as variable?
			if (gamble_success){
				//Add and display reward
				var displayScore = trial.rewards[choice]
				scoreColor = 'green'
				var statusmsg = 'Success! <br> <b>+' + displayScore + ' points </b>'
				var statusclr = '#05BF00' //some shade of green				
				
			} else {
				//Display some fail state
				var displayScore = 0;
				scoreColor = 'yellow'
				var statusmsg = 'Trade attempt failed'
				var statusclr = 'yellow' 
			}
			
			//trial.points += displayScore //response.profitloss.slice(-1)[0] //add last profit/loss to cumulative total
			//Update running total
			//response.all_outcomes.total.push(trial.points)

			//Check time and disable planets if final_action was flagged previously
			checkTimeExceed()

			// Wait before showing outcome
			setTimeout(function(){
				//Compute total points
				trial.points += displayScore //response.profitloss.slice(-1)[0] //add last profit/loss to cumulative total
				//Hide signal image
				document.querySelector('#planet-signal-img-'+choice).style.visibility = 'hidden'
				updateScore(trial.points)
				updateStatus(choice,statusmsg,statusclr)
				
				//Proceed to next step (ship or end trial)				
				if (trial.show_ship){
					setTimeout(function(){
						if (!shipVisible){
							show_ship(choice);
						}
					},trial.show_ship_delay);
							   
				}
				// Log response details
				var time_outcome = performance.now()-start_time
				response.planets.outcome.push(displayScore)
				response.planets.time_outcome.push(time_outcome)
				// Also update a single list of outcomes for easier tracking of each change in score
				response.all_outcomes.outcome.push(displayScore)
				response.all_outcomes.time_outcome.push(time_outcome)
				// Finally, update running total
				response.all_outcomes.total.push(trial.points)

				//response.profitloss.push(displayScore)
				//response.time_profitloss.push(performance.now()-start_time)

				//reset planets after short delay
				setTimeout(function(){
					reset_planet(planet,choice)
				}, trial.reset_planet_wait)								
			}, signal_time)		  
			
		}

		// //Function to check if ship is visible
		// function shipVisible(){
		// 	var shipImg = display_element.querySelector('#ship-img')
		// 	var ship_visible = false
		// 	console.log(shipImg)
		// 	if(shipImg != null) {
		// 		ship_visible = shipImg.style.visibility == 'visible'
		// 	}
		// 	return(ship_visible)
		//}
		//Check if block time is up, else reset planet choice
		function reset_planet(planet,choice){
			//Reset some display elements
			if(!final_action){
				planet.setAttribute('allowclick',1)
			}
			updateStatus(choice,'','')
			if(!trial.show_ship || final_action){
				if (check_end()){
					end_trial()
				}
			}
		}
		var shipVisible = false
		var final_action = false // flag this as true when time is more than block_duration
		var shield_activated = null
		// function to check if time exceeded, and if so, disable choices
		function checkTimeExceed(){
			var checkTime = (performance.now() - start_time) >= trial.block_duration
			if (checkTime){
				final_action = true				
			}
			if(final_action){				
				for(var i=0; i<trial.stimulus.length; i++){
					var planetEl = display_element.querySelector('#planet-' + i)
					planetEl.setAttribute('allowclick',0)
					planetEl.removeEventListener('mouseover',planet_mOver)
					//planetEl.removeEventListener('mouseout',planet_mOut)
				}
			}

		}
		// function to check all end_trial conditions
		function check_end(){
			//Check that time is up			
			var checkTime = (performance.now() - start_time) >= trial.block_duration			
			//Check that no planet statuses are active
			var check_count = 0
			var checkStr = []
			for (var i=0; i<trial.stimulus.length; i++){
				var el = display_element.querySelector('#planet-score-box-' + i)
				if(el.innerHTML != ''){
					checkStr.push('Planet ' + i + ' ' + el.innerHTML)
					check_count++
				}
			}			
			if (check_count>0){
				var checkPlanet = false
				//console.log(checkStr)
			} else {
				var checkPlanet = true
			}
			
			var checkShip = true
			if (trial.show_ship){
				checkShip = false
				if(!shipVisible){
					checkShip = true
				}
			}
			console.log('ct ' + checkTime + ' cp ' + checkPlanet + ' cs ' + checkShip + ' fa ' + final_action)

			//Flag final action for next check
			checkTimeExceed()
			return (checkTime && checkPlanet && checkShip)
		}

		// function to show ship
		function show_ship(choice) {
			//Put stuff into the ship divs
			var shipDiv = display_element.querySelector('#ship-img-div');
			shipDiv.style.visibility = 'visible';
			shipDiv.innerHTML = '<img src="' + trial.ship_stimulus[choice] +  '" ' +
				'id="ship-img" ' +
				'class="ship"' + 
				'height="' + trial.ship_height +'" ' +
				'width="' + trial.ship_width +'" ' +
				'style="position:relative; top:0px; border: 0px; visibility:visible;z-index:11;" ' + 
				'draggable="false" ' +				
				'> '
			shipVisible = true
			var shipImg = display_element.querySelector('#ship-img');
			logIDonMouseDown(shipImg)

			var shipStatTxt = display_element.querySelector('#ship-status-text');
			shipStatTxt.style.fontSize = '25px'
			shipStatTxt.style.color = 'red'
			shipStatTxt.style.visibility = 'visible'
			logIDonMouseDown(shipStatTxt)
			
			var shipAtTxt = display_element.querySelector('#ship-attack-text');
			shipAtTxt.style.fontSize = '25px'
			shipAtTxt.style.color = 'red'
			shipAtTxt.style.visibility = 'visible'
			var attack_int_id = setInterval(attframe,1000)
			var attack_countdown = trial.ship_attack_time/1000
			shipAtTxt.innerHTML = 'Encounter imminent ' + attack_countdown + ' s' //Show first frame
			function attframe() {
				if (attack_countdown <= 0) {
					clearInterval(attack_int_id);
				} else {
					attack_countdown --
					shipAtTxt.innerHTML = 'Encounter imminent ' + attack_countdown + ' s'
				}
			}
			logIDonMouseDown(shipAtTxt)
			
			var shieldBoxDiv = display_element.querySelector('#ship-shield-box');
			shieldBoxDiv.innerHTML = '<div class="ship" id="ship-shield-text"></div>' +
				'<div class="ship" id="ship-shield-button"></div>' +
				'<div class="ship" id="ship-shield-charger"></div>';
			//Style the text div
			var shieldTxtDiv = display_element.querySelector('#ship-shield-text');
			shieldTxtDiv.innerHTML = 'CHARGING SHIELD';
			shieldTxtDiv.style.fontSize = "25px";
			shieldTxtDiv.style.color = 'green';
			shieldTxtDiv.style.position = 'relative';
			shieldTxtDiv.style.top = '100px';
			logIDonMouseDown(shieldTxtDiv)

			//Style the button
			var shieldButton = display_element.querySelector('#ship-shield-button');
			//shieldButton.style.borderRadius = "10px"
			shieldButton.style.border = "2px solid green"
			shieldButton.draggable = false
			shieldButton.style.position = 'relative';
			shieldButton.style.top = '100px';			
			shieldButton.style.fontSize = "40px";
			shieldButton.style.height = '50px';
			shieldButton.style.lineHeight = '50px';
			shieldButton.style.zIndex = '10';
			//shieldButton.style.verticalAlign = 'middle';
			logIDonMouseDown(shieldButton)

			//Style the charger div
			var shieldChgDiv = display_element.querySelector('#ship-shield-charger');
			shieldChgDiv.style.color = 'green';
			shieldChgDiv.style.backgroundColor = 'green';
			//shieldChgDiv.style.borderRadius = "10px"
			shieldChgDiv.style.border = "2px solid green"
			shieldChgDiv.draggable = false
			//Get button location and move chgdiv there
			var buttonrect = shieldButton.getBoundingClientRect()			
			shieldChgDiv.style.position = 'absolute';
			shieldChgDiv.style.top = buttonrect.top + 1 + 'px';
			shieldChgDiv.style.left = buttonrect.left + 1 + 'px';
			shieldChgDiv.style.height = buttonrect.height - 5 + 'px';
			shieldChgDiv.style.width = 0 //buttonrect.width - 5 + 'px';
			shieldChgDiv.style.opacity = .5
			shieldButton.style.zIndex = '1';
			

			//Set shield charging timer and animation
			setTimeout(function(){
				proceed_shield();
			},trial.shield_charging_time)

			var int_steps = 5; //ms
			var charge_int_id = setInterval(chargeframe, int_steps);
			var chgwidth = 0
			var charge_nsteps = trial.shield_charging_time / int_steps
			var charge_stepwidth = buttonrect.width / charge_nsteps
			function chargeframe() {
				if (shieldChgDiv.getBoundingClientRect().width > buttonrect.width) {
					clearInterval(charge_int_id);
				} else {
					chgwidth += charge_stepwidth
					//console.log('frame')
					shieldChgDiv.style.width = chgwidth + 'px'
					/* code to change the element style */
				}
			}

			//Start timer for ship to attack and timeout
			setTimeout(function(){
				ship_attack(choice)
			},trial.ship_attack_time)

			//log ship appear details
			response.ships.type.push(choice)
			response.ships.time_appear.push(performance.now() - start_time)
		}
		
		// function to update state of shield
		var shield_start_time = null
		function proceed_shield(){
			var shieldTxtDiv = display_element.querySelector('#ship-shield-text');
			var shieldButton = display_element.querySelector('#ship-shield-button');
			// Run shield gamble
			shield_success = Math.random() < trial.probability_shield
			// Log shield state
			response.ships.shield_available.push(shield_success)
			//Update display
			if (shield_success){
				shieldTxtDiv.innerHTML = 'SHIELD AVAILABLE'
				shieldButton.innerHTML = 'ACTIVATE!'
				var shieldButton = display_element.querySelector('#ship-shield-button')
				var conditionStr = 'shield_activated==null'
				var styleDef = ['background-color: ;','color: green;'];
				var styleChange = ['background-color: green;','color: black;'];
				var result = activate_shields;
				var clickOnMouseDown = false;
				cond_click(shieldButton,result,conditionStr,styleDef,styleChange,clickOnMouseDown)
				shield_start_time = performance.now();
			} else {
				shieldTxtDiv.innerHTML = 'SHIELD UNAVAILABLE'
				shieldButton.innerHTML = 'NO SHIELD'
				shieldButton.style.opacity = '.5'
			}
		}

		function activate_shields(){
			//Log data
			var end_time = performance.now();
			var rt = end_time - shield_start_time;
			shield_activated = true;
			response.ships.rt_shield_activated.push(rt); //logging of activation state will be performed at time of ship attack

			//Modify Shieldbutton text
			shieldButton = display_element.querySelector('#ship-shield-button')
			shieldButton.innerHTML = 'ACTIVE'
			shieldButton.style.color = '#1eff19'
			shieldButton.style.backgroundColor = '#196d17'
		}
		// function for ship to attack
		function ship_attack(choice){
			//Disable button if no response
			if (shield_activated==null){
				shield_activated = false
				response.ships.rt_shield_activated.push(null); 
			}

			//Log shield response
			response.ships.shield_activated.push(shield_activated)
			
			var pointslost = 0//Math.round(trial.points * trial.ship_attack_damage)
			if (choice==1 || trial.ship_attack_damage==0){
					var statusmsg = 'Ship passed by without incident'
					var statusclr = '#b4ba38' //some shade of green								
			} else if (choice==0 && ! shield_activated){
				// 20% of points
				pointslost = Math.round(trial.points * trial.ship_attack_damage)
				trial.points -= pointslost
				
				//Update score
				updateScore(trial.points)

				//Update status
				var statusmsg = 'Ship attacked: <br><b>-' + pointslost + ' points</b>'
				var statusclr = 'red' //some shade of red
			} else if (shield_activated) {
				var statusmsg = 'Shield successfully deflected attack'
				var statusclr = '#05BF00'
			}
			updateStatus('ship',statusmsg,statusclr)

			//log details
			var time_outcome = performance.now()-start_time
			response.ships.outcome.push(-pointslost)			
			response.ships.time_outcome.push(time_outcome)
			// Also update a single list of outcomes for easier tracking of each change in score
			response.all_outcomes.outcome.push(-pointslost)
			response.all_outcomes.time_outcome.push(time_outcome)
			// Finally, update total
			response.all_outcomes.total.push(trial.points)
			
			//Visually disable button
			var shieldDiv = display_element.querySelector('#ship-shield-text')
			//shieldDiv.style.opacity = .5
			var shieldButton = display_element.querySelector('#ship-shield-button')
			if (!shield_activated){
				shieldButton.style.opacity = .5
				shieldButton.style.backgroundColor = ''
				shieldButton.style.color = 'green'				
			}

			//Reset ship
			setTimeout(function(){				
				reset_ship()
			},1000)
			//End trial
			//end_trial()
		}

		//Function to reset ship div
		function reset_ship(){
			//Hide ship div
			var shipEls = display_element.getElementsByClassName('ship')
			for (var i = 0; i < shipEls.length; i++){
				shipEls[i].style.visibility = 'hidden'
			}
			shipVisible = false
			//Clear ship status text
			var shipStatTxt = display_element.querySelector('#ship-status-text');
			shipStatTxt.innerHTML = ''
			//Reset shield
			var shieldButton = display_element.querySelector('#ship-shield-button')
			shieldButton.style.opacity = 1.
			shieldButton.style.backgroundColor = ''
			shieldButton.style.color = 'green'				
			shieldButton.innerHTML = ''
			shield_activated = null
			
			//Check if can end block
			if (check_end()){
				end_trial()
			} 

		}
		
		//After everything has loaded, loop through all elements and add an eventlistener to fetch id on mousedown
		var allDOM = display_element.getElementsByClassName("clickid");
		for (var i=0, max=allDOM.length; i < max; i++) {
			element = allDOM[i]
			logIDonMouseDown(element)
		}
		// Add function to log id on mousedown
		function logIDonMouseDown(element){
			element.addEventListener('mousedown', function(e){
				console.log(e.currentTarget.id)
				//Only log element if not hidden
				if(e.currentTarget.style.visibility=='hidden'){
					response.clicks.element[clickcnt] = undefined
				} else {
					response.clicks.element[clickcnt] = e.currentTarget.id
				}
				//clicks.element.push(e.currentTarget.id)
			});			
		}
		//Timer to end trial after block_duration
		function timer_end(){
			setTimeout(function(){
				//Check if can end block
				if (check_end()){
					end_trial()
				} 
			},trial.block_duration)
		}
		timer_end()
		
		// function to end trial when it is time		
		function end_trial() {
			setTimeout(function(){
				// kill any remaining setTimeout handlers
				jsPsych.pluginAPI.clearAllTimeouts();

				//Remove tracking and logging of mouseclicks
				document.removeEventListener('mousedown', getPositions)
				document.removeEventListener('mouseup',resetCursor)
				//Reset styles				
				display_element.style.cursor = 'default'
				display_wrapper.style.backgroundColor = '#FFFFFF'
				display_element.style.color = "black"
				//Get viewport size
				var win = window,
					doc = document,
					docElem = doc.documentElement,
					body = doc.getElementsByTagName('body')[0],
					vpWidth = win.innerWidth || docElem.clientWidth || body.clientWidth,
					vpHeight = win.innerHeight|| docElem.clientHeight|| body.clientHeight;
				//Get location of main div
				var dpRect = display_element.getBoundingClientRect(),
					dpx = dpRect.left,
					dpy = dpRect.top
				
				// gather the data to store for the trial
				var trial_data = {
					"stimulus": trial.stimulus,
					"planets": response.planets,
					"ships": response.ships,
					"all_outcomes": response.all_outcomes,
					"all_clicks": response.clicks,
					//"planet_selected": response.option,
					//"rt_planet": response.rt_planet,
					//"shield_activated": shield_activated,
					//"rt_shield": response.rt_shield,					
					//"points_gained": response.profitloss,
					"points_total": trial.points,
					"block_type": trial.data.block_type,
					"block_number": trial.data.block_number,
					"trial_number": trial.data.trial_number,
					"viewport_size": [vpWidth,vpHeight],
					"display_loc": [dpx,dpy]
				};
				
				// clear the display
				display_element.innerHTML = '';
				
				// move on to the next trial
				console.log(trial_data)
				jsPsych.finishTrial(trial_data);
			}, trial.end_trial_wait)
		};
		
		
		
		// // hide image if timing is set
		// if (trial.stimulus_duration !== null) {
		// 	jsPsych.pluginAPI.setTimeout(function() {
		// 		display_element.querySelector('#jspsych-image-mouseclick-response-stimulus').style.visibility = 'hidden';
		// 	}, trial.stimulus_duration);
		// }
		
		// end trial if time limit is set
		if (trial.trial_duration !== null) {
			jsPsych.pluginAPI.setTimeout(function() {
				end_trial();
			}, trial.trial_duration);
		}
		
	};
	
	return plugin;
})();
