using System.ComponentModel.DataAnnotations;

namespace ApiOnlineShop.Dtos
{
    public class SaleForCreationDto
    {
        [Required]
        public string ProductCode { get; set; }

        [Required]
        public int Amount { get; set; }
    }
}
