using System.ComponentModel.DataAnnotations.Schema;

namespace ww2mapper.Server.Models
{
    public class UserFavorite
    {
        [Column("user_id")]

        public int UserId { get; set; }
        [ForeignKey("UserId")]
        public User User { get; set; }
        [Column("place_id")]

        public int PlaceId { get; set; }
        [ForeignKey("PlaceId")]
        public Place Place { get; set; }
    }
}
