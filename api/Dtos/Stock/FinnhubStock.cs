using System;

namespace api.Dtos.Stock
{
    public class FinnhubStock
    {
        public string country { get; set; } = string.Empty;
        public string currency { get; set; } = string.Empty;
        public string exchange { get; set; } = string.Empty;
        public string finnhubIndustry { get; set; } = string.Empty;
        public string ipo { get; set; } = string.Empty;
        public string logo { get; set; } = string.Empty;
        public double marketCapitalization { get; set; }
        public string name { get; set; } = string.Empty;
        public string phone { get; set; } = string.Empty;
        public double shareOutstanding { get; set; }
        public string ticker { get; set; } = string.Empty;
        public string weburl { get; set; } = string.Empty;
    }
}