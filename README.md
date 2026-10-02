# @kapaai/n8n-nodes-kapa-ai

This is an n8n community node. It lets n8n AI agents and workflows search a [kapa.ai](https://www.kapa.ai/) knowledge base.

kapa.ai makes your documentation, support tickets and other knowledge sources ready to search and keeps them up to date. This node searches them, so an agent can answer based on your knowledge sources without a vector store of your own.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

[Installation](#installation)
[Operations](#operations)
[Credentials](#credentials)
[Compatibility](#compatibility)
[Usage](#usage)
[Resources](#resources)
[Version history](#version-history)

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation, using the package name `@kapaai/n8n-nodes-kapa-ai`. The [quickstart](https://docs.kapa.ai/retrieval/n8n-node/quickstart) on docs.kapa.ai walks through installation, the credential and a first run.

## Operations

| Resource       | Operations                 |
| -------------- | -------------------------- |
| Knowledge Base | Search, Get Many Documents |

- **Search** finds relevant information in your knowledge sources. Each result includes the relevant text in Markdown and a link to the original source. It does not write an answer.
- **Get Many Documents** returns whole documents from your knowledge sources, as Markdown, by their exact URL or document ID.

## Credentials

You need a kapa.ai account with API access.

1. In the Kapa platform, create an API key.
2. In n8n, create a new **Kapa AI API** credential and paste the key into **API Key**.

The key is the only thing the credential holds. The project is set per operation, so one credential covers every project your key can reach.

**Finding your project ID.** In the Kapa platform, open **Settings** > **Projects** and click **Copy project ID** next to the project.

## Compatibility

Requires n8n 2.9.0 or later. Verified against n8n 2.41.5.

## Usage

### Give an AI Agent access to your knowledge base

The node is available as a tool, so an **AI Agent** can call it directly.

1. Add an **AI Agent** and connect a chat model.
2. On the agent's **Tool** connector, add **Kapa AI → Search** and set your **Project ID**.
3. Set **Query** to let the model fill it in, with `{{ $fromAI('query', 'A single, well-formed natural-language query. Must be a complete sentence.') }}`.

The agent decides when to search and writes an answer based on the information found. You keep your own prompt, model and output format.

**Choosing a mode.** **Mode** set to `Default` is faster and returns a fixed number of search results, best match first. `Deep` takes longer, reads further into your sources, and returns only what it finds relevant, usually fewer results. **Top K** caps how many results come back and **Max Characters** caps their total length.

**Narrowing the search.** **Options → Source Group IDs** restricts the search to the source groups you list, for example only your public documentation.

### Fetch whole documents

When a search result is not enough, **Knowledge Base → Get Many Documents** returns the whole document behind it, as Markdown. Use **Fetch By** to look documents up by URL, by document ID, or by both; whichever field you select has to be filled in. Enter several values separated by commas.

The node looks up every URL and ID you list and returns each document it finds, up to **Limit** unless **Return All** is on. Entries that match nothing are left out, and duplicates are ignored. Documents longer than **Options → Max Characters per Document** are cut at that limit and flagged.

## Resources

- [kapa.ai n8n node documentation](https://docs.kapa.ai/retrieval/n8n-node)
- [n8n community nodes documentation](https://docs.n8n.io/integrations/#community-nodes)
- [kapa.ai API reference](https://docs.kapa.ai/api/reference)

## Version history

### 0.1.0

Initial release with the Knowledge Base resource: Search and Get Many Documents.
