export function formatReleaseYear(date: string): string {
  const year = new Date(date).getFullYear()
  return year ? year.toString() : ''
}
