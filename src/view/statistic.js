import Smart from './smart.js';
import dayjs from 'dayjs';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

import { Pages, CurrentType, UserLevel } from '../constants';
import { getNumberFilmsGenre, getSortGenresFilms, completedFilmsInDateRange, filter } from '../utils/filters.js';

const createFilmsChart = (statisticCtx, genresByFilms) => {
  const BAR_HEIGHT = 50;
  const genre = Object.keys(genresByFilms);
  const numberFilms = Object.values(genresByFilms);
  statisticCtx.height = BAR_HEIGHT * genre.length;

  return new Chart(statisticCtx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: genre,
      datasets: [{
        data: numberFilms,
        backgroundColor: '#ffe800',
        hoverBackgroundColor: '#ffe800',
        anchor: 'start',
      }],
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 20,
          },
          color: '#ffffff',
          anchor: 'start',
          align: 'start',
          offset: 40,
        },
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: '#ffffff',
            padding: 100,
            fontSize: 20,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          barThickness: 24,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
};

const createRankTitle = (historyFilms) => {
  const getProfileRating = (elements) => {
    if (elements >= 1 && elements < 10) {
      return UserLevel.NOVICE;
    }
    if (elements >= 10 && elements < 20) {
      return UserLevel.FAN;
    }
    if (elements >= 20) {
      return UserLevel.MOVIE_BUFF;
    }
    if (elements === 0) {
      return '';
    }
  };
  return `<p class="statistic__rank">
            Your rank
            <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
            <span class="statistic__rank-label">${getProfileRating(historyFilms.length)}</span>
          </p>`;
};

const createStatisticsTemplate = (data) => {
  let films = [];
  let currentType = null;
  let genres = null;
  let totalDuration = 0;
  let sortGenres = [];
  let historyFilms = [];
  if (data) {
    films = data.films;
    historyFilms = films.filter((film) => film.userDetails.alreadyWatched);
    currentType = data.currentType;
    genres = data.genre;
    totalDuration = films.length !== 0 ? films.map((film) => film.movieInfo.runtime).reduce((a, b) => a + b) : 0;
    sortGenres = genres ? Object.keys(genres) : null;
  }
  const formatRuntime = (totalMin) => `<p class="statistic__item-text">${Math.floor(totalMin / 60)}<span class="statistic__item-description">h</span>${totalMin % 60}<span class="statistic__item-description">m</span></p>`;

  return `<section class="statistic">
    ${historyFilms.length !== 0 ? createRankTitle(data.films) : ''}
    <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
      <p class="statistic__filters-description">Show stats:</p>
      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-all-time" value="allTime" ${currentType === CurrentType.ALL ? 'checked' : ''}>
      <label for="statistic-all-time" class="statistic__filters-label">All time</label>
      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-today" value="today" ${currentType === CurrentType.TODAY ? 'checked' : ''}>
      <label for="statistic-today" class="statistic__filters-label">Today</label>
      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-week" value="week" ${currentType === CurrentType.WEEK ? 'checked' : ''}>
      <label for="statistic-week" class="statistic__filters-label">Week</label>
      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-month" value="month" ${currentType === CurrentType.MONTH ? 'checked' : ''}>
      <label for="statistic-month" class="statistic__filters-label">Month</label>
      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-year" value="year" ${currentType === CurrentType.YEAR ? 'checked' : ''}>
      <label for="statistic-year" class="statistic__filters-label">Year</label>
    </form>
    <ul class="statistic__text-list">
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">You watched</h4>
        <p class="statistic__item-text">${films.length} <span class="statistic__item-description">movies</span></p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Total duration</h4>
        ${formatRuntime(totalDuration)}
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Top genre</h4>
        <p class="statistic__item-text">${sortGenres.length !== 0 ? sortGenres[0] : ''}</p>
      </li>
    </ul>
    <div class="statistic__chart-wrap">
      <canvas class="statistic__chart" width="1000"></canvas>
    </div>
  </section>`;
};

