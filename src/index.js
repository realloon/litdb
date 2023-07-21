import Collection from './Collection'

export default class Litdb {
  static dbName = 'litdb'
  static db

  constructor() {
    this.initDataBase()
  }

  initDataBase() {
    Litdb.db =
      JSON.parse(localStorage.getItem(Litdb.dbName)) || Object.create(null)
  }

  saveDataBase() {
    localStorage.setItem(Litdb.dbName, JSON.stringify(Litdb.db))
  }

  collection = collectionName => {
    const instance = new Collection(collectionName, Litdb.db, () =>
      this.saveDataBase(Litdb.dbName)
    )

    Litdb.db[collectionName] = instance.collection

    return instance
  }
}
