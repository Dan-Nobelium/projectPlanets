# Planets Task

Planets Task is a JavaScript-based application for conducting studies related to decision-making and probability. In this task, participants interact with a simulated environment where they can click on planets to receive probabilistic rewards and encounter various events like pirate attacks.

## Installation

This project does not require any specific package manager for installation. Simply clone the repository from the code repo and include the JavaScript files in your project as needed.

## Usage

Here's how you can use the Planets Task in your project:

```javascript
// Include the planet-response.js or planet-responseELife.js in your HTML file
// Configure the parameters as per your study's requirement

// Example configuration:
var config = {
    stimulus: ['img/planet1.png', 'img/planet2.png'], // array of planet image files
    stimulus_height: 200, // height of planet images
    stimulus_width: 200, // width of planet images
    // ... other parameters
};
```

## Parameters

Parameters for the planet-response plugin:

 - `stimulus` - Image files for the planets. Img file array. Default: `undefined`
 - `stimulus_height` - Height of image file (in px). Integer. Default: `null`
 - `stimulus_width` - Width of image file (in px). Integer. Default: `null`
 - `maintain-aspect-ratio` - Maintain aspect ratio of image. Boolean. Default: `true`
 - `stimulus_select` - Stimulus selection image on mouseover. Img file. Default: `undefined`
 - `prompt` - Text labels for each choice. String array. Default: `['Planet A','Planet B']`
 - `show_total_points` - Toggle presentation of total points on the top of the screen. Boolean. Default: `true`
 - `ship_space` - Space between stimuli (and consequently the width of ship div) in px. Integer. Default: `300`
 - `block_duration` - Duration of each continuous block in ms. Integer. Default: `240*1000`
 - `feedback_duration` - Duration of trade(planet) and ship feedback. Integer. Default: `3000`
 - `end_trial_wait` - How long before the block ends after some final action, in ms. Integer. Default: `1000`
 - `signal_time` - Duration of trade signal before reward delivery in ms. Integer. Default: `2000`
 - `signal_height` - Height of signal image in px. Integer. Default: `100`
 - `signal_width` - Width of signal image in px. Integer. Default: `80`
 - `signal_padding` - Blank space (padding) around signal image. Integer. Default: `10`
 - `probability_trade` - Probability of successful trade for each planet. Integer array. Default: `[.5, .5]`
 - `rewards` - Rewards for each successful trade for each planet in points. Integer array. Default: `[100, 100]`
 - `show_ship` - Toggle ship appearance on this block. Boolean. Default: `false`
 - `show_ship_delay` - Duration between trade attempt mouseclick and appearance of ship in ms. Integer. Default: `2000`
 - `probability_ship` - Probability of ship appearing after trade attempt on respective planet. Float array. Default: `[.2, .2]`
 - `ship_stimulus` - Image files for each ship. Img file array. Default: `null`
 - `ship_height` - Height of ship image in px. Integer. Default: `200`
 - `ship_width` - Width of ship image in px. Integer. Default: `300`
 - `ship_attack_time` - Time between ship appearance and ship encounter (attack or passing by) in ms. Integer. Default: `400`
 - `ship_attack_damage` - Proportion of total points an undefended ship attack removes. Float. Default: `.2`
 - `ship_hostile_idx` - Specifies index of hostile ship, can be 0 (ship I) or 1 (ship II). Integer. Default: `0`
 - `shield_charging_time` - Time it takes for shield to charge in ms. Integer. Default: `2000`
 - `probability_shield` - Probability of shield availability after charging. Float. Default: `.5`
 - `shield_prevent_trading` - Toggle prevention of trading when shield is active. Boolean. Default: `true`
 - `shield_cost_toggle` - Toggle shield activation cost. Boolean. Default: `true`
 - `shield_cost_amount` - Shield activation cost in points. Integer. Default: 50
 - `cursor` - Cursor image files, [default cursor, mousedown cursor]. Img file array. Default: `['img/cursor.png','img/cursordark.png']`

Contributing

Contributions to the Planets Task project are welcome. If you have suggestions or improvements, please open an issue first to discuss what you would like to change. Ensure any pull requests update the necessary documentation and adhere to the existing code structure.
Authors

    Jessica C. Lee
    Shi Xian Liew

License

This projects license is indeterminite, please open an issue to learn more.