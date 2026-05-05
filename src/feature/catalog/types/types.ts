export const bookFormatLabels: Record<string, string> = {
  PAPER: 'papel',
  ELECTRONIC: 'electrónico'
}

export const coverMaterialLabels: Record<string, string> = {
  SOFT: 'blanda',
  HARD: 'dura'
}

export interface iCatalogCountry {
  _id: string
  name: string
  slug: string
  flag?: string
}

export interface iCatalogGenre {
  _id: string
  name: string
  slug: string
}

export interface iCatalogPerson {
  _id: string
  name: string
  lastName?: string
  img?: string
  role: 'DIRECTOR' | 'ACTOR' | 'WRITER'
  birthCountry?: iCatalogCountry
}

export interface iCatalogBook {
  _id: string
  title: string
  author: iCatalogPerson[]
  cover: string
  format: 'PAPER' | 'ELECTRONIC'
  pages: number
  rating?: number
  coverMaterial?: 'SOFT' | 'HARD'
  editorial?: string
  publishedYear?: number
  synopsis?: string
  genres?: iCatalogGenre[]
  tags?: string[]
}

export interface iCatalogSerie {
  _id: string
  title: string
  director: iCatalogPerson[]
  actors?: iCatalogPerson[]
  country?: iCatalogCountry
  cover?: string
  episodeDuration?: number
  rating?: number
  year?: number
  genres?: iCatalogGenre[]
  tags?: string[]
}

export interface iCatalogMovie {
  _id: string
  title: string
  director: iCatalogPerson[]
  actors?: iCatalogPerson[]
  country?: iCatalogCountry
  cover: string
  duration?: number
  rating?: number
  year?: number
  genres?: iCatalogGenre[]
  tags?: string[]
}

export interface iCatalogInfo {
  headers: {
    title: string
    url: string
  }[]
  books: iCatalogBook[]
  series: iCatalogSerie[]
  movies: iCatalogMovie[]
}

export type BookCardProps = {
  book: iCatalogBook
}

export type SerieCardProps = {
  serie: iCatalogSerie
}

export type MovieCardProps = {
  movie: iCatalogMovie
}
