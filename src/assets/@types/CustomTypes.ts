export type SettingStateType = {
  pomodoro: number;
  shortBreak: number;
  autoStart: boolean;
  notification: boolean;
  // sound: boolean;
};

export type SettingActionType = {
  type: "SETTING";
  payload: {
    pomodoro: number;
    shortBreak: number;
    autoStart: boolean;
    notification: boolean;
    // sound: boolean;
  };
};

export type SettingProviderType = {
  state: SettingStateType;
  dispatch: React.Dispatch<SettingActionType>;
};

export type TimerTextType = {
  minutes: number;
  seconds: number;
  className: string;
};

export type ButtonType = {
  className: string;
  caption: string;
  onButtonClicked: (event: React.MouseEvent<HTMLInputElement>) => void;
};
