async function loadQuestionnaire(fileName) {
    console.log(`Attempting to load questionnaire from ${fileName}`);
    try {
        const response = await fetch(fileName);
        const data = await response.json();
        console.log(`Loaded data for ${fileName}:`, data);
        return data;
    } catch (error) {
        console.error(`Error loading ${fileName}:`, error);
        return null; // or handle the error as needed
    }
}

function createQuestionBlock(questionnaireData) {
    const questions = questionnaireData.items.map((item, index) => {
        return {
            prompt: item,
            name: `item${index + 1}`,
            labels: questionnaireData.labels,
            required: true
        };
    });

    return {
        type: 'survey-likert',
        preamble: questionnaireData.prompt,
        questions: questions,
        scale_width: 500, // or any other width you need
        post_trial_gap: 1000, // or any other gap you need
        data: {
            phase: questionnaireData.title.toLowerCase().replace(/\s+/g, '_') // for example 'dass_21'
        }
    };
}
console.log("psychometrics.js loaded");

export { loadQuestionnaire, createQuestionBlock };
