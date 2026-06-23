import { ImageResponse } from 'next/og'
import { getCaseStudyBySlug, getCaseStudySlugs } from '@/lib/portfolio'

export const size = { width: 1200, height: 630 }
export const alt = 'Softiques Case Study'
export const contentType = 'image/png'

export async function generateStaticParams() {
  return await getCaseStudySlugs()
}

export default async function OGImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const caseStudy = getCaseStudyBySlug(slug)

  const excerpt = caseStudy.excerpt.length > 120
    ? caseStudy.excerpt.slice(0, 117) + '...'
    : caseStudy.excerpt 

  return new ImageResponse(
    (
      <div style={{
        width: '100%', height: '100%', display: 'flex', flexDirection: 'column',
        justifyContent: 'center', alignItems: 'flex-start', padding: '80px',
        backgroundColor: '#0A0A0A', color: '#FAFAF7', position: 'relative',
      }}>
        <div style={{ display: 'flex', fontSize: 18, color: '#A0A0A0', textTransform: 'uppercase', letterSpacing: 2, marginBottom: 24 }}>
          {`${caseStudy.category} · ${caseStudy.subcategory}`}
        </div>
        <div style={{ display: 'flex', width: 80, height: 3, backgroundColor: '#FFD400', marginBottom: 40 }} />
        <div style={{ display: 'flex', fontSize: 56, fontWeight: 700, lineHeight: 1.1, marginBottom: 24, maxWidth: 900 }}>
          {caseStudy.title}
        </div>
        <div style={{ display: 'flex', fontSize: 24, color: '#A0A0A0', lineHeight: 1.4, maxWidth: 800 }}>
          {excerpt}
        </div>
        <div style={{ display: 'flex', position: 'absolute', bottom: 60, left: 80, fontSize: 18, color: '#666' }}>
          softiques.com
        </div>
      </div>
    ),
    { ...size }
  )
}
