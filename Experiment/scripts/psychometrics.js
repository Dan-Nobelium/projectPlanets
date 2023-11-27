async function loadQuestionnaire(fileName) {
    const response = await fetch(`psychometrics/${fileName}`);
    const data = await response.json();
    return data;
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

export { loadQuestionnaire, createQuestionBlock };
