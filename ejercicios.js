let userProgress = JSON.parse(localStorage.getItem('userProgress')) || {
    shortChallengeCompleted: false,
    longChallengeCompleted: false,
    completedPercentage: 0,
    shortChallengeTasks: [false, false, false],
    longChallengeTasks: [false, false, false, false],
};

function saveProgress() {
    localStorage.setItem('userProgress', JSON.stringify(userProgress));
}

function startChallenge(type) {
    if (type === 'short' && !userProgress.shortChallengeCompleted) {
        alert('¡Iniciaste el Reto Corto!');
        activateChallenge('short');
        document.getElementById('shortChallengeBtn').disabled = true; // Deshabilitar el botón de iniciar reto
        document.getElementById('shortCompleteBtn').disabled = false; // Habilitar el botón de completar reto
    } else if (type === 'long' && !userProgress.longChallengeCompleted) {
        alert('¡Iniciaste el Reto Largo!');
        activateChallenge('long');
        document.getElementById('longChallengeBtn').disabled = true; // Deshabilitar el botón de iniciar reto
        document.getElementById('longCompleteBtn').disabled = false; // Habilitar el botón de completar reto
    } else {
        alert('Este reto ya fue completado.');
    }
}

function activateChallenge(type) {
    const tasks = document.querySelectorAll(`.${type}-task`);
    tasks.forEach((task, index) => {
        task.disabled = false;
        task.checked = index === 0; // Solo el primer checkbox está marcado inicialmente
        task.addEventListener('change', () => {
            userProgress[`${type}ChallengeTasks`][index] = task.checked;
            checkChallengeCompletion(type);
            saveProgress();
        });
    });
}

function checkChallengeCompletion(type) {
    const allTasksCompleted = userProgress[`${type}ChallengeTasks`].every(task => task);
    document.getElementById(`${type}CompleteBtn`).disabled = !allTasksCompleted;
}

function completeChallenge(type) {
    if (userProgress[`${type}ChallengeTasks`].every(task => task)) {
        alert(`¡Reto ${type === 'short' ? 'Corto' : 'Largo'} completado! Has ganado tus recompensas.`);
        userProgress[`${type}ChallengeCompleted`] = true;
        saveProgress();
        updateProgress();
        grantWeeklyReward(); // Función para entregar recompensas adicionales al finalizar el reto
    } else {
        alert('Por favor completa todos los checklists antes de finalizar.');
    }
}

function updateProgress() {
    let completedChallenges = 0;
    if (userProgress.shortChallengeCompleted) completedChallenges++;
    if (userProgress.longChallengeCompleted) completedChallenges++;
    
    userProgress.completedPercentage = (completedChallenges / 2) * 100;
    document.querySelector('.stats-personalization p:nth-child(2)').textContent =
        `Porcentaje completado: ${userProgress.completedPercentage}%`;

    const lastChallenge = userProgress.longChallengeCompleted
        ? "Reto Largo"
        : userProgress.shortChallengeCompleted
        ? "Reto Corto"
        : "Ninguno";
    document.querySelector('.stats-personalization p:nth-child(3)').textContent =
        `Último reto completado: ${lastChallenge}`;
}

function grantWeeklyReward() {
    // Implementar lógica para entregar recompensas adicionales como parte del progreso semanal
    // Ejemplo: Agregar puntos, bonificaciones, etc.
    alert('¡Recompensas adicionales entregadas por tu progreso semanal!');
}

document.getElementById('shortChallengeBtn').addEventListener('click', function () {
    startChallenge('short');
});

document.getElementById('longChallengeBtn').addEventListener('click', function () {
    startChallenge('long');
});

document.getElementById('shortCompleteBtn').addEventListener('click', function () {
    completeChallenge('short');
});

document.getElementById('longCompleteBtn').addEventListener('click', function () {
    completeChallenge('long');
});

document.querySelectorAll('.complete-btn').forEach(btn => (btn.disabled = true));
updateProgress();
