using AspNetReact.DataAccess.Repositories.IRepositories;
using AspNetReact.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace AspNetReact.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly IGameHistoryRepo _gameHistoryRepo;

        public UsersController(UserManager<AppUser> userManager, IGameHistoryRepo gameHistoryRepo)
        {
            _userManager = userManager;
            _gameHistoryRepo = gameHistoryRepo;
        }

        [HttpGet]
        [Authorize]
        [Authorize(Policy = "MustBeAdmin")]
        public IActionResult GetAll()
        {
            var currentUserId = HttpContext.User.FindFirstValue("userid");
            var users = _userManager.Users.Where(user => user.Id != currentUserId).Select(user => new { 
                id = user.Id, 
                username = user.UserName,
                isLocked = user.isProfileLocked,
                gender = user.Gender.GenderType
            });

            return Ok(users);
        }

        [HttpGet("gamehistory/{id}")]
        [Authorize]
        public async Task<IActionResult> GetGameHistoryAll(string id)
        {
            var usersHistory = await _gameHistoryRepo.GetGameHistories(id);
            return Ok(usersHistory);
        }
        
    }
}
