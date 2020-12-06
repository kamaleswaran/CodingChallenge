using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Paymentsense.Coding.Challenge.Api.Models;
using Paymentsense.Coding.Challenge.Api.Services;

namespace Paymentsense.Coding.Challenge.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PaymentsenseCodingChallengeController : ControllerBase
    {
        private readonly ICountryService _countryService;

        public PaymentsenseCodingChallengeController(ICountryService countryService)
        {
            _countryService = countryService;
        }

        [HttpGet]
        public async Task<ActionResult> Get()
        {
            var countries = await _countryService.GetAllCountries();

            return Ok(countries);
        }

        [HttpGet("{countryCode}")]
        public async Task<ActionResult> Get(string countryCode)
        {
            var countries = await _countryService.GetAllCountries();

            var countryDetail = countries.FirstOrDefault(c => c.Alpha3Code.ToLower() == countryCode.ToLower());

            countryDetail.Borders = MapCountryBoraders(countries, countryDetail.Borders);

            return Ok(countryDetail);
        }

        private List<string> MapCountryBoraders(List<Country> countries, List<string> borderCode)
        {
            return borderCode.Select(border => countries.SingleOrDefault(c => c.Alpha3Code.ToLower() == border.ToLower())?.Name).ToList();
        }
    }
}
