const decimal2JSON = (v, i, prev) => {
  if (v !== null && typeof v === `object`) {
    if (v.constructor.name === `Decimal128`) prev[i] = v.toString()
    else
      Object.entries(v).forEach(([key, value]) =>
        decimal2JSON(value, key, prev ? prev[i] : v)
      )
  }
}

function grabatixProductFromQuickbooksImport(product) {
  return {
    productId: product.Id,
    isActive: false,
    displayLabel: product.Name,
    description: ``,
    useOptions: { maxUses: 1 },
    eventOptions: null,
    pricePoints: [
      {
        price: product.UnitPrice,
        minQuantity: 0,
        maxQuantity: Number.POSITIVE_INFINITY,
      },
    ],
    discounts: [],
    images: {},
  }
}

module.exports = {
  decimal2JSON,
  grabatixProductFromQuickbooksImport,
}
