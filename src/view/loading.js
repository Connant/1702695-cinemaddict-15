import Abstract from './abstract.js';

const createLoadingTemplate = () => (
  `<section class="films-list">
    <p class="board__no-tasks">
      Loading...
    </p>
  </section>`
);

export default class Loading extends Abstract {

  getTemplate() {
    return createLoadingTemplate();
  }

}
