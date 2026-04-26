import { ImageResponse } from 'next/og'

export const size = { width: 1200, height: 630 }
export const alt = 'Softwires Technologies — AI Engineering for the Physical World'
export const contentType = 'image/png'

export default function OGImage() {
  return new ImageResponse(
    (
      <div style={{
        width: '100%', height: '100%', display: 'flex', flexDirection: 'column',
        justifyContent: 'center', alignItems: 'flex-start', padding: '80px',
        backgroundColor: '#0A0A0A', color: '#FAFAF7',
      }}>
        <div style={{ width: 80, height: 3, backgroundColor: '#3D2BFF', marginBottom: 40 }} />
        <div style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.1, marginBottom: 24 }}>
          Softwires Technologies
        </div>
        <div style={{ fontSize: 28, color: '#A0A0A0', lineHeight: 1.4 }}>
          AI Engineering for the Physical World
        </div>
      </div>
    ),
    { ...size }
  )
}
