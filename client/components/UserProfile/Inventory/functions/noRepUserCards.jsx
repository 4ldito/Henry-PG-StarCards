export default function (userCards) {
  const notRepeated = [];
  const forSaleCards = [];

  userCards?.forEach((e) => {
    if (!notRepeated.find((card) => (card.name === e.name)) && !forSaleCards.find((card) => (card.name === e.name))) {
      e.repeat = 1;
      if (e.userCard.statusId === 'active') {
        notRepeated.push(e);
      } else if (e.userCard.statusId === 'onSale') {
        forSaleCards.push(e)
      }
    } else {
      if (e.userCard.statusId === 'active') {
        const repeatedOne = notRepeated.find((card) => (card.name === e.name));
        repeatedOne.repeat++;
      } else if (e.userCard.statusId === 'onSale') {
        const repeatedOne = forSaleCards.find((card) => (card.name === e.name));
        repeatedOne.repeat++;
      }
    }
  });

  // let notRepeated =noRuserCards.reduce
  return { notRepeated, forSaleCards };
}