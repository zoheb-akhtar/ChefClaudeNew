function getFavoriteDifficulty(avgDiff) {
    if (!avgDiff) {
      return "None"
    }
    if (avgDiff > 0 && avgDiff <= 3) {
      return "Easy"
    } else if (avgDiff > 3  && avgDiff <= 6) {
      return "Medium"
    } else {
      return "Hard"
    }
  }

export default getFavoriteDifficulty;