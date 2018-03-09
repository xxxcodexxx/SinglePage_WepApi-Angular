namespace SinglePageApp.Migrations
{
    using SinglePageApp.Models;
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<SinglePageApp.Models.SinglePageApplicationDbContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(SinglePageApp.Models.SinglePageApplicationDbContext context)
        {
            //  This method will be called after migrating to the latest version.

            //  You can use the DbSet<T>.AddOrUpdate() helper extension method 
            //  to avoid creating duplicate seed data. E.g.
            //
            //    context.People.AddOrUpdate(
            //      p => p.FullName,
            //      new Person { FullName = "Andrew Peters" },
            //      new Person { FullName = "Brice Lambson" },
            //      new Person { FullName = "Rowan Miller" }
            //    );
            //
            context.Products.AddOrUpdate(
                p => p.Name,
                new Product
                {
                    Name = "Orange Juice",
                    CategoryId = 1,
                    Price = 50,
                    ReleaseDate = DateTime.Now
                }
                );
            context.Categories.AddOrUpdate(
                  p => p.Title,
                  new Category
                  {
                      Title = "Food",
                      Supplier = "KFC"
                  },
                  new Category
                  {
                      Title = "Drink",
                      Supplier="Coca Cola"
                  }
              );
        }
    }
}
