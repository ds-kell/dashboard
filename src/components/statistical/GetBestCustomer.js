import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

function BestCustomer() {
  const [year, setYear] = useState('');
  const [bestCustomer, setBestCustomer] = useState([]);

  const fetchData = () => {
    axios
      .get(`http://localhost:8081/api/admin/statistical/best-customer/${year}`)
      .then((response) => {
        console.log(response.data.data);
        setBestCustomer(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    if (year !== '') {
      fetchData();
    }
  }, [year]);

  const handleYearChange = (e) => {
    setYear(e.target.value);
  };

  return (
    <div>
      <label>
        Year:
        <input type="text" value={year} onChange={handleYearChange} />
      </label>
      <button onClick={fetchData}>Fetch Data</button>

      {BestCustomer.length > 0 && (
        <BarChart width={600} height={400} data={Object.entries(bestCustomer)}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="0" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="1" fill="#8884d8" barSize={40} />
        </BarChart>
      )}
    </div>
  );
}

export default BestCustomer;
