using System.Collections.Generic;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;
using FluentAssertions;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.TestHost;
using Paymentsense.Coding.Challenge.Api.Controllers;
using Paymentsense.Coding.Challenge.Api.Models;
using Xunit;

namespace Paymentsense.Coding.Challenge.Api.Tests.Controllers
{
    public class PaymentsenseCodingChallengeControllerTests
    {
        private readonly HttpClient _client;

        public PaymentsenseCodingChallengeControllerTests()
        {
            var builder = new WebHostBuilder().UseStartup<Startup>();
            var testServer = new TestServer(builder);
            _client = testServer.CreateClient();
        }

        [Fact]
        public async Task ShouldGetAllCountries()
        {
            //When
            var response = await _client.GetAsync("/PaymentsenseCodingChallenge");

            //Then
            response.StatusCode.Should().Be(StatusCodes.Status200OK);

            var countries = JsonSerializer.Deserialize<List<Country>>(await response.Content.ReadAsStringAsync());

            countries.Count.Should().Be(250);
        }

        [Fact]
        public async Task ShouldGetCountryDetails()
        {
            //Given
            var countryCode = "GBR";

            //When
            var response = await _client.GetAsync($"/PaymentsenseCodingChallenge/{countryCode}");

            //Then
            response.StatusCode.Should().Be(StatusCodes.Status200OK);

            var country = JsonSerializer.Deserialize<Country>(await response.Content.ReadAsStringAsync());

            country.Capital.Should().Be("London");
            country.TimeZones.Count.Should().Be(9);
            country.Currencies[0].Code.Should().Be("GBP");
            country.Languages[0].Name.Should().Be("English");
        }
    }
}
