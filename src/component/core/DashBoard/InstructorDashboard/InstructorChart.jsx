import React, { useState, useMemo } from 'react';
import { Chart, registerables } from 'chart.js';
import { Pie } from 'react-chartjs-2';

Chart.register(...registerables);

const InstructorChart = ({ courses }) => {
  const [currChart, setCurrChart] = useState('students');

  // Generate consistent colors once
  const colorPalette = useMemo(() => {
    return courses.map(() => 
      `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`
    );
  }, [courses]);

  const chartData = useMemo(() => {
    return {
      labels: courses.map(course => course.courseName),
      datasets: [
        {
          data: courses.map(course =>
            currChart === 'students'
              ? course.totalStudentsEnrolled
              : course.totalAmountGenerated
          ),
          backgroundColor: colorPalette,
        },
      ],
    };
  }, [courses, currChart, colorPalette]);

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allows custom sizing
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#fff',
        },
      },
    },
    animation: {
      duration: 800,
      easing: 'easeInOutQuart',
    },
  };

  return (
    <div className="bg-richblack-800 text-white p-6 min-w-[500px] rounded-2xl flex flex-col items-center justify-center shadow-lg w-fit max-w-2xl mx-auto">
      <p className="text-xl font-semibold mb-4">Visualize Course Stats</p>

      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setCurrChart('students')}
          className={`px-4 py-2 rounded-md transition-all duration-300 ${
            currChart === 'students'
              ? 'bg-yellow-500 text-black'
              : 'bg-richblack-700 hover:bg-richblack-600'
          }`}
        >
          Students
        </button>

        <button
          onClick={() => setCurrChart('income')}
          className={`px-4 py-2 rounded-md transition-all duration-300 ${
            currChart === 'income'
              ? 'bg-yellow-500 text-black'
              : 'bg-richblack-700 hover:bg-richblack-600'
          }`}
        >
          Income
        </button>
      </div>

      {/* Fixed-size chart container */}
      <div className="h-[400px] w-fit animate-fade-in transition-opacity duration-500">
        <Pie data={chartData} options={options} />
      </div>
    </div>
  );
};

export default InstructorChart;
