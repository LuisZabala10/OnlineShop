using System;
using System.ComponentModel.DataAnnotations;

namespace ApiOnlineShop.Entities
{
    public class Product
    {
        [Key]
        [Required]
        public string Code { get; set; }

        [Required(ErrorMessage = "name required.")]
        [MaxLength(80)]
        public string Name { get; set; }

        [Required(ErrorMessage = "description required.")]
        [MaxLength(100)]
        public string Description { get; set; }

        [Required(ErrorMessage = "Price required.")]
        public double Price { get; set; }

        [Required(ErrorMessage = "Stock required.")]
        public int Stock { get; set; }

        [Required]
        public DateTime CreationDate { get; set; }
    }
}
