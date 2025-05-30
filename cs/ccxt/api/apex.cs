// -------------------------------------------------------------------------------

// PLEASE DO NOT EDIT THIS FILE, IT IS GENERATED AND WILL BE OVERWRITTEN:
// https://github.com/ccxt/ccxt/blob/master/CONTRIBUTING.md#how-to-contribute-code

// -------------------------------------------------------------------------------

namespace ccxt;

public partial class apex : Exchange
{
    public apex (object args = null): base(args) {}

    public async Task<object> publicGetV3Symbols (object parameters = null)
    {
        return await this.callAsync ("publicGetV3Symbols",parameters);
    }

    public async Task<object> publicGetV3HistoryFunding (object parameters = null)
    {
        return await this.callAsync ("publicGetV3HistoryFunding",parameters);
    }

    public async Task<object> publicGetV3Ticker (object parameters = null)
    {
        return await this.callAsync ("publicGetV3Ticker",parameters);
    }

    public async Task<object> publicGetV3Klines (object parameters = null)
    {
        return await this.callAsync ("publicGetV3Klines",parameters);
    }

    public async Task<object> publicGetV3Trades (object parameters = null)
    {
        return await this.callAsync ("publicGetV3Trades",parameters);
    }

    public async Task<object> publicGetV3Depth (object parameters = null)
    {
        return await this.callAsync ("publicGetV3Depth",parameters);
    }

    public async Task<object> publicGetV3Time (object parameters = null)
    {
        return await this.callAsync ("publicGetV3Time",parameters);
    }

    public async Task<object> publicGetV3DataAllTickerInfo (object parameters = null)
    {
        return await this.callAsync ("publicGetV3DataAllTickerInfo",parameters);
    }

    public async Task<object> privateGetV3Account (object parameters = null)
    {
        return await this.callAsync ("privateGetV3Account",parameters);
    }

    public async Task<object> privateGetV3AccountBalance (object parameters = null)
    {
        return await this.callAsync ("privateGetV3AccountBalance",parameters);
    }

    public async Task<object> privateGetV3Fills (object parameters = null)
    {
        return await this.callAsync ("privateGetV3Fills",parameters);
    }

    public async Task<object> privateGetV3OrderFills (object parameters = null)
    {
        return await this.callAsync ("privateGetV3OrderFills",parameters);
    }

    public async Task<object> privateGetV3Order (object parameters = null)
    {
        return await this.callAsync ("privateGetV3Order",parameters);
    }

    public async Task<object> privateGetV3HistoryOrders (object parameters = null)
    {
        return await this.callAsync ("privateGetV3HistoryOrders",parameters);
    }

    public async Task<object> privateGetV3OrderByClientOrderId (object parameters = null)
    {
        return await this.callAsync ("privateGetV3OrderByClientOrderId",parameters);
    }

    public async Task<object> privateGetV3Funding (object parameters = null)
    {
        return await this.callAsync ("privateGetV3Funding",parameters);
    }

    public async Task<object> privateGetV3HistoricalPnl (object parameters = null)
    {
        return await this.callAsync ("privateGetV3HistoricalPnl",parameters);
    }

    public async Task<object> privateGetV3OpenOrders (object parameters = null)
    {
        return await this.callAsync ("privateGetV3OpenOrders",parameters);
    }

    public async Task<object> privateGetV3Transfers (object parameters = null)
    {
        return await this.callAsync ("privateGetV3Transfers",parameters);
    }

    public async Task<object> privateGetV3Transfer (object parameters = null)
    {
        return await this.callAsync ("privateGetV3Transfer",parameters);
    }

    public async Task<object> privatePostV3DeleteOpenOrders (object parameters = null)
    {
        return await this.callAsync ("privatePostV3DeleteOpenOrders",parameters);
    }

    public async Task<object> privatePostV3DeleteClientOrderId (object parameters = null)
    {
        return await this.callAsync ("privatePostV3DeleteClientOrderId",parameters);
    }

    public async Task<object> privatePostV3DeleteOrder (object parameters = null)
    {
        return await this.callAsync ("privatePostV3DeleteOrder",parameters);
    }

    public async Task<object> privatePostV3Order (object parameters = null)
    {
        return await this.callAsync ("privatePostV3Order",parameters);
    }

    public async Task<object> privatePostV3SetInitialMarginRate (object parameters = null)
    {
        return await this.callAsync ("privatePostV3SetInitialMarginRate",parameters);
    }

    public async Task<object> privatePostV3TransferOut (object parameters = null)
    {
        return await this.callAsync ("privatePostV3TransferOut",parameters);
    }

    public async Task<object> privatePostV3ContractTransferOut (object parameters = null)
    {
        return await this.callAsync ("privatePostV3ContractTransferOut",parameters);
    }

}