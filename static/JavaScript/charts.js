// -- INITIALIZATION OF CHARTS ---------------//
const ctx1 = document.getElementById('myChart1').getContext('2d');
const ctx2 = document.getElementById('myChart2').getContext('2d');
const ctx3 = document.getElementById('myChart3').getContext('2d');
const ctx4 = document.getElementById('myChart4').getContext('2d');
const ctx5 = document.getElementById('myChart5').getContext('2d');


const myChart1 = new Chart(ctx1, {
	type: 'bar',
	data: {
		labels: Names,
		datasets: [
			{
				label: 'Medals earned',
				data: Medals,
				backgroundColor: 'rgba(54, 162, 235, 0.6)', // Specify the bar color
				borderColor: 'rgba(54, 162, 235, 1)', // Specify the border color
				borderWidth: 1, // Set the border width
			},
		],
	},
	options: {
		indexAxis: 'y',
		maintainAspectRatio: false,
		responsive: false,
		layout: {
			padding: {
				top: 15,
			}
		},
		plugins: {
			title: {
				display: true,
				text: "Top Olympic Medal Winners In India",
				font: {
					size: window.innerWidth < 401 ? 16 : 20,
					weight: 'bold',
				},
			},
			legend: {
				display: false, // Hide the legend in this case
			},
		},
		scales: {
			x: {
				grid: {
					display: false, // Hide the x-axis grid lines
				},
				ticks: {
					font: {
						size: window.innerWidth < 401 ? 11 : 14,
					},
				},
			},
			y: {
				ticks: {
					font: {
						size: window.innerWidth < 401 ? 8 : 10,
					},
				},
			},
		},
	}
});

const myChart2 = new Chart(ctx2, {
	type: 'doughnut',
	data: {
		labels: ['Gold', 'Silver', 'Bronze'],
		datasets: [
			{
				data: [Gold, Silver, Bronze],
				backgroundColor: ['#FFD700', '#C0C0C0', '#CD7F32'],
				borderWidth: 0, // Remove the border around the chart
			},
		],
	},
	options: {
		maintainAspectRatio: false,
		responsive: false,
		plugins: {
			title: {
				display: true,
				text: "Medals Won By India",
				font: {
					size: 20,
					weight: 'bold'
				},
			},
			legend: {
				display: true,
				position: 'bottom', // Position the legend at the bottom
				labels: {
					font: {
						size: 14,
						weight: 'bold'
					}
				}
			},
		},
	},
});

const myChart3 = new Chart(ctx3, {
	type: 'bar',
	data: {
		labels: ["Male", "Female"],
		datasets: [
			{
				label: 'Participants',
				data: [M_count, F_count],
				backgroundColor: 'rgba(54, 162, 235, 0.6)', // Specify the bar color
				borderColor: 'rgba(54, 162, 235, 1)', // Specify the border color
				borderWidth: 1, // Set the border width
			}
		],
	},
	options: {
		indexAxis: 'y',
		maintainAspectRatio: false,
		responsive: false,
		layout: {
			padding: {
				top: 15,
			}
		},
		plugins: {
			title: {
				display: true,
				text: "Olympic Participants From India",
				font: {
					size: window.innerWidth < 401 ? 16 : 20,
					weight: 'bold',
				},
			},
			legend: {
				display: false, // Hide the legend in this case
			},
		},
		scales: {
			x: {
				grid: {
					display: false, // Hide the x-axis grid lines
				},
				ticks: {
					font: {
						size: window.innerWidth < 401 ? 11 : 14,
					},
				},
			},
			y: {
				ticks: {
					font: {
						size: window.innerWidth < 401 ? 8 : 10,
					},
				},
			},
		},
	}
});

