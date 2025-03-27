/*******************************************************************************
*                                                                              *
*                         RestorableMemoryVectorStore                          *
*                                                                              *
*******************************************************************************/

  export type Serialized = {               // dictated by VectorStore.Serialized
    lc:number,
    type:'constructor',
    id:string[],
    kwargs:Record<string,any>,
  }                  // I hate this format, but I also want to remain compatible

/**** import required components from langchain ****/

  import { MemoryVectorStore }   from 'langchain/vectorstores/memory'
  import { Embeddings }          from '@langchain/core/embeddings'
  import { Document }            from 'langchain/document'

/**** RestorableMemoryVectorStore ****/

export class RestorableMemoryVectorStore extends MemoryVectorStore {
  static async fromJSON (
    JSONString:string, Embedder:Embeddings
  ):Promise<RestorableMemoryVectorStore> {
    const JSONObject = JSON.parse(JSONString)
    
    if (
      (JSONObject.lc == null) || (JSONObject.type !== 'constructor') || 
      ! Array.isArray(JSONObject.id)
    ) {
      throw new Error('invalid serialization format')
    }
    
    const Store = new RestorableMemoryVectorStore(Embedder)
      if (JSONObject.kwargs?.docs == null) {
        throw new Error('no documents in serialization')
      } else {
        const Documents:Document[] = []
        const Vectors:number[][]   = []
        
        for (const DocData of JSONObject.kwargs.docs) {
          if (DocData.pageContent && DocData.vector) {
            Documents.push(new Document({
              pageContent:DocData.pageContent,
              metadata:   DocData.metadata || {}
            }))
            Vectors.push(DocData.vector)
          }
        }
        
        Store.addVectors(Vectors, Documents)
      }
    return Store
  }
}