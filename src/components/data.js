import {getRandomNumber} from "./util";

const FILTERS_AMOUNT = 7;

const tasksAmount = getRandomNumber(20, 1);

const getTask = () => (
  {
    description: [`Изучить теорию`, `Сделать домашку`, `Пройти интенсив на соточку`][getRandomNumber(2)],
    dueDate: Date.now() + 1 + getRandomNumber(7, 1) * 24 * 60 * 60 * 1000,
    repeatingDays: {
      Mo: Boolean(getRandomNumber(1)),
      Tu: Boolean(getRandomNumber(1)),
      We: Boolean(getRandomNumber(1)),
      Th: Boolean(getRandomNumber(1)),
      Fr: Boolean(getRandomNumber(1)),
      Sa: Boolean(getRandomNumber(1)),
      Su: Boolean(getRandomNumber(1)),
    },
    tags: new Set([`homework`, `theory`, `practice`, `intensive`, `keks`]),
    color: [`black`, `yellow`, `blue`, `green`, `pink`][getRandomNumber(4)],
    isFavorite: Boolean(getRandomNumber(1)),
    isArchive: Boolean(getRandomNumber(1)),
  }
);
const getFilter = () => (
  {
    titles: new Set([`All`, `Overdue`, `Today`, `Favorites`, `Repeating`, `Tags`, `Archive`]),
    counters: {
      All(list) {
        return list.length;
      },
      Overdue(list) {
        return list.filter((item) => (item.dueDate - Date.now()) < 0).length;
      },
      Today(list) {
        return list.filter((item) => new Date(Date.now()).getDate() === new Date(item.dueDate).getDate()).length;
      },
      Favorites(list) {
        return list.filter((item) => item.isFavorite).length;
      },
      Repeating(list) {
        return list.filter((item) => Object.keys(item.repeatingDays).filter((day) => item.repeatingDays[day])).length;
      },
      Tags(list) {
        return list.filter((item) => Array.from(item.tags).length).length;
      },
      Archive(list) {
        return list.filter((item) => item.isArchive).length;
      },
    },
  }
);

const tasksList = new Array(...new Array(tasksAmount)).map(getTask);
const filtersList = new Array(...new Array(FILTERS_AMOUNT)).map((value, index) => ({title: Array.from(getFilter().titles)[index], count: getFilter().counters[Array.from(getFilter().titles)[index]]}));

const getTasksAmount = () => tasksList.length;

export {getTask, getFilter, tasksList, filtersList, getTasksAmount};
