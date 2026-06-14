// Single source of truth for personal info — used across Navbar, Hero, Footer, Contact.
export const profile = {
  name: 'Marni Jayaram',
  shortName: 'Marni',
  initials: 'MJ',
  role: 'Software Engineer',
  email: 'marnijayaram0707@gmail.com',
  location: 'Bangalore, India',
  // Real photo for the About portrait. Drop your image at
  // frontend/public/profile.jpg (or change the path/name to match your file).
  photo: '/profile.png',
  // Fallback initials avatar (used in navbar + phone mockup).
  avatar:
    'https://ui-avatars.com/api/?name=Marni+Jayaram' +
    '&background=0284c7&color=ffffff' +
    '&size=256&font-size=0.42&bold=true&rounded=true',
  social: {
    github: 'https://github.com/JAYARAM0707',
    linkedin: 'https://linkedin.com/in/marnijayaram',
    instagram: 'https://instagram.com/',
  },
};
