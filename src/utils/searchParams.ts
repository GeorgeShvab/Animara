function searchParams(url?: string) {
  const params = new URLSearchParams(url)

  const data = {
    set,
    remove,
    toString,
  }

  function set(key: string, value: string | number) {
    params.set(key, String(value))

    return data
  }

  function remove(key: string) {
    params.delete(key)
    return data
  }

  function toString() {
    return params.toString()
  }

  return data
}

export default searchParams
