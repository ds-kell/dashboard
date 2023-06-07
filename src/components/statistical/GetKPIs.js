import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import * as d3 from 'd3';

let config = {};

function GetKPIs() {
  const [KPIs, setKPIs] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:8081/api/admin/statistical/kpi', config)
      .then((response) => {
        console.log(response.data.data);
        setKPIs(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <BarChart width={600} height={400} data={Object.entries(KPIs)}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="0" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="1" fill="#8884d8" barSize={40} />
      </BarChart>
    </div>
  );
}

export default GetKPIs;
