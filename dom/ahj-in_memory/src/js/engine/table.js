import { tableHeader, tableRow } from './template';

export default class Table {
  constructor(data) {
    this.wrapper = document.createElement('div');
    this.wrapper.classList.add('wrapper');
    this.container = document.createElement('div');
    this.container.classList.add('container');
    this.wrapper.append(this.container);
    this.title = document.createElement('h1');
    this.title.classList.add('title');
    this.title.innerText = 'SORT THE LIST';
    this.container.append(this.title);
    this.table = document.createElement('table');
    this.table.classList.add('film-table');
    this.table.insertAdjacentHTML('afterBegin', tableHeader);
    this.container.append(this.table);
    document.body.append(this.wrapper);
    this.direction = [];
    this.rowElements = [];
    data.forEach((element) => {
      this.rowElements.push(tableRow(element));
    });
  }

  renderTable() {
    this.rowElements.forEach((element) => this.table.append(element));
  }

  addListeners() {
    const headers = document.querySelectorAll('th');
    headers.forEach((element) => {
      element.addEventListener('click', (event) => {
        this.sortTable(event.target.closest('th').dataset.id);
      });
    });
  }

  sortTable(type) {
    if (this.direction[0] === type) {
      this.direction[1] = !this.direction[1];
    } else {
      this.direction[0] = type;
      this.direction[1] = 0;
    }

    let directionSymbol = '&nbsp';

    if (!this.direction[1]) {
      this.rowElements.sort((a, b) => {
        if (type === 'title') {
          return a.dataset[type] < b.dataset[type] ? -1 : 1;
        }
        return a.dataset[type] - b.dataset[type];
      });
      directionSymbol = '&#8595';
    } else {
      this.rowElements.sort((a, b) => {
        if (type === 'title') {
          return a.dataset[type] > b.dataset[type] ? -1 : 1;
        }
        return b.dataset[type] - a.dataset[type];
      });
      directionSymbol = '&#8593';
    }

    const directors = [...document.querySelectorAll('.direction')];
    directors.forEach((element) => {
      // eslint-disable-next-line no-param-reassign
      element.innerHTML = '&nbsp';
    });

    directors.find(
      (element) => element.closest('th').dataset.id === type
    ).innerHTML = directionSymbol;

    this.renderTable();
  }
}
