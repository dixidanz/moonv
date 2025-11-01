export interface Movie {
  id: number
  title: string
  overview: string
  poster_path: string | null
  backdrop_path: string | null
  release_date: string
  vote_average: number
  vote_count: number
  popularity: number
  genre_ids: number[]
  adult: boolean
  original_language: string
  original_title: string
  video: boolean
}

export interface MovieList {
  page: number
  results: Movie[]
  total_pages: number
  total_results: number
}

export interface Genre {
  id: number
  name: string
}

export interface ProductionCompany {
  id: number
  logo_path: string | null
  name: string
  origin_country: string
}

export interface ProductionCountry {
  iso_3166_1: string
  name: string
}

export interface SpokenLanguage {
  english_name: string
  iso_639_1: string
  name: string
}

export interface VideoItem {
  iso_639_1: string
  iso_3166_1: string
  name: string
  key: string
  site: string
  size: number
  type: string
  official: boolean
  published_at: Date
  id: string
}

export interface Cast {
  adult: boolean
  gender: number
  id: number
  known_for_department: string
  name: string
  original_name: string
  popularity: number
  profile_path: string
  cast_id: number
  character: string
  credit_id: string
  order: number
}

export interface Crew {
  adult: boolean
  gender: number
  id: number
  known_for_department: string
  name: string
  original_name: string
  popularity: number
  profile_path: string
  credit_id: string
  department: string
  job: string
}

export type MovieProviderType = 'flatrate' | 'rent' | 'buy'

export interface MovieProvider {
  display_priority: number
  logo_path: string
  provider_id: number
  provider_name: string
}

export interface MovieDetail extends Movie {
  'budget': number
  'genres': Genre[]
  'homepage': string | null
  'imdb_id': string | null
  'production_companies': ProductionCompany[]
  'production_countries': ProductionCountry[]
  'revenue': number
  'runtime': number | null
  'spoken_languages': SpokenLanguage[]
  'status': string
  'tagline': string | null
  'videos': {
    results: VideoItem[]
  }
  'casts': {
    cast: Cast[]
    crew: Crew[]
  }
  'watch/providers': {
    results: Record<
      string,
      {
        link: string
      } & Partial<Record<MovieProviderType, MovieProvider[]>>
    >
  }
}

export type TimeWindow = 'day' | 'week'

export interface Collection {
  id: number
  name: string
  overview: string
  poster_path: string | null
  backdrop_path: string | null
  parts: Movie[]
}

export interface NotFound {
  success: boolean
  status_code: number
  status_message: string
}

export interface MovieDiscoverQuery {
  with_genres?: number | string
}

export interface PersonCredit extends Movie {
  character?: string
  credit_id: string
  order?: number
  media_type: string
}

export interface PersonCrewCredit extends Movie {
  credit_id: string
  department: string
  job: string
  media_type: string
}

export interface PersonDetail {
  adult: boolean
  also_known_as: string[]
  biography: string
  birthday: string | null
  deathday: string | null
  gender: number
  homepage: string | null
  id: number
  imdb_id: string | null
  known_for_department: string
  name: string
  place_of_birth: string | null
  popularity: number
  profile_path: string | null
  combined_credits: {
    cast: PersonCredit[]
    crew: PersonCrewCredit[]
  }
}
