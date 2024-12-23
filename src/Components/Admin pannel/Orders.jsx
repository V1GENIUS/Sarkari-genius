import React from 'react'
import Sidebar from './Sidebar'

function Orders() {
  return (
    <>
    <div className='revenue'>
        <Sidebar/>
        <div>
          <div className='rev_head'>
              <h1>Welcome Vivek</h1>
          </div>
          <div style={{display:'flex'}}>
            <div className='earn_box'>
              

              <div className='earn_items'>
                <div>
                <h4>
                  Today's
                </h4>
                <h2 style={{paddingTop:'20px'}}>
                  <b>Rs.</b> 5
                </h2>

                </div>
                <div>
                <h4>
                Last Month's
                </h4>
                <h2 style={{paddingTop:'20px'}}>
                  <b>Rs.</b> 15
                </h2>

                </div>
                <div>
                <h4>
                Total Orders
                </h4>
                <h2 style={{paddingTop:'20px'}}>
                  <b>Rs.</b> 105
                </h2>

                </div>

              </div>
              <div className='earning_summary'>
            
            </div>

            </div>
            <div className='earn_circle'>

            </div>

          </div>
          

         

          

        </div>
    </div>
    </>
  )
}

export default Orders