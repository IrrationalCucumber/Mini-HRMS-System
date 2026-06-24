import { Button } from "@mui/joy";
const ButtonComp = (props) => {
  return (
    <>
      <Button
        endDecorator={props.endDecorator}
        startDecorator={props.startDecorator}
        size={props.size}
        variant={props.variant}
        color={props.color}
        onClick={props.onClick}
        sx={props.sx}
        type={props.type}
      >
        {props.content}
      </Button>
    </>
  );
};

export default ButtonComp;
