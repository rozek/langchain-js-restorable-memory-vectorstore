# langchain-js-restorable-memory-vectorstore #

a restorable memory vector store for LangChainJS that works in browsers

## Overview ##

This simple class adds a `fromJSON` method the `MemoryVectorStore` from [LangChainJS](https://github.com/langchain-ai/langchainjs) in order to be able to preserve and restore any vector store contents while still be browser-compatible (as the typical `save` and `load` methods of vector stores assume to run within a Node.js environment).

If you replace your `MemoryVectorStore` with a `RestorableMemoryVectorStore`, you can now use the original `toJSON` to serialize your vector store into a JSON object (which may then be persisted using a browser's IndexedDB or similar) and later restore it using `fromJSON`.
