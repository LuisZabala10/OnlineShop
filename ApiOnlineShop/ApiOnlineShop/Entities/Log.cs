using System;
using System.ComponentModel.DataAnnotations;

namespace ApiOnlineShop.Entities
{
    public class Log
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string ControllerName { get; set; }
        [Required]
        public string ErrorMessage { get; set; }
        [Required]
        public DateTime Date { get; set; }
    }
}
