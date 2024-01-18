// instructions.js
//right now this is not doing anything, still needs to be integrated into index.ht

// Consent Text
export const consent_text = [
    '<p>Before you begin, please read the information sheet carefully (you can download the pdf <a href="https://jessicaleephd.files.wordpress.com/2020/07/pis_sona_3385.pdf" target="_blank">here</a>)</p>',
    '<br>',
    '<p align="center"><b>PARTICIPANT CONSENT</b></p>',
    '<center><img src="./img/PIS_1.jpg"></center>',
    '<center><img src="./img/PIS_2.jpg"></center>',
    '<center><img src="./img/consent.jpg"></center>',
    'By continuing, you are making a decision whether or not to participate. <br>  Clicking the button below indicates that, having read the information provided on the participant information sheet, you consent to the above.',
    '<br></p>'
];

// Demographic Text
export const demo_text = [
    '<p> Gender: ',
    '<input type="radio" name="gender" value="male" required/> Male &nbsp; ',
    '<input type="radio" name="gender" value="female" required/> Female &nbsp;',
    '<input type="radio" name="gender" value="other" required/> Other<br>', '<br>',
    '<p> Age: <input name="age" type="text" required/> </p>', '<br>',
    '<p> Native language: <input name="language" type="text" required/> </p>', '<br>'
];

// MTurk Insert (conditional)
export function getMTurkInsert(sample) {
    if (sample === "MTurk") {
        return [
            '<p>If anything goes wrong during the experiment, please take a screenshot and notify the requester. Do <b>not</b> press the BACK button or quit out of the program. This will make it hard for you to get paid.</p>',
            '<p>If you complete the task, you will get your payment no matter what. Please take your time and think about your predictions and judgements seriously. </p>'
        ];
    } else {
        return '';
    }
}

// Training Instructions
export const ins = {
    pretrain1: [
        '<p>WELCOME TO THE EXPERIMENT! </p>',
        '<p>Throughout the experiment, please read all instructions <b>carefully</b> and click on the buttons to go forward or back. You may need to scroll down on some pages. </p>',
        getMTurkInsert(sample), // Call this function with the appropriate sample value
        '<p>Please <b>do not</b> hit refresh or the back button on your browser as you can only do the experiment ONCE.</p>',
        '<p>Please complete the experiment in ONE sitting in FULL SCREEN mode.</p>'
    ],
    pretrain2: [
        '<p>In this experiment you will be playing a game over 6 blocks. </p>',
        '<p>In this game, you are an intergalactic trader in space. You will be situated between two planets that you can trade with. You can send a signal to each planet by clicking on them. Sometimes locals on these planets will receive the signal and be willing to trade. Each successful trade will give you points. </p>',
        '<p>Your goal is to have as many points as possible. </p>'
    ],
    pretrain3: [
        '<p>You can click on each of the planets as many times as you like. Just remember, the aim is to get as many points as possible! </p>',
        '<p>There are multiple blocks in this experiment. Between each block we will ask you some questions about each of the game elements. </p>',
        '<p>There are monetary prizes for participants that have high scores and accurate answers, so do your best! </p>'
    ],
};

// Export other instruction-related variables as needed...
