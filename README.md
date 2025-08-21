# Neueda Activity: OMDb Favourites App

This application allows users to search for movies and TV shows using the OMDb API, and save their favourites to a local database. Users can add, update, view and delete their favourite movies or shows, along with custom ratings and details.

## API Endpoints

All endpoints are prefixed with `/api`.

- `GET /api/movie/:title`  
  Fetch details for a specific movie by title.

- `GET /api/show?title=...`  
  Fetch details for a TV show by title.

- `GET /api/favourites`  
  Retrieve all favourite entries from the database.

- `POST /api/favourites`  
  Add a new favourite.  
  **Body:**  
  ```json
  {
    "title": "string",
    "rating": "number",
    "release_date": "string",
    "director": "string",
    "description": "string",
    "type": "movie|series"
  }
  ```

- `PATCH /api/favourites/:id`  
  Update an existing favourite by ID.

- `DELETE /api/favourites/:id`  
  Remove a favourite by ID.

## Database Schema

Table: `favourites`

| Column        | Type    | Description                |
|---------------|---------|----------------------------|
| id            | INT     | Primary key, auto-increment|
| title         | VARCHAR | Movie/Show title           |
| rating        | INT     | User rating                |
| release_date  | VARCHAR | Release date               |
| director      | VARCHAR | Director name              |
| description   | TEXT    | Description                |
| type          | VARCHAR | 'movie' or 'series'        |

## External API Used

- [OMDb API](http://www.omdbapi.com/)  
  Used to fetch movie and TV show data.  
  Requires an API key (set in `.env` as `API_KEY`).

## How to Run Locally

1. **Clone the repository**
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Set up environment variables**  
   Edit `.env` with your database and OMDb API key.

4. **Start the server**
   ```bash
   npm start
   ```
5. **Access the API**
   - API endpoints: `http://localhost:3000/api/...`
   - Swagger docs: `http://localhost:3000/api-docs`
