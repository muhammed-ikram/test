document.getElementById('submit-btn').addEventListener('onclick', function(e) {
    e.preventDefault();
    
    // Get all the selected values
    const stressLevel = parseInt(document.getElementById('stressLevel').value);
    const sleepQuality = parseInt(document.getElementById('sleepQuality').value);
    const mood = parseInt(document.getElementById('mood').value);
    const socialInteraction = parseInt(document.getElementById('socialInteraction').value);
    const academicPressure = parseInt(document.getElementById('academicPressure').value);

    // Calculate average score
    const averageScore = (stressLevel + sleepQuality + mood + socialInteraction + academicPressure) / 5;
    
    // Redirect based on score ranges
    if (averageScore >= 3) {
        window.location.href = 'congratulations.html';
    } else if (averageScore >= 2 && averageScore < 3) {
        window.location.href = 'moderate_exercises.html';
    } else if (averageScore >= 1 && averageScore < 2) {
        window.location.href = 'improvement_exercises.html';
    } else if (averageScore >= 0 && averageScore < 1) {
        window.location.href = 'confidence_exercises.html';
    }
}); 