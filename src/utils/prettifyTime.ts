const prettifyTime = (time: number) => {
  const date = new Date(time)

  const minutes = date.getUTCMinutes() < 10 ? '0' + date.getUTCMinutes() : date.getUTCMinutes()
  const hours = date.getUTCHours() < 10 ? '0' + date.getUTCHours() : date.getUTCHours()

  return hours + ':' + minutes
}

export default prettifyTime
