/** @type {import('next').NextConfig} */
const nextConfig = {
  // Optimize Ant Design imports - only bundle used components
  transpilePackages: ['antd', '@ant-design/icons', '@ant-design/cssinjs'],
  
  // Enable modular imports for smaller bundles
  modularizeImports: {
    '@ant-design/icons': {
      transform: '@ant-design/icons/lib/icons/{{member}}',
    },
  },
}

module.exports = nextConfig
