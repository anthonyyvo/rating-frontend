import React, { useContext, useEffect, useState } from "react";
import "./choosing.scss";
import { LangContext } from "../../context/languageContext/langContext";
import { DataContext } from "../../context/dataContext/dataContext";
import { CurrentContext } from "../../context/currentContext/currentContext";
import { QuestionsContext } from "../../context/questionsContext/Context";
const chooseData = [
  { id: 1, name: "Bác Sĩ", value: "doctor", nameEng: "Doctor" },
  { id: 2, name: "Phụ Tá", value: "nurse", nameEng: "Doctor" },
  { id: 3, name: "Lễ Tân", value: "receptionist", nameEng: "Doctor" },
  { id: 4, name: "CSKH", value: "customer-service", nameEng: "Doctor" },
  { id: 5, name: "Bảo Vệ", value: "security", nameEng: "Doctor" },
  { id: 6, name: "Khác", value: "another", nameEng: "Doctor" },
];
const chooseLang = {
    question : {
      eng: "Which of the following words would you use to describe our product?",
      vi: "Vị trí nào mà theo bạn chúng tôi cần cải thiện?"
    },
    button : {
      eng: "Send",
      vi: "Gởi đi"
    }
  }

const Choosing = ({position}) => {
  const { langs } = useContext(LangContext);
  const { dispatch } = useContext(DataContext);
  const [checkArray, setCheckArray] = useState([]);
  const { state } = useContext(DataContext);
  const {current, dispatch: currentDispatch} = useContext(CurrentContext);
  const {state: questionsState } = useContext(QuestionsContext);
  const [selectData, setSelectData] = useState([]);

  const handleSend =  () => {
    dispatch({type: 'POSITION', payload: checkArray});
    currentDispatch({type: "BYPASS", payload: position});
  }
  const handleChecked = (e) => {
    const newCheck = e.target.value;
    if (e.target.checked) {
      if (checkArray.length) {
        if (!checkArray.includes(newCheck)) {
          setCheckArray([...checkArray, newCheck])
        }
      } else {
        setCheckArray([...checkArray, newCheck])
      }      
    } 
    if (!e.target.checked) {
      setCheckArray(checkArray.filter(item => item !== newCheck ))
    }
  }

  useEffect(() => {
    dispatch({type: 'POSITION', payload: checkArray});
  }, [checkArray]);

useEffect(()=> {
  setSelectData(questionsState.questions?.question1?.options);
}, [questionsState.questions])
  return (
    <div className="flex flex-col gap-4 px-4">
      <h2 className="text-xl font-bold mb-4">
      {/* {langs.lang === "eng" ? questionsState.questions?.question1?.questionEng : questionsState.questions?.question1?.question} */}
      {questionsState.questions?.question1 ? '' : ( langs.lang==="vi" ? "Bạn có sẵn lòng giới thiệu Eden cho bạn bè hoặc đồng nghiệp?" : "How likely is it that you would recommend EDEN clinic to a friend or colleague?")}

            {langs.lang==="eng" && (questionsState.questions?.question1?.questionEng)}
            {langs.lang==="vi" && (questionsState.questions?.question1?.question)}
      </h2>
      {/* SELECT SECTION */}

      <div className="flex flex-col">
        {/* COL 1 */}
        <div className="choosing-checkbox h-1/2 flex-wrap gap-4 flex">
          {selectData?.map((item, index) => (
            <label key={index} className="check-container min-w-[200px]">
              <input
                type="checkbox"
                id={index}
                name={item}
                value={item}
                onChange={(e) => handleChecked(e)}
              ></input>
              <span className="checkmark"></span>
              <span className="label">{langs.lang === "vi" ? item  : questionsState.questions?.question1?.optionsEng[index]}</span>
            </label>
          ))}
        </div>

        <div className="flex justify-center items-center mt-4">
            <button  className="px-6 py-2 bg-blue-800 rounded cursor-pointer"
              onClick={handleSend}
            >
              {langs.lang === "eng" ? chooseLang.button.eng : chooseLang.button.vi}
              </button>
        </div>
      </div>
    </div>
  );
};

export default Choosing;
