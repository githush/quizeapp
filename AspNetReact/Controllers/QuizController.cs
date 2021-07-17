using AspNetReact.DataAccess.Repositories.IRepositories;
using AspNetReact.Models;
using AspNetReact.Models.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace AspNetReact.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuizController : ControllerBase
    {
        private readonly IGameHistoryRepo _gameHistoryRepo;
        private readonly IQuoteRepo _quoteRepo;
        private readonly IAuthorsRepo _authorsRepo;

        public QuizController(IGameHistoryRepo gameHistoryRepo, IQuoteRepo quoteRepo, IAuthorsRepo authorsRepo)
        {
            _gameHistoryRepo = gameHistoryRepo;
            _quoteRepo = quoteRepo;
            _authorsRepo = authorsRepo;
        }

        [HttpGet("rand")]
        [Authorize]
        public async Task<IActionResult> GetRandomQuote()
        {
            var currentUserId = HttpContext.User.FindFirstValue("userid");
            var quoteIds = (await _gameHistoryRepo.GetGameHistories(currentUserId)).Select(gh => gh.QuoteId);

            var quote = await _quoteRepo.GetRandQuoteAsync(quoteIds.ToArray());

            if (quote is null)
            {
                return NotFound();
            }

            var extraAuthors = (await _authorsRepo.GetRandAuthorsAsync(quote.AuthorId)).ToList();
            extraAuthors.Add(await _authorsRepo.GetAuthorAsync(quote.AuthorId));
            var shuffledAuthors = extraAuthors.OrderBy(ea => Guid.NewGuid());

            var resObj = new
            {
                quote,
                authors = shuffledAuthors
            };

            return Ok(resObj);
        }


        [HttpPost("answer")]
        [Authorize]
        public async Task<IActionResult> GetAnswer(QuoteAnswerDto quoteAnswerDto)
        {
            var quote = await _quoteRepo.GetQuoteAsync(quoteAnswerDto.QuoteId);
            var selectedAuthor = await _authorsRepo.GetAuthorAsync(quoteAnswerDto.SelectedAuthorsId);

            var gameHistory = new GameHistory
            {
                QuoteId = quote.Id,
                IsCorrectAnswer = quote.AuthorId == quoteAnswerDto.SelectedAuthorsId,
                SelectedAuthorName = selectedAuthor.FullName,
                RealAuthorName = quote.Author.FullName,
                QuoteText = quote.Text,
                UserId = HttpContext.User.FindFirstValue("userid")
            };

            await _gameHistoryRepo.AddGameHistory(gameHistory);

            return Ok(new { isAnswerCorrect = quote.AuthorId == quoteAnswerDto.SelectedAuthorsId, realAuthorName = quote.Author.FullName, realAuthorId = quote.Author.Id });
        }


        [HttpPost("answerbinary")]
        [Authorize]
        public async Task<IActionResult> GetAnswerBinary(QuoteAnswerBinaryDto quoteAnswerBinaryDto)
        {

            var quote = await _quoteRepo.GetQuoteAsync(quoteAnswerBinaryDto.QuoteId);

            var isSuggestionTrue = quote.AuthorId == quoteAnswerBinaryDto.SuggestedAuthorsId;

            var gameHistory = new GameHistory
            {
                QuoteId = quote.Id,
                IsCorrectAnswer = isSuggestionTrue == quoteAnswerBinaryDto.IsAnswerYes,
                RealAuthorName = quote.Author.FullName,
                QuoteText = quote.Text,
                UserId = HttpContext.User.FindFirstValue("userid")
            };

            await _gameHistoryRepo.AddGameHistory(gameHistory);

            return Ok(new { isAnswerCorrect = isSuggestionTrue == quoteAnswerBinaryDto.IsAnswerYes, realAuthorName = quote.Author.FullName });
        }
    }
}
