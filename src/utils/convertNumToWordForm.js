const convertNumToWordForm = (i, textForms) => {
  const [one, many] = textForms;
  if (i === 1) return one;
  return many;
};

export default convertNumToWordForm;
