const OpenAI = require("openai");
const aiPrompt = require("../ai/prompt.js");
const { v4: uuidv4 } = require('uuid');
require("dotenv").config();

const client = new OpenAI({
    apiKey: process.env.OPEN_AI_API_KEY
});

const generateRecipe = async (req, res) => {
    try {
        const { ingredients, dietaryRestrictions } = req.body;
        if (!ingredients) {
            res.status(400).json({error: "No ingredients were found"});
            return;
        }

        const prompt = aiPrompt(ingredients, dietaryRestrictions);
        const completion = await client.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [{
                role: 'user',
                content: prompt
            }],
            max_tokens: 2000,
            temperature: 0.7
        })



        const responseText = completion.choices[0].message.content;
        const cleaned = responseText.replace(/```json|```/g, '').trim();
        const parsed = JSON.parse(cleaned);
        const recipes = parsed.recipes;
        const recipesFinal = recipes.map((recipe) => {
            return {
                ...recipe,
                id: uuidv4()
            }
 
        })
        res.status(200).json({response: recipesFinal});


    } catch (error) {
        res.status(500).json({error: "Failed to generate recipes"})
    }

}

module.exports = generateRecipe;


