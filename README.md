# OMDb API Integration

This project integrates with the [OMDb API](http://www.omdbapi.com/) to fetch movie and TV show data.


## Supported Parameters

- `t` &mdash; Title search (exact match)
- `s` &mdash; Search (multiple results, partial match)
- `i` &mdash; IMDb ID (e.g., `tt3896198`)
- `y` &mdash; Year of release (optional filter)
- `plot` &mdash; `short` (default) or `full`
- `type` &mdash; `movie`, `series`, or `episode`
- `page` &mdash; Page number (for search results, up to 100 results)
- `r` &mdash; Response format: `json` (default) or `xml`

## Example Requests

- **Search by Title (exact match):**  
  `http://www.omdbapi.com/?t=Inception&apikey=${API_KEY}`

- **Search by IMDb ID:**  
  `http://www.omdbapi.com/?i=tt3896198&apikey=${API_KEY}`

Refer to the [OMDb API documentation](http://www.omdbapi.com/) for more details.
