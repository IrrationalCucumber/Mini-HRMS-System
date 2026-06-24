import { Typography } from "@mui/joy";

const TitleText = (props) => {
  return (
    <>
      <Typography
        level={props.level}
        fontWeight={props.font}
        fontSize={props.fontSize}
        mb={props.mb}
        noWrap={props.noWrap}
        variant={props.variant}
        color={props.color}
        textAlign={props.textAlign}
        sx={props.sx}
      >
        {props.content}
      </Typography>
    </>
  );
};

export default TitleText;
