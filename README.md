# @kapaai/n8n-nodes-kapa-ai

This is an n8n community node for [Kapa](https://www.kapa.ai/). It gives your n8n workflows and AI Agents access to Kapa's retrieval over the knowledge sources in your Kapa project.

Kapa is an ingestion and retrieval system. It indexes content from sources such as documentation sites, PDFs, support tickets, and community forums into one knowledge base, keeps it up to date, and returns the most relevant content for a query.

The node offers the same functionality as Kapa's [hosted MCP server](https://docs.kapa.ai/retrieval/hosted-mcp-server) and [HTTP API](https://docs.kapa.ai/retrieval/http-api/), and it is the most native way to use Kapa's retrieval inside n8n.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

## Table of contents

- [Requirements](#requirements)
- [Installation](#installation)
- [Credentials](#credentials)
- [Operations](#operations)
- [Usage](#usage)
- [Resources](#resources)
- [Version history](#version-history)

## Requirements

- n8n Cloud or a self-hosted instance running n8n 2.9.0 or later. The node is verified against n8n 2.41.5.
- An n8n owner or admin user to install the node.
- A Kapa project with indexed knowledge sources. To set one up, follow [Index your first source](https://docs.kapa.ai/getting-started/index-your-first-source).

## Installation

On n8n Cloud or a self-hosted instance, follow the [verified community node installation guide](https://docs.n8n.io/integrations/community-nodes/installation-and-management/install-verified-community-nodes) and search for **Kapa AI** in the nodes panel. The [n8n agent example](https://docs.kapa.ai/examples/give-your-n8n-agent-access-to-your-knowledge-without-a-rag-pipeline) on docs.kapa.ai walks through installation, the credential and a first run.

## Credentials

1. In the [Kapa platform](https://app.kapa.ai), open **Deploy** > **API Keys** and create an API key.
2. In n8n, create a new **Kapa AI API** credential and paste the key into **API Key**.

The key is the only thing the credential holds. The project is set per operation, so one credential covers every project your key can reach.

**Finding your project ID.** In the Kapa platform, open **Settings** > **Projects** and click **Copy project ID** next to the project.

## Operations

n8n nodes organize their actions by resource and operation. A resource is the kind of object the node works on, and an operation is the action the node takes on that resource. The Kapa AI node has one resource, **Knowledge Base**, which is the knowledge base of your Kapa project, with two operations: **Search** and **Get Many Documents**.

### Search

This operation:

- Searches all knowledge sources connected to your Kapa project for a given **Query**.
- Returns the most relevant chunks, best match first.
- Each chunk is a short, self-contained snippet of text taken from a single page or item (for example, part of a documentation page).

Results are returned as a list of items with:

- `source_url`: the URL of the original source.
- `content`: the chunk content in Markdown.

This operation is Kapa's retrieval, the same one the [HTTP API](https://docs.kapa.ai/retrieval/http-api/) exposes as the Retrieval endpoint. It runs in one of two [retrieval modes](https://docs.kapa.ai/retrieval/how-retrieval-works), `default` or `deep`, chosen with **Mode**. [Choose a retrieval mode](https://docs.kapa.ai/retrieval/guides/tuning-knowledge-base-search) helps you pick.

The node lets you set the same options as the Retrieval endpoint. See the [Retrieval endpoint reference](https://docs.kapa.ai/api/reference/query-v-1-projects-retrieval-create) for all of them.

### Get Many Documents

This operation:

- Fetches full documents from your knowledge sources by their exact source URL or document ID. **Fetch By** selects URLs, document IDs, or both; enter several values separated by commas.
- Returns the full content of each matched document in Markdown; source URLs or document IDs that do not match exactly are omitted, so results may be empty.
- Limits the number of results with **Limit**, unless **Return All** is on, and truncates documents longer than **Max Characters per Document**.
- Is meant for looking up the content of one or more specific documents, for example when the agent needs the complete page rather than the short chunks **Search** returns.

Results are returned as a list of items with:

- `source_url`: the URL of the document.
- `title`: the title of the document.
- `content`: the document content in Markdown, or `null` when the text is unavailable, such as for PDFs.
- `truncated`: whether the content was shortened to **Max Characters per Document**.

The node lets you set the same options as the Documents endpoint. See the [Documents endpoint reference](https://docs.kapa.ai/api/reference/query-v-1-projects-documents-create) for all of them.

## Usage

For a full walkthrough of installing the node and connecting it to an AI Agent as a tool, see [Give your n8n agent access to your knowledge](https://docs.kapa.ai/examples/give-your-n8n-agent-access-to-your-knowledge-without-a-rag-pipeline).

## Resources

- [kapa.ai n8n node documentation](https://docs.kapa.ai/retrieval/frameworks/n8n)
- [n8n community nodes documentation](https://docs.n8n.io/integrations/#community-nodes)
- [kapa.ai API reference](https://docs.kapa.ai/api/reference)

## Version history

See the [changelog](https://github.com/kapa-ai/n8n-nodes-kapa-ai/blob/main/CHANGELOG.md).
