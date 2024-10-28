// YogaPose class definition
class YogaPose {
    constructor(ui_name, value, sequence) {
      this.ui_name = ui_name; // Display name for the UI
      this.value = value; // Internal value representing the pose
      this.sequence = sequence; // The sequence order for this pose in Sun Salutation
    }
  }
  
  // SunSalutationFactory that returns an array of YogaPose objects in the Sun Salutation sequence
  const SunSalutationFactory = () => {
    const poseSequence = [
      'tadasana (montaña)',
      'uttanasana (pinza)',
      'ashwa sanchalanasana (corredor)',
      'phalakasana (plancha)',
      'chaturanga (chaturanga)',
      'bhujangasana (perro hacia arriba)',
      'adho mukha svanasana (perro hacia abajo)',
      'ashwa sanchalanasana (corredor)',
      'uttanasana (pinza)',
      'tadasana (montaña)'
    ];
  
    return poseSequence.map((pose, index) => {
        const value = pose.match(/\(([^)]+)\)/)?.[1] // Extract value inside parentheses
          .toLowerCase() // Convert to lowercase
          .replace(/ñ/g, 'n') // Replace ñ with n
          .replace(/hacia/g, '&') // Replace "hacia" with "&"
          .replace(/\s+/g, ''); // Remove all whitespaces
        return new YogaPose(pose, value, index + 1);
      });
    };
    
  
  export { YogaPose, SunSalutationFactory };
  