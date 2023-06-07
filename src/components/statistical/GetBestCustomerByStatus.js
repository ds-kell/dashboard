import React, { useState } from 'react';
import axios from 'axios';
import * as d3 from 'd3';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
function BestCustomerByStatus() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [status, setStatus] = useState('');
  const [result, setResult] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestData = {
      endDate: new Date(endDate).toISOString(),
      startDate: new Date(startDate).toISOString(),
      status: status,
    };

    axios
      .post('http://localhost:8081/api/admin/statistical/best-customer', requestData)
      .then((response) => {
        console.log(response.data.data);
        setResult(response.data.data);
        drawChart(response.data.data);
      })
      .catch((error) => {
        console.error(error);
        setResult(null);
      });
  };

  const drawChart = (data) => {
    const containerWidth = 500;
    const containerHeight = 400;
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const chartWidth = containerWidth - margin.left - margin.right;
    const chartHeight = containerHeight - margin.top - margin.bottom;

    const svg = d3
      .select('#chart-container')
      .append('svg')
      .attr('width', containerWidth)
      .attr('height', containerHeight)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const xScale = d3
      .scaleBand()
      .domain(Object.keys(data))
      .range([0, chartWidth])
      .padding(0.1);

    const yScale = d3.scaleLinear().domain([0, d3.max(Object.values(data))]).range([chartHeight, 0]);

    svg
      .append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0,${chartHeight})`)
      .call(d3.axisBottom(xScale));

    svg.append('g').attr('class', 'y-axis').call(d3.axisLeft(yScale));

    svg
      .selectAll('.bar')
      .data(Object.entries(data))
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (d) => xScale(d[0]))
      .attr('y', (d) => yScale(d[1]))
      .attr('width', xScale.bandwidth())
      .attr('height', (d) => chartHeight - yScale(d[1]))
      .attr('fill', 'steelblue');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Start Date:
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </label>
        <br />
        <label>
          End Date:
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </label>
        <br />
        <label>
          Status:
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="">All</option>
            <option value="PENDING">Pending</option>
            <option value="SHIPPING">Shipping</option>
            <option value="DONE">Done</option>
            <option value="CANCELED">Canceled</option>
          </select>
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>

      {result && (
        <BarChart width={500} height={400} data={Object.entries(result)}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="0" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="1" fill="steelblue" />
        </BarChart>
      )}
    </div>
  );
}

export default BestCustomerByStatus;
