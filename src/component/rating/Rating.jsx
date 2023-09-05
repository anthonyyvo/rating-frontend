import React, { useContext, useEffect, useState } from "react";
import "./rating.scss";
import StarRateIcon from "@mui/icons-material/StarRate";
import { DataContextActions } from "../../context/dataContext/dataContextActions";
import { DataContext } from "../../context/dataContext/dataContext";
import { LangContext } from "../../context/languageContext/langContext";
import { LoginContext } from "../../context/loginContext/Context";
import LoadingSpinner from "../spinner/LoadingSpinner";
import { SendDataContext } from "../../context/sendDataContext/SendDataContext";
import { CurrentContext } from "../../context/currentContext/currentContext";

const Rating = ({ position }) => {
  const [rateScore, setRateScore] = useState(0);
  const [hover, setHover] = useState(0);
  const { dispatch } = useContext(DataContext);
  const { langs } = useContext(LangContext);
  const { state } = useContext(DataContext);
  const { user } = useContext(LoginContext);
  const [isSpinner, setIsSpinner] = useState(false);
  const { handleSendData, messenger } = useContext(SendDataContext);
  const { dispatch: currentDispatch } = useContext(CurrentContext);

  const handleRating = async (score) => {
    if (score === rateScore) {
      setRateScore(0);
      dispatch({
        type: DataContextActions.RATING,
        payload: 0,
      });
      setHover(0);
    } else {
      setRateScore(score);
      dispatch({
        type: DataContextActions.RATING,
        payload: score,
      });
      if (score > 3) {
        const newRating = {
          ...state,
          answer: state.question,
          username: user?.username,
          rating: score,
          phone: null,
        };
        handleSendData(newRating);
      } else {
        currentDispatch({ type: "SET_CURRENT", payload: position });
      }
    }
  };
  const handleHover = (score) => {
    setHover(score);
  };
  useEffect(() => {
    if (messenger === "success") {
      if (rateScore > 3) {
        currentDispatch({ type: "BYPASS", payload: position });
      }
    }
    if (messenger === "loading") {
      setIsSpinner(true);
    } else {
      setIsSpinner(false);
    }
  }, [messenger]);

  return (
    <div className="rating">
      <div className="iconWrap">
        <StarRateIcon
          onClick={() => {
            handleRating(1);
          }}
          className={`icon ${rateScore > 0 ? "active" : ""} ${
            hover > 0 ? "hover" : ""
          }`}
          style={{ fontSize: 60 }}
          onMouseEnter={() => handleHover(1)}
          onMouseLeave={() => handleHover(rateScore)}
        />
        <StarRateIcon
          onClick={() => {
            handleRating(2);
          }}
          className={`icon ${rateScore > 1 ? "active" : ""} ${
            hover > 1 ? "hover" : ""
          }`}
          style={{ fontSize: 60 }}
          onMouseEnter={() => handleHover(2)}
          onMouseLeave={() => handleHover(rateScore)}
        />
        <StarRateIcon
          // onClick={() => { handleRating(3) }}
          className={`icon ${rateScore > 2 ? "active" : ""} ${
            hover > 2 ? "hover" : ""
          }`}
          style={{ fontSize: 60 }}
          onMouseEnter={() => handleHover(3)}
          onMouseLeave={() => handleHover(rateScore)}
        />
        <StarRateIcon
          onClick={() => {
            handleRating(4);
          }}
          className={`icon ${rateScore > 3 ? "active" : ""} ${
            hover > 3 ? "hover" : ""
          }`}
          style={{ fontSize: 60 }}
          onMouseEnter={() => handleHover(4)}
          onMouseLeave={() => handleHover(rateScore)}
        />
        <StarRateIcon
          onClick={() => {
            handleRating(5);
          }}
          className={`icon ${rateScore > 4 ? "active" : ""} ${
            hover > 4 ? "hover" : ""
          }`}
          style={{ fontSize: 60 }}
          onMouseEnter={() => handleHover(5)}
          onMouseLeave={() => handleHover(rateScore)}
        />
      </div>
      <div className="bottom">
        <h2 className="title">
          {langs.lang === "eng" && "Overall, How Many Star You Rating Us?"}
          {langs.lang === "vi" &&
            "Sau cùng, xin bạn đánh giá sao chất lượng cho Eden?"}
        </h2>
        <div>{isSpinner ? <LoadingSpinner /> : null}</div>
        <div className="afterSend">
          {messenger === "error" ? (
            <>
              <p>Lỗi gởi đánh giá, vui lòng thử lại</p>
              <button
                onClick={() => {
                  const newRating = {
                    ...state,
                    username: user?.username,
                    answer: state.question,
                  };
                  handleSendData(newRating);
                }}
              >
                Try Again
              </button>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default Rating;
