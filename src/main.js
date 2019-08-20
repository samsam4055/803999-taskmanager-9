import {getMenu} from './components/menu';
import {getSearch} from './components/search';
import {getFilters} from './components/filters';
import {getTaskForm} from './components/task-form';
import {getTaskCard} from './components/task-card';
import {getLoadButton} from './components/load-button';
import {filtersList, tasksList, getTasksAmount} from "./components/data";

const CARDS_AMOUNT = 8;
const MAX_BATCH_SIZE = 8;

const renderElement = (element, template) => {
  element.insertAdjacentHTML(`beforeend`, template);
};

const generateBatches = (array, batchSize = MAX_BATCH_SIZE) => {
  const batchesAmount = Math.ceil(array.length / batchSize);
  return new Array(batchesAmount).fill(``).map((item, index) => array.slice(index * batchSize, (index + 1) * batchSize));
};

const mainContainer = document.querySelector(`.main`);

renderElement(mainContainer, getSearch());
renderElement(mainContainer, getFilters(filtersList, tasksList));

const menuContainer = mainContainer.querySelector(`.main__control`);

renderElement(menuContainer, getMenu());

const boardElement = mainContainer.querySelector(`.board`);

if (getTasksAmount() > CARDS_AMOUNT) {
  renderElement(boardElement, getLoadButton());
}

const tasksContainer = boardElement.querySelector(`.board__tasks`);

renderElement(tasksContainer, getTaskForm());

const firstBatch = (getTasksAmount() > CARDS_AMOUNT) ? tasksList.slice(0, CARDS_AMOUNT) : tasksList;

firstBatch.forEach((task) => renderElement(tasksContainer, getTaskCard(task)));

const loadButtonElement = document.querySelector(`.load-more`);

if (loadButtonElement) {
  let counter = 0;

  loadButtonElement.addEventListener(`click`, () => {
    const batches = generateBatches(tasksList.slice(CARDS_AMOUNT));
    batches[counter++].forEach((item) => renderElement(tasksContainer, getTaskCard(item)));
    if (counter === batches.length) {
      boardElement.removeChild(loadButtonElement);
    }
  });
}
