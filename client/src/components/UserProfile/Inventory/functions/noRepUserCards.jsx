export default function (userCards) {
  const notRepeated = [];
  const forSaleCards = [];

  // console.log('usercards', userCards)

  userCards?.forEach((e) => {
    if (!forSaleCards.find((card) => (card.name === e.name)) && !notRepeated.find((card) => (card.name === e.name))) {
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

  // console.log('/////');
  // console.log(newUserCards);

  // let notRepeated =noRuserCards.reduce
  return { notRepeated, forSaleCards };
}