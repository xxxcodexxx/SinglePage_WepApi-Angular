using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SinglePageApp.Models
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public long Price { get; set; }
        public DateTime ReleaseDate { get; set; }
        public int CategoryId { get; set; }
    }
}