/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: true,
      },
    ]
  },
  
  images: {
    domains: [
      // General images
      'mqstrapi-c4c4eea08777.herokuapp.com',
      'res.cloudinary.com',
      'ih1.redbubble.net',
      'upload.wikimedia.org'
    ]
  },

  env: {
    baseURL: 'https://mqstrapi-c4c4eea08777.herokuapp.com', // Live server
    pageURL: 'https://mqstrapi-c4c4eea08777.herokuapp.com/api/pages?populate=deep&filters', // Live server
     //baseURL: 'http://127.0.0.1:1337', // Local server
     //pageURL: 'http://127.0.0.1:1337/api/pages?populate=deep&filters', // Local server
    latestBlog: 'https://mqstrapi-c4c4eea08777.herokuapp.com/api/blogs?sort[0]=createdAt%3Adesc&pagination[page]=1&pagination[pageSize]=1&populate=deep,2',
    latest6Blogs: 'https://mqstrapi-c4c4eea08777.herokuapp.com/api/blogs?filters[timestampt]&sort[0]=id%3Adesc&',
    getAllCategories: 'https://mqstrapi-c4c4eea08777.herokuapp.com/api/categories?sort[0]=id%3Aasc&pagination[page]=1&pagination[pageSize]=51&populate=deep,1',
    getAllWebinarCategories: 'https://mqstrapi-c4c4eea08777.herokuapp.com/api/webinar-categories?sort[0]=id%3Aasc&pagination[page]=1&pagination[pageSize]=51&populate=deep,1',
    NEXT_PUBLIC_RECAPTCHA_SITE_KEY: '6LeDWdgmAAAAAG1nAZM7lOQIHGzuvwzB6HqO-nGy', //recaptcha google public key
    RECAPTCHA_SECRET_KEY: '6LeDWdgmAAAAAMtx7Ks0yOTSWHNMz7CyrnXmt4yi',
    default_image: 'https://ih1.redbubble.net/image.3243769575.1059/st,small,507x507-pad,600x600,f8f8f8.jpg',
    loading_image: 'https://res.cloudinary.com/ds6szmrgb/image/upload/v1689054254/OYUXmN_oqgu7m.gif',
    latest6Webinars: 'https://mqstrapi-c4c4eea08777.herokuapp.com/api/webinars?filters[timestampt]&sort[0]=id%3Adesc' ,
    getAllCategories2:'https://mqstrapi-c4c4eea08777.herokuapp.com/api/webinar-categories?sort[0]=id%3Aasc&pagination[page]=1&pagination[pageSize]=51&populate=deep,1'
  }
}

module.exports = nextConfig
