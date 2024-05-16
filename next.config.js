/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "i.ibb.co",
      "lh3.googleusercontent.com",
      "res.cloudinary.com",
      "scontent.fdac24-2.fna.fbcdn.net",
      "utfs.io",
    ],
  },
};

module.exports = nextConfig;
