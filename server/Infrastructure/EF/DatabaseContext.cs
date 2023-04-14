namespace Infrastructure.EF
{
    using Domain.Enums;
    using Domain.Models;
    using Microsoft.EntityFrameworkCore;

    public class DatabaseContext : DbContext
    {
        public DatabaseContext(DbContextOptions<DatabaseContext> options)
                 : base(options)
        {
            //Database.Migrate();
            //Database.EnsureDeleted();
            Database.EnsureCreated();
        }

        public DbSet<Candidate> Candidates { get; set; }

        public DbSet<Position> Positions { get; set; }

        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            
        }
    }
}
