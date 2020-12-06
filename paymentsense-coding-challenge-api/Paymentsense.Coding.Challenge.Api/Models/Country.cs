using System.Text.Json.Serialization;

namespace Paymentsense.Coding.Challenge.Api.Models
{
    public class Country
    {
        [JsonPropertyName("name")]
        public string Name { get; set; }

        [JsonPropertyName("flag")]
        public string Flag { get; set; }

        [JsonPropertyName("alpha3Code")]
        public string Alpha3Code { get; set; }
    }
}