// instructions.js

const consent_text = [
    '<p>Before you begin, please read the information sheet carefully (you can download the pdf <a href="https://jessicaleephd.files.wordpress.com/2020/07/pis_sona_3385.pdf" target="_blank">here</a>)</p>' +
    '' +
    '<p align="center"><b>PARTICIPANT CONSENT</b></p>' +
    '<center><img src="./img/PIS_1.jpg"></center>' +
    '<center><img src="./img/PIS_2.jpg"></center>' +
    '<center><img src="./img/consent.jpg"></center>' +
    'By continuing, you are making a decision whether or not to participate.   Clicking the button below indicates that, having read the information provided on the participant information sheet, you consent to the above.' +    '</p>'  ];

  const demo_text = [
    '<p> Gender: ' +
    '<input type="radio" name="gender" value="male" required/> Male &nbsp; ' +
    '<input type="radio" name="gender" value="female" required/> Female &nbsp;' +
    '<input type="radio" name="gender" value="other" required/> Other' + '' +
    '<p> Age: <input name="age" type="text" required/> </p>' + '' +    '<p> Native language: <input name="language" type="text" required/> </p>' + ''
  ];

  if (sample === "MTurk") {
    var MTurk_insert = [
      '<p>If anything goes wrong during the experiment, please take a screenshot and notify the requester. Do <b>not</b> press the BACK button or quit out of the program. This will make it hard for you to get paid.</p>' +
      '<p>If you complete the task, you will get your payment no matter what. Please take your time and think about your predictions and judgements seriously. </p>'
    ]
  } else {
    var MTurk_insert = '';
  }

  var ins = {};

  ins.pretrain1 = [
    '<p>WELCOME TO THE EXPERIMENT! </p>' +
    '<p>Throughout the experiment, please read all instructions <b>carefully</b> and click on the buttons to go forward or back. You may need to scroll down on some pages. </p>' +
    MTurk_insert +
    '<p>Please <b>do not</b> hit refresh or the back button on your browser as you can only do the experiment ONCE.</p>' +
    '<p>Please complete the experiment in ONE sitting in FULL SCREEN mode.</p>'
  ];

  ins.pretrain2 = [
    '<p>In this experiment you will be playing a game over 6 blocks. </p>' +
    '<p>In this game, you are an intergalactic trader in space. You will be situated between two planets that you can trade with. You can send a signal to each planet by clicking on them. Sometimes locals on these planets will receive the signal and be willing to trade. Each successful trade will give you points. </p>' +
    '<p>Your goal is to have as many points as possible. </p>'
    // '<p><b>Note:</b> Whatever you earn in-game will be converted into real money for you at the end of the experiment. The more you earn in-game, the more you make in real life. You can earn more points by trading with both planets. </p>'
  ];

  ins.pretrain3 = [
    '<p>You can click on each of the planets as many times as you like. Just remember, the aim is to get as many points as possible! </p>' +
    '<p>There are multiple blocks in this experiment. Between each block we will ask you some questions about each of the game elements. </p>' +
    '<p>There are monetary prizes for participants that have high scores and accurate answers, so do your best! </p>'
  ];

  // Add other arrays and constants inside the `instructions` object

  export const instructions = {
    consent_text,
    demo_text,
    MTurk_insert,
    pretrain1,
    pretrain2,
    pretrain3,
    // Other arrays and constants should go here
  };