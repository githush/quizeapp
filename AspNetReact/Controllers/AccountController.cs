using AspNetReact.DataAccess.Repositories.IRepositories;
using AspNetReact.Models;
using AspNetReact.Models.Dtos;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace AspNetReact.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly UserManager<AppUser> _userManager;

        public AccountController(IConfiguration config, UserManager<AppUser> userManager)
        {
            _config = config;
            _userManager = userManager;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto loginDto)
        {
            var user = await _userManager.FindByEmailAsync(loginDto.Email);
           
            if(user != null && await _userManager.CheckPasswordAsync(user, loginDto.Password))
            {
                if (user.isProfileLocked)
                {
                    return BadRequest("Your Profile is Locked");
                }

                var claims = await _userManager.GetClaimsAsync(user);
                var isAdmin = claims.FirstOrDefault(claim => claim.Type == "Admin") is not null;
                claims.Add(new Claim("userid", user.Id));
                return Ok(new { username = user.UserName, isAdmin, Token = GenerateJwt(claims) });
            }

            return BadRequest("Invalid Attempt");
        }

        [HttpPost("adminlogin")]
        public async Task<IActionResult> AdminLogin(AdminLoginDto adminLoginDto)
        {
            var user = await _userManager.FindByNameAsync(adminLoginDto.Email);

            if (user != null && await _userManager.CheckPasswordAsync(user, adminLoginDto.Password))
            {
                var claims = await _userManager.GetClaimsAsync(user);
                var isAdmin = claims.FirstOrDefault(claim => claim.Type == "Admin") is not null;
                claims.Add(new Claim("userid", user.Id));
                return Ok(new { username = user.Email, isAdmin, Token = GenerateJwt(claims) });
            }

            return BadRequest(new { message = "Invalid Attempt" });
        }


        

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterDto registerDto)
        {
            var newUser = new AppUser
            {
                Email = registerDto.Email,
                UserName = registerDto.Email,
                GenderId = registerDto.GenderId
            };
            
            var result = await _userManager.CreateAsync(newUser, registerDto.Password);

            if (result.Succeeded)
            {
                return Ok(new { message = "Registered Successfully" });
            }

            return BadRequest(result.Errors);
        }

        [HttpPut("updateprofile")]
        [Authorize]
        public async Task<IActionResult> UpdateProfile(UpdateProfileDto updateProfileDto)
        {
            var doctor = await _userManager.FindByIdAsync(HttpContext.User.FindFirstValue("userid"));


            if(await _userManager.CheckPasswordAsync(doctor, updateProfileDto.Password))
            {
                doctor.UserName = updateProfileDto.UserName;
                doctor.FirstName = updateProfileDto.FirstName;
                doctor.LastName = updateProfileDto.LastName;
                var res = await _userManager.UpdateAsync(doctor);

                if (res.Succeeded)
                {
                    return Ok("Profile Updated");
                }
            }

            return BadRequest("invalid password");
        }


        [HttpGet("getprofileinfo")]
        [Authorize]
        public async Task<IActionResult> GetProfileInfo()
        {
            var doctor = await _userManager.FindByIdAsync(HttpContext.User.FindFirstValue("userid"));
            return Ok(new { username = doctor.UserName, firstname = doctor.FirstName, lastname = doctor.LastName });
        }



        [HttpDelete("delete")]
        public async Task<IActionResult> DeleteProfile()
        {
            var user = await _userManager.FindByIdAsync(HttpContext.User.FindFirstValue("userid"));
            var res = await _userManager.DeleteAsync(user);
            if (res.Succeeded)
            {
                return Ok("User Deleted");
            }

            return BadRequest("User Can't Be Deleted");
        }


        [HttpPut("LockUserProfile/{id}")]
        [Authorize]
        [Authorize(Policy = "MustBeAdmin")]
        public async Task<IActionResult> LockUserProfile(string id)
        {
            var user = await _userManager.Users.FirstOrDefaultAsync(user => user.Id == id);
            user.isProfileLocked = !user.isProfileLocked;

            await _userManager.UpdateAsync(user);

            return Ok(new { user.isProfileLocked });
        } 

        private string GenerateJwt(IEnumerable<Claim> claims)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                _config["Jwt:Issuer"],
                _config["Jwt:Issuer"],
                claims,
                signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
