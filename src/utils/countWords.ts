function countWords(text: string) {
  var cleanText = text.replace(/<[^>]*>/g, '')

  var wordCount = cleanText.match(/\b\w+\b/g)

  return wordCount ? wordCount.length : 0
}

export default countWords
