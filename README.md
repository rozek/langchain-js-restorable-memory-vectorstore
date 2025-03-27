# langchain-js-restorable-memory-vectorstore #

a restorable memory vector store for LangChainJS that works in browsers

## Overview ##

This simple class adds a `fromJSON` method the `MemoryVectorStore` from [LangChainJS](https://github.com/langchain-ai/langchainjs) in order to be able to preserve and restore any vector store contents while still be browser-compatible (as the typical `save` and `load` methods of vector stores assume to run within a Node.js environment).

If you replace your `MemoryVectorStore` with a `RestorableMemoryVectorStore`, you can now use the original `toJSON` to serialize your vector store into a JSON object (which may then be persisted using a browser's IndexedDB or similar) and later restore it using `fromJSON`.

## Installation ##

`langchain-js-restorable-memory-vectorstore` comes as an ECMAScript module (ESM). You may either install the module using `npm` (or similar) if you plan to use a bundler:

```bash
npm install langchain-js-restorable-memory-vectorstore
```

Or you may dynamically import it using an `import` expression

```javascript
  const { RestorableMemoryVectorStore } = await import "https://rozek.github.io/langchain-js-restorable-memory-vectorstore/dist/RestorableMemoryVectorStore.js"
```


## Build Instructions ##

You may easily build this package yourself.

Just install [NPM](https://docs.npmjs.com/) according to the instructions for your platform and follow these steps:

1. either clone this repository using [git](https://git-scm.com/) or [download a ZIP archive](https://github.com/rozek/langchain-js-restorable-memory-vectorstore/archive/refs/heads/main.zip) with its contents to your disk and unpack it there 
2. open a shell and navigate to the root directory of this repository
3. run `npm install` in order to install the complete build environment
4. execute `npm run build` to create a new build

You may also look into the author's [build-configuration-study](https://github.com/rozek/build-configuration-study) for a general description of his build environment.

## License ##

[MIT License](LICENSE.md)
