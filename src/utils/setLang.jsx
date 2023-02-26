import { useContext } from "react";
import { LangContext } from "../context/languageContext/langContext";

export  const useSetLang = (type) => {
  const {dispatch} = useContext(LangContext);
  dispatch({type: type})
}