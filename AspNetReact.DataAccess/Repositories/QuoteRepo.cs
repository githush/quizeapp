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
    public class QuoteRepo : IQuoteRepo
    {
        private readonly AppDbContext _db;

        public QuoteRepo(AppDbContext db)
        {
            _db = db;
        }
        public async Task<Quote> AddQuoteAsync(Quote quote)
        {
            var result = await _db.Quotes.AddAsync(quote);
            await _db.SaveChangesAsync();
            return result.Entity;
        }

        public async Task DeleteQuoteAsync(int quoteId)
        {
            var result = await _db.Quotes.FirstOrDefaultAsync(q => q.Id == quoteId);
            if(result is not null)
            {
                _db.Quotes.Remove(result);
                await _db.SaveChangesAsync();
            }
        }

        public async Task<IEnumerable<Quote>> GetAllAsync()
        {
            return _db.Quotes;
        }

        public async Task<Quote> GetQuoteAsync(int id)
        {
            return await _db.Quotes.Where(q => q.Id == id).Select(q => new Quote
            {
                Id = q.Id,
                Text = q.Text,
                AuthorId = q.AuthorId,
                Author = q.Author
            }).FirstOrDefaultAsync();
        }

        public async Task<Quote> GetRandQuoteAsync(int[] exceptIds)
        {
            var quote = await _db.Quotes.Where(q => !exceptIds.Contains(q.Id)).OrderBy(a => Guid.NewGuid()).FirstOrDefaultAsync();
            return quote;
        }

        public async Task<Quote> UpdateQuoteAsync(Quote quote)
        {
            var result = await _db.Quotes.Where(q => q.Id == quote.Id).FirstOrDefaultAsync();

            if(result is not null)
            {
                result.Text = quote.Text;
                result.AuthorId = quote.AuthorId;

                //_db.Quotes.Update(result);
                await _db.SaveChangesAsync();
                return new Quote { Id = result.Id, Text = result.Text, AuthorId = result.AuthorId };
            }

            return null;
        }
    }
}
