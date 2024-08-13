export default class Stopwatch {
  constructor() {
    this.seconds = 0;
    this.interval;
  }

  getData() {
   return this.seconds;
  }

   updateTime() {
    this.seconds++;
   }

  pause() {
    clearInterval(this.interval);
  }

  start() {
    this.interval = setInterval(() => this.seconds++, 1000);
  }

  reset() {
    this.seconds = 0;
    clearInterval(this.interval);
    this.start();
  }
}g