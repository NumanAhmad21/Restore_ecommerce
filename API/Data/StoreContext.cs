using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class StoreContext(DbContextOptions options) : IdentityDbContext<User>(options)
{
    public required DbSet<Product> Products { get; set; }
    public required DbSet<Basket> Baskets { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
        builder.Entity<IdentityRole>()
            .HasData(
                new IdentityRole {Id="34d02f1d-2131-404c-b9f2-acd4d470fe1a", Name = "Member", NormalizedName = "MEMBER" },
                new IdentityRole {Id="b375c78c-cca0-43e0-806b-44b194a8ef68", Name = "Admin", NormalizedName = "ADMIN" }
            );
    }
}