export default class Statistic extends Smart {
  constructor() {
    super();
    this._data = null;
    this._sortGenres = null;
    this._sortFilms = null;
    this._chartComponent = null;

    this._today = dayjs().startOf('day');
    this._endToday = dayjs().endOf('day');
    this._week = dayjs().subtract(7, 'day').toDate();
    this._lastMonth = dayjs().subtract(1, 'month').toDate();
    this._lastYear = dayjs().subtract(1, 'year').toDate();


    this._dateChangeHandler = this._dateChangeHandler.bind(this);
  }

  init(moviesModel) {
    this._moviesModel = moviesModel;
    this._sortGenres = null;
    this._data = {
      films: this._moviesModel.getFilms(),
      currentType: CurrentType.ALL,
      genre: this._sortGenres,
    };
    this._getWatchedFilms(this._data.films);
    this._setCharts();
    this.updateData(this._data);
  }

  removeElement() {
    super.removeElement();
  }

  getTemplate() {
    return createStatisticsTemplate(this._data);
  }

  restoreHandlers() {
    this._setCharts();
  }

  _getFilmsHistory(data) {
    const films = filter[Pages.HISTORY](data);
    this._data = Object.assign({},
      this._data,
      {
        films: films,
      });
  }

  _getWatchedFilms(data) {
    const films = filter[Pages.HISTORY](data);
    const genresByFilms = getNumberFilmsGenre(films);
    this._sortGenres = getSortGenresFilms(genresByFilms);
    this._data = Object.assign({},
      this._data,
      {
        films: films,
        genre: this._sortGenres,
      });
  }

  _dateChangeHandler(evt) {
    evt.preventDefault();
    switch (evt.target.value) {
      case CurrentType.ALL:
        this._getWatchedFilms(this._moviesModel.getFilms());
        this.updateData(Object.assign({},
          this._data,
          {
            currentType: CurrentType.ALL,
          }));
        this._setCharts();
        this.setData();
        break;
      case CurrentType.TODAY:
        this._sortFilms = completedFilmsInDateRange(this._moviesModel.getFilms(), this._today, this._endToday, 'hour minute');
        this._getWatchedFilms(this._sortFilms);
        this.updateData(Object.assign(
          {},
          this._data,
          {
            currentType: CurrentType.TODAY,
          },
        ));
        this._setCharts();
        this.setData();
        break;
      case CurrentType.WEEK:
        this._sortFilms = completedFilmsInDateRange(this._moviesModel.getFilms(), this._week, this._endToday, 'month day');
        this._getWatchedFilms(this._sortFilms);
        this.updateData(Object.assign({}, this._data,
          {
            currentType: CurrentType.WEEK,
          },
        ));
        this._setCharts();
        this.setData();
        break;

      case CurrentType.MONTH:
        this._sortFilms = completedFilmsInDateRange(this._moviesModel.getFilms(), this._lastMonth, this._endToday, 'month day');
        this._getWatchedFilms(this._sortFilms);
        this.updateData(Object.assign({}, this._data,
          {
            currentType: CurrentType.MONTH,
          },
        ));
        this._setCharts();
        this.setData();
        break;

      case CurrentType.YEAR:
        this._sortFilms = completedFilmsInDateRange(this._moviesModel.getFilms(), this._lastYear, this._endToday, 'year month day');
        this._getWatchedFilms(this._sortFilms);
        this.updateData(Object.assign({}, this._data,
          {
            currentType: CurrentType.YEAR,
          },
        ));
        this._setCharts();
        this.setData();
        break;
    }
  }

  setData() {
    document.querySelector('.statistic__filters')
      .addEventListener('change', this._dateChangeHandler);
  }

  _setCharts() {
    if (this._chartComponent !== null) {
      this._chartComponent = null;
    }
    const statisticCtx = document.querySelector('.statistic__chart');
    if (!statisticCtx) { return; }
    this._chartComponent = createFilmsChart(statisticCtx, this._sortGenres);
  }
}

