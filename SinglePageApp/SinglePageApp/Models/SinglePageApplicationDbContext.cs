namespace SinglePageApp.Models
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;
    using SinglePageApp.Models;

    public partial class SinglePageApplicationDbContext : DbContext
    {
        public SinglePageApplicationDbContext()
            : base("name=SinglePageApplicationDbContext")
        {
        }

        public DbSet<Product> Products { get; set; }
        public DbSet<Category> Categories { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
        }
    }
}
