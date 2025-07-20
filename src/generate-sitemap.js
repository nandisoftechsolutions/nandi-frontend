// generate-sitemap.js
const { SitemapStream, streamToPromise } = require('sitemap');
const { createWriteStream } = require('fs');
const path = require('path');

const sitemap = new SitemapStream({ hostname: 'https://nandisoftechsolutions.in' });

// Define all your static routes here
const routes = [
  '/',
  '/about',
  '/contact',
  '/services',
  '/login',
  '/register',
  '/dashboard',
  // Add more routes if needed
];

routes.forEach(route => {
  sitemap.write({ url: route, changefreq: 'monthly', priority: 0.8 });
});

sitemap.end();

// Output sitemap.xml to public folder
streamToPromise(sitemap)
  .then(sm => {
    const sitemapPath = path.resolve(__dirname, 'public', 'sitemap.xml');
    const writeStream = createWriteStream(sitemapPath);
    writeStream.write(sm.toString());
    console.log('✅ Sitemap generated successfully at public/sitemap.xml');
  })
  .catch(console.error);
