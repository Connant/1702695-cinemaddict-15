import Abstract from '../mock/abstract.js';

export const filmsSectionTemplate = () => (
  `<section class="films">
  </section>`
);

export default class FilmSection extends Abstract {
  getTemplate() {
    return filmsSectionTemplate();
  }
}
