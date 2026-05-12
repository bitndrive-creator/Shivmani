const nextConfig = {
  images: {
    unoptimized: true,
    qualities: [75, 95],  
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'shivmani-baceknd.onrender.com', // purana — hata sakte ho
      },
      {
        protocol: 'https',
        hostname: 'api.indianluxuryhouse.com', // ✅ naya domain
      },
    ],
  },
};

export default nextConfig;


// const nextConfig = {
//   images: {
//     unoptimized: true,  // Next.js optimization band, seedha URL se load hoga
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: 'shivmani-baceknd.onrender.com',
//       },
//     ],
//   },
// };

// export default nextConfig;

// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: 'shivmani-baceknd.onrender.com',
//       },
//       {
//         protocol: 'https',
//         hostname: 'pixabay.com',
//       },
//     ],
//   },
// };

// export default nextConfig;


// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// export default nextConfig;
