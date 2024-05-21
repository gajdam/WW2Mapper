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
    public class UserFavoriteController : ControllerBase
    {
        private readonly WW2MapperContext _context;

        public UserFavoriteController(WW2MapperContext context)
        {
            _context = context;
        }

        // GET: api/UserFavorite
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserFavorite>>> GetUserFavorites()
        {
            return await _context.UserFavorites.ToListAsync();
        }

        // GET: api/UserFavorite/5
        [HttpGet("{id}")]
        public async Task<ActionResult<UserFavorite>> GetUserFavorite(int id)
        {
            var userFavorite = await _context.UserFavorites.FindAsync(id);

            if (userFavorite == null)
            {
                return NotFound();
            }

            return userFavorite;
        }

        // POST: api/UserFavorite
        [HttpPost]
        public async Task<ActionResult<UserFavorite>> PostUserFavorite([FromBody] UserFavoriteDto userFavoriteDto)
        {
            // Check if user and place exist
            var userExists = await _context.Users.AnyAsync(u => u.UserId == userFavoriteDto.UserId);
            var placeExists = await _context.Places.AnyAsync(p => p.PlaceId == userFavoriteDto.PlaceId);

            if (!userExists || !placeExists)
            {
                return BadRequest("Invalid user ID or place ID");
            }

            var userFavorite = new UserFavorite
            {
                UserId = userFavoriteDto.UserId,
                PlaceId = userFavoriteDto.PlaceId
            };

            _context.UserFavorites.Add(userFavorite);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetUserFavorite), new { id = userFavorite.UserId }, userFavorite);
        }

        // DELETE: api/UserFavorite/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUserFavorite(int id)
        {
            var userFavorite = await _context.UserFavorites.FindAsync(id);
            if (userFavorite == null)
            {
                return NotFound();
            }

            _context.UserFavorites.Remove(userFavorite);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UserFavoriteExists(int id)
        {
            return _context.UserFavorites.Any(e => e.UserId == id);
        }
    }

    public class UserFavoriteDto
    {
        public int UserId { get; set; }
        public int PlaceId { get; set; }
    }
}