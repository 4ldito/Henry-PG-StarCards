function shuffle(array) {
  // Starts from last element
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex !== 0) {
    // Random index between 0 and currentIndex
    randomIndex = Math.floor(Math.random() * currentIndex);

    // Decrease currentIndex each time current element is exhanged with a random one
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

function battle(atk, def) {
  const rounds = {};

  

}

function gameFunction(deck1, deck2) {
  const [atk1, atk2, def1, def2] = [
    shuffle(
      deck1.length % 2 === 0
        ? deck1.map((c, i) => {
            if (i < deck1.length / 2) return c;
          })
        : deck1.map((c, i) => {
            if (i <= deck1.length / 2) return c;
          })
    ),
    shuffle(
      deck2.length % 2 === 0
        ? deck2.map((c, i) => {
            if (i < deck2.length / 2) return c;
          })
        : deck2.map((c, i) => {
            if (i <= deck2.length / 2) return c;
          })
    ),
    shuffle(
      deck1.length % 2 === 0
        ? deck1.map((c, i) => {
            if (i >= deck1.length / 2) return c;
          })
        : deck1.map((c, i) => {
            if (i > deck1.length / 2) return c;
          })
    ),
    shuffle(
      deck2.length % 2 === 0
        ? deck2.map((c, i) => {
            if (i >= deck2.length / 2) return c;
          })
        : deck2.map((c, i) => {
            if (i > deck2.length / 2) return c;
          })
    ),
  ];

  battle(atk1, def2);
  battle(atk2, def1);

  return {};
}

module.exports = gameFunction;
