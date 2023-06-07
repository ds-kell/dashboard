import React from 'react';
import GetKPIs from '../components/statistical/GetKPIs';
import GetBills from '../components/statistical/GetBills';
import './style.css'
import SaleByYear from '../components/statistical/GetSaleByYear';
import BestCustomerByStatus from '../components/statistical/GetBestCustomerByStatus';
import BestCustomer from '../components/statistical/GetBestCustomer';

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
        <div className='row'>
          <div className='col-md-6'>
            <div>Sale by year</div>
            <SaleByYear></SaleByYear>
          </div>
          <div className='col-md-6'>

          </div>
        </div>
        <div className='row'>
          <div>Best customer by status</div>
          <div>
            <BestCustomerByStatus></BestCustomerByStatus>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-6'>
            <div>Best Customer</div>

          </div><div className='col-md-6'>
            <div>Best Product</div>

          </div>
        </div>
      </div>
    )
  }
}

export default Home;
