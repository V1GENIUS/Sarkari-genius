import React from 'react'
import './GovtJobCard.css'
import Image1 from '../Images/image1.webp'

function GovtJobCard() {
  return (
   <>
   <div>
    <div className='GovtJobCard'>
        <div className='GovtJobHeading'>
        <h1>RSLDC Vacancy 2024: आरएसएलडीसी क्लर्क, मैनेजर, P.A. सहित 7 भर्तियां, आवेदन 28 अक्टूबर तक</h1>
        <h6>date and time : Vivek Rathore </h6>

        </div>

        <div  style={{display:'flex'}}>
            <div className='GovtJobImage'>
                <img src={Image1} alt='JobImage' height={190} width={330}></img>

            </div>

            <div className='GovtJobName'>
               <h3>  LTR Teacher Bharti 2024: कर्मचारी चयन आयोग द्वारा सरकारी माध्यमिक विद्यालयों में रिक्त पदों पर नियुक्ति के लिए आवेदन आमंत्रित …</h3>
           

            <button >
              <b> Read More..</b> 
              </button>
            </div>
           
        </div>
        
       
    </div>
   </div>
   </>
  )
}

export default GovtJobCard