import { QuestionsContextActions } from "./Action";

export const QuestionsReducer = (state, action) => {
  switch (action.type) {
    case QuestionsContextActions.GET_QUESTIONS_START:
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case QuestionsContextActions.GET_QUESTIONS_SUCCESS:
      return {
        ...state,
        questions: action.payload,
        isFetching: false,
        error: false,
      };

    default:
      return state;
  }
};
