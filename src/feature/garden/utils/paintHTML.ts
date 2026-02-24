export const decodeHtml = (html: string) => {
  const txt = document.createElement('textarea')
  txt.innerHTML = html
  return txt.value
}

export const ALLOWED_TAGS = [
  'table',
  'tbody',
  'tr',
  'td',
  'th',
  'thead',
  'p',
  'br',
  'strong',
  'em',
  'u',
  'a',
  'ul',
  'ol',
  'li',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6'
]

export const ALLOWED_ATTR = ['class', 'href', 'target', 'rel']
