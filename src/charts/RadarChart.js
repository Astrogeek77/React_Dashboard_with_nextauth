import React from 'react'
import { PolarArea, Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS } from 'chart.js/auto'

function RadarChart({ chartData }) {
  return <Doughnut data={chartData} />
}

export default RadarChart
