/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */
import { unit, unitForm, container, unitDelete } from './template';
import FORM_ERRORS from '../data/formErrors';
import UnitAPI from './unitApi';

export default class Widget {
  constructor() {
    this.api = new UnitAPI();
    this.units = [];
  }

  init() {
    this.renderContainer();
    this.renderUnits();
  }

  /**
   * Renders empty container
   */
  renderContainer() {
    this.wrapper = document.createElement('div');
    this.wrapper.classList.add('wrapper');
    this.wrapper.append(container());
    document.body.append(this.wrapper);

    this.wrapper.querySelector('.btn-add').addEventListener(
      'click',
      (event) => {
        event.preventDefault();
        this.unitFormShow(event.target);
      },
      false
    );

    this.wrapper.addEventListener(
      'click',
      (event) => {
        event.preventDefault();
        if (event.target === this.wrapper) {
          try {
            this.allFormsClose();
          } catch (e) {
            // nthg
          }
        }
      },
      false
    );
  }

  /**
   * Renders units list from local array
   */
  async renderUnits() {
    this.allFormsClose();
    this.units = await this.api.listing();

    const unitList = this.wrapper.querySelector('.unit-list');
    unitList.innerHTML = '';

    const clearListMsg = this.wrapper.querySelector('.unit-false');
    clearListMsg.classList.remove('visually-hidden');

    this.units.forEach((element) => {
      const newUnit = unit(element);
      unitList.append(newUnit);
      this.addUnitListeners(newUnit);
      clearListMsg.classList.add('visually-hidden');
    });
  }

  /**
   * Add listeners to the ticket element
   * @param {Element} element
   */
  addUnitListeners(element) {
    // UNDONE-DONE
    element.querySelector('.unit-status').addEventListener(
      'click',
      (event) => {
        event.preventDefault();
        this.unitStatusChange(event.target);
      },
      false
    );

    // DESCR SHOW-HIDE
    element.querySelector('.unit-text').addEventListener(
      'click',
      (event) => {
        event.preventDefault();
        this.unitDescrToggle(event.target);
      },
      false
    );

    // EDIT UNIT
    element.querySelector('.unit-edit').addEventListener(
      'click',
      (event) => {
        event.preventDefault();
        this.unitFormShow(event.target.closest('li.unit'));
      },
      false
    );

    // DELETE UNIT
    element.querySelector('.unit-delete').addEventListener(
      'click',
      (event) => {
        event.preventDefault();
        this.unitDelete(event.target.closest('li.unit'));
      },
      false
    );
  }

  /**
   * Changes comletion status and re-renders
   * @param {Element} target
   */
  async unitStatusChange(target) {
    const id = target.closest('li.unit').dataset.unitId;
    let { status } = target.closest('li.unit').dataset;
    const newStatus = status === 'true';
    status = !newStatus;
    const object = { status };
    await this.api.update(id, object);
    await this.renderUnits();
  }

  /**
   * Shows unit description
   * @param {Element} target
   */
  async unitDescrToggle(target) {
    const id = target.closest('li.unit').dataset.unitId;
    const ticket = await this.api.get(id);
    const desc = target.closest('li.unit').querySelector('.unit-description');
    desc.style.maxWidth = `${target.closest('li.unit').querySelector('.unit-text').offsetWidth}px`;
    desc.innerHTML = ticket.description;
  }

  /**
   * Shows add new unit form and bind its listeners
   * @param {Object} data - object { id: 0, name: '', description: '' }
   */
  unitFormShow(element) {
    try {
      this.allFormsClose();
    } catch (e) {
      // nthg
    }

    const data = element.dataset.unitId
      ? this.units.find((ticket) => ticket.id === element.dataset.unitId)
      : { id: '', name: '', description: '' };

    const newForm = unitForm(data);
    const parent = document.querySelector('.unit-container');
    parent.append(newForm);
    this.modalPlace(parent, newForm);

    newForm.querySelector(`.btn-cancel`).addEventListener(
      'click',
      (event) => {
        event.preventDefault();
        this.allFormsClose();
      },
      false
    );
    newForm.querySelector(`.btn-submit`).addEventListener(
      'click',
      (event) => {
        event.preventDefault();
        this.unitPush(event.target);
      },
      false
    );

    newForm.querySelector(`input.form__input`).focus();
  }

