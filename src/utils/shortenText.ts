function shortenText(text: string, words: number) {
  return text.split(' ').slice(0, words).join(' ')
}

export default shortenText
