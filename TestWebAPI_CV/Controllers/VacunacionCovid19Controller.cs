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
    public class VacunacionCovid19Controller : ControllerBase
    {
        private readonly appDbContext _context;

        public VacunacionCovid19Controller(appDbContext context)
        {
            _context = context;
        }

        // GET: api/VacunacionCovid19
        [HttpGet]
        public async Task<ActionResult<IEnumerable<VacunacionCovid19>>> GetVacunacionCovid19()
        {
            return await _context.VacunacionCovid19.ToListAsync();
        }

        // GET: api/VacunacionCovid19/5
        [HttpGet("{id}")]
        public async Task<ActionResult<VacunacionCovid19>> GetVacunacionCovid19(int id)
        {
            var vacunacionCovid19 = await _context.VacunacionCovid19.FindAsync(id);

            if (vacunacionCovid19 == null)
            {
                return NotFound();
            }

            return vacunacionCovid19;
        }

        // PUT: api/VacunacionCovid19/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutVacunacionCovid19(int id, VacunacionCovid19 vacunacionCovid19)
        {
            if (id != vacunacionCovid19.VacunacionId)
            {
                return BadRequest();
            }

            _context.Entry(vacunacionCovid19).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!VacunacionCovid19Exists(id))
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

        // POST: api/VacunacionCovid19
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<VacunacionCovid19>> PostVacunacionCovid19(VacunacionCovid19 vacunacionCovid19)
        {
            _context.VacunacionCovid19.Add(vacunacionCovid19);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetVacunacionCovid19", new { id = vacunacionCovid19.VacunacionId }, vacunacionCovid19);
        }

        // DELETE: api/VacunacionCovid19/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<VacunacionCovid19>> DeleteVacunacionCovid19(int id)
        {
            var vacunacionCovid19 = await _context.VacunacionCovid19.FindAsync(id);
            if (vacunacionCovid19 == null)
            {
                return NotFound();
            }

            _context.VacunacionCovid19.Remove(vacunacionCovid19);
            await _context.SaveChangesAsync();

            return vacunacionCovid19;
        }

        private bool VacunacionCovid19Exists(int id)
        {
            return _context.VacunacionCovid19.Any(e => e.VacunacionId == id);
        }
    }
}
