using AspNetReact.DataAccess.Repositories.IRepositories;
using AspNetReact.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AspNetReact.DataAccess.Repositories
{
    public class GameHistoryRepo : IGameHistoryRepo
    {
        private readonly AppDbContext _db;

        public GameHistoryRepo(AppDbContext db)
        {
            _db = db;
        }

        public async Task<GameHistory> AddGameHistory(GameHistory gameHistory)
        {
            var result = await _db.GameHistories.AddAsync(gameHistory);
            await _db.SaveChangesAsync();
            return result.Entity;
        }

        public async Task<IEnumerable<GameHistory>> GetGameHistories(string userId)
        {
            return _db.GameHistories.Where(gh => gh.UserId == userId);
        }
    }
}
