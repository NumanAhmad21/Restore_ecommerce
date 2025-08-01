using System;
using API.DTOs;
using API.Entities;

namespace API.Extentions;

public static class BasketExtentions
{
    public static BasketDto ToDo(this Basket basket)
    {
        return new BasketDto
        {
            BasketId = basket.BasketId,
            Items = basket.Items.Select(x => new BasketItemDto
            {
                ProductId = x.ProductId,
                Name = x.Product.Name,
                Price = x.Product.Price,
                Brand = x.Product.Brand,
                Type = x.Product.Type,
                PictureUrl = x.Product.PictureUrl,
                Quantity = x.Quantity

            }).ToList()
        };
    }
}
