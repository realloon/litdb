import processDocument from './processDocument'

export default class Collection {
  constructor(name, database, saveDataBase) {
    this.name = name
    this.database = database
    this.saveDataBase = saveDataBase
    this.collection = this.database[this.name] || []
  }

  add(documents) {
    const docs = Array.isArray(documents) ? documents : [documents]
    docs.forEach(doc => processDocument.call(this, doc))
    this.saveDataBase()
    return documents
  }

  filter(query, method = 'extract') {
    return this.collection.filter(document =>
      Object.keys(query)
        .map(field =>
          method === 'extract'
            ? document[field] === query[field]
            : document[field] !== query[field]
        )
        .every(Boolean)
    )
  }

  delete(query) {
    this.database[this.name] = this.filter(query, 'exclude') // 没有修改原数组
    this.saveDataBase()

    return this.database[this.name]
  }

  update(query, modify) {
    if (Object.values(modify).includes(undefined)) {
      console.warn(
        'Ensure that there are no items with a value of undefined in the incoming modification object, otherwise it will delete the original field instead of modifying it.',
        modify
      )
    }

    this.filter(query, 'extract').forEach(document =>
      Object.assign(document, modify)
    )

    this.saveDataBase()

    return this.filter(query)
  }

  clear() {
    this.database[this.name] = []
    this.saveDataBase()
    return this.database[this.name]
  }
}
