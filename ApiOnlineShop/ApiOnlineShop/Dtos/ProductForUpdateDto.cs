using System.ComponentModel.DataAnnotations;

namespace ApiOnlineShop.Dtos
{
    public class ProductForUpdateDto
    {
        public string Code { get; set; }
        [Required(ErrorMessage = "name required.")]
        [MaxLength(80)]
        public string Name { get; set; }

        [Required(ErrorMessage = "description required.")]
        [MaxLength(100)]
        public string Description { get; set; }

        [Required(ErrorMessage = "Price required.")]
        public double Price { get; set; }
        public int? Stock { get; set; }
    }
}
