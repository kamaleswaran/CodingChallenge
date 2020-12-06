﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using FluentAssertions;
using Microsoft.Extensions.Caching.Memory;
using Moq;
using Paymentsense.Coding.Challenge.Api.Services;
using Xunit;

namespace Paymentsense.Coding.Challenge.Api.Tests.Services
{
    public class CountryServiceTests
    {
        private readonly ICountryService _countryService;
        private readonly IMemoryCache _memoryCache;
        private readonly Mock<IHttpClientFactory> _httpClientFactory;

        public CountryServiceTests()
        {
            _httpClientFactory = new Mock<IHttpClientFactory>();
            _memoryCache = new MemoryCache(new MemoryCacheOptions());
            
            _countryService = new CountryService(_httpClientFactory.Object, _memoryCache);
        }

        [Fact]
        public async Task ShouldGetAllCountries()
        {
            //Given
            _httpClientFactory.Setup(s => s.CreateClient(It.IsAny<string>()))
                .Returns(new HttpClient { BaseAddress = new Uri("https://restcountries.eu/rest/v2/") });

            //When
            var countries = await _countryService.GetAllCountries();

            //Then
            countries.Count.Should().Be(250);
            countries.Any(c => c.Name.Contains("United Kingdom")).Should().BeTrue();
            countries[0].Flag.Should().NotBeNullOrEmpty();
        }

        [Fact]
        public async Task ShouldCacheResult()
        {
            //Given
            _httpClientFactory.Setup(s => s.CreateClient(It.IsAny<string>()))
                .Returns(new HttpClient { BaseAddress = new Uri("https://restcountries.eu/rest/v2/") });

            //When
            await _countryService.GetAllCountries();
            await _countryService.GetAllCountries();

            //Then
            _httpClientFactory.Verify(v => v.CreateClient(It.IsAny<string>()), Times.Once);
            _memoryCache.TryGetValue("countries", out string test).Should().BeTrue();
        }
    }
}