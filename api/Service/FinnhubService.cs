using System;
using System.Net.Http;
using System.Threading.Tasks;
using api.Dtos.Stock;
using api.Interfaces;
using api.Mappers;
using api.Models;
using Newtonsoft.Json;

namespace api.Service
{
    public class FinnhubService : IFinnhubService
    {
        private readonly HttpClient _httpClient;
        private readonly IConfiguration _config;

        public FinnhubService(HttpClient httpClient, IConfiguration config)
        {
            _httpClient = httpClient;
            _config = config;
        }

        public async Task<Stock?> FindStockBySymbolAsync(string symbol)
        {
            try
            {
                var apiKey = _config["FinnhubKey"];

                var result = await _httpClient.GetAsync(
                    $"https://finnhub.io/api/v1/stock/profile2?symbol={symbol}&token={apiKey}"
                );

                if (!result.IsSuccessStatusCode)
                    return null;

                var content = await result.Content.ReadAsStringAsync();

                var stock = JsonConvert.DeserializeObject<FinnhubStock>(content);

                if (stock == null || string.IsNullOrWhiteSpace(stock.ticker))
                    return null;

                return stock.ToStockFromFinnhub();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }
    }
}