// Single source of truth for personal info — used across Navbar, Hero, Footer, Contact.
export const profile = {
  name: 'Marni Jayaram',
  shortName: 'Marni',
  initials: 'MJ',
  role: 'Software Engineer',
  email: 'marnijayaram0707@gmail.com',
  location: 'Hyderabad, India',
  // Clean initials avatar. To swap in a real photo:
  //   1. Drop a square headshot at frontend/public/profile.jpg
  //   2. Set this to '/profile.jpg'
  avatar:
    'https://ui-avatars.com/api/?name=Marni+Jayaram' +
    '&background=dc2626&color=ffffff' +
    '&size=256&font-size=0.42&bold=true&rounded=true',
  social: {
    github: 'https://github.com/JAYARAM0707',
    linkedin: 'https://linkedin.com/in/marnijayaram',
    instagram: 'https://instagram.com/',
  },
};
