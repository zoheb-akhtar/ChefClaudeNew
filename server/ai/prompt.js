function aiPrompt(ingredients, dietaryRestrictions) {
    return `You are a professional chef assistant.
    Based on the following user-inputted ingredients:
    ${ingredients}
    and the following dietary restrictions or none if there is none:
    ${dietaryRestrictions}
    Always assume the cook has the following ingredients: Salt, Pepper, Olive Oil, Butter, Basic Spices, Sugar (if applicable)
    Don't have salt and pepper in the ingredients array but assume they have it.
    Don't have too many instructions in one step, break them up well. Don't pack too much into one step

    Generate 3 unique and diverse recipes. You should have one of each difficulty. For each recipe, include:
    - Title
    - List of ingredients in an array, give amounts for each ingredient. The format should for the ingredients should be
        ingredients: an array of objects with two fields only:
        ingredient: a string (name of the ingredient)
        amount: a string (quantity and unit)
    - An array of very detailed instructions but just the instructions, don't include the number in the text
    - Estimated cook time (in minutes) 
    - Difficulty score from 1 (very easy) to 10 (very hard)
    - Difficulty label (Easy / Medium / Hard, based on score: 1–3 Easy, 4–6 Medium, 7–10 Hard)
    - Short description (1–2 sentences about the dish)
    - Estimated calories per serving (have the key be estimatedCaloriesPerServing)
    - Number of servings

    Do not use any ingredients that aren't in the user inputted ingredients or in the assumed ingredients;
    Format the response as clean JSON, with all the keys in camel case.
    `
}

module.exports = aiPrompt;
