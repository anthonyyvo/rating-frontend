import React, { useContext, useState } from "react";
import "./satisfied.scss";
import { LangContext } from "../../context/languageContext/langContext";
import { DataContext } from "../../context/dataContext/dataContext";
import { DataContextActions } from "../../context/dataContext/dataContextActions";
import { CurrentContext } from "../../context/currentContext/currentContext";
import emoji1 from "../../images/emoji/emojiAngry.png";
import emoji2 from "../../images/emoji/emojiSad.png";
import emoji3 from "../../images/emoji/emojiSmile.png";
import emoji4 from "../../images/emoji/emojiHeartEyes.png";
import { QuestionsContext } from "../../context/questionsContext/Context";

function Satisfied({ position }) {
  const { langs } = useContext(LangContext);
  const { dispatch } = useContext(DataContext);
  const [score, setScore] = useState(null);
  const { dispatch: currentDispatch } = useContext(CurrentContext);
  const { state: questionsState } = useContext(QuestionsContext);
  const handleScore = (i) => {
    if (i === score) {
      setScore(null);
    } else {
      setScore(i);
      dispatch({
        type: DataContextActions.SATISFIED,
        payload: i,
      });
      if (i > 2) {
        currentDispatch({ type: "BYPASS", payload: position });
      } else {
        currentDispatch({ type: "SET_CURRENT", payload: position });
      }
    }
  };
  useState(() => {}, []);
  return (
    <div className="satisfied">
      <div className="iconWrap">
        <div className="h-[50px] w-[50px] md:h-[100px] md:w-[100px] shadow-lg rounded-full cursor-pointer ">
          <img
            onClick={() => {
              handleScore(1);
            }}
            src={emoji1}
            alt=""
            className="w-full h-full hover:scale-125 transition-all ease-in-out duration-200"
          />
        </div>
        <div className="h-[50px] w-[50px] md:h-[100px] md:w-[100px] shadow-lg rounded-full cursor-pointer">
          <img
            onClick={() => {
              handleScore(2);
            }}
            src={emoji2}
            alt=""
            className="w-full h-full hover:scale-125 transition-all ease-in-out duration-200"
          />
        </div>
        <div className="h-[50px] w-[50px] md:h-[100px] md:w-[100px] shadow-lg rounded-full cursor-pointer">
          <img
            onClick={() => {
              handleScore(3);
            }}
            src={emoji3}
            alt=""
            className="w-full h-full hover:scale-125 transition-all ease-in-out duration-200"
          />
        </div>
        <div className="h-[50px] w-[50px] md:h-[100px] md:w-[100px] shadow-lg rounded-full cursor-pointer">
          <img
            onClick={() => {
              handleScore(4);
            }}
            src={emoji4}
            alt=""
            className="w-full h-full hover:scale-125 transition-all ease-in-out duration-200"
          />
        </div>
      </div>
      <div className="bottom">
        <h2 className="title">
          {questionsState.questions?.satisfied
            ? ""
            : langs.lang === "vi"
            ? "Bạn có hài lòng với dịch vụ vừa trải nghiệm tại Eden"
            : "How satisfied are you with our services?"}
          {langs.lang === "eng" &&
            questionsState.questions?.satisfied?.questionEng}
          {langs.lang === "vi" && questionsState.questions?.satisfied?.question}
        </h2>
      </div>
    </div>
  );
}

export default Satisfied;
