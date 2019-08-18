export const getFilters = (filters, tasks) => {
  return `
    <section class="main__filter filter container">
      ${filters.map((filter) => `<input
      type="radio"
      id="filter__${filter.title}"
      class="filter__input visually-hidden"
      name="filter"
      checked
      />
      <label for="filter__${filter.title}" class="filter__label">
        ${filter.title} <span class="filter__all-count">${filter.count(tasks)}</span></label>`).join(` `)}
    </section>
    <section class="board container">
      <div class="board__filter-list">
        <a href="#" class="board__filter">SORT BY DEFAULT</a>
        <a href="#" class="board__filter">SORT BY DATE up</a>
        <a href="#" class="board__filter">SORT BY DATE down</a>
      </div>
      <div class="board__tasks">
      
      </div>
    </section>
  `;
};
