/** @type {import('next').NextConfig} */
const nextConfig = {
  images:{
    remotePatterns:[
        {
            protocol: "https",
            hostname: "i.pinimg.com",     
        }
    ]
},
  typescript: {
    ignoreBuildErrors: true
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  output: 'standalone',
}

module.exports = nextConfig
