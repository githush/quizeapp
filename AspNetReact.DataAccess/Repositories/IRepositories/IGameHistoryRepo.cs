using AspNetReact.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AspNetReact.DataAccess.Repositories.IRepositories
{
    public interface IGameHistoryRepo
    {
        Task<IEnumerable<GameHistory>> GetGameHistories(string userId);
        Task<GameHistory> AddGameHistory(GameHistory gameHistory);
    }
}
