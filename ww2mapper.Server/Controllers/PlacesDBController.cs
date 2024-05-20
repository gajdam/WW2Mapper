using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ww2mapper.Server.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ww2mapper.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlacesDBController : ControllerBase
    {
        private readonly WW2MapperContext _context;

        public PlacesDBController(WW2MapperContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Place>>> GetPlaces()
        {
            return await _context.Places
                .Select(p => new Place 
                {
                    PlaceId = p.PlaceId,
                    PlaceName = p.PlaceName,
                    Description = p.Description,
                    Address = p.Address,
                    Latitude = p.Latitude,
                    Longitude = p.Longitude,
                    PlaceType = p.PlaceType
                })
                .ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Place>> GetPlace(int id)
        {
            var place = await _context.Places.FindAsync(id);

            if (place == null)
            {
                return NotFound();
            }

            return place;
        }

        [HttpPost]
        public async Task<ActionResult<Place>> PostPlace(Place place)
        {
            // Only add the Place, not the associated UserFavorites or PlaceTags
            _context.Places.Add(place);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPlace", new { id = place.PlaceId }, place);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutPlace(int id, Place place)
        {
            if (id != place.PlaceId)
            {
                return BadRequest();
            }

            _context.Entry(place).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PlaceExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePlace(int id)
        {
            var place = await _context.Places.FindAsync(id);
            if (place == null)
            {
                return NotFound();
            }

            _context.Places.Remove(place);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PlaceExists(int id)
        {
            return _context.Places.Any(e => e.PlaceId == id);
        }
    }
}
