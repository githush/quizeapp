using AspNetReact.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AspNetReact.DataAccess.Repositories.IRepositories
{
    public interface IQuoteRepo
    {
        Task<IEnumerable<Quote>> GetAllAsync();
        Task<Quote> GetRandQuoteAsync(int[] exceptIds);
        Task<Quote> GetQuoteAsync(int id);
        Task<Quote> AddQuoteAsync(Quote quote);
        Task<Quote> UpdateQuoteAsync(Quote quote);
        Task DeleteQuoteAsync(int quoteId);
    }
}
