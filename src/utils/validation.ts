export const validateMobileNumber = (
  mobile1: string,
  mobile2: string,
  mobile3: string
) => {
  const mobileRegex = /^[0-9]{3}-[0-9]{4}-[0-9]{4}$/;
  const mobileNumber = `${mobile1}-${mobile2}-${mobile3}`;

  return { result: mobileRegex.test(mobileNumber), mobileNumber };
};
