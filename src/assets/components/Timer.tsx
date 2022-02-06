import { useState, useContext, useEffect } from "react";
import { useInterval } from "../hooks/CustomHooks";
import TimerText from "../components/TimerText";
import Button from "../components/Button";
import {
  TimerTextType,
  ButtonType,
  SettingProviderType,
} from "../@types/CustomTypes";
import { SettingContext } from "../providers/SettingProvider";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";

const NOTIFICATION_TITLE = "message";
const NOTIFICATION_BODY_BREAK = "Now, time to rest!";
const NOTIFICATION_BODY_WORK = "Now, time to work!";

const Timer = () => {
  const { state }: SettingProviderType = useContext(SettingContext);

  const initialCount = state.pomodoro * 60;
  const initialCountBreak = state.shortBreak * 60;

  const [secTotal, setSecTotal] = useState(initialCount);
  const [secRemaining, setSecRemaining] = useState(secTotal);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);

  const secDisplay = secRemaining % 60;
  const minRemaining = (secRemaining - secDisplay) / 60;
  const minDisplay = minRemaining % 60;
  const percentage = 100 - (secRemaining / secTotal) * 100;

  useEffect(() => {
    setSecTotal(initialCount);
    setSecRemaining(initialCount);
  }, [state]);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setIsBreak(false);
    setSecTotal(initialCount);
    setSecRemaining(initialCount);
  };

  const showNotification = (message: string) => {
    let notify = new Notification(NOTIFICATION_TITLE, {
      body: message,
    });
    // Close after 5 sec.
    setTimeout(notify.close.bind(notify), 5000);
  };

  // const playAudio = () => {
  //   const audio = new Audio("file:///path/to/soundfile.mp3");
  //   audio.play();
  // };

  useInterval(
    () => {
      if (secRemaining > 0) {
        setSecRemaining(secRemaining - 1);
      } else {
        if (state.autoStart) {
          setSecTotal(isBreak ? initialCount : initialCountBreak);
          setSecRemaining(isBreak ? initialCount : initialCountBreak);
          if (state.notification) {
            showNotification(
              isBreak ? NOTIFICATION_BODY_WORK : NOTIFICATION_BODY_BREAK
            );
          }
          // if (state.sound) {
          //   playAudio();
          // }
          setIsBreak(!isBreak);
        } else {
          if (state.notification) {
            showNotification(
              isBreak ? NOTIFICATION_BODY_WORK : NOTIFICATION_BODY_BREAK
            );
          }
          // if (state.sound) {
          //   playAudio();
          // }
          setIsRunning(false);
        }
      }
    },
    isRunning ? 1000 : null
  );

  /** TimerText Model */
  const timerTextModel: TimerTextType = {
    minutes: minDisplay,
    seconds: secDisplay,
    className: isBreak ? "timer_text_break" : "timer_text_work",
  };
  /** Button Model */
  const startButtonModel: ButtonType = {
    className: isBreak ? "timer_button_break" : "timer_button_work",
    caption: "Start",
    onButtonClicked: handleStart,
  };
  const stopButtonModel: ButtonType = {
    className: isBreak ? "timer_button_break" : "timer_button_work",
    caption: "Stop",
    onButtonClicked: handleStop,
  };
  const resetButtonModel: ButtonType = {
    className: isBreak ? "timer_button_break" : "timer_button_work",
    caption: "Reset",
    onButtonClicked: handleReset,
  };

  return (
    <div className="container">
      <CircularProgressbarWithChildren
        className={isBreak ? "break" : "work"}
        value={percentage}
      >
        <TimerText model={timerTextModel} />
      </CircularProgressbarWithChildren>
      <div className="button_area">
        {isRunning ? (
          <Button model={stopButtonModel} />
        ) : (
          <Button model={startButtonModel} />
        )}
        <Button model={resetButtonModel} />
      </div>
    </div>
  );
};

export default Timer;
