using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.Extensions.Caching.Memory;
using Paymentsense.Coding.Challenge.Api.Models;

namespace Paymentsense.Coding.Challenge.Api.Services
{
    public class CountryService : ICountryService
    {
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly IMemoryCache _memoryCache;
        private const string CacheKey = "countries";

        public CountryService(IHttpClientFactory httpClientFactory, IMemoryCache memoryCache)
        {
            _httpClientFactory = httpClientFactory;
            _memoryCache = memoryCache;
        }

        public async Task<List<Country>> GetAllCountries()
        {
            if (_memoryCache.TryGetValue(CacheKey, out string responseCache))
            {
                return JsonSerializer.Deserialize<List<Country>>(responseCache);
            }

            var httpClient = _httpClientFactory.CreateClient("RestCountries");

            var response = await httpClient.GetStringAsync("all");

            SaveCache(response);

            return JsonSerializer.Deserialize<List<Country>>(response);
        }

        private void SaveCache(string countries)
        {
            var expirtyTimeInHours = 1;

            var cacheOptions = new MemoryCacheEntryOptions()
            {
                AbsoluteExpirationRelativeToNow = new TimeSpan(expirtyTimeInHours, 0, 0)
            };

            _memoryCache.Set<string>(CacheKey, countries, cacheOptions);
        }
    }
}