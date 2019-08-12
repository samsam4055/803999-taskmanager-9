import {getMenu} from `./components/menu`;
import {getSearch} from `./components/search`;
import {getFilters} from `./components/filters`;
import {getTaskForm} from `./components/task-form`;
import {getTaskCard} from `./components/task-card`;
import {getLoadButton} from `./components/load-button`;

const CARDS_AMOUNT = 3;

const renderElement = (element, template) => {
  element.insertAdjacentHTML(`beforeend`, template);
};

const mainContainer = document.querySelector(`.main`);

renderElement(mainContainer, getSearch());
renderElement(mainContainer, getFilters());

const menuContainer = mainContainer.querySelector(`.main__control`);

renderElement(menuContainer, getMenu());

const boardElement = mainContainer.querySelector(`.board`);

renderElement(boardElement, getLoadButton());

const tasksContainer = boardElement.querySelector(`.board__tasks`);

renderElement(tasksContainer, getTaskForm());

for (let i = 0; i < CARDS_AMOUNT; i++) {
  renderElement(tasksContainer, getTaskCard());
}
