using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.CompilerServices;

namespace ww2mapper.Server.Models
{
    public class Place
    {
        [Key]
        [Column("place_id")]
        public int PlaceId { get; set; }
        [Column("place_name")]

        public string PlaceName { get; set; }
        public string Description { get; set; }
        public string Address { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        [Column("place_type")]

        public string PlaceType { get; set; }
    }
}
