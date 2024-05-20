using Microsoft.EntityFrameworkCore;

namespace ww2mapper.Server.Models
{
    public class WW2MapperContext : DbContext
    {
        public WW2MapperContext(DbContextOptions<WW2MapperContext> options) : base(options) { }

        public DbSet<Place> Places { get; set; }
        public DbSet<Tag> Tags { get; set; }
        public DbSet<PlaceTag> PlaceTags { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<UserFavorite> UserFavorites { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UserFavorite>()
                .HasKey(uf => new { uf.UserId, uf.PlaceId });

            base.OnModelCreating(modelBuilder);
        }
    }
}
