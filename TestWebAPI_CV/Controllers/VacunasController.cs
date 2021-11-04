using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TestWebAPI_CV.Context;
using TestWebAPI_CV.Models;

namespace TestWebAPI_CV.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VacunasController : ControllerBase
    {
        private readonly appDbContext _context;

        public VacunasController(appDbContext context)
        {
            _context = context;
        }

        // GET: api/Vacunas
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Vacunas>>> GetVacunas()
        {
            return await _context.Vacunas.ToListAsync();
        }

        // GET: api/Vacunas/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Vacunas>> GetVacunas(int id)
        {
            var vacunas = await _context.Vacunas.FindAsync(id);

            if (vacunas == null)
            {
                return NotFound();
            }

            return vacunas;
        }

        // PUT: api/Vacunas/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutVacunas(int id, Vacunas vacunas)
        {
            if (id != vacunas.VacunaId)
            {
                return BadRequest();
            }

            _context.Entry(vacunas).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!VacunasExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Vacunas
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Vacunas>> PostVacunas(Vacunas vacunas)
        {
            _context.Vacunas.Add(vacunas);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetVacunas", new { id = vacunas.VacunaId }, vacunas);
        }

        // DELETE: api/Vacunas/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Vacunas>> DeleteVacunas(int id)
        {
            var vacunas = await _context.Vacunas.FindAsync(id);
            if (vacunas == null)
            {
                return NotFound();
            }

            _context.Vacunas.Remove(vacunas);
            await _context.SaveChangesAsync();

            return vacunas;
        }

        private bool VacunasExists(int id)
        {
            return _context.Vacunas.Any(e => e.VacunaId == id);
        }
    }
}
