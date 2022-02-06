import type { ButtonType } from "../@types/CustomTypes";

type Props = {
  model: ButtonType;
};

const Button = ({ model }: Props) => {
  return (
    <input
      type="button"
      className={"btn " + model.className}
      value={model.caption}
      onClick={model.onButtonClicked}
    />
  );
};

export default Button;
