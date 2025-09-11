function getDifficultyCardStyle(avgDiff) {

    if (!avgDiff) {
      return {
        backgroundColor: '#f3f4f6', 
        borderColor: '#e5e7eb',     
        textColor: '#374151', 
        accentColor: '#4b5563'
      }
    }
    
     if (avgDiff > 0 && avgDiff <= 3) {
      return {
        backgroundColor: '#dcfce7',
        borderColor: '#bbf7d0',
        textColor: '#15803d',
        accentColor: '#16a34a'
      };
    } else if (avgDiff > 3 && avgDiff <= 6) {
      return {
        backgroundColor: '#fef3c7',
        borderColor: '#fde68a',
        textColor: '#92400e',
        accentColor: '#d97706'
      };
    } else {
      return {
        backgroundColor: '#fee2e2',
        borderColor: '#fecaca',
        textColor: '#991b1b',
        accentColor: '#dc2626'
      };
    }
  }


  export default getDifficultyCardStyle;