using System;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;

namespace API.RequestHelpers;

public class PageList<T> : List<T>
{
    public PageList(List<T> items, int count, int pageNumber, int pageSize)
    {
        Metadata = new PaginationMetadata
        {
            TotalCount = count,
            PageSize = pageSize,
            CurrentPage = pageNumber,
            TotalPages = (int)Math.Ceiling(count / (double)pageSize)
        };
        AddRange(items);
    }

    public PaginationMetadata Metadata { get; set; }

    public static async Task<PageList<T>> ToPagedList(IQueryable<T> query, int pageSize, int pageNumber)
    {
        var count = await query.CountAsync();
        var items = await query.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToListAsync();
        return new PageList<T>(items, count, pageNumber, pageSize);
    }
}
