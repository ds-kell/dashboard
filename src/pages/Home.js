import React from 'react';
import GetKPIs from '../components/statistical/GetKPIs';
import GetBills from '../components/statistical/GetBills';
import './style.css'
import SaleByYear from '../components/statistical/GetSaleByYear';
import GetBestCustomerByStatus from '../components/statistical/GetBestCustomerByStatus';
import GetBestCustomer from '../components/statistical/GetBestCustomer';
import GetBestProduct from '../components/statistical/GetBestProduct';

class Home extends React.Component {
  render() {
    return (
      <div className='container dashboard-block'>
        <div className='row'>
          <div className='col-md-6'>
            KPIs
            <GetKPIs></GetKPIs>
          </div>
          <div className='col-md-6'>
            Bills
            <GetBills></GetBills>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-6'>
            Sale by year
            <SaleByYear></SaleByYear>
          </div>
          <div className='col-md-6'>

          </div>
        </div>
        <div className='row'>
          Best customer by status
          <div>
            <GetBestCustomerByStatus></GetBestCustomerByStatus>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-6'>
            Best Customer
            <GetBestCustomer></GetBestCustomer>
          </div><div className='col-md-6'>
            <div>Best Product</div>
            <GetBestProduct></GetBestProduct>
          </div>
        </div>
      </div>
    )
  }
}

export default Home;
