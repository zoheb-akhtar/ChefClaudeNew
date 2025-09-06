function difficultyColor(difficultyLabel) {
let difficultyColor;
  if (difficultyLabel === "Easy") {
    difficultyColor = "green";
  } else if (difficultyLabel === "Medium") {
    difficultyColor = "#ED7014";
  } else if (difficultyLabel === "Hard") {
    difficultyColor = "red";
  } else {
    difficultyColor = "black"
  }

  const difficultyStyles = {
    color: difficultyColor
  }

  return difficultyStyles;
}

export default difficultyColor;