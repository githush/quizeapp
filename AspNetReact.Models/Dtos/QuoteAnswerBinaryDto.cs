using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AspNetReact.Models.Dtos
{
    public class QuoteAnswerBinaryDto
    {
        public int QuoteId { get; set; }
        public int SuggestedAuthorsId { get; set; }
        public bool IsAnswerYes { get; set; }
    }
}
