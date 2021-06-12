using ApiOnlineShop.Dtos;
using ApiOnlineShop.Entities;
using ApiOnlineShop.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ApiOnlineShop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly IProduct _productRepository;

        public ProductsController(IProduct productRepository)
        {
            _productRepository = productRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
        {
            try
            {
                var products = await _productRepository.GetProducts();

                return Ok(products);

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "The server is not available to process this request. Try later");
            }
        }

        [HttpGet("{code}")]
        public async Task<ActionResult<Product>> GetProduct(string code)
        {
            try
            {
                var product = await _productRepository.GetProduct(code);

                if (product == null) NotFound();

                return Ok(product);

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "The server is not available to process this request. Try later");
            }
        }

        [HttpPost]
        public async Task<ActionResult> AddProduct(ProductForCreationDto product)
        {
            try
            {
                if (!ValidateStock(product.Stock)) return BadRequest("The product stock must be greater or iqual to 0");

                if (!ValidatePrice(product.Price)) return BadRequest("The product price must be greater than 0");

                var code = GeneratePorductCode();

                //-----------------------------------------------------------//
                //verificando el codigo generado no exista en la base de datos
                //-----------------------------------------------------------//
                while (await _productRepository.Exists(code))
                {
                    code = GeneratePorductCode();
                }

                var newProduct = new Product
                {
                    Code = code,
                    Name = product.Name,
                    Description = product.Description,
                    Price = product.Price,
                    Stock = product.Stock,
                    CreationDate = DateTime.Now
                };

                await _productRepository.AddProduct(newProduct);

                return CreatedAtAction(nameof(GetProduct), new { code = newProduct.Code }, newProduct);

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "The server is not available to process this request. Try later");
            }

        }

        [HttpPut("{code}")]
        public async Task<ActionResult> UpdateProduct(string code, ProductForUpdateDto product)
        {
            try
            {
                if (code != product.Code) return BadRequest();

                if (!ValidatePrice(product.Price)) return BadRequest("The product price must be greater than 0");

                var productToUpdate = await _productRepository.GetProduct(code);

                if (productToUpdate == null) return NotFound();

                productToUpdate.Name = product.Name;
                productToUpdate.Price = product.Price;
                productToUpdate.Description = product.Description;
                await _productRepository.UpdateProduct(productToUpdate);
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "The server is not available to process this request. Try later");
            }
        }

        [HttpDelete("{code}")]
        public async Task<ActionResult> DeleteProduct(string code)
        {
            try
            {
                var productToDelete = await _productRepository.GetProduct(code);

                if (productToDelete == null) return NotFound();

                await _productRepository.DeleteProduct(productToDelete);

                return NoContent();


            }catch(Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "The server is not available to process this request. Try later");
            }
        }

        private bool ValidateStock(int stock)
        {
            if (stock < 0) return false;

            return true;
        }

        private bool ValidatePrice(double Price)
        {
            if (Price <= 0) return false;

            return true;
        }

        private string GeneratePorductCode()
        {
            var code = "";
            var random = new Random();

            while (code.Length < 6)
            {
                code += random.Next(0, 9);
            }

            return code;
        }
    }
}
