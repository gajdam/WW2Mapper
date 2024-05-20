using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ww2mapper.Server.Models
{
    public class PlaceTag
    {
        [Key]
        public int Id { get; set; }
        [Column("place_id")]

        public int PlaceId { get; set; }
        [ForeignKey("PlaceId")]
        public Place Place { get; set; }
        [Column("tag_id")]

        public int TagId { get; set; }
        [ForeignKey("TagId")]
        public Tag Tag { get; set; }
    }
}
