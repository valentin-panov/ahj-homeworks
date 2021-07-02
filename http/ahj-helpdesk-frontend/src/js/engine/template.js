function container() {
  const newContainer = document.createElement('div');
  newContainer.classList.add('unit-container');
  newContainer.innerHTML = `
    <div class="container__header">
      <span class="btn btn-add">Добавить тикет</span>
    </div>
    <h2 class="unit-false">ВСЁ СДелано. АкТивныХ Тикетов НеТ.</h2>
      <ul class="unit-list">
      </ul>
  `;
  return newContainer;
}

function unit(data) {
  const newUnit = document.createElement('li');
  newUnit.classList.add('unit');
  newUnit.dataset.unitId = data.id;
  newUnit.dataset.status = data.status;
  const statusFlag = data.status ? '' : 'visually-hidden';
  newUnit.innerHTML = `
    <div class="unit-wrapper">
      <div class="unit-item unit-icon-wrapper unit-status">
        <span class="unit-status-icon ${statusFlag}">&#10003</span>
      </div>
      <div class="unit-item unit-text">${data.name}
        <div class="unit-item unit-description"></div>
      </div>
      <div class="unit-item unit-date">${data.created}</div>
      <div class="unit-item unit-icon-wrapper unit-edit">&#9998</div>
      <div class="unit-item unit-icon-wrapper unit-delete">&#10005</div>
    </div>
    
  `;
  return newUnit;
}

function unitForm(data) {
  const title = data.id ? 'Изменить тикет' : 'Добавить тикет';
  const formElement = document.createElement('div');
  formElement.classList.add('unitForm');
  formElement.innerHTML = `
    <form name="unitForm" data-id="${data.id}" novalidate class="form">
      
      <h2 class="unitForm__header">${title}</h2>

      <input class="form__input" type="text" name="name" value="${
        data.name
      }" required placeholder="Введите имя тикета"></textarea>
      
      <textarea class="form__input" type="text" name="description" required placeholder="Введите описание тикета">${data.description.replace(
        /<br\s*\/?>/gm,
        '\n'
      )}</textarea>
      
      <div class="form__input-button-holder">
        <button type="button" class="btn btn-cancel">Отмена</button>
        <button type="submit" class="btn btn-submit">Ok</button>
      </div>
    </form>
  `;
  return formElement;
}

function unitDelete(data) {
  const formElement = document.createElement('div');
  formElement.classList.add('unitForm');
  formElement.innerHTML = `
    <form name="unitDeleteForm" data-id="${data}" novalidate class="form">
      
      <h2 class="unitForm__header">Удалить тикет</h2>

      <span class="unit-delete-text">Вы уверены, что хотите удалить тикет? Это действие необратимо.</span>
      
      <div class="form__input-button-holder">
        <button type="button" class="btn btn-cancel">Отмена</button>
        <button type="submit" class="btn btn-submit">Ok</button>
      </div>
    </form>
  `;
  return formElement;
}

export { container, unit, unitForm, unitDelete };
