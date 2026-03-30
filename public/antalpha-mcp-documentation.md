# Web3 AI Unified Gateway MCP

<Info>
AntAlpha MCP Server is a Model Context Protocol implementation that provides a unified Web3 AI gateway for MCP-compatible clients like Claude Code, Cline, and others. It offers comprehensive blockchain data access, smart money tracking, and decentralized trading capabilities across multiple networks.
</Info>

## Product Overview

<Tip>
This Web3 MCP Server is AntAlpha's unified gateway designed for agent developers, enabling your Code Agents to seamlessly interact with blockchain data, track smart money movements, and execute decentralized trades across 50+ supported chains.
</Tip>

## Features

<CardGroup cols={3}>
  <Card title="Wallet Balance" icon={<svg style={{maskImage: "url(/resource/icon/wallet.svg)", maskRepeat: "no-repeat", maskPosition: "center center",}} className={"h-6 w-6 bg-primary dark:bg-primary-light !m-0 shrink-0"}/>}>
    Multi-chain token balance aggregation via DeBank API. Query wallet holdings across Ethereum, BSC, Arbitrum, and 50+ networks with real-time pricing.
  </Card>

  <Card title="Smart Money Tracking" icon={<svg style={{maskImage: "url(/resource/icon/chart.svg)", maskRepeat: "no-repeat", maskPosition: "center center",}} className={"h-6 w-6 bg-primary dark:bg-primary-light !m-0 shrink-0"}/>}>
    Track trading signals from smart money wallets. Monitor public pool addresses and add custom private watchlists with configurable categories.
  </Card>

  <Card title="Web3 Trading" icon={<svg style={{maskImage: "url(/resource/icon/swap.svg)", maskRepeat: "no-repeat", maskPosition: "center center",}} className={"h-6 w-6 bg-primary dark:bg-primary-light !m-0 shrink-0"}/>}>
    DEX aggregated swap quotes via 0x protocol. Generate interactive swap pages with wallet deeplinks for seamless trading execution.
  </Card>
</CardGroup>

## Available Tools

This server implements the Model Context Protocol and can be used with any MCP-compatible client. Currently, the following tools are available across three main categories:

### Wallet Balance (multi-source-token-list)

**`multi-source-token-list`** - Returns aggregated token balances for an EVM wallet across supported networks. Each item includes:
  - Chain identifier (eth, bsc, arb, etc.)
  - Token metadata (name, symbol, decimals)
  - Human-readable and raw amounts
  - Indicative USD pricing

### Smart Money Tools (6 tools)

1. **`smart-money-signal`** - Get trading signals from smart money wallets (public pool + private addresses). Returns signal level, wallet details, action, token, amount, transaction hash, and context.

2. **`smart-money-watch`** - View recent activity for a single wallet in your watchlist. Returns recent transactions, buy/sell summary, and traded tokens.

3. **`smart-money-list`** - List all monitored wallets (public pool + private addresses) with categories, labels, and counts.

4. **`smart-money-custom`** - Add or remove private watchlist addresses with configurable categories (fund, whale, dex_trader, nft_trader, other).

5. **`smart-money-scan`** - On-demand scan for all private addresses you added. Public pool addresses are scanned automatically by the server.

6. **`antalpha-register`** - Register your agent to access smart money tools. Returns agent_id and api_key for subsequent tool calls.

### Web3 Trading Tools (5 tools)

1. **`swap-quote`** - Real-time DEX aggregated swap quote via 0x allowance-holder. Returns buy amount, min receive, gas estimate, route, and full transaction data when taker address is provided.

2. **`swap-create-page`** - Generate firm 0x quote and create a cyberpunk-themed swap page HTML. Returns preview_url for wallet deeplinks.

3. **`swap-tokens`** - List built-in mainnet tokens (symbol, name, address, decimals) with optional search filter.

4. **`swap-gas`** - Get indicative gas price (Gwei) and gas units from a lightweight 0x price probe.

5. **`swap-full`** - One-shot firm quote + swap page HTML generation with transaction data for debugging.

## Installation & Usage

### Quick Start

<Steps>
  <Step title="No API Key Required">
    This is a public beta version. Simply configure the MCP endpoint URL in your client to start using the tools immediately.
  </Step>

  <Step title="Configure MCP Server">
    Refer to the configuration examples below based on your client type.
  </Step>
</Steps>

### Supported Clients

