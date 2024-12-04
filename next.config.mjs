/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['res.cloudinary.com','image.tmdb.org'], // Add Cloudinary as an allowed domain
      },
};

export default nextConfig;
