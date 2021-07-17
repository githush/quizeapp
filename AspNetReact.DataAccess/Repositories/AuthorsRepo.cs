using AspNetReact.DataAccess.Repositories.IRepositories;
using AspNetReact.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AspNetReact.DataAccess.Repositories
{
    public class AuthorsRepo : IAuthorsRepo
    {

        private readonly AppDbContext _db;


        public AuthorsRepo(AppDbContext db)
        {
            _db = db;
        }

        public async Task<IEnumerable<Author>> GetAllAsync()
        {
            return _db.Authors;
        }

        public async Task<Author> GetAuthorAsync(int id)
        {
            var author = await _db.Authors.Where(a => a.Id == id).Select(a => new Author
            {
                Id = a.Id,
                FullName = a.FullName
            }).FirstOrDefaultAsync();
            
            return author;
        }

        public async Task<IEnumerable<Author>> GetRandAuthorsAsync(int exceptId)
        {
            var randAuthors = _db.Authors.Where(a => a.Id != exceptId).OrderBy(a => Guid.NewGuid()).Take(2).Select(a => new Author {
                Id = a.Id,
                FullName = a.FullName
            });
            return randAuthors;
        }
    }
}
