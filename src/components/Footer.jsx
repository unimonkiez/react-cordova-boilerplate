import React, { PropTypes, Component } from 'react';
import { SHOW_ALL, SHOW_MARKED, SHOW_UNMARKED } from 'src/constants/todo-filters.js';
import todoStyle from 'src/style/todo-style.scss';

const FILTER_TITLES = {
  [SHOW_ALL]: 'All',
  [SHOW_UNMARKED]: 'Active',
  [SHOW_MARKED]: 'Completed'
};

export default class Footer extends Component {
  renderTodoCount() {
    const { unmarkedCount } = this.props;
    const itemWord = unmarkedCount === 1 ? 'item' : 'items';

    return (
      <span className={todoStyle['todo-count']}>
        <strong>{unmarkedCount || 'No'}</strong> {itemWord} left
      </span>
    );
  }

  renderFilterLink(filter) {
    const title = FILTER_TITLES[filter];
    const { filter: selectedFilter, onShow } = this.props;

    return (
      <a
        className={filter === selectedFilter ? todoStyle.selected : undefined}
        style={{ cursor: 'hand' }}
        tabIndex={0}
        onClick={() => onShow(filter)}
      >
        {title}
      </a>
    );
  }

  renderClearButton() {
    const { markedCount, onClearMarked } = this.props;
    if (markedCount > 0) {
      return (
        <button
          className={todoStyle['clear-completed']}
          onClick={onClearMarked}
        >
          Clear completed
        </button>
      );
    }
    return undefined;
  }

  render() {
    return (
      <footer className={todoStyle.footer}>
        {this.renderTodoCount()}
        <ul className={todoStyle.filters}>
          {[SHOW_ALL, SHOW_UNMARKED, SHOW_MARKED].map(filter =>
            <li key={filter}>
              {this.renderFilterLink(filter)}
            </li>
          )}
        </ul>
        {this.renderClearButton()}
      </footer>
    );
  }
}
if (__DEV__) {
  // Not needed or used in minified mode
  Footer.propTypes = {
    markedCount: PropTypes.number.isRequired,
    unmarkedCount: PropTypes.number.isRequired,
    filter: PropTypes.string.isRequired,
    onClearMarked: PropTypes.func.isRequired,
    onShow: PropTypes.func.isRequired
  };
}
