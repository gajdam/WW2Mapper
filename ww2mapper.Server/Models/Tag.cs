using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ww2mapper.Server.Models
{
    public class Tag
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
    }
}
