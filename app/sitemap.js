export default function sitemap() {
  const baseUrl = 'https://www.getacedllc.com'

  return [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/expertise`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/speaking`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/insights`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/insights/care-centered-educational-leadership`,
      lastModified: new Date(),
    },
  ]
}
