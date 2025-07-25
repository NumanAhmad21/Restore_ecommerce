using API.Data;
using API.DTOs;
using API.Entities;
using API.Extentions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class BasketController(StoreContext context) : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<BasketDto>> GetBasket()
        {
            var basket = await RetrieveBasket();
            if (basket == null) return NoContent();
            return basket.ToDo();
            
        }
        [HttpPost]
        public async Task<ActionResult<BasketDto>> AddItemToBasket(int productId, int quantity)
        {
            var basket = await RetrieveBasket();
            basket ??= CreateBasket();

            var product = await context.Products.FindAsync(productId);
            if (product == null) return BadRequest("Problem adding item to the basket");
            basket.AddItem(product, quantity);
            var result = await context.SaveChangesAsync() > 0;
            if (result) return CreatedAtAction(nameof(GetBasket), basket.ToDo());
            return BadRequest("Problem Updating Basket");
        }

        

        [HttpDelete]
        public async Task<ActionResult> RemoveItemToBasket(int productId, int quantity)
        {
            var basket = await RetrieveBasket();
            if (basket == null) return BadRequest("Unable to Retrieve Basket");
            basket.RemoveItem(productId, quantity);
            var result = await context.SaveChangesAsync() > 0;
            if (result) return Ok();

            return BadRequest("Problem Updating Basket");
        }

        private Basket CreateBasket()
        {
            var basketId = Guid.NewGuid().ToString();
            var cookieOptions = new CookieOptions
            {
                IsEssential = true,
                Expires = DateTime.UtcNow.AddDays(30)
            };
            Response.Cookies.Append("basketId", basketId, cookieOptions);
            var basket = new Basket { BasketId = basketId };
            context.Baskets.Add(basket);
            return basket;
        }
        private async Task<Basket?> RetrieveBasket()
        {
            return await context.Baskets
                    .Include(x => x.Items)
                    .ThenInclude(x => x.Product)
                    .FirstOrDefaultAsync(x => x.BasketId == Request.Cookies["basketId"]);
        }
    }
}
