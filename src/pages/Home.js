import React from 'react';
import GetKPIs from '../components/statistical/GetKPIs';
import GetBills from '../components/statistical/GetBills';
import './style.css'
class Home extends React.Component {
  render() {
    return (
      <div className='container dashboard-block'>
        <div className='row'>
          <div className='col-md-6'>
            <GetKPIs></GetKPIs>
          </div>
          <div className='col-md-6'>
            <GetBills></GetBills>
          </div>

        </div>

      </div>
    )
  }
}

export default Home;