const myChart4 = new Chart(ctx4, {
	type: 'line',
	data: {
		labels: Avg_ahw_labels,
		datasets: [
			{
				data: Avg_a,
				borderColor: 'blue',
				fill: false,
			},
		],
	},
	options: {
		maintainAspectRatio: false,
		responsive: false,
		scales: {
			y: {
				title: {
					display: true,
					text: 'Average Age Of Players',
					font: {
						size: window.innerWidth < 401 ? 11 : 14,
						weight: 'bold'
					}
				},
				ticks: {
					stepSize: 5, // Set the step size to 5 units
					beginAtZero: true, // Start the y-axis from zero
				}
			},
		},
		plugins: {
			legend: {
				display: false,
			}
		}
	}
});

const myChart5 = new Chart(ctx5, {
	type: 'bar',
	data: {
		labels: Cities,
		datasets: [
			{
				label: 'Matches',
				data: Matches,
				backgroundColor: 'rgba(54, 162, 235, 0.6)',
				borderColor: 'rgba(54, 162, 235, 1)',
				borderWidth: 1,
			},
		],
	},
	options: {
		maintainAspectRatio: false,
		responsive: false,
		scales: {
			x: {
				title: {
					display: false,
				},
				grid: {
					display: false, // Hide grid lines for the x-axis
				},
			},
			y: {
				title: {
					display: true,
					text: 'Number Of Matches',
					font: {
						size: window.innerWidth < 401 ? 11 : 14,
						weight: 'bold'
					}
				},
				ticks: {
					beginAtZero: true,
					stepSize: 25,
				},
			},
		},
		plugins: {
			title: {
				display: true,
				text: "Number Of Matches In Each City",
				font: {
					size: window.innerWidth < 401 ? 16 : 20,
				},
			},
			legend: {
				display: false, // Hide the legend
			},
		},
	}
});


// -- FUNCTION TO UPDATE CHARTS ---------------
function updateChart(chart, dataObj, attribute) {
	chart.data.labels = dataObj['labels'];
	chart.data.datasets[0].data = dataObj['values'];
	console.log(attribute)
	// Modify chart properties here (myChart4)
	if (attribute === "Age") {
		chart.options.scales.y.title.text = "Average Age of Players";
		chart.data.datasets[0].borderColor = "blue";
	} else if (attribute === "Weight") {
		chart.options.scales.y.title.text = "Average Weight of Players";
		chart.data.datasets[0].borderColor = "green";
	} else if (attribute === "Height") {
		chart.options.scales.y.title.text = "Average Height of Players";
		chart.data.datasets[0].borderColor = "red";
	}

	chart.update();
}

// Event listener for the "Age" button
document.getElementById("btnAge").addEventListener("click", function () {
	// Change the background color of the clicked button
	this.style.backgroundColor = "aqua";
	// Reset the background color of other buttons (if needed)
	document.getElementById("btnWeight").style.backgroundColor = "white";
	document.getElementById("btnHeight").style.backgroundColor = "white";
	dataObj = {
		'labels': Avg_ahw_labels,
		'values': Avg_a
	}
    updateChart(myChart4, dataObj, "Age"); // Call a function to update the line chart data for Age
});

// Event listener for the "Weight" button
document.getElementById("btnWeight").addEventListener("click", function () {
	// Change the background color of the clicked button
	this.style.backgroundColor = "lightgreen";
	// Reset the background color of other buttons (if needed)
	document.getElementById("btnAge").style.backgroundColor = "white";
	document.getElementById("btnHeight").style.backgroundColor = "white";
    dataObj = {
		'labels': Avg_ahw_labels,
		'values': Avg_w
	}
    updateChart(myChart4, dataObj, "Weight"); // Call a function to update the line chart data for Weight
});

// Event listener for the "Height" button
document.getElementById("btnHeight").addEventListener("click", function () {
	// Change the background color of the clicked button
	this.style.backgroundColor = "salmon";
	// Reset the background color of other buttons (if needed)
	document.getElementById("btnWeight").style.backgroundColor = "white";
	document.getElementById("btnAge").style.backgroundColor = "white";
    dataObj = {
		'labels': Avg_ahw_labels,
		'values': Avg_h
	}
    updateChart(myChart4, dataObj, "Height"); // Call a function to update the line chart data for Height
});
