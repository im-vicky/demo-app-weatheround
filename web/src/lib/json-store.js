// import fs from 'socket:fs/promises'

let dataCache
// const storeFilePath = './.store.json'
const storeName = 'store.json'

const publicAPI = {
  getItem, setItem, removeItem, clear
}
export default publicAPI
export {
  getItem, setItem, removeItem, clear
}

await readStore()

async function getItem(name) {
  return dataCache[name]
}

async function setItem(name, value) {
  dataCache[name] = value
  return (await writeStore()) && value
}

async function removeItem(name) {
  delete dataCache[name]
  return writeStore()
}

async function clear() {
  dataCache = {}
  return writeStore()
}

async function readStore() {
  try {
    // const contents = await fs.readFile(storeFilePath, 'utf-8')
    const contents = localStorage.getItem(storeName)
    if (contents == null) {
      throw new Error('store not found')
    }
    dataCache = JSON.parse(contents)
  } catch {
    clear()
  }
}

async function writeStore() {
  try {
    // await fs.writeFile(
    //   storeFilePath,
    //   JSON.stringify(dataCache),
    //   'utf-8'
    // )
    localStorage.setItem(
      storeName,
      JSON.stringify(dataCache)
    )
    return true
  } catch {
    dataCache = {}
    return false
  }
}
