using AspNetReact.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AspNetReact.DataAccess.Repositories.IRepositories
{
    public interface IAuthorsRepo
    {
        Task<Author> GetAuthorAsync(int id);
        Task<IEnumerable<Author>> GetAllAsync();
        Task<IEnumerable<Author>> GetRandAuthorsAsync(int exceptId);
    }
}
