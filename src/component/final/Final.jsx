import React, { useContext, useEffect, useState } from "react";
import "./final.scss";
import qrd1 from "../../images/frame-d1.png";
import qrd7 from "../../images/frame-d7.png";

import { LangContext } from "../../context/languageContext/langContext";
import { DataContext } from "../../context/dataContext/dataContext";
import { SendDataContext } from "../../context/sendDataContext/SendDataContext";

function Final() {
  const { langs } = useContext(LangContext);
  const { state } = useContext(DataContext);
  const [showQR, setShowQR] = useState(false);
  const { messenger } = useContext(SendDataContext);

  useEffect(() => {
    if (state.satisfied > 2 && state.likely > 8) {
      setShowQR(true);
    }
  }, [state]);
  return (
    <div className="final">
      <div className="thank">
        {langs.lang === "eng" && "THANK YOU FOR YOUR TIME!"}
        {langs.lang === "vi" && "CẢM ƠN BẠN ĐÃ DÀNH THỜI GIAN!"}
      </div>
      <div className="gift">
        {langs.lang === "eng" && "Please contact reception to receive a small sincere gift from Eden!"}
        {langs.lang === "vi" &&
          "Xin liên hệ lễ tân để nhận món quà nhỏ chân thành từ Eden!"}
      </div>

      {showQR ? (
        <div className="rateGoogle">
          <p className="title">
            {langs.lang === "eng" &&
              "Can you share it to Google to help the community find the right place?"}
            {langs.lang === "vi" &&
              "Bạn có thể vui lòng chia sẻ đánh giá này lên Google để giúp cộng đồng không?"}
          </p>
          <img src={state.location === 1 ? qrd1 : qrd7} />
        </div>
      ) : undefined}
      <p>
        {messenger === "success"
          ? "Gởi đánh giá thành công"
          : "Lỗi gởi đánh giá, vui lòng thử lại"}
      </p>
      {/* <button onClick={()=> {
            window.location.replace(process.env.REACT_APP_SITE_URL);
        }} className='ratingAgain'>Start Again</button> */}
    </div>
  );
}

export default Final;
