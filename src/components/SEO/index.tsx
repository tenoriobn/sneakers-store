import { Helmet } from 'react-helmet-async';
import { SEO as SEO_CONFIG } from 'src/constants/seo';
import type { SEOProps } from './seo.type';

export default function SEO({
  title = SEO_CONFIG.title,
  description = SEO_CONFIG.description,
  image = SEO_CONFIG.image,
  url = SEO_CONFIG.url,
}: SEOProps) {
  const pageTitle = title === SEO_CONFIG.title ? title : `${title} | ${SEO_CONFIG.siteName}`;

  return (
    <Helmet>
      <title>{pageTitle}</title>

      <meta name="description" content={description} />

      <meta name="robots" content="index, follow" />

      <link rel="canonical" href={url} />

      <meta property="og:type" content="website" />

      <meta property="og:title" content={pageTitle} />

      <meta property="og:description" content={description} />

      <meta property="og:image" content={`${SEO_CONFIG.url}${image}`} />

      <meta property="og:url" content={url} />

      <meta property="og:site_name" content={SEO_CONFIG.siteName} />

      <meta name="twitter:card" content="summary_large_image" />

      <meta name="twitter:title" content={pageTitle} />

      <meta name="twitter:description" content={description} />

      <meta name="twitter:image" content={`${SEO_CONFIG.url}${image}`} />
    </Helmet>
  );
}
