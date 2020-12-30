export interface APIResponse {
  success: boolean,
  error?: string,
  data?: StatsData | ModuleData | ModuleSearchData
}

export type ResultSort = 'stars' | 'newest' | 'oldest' | 'random'
export type ResultSortM = 'stars' | 'newest' | 'oldest' | 'random' | 'search_order'

export interface StatsData {
  total_count: number,
  total_versions: number,
  recently_added_modules: ModuleData[],
  recently_uploaded_versions: ModuleData[]
}

export interface ModuleData {
  name: string,
  description?: string,
  version?: string,
  star_count?: number,
  created_at: string
}

export interface ModuleSearchData {
  total_count: number,
  options: SearchOptions,
  results: ModuleData[]
}

export interface SearchOptions {
  limit: number,
  page: number,
  query?: string,
  sort: ResultSortM
}

export interface VersionData {
  latest: string,
  versions: string[]
}

export interface DependenciesData {
  graph: DependencyGraph
}

export interface DependencyGraph {
  nodes: {
    [url: string]: {
      deps: string[]
      size: number
    }
  }
}
  
export interface VersionMetaInfo {
  uploaded_at: string,
  directory_listing: DirListing[]
  upload_options: UploadOptions
}

export interface DirListing {
  path: string
  type: 'dir' | 'file'
  size?: number
}

export interface UploadOptions {
  type: 'github'
  repository: string
  subdir?: string
  ref: string
}
