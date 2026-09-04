# n8n-nodes-kapa-ai

This is an n8n community node. It lets you use [kapa.ai](https://www.kapa.ai/) in your n8n workflows.

kapa.ai turns your documentation, support tickets and other knowledge sources into an AI assistant that answers technical questions. Its API exposes that assistant for chat and retrieval, along with the analytics behind it.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

[Installation](#installation)
[Operations](#operations)
[Credentials](#credentials)
[Compatibility](#compatibility)
[Usage](#usage)
[Resources](#resources)
[Version history](#version-history)

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

## Operations

| Resource     | Operations                           |
| ------------ | ------------------------------------ |
| Activity     | Get                                  |
| Chat         | Send Message, Send Message in Thread |
| Coverage Gap | Get Many Periods, Get Many Clusters  |
| End User     | Get Many                             |
| Feedback     | Create or Update                     |
| Integration  | Get Many                             |
| Project      | Get                                  |
| Retrieval    | Retrieve Chunks, Get Many Documents  |
| Source       | Get Many, Get Many Source Groups     |
| Thread       | Get, Get Many                        |
| Top Question | Get Many Periods, Get Many Clusters  |

Looking for keyword search or question answers? kapa.ai has deprecated both, so they are not included — use **Retrieval → Retrieve Chunks** and **Thread → Get Many** instead. The streamed chat endpoints are also left out, since a workflow cannot make use of a stream; **Chat → Send Message** returns the same answer.

## Credentials

You need a kapa.ai account with API access.

1. In the kapa.ai dashboard, create an API key.
2. In n8n, create a new **Kapa AI API** credential and paste the key into **API Key**.

The key is the only thing the credential holds. The project is set per operation, so one credential covers every project your key can reach.

**Finding your project ID.** Open the project in the kapa.ai dashboard and copy the UUID from the URL, or use **Project → Get** once you have one to hand.

## Compatibility

Requires n8n 2.9 or later, and is verified against n8n 2.37.10. See [docs.kapa.ai/api/reference](https://docs.kapa.ai/api/reference) for the underlying API.

## Usage

### Draft an answer to a support ticket

The case kapa.ai is built for. Chat returns an `is_uncertain` flag, so you can let the confident answers through and escalate the rest instead of posting a guess to a customer.

1. **Zendesk Trigger** (or Gmail, Intercom, a Webhook) on a new ticket.
2. **Kapa AI → Chat → Send Message**, with **Query** set to the ticket body and the requester's address in **Additional Fields → User Email** so the conversation is attributed to them:

   ```
   Query:      {{ $json.ticket.description }}
   User Email: {{ $json.ticket.requester.email }}
   ```

3. **If** node on `{{ $json.is_uncertain }}` — false goes to step 4, true assigns the ticket to a human.
4. **Zendesk → Add internal note**, quoting the answer and the sources it came from:

   ```
   {{ $json.answer }}

   Sources:
   {{ $json.relevant_sources.map((source) => '- ' + source.title + ' — ' + source.source_url).join('\n') }}
   ```

To close the loop, keep the `question_answer_id` from step 2 and pass it to **Feedback → Create or Update** when an agent accepts or rewrites the draft. That feeds the same analytics the coverage gap report below reads from.

### Report documentation gaps every week

Coverage gaps are the questions kapa.ai answered with low certainty, clustered and summarised — in other words, a ranked list of what your docs are missing. It is a natural fit for a scheduled workflow.

1. **Schedule Trigger**, weekly.
2. **Kapa AI → Coverage Gap → Get Many Periods** with **Limit** `1` and **Options → Interval** `Weekly`. Periods come back newest first, so this yields the period just closed.
3. **Kapa AI → Coverage Gap → Get Many Clusters** with **Period ID** `{{ $json.id }}` and **Limit** `10`.
4. **Slack → Send Message**, one line per cluster:

   ```
   *{{ $json.title }}* — {{ $json.thread_count }} threads, {{ $json.num_unique_users }} users
   {{ $json.suggestion }}
   ```

Each cluster carries an LLM-written `title`, `summary` and `suggestion`, so the message is close to a ready-made docs backlog. Swap Slack for **Linear → Create Issue** to file them directly.

### Ground your own agent

This node is available as a tool, so an **AI Agent** can call it directly. Attach **Retrieval → Retrieve Chunks** and the agent decides when to search your knowledge base, then writes its own answer from the chunks it gets back — each one a `source_url` and its `content`.

Prefer this over Chat when you want your own prompt, model or output format. It skips kapa.ai's generation step, so it is cheaper and faster than a full chat round trip. Use Chat instead when you want kapa.ai's own answer, citations and thread history.

### Things worth knowing

**Project ID.** Most operations take a **Project ID** rather than reading it from the credential. If a workflow uses several of them, set it once and reference that node with an expression.

**Follow-up questions.** Chat returns a `thread_id`. Pass it to **Send Message in Thread** to ask a follow-up with the earlier turns as context, rather than starting a fresh conversation each time.

**Comma-separated lists.** Enter multiple values in fields such as **Source IDs** and **Source Group IDs** separated by commas.

**Fetching documents.** **Retrieval → Get Many Documents** looks documents up by URL or by document ID. Use **Fetch By** to choose which, and pick `Document IDs and URLs` only if you are supplying both — whichever field you select has to be filled in.

**Large collections.** **Return All** works as it does on any other node, but **End User → Get Many** can run to tens of thousands of records on a busy project. Set a **Limit** while you are building a workflow and switch to **Return All** once it does what you want.

## Resources

- [n8n community nodes documentation](https://docs.n8n.io/integrations/#community-nodes)
- [kapa.ai API reference](https://docs.kapa.ai/api/reference)
- [kapa.ai documentation](https://docs.kapa.ai/)

## Version history

### 0.1.0

Initial release.