<Tabs>
  <Tab title="Claude Code">
    **Installation Command**

    ```bash
    claude mcp add -s user -t http antalpha-web3-skills https://mcp-skills.ai.antalpha.com/mcp
    ```

    **Manual Configuration**

    Edit Claude Code's configuration file located at `.claude.json` in your user directory:

    ```json
    {
      "mcpServers": {
        "antalpha-web3-skills": {
          "type": "http",
          "url": "https://mcp-skills.ai.antalpha.com/mcp"
        }
      }
    }
    ```
  </Tab>

  <Tab title="Cline (VS Code)">
    Add MCP server configuration in Cline extension settings:

    ```json
    {
      "mcpServers": {
        "antalpha-web3-skills": {
          "type": "streamableHttp",
          "url": "https://mcp-skills.ai.antalpha.com/mcp"
        }
      }
    }
    ```

    For older Cline versions that don't support StreamableHttp:

    ```json
    {
      "mcpServers": {
        "antalpha-web3-skills": {
          "type": "sse",
          "url": "https://mcp-skills.ai.antalpha.com/sse"
        }
      }
    }
    ```
  </Tab>

  <Tab title="OpenCode">
    Add MCP server configuration in OpenCode settings. Refer to [OpenCode MCP Documentation](https://opencode.ai/docs/mcp-servers):

    ```json
    {
      "$schema": "https://opencode.ai/config.json",
      "mcp": {
        "antalpha-web3-skills": {
          "type": "remote",
          "url": "https://mcp-skills.ai.antalpha.com/mcp"
        }
      }
    }
    ```
  </Tab>

  <Tab title="Cursor">
    Configure MCP in Cursor settings:

    ```json
    {
      "mcpServers": {
        "antalpha-web3-skills": {
          "url": "https://mcp-skills.ai.antalpha.com/mcp"
        }
      }
    }
    ```
  </Tab>

  <Tab title="Other MCP Clients">
    For Roo Code, Kilo Code, or other MCP-compatible clients, use this general configuration:

    ```json
    {
      "mcpServers": {
        "antalpha-web3-skills": {
          "type": "streamable-http",
          "url": "https://mcp-skills.ai.antalpha.com/mcp"
        }
      }
    }
    ```
  </Tab>
</Tabs>

## Usage Examples

After installing the MCP server in your client, you can use these capabilities directly through natural language conversation:

**Wallet Balance Queries:**
- "Check the token balances for wallet 0x742d35Cc6634C0532925a3b844Bc9e7595f2bD48"
- "Show me all tokens held by this address across different chains"

**Smart Money Tracking:**
- "Register my agent for smart money tracking"
- "Get high-priority smart money signals for the last 24 hours"
- "Add wallet 0xABC123 to my private watchlist as a whale category"
- "Show recent activity for wallet 0xABC123"

**Web3 Trading:**
- "Get a swap quote for exchanging 1000 USDT to ETH"
- "Create a swap page for selling 0.5 ETH to USDT with wallet 0xMyAddress"
- "What's the current gas price on Ethereum?"
- "List all available tokens for trading"

## Key Features Highlights

<Check>
  **Open Access Beta:**
  
  * This is a **public beta version** with no API key requirement
  * All tools are accessible immediately after MCP configuration
  * Rate limits apply per client IP to ensure fair usage
  * Future versions may introduce optional API keys for enhanced features
  
  **Supported Networks:**
  
  * 50+ EVM chains including Ethereum, BSC, Base, Arbitrum, Optimism, Polygon
  * Unified gateway approach - single endpoint for all chain queries
  * Automatic chain detection and optimal routing
  
  **Data Sources:**
  
  * DeBank for multi-chain balance aggregation
  * 0x Protocol for DEX aggregation and swap quotes
  * Moralis API for smart money transaction scanning
  * Built-in token lists with verified contract addresses
</Check>

## Tool Details

### multi-source-token-list

**Purpose:** Query wallet token holdings across multiple chains in a single call.

**Input Parameters:**
- `address`: EVM wallet address (checksummed or lowercase)

**Output Structure:**
Each token record includes:
- `id`: Token contract address or native token ID
- `chain`: Chain identifier (eth, bsc, arb, etc.)
- `name`: Token name
- `symbol`: Token symbol
- `decimals`: Token decimals
- `amount`: Human-readable balance
- `raw_amount`: On-chain raw amount
- `price`: USD price
- `protocol_id`: Associated protocol (empty for wallet balance)

**Example:**
```json
{
  "tokens": [
    {
      "id": "0xdAC17F958D2ee523a2206206994597C13D831ec7",
      "chain": "eth",
      "name": "Tether USD",
      "symbol": "USDT",
      "decimals": 6,
      "amount": 1500.5,
      "raw_amount": "1500500000",
      "price": 1.0
    }
  ]
}
```

### smart-money-signal

**Purpose:** Retrieve trading signals from monitored smart money wallets.

**Input Parameters:**
- `agent_id`: UUID from antalpha-register (required)
- `level`: Signal filter - "high", "medium", "low", or "all" (default: "all")
- `limit`: Max signals to return (1-100, default: 20)
- `since`: ISO timestamp filter for signals after this time

**Output Structure:**
- Signal details: level, wallet, label, action, token, amount_usd, tx_hash, timestamp
- Context: Additional signal context
- Summary: Count breakdown by level

**Signal Levels:**
- `high`: Large transactions (> $50,000 default threshold)
- `medium`: Medium-sized transactions
- `low`: Regular-sized transactions

### swap-quote

**Purpose:** Get real-time DEX aggregated swap quote.

**Input Parameters:**
- `sell_token`: Token symbol (e.g., "ETH", "USDT") or contract address
- `buy_token`: Target token symbol or contract address
- `sell_amount`: Human-readable sell amount (e.g., "0.001", "1000")
- `taker`: Optional wallet address for firm quote with transaction data
- `chain_id`: Chain ID (default: 1 for Ethereum mainnet)

**Output Structure:**
- Quote: sell_token, buy_token, amounts, price, min_buy_amount
- Gas: gas_estimate, gas_price_gwei
- Route: Array of DEX sources with proportions
- Transaction: Full tx data (to, value, data, gas, gasPrice) when taker provided

## Rate Limits

<Warning>
  **Current Rate Limits (Beta Version):**
  
  * **multi-source-token-list**: 60 requests per client IP per minute
  * **Web3 Trading Tools**: 60 requests per client IP per minute
  * **Smart Money Tools**: Requires agent registration; rate limits per agent
  
  If you encounter "Too many requests" errors, wait briefly and retry. Future API key versions will offer higher limits.
</Warning>

## Troubleshooting

<AccordionGroup>
  <Accordion title="Connection Failed">
    **Problem:** Cannot connect to MCP server
    
    **Solution:**
    1. Verify the URL: `https://mcp-skills.ai.antalpha.com/mcp`
    2. Check your network connectivity
    3. Ensure no firewall blocking HTTPS connections
    4. Try SSE endpoint if streamable-http fails: `https://mcp-skills.ai.antalpha.com/sse`
  </Accordion>

  <Accordion title="Rate Limit Exceeded">
    **Problem:** "Too many requests" error
    
    **Solution:**
    1. Wait 60 seconds before retrying
    2. Reduce request frequency in your agent workflow
    3. Consider batching multiple queries when possible
    4. Future: Subscribe for API key access with higher limits
  </Accordion>

  <Accordion title="Smart Money Tools Return 'Agent validation failed'">
    **Problem:** Smart money tools fail with authentication error
    
    **Solution:**
    1. First call `antalpha-register` to get your agent_id and api_key
    2. Ensure server has `AGENT_API_KEY_AUTH_ENABLED=true` (default: false for beta)
    3. When enabled, send api_key in header `x-antalpha-agent-api-key` on each request
    4. Persist agent_id and api_key in your agent's memory for subsequent calls
  </Accordion>

  <Accordion title="Swap Quote Returns Empty Route">
    **Problem:** Swap quote shows no available liquidity
    
    **Solution:**
    1. Verify token symbols or addresses are correct
    2. Check if tokens exist on the specified chain_id
    3. Try smaller amounts to test liquidity availability
    4. Some exotic tokens may have limited DEX liquidity
  </Accordion>

  <Accordion title="Wallet Balance Shows Zero Tokens">
    **Problem:** multi-source-token-list returns empty or zero balances
    
    **Solution:**
    1. Verify the wallet address is correct (0x-prefixed, 40 hex chars)
    2. Check if the wallet has actual token holdings
    3. Ensure the address has activity on supported chains
    4. DeBank API may have temporary sync delays for new transactions
  </Accordion>
</AccordionGroup>

## Additional Resources

* [Model Context Protocol (MCP) Official Documentation](https://modelcontextprotocol.io/)
* [AntAlpha Web Platform](https://mcp-project-ctf9.vercel.app/)
* [Source Code Repository](https://github.com/AntalphaAI/antalpha-rwa-skill)
* [0x Protocol Documentation](https://0x.org/docs)
* [DeBank API Reference](https://docs.cloud.debank.com/)

## Version Information

**Current Version:** v0.1.0 (Public Beta)

**Server Name:** rwa-mcp-skills

**Protocol:** Model Context Protocol (MCP) over Streamable HTTP / SSE

**Endpoint:** `https://mcp-skills.ai.antalpha.com/mcp`

**Supported MCP Versions:** Latest stable MCP specification

---

Built with AntAlpha Web3 AI Infrastructure Layer.  
© 2026 AntAlpha. All rights reserved.