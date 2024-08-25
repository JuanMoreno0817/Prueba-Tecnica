using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using PruebaTecnica.DAL.Entities;
using PruebaTecnica.Response;
using PruebaTecnica.DTOs;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace PruebaTecnica.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly LoginServices _services;
        private IConfiguration _config;

        public LoginController(LoginServices services, IConfiguration config)
        {
            _services = services;
            _config = config;
        }

        [HttpPost]
        public async Task<ActionResult<LoginResponse>> Login(LoginDTO person)
        {
            LoginResponse responseLogin = new LoginResponse();
            var persona = await _services.GetPerson(person);

            if (persona == null)
            {
                responseLogin.response = "Datos erroneos";
                responseLogin.status = "Error";
                return Ok(responseLogin);
            }

            responseLogin.response = GenerateToken(persona);
            if (responseLogin.response != null)
            {
                responseLogin.status = "ok";
            }
            else
                return Ok();

            return Ok(responseLogin);
        }

        private string GenerateToken(Person person)
        {
            var claims = new[]
            {
                new Claim(ClaimTypes.Name, person.Name),
                new Claim(ClaimTypes.Email, person.Email),
                new Claim("userType", person.userType.ToString())
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config.GetSection("JWT:Key").Value));
            var credenciales = new SigningCredentials(key, SecurityAlgorithms.Aes128CbcHmacSha256);

            var securityToken = new JwtSecurityToken(
                                claims: claims,
                                expires: DateTime.Now.AddMinutes(30),
                                signingCredentials: credenciales
                                );
            string token = new JwtSecurityTokenHandler().WriteToken(securityToken);

            return token;
        }
    }
}
