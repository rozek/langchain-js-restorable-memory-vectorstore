import { describe, it, expect } from 'vitest'
import { RestorableMemoryVectorStore } from '../src/RestorableMemoryVectorStore'
import { Embeddings } from '@langchain/core/embeddings'

/**** Mock Embedder for testing ****/

class EmbedderMock implements Embeddings {
  caller: any = undefined                    // required by Embeddings interface
  
/**** provide predictable embeddings for testing ***/

  async embedQuery(text: string): Promise<number[]> {
    return [0.1, 0.2, 0.3]
  }

  async embedDocuments(documents: string[]): Promise<number[][]> {
    return documents.map(() => [0.1, 0.2, 0.3])
  }
}

/**** Test Data ****/

const validSerialization = {                              // valid serialization
  lc:  1,
  type:'constructor',
  id:  ['memory'],
  kwargs: {
    docs: [{
      pageContent: 'Test document 1',
      metadata: { source: 'test1' },
      vector: [0.1, 0.2, 0.3]
    },
    {
      pageContent: 'Test document 2',
      metadata: { source: 'test2' },
      vector: [0.4, 0.5, 0.6]
    }]
  }
}

const missingLcSerialization = {                             // missing lc field
  type:'constructor',
  id:  ['memory'],
  kwargs: {
    docs: [{
      pageContent: 'Test document',
      metadata: { source: 'test' },
      vector: [0.1, 0.2, 0.3]
    }]
  }
}

const wrongTypeSerialization = {                             // wrong type field
  lc:  1,
  type:'wrong_type',
  id:  ['memory'],
  kwargs: {
    docs: [{
      pageContent: 'Test document',
      metadata: { source: 'test' },
      vector: [0.1, 0.2, 0.3]
    }]
  }
}

const nonArrayIdSerialization = {                                // non-array ID
  lc:  1,
  type:'constructor',
  id:  'memory',
  kwargs: {
    docs: [{
      pageContent: 'Test document',
      metadata: { source: 'test' },
      vector: [0.1, 0.2, 0.3]
    }]
  }
}

const missingDocsSerialization = {                               // missing docs
  lc:  1,
  type:'constructor',
  id:  ['memory'],
  kwargs: {}
}

/**** Tests ****/

describe('RestorableMemoryVectorStore', () => {
  const Embedder = new EmbedderMock()

  describe('fromJSON', () => {
    it('should correctly deserialize valid JSON', async () => {
      const JSONString = JSON.stringify(validSerialization)
      const Store = await RestorableMemoryVectorStore.fromJSON(JSONString, Embedder)
      
      // verify that "Store" was created and is an instance of RestorableMemoryVectorStore
      expect(Store).toBeInstanceOf(RestorableMemoryVectorStore)
      
      // test similarity search to verify documents were added correctly
      const Results = await Store.similaritySearch('test')
      expect(Results.length).toBe(2)
      expect(Results[0].pageContent).toBe('Test document 1')
      expect(Results[0].metadata.source).toBe('test1')
      expect(Results[1].pageContent).toBe('Test document 2')
      expect(Results[1].metadata.source).toBe('test2')
    })

    it('should throw error for invalid JSON string', async () => {
      const invalidJson = '{invalid json'
      await expect(RestorableMemoryVectorStore.fromJSON(invalidJson, Embedder))
        .rejects.toThrow()
    })

    it('should throw error when lc field is missing', async () => {
      const JSONString = JSON.stringify(missingLcSerialization)
      await expect(RestorableMemoryVectorStore.fromJSON(JSONString, Embedder))
        .rejects.toThrow('invalid serialization format')
    })

    it('should throw error when type field is incorrect', async () => {
      const JSONString = JSON.stringify(wrongTypeSerialization)
      await expect(RestorableMemoryVectorStore.fromJSON(JSONString, Embedder))
        .rejects.toThrow('invalid serialization format')
    })

    it('should throw error when id is not an array', async () => {
      const JSONString = JSON.stringify(nonArrayIdSerialization)
      await expect(RestorableMemoryVectorStore.fromJSON(JSONString, Embedder))
        .rejects.toThrow('invalid serialization format')
    })

    it('should throw error when docs are missing', async () => {
      const JSONString = JSON.stringify(missingDocsSerialization)
      await expect(RestorableMemoryVectorStore.fromJSON(JSONString, Embedder))
        .rejects.toThrow('no documents in serialization')
    })

    it('should handle partially valid docs gracefully', async () => {
      // mix of valid and invalid documents
      const mixedSerialization = {
        lc: 1,
        type: 'constructor',
        id: ['memory'],
        kwargs: {
          docs: [{
            pageContent:'Valid document',
            metadata:   { source: 'valid' },
            vector:     [0.1, 0.2, 0.3]
          },
          {
            // missing pageContent
            metadata:{ source: 'invalid' },
            vector:  [0.4, 0.5, 0.6]
          }]
        }
      }

      const JSONString = JSON.stringify(mixedSerialization)
      const Store = await RestorableMemoryVectorStore.fromJSON(JSONString, Embedder)
      
      // only the valid document should be added
      const Results = await Store.similaritySearch('test')
      expect(Results.length).toBe(1)
      expect(Results[0].pageContent).toBe('Valid document')
    })

    it('should handle an empty docs array', async () => {
      const emptySerialization = {
        lc: 1,
        type: 'constructor',
        id: ['memory'],
        kwargs: {
          docs: []
        }
      }

      const JSONString = JSON.stringify(emptySerialization)
      const Store = await RestorableMemoryVectorStore.fromJSON(JSONString, Embedder)
      
      // store should be created but empty
      const Results = await Store.similaritySearch('test')
      expect(Results.length).toBe(0)
    })
  })
  
  describe('integration with MemoryVectorStore', () => {
    it('should maintain compatibility with MemoryVectorStore', async () => {
      const Store = new RestorableMemoryVectorStore(Embedder)
      
      await Store.addDocuments([
        { pageContent: 'Test document 1', metadata: { source: 'test1' } },
        { pageContent: 'Test document 2', metadata: { source: 'test2' } }
      ])
      
      const Results = await Store.similaritySearch('test')
      expect(Results.length).toBe(2)
    })
  })
})