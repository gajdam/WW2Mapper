using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using System.Threading.Tasks;
using System.Collections.Generic;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace ww2mapper.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PlacesController : ControllerBase
    {
        private readonly IHttpClientFactory _clientFactory;
        private readonly string? _apiKey;

        public PlacesController(IHttpClientFactory clientFactory, IConfiguration configuration)
        {
            _clientFactory = clientFactory;
            _apiKey = configuration["GoogleApiKey"];
        }

        [HttpPost("GetPlaceByQuery/{query}")]
        public async Task<IActionResult> GetPlacesByText(string query)
        {
            var request = new HttpRequestMessage(HttpMethod.Post, $"https://places.googleapis.com/v1/places:searchText?key={_apiKey}");
            request.Headers.Add("X-Goog-FieldMask", "places.displayName,places.types,places.formattedAddress");
            var jsonContent = "{\"textQuery\": \"" + query + "\"}";
            request.Content = new StringContent(jsonContent, System.Text.Encoding.UTF8, "application/json");

            var client = _clientFactory.CreateClient();

            var response = await client.SendAsync(request);

            if (response.IsSuccessStatusCode)
            {
                return Ok(await response.Content.ReadAsStringAsync());
            }
            else
            {
                return StatusCode((int)response.StatusCode);
            }
        }

        [HttpPost("Geocode/{address}")]
        public async Task<IActionResult> GeocodePlace([FromRoute] string address)
        {
            address = Uri.EscapeDataString(address); // encode spaces as %20
            var request = new HttpRequestMessage(HttpMethod.Get, $"https://maps.googleapis.com/maps/api/geocode/json?address={address}&key={_apiKey}");

            var client = _clientFactory.CreateClient();

            var response = await client.SendAsync(request);

            if (response.IsSuccessStatusCode)
            {
                return Ok(await response.Content.ReadAsStringAsync());
            }
            else
            {
                return StatusCode((int)response.StatusCode);
            }
        }
    }
}
