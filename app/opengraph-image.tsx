import { ImageResponse } from 'next/og'

export const size = { width: 1200, height: 630 }
export const alt = 'Softiques — Software Development Studio'
export const contentType = 'image/png'

export default function OGImage() {
  return new ImageResponse(
    (
      <div style={{
        width: '100%', height: '100%', display: 'flex', flexDirection: 'column',
        justifyContent: 'center', alignItems: 'flex-start', padding: '80px',
        backgroundColor: '#0A0A0A', color: '#F4F4F2',
      }}>
        <div style={{ display: 'flex', width: 80, height: 6, backgroundColor: '#FFD400', marginBottom: 40 }} />
        <div style={{ display: 'flex', fontSize: 72, fontWeight: 700, lineHeight: 1.1, marginBottom: 24 }}>
          Softiques
        </div>
        <div style={{ display: 'flex', fontSize: 28, color: '#A0A0A0', lineHeight: 1.4 }}>
          Websites · Apps · Games · ERP · AI/ML
        </div>
      </div>
    ),
    { ...size }
  )
}
