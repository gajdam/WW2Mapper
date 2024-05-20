using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ww2mapper.Server.Models;

namespace ww2mapper.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlaceTagsController : ControllerBase
    {
        private readonly WW2MapperContext _context;

        public PlaceTagsController(WW2MapperContext context)
        {
            _context = context;
        }

        // GET: api/PlaceTags
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PlaceTag>>> GetPlaceTags()
        {
            return await _context.PlaceTags.ToListAsync();
        }

        // GET: api/PlaceTags/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PlaceTag>> GetPlaceTag(int id)
        {
            var placeTag = await _context.PlaceTags.FindAsync(id);

            if (placeTag == null)
            {
                return NotFound();
            }

            return placeTag;
        }

        // POST: api/PlaceTags
        [HttpPost]
        public async Task<ActionResult<PlaceTag>> PostPlaceTag([FromBody] PlaceTagDto placeTagDto)
        {
            // Check if place and tag exist
            var placeExists = await _context.Places.AnyAsync(p => p.PlaceId == placeTagDto.PlaceId);
            var tagExists = await _context.Tags.AnyAsync(t => t.Id == placeTagDto.TagId);

            if (!placeExists || !tagExists)
            {
                return BadRequest("Invalid place ID or tag ID");
            }

            var placeTag = new PlaceTag
            {
                PlaceId = placeTagDto.PlaceId,
                TagId = placeTagDto.TagId
            };

            _context.PlaceTags.Add(placeTag);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetPlaceTag), new { id = placeTag.Id }, placeTag);
        }

        // PUT: api/PlaceTags/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPlaceTag(int id, PlaceTag placeTag)
        {
            if (id != placeTag.Id)
            {
                return BadRequest();
            }

            // Check if place and tag exist
            var placeExists = await _context.Places.AnyAsync(p => p.PlaceId == placeTag.PlaceId);
            var tagExists = await _context.Tags.AnyAsync(t => t.Id == placeTag.TagId);

            if (!placeExists || !tagExists)
            {
                return BadRequest("Invalid place ID or tag ID");
            }

            _context.Entry(placeTag).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PlaceTagExists(id))
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

        // DELETE: api/PlaceTags/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePlaceTag(int id)
        {
            var placeTag = await _context.PlaceTags.FindAsync(id);
            if (placeTag == null)
            {
                return NotFound();
            }

            _context.PlaceTags.Remove(placeTag);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PlaceTagExists(int id)
        {
            return _context.PlaceTags.Any(e => e.Id == id);
        }
    }

    public class PlaceTagDto
    {
        public int PlaceId { get; set; }
        public int TagId { get; set; }
    }
}
