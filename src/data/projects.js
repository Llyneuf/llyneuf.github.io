export const projects = [
  {
    slug: 'personal-site',
    title: 'My Personal Site',
    status: 'Active',
    image: '/24-05-2026.png',
    imageAlt: 'Screenshot of the current Llyneuf personal site',
    summary:
      'A personal web hub for identity, projects, streams, links, contact and devlog notes.',
    progress: 'Public v1 is live on the custom domain. Current work is polish, clearer content and better project context.',
    details: [
      'React + Vite site deployed through GitHub Pages.',
      'Custom domain, social previews, sitemap, analytics and devlog are already connected.',
      'Next: richer project entries, better mobile checks and more real updates.',
    ],
    tags: ['React', 'Vite', 'GitHub Pages', 'Personal brand'],
    links: [
      { label: 'Live site', href: 'https://llyneuf.xyz/' },
      { label: 'Source', href: 'https://github.com/Llyneuf/llyneuf.github.io' },
    ],
  },
  {
    slug: 'ninette',
    title: 'Ninette',
    status: 'Main focus',
    image: '/16-05-2026.png',
    imageAlt: 'Blender work in progress for the Ninette VTuber model',
    summary:
      'My main VTuber avatar: a refined marionette-pierrot model for streams, Warudo and future visual identity.',
    progress: 'The base body is being modeled in Blender. Torso, neck and the next body pass are the active work.',
    details: [
      'Avatar VTuber approach: I stay myself, the model is the visual representation.',
      'Designed around a theatrical marionette mood with retro/PSX influence through shaders and textures.',
      'Built as a modern VRM-ready model, not a strict low-poly PS1 character.',
    ],
    tags: ['VTuber', 'Blender', '3D model', 'Warudo'],
    links: [],
  },
  {
    slug: 'warudo-room',
    title: 'Warudo Horror Room',
    status: 'In progress',
    image: '/11-05-2026.png',
    imageAlt: 'Dark PS1-style room scene with glowing monitors',
    summary:
      'A PS1-horror version of my real room, made as a custom stream environment for Warudo.',
    progress: 'Blender blockout, props, textures, vertex paint and Unity import are done. Lighting and Warudo export are next.',
    details: [
      'The room keeps the real layout, then turns it wrong through light, fog and small unsettling details.',
      'Unity URP setup uses custom vertex-color materials and low-resolution texture settings.',
      'Next: baked lighting, post-processing, flickering lamp, TV static and AssetBundle export.',
    ],
    tags: ['Blender', 'Unity URP', 'Warudo', 'Stream scene'],
    links: [],
  },
  {
    slug: 'oubliette',
    title: 'Oubliette',
    status: 'On hold',
    image: null,
    imageAlt: '',
    summary:
      'A first-person dungeon crawler about a prisoner descending through a dungeon-prison to win freedom.',
    progress: 'The concept and world direction are stored. It returns after the current VTuber/Warudo work reaches a stronger milestone.',
    details: [
      'Unity URP project with boomer shooter, old RPG and dungeon synth influences.',
      'The emotional arc moves from physical dungeon pressure into stranger psychological pressure.',
      'Kept warm in the background so it does not turn into a pile of disconnected ideas.',
    ],
    tags: ['Unity', 'C#', 'Indie'],
    links: [],
  },
  {
    slug: 'severance',
    title: 'Severance',
    status: 'Concept',
    image: null,
    imageAlt: '',
    summary:
      'A future cooperative horror concept about paranoia, proximity voice and the fear of not knowing what is real.',
    progress: 'Stored as a strong concept for later. Not in active production.',
    details: [
      'The core rhythm is long paranoia, short stress, release, then paranoia again.',
      'Sound, silence, incomplete information and group separation matter more than combat.',
      'Directed randomness is the main design question for making scary stories emerge naturally.',
    ],
    tags: ['Unity', 'C#', 'Co-op', 'Horror'],
    links: [],
  },
]
