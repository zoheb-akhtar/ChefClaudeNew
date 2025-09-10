function difficultyColor(difficultyLabel) {
let difficultyColor;
  if (difficultyLabel.toLowerCase() === "easy") {
    difficultyColor = "#22c55e";
  } else if (difficultyLabel.toLowerCase() === "medium") {
    difficultyColor = "#f59e0b";
  } else if (difficultyLabel.toLowerCase() === "hard") {
    difficultyColor = "#ef4444";
  } else {
    difficultyColor = "black"
  }

  const difficultyStyles = {
    color: difficultyColor
  }

  return difficultyStyles;
}

export default difficultyColor;