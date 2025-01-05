document.getElementById('start-btn').addEventListener('click', startTimer);
document.getElementById('pause-btn').addEventListener('click', pauseTimer);
document.getElementById('exercise-selector').addEventListener('change', updateExercises);
document.getElementById('reset-btn').addEventListener('click', resetSession);

let timer;
let remainingTime;
let exerciseIndex = 0;
let exercises = {
    breathing: [
        { instruction: 'Respiración Abdominal', exercises: [
            { step: 'Siéntate en una posición cómoda.', duration: 30 },
            { step: 'Inhala profundamente por la nariz.', duration: 4 },
            { step: 'Exhala lentamente por la boca.', duration: 4 }
        ]},
        { instruction: 'Respiración 4-7-8', exercises: [
            { step: 'Inhala por la nariz contando hasta 4.', duration: 4 },
            { step: 'Mantén la respiración contando hasta 7.', duration: 7 },
            { step: 'Exhala por la boca contando hasta 8.', duration: 8 }
        ]}
    ],
    focus: [
        { instruction: 'Respiración del Cuadrilátero', exercises: [
            { step: 'Inhala por la nariz contando hasta 4.', duration: 4 },
            { step: 'Mantén la respiración contando hasta 4.', duration: 4 },
            { step: 'Exhala por la boca contando hasta 4.', duration: 4 },
            { step: 'Mantén la respiración contando hasta 4.', duration: 4 }
        ]},
        { instruction: 'Respiración Completa', exercises: [
            { step: 'Inhala profundamente, llenando abdomen, pecho, y parte superior de los pulmones.', duration: 10 },
            { step: 'Exhala lentamente, vaciando parte superior, luego pecho y finalmente abdomen.', duration: 10 }
        ]}
    ],
    relaxation: [
        { instruction: 'Respiración 4-7-8', exercises: [
            { step: 'Inhala por la nariz contando hasta 4.', duration: 4 },
            { step: 'Mantén la respiración contando hasta 7.', duration: 7 },
            { step: 'Exhala por la boca contando hasta 8.', duration: 8 }
        ]},
        { instruction: 'Respiración Abdominal', exercises: [
            { step: 'Siéntate o acuéstate en una posición cómoda.', duration: 10 },
            { step: 'Inhala profundamente por la nariz.', duration: 4 },
            { step: 'Exhala lentamente por la boca.', duration: 4 }
        ]}
    ]
};

let exerciseDurations;

function startTimer() {
    if (exerciseDurations) {
        remainingTime = exerciseDurations[exerciseIndex];
        timer = setInterval(updateTimer, 1000);
        updateInstructions();
    } else {
        console.error('exerciseDurations no está definido.');
    }
}

function pauseTimer() {
    clearInterval(timer);
}

function updateExercises() {
    let selected = document.getElementById('exercise-selector').value;
    exerciseDurations = exercises[selected].map(exercise => exercise.exercises.map(subExercise => subExercise.duration));
    exerciseIndex = 0;
    clearInterval(timer);
    updateInstructions();
}

function updateTimer() {
    if (remainingTime >= 0) {
        document.getElementById('timer-circle').textContent = remainingTime;
        const progress = ((exerciseDurations[exerciseIndex] - remainingTime) / exerciseDurations[exerciseIndex]) * 100;

        let progressBar = document.querySelector('#progress-bar div');
        if (progressBar) {
            progressBar.style.width = `${progress}%`;
        }
        
        remainingTime--;
    } else {
        exerciseIndex++;
        if (exerciseIndex < exerciseDurations.flat().length) {
            remainingTime = exerciseDurations.flat()[exerciseIndex];
            updateInstructions();
        } else {
            clearInterval(timer);
            document.getElementById('current-exercise').textContent = 'Meditación Completa';
        }
    }
}

function updateInstructions() {
    let selected = document.getElementById('exercise-selector').value;
    let currentExercise = exercises[selected][exerciseIndex];
    document.getElementById('current-exercise').textContent = currentExercise.instruction || currentExercise.exercises[0].step;
    document.querySelector('#progress-bar div').style.width = '0';
}

function resetSession() {
    exerciseIndex = 0;
    clearInterval(timer);
    remainingTime = 0;
    document.getElementById('current-exercise').textContent = 'Comencemos con nuestra sesión...';
    document.querySelector('#progress-bar div').style.width = '0';
}
