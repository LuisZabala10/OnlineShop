using System.ComponentModel.DataAnnotations;

namespace ApiOnlineShop.Dtos
{
    public class ProductForCreationDto
    {
        [Required(ErrorMessage = "name required.")]
        [MaxLength(80)]
        public string Name { get; set; }

        [Required(ErrorMessage = "Price required.")]
        public double Price { get; set; }

        [Required(ErrorMessage = "Stock required.")]
        public int Stock { get; set; }
    }
}
