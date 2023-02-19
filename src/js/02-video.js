import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');

const LOCALSTORAGE_KEY = 'videoplayer-current-time';

const player = new Player(iframe);

player.setVolume(0.5);

player.on('timeupdate', throttle(timeUpdate, 1000));

player.getVideoTitle().then(function (title) {
  console.log('title:', title);
});

function timeUpdate({ seconds }) {
  localStorage.setItem(LOCALSTORAGE_KEY, seconds);
}

initialPage();

function initialPage() {
  localStorage.getItem(LOCALSTORAGE_KEY)
    ? player.setCurrentTime(localStorage.getItem(LOCALSTORAGE_KEY))
    : player.setCurrentTime(0);
}