using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AspNetReact.Models.Dtos
{
    public class QuoteAnswerDto
    {
        public int QuoteId { get; set; }
        public int SelectedAuthorsId { get; set; }
    }
}
