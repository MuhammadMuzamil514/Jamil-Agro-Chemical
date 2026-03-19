import { Helmet } from 'react-helmet-async'

function SeoMeta({ title, description, keywords }) {
  const pageTitle = `${title} | Jamil Agro Chemicals`

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content="index, follow" />
    </Helmet>
  )
}

export default SeoMeta
