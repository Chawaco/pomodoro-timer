import { ReactNode, createContext, useReducer } from "react";
import type {
  SettingStateType,
  SettingActionType,
} from "../@types/CustomTypes";

const initialState = {
  pomodoro: 25,
  shortBreak: 5,
  autoStart: true,
  notification: true,
  sound: false,
};

export const SettingContext = createContext<SettingStateType | any>(
  initialState
);

type Props = {
  children: ReactNode;
};

export const SettingProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <SettingContext.Provider value={{ state, dispatch }}>
      {children}
    </SettingContext.Provider>
  );
};

export const reducer = (
  state: SettingStateType,
  action: SettingActionType
): SettingStateType => {
  switch (action.type) {
    case "SETTING":
      return {
        pomodoro: action.payload.pomodoro,
        shortBreak: action.payload.shortBreak,
        autoStart: action.payload.autoStart,
        notification: action.payload.notification,
        // sound: action.payload.sound,
      };
    default:
      return state;
  }
};
