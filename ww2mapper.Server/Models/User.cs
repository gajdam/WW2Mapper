using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ww2mapper.Server.Models
{
    public class User
    {
        [Key]
        [Column("user_id")]

        public int UserId { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        // public ICollection<UserFavorite> UserFavorites { get; set; }
    }
}