  /**
   * Creates new or edits card in DB and redraws the board
   * @param {String} data - text value for new card
   */
  async unitPush(element) {
    const form = document.forms.unitForm;
    if (!this.checkFormValidity(form)) {
      return;
    }

    const formData = new FormData(form);

    const { id } = element.closest('.form').dataset;

    const object = {};
    formData.forEach((value, key) => {
      object[key] = value;
    });

    object.description = object.description.replace(/(?:\r\n|\r|\n)/g, '<br>');

    if (!id) {
      await this.api.create(object);
    } else if (id) {
      await this.api.update(id, object);
    }

    this.allFormsClose();
    await this.renderUnits();
  }

  /**
   * Removes unit
   * @param {Element} element - element to remove
   */
  unitDelete(element) {
    try {
      this.allFormsClose();
    } catch (e) {
      // nthg
    }

    const deleteForm = unitDelete(element.dataset.unitId);
    const parent = document.querySelector('.unit-container');
    parent.append(deleteForm);
    this.modalPlace(parent, deleteForm);

    deleteForm.querySelector(`.btn-cancel`).addEventListener(
      'click',
      (event) => {
        event.preventDefault();
        this.allFormsClose();
      },
      false
    );
    deleteForm.querySelector(`.btn-submit`).addEventListener(
      'click',
      async (event) => {
        event.preventDefault();
        await this.api.delete(element.dataset.unitId);
        this.renderUnits();
      },
      false
    );
  }

  /**
   * Checks form elements validity
   * @param {Object} form
   * @returns all elements valid = true, otherwise false
   */
  checkFormValidity(form) {
    let { error } = this;

    // old error removing
    if (error) {
      error.remove();
      error = null;
    }
    // check validity code
    const isValid = form.checkValidity();

    if (!isValid) {
      // switch .invalid on all valid elements to .valid
      [...form.elements]
        .filter((o) => o.validity.valid && !o.classList.contains('btn'))
        .forEach((el) => {
          el.classList.add('valid');
          el.classList.remove('invalid');
        });

      const first = [...form.elements].find((o) => !o.validity.valid);
      first.focus();
      first.classList.remove('valid');
      first.classList.add('invalid');

      const ValidityState = first.validity;
      let errorKey = 'Неизвестная ошибка';

      for (const key in ValidityState) {
        if (ValidityState[key]) {
          errorKey = key;
        }
      }

      error = document.createElement('div');
      error.dataset.id = 'error';
      error.className = 'form-error';
      error.textContent = `${FORM_ERRORS.FORM_ERRORS[first.name][errorKey]}`;

      // for relative positioning inside container
      first.offsetParent.appendChild(error);
      error.style.top = `${first.offsetTop}px`;
      error.style.left = `${first.offsetLeft + first.offsetWidth}px`;
      this.error = error;
      return false;
    }
    return true;
  }

  /**
   * Places modal window above parent
   */
  modalPlace(parent, element) {
    element.style.width = `${parent.offsetWidth * 0.8}px`;
    element.style.top = `${parent.offsetTop + element.offsetTop * 0.9}px`;
    element.style.left = `${
      parent.offsetLeft + parent.offsetWidth / 2 - element.offsetWidth / 2
    }px`;
  }

  /**
   * Closes unit forms and errors
   */
  allFormsClose() {
    [...document.querySelectorAll(`div.unitForm`)].forEach((el) => el.remove());
    [...document.querySelectorAll(`div.form-error`)].forEach((el) => el.remove());
  }
}
