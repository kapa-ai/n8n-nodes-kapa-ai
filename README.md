# n8n-nodes-kapa-ai

This is an n8n community node. It lets you ground n8n AI agents and workflows in a [kapa.ai](https://www.kapa.ai/) knowledge base.

kapa.ai indexes your documentation, support tickets and other knowledge sources into one searchable knowledge base and keeps it in sync. This node searches that knowledge base, so an agent can answer from your sources without you building a vector store, embeddings or a chunking pipeline.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

[Installation](#installation)
[Operations](#operations)
[Credentials](#credentials)
[Compatibility](#compatibility)
[Usage](#usage)
[Resources](#resources)
[Version history](#version-history)

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation, using the package name `n8n-nodes-kapa-ai`. The [quickstart](https://docs.kapa.ai/retrieval/n8n-node/quickstart) on docs.kapa.ai walks through installation, the credential and a first run.

## Operations

| Resource       | Operations                 |
| -------------- | -------------------------- |
| Knowledge Base | Search, Get Many Documents |

- **Search** returns the chunks of your knowledge sources most relevant to a query, each with its `source_url` and `content`, without generating an answer.
- **Get Many Documents** returns the full markdown of ingested documents by their exact URL or document ID.

## Credentials

You need a kapa.ai account with API access.

1. In the Kapa platform, create an API key.
2. In n8n, create a new **Kapa AI API** credential and paste the key into **API Key**.

The key is the only thing the credential holds. The project is set per operation, so one credential covers every project your key can reach.

**Finding your project ID.** In the Kapa platform, open **Settings** > **Projects** and click **Copy project ID** next to the project.

## Compatibility

Requires n8n 2.9.0 or later. Verified against n8n 2.41.5.

## Usage

### Ground an AI Agent in your knowledge base

The node is available as a tool, so an **AI Agent** can call it directly.

1. Add an **AI Agent** and connect a chat model.
2. On the agent's **Tool** connector, add **Kapa AI → Search** and set your **Project ID**.
3. Set **Query** to let the model fill it in, with `{{ $fromAI('query', 'A single, well-formed natural-language query. Must be a complete sentence.') }}`.

The agent decides when to search your knowledge base, then writes its own answer from the chunks it gets back. That keeps your own prompt, model and output format, and skips a second model call.

**Choosing a mode.** **Mode** set to `Default` is faster and returns a fixed number of chunks ranked by relevance. `Deep` has higher recall and precision, returns fewer chunks, and takes longer. **Top K** and **Max Characters** cap what comes back in either mode, and `Deep` rarely reaches them.

**Narrowing the search.** **Options → Source Group IDs** restricts retrieval to the source groups you list, for example only your public documentation.

### Fetch whole documents

When a chunk is not enough, **Knowledge Base → Get Many Documents** returns the full markdown of the documents behind it. Use **Fetch By** to look documents up by URL, by document ID, or by both; whichever field you select has to be filled in. Enter several values separated by commas.

With **Return All** on, or a **Limit** above one page, the node pages through every URL and ID you requested and returns each document it finds. A URL or ID that matches nothing is left out rather than returned empty, and duplicates are ignored. Documents longer than **Options → Max Characters per Document** are truncated and flagged.

## Resources

- [kapa.ai n8n node documentation](https://docs.kapa.ai/retrieval/n8n-node)
- [n8n community nodes documentation](https://docs.n8n.io/integrations/#community-nodes)
- [kapa.ai API reference](https://docs.kapa.ai/api/reference)

## Version history

### 0.1.0

Initial release with the Knowledge Base resource: Search and Get Many Documents.
