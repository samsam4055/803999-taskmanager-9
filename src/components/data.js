import {getRandomNumber} from "./util";
import {getRandomElement} from "./util";
import {getRandomBoolean} from "./util";

const FILTERS_AMOUNT = 7;
const DESCRIPTIONS = [`Изучить теорию`, `Сделать домашку`, `Пройти интенсив на соточку`];
const COLORS = [`black`, `yellow`, `blue`, `green`, `pink`];

const tasksAmount = getRandomNumber(20, 1);

const getTask = () => (
  {
    description: getRandomElement(DESCRIPTIONS),
    dueDate: Date.now() + 1 + getRandomNumber(7, 1) * 24 * getRandomNumber(60, 1) * 60 * 1000,
    repeatingDays: {
      Mo: getRandomBoolean(),
      Tu: getRandomBoolean(),
      We: getRandomBoolean(),
      Th: getRandomBoolean(),
      Fr: getRandomBoolean(),
      Sa: getRandomBoolean(),
      Su: getRandomBoolean(),
    },
    tags: new Set([`homework`, `theory`, `practice`, `intensive`, `keks`]),
    color: getRandomElement(COLORS),
    isFavorite: getRandomBoolean(),
    isArchive: getRandomBoolean(),
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

const tasksList = [...Array(tasksAmount)].map(getTask);
const filtersList = new Array(...new Array(FILTERS_AMOUNT)).map((value, index) => ({title: Array.from(getFilter().titles)[index], count: getFilter().counters[Array.from(getFilter().titles)[index]]}));

const getTasksAmount = () => tasksList.length;

const isRepeatingTask = (task) => {
  return Object.keys(task.repeatingDays).some((day) => task.repeatingDays[day]);
};

export {getTask, tasksList, filtersList, getTasksAmount, isRepeatingTask};
