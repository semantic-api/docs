import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'en-US',
  title: 'Semantic API',
  description: 'Official documentation for Semantic API',

  lastUpdated: true,
  cleanUrls: true,
  ignoreDeadLinks: true,

  themeConfig: {
    nav: nav(),
    sidebar: {
      '/guide/': sidebarGuide(),
      '/reference/': sidebarReference()
    },
    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/semantic-api/semantic-api'
      }
    ]
  }
})

function nav() {
  return [
    { text: 'Guide', link: '/guide/what-is-semantic-api', activeMatch: '/guide/' },
    {
      text: 'Reference',
      activeMatch: '^/(api|server|system)/',
      items: [
        { text: '@semantic-api/access-control', link: '/access-control/' },
        { text: '@semantic-api/api', link: '/api/' },
        { text: '@semantic-api/server', link: '/server/' },
        { text: '@semantic-api/system', link: '/system/' },
      ]
    }
  ]
}

function sidebarGuide() {
  return [
    {
      text: 'Introduction',
      collapsed: false,
      items: [
        { text: 'What is Semantic API?', link: '/guide/what-is-semantic-api' },
        { text: 'Getting started', link: '/guide/getting-started' },
        { text: 'Deploy', link: '/guide/deploy' },
      ]
    }
  ]
}

function sidebarReference() {
  return [
    {
      text: 'Entrypoint',
      link: '/reference/entrypoint'
    },
    {
      text: '@semantic-api/api',
      collapsed: false,
      items: [
        { text: 'Algorithm', link: '/api/algorithm' },
        { text: 'Collection', link: '/api/collection' },
        { text: 'Context', link: '/api/context' },
        { text: 'Description', link: '/api/description' },
      ]
    }
  ]
}
