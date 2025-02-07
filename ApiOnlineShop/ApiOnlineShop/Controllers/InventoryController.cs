﻿using ApiOnlineShop.Dtos;
using ApiOnlineShop.Entities;
using ApiOnlineShop.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace ApiOnlineShop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InventoryController : ControllerBase
    {
        private readonly IProduct _productRepository;
        private readonly ILog _logRepository;

        public InventoryController(IProduct productRepository,ILog logRepository)
        {
            _productRepository = productRepository;
            _logRepository = logRepository;
        }

        [HttpPut]
        public async Task<ActionResult> UpdateInventory(InventoryForUpdateDto inventory)
        {
            try
            {
                var productToUpdateStock = await _productRepository.GetProduct(inventory.Code);

                if (productToUpdateStock == null) return NotFound();

                if (inventory.Amount <= 0) return BadRequest("The amount of stock must be greater than 0.");

                productToUpdateStock.Stock += inventory.Amount;

                await _productRepository.UpdateProduct(productToUpdateStock);

                return NoContent();
            }
            catch (Exception ex)
            {
                var log = new Log
                {
                    ControllerName = nameof(InventoryController),
                    ErrorMessage = ex.Message,
                    Date = DateTime.Now
                };

                await _logRepository.LogToDataBase(log);

                return StatusCode(StatusCodes.Status500InternalServerError,
                    "The server is not available to process this request. Try later");
            }
        }
    }
}
