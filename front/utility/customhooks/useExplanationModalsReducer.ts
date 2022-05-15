import { Dispatch, useReducer } from "react";

type TState = {
  loadingImage: boolean;
  useGreenPin: boolean;
  useOyuzuri: boolean;
};

type TAction = {
  type: "setAllClose" | "setModal";
  payload?: {
    [key in keyof TState]?: boolean;
  };
};

const initialState = {
  loadingImage: false,
  useGreenPin: false,
  useOyuzuri: false,
};

const dispatchFuc = (state: TState, action: TAction): TState => {
  switch (action.type) {
    case "setAllClose":
      return initialState;
    case "setModal":
      return {
        ...initialState,
        ...action.payload,
      };
    default:
      return state;
  }
};

const useExplanationModalsReducer = (): [TState, Dispatch<TAction>] => {
  const [state, dispatch] = useReducer(dispatchFuc, initialState);
  return [state, dispatch];
};
export default useExplanationModalsReducer;
