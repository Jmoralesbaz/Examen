using Chubb.Examen.ApiProducto.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Chubb.Examen.ApiProducto.Controllers
{

    [ApiController]
    [Route("[controller]")]
    //[EnableCors("AllowOrigin")]
    [Produces("application/json")]
    [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(Error))]
    [ProducesResponseType(StatusCodes.Status404NotFound, Type = typeof(Error))]
    [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(Error))]
    public class ProductosController : ControllerBase
    {
        List<Producto> data;
        public ProductosController(List<Producto> _data) {
            data = _data;
        }

        [HttpGet]
        [Route("Listar")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(List<Producto>))]
        public IActionResult ListAll() {
            if (data.Count == 0)
            {
                return StatusCode(404, new Error { codigo = 404, mensaje = "No hay registros para mostrar" });
            }
            else {
                return Ok(data);
            }
        }

        [HttpGet]
        [Route("Detalle/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Producto))]
        public IActionResult producto(int id)
        {
            if (data.Count == 0 || data.Where(w=>w.id == id).ToList().Count==0)
            {
                return StatusCode(404, new Error { codigo = 404, mensaje = "No hay registros para mostrar" });
            }
            else
            {
                return Ok(data.Where(w=>w.id == id).First());
            }
        }
        [HttpPost]
        [Route("Nuevo")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(int))]
        public IActionResult crear(NuevoProducto nuevo)
        {
            int i = 0;
            var p = convertir(nuevo);
            if (p.precio == 0 || string.IsNullOrEmpty(p.categoria) || string.IsNullOrEmpty(p.descripcion))
            {
                return StatusCode(400, new Error { codigo = 400, mensaje = $"Por favor revisa el valor de Precio({p.precio}), Categoria({p.categoria}), Descripcion({p.descripcion}) estos no pueden ir vacios o en 0" });
            }
            else
            {
                if (data.Count == 0)
                {
                    i = data.Count + 1;
                    p.id = i;
                    data.Add(p);
                }
                else
                {
                    if (data.Where(w => w.nombre.Trim().ToLower() == p.nombre.Trim().ToLower()).ToList().Count > 0)
                    {
                        return StatusCode(400, new Error { codigo = 400, mensaje = $"El nombre del producto({p.nombre}) ya existe, porfavor revisalo" });
                    }
                    else
                    {
                        i = data.Count + 1;
                        p.id = i;
                        data.Add(p);
                    }
                }
            }
            return Ok(i);
        }

        [HttpDelete]
        [Route("Eliminar/{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public IActionResult quitar(int id)
        {
            if (data.Where(w => w.id == id).ToList().Count == 0)
            {
                return StatusCode(404, new Error { codigo = 400, mensaje = $"El valor del id({id}) no existe, verificalo porfavor" });
            }
            else
            {
                var index = data.FindIndex(f => f.id == id);
                data.RemoveAt(index);
            }
            return NoContent();
        }
        [HttpPut]
        [Route("Actualizar/{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public IActionResult update(int id,NuevoProducto nuevo)
        {
            if (data.Where(w => w.id == id).ToList().Count == 0)
            {
                return StatusCode(404, new Error { codigo = 400, mensaje = $"El valor del id({id}) no existe, verificalo porfavor" });
            }
            else
            {
                var p = convertir(nuevo);
                if (data.Where(w => w.nombre.Trim().ToLower() == p.nombre.Trim().ToLower()).ToList().Count > 0)
                {
                    return StatusCode(400, new Error { codigo = 400, mensaje = $"El nombre del producto({p.nombre}) ya existe, porfavor revisalo" });
                }
                else {
                    if (p.precio == 0 || string.IsNullOrEmpty(p.categoria) || string.IsNullOrEmpty(p.descripcion))
                    {
                        return StatusCode(400, new Error { codigo = 400, mensaje = $"Por favor revisa el valor de Precio({p.precio}), Categoria({p.categoria}), Descripcion({p.descripcion}) estos no pueden ir vacios o en 0" });
                    }
                    else {
                        p.id = id;
                        var index = data.FindIndex(f => f.id == id);
                        data[index] = p;
                    }
                }
            }
            return NoContent();
        }

        private Producto convertir(NuevoProducto nuevo) {
            return new Producto
            {
                categoria = nuevo.categoria,
                descripcion = nuevo.descripcion,
                nombre = nuevo.nombre,
                precio = nuevo.precio,
                unidades = nuevo.unidades
            };
        }
    }
}
