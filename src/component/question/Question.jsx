import React, {
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  DataContext,
} from "../../context/dataContext/dataContext";
import { LangContext } from "../../context/languageContext/langContext";
import "./question.scss";
import { CurrentContext } from "../../context/currentContext/currentContext";
import { SendDataContext } from "../../context/sendDataContext/SendDataContext";
import { LoginContext } from "../../context/loginContext/Context";
import { QuestionsContext } from "../../context/questionsContext/Context";

function Question({ position, haveButton = true }) {
  const { dispatch } = useContext(DataContext);
  const { state } = useContext(DataContext);
  const { langs } = useContext(LangContext);
  const { current, dispatch: currentDispatch } = useContext(CurrentContext);
  const { handleSendData, messenger } = useContext(SendDataContext);
  const [isSpinner, setIsSpinner] = useState(false);
  const { state: questionsState } = useContext(QuestionsContext);

  const inputRef = useRef();
  const { user } = useContext(LoginContext);

  const handleSendRating = async () => {
    const answer = inputRef.current.value;
    const newRating = {
      ...state,
      answer: answer,
      username: user?.username,
      phone: null,
    };
    handleSendData(newRating);
  };

  useEffect(() => {
    if (messenger === "success") {
      if (true) {
        currentDispatch({ type: "FORWARD", payload: position });
      }
    }
    if (messenger === "loading") {
      setIsSpinner(true);
    } else {
      setIsSpinner(false);
    }
  }, [messenger]);
  return (
    <div className="question">
      <div className="header">
        <h2>
          {questionsState.questions?.question2
            ? ""
            : langs.lang === "vi"
            ? "EDEN có thể làm gì để phục vụ tốt hơn cho bạn?"
            : "What can EDEN do to better serve your needs?"}

          {langs.lang === "eng" &&
            questionsState.questions?.question2?.questionEng}
          {langs.lang === "vi" && questionsState.questions?.question2?.question}
        </h2>
      </div>
      <div className="body">
        <textarea
          ref={inputRef}
          id="answerText"
          placeholder={langs.lang === "eng" ? "Feedback..." : "Góp ý..."}
          onChange={(e) =>
            dispatch({ type: "QUESTION", payload: e.target.value })
          }
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              handleSendRating();
              inputRef.current.blur();
            }
          }}
        ></textarea>
        <h2 className="py-2">
          {langs.lang === "vi"
            ? "Bạn có thể chia sẻ thêm hoặc bấm "
            : "You can share more or click "}
          &darr;
        </h2>
        {haveButton && (
          <button
            className="nextButton bg-blue-800"
            onClick={() => {
              handleSendRating();
            }}
          >
            {langs.lang === "eng" && "FINISH"}
            {langs.lang === "vi" && "HOÀN THÀNH Đánh Giá"}
          </button>
        )}

        {messenger === "error" ? <p>LOI GOI DANH GIA</p> : ""}
      </div>
    </div>
  );
}

export default Question;
