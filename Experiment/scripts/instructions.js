// instructions.js
// This script handles loading and accessing instructional texts from a JSON file.

// Function to load instructional texts from the JSON file.
async function loadInstructions() {
    // Fetch the JSON file containing the instructional texts.
    const response = await fetch('../instruction_text.json');
    // Parse the JSON file.
    const data = await response.json();
    return data;
  }
  
  // Exported function to get the 'consent_text'.
  export async function getConsentText() {
    const instructions = await loadInstructions();
    return instructions.consent_text;
  }
  
  // Function to get 'demo_text'.
  export async function getDemoText() {
    const instructions = await loadInstructions();
    return instructions.demo_text;
  }
  
  // Function to get 'MTurk_insert'.
  export async function getMTurkInsert(sample) {
    const instructions = await loadInstructions();
    return sample === "MTurk" ? instructions.MTurk_insert : '';
  }
  
  // Function to get 'pretrain' texts.
  export async function getPretrainTexts() {
    const instructions = await loadInstructions();
    return [instructions.pretrain1, instructions.pretrain2, instructions.pretrain3];
  }
  
  // Function to get instruction check questions and answers.
  export async function getInstructionCheck() {
    const instructions = await loadInstructions();
    return {
      Q0_text: instructions.Q0_text,
      Q0_answers: instructions.Q0_answers,
      Q1_text: instructions.Q1_text,
      Q1_answers: instructions.Q1_answers,
      Q2_text: instructions.Q2_text,
      Q2_answers: instructions.Q2_answers,
      Q3_text: instructions.Q3_text,
      Q3_answers: instructions.Q3_answers,
      correctstring: instructions.correctstring
    };
  }
  
  // Function to get 'phase2' instructions.
  export async function getPhase2Instructions() {
    const instructions = await loadInstructions();
    return instructions.phase2;
  }
  
  // Function to get 'instruct' for contingencies.
  export async function getContingencyInstructions() {
    const instructions = await loadInstructions();
    return instructions.instruct;
  }
  
  // Function to get 'debrief' text.
  export async function getDebriefText() {
    const instructions = await loadInstructions();
    return instructions.debrief;
  }
  
  // Note: Each of these functions returns a promise, so they should be used with await in async functions.
  