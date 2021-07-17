using AspNetReact.DataAccess.Repositories.IRepositories;
using AspNetReact.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AspNetReact.DataAccess.Repositories
{
    public class GendersRepo : IGendersRepo
    {
        private readonly AppDbContext _db;

        public GendersRepo(AppDbContext db)
        {
            _db = db;
        }
        public async Task<IEnumerable<Gender>> GetAllAsync()
        {
            return _db.Genders;
        }
    }
}
