using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Chubb.Examen.ApiProducto.Models
{
    public class NuevoProducto
    {
        public string nombre { get; set; }
        public string descripcion { get; set; }
        public string categoria { get; set; }
        public string precio { get; set; }
        public string unidades { get; set; }
    }
}
