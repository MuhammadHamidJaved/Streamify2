
export interface Movie {
    tmdb_movie_id: number;
    title: string;

    poster_path: string;

    details?: MovieDetails;
}

export interface MovieDetails {
    title: string;
    poster_path: string;
}