import type { TimerTextType } from "../@types/CustomTypes";

interface Props {
  model: TimerTextType;
}

const TimerText = ({ model }: Props) => {
  const zeroPadding = (num: number, len: number) => {
    return String(num).padStart(len, "0");
  };

  return (
    <span className={model.className}>
      {zeroPadding(model.minutes, 2)}:{zeroPadding(model.seconds, 2)}
    </span>
  );
};

export default TimerText;
