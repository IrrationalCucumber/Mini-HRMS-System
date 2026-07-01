import { Chip } from "@mui/joy";

const ChipComp = (props) => {
  return (
    <>
      <Chip
        color={props.color}
        onClick={props.onClick}
        size={props.size}
        variant={props.variant}
        startDecorator={props.startDecorator}
      ></Chip>
    </>
  );
};

export default ChipComp;
