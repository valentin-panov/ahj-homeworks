/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */
import { container } from './template';

export default class Widget {
  constructor() {
    this.units = [];
  }

  init() {
    this.renderContainer();
  }

  /**
   * Renders empty container
   */
  renderContainer() {
    document.body.append(container());

    this.collapsible = document.querySelector('.collapsible');

    document.querySelector('.btn').addEventListener(
      'click',
      (event) => {
        event.preventDefault();
        this.toggleElement(this.collapsible);
      },
      false
    );

    document.addEventListener(
      'click',
      (event) => {
        event.preventDefault();
        if (event.target !== document.querySelector('.btn')) {
          try {
            this.closeElement();
          } catch (e) {
            // nthg
          }
        }
      },
      false
    );
  }

  toggleElement(element) {
    if (!element.style.height || element.style.height === '0px') {
      element.style.height = `${Array.prototype.reduce.call(
        element.childNodes,
        (p, c) => p + (c.offsetHeight || 0),
        0
      )}px`;
    } else {
      element.style.height = '0px';
    }
  }

  closeElement() {
    this.collapsible.style.height = '0px';
  }
}
