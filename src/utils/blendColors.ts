function blendColors(bottomColor: string, topColor: string) {
  const bottom = parseHex(bottomColor)
  const top = parseHex(topColor)

  const blended = {
    r: (1 - top.a) * bottom.r + top.a * top.r,
    g: (1 - top.a) * bottom.g + top.a * top.g,
    b: (1 - top.a) * bottom.b + top.a * top.b,
    a: 1,
  }

  const blendedHex = '#' + toHex(blended.r) + toHex(blended.g) + toHex(blended.b)

  return blendedHex
}

function toHex(value: number) {
  return Math.round(value).toString(16).padStart(2, '0')
}

function parseHex(hex: string) {
  return {
    r: parseInt(hex.substring(1, 3), 16),
    g: parseInt(hex.substring(3, 5), 16),
    b: parseInt(hex.substring(5, 7), 16),
    a: parseInt(hex.substring(7, 9), 16) / 255 || 1,
  }
}

export default blendColors
