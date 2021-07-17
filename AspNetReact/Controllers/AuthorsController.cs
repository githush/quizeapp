using AspNetReact.DataAccess.Repositories.IRepositories;
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
    public class AuthorsController : ControllerBase
    {
        private readonly IAuthorsRepo _authRepo;

        public AuthorsController(IAuthorsRepo authRepo)
        {
            _authRepo = authRepo;
        }


        [HttpGet]
        [Authorize]
        [Authorize(Policy = "MustBeAdmin")]
        public async Task<IActionResult> GetAllAuthors()
        {
            var authors = await _authRepo.GetAllAsync();
            return Ok(authors);
        }


        [HttpGet("test")]
        public async Task<IActionResult> GetRandAuthors()
        {
            var authors = await _authRepo.GetRandAuthorsAsync(1);
            return Ok(authors);
        }

    }
}
