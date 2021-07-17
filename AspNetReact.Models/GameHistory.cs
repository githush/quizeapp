using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AspNetReact.Models
{
    public class GameHistory
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public int QuoteId { get; set; }
        public bool IsCorrectAnswer { get; set; }
        public string RealAuthorName { get; set; }
        public string SelectedAuthorName { get; set; }
        public string QuoteText { get; set; }
    }
}
