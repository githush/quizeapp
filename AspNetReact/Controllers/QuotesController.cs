using AspNetReact.DataAccess.Repositories.IRepositories;
using AspNetReact.Models;
using AspNetReact.Models.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AspNetReact.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuotesController : ControllerBase
    {
        private readonly IQuoteRepo _quoteRepo;

        public QuotesController(IQuoteRepo quoteRepo)
        {
            _quoteRepo = quoteRepo;
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetQuote(int id)
        {
            var quote = await _quoteRepo.GetQuoteAsync(id);
            if(quote is not null)
            {
                return Ok(quote);
            }

            return NotFound();
        }

        [HttpGet]
        [Authorize]
        [Authorize(Policy = "MustBeAdmin")]
        public async Task<IActionResult> GetAllQuote()
        {
            var allQuotes = await _quoteRepo.GetAllAsync();
            return Ok(allQuotes);
        }

        [HttpPost]
        [Authorize]
        [Authorize(Policy = "MustBeAdmin")]
        public async Task<IActionResult> AddQuote(AddQuoteDto addQuoteDto)
        {
            var newQuote = new Quote
            {
                Text = addQuoteDto.Text,
                AuthorId = addQuoteDto.AuthorId.Value,
            };

            var createdQuote = await _quoteRepo.AddQuoteAsync(newQuote);

            return CreatedAtAction(nameof(GetQuote), new { id = createdQuote.Id }, createdQuote);
        }

        [HttpPut]
        [Authorize]
        [Authorize(Policy = "MustBeAdmin")]
        public async Task<IActionResult> UpdateQuote(UpdateQuoteDto updateQuoteDto)
        {
            var quoteToUpdate = await _quoteRepo.GetQuoteAsync(updateQuoteDto.Id.Value);
            if(quoteToUpdate is null)
            {
                return NotFound();
            }

            quoteToUpdate.Text = updateQuoteDto.Text;
            quoteToUpdate.AuthorId = updateQuoteDto.AuthorId.Value;

            var updatedQuote = await _quoteRepo.UpdateQuoteAsync(quoteToUpdate);
            return Ok(updatedQuote);
        }


        [HttpDelete("{id:int}")]
        [Authorize]
        [Authorize(Policy = "MustBeAdmin")]
        public async Task<IActionResult> DeleteQuote(int id)
        {
            var quoteToUpdate = await _quoteRepo.GetQuoteAsync(id);
            if (quoteToUpdate is null)
            {
                return NotFound();
            }

            await _quoteRepo.DeleteQuoteAsync(id);

            return Ok("Deleted");
        }
    }
}
