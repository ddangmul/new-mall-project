const NextImage = (props: any) => {
  const { fill, ...rest } = props;
  return <img {...rest} />;
};

export default NextImage;
