import './Timer.scss';

const UPDATE_TIME = 1000;

class Timer {
  constructor({ locale = 'ru' } = {}) {
    this.locale = locale;
  }
  update() {
    this.element.innerHTML = new Date().toLocaleTimeString(this.locale);
  }
  run() {
    this.update();
    this.interval = setInterval(() => {
      this.update();
    }, UPDATE_TIME);
  }
  render(target) {
    this.element = document.createElement('div');
    this.element.className = 'timer';
    target.appendChild(this.element);
  }
}

export default Timer;
