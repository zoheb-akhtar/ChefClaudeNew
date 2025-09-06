function showCurrentStep(recipe, currentStep) {
    let currentStepShown;
    let ingredientsString = "";
    recipe.ingredients.forEach((ing, index) => {
      if (index === recipe.ingredients.length - 1) {
        ingredientsString += ing.ingredient
      } else {
        ingredientsString += `${ing.ingredient}, `
      }
      
    })

    if (currentStep === -1) {
      currentStepShown = "Ready to bring this recipe to life? Tap below to start cooking."
    } else if (currentStep === 0) {
      currentStepShown = `
      Gather Your Ingredients: 
      ${ingredientsString}
    `
    } else {
      currentStepShown = recipe.instructions[currentStep - 1]
    }
    

    return currentStepShown;
  }

  export default showCurrentStep;