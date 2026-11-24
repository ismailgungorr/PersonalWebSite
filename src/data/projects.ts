import type { Project, ProjectCategory, ProjectImage } from '../types/project'

type ProjectSource = Pick<
  Project,
  | 'technologies'
  | 'categories'
  | 'status'
  | 'featured'
  | 'liveUrl'
  | 'githubUrl'
> & {
  featureCount: number
  imageFiles?: readonly { file: string; width: number; height: number }[]
  illustrationFile?: string
  documentsBusinessValue?: boolean
}

function defineProject<Id extends string>(
  slug: Id,
  {
    featureCount,
    imageFiles = [],
    illustrationFile,
    documentsBusinessValue,
    ...source
  }: ProjectSource,
): Project & { id: Id; slug: Id } {
  const translation = `projects.items.${slug}` as const
  const imageDirectory = `${import.meta.env.BASE_URL}images/projects/${slug}`
  const images: ProjectImage[] = imageFiles.map(
    ({ file, width, height }, index) => ({
      kind: 'screenshot',
      width,
      height,
      src: `${imageDirectory}/${file}`,
      altKey: `${translation}.images.${index}`,
    }),
  )
  if (illustrationFile) {
    images.push({
      kind: 'illustration',
      width: 640,
      height: 320,
      src: `${imageDirectory}/${illustrationFile}`,
      altKey: `${translation}.illustrationAlt`,
    })
  }

  return {
    ...source,
    id: slug,
    slug,
    titleKey: `${translation}.title`,
    summaryKey: `${translation}.summary`,
    problemKey: `${translation}.problem`,
    solutionKey: `${translation}.solution`,
    featuresKeys: Array.from(
      { length: featureCount },
      (_, index) => `${translation}.features.${index}` as const,
    ),
    images,
    valueKey: documentsBusinessValue ? `${translation}.value` : undefined,
    imageNoteKey: documentsBusinessValue
      ? `${translation}.imageNote`
      : undefined,
  }
}

export const projects = [
  defineProject('lebonesa-qrmenu', {
    technologies: ['react', 'node', 'blobs'],
    categories: ['web', 'business'],
    status: 'active',
    featured: true,
    featureCount: 10,
    liveUrl: 'https://lebonesa-qrmenu.netlify.app/',
    imageFiles: [
      { file: 'menu.png', width: 724, height: 837 },
      { file: 'admin-dashboard.png', width: 744, height: 798 },
      { file: 'product-edit.webp', width: 768, height: 767 },
    ],
    documentsBusinessValue: true,
  }),
  defineProject('hadoop', {
    illustrationFile: 'big-data-lab.svg',
    technologies: ['hadoop', 'hive', 'kafka', 'pyspark', 'ubuntu', 'linux'],
    categories: ['bigData', 'infrastructure'],
    status: 'completed',
    featured: true,
    featureCount: 6,
  }),
  defineProject('lebonesa-website', {
    technologies: ['html', 'css', 'javascript'],
    categories: ['web'],
    status: 'active',
    featured: false,
    featureCount: 3,
    liveUrl: 'https://lebonesa.netlify.app/',
    imageFiles: [
      { file: 'web-1.webp', width: 1908, height: 893 },
      { file: 'web-2.png', width: 1892, height: 930 },
      { file: 'web-3.webp', width: 1882, height: 905 },
    ],
  }),
  defineProject('yok-academic-crawler', {
    illustrationFile: 'academic-web-crawler.svg',
    technologies: ['python', 'selenium', 'pandas'],
    categories: ['data', 'automation'],
    status: 'completed',
    featured: false,
    featureCount: 4,
  }),
  defineProject('nlp-complaints', {
    illustrationFile: 'nlp-classification.svg',
    technologies: ['python', 'nltk', 'sklearn', 'pandas', 'tfidf'],
    categories: ['data', 'machineLearning'],
    status: 'completed',
    featured: false,
    featureCount: 4,
  }),
  defineProject('store-app', {
    illustrationFile: 'store-app.svg',
    technologies: ['csharp', 'mvc', 'entityFramework', 'sql'],
    categories: ['web'],
    status: 'learning',
    featured: false,
    featureCount: 5,
  }),
  defineProject('todo-app', {
    illustrationFile: 'todo-app.svg',
    technologies: ['csharp', 'aspnet', 'razor', 'entityFramework'],
    categories: ['web'],
    status: 'learning',
    featured: false,
    featureCount: 4,
  }),
]

export type ProjectId = (typeof projects)[number]['id']

export const projectFilters = {
  all: [],
  web: ['web'],
  business: ['business'],
  data: ['bigData', 'data', 'automation', 'machineLearning'],
  it: ['infrastructure'],
} satisfies Record<string, readonly ProjectCategory[]>

export type ProjectFilter = keyof typeof projectFilters
