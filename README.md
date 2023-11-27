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

### Implemented Parameters (explicitly set and utilized):
- `stimulus`: Array[String]. Default: undefined. Paths to image files for the planets.
- `stimulus_select`: String. Default: undefined. Path to the image used for stimulus selection on mouseover.
- `prompt`: Array[String]. Default: ['Planet A', 'Planet B']. Text labels for each choice.
- `block_duration`: Integer (ms). Default: 240*1000. Duration of each continuous block.
- `feedback_duration`: Integer (ms). Default: 3000. Duration of feedback for trade and ship.
- `probability_trade`: Array[Integer]. Default: [0.5, 0.5]. Probability of successful trade for each planet.
- `show_ship`: Boolean. Default: false. Toggle for ship appearance in each block.
- `show_ship_delay`: Integer (ms). Default: 2000. Delay between trade attempt and ship appearance.
- `probability_ship`: Array[Float]. Default: [0.2, 0.2]. Probability of ship appearing after trade attempts.
- `ship_stimulus`: Array[String]. Default: null. Image files for each ship.

### Implicit Parameters (Not explicitly set, may be used implicitly or with default values):
- `stimulus_height`: Integer (px). Default: null. Height of the planet image.
- `stimulus_width`: Integer (px). Default: null. Width of the planet image.
- `maintain-aspect-ratio`: Boolean. Default: true. Whether to maintain the aspect ratio of the image.
- `show_total_points`: Boolean. Default: true. Toggle to show total points on the screen.
- `ship_space`: Integer (px). Default: 300. Space between stimuli and the width of the ship div.
- `end_trial_wait`: Integer (ms). Default: 1000. Duration before the block ends after the final action.
- `signal_time`: Integer (ms). Default: 2000. Duration of the trade signal before reward delivery.
- `signal_height`: Integer (px). Default: 100. Height of the signal image.
- `signal_width`: Integer (px). Default: 80. Width of the signal image.
- `signal_padding`: Integer (px). Default: 10. Padding around the signal image.
- `rewards`: Array[Integer]. Default: [100, 100]. Points rewarded for each successful trade.
- `ship_height`: Integer (px). Default: 200. Height of the ship image.
- `ship_width`: Integer (px). Default: 300. Width of the ship image.
- `ship_attack_time`: Integer (ms). Default: 400. Time between ship appearance and encounter.
- `ship_attack_damage`: Float. Default: 0.2. Points lost in an undefended ship attack.
- `ship_hostile_idx`: Integer. Default: 0. Index of the hostile ship (0 or 1).
- `shield_charging_time`: Integer (ms). Default: 2000. Time required for the shield to charge.
- `probability_shield`: Float. Default: 0.5. Probability of shield availability after charging.
- `shield_prevent_trading`: Boolean. Default: true. Prevents trading when the shield is active.
- `shield_cost_toggle`: Boolean. Default: true. Toggles the activation cost for the shield.
- `shield_cost_amount`: Integer. Default: 50. Cost in points to activate the shield.
- `cursor`: Array[String]. Default: ['img/cursor.png','img/cursordark.png']. Paths to cursor images for default and mousedown states.


### Contribution

Contributions to the Planets Task project are welcome. If you have suggestions or improvements, please open an issue first to discuss what you would like to change. Ensure any pull requests update the necessary documentation and adhere to the existing code structure.
Authors

    Jessica C. Lee
    Shi Xian Liew

### License

This projects license is indeterminite, please open an issue to learn more.