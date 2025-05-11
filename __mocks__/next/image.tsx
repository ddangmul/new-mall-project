const NextImage = (props) => {
  const { fill, ...rest } = props;
  return <img {...rest} />;
};

export default NextImage;
