export default class App {
  constructor(boardsize) {
    this.goblin = document.createElement('div');
    this.goblin.classList.add('goblin');

    this.activeHole = 1;

    this.wrapper = document.createElement('div');
    this.wrapper.classList.add('wrapper');
    this.container = document.createElement('div');
    this.container.classList.add('container');
    this.wrapper.append(this.container);
    this.title = document.createElement('h1');
    this.title.classList.add('title');
    this.title.innerText = 'WACK THE GOBLIN!';
    this.container.append(this.title);
    this.divArray = [];
    for (let i = 0; i < boardsize ** 2; i += 1) {
      this.divArray[i] = document.createElement('div');
      this.divArray[i].classList.add('hole');
      this.divArray[i].setAttribute('id', `hole${i}`);
      this.container.append(this.divArray[i]);
    }
    document.body.append(this.wrapper);
  }

  static getHole(index) {
    return document.getElementById(`hole${index}`);
  }

  moveGoblin(index) {
    App.getHole(index).append(this.goblin);
  }

  gamePlay() {
    setInterval(() => {
      let newHole = this.activeHole;
      while (newHole === this.activeHole) {
        newHole = Math.floor(Math.random() * this.divArray.length);
      }
      this.activeHole = newHole;
      this.moveGoblin(this.activeHole);
    }, 1000);
  }
}
