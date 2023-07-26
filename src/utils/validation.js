export const inputValidation = ({
  latestPrice,
  cryptoAmount,
  totalInrPrice,
  side,
}) => {
  if (latestPrice === "") {
    // window.alert("Latest Price cannot be empty");
    return { status: false, errorMessage: "Latest Price cannot be empty" };
  }
  if (cryptoAmount === "") {
    // window.alert("Coin Amount  cannot be empty");
    return { status: false, errorMessage: "Coin Amount  cannot be empty" };
  }

  if (parseFloat(totalInrPrice) < 100) {
    return { status: false, errorMessage: "INR price should be more than 100" };
  }

  return { status: true, errorMessage: "" };
};

export const formatLastestBuyorSellPrice = ({ price, exchange, amount }) => {
  const modifyPrice = parseFloat(price).toFixed(2);

  if (exchange === "bitcoin") {
    const modifyCoinAmount = parseFloat(amount).toFixed(6);

    return { modifyPrice, modifyCoinAmount };
  }

  if (exchange === "ethereum") {
    const modifyCoinAmount = parseFloat(amount).toFixed(4);

    return { modifyPrice, modifyCoinAmount };
  }

  const modifyCoinAmount = parseFloat(amount).toFixed(3);

  return { modifyPrice, modifyCoinAmount };
};
