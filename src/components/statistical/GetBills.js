import React, { useEffect, useRef } from 'react';
import axios from 'axios';
import * as d3 from 'd3';

function GetBills() {
  const chartRef = useRef(null);

  useEffect(() => {
    axios
      .get('http://localhost:8081/api/admin/statistical/kpi')
      .then((response) => {
        console.log(response.data.data);
        drawChart(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const drawChart = (bills) => {
    const chartContainer = d3.select(chartRef.current);

    const chartWidth = 600;
    const chartHeight = 400;
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const width = chartWidth - margin.left - margin.right;
    const height = chartHeight - margin.top - margin.bottom;

    chartContainer.select('svg').remove();

    const svg = chartContainer
      .append('svg')
      .attr('width', chartWidth)
      .attr('height', chartHeight)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const data = Object.entries(bills);

    const xScale = d3
      .scaleBand()
      .domain(data.map((d) => d[0]))
      .range([0, width])
      .padding(0.2);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(Object.values(bills))])
      .range([height, 0]);

    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    svg
      .append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0,${height})`)
      .call(xAxis);

    svg.append('g').attr('class', 'y-axis').call(yAxis);

    svg
      .selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (d) => xScale(d[0]))
      .attr('y', (d) => yScale(d[1]))
      .attr('width', xScale.bandwidth())
      .attr('height', (d) => height - yScale(d[1]))
      .attr('fill', 'steelblue');
  };

  return <div ref={chartRef}></div>;
}

export default GetBills;
