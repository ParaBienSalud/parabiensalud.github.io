document.addEventListener('DOMContentLoaded', () => {
    const joinButtons = document.querySelectorAll('button[id^="join-btn-"]');
    const timers = document.querySelectorAll('span[id^="timer-"]');
    const progressBars = document.querySelectorAll('div[id^="progress-"]');
    const participantsLists = document.querySelectorAll('ul[id^="participants-list-"]');
    const rewardButtons = document.querySelectorAll('button[id^="reward-btn-"]');
    const retoContainers = document.querySelectorAll('.reto-container');
    let currentRetoIndex = 0;

    function startTimer(timerElement, seconds, progressBar) {
        let remainingTime = seconds;
        const timerInterval = setInterval(() => {
            let hours = Math.floor(remainingTime / 3600);
            let minutes = Math.floor((remainingTime % 3600) / 60);
            let seconds = remainingTime % 60;
            hours = hours.toString().padStart(2, '0');
            minutes = minutes.toString().padStart(2, '0');
            seconds = seconds.toString().padStart(2, '0');
            timerElement.textContent = `${hours}:${minutes}:${seconds}`;
            if (remainingTime <= 0) {
                clearInterval(timerInterval);
                timerElement.textContent = '00:00:00';
                updateProgress(progressBar, 100);
                enableRewardButton(rewardButtons[progressBars.indexOf(progressBar)]);
            } else {
                updateProgress(progressBar, (1 - remainingTime / seconds) * 100);
            }
            remainingTime--;
        }, 1000);
    }

    function updateProgress(progressBar, percentage) {
        progressBar.style.width = percentage + '%';
    }

    function updateParticipantsCount(participantsList, progressBar) {
        let count = parseInt(participantsList.dataset.count) || getRandomInt(50, 300);
        const maxCount = 300;
        if (count < maxCount) {
            let increment = Math.floor(Math.random() * 10);
            count += increment;
            count = Math.min(count, maxCount);
            participantsList.dataset.count = count;
            participantsList.innerHTML = `<li>${count}</li>`;
            updateProgress(progressBar, count);
        }
    }

    function joinChallenge(button, timerId, progressId, participantsListId) {
        button.addEventListener('click', () => {
            const timerElement = document.getElementById(timerId);
            const participantsListElement = document.getElementById(participantsListId);
            const progressBarElement = document.getElementById(progressId);
            if (participantsListElement.dataset.count !== undefined) return;
            updateParticipantsCount(participantsListElement, progressBarElement);
            button.disabled = true;
            button.textContent = 'Te has unido al evento';
            startTimer(timerElement, parseInt(timerElement.dataset.seconds), progressBarElement);
        });
    }

    function enableRewardButton(button) {
        button.disabled = false;
        button.textContent = 'Canjear Recompensa';
    }

    joinButtons.forEach(button => {
        const retoId = button.id.split('-')[2];
        joinChallenge(button, `timer-${retoId}`, `progress-${retoId}`, `participants-list-${retoId}`);
    });

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    function showReto(index) {
        retoContainers.forEach((container, i) => {
            if (i === index) {
                container.style.display = 'block';
            } else {
                container.style.display = 'none';
            }
        });
    }

    prevBtn.addEventListener('click', () => {
        if (currentRetoIndex > 0) {
            currentRetoIndex--;
            showReto(currentRetoIndex);
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentRetoIndex < retoContainers.length - 1) {
            currentRetoIndex++;
            showReto(currentRetoIndex);
        }
    });

    showReto(currentRetoIndex);
});
