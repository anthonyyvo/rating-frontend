import React, { useContext, useEffect, useState } from 'react';
import './final.scss';
import qrd1 from '../../images/frame-d1.png';
import qrd7 from '../../images/frame-d7.png';

import { LangContext } from '../../context/languageContext/langContext';
import { DataContext } from '../../context/dataContext/dataContext';
import { SendDataContext } from '../../context/sendDataContext/SendDataContext';
function Final() {
  const {langs} = useContext(LangContext);
  const {state} = useContext(DataContext);
  const [showQR, setShowQR] = useState(false);
  const {messenger} = useContext(SendDataContext);

useEffect(()=> {
 if (state.rating >3) {
  setShowQR(true);
 };
}, [state])
  return (
    <div className='final'>
        <div className='thank'>
            {langs.lang==="eng" && "THANK YOU FOR YOUR TIME!"}
            {langs.lang==="vi" && "Rất cảm ơn đã dành thời gian!"}
        </div>
        <p>{messenger === "success" ? "Gởi đánh giá thành công" : "Lỗi gởi đánh giá, vui lòng thử lại"}</p>
        {showQR ? (
          <div className='rateGoogle'>
        <p className='title'>
        
        {langs.lang==="eng" && "Can you share it to Google to help the community find the right place?"}
            {langs.lang==="vi" && "Bạn có thể chia sẻ lên Google để giúp cộng đồng tìm kiếm đúng nơi cần tìm?"}
        </p>
            <img src={state.location === 1 ? qrd1 : qrd7} />
        </div>
        ) : undefined }
        
    </div>
  )
}

export default Final