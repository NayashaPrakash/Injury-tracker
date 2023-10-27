import React, { useEffect, useState, useContext } from 'react';
import AuthContext from 'app/contexts/AuthContext';
import { Bar, Doughnut } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { Margin } from '@mui/icons-material';

const Analytics = () => {
  const { forms, getForms } = useContext(AuthContext);
  const [formsArray, setFormsArray] = useState([]);
  const [reportData, setReportData] = useState({
    dates: [],
    counts: []
  });
  //
  useEffect(() => {
    getForms();
  }, []);

  useEffect(() => {
    if (forms) {
      const formsArray = Object.keys(forms).map((key) => forms[key]);
      setFormsArray(formsArray);

      // Calculate the count of reports for each date
      const reportCountsByDate = formsArray[0].reduce((counts, form) => {
        const date = form.date.split('T')[0]; // Extract the date part
        if (date) {
          if (date in counts) {
            counts[date]++;
          } else {
            counts[date] = 1;
          }
        }
        return counts;
      }, {});

      // Sort the dates
      const sortedDates = Object.keys(reportCountsByDate).sort();

      // Extract the dates and their report counts
      const dates = sortedDates;
      const counts = dates.map((date) => reportCountsByDate[date]);

      setReportData({
        dates,
        counts
      });
    }
  }, [forms]);

  const data = {
    labels: reportData.dates,
    datasets: [
      {
        label: 'Number of Reports',
        data: reportData.counts,
        backgroundColor: 'blue'
      }
    ]
  };
  const options = {
    plugins: {
      legend: {
        display: false
      },
      scales: {
        x: {
          type: 'category',
          offset: true
        }
      }
    }
  };
  const doughnutData = {
    labels: reportData.dates,
    datasets: [
      {
        data: reportData.counts,
        backgroundColor: 'green' // Set the color to green
      }
    ]
  };

  const doughnutOptions = {
    plugins: {
      legend: {
        display: false
      }
    }
  };

  return (
    <div>
      <h3 style={{ marginLeft: 300 }}>Report Count by Date</h3>
      {reportData.dates.length > 0 ? (
        <div style={{ marginLeft: 300 }}>
          <div style={{ width: '600px', height: '600px' }}>
            <Bar data={data} options={options} />
            <h3 style={{ marginTop: 100 }}>Doughnut representation of the report: </h3>
            <Doughnut data={doughnutData} options={doughnutOptions} />
          </div>
        </div>
      ) : (
        <p>No reports available</p>
      )}
    </div>
  );
};
export default Analytics;
