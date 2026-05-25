export const projects = [
  {
    slug: 'personal-site',
    title: 'My Personal Site',
    status: 'Active',
    image: '/project_site.png',
    imageAlt: 'Screenshot of the current Llyneuf personal site',
    summary:
      'A personal web hub for identity, projects, streams, links, contact and devlog notes.',
    progress:
      'Public v1 is live on the custom domain. Current work is polish, clearer content and better project context.',
    cardDetails: [
      'React + Vite site deployed through GitHub Pages.',
      'Custom domain, social previews, sitemap, analytics and devlog are already connected.',
      'Next: richer project entries, better mobile checks and more real updates.',
    ],
    pageDescription: [
      'This site is the main public hub for my creative work: projects, devlog notes, stream links, contact points and experiments that are still growing.',
      'The important part is keeping it easy to update. Project cards, devlog entries and profile links live in data files, so the site can grow without rebuilding the whole structure every time.',
    ],
    pageDetails: [
      'Built with React and Vite.',
      'Hosted through GitHub Pages with a custom domain.',
      'Uses static data files for projects, profile links and devlog entries.',
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
    progress:
      'The base body is being modeled in Blender. Torso, neck and the next body pass are the active work.',
    cardDetails: [
      'Avatar VTuber approach: I stay myself, the model is the visual representation.',
      'Designed around a theatrical marionette mood with retro/PSX influence through shaders and textures.',
      'Built as a modern VRM-ready model, not a strict low-poly PS1 character.',
    ],
    pageDescription: [
      'Ninette is my main VTuber avatar project. It is not a separate role or character mask: the model is a visual representation for streams, Warudo and future identity work.',
      'The direction is an elegant marionette-pierrot with theatrical sadness, refined proportions and a retro mood created through shaders and textures rather than strict PS1-level geometry.',
    ],
    pageDetails: [
      'Current modeling focus is the torso, neck and next body pass.',
      'The model is planned as a modern VTuber-ready asset.',
      'The retro mood should come from material, texture and shader choices.',
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
    progress:
      'Blender blockout, props, textures, vertex paint and Unity import are done. Lighting and Warudo export are next.',
    cardDetails: [
      'The room keeps the real layout, then turns it wrong through light, fog and small unsettling details.',
      'Unity URP setup uses custom vertex-color materials and low-resolution texture settings.',
      'Next: baked lighting, post-processing, flickering lamp, TV static and AssetBundle export.',
    ],
    pageDescription: [
      'This project rebuilds my real room as a PS1-horror stream environment. The recognizable layout stays intact, but the lighting, fog and small wrong details push it into an uncanny version of itself.',
      'The scene has already gone through Blender blockout, props, textures, vertex paint and Unity import. The next important pass is Unity lighting, post-processing and final Warudo export.',
    ],
    tags: ['Blender', 'Unity URP', 'Warudo', 'Stream scene'],
    links: [],
  },
  {
    slug: 'oubliette',
    title: 'Oubliette',
    status: 'On hold',
    image: '/project_oubliette.png',
    imageAlt: 'Oubliette concept art',
    summary:
      'A first-person dungeon crawler about a prisoner descending through a dungeon-prison to win freedom.',
    progress:
      'The concept and world direction are stored. It returns after the current VTuber/Warudo work reaches a stronger milestone.',
    cardDetails: [
      'Unity URP project with boomer shooter, old RPG and dungeon synth influences.',
      'The emotional arc moves from physical dungeon pressure into stranger psychological pressure.',
      'Kept warm in the background so it does not turn into a pile of disconnected ideas.',
    ],
    pageDescription: [
      'Oubliette is a first-person dungeon crawler about a prisoner descending through a dungeon-prison to win freedom. The deeper the descent goes, the more the pressure shifts from physical danger into psychological unease.',
      'It is currently on hold while the VTuber and Warudo work move forward, but the core direction is stored clearly enough to return to later without losing the project identity.',
    ],
    tags: ['Unity', 'C#', 'Indie'],
    links: [],
  },
  {
    slug: 'severance',
    title: 'Severance',
    status: 'Concept',
    image: '/project_severance.png',
    imageAlt: 'Severance concept art',
    summary:
      'A future cooperative horror concept about paranoia, proximity voice and the fear of not knowing what is real.',
    progress: 'Stored as a strong concept for later. Not in active production.',
    cardDetails: [
      'The core rhythm is long paranoia, short stress, release, then paranoia again.',
      'Sound, silence, incomplete information and group separation matter more than combat.',
      'Directed randomness is the main design question for making scary stories emerge naturally.',
    ],
    pageDescription: [
      'Severance is a stored cooperative horror concept, not an active production project. Its main idea is to make paranoia the base emotion and use short stress peaks only when they can create a memorable story.',
      'The design leans on proximity voice, incomplete information, separation and directed randomness rather than constant attacks or full combat control.',
    ],
    tags: ['Unity', 'C#', 'Co-op', 'Horror'],
    links: [],
  },
  {
    slug: 'peripeteia-russian-translation',
    title: 'Peripeteia Russian Translation',
    status: 'Completed',
    image: '/project_peripeteia.png',
    imageAlt: 'Peripeteia Russian translation project preview',
    summary: 'A Russian translation package for the game Peripeteia.',
    progress: 'The translation is complete and the game is playable in Russian.',
    cardDetails: [
      'Built around XUnity.AutoTranslator.',
      'The first level was translated with DeepL and corrected manually.',
      'Available through the Steam Workshop page.',
    ],
    pageDescription: [
      'This is a Russian translation package for Peripeteia. It was localized using XUnity.AutoTranslator.',
      'The first level was almost entirely translated with DeepL and then corrected by me. The rest was automatically translated using GoogleTranslateCompat, so the translation is playable but not fully polished.',
      'If you want to change the translator, edit AutoTranslatorConfig.ini in Peripeteia/BepInEx/config. If you need to manually edit translated text, edit _AutoGeneratedTranslations.txt in Peripeteia/BepInEx/Translation/ru/Text.',
      'For higher-quality automatic translation, DeepL usually gives better results, but it is slower and can stop working under heavy traffic.',
    ],
    tags: ['Translation', 'Game', 'Russian'],
    links: [
      { label: 'Steam download page', href: 'https://steamcommunity.com/sharedfiles/filedetails/?id=3432416516' },
    ],
  },
  {
    slug: 'ds2roller',
    title: 'DS2Roller',
    status: 'Completed',
    image: '/project_ds2roller.png',
    imageAlt: 'DS2Roller project preview',
    summary:
      'A small tool for rolling class and starting gift in Dark Souls 2.',
    progress: 'The tool is complete and currently available only in Russian.',
    cardDetails: [
      'Made for use with the DS2Randomizer mod.',
      'Rolls a class and starting gift for quick challenge starts.',
    ],
    pageDescription: [
      'DS2Roller is a small Russian-only helper tool for Dark Souls 2. It rolls a random class and starting gift, mainly for use with the DS2Randomizer mod.',
      'The project is complete and intentionally simple: it solves one small problem without becoming a larger app.',
    ],
    tags: ['Tool', 'Game', 'Dark Souls 2'],
    links: [
      { label: 'GitHub repository', href: 'https://github.com/Llyneuf/DS2RollerTool' },
    ],
  },
]
