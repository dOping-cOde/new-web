import { ImageResponse } from 'next/og'
import { getCaseStudyBySlug, getCaseStudySlugs } from '@/lib/portfolio'

export const size = { width: 1200, height: 630 }
export const alt = 'Softwires Technologies Case Study'
export const contentType = 'image/png'

export async function generateStaticParams() {
  return await getCaseStudySlugs()
}

export default async function OGImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const caseStudy = getCaseStudyBySlug(slug)

  return new ImageResponse(
    (
      <div style={{
        width: '100%', height: '100%', display: 'flex', flexDirection: 'column',
        justifyContent: 'center', alignItems: 'flex-start', padding: '80px',
        backgroundColor: '#0A0A0A', color: '#FAFAF7',
      }}>
        <div style={{ fontSize: 18, color: '#A0A0A0', textTransform: 'uppercase', letterSpacing: 2, marginBottom: 24 }}>
          {caseStudy.category} · {caseStudy.subcategory}
        </div>
        <div style={{ width: 80, height: 3, backgroundColor: '#3D2BFF', marginBottom: 40 }} />
        <div style={{ fontSize: 56, fontWeight: 700, lineHeight: 1.1, marginBottom: 24, maxWidth: 900 }}>
          {caseStudy.title}
        </div>
        <div style={{ fontSize: 24, color: '#A0A0A0', lineHeight: 1.4, maxWidth: 800 }}>
          {caseStudy.excerpt.length > 120 ? caseStudy.excerpt.slice(0, 117) + '...' : caseStudy.excerpt}
        </div>
        <div style={{ position: 'absolute', bottom: 60, left: 80, fontSize: 18, color: '#666' }}>
          softwires.in
        </div>
      </div>
    ),
    { ...size }
  )
}
