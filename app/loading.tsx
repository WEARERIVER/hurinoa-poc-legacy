import { Spin } from 'antd'
import { layout } from '@/theme'

export default function Loading() {
  return (
    <div 
      style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        minHeight: 300,
        padding: layout.pagePadding,
      }}
    >
      <Spin size="large" />
    </div>
  )
}
