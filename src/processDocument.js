export default function processDocument(document) {
  if (document.id === undefined) {
    document.id = crypto.randomUUID()
  }
  
  this.collection.push(document)
}
