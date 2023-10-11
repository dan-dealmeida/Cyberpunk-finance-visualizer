const ctx = document.getElementById('financeChart').getContext('2d');
const inputForm = document.getElementById('inputForm');
const addMonthButton = document.getElementById('addMonth');

// Sample financial data (you can replace this with actual data)
let financialData = [
  { month: 'January', expenses: 1200 },
  { month: 'February', expenses: 1500 },
  { month: 'March', expenses: 800 },
  // Add other months here
];

addMonthButton.addEventListener('click', function () {
  addNewMonthInput();
});

inputForm.addEventListener('submit', function (event) {
  event.preventDefault();
  updateFinancialData();
  updateChart();
});

function addNewMonthInput() {
  const monthName = prompt('Enter the name of the new month:');
  if (!monthName) return;

  // Check if the month name already exists
  if (financialData.some((entry) => entry.month === monthName)) {
    alert('A month with that name already exists.');
    return;
  }

  const newMonthInput = document.createElement('div');
  newMonthInput.innerHTML = `
    <label for="${monthName}">${monthName}:</label>
    <input type="number" class="month-input" id="${monthName}" name="${monthName}" value="0"><br>
  `;

  inputForm.insertBefore(newMonthInput, addMonthButton);
}

function updateFinancialData() {
  financialData = Array.from(document.querySelectorAll('.month-input')).map((input) => ({
    month: input.id,
    expenses: parseInt(input.value),
  }));
}

function updateChart() {
  const labels = financialData.map((entry) => entry.month);
  const expenses = financialData.map((entry) => entry.expenses);

  if (financeChart) {
    financeChart.destroy();
  }

  financeChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Monthly Expenses',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
          data: expenses,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}

let financeChart = createChart();

function createChart() {
  return new Chart(ctx, {
    type: 'bar',
    data: {
      labels: financialData.map((entry) => entry.month),
      datasets: [
        {
          label: 'Monthly Expenses',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
          data: financialData.map((entry) => entry.expenses),
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}
