Place your photos here organized by subfolder.

Example structure:
  /public/photos/early-years/1.jpg
  /public/photos/adventures/1.jpg
  /public/photos/family-moments/1.jpg
  /public/photos/recent-highlights/1.jpg

Then update config.ts -> photos to point to these paths:
  photos: {
    'Early Years': ['/photos/early-years/1.jpg'],
    'Adventures': ['/photos/adventures/1.jpg'],
    ...
  }
