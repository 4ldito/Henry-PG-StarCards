export default function (userCards) {
  let notRepeated = [];
  userCards?.forEach((e) => {
    if (!notRepeated.find((card) => card.name === e.name)) {
      e.repeat = 1;
      notRepeated.push(e);
    } else {
      const repeatedOne = notRepeated.find((card) => card.name === e.name);
      repeatedOne.repeat++;
    }
  });

  // let notRepeated =noRuserCards.reduce
  return notRepeated;
}
