using System.ComponentModel.DataAnnotations;

namespace ApiOnlineShop.Dtos
{
    public class InventoryForUpdateDto
    {
        [Required]
        public string Code { get; set; }
        [Required]
        public int Amount { get; set; }
    }
}
