/* eslint-disable import/prefer-default-export */
function container() {
  const newContainer = document.createElement('div');
  newContainer.classList.add('wrapper');
  newContainer.innerHTML = `
  <div class="container">
    <div class="container__header">
      <a href="#collapsible" class="btn btn-toggler" id="toggler">Collapse</a>
    </div>
    <div class="collapsible-container" id="collapsible-container">
      <div class="collapsible" id="collapsible">
        <span class="collapsible__text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</span>
      </div>
    </div>
    <div class="sub-action"><span class="sub-action__btn">Copy</span></div>
  </div>
  `;
  return newContainer;
}

export { container };
