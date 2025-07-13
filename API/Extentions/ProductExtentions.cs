using System;
using API.Entities;

namespace API.Extentions;

public static class ProductExtentions
{
    public static IQueryable<Product> Sort(this IQueryable<Product> query, string? OrderBy)
    {
        query = OrderBy switch
        {
            "price" => query.OrderBy(x => x.Price),
            "priceDesc" => query.OrderByDescending(x => x.Price),
            _ => query.OrderBy(x => x.Name)
        };
        return query;
    }
    public static IQueryable<Product> Search(this IQueryable<Product> query, string? searchTerm)
    {
        if (string.IsNullOrEmpty(searchTerm)) return query;
        var lowerCaseSearchTerm = searchTerm.Trim().ToLower();
        return query.Where(x => x.Name.ToLower().Contains(lowerCaseSearchTerm));
    }
    public static IQueryable<Product> Filter(this IQueryable<Product> query, string? brands, string? types)
    {
        var brandsList = new List<string>();
        var typesList = new List<string>();
        if (!string.IsNullOrEmpty(brands))
        {
            brandsList.AddRange([.. brands.ToLower().Split(",")]);
        }
        if (!string.IsNullOrEmpty(types))
        {
            typesList.AddRange([.. types.ToLower().Split(",")]);
        }
        query = query.Where(x => brandsList.Count == 0 || brandsList.Contains(x.Brand.ToLower()));
        query = query.Where(x => typesList.Count == 0 || typesList.Contains(x.Type.ToLower()));
        return query;
    }
}
