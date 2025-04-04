
export const audioThinking = new Audio('src/assets/Sounds/DorND_sound_5.mp3');
audioThinking.loop = true;

export const audioMainTheme = new Audio('src/assets/Sounds/DorND_sound_6.mp3');

export function playAudioSegmentMainTheme(startTime: number, endTime: number, onEnd: () => void) {
    audioMainTheme.currentTime = startTime; // Начало воспроизведения с n-й секунды
    audioMainTheme.play();

    // Остановить аудио по достижении конца указанного отрезка
    const stopAudio = () => {
        if (audioMainTheme.currentTime >= endTime) {
            audioMainTheme.pause();
            audioMainTheme.removeEventListener('timeupdate', stopAudio);
            if (onEnd) onEnd(); // ВАЖНО: Вызываем колбэк после остановки
        }
    };

    // Следим за ходом воспроизведения
    audioMainTheme.addEventListener('timeupdate', stopAudio);
};

const audioCaseIsOpen = new Audio('src/assets/Sounds/DorND_sound_3.mp3');

export function playAudioSegmentCaseIsOpen(startTime: number, endTime: number, onEnd?: () => void) {
    audioCaseIsOpen.currentTime = startTime; // Начало воспроизведения с n-й секунды
    audioCaseIsOpen.play();

    // Остановить аудио по достижении конца указанного отрезка
    const stopAudio = () => {
        if (audioCaseIsOpen.currentTime >= endTime) {
            audioCaseIsOpen.pause();
            audioCaseIsOpen.removeEventListener('timeupdate', stopAudio);
            if (onEnd) onEnd(); // ВАЖНО: Вызываем колбэк после остановки
        }
    };

    // Следим за ходом воспроизведения
    audioCaseIsOpen.addEventListener('timeupdate', stopAudio);
};


const audio = new Audio('src/assets/Sounds/DorND_sound_8.mp3');

export function playAudioSegment(startTime: number, endTime: number, onEnd?: () => void) {
    audio.currentTime = startTime; // Начало воспроизведения с n-й секунды
    audio.play();

    // Остановить аудио по достижении конца указанного отрезка
    const stopAudio = () => {
        if (audio.currentTime >= endTime) {
            audio.pause();
            audio.removeEventListener('timeupdate', stopAudio);
            if (onEnd) onEnd();
        }
    };

    // Следим за ходом воспроизведения
    audio.addEventListener('timeupdate', stopAudio);
};


// Пример вызова
// playAudioSegment(20, 23);