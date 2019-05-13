export const range = (x, y = 1) => {
  if (x > y) {
    return range(y, x).reverse()
  }

  if (x === y) {
    return [y]
  }

  return [x, ...range(x + 1, y)]
}

export default range
