using AspNetReact.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text; 
using System.Threading.Tasks;

namespace AspNetReact.DataAccess
{
    public class AppDbContext : IdentityDbContext<AppUser>
    {
        public AppDbContext(DbContextOptions<AppDbContext> options):base(options)
        {

        }

        // Custom DbSets...
        public DbSet<Gender> Genders { get; set; }  
        public DbSet<Author> Authors { get; set; }
        public DbSet<Quote> Quotes { get; set; }

        public DbSet<GameHistory> GameHistories { get; set; }



    }
}
     