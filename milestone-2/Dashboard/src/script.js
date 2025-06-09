const themeToggle = document.getElementById('theme-toggle');
const mainLogo = document.getElementById('main-logo');
const body = document.body;

let doughnutChart; // Chart.js instance

// Create Chart.js Doughnut Chart
function createDoughnutChart() {
  const xValues = ["Female", "Male"];
  const yValues = [35, 65];
  const barColors = ["#5832E6", "#16C098"];

  const ctx = document.getElementById("myChart").getContext("2d");

  return new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: xValues,
      datasets: [{
        backgroundColor: barColors,
        data: yValues
      }]
    },
    options: {
      plugins: {
        legend: {
          labels: {
            color: body.classList.contains('dark') ? '#FFFFFF' : '#000000'
          }
        },
        tooltip: {
          backgroundColor: body.classList.contains('dark') ? '#222222' : '#FFFFFF',
          bodyColor: body.classList.contains('dark') ? '#FFFFFF' : '#000000'
        }
      }
    }
  });
}

// Create Plotly Bar Chart
function createPlotlyChart() {
  const trace1 = {
    x: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Oct', 'Nov', 'Dec'],
    y: [50, 70, 80, 55, 45, 55, 65, 77, 66, 60, 70, 50, 80],
    name: 'Job View',
    type: 'bar',
    marker: {
      color: '#5832E6',
      line: { width: 0 }
    },
    offsetgroup: '1',
    width: 0.6
  };

  const trace2 = {
    x: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Oct', 'Nov', 'Dec'],
    y: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
    name: 'Job Applied',
    type: 'bar',
    marker: {
      color: '#F2EFFF',
      line: { width: 0 }
    },
    offsetgroup: '1',
    width: 0.6
  };

  const data = [trace1, trace2];

  const isDark = body.classList.contains('dark');

  const layout = {
    barmode: 'stack',
    paper_bgcolor: isDark ? '#0D0D0D' : '#FFFFFF',
    plot_bgcolor: isDark ? '#0D0D0D' : '#FFFFFF',
    font: {
      size: 14,
      family: 'Poppins, sans-serif',
      color: isDark ? '#FFFFFF' : '#2D2D2D'
    },
    title: {
      text: 'Job Statistics',
      font: {
        size: 24,
        family: 'Poppins, sans-serif',
        color: isDark ? '#FFFFFF' : '#2D2D2D'
      },
      x: 0,
      xanchor: 'left'
    },
    yaxis: {
      tickvals: [20, 40, 60, 80, 100],
      ticktext: ['20', '40', '60', '80', '100'],
      color: isDark ? '#FFFFFF' : '#2D2D2D'
    },
    xaxis: {
      color: isDark ? '#FFFFFF' : '#2D2D2D'
    }
  };

  Plotly.newPlot('myDiv', data, layout, { responsive: true });
}

// Toggle Theme Function
function setTheme(mode) {
  const isDark = mode === 'dark';

  if (isDark) {
    body.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  } else {
    body.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  }

  // Toggle icons & logo
  themeToggle.src = themeToggle.dataset[mode];
  mainLogo.src = mainLogo.dataset[mode];

  // Toggle sidebar/menu images
  document.querySelectorAll('.theme-img').forEach(img => {
    const newSrc = img.dataset[mode];
    if (newSrc) img.src = newSrc;
  });

  // Update Chart.js styles
  if (doughnutChart) doughnutChart.destroy();
  doughnutChart = createDoughnutChart();

  // Update Plotly layout
  createPlotlyChart();
}

// Theme initialization on page load
const storedTheme = localStorage.getItem('theme') || 'light';
setTheme(storedTheme);

// Toggle theme on click
themeToggle.addEventListener('click', () => {
  const newTheme = body.classList.contains('dark') ? 'light' : 'dark';
  setTheme(newTheme);
});
