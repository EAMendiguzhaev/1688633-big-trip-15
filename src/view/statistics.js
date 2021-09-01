import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { getTimeDifferenceMs, getTimeFormatted } from './utils/point.js';
import SmartView from './smart.js';

const BAR_HEIGHT = 55;
const MIN_TYPES_COUNT = 5;

const getTypes = (points) => {
  const uniqueTypes = new Set();

  points.forEach((currentValue) => {
    uniqueTypes.add(currentValue.type.toUpperCase());
  });

  return Array.from(uniqueTypes.values());
};

const createStatisticsTemplate = (points) => {
  const typesCount = getTypes(points).length;

  let height = BAR_HEIGHT * MIN_TYPES_COUNT;

  if (typesCount > MIN_TYPES_COUNT) {
    height = BAR_HEIGHT * typesCount;
  }

  return `<section class="statistics">
            <h2 class="visually-hidden">Trip statistics</h2>
            <div class="statistics__item">
              <canvas class="statistics__chart" id="money" width="900" height="${height}"></canvas>
            </div>
            <div class="statistics__item">
              <canvas class="statistics__chart" id="type" width="900" height="${height}"></canvas>
            </div>
            <div class="statistics__item">
              <canvas class="statistics__chart" id="time-spend" width="900" height="${height}"></canvas>
            </div>
          </section>`;
};

const getSumPriceOfTypes = (points) => {
  let uniqueTypes = getTypes(points);

  let sumPrices = uniqueTypes.map((type) => {
    let sumPrice = 0;

    points.reduce((acc, it) => {
      const isCurrentType = it.type.toUpperCase() === type;

      return (sumPrice = isCurrentType ? (acc += it.price) : acc);
    }, 0);

    return sumPrice;
  });

  const indexes = Array.from(sumPrices.keys()).sort((a, b) => sumPrices[b] - sumPrices[a]);

  sumPrices = indexes.map((i) => sumPrices[i]);
  uniqueTypes = indexes.map((i) => uniqueTypes[i]);

  return { types: uniqueTypes, prices: sumPrices };
};

const getCountOfTypes = (points) => {
  let uniqueTypes = getTypes(points);

  let counts = uniqueTypes.map((type) => {
    let count = 0;
    points.forEach((point) => {
      if (point.type.toUpperCase() === type) {
        count += 1;
      }
    });

    return count;
  });

  const indexes = Array.from(counts.keys()).sort((a, b) => counts[b] - counts[a]);

  counts = indexes.map((i) => counts[i]);
  uniqueTypes = indexes.map((i) => uniqueTypes[i]);

  return { types: uniqueTypes, counts };
};

const getTimeOfTypes = (points) => {
  let uniqueTypes = getTypes(points);

  let times = uniqueTypes.map((type) => {
    let time = 0;
    points.forEach((point) => {
      if (point.type.toUpperCase() === type) {
        const timeDifference = getTimeDifferenceMs(point.dateFrom, point.dateUntil);
        time += timeDifference;
      }
    });
    return time;
  });

  const indexes = Array.from(times.keys()).sort((a, b) => times[b] - times[a]);

  times = indexes.map((i) => times[i]);
  uniqueTypes = indexes.map((i) => uniqueTypes[i]);

  return { types: uniqueTypes, times };
};

const createMoneyChart = (moneyCtx, points) => {
  const data = getSumPriceOfTypes(points);

  return new Chart(moneyCtx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: data.types,
      datasets: [
        {
          data: data.prices,
          backgroundColor: '#ffffff',
          hoverBackgroundColor: '#ffffff',
          anchor: 'start',
        },
      ],
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13,
          },
          color: '#000000',
          anchor: 'end',
          align: 'start',
          formatter: (val) => `€${val}`,
        },
      },
      title: {
        display: true,
        text: 'MONEY',
        fontColor: '#000000',
        fontSize: 23,
        position: 'left',
      },
      scales: {
        yAxes: [
          {
            ticks: {
              fontColor: '#000000',
              padding: 5,
              fontSize: 13,
            },
            gridLines: {
              display: false,
              drawBorder: false,
            },
            barThickness: 44,
          },
        ],
        xAxes: [
          {
            ticks: {
              display: false,
              beginAtZero: true,
            },
            gridLines: {
              display: false,
              drawBorder: false,
            },
            minBarLength: 50,
          },
        ],
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

const createTypeChart = (typeCtx, points) => {
  const data = getCountOfTypes(points);

  return new Chart(typeCtx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: data.types,
      datasets: [
        {
          data: data.counts,
          backgroundColor: '#ffffff',
          hoverBackgroundColor: '#ffffff',
          anchor: 'start',
        },
      ],
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13,
          },
          color: '#000000',
          anchor: 'end',
          align: 'start',
          formatter: (val) => `${val}x`,
        },
      },
      title: {
        display: true,
        text: 'TYPE',
        fontColor: '#000000',
        fontSize: 23,
        position: 'left',
      },
      scales: {
        yAxes: [
          {
            ticks: {
              fontColor: '#000000',
              padding: 5,
              fontSize: 13,
            },
            gridLines: {
              display: false,
              drawBorder: false,
            },
            barThickness: 44,
          },
        ],
        xAxes: [
          {
            ticks: {
              display: false,
              beginAtZero: true,
            },
            gridLines: {
              display: false,
              drawBorder: false,
            },
            minBarLength: 50,
          },
        ],
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

const createTimeChart = (timeCtx, points) => {
  const data = getTimeOfTypes(points);

  return new Chart(timeCtx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: data.types,
      datasets: [
        {
          data: data.times,
          backgroundColor: '#ffffff',
          hoverBackgroundColor: '#ffffff',
          anchor: 'start',
        },
      ],
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13,
          },
          color: '#000000',
          anchor: 'end',
          align: 'start',
          formatter: (val) => `${getTimeFormatted(val)}`,
        },
      },
      title: {
        display: true,
        text: 'TIME-SPEND',
        fontColor: '#000000',
        fontSize: 23,
        position: 'left',
      },
      scales: {
        yAxes: [
          {
            ticks: {
              fontColor: '#000000',
              padding: 5,
              fontSize: 13,
            },
            gridLines: {
              display: false,
              drawBorder: false,
            },
            barThickness: 44,
          },
        ],
        xAxes: [
          {
            ticks: {
              display: false,
              beginAtZero: true,
            },
            gridLines: {
              display: false,
              drawBorder: false,
            },
            minBarLength: 50,
          },
        ],
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

class Statistics extends SmartView {
  constructor(points) {
    super();

    this._points = points;
    this._moneyChart = null;
    this._typeChart = null;
    this._timeChart = null;

    this._setCharts();
  }

  getTemplate() {
    return createStatisticsTemplate(this._points);
  }

  _setCharts() {
    if (this._moneyChart !== null || this._typeChart !== null || this._timeChart !== null) {
      this._moneyChart = null;
      this._typeChart = null;
      this._timeChart = null;
    }

    const moneyCtx = this.getElement().querySelector('#money');
    const typeCtx = this.getElement().querySelector('#type');
    const timeCtx = this.getElement().querySelector('#time-spend');

    this._moneyChart = createMoneyChart(moneyCtx, this._points);
    this._typeChart = createTypeChart(typeCtx, this._points);
    this._timeChart = createTimeChart(timeCtx, this._points);
  }
}

export default Statistics;
