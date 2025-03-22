
export const audioThinking = new Audio('src/assets/Sounds/DorND_sound_5.mp3');
audioThinking.loop = true;

export const audioMainTheme = new Audio('src/assets/Sounds/DorND_sound_6.mp3');


const audio = new Audio('src/assets/Sounds/DorND_sound_8.mp3');

export function playAudioSegment(startTime: number, endTime: number) {
    audio.currentTime = startTime; // Начало воспроизведения с 5-й секунды
    audio.play();

    // Остановить аудио по достижении конца указанного отрезка
    const stopAudio = () => {
        if (audio.currentTime >= endTime) {
            audio.pause();
            audio.removeEventListener('timeupdate', stopAudio);
        }
    };

    // Следим за ходом воспроизведения
    audio.addEventListener('timeupdate', stopAudio);
};


// Пример вызова
// playAudioSegment(20, 23);