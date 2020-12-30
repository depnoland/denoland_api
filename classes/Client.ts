import { ACCEPT, USER_AGENT } from "../consts/headers.ts"
import { ClientOption } from '../types/client.ts'
import { GET_BULIDS, GET_METADATA, GET_MODULE, GET_RAW_SOURCE, GET_STATS, LIST_DEPENDENCIES, LIST_MODULES, LIST_VERISONS, SEARCH_MODULES } from "../types/endpoints.ts"
import { APIResponse, DependenciesData, ModuleData, ModuleSearchData, ResultSort, StatsData, VersionData, VersionMetaInfo } from "../types/responses.ts"

export class Client {
  private header: Headers

  constructor (option?: ClientOption) {
    this.header = new Headers({
      'User-Agent': option?.header.get('User-Agent') || USER_AGENT,
      'Accept': option?.header.get('Accept') || ACCEPT
    })
  }

  private async _fetch (url: string): Promise<APIResponse | VersionData | DependenciesData | VersionMetaInfo> {
    const res = await fetch(url, {
      method: 'GET',
      headers: this.header
    })
    
    return res.json()
  }

  /**
   * fetch deno.land module upload stats
   *
   *     const client = new Client()
   *     const stats = await client.getStats()
   *     console.log(`deno.land/x has ${stats.total_count} modules`)
   */ 
  async getStats (): Promise<StatsData> {
    const res = await this._fetch(GET_STATS())
    const typed = res as APIResponse
    if (!typed.success) throw new Error(typed.error)

    return typed.data as StatsData
  }

  // if you know anything about this api, plz make issue or PR
  // deno-lint-ignore no-explicit-any
  async getBuilds (buildId: string): Promise<any> {
    const res = await this._fetch(GET_BULIDS(buildId))
    const typed = res as APIResponse
    if (!typed.success) throw new Error(typed.error)

    return typed.data
  }

  /**
   * fetch module infomations
   * 
   *     const client = new Client()
   *     const mod = await client.getModule('lodash')
   *     console.log(`${mod.name} has ${mod.star_count} stars`)
   * 
   * @param modname exact module name for fetching
   */
  async getModule (modname: string): Promise<ModuleData> {
    const res = await this._fetch(GET_MODULE(modname))
    const typed = res as APIResponse
    if (!typed.success) throw new Error(typed.error)
    
    return typed.data as ModuleData
  }

  /**
   * fetch all of modules
   * 
   *     const client = new Client()
   *     const modslist = await client.listModules(1, 1, 'random')
   *     console.log(`Today's module: ${modslist.results[0].name}`)
   * 
   * @param limit results per page (default: 20)
   * @param page  page number of the results (default: 1)
   * @param sort  sort method of the results (default: 'stars')
   */
  async listModules (limit = 20, page = 1, sort: ResultSort = 'stars'): Promise<ModuleSearchData> {
    const res = await this._fetch(LIST_MODULES(limit, page, sort))
    const typed = res as APIResponse
    if (!typed.success) throw new Error(typed.error)

    return typed.data as ModuleSearchData
  }

  /**
   * search modules
   * 
   *     const client = new Client()
   *     const modslist = await client.searchModules('middleware', 100)
   *     console.log(`I found ${modslist.results.length}/100 middlewares!`)
   * 
   * @param query module name for seaching
   * @param limit results per page (default: 20)
   * @param page  page number of the results (default: 1)
   * @param sort  sort method of the results (default: 'stars', but looks like api server doesn't handle it (except 'random'))
   */
  async searchModules (query: string, limit = 20, page = 1, sort: ResultSort = 'stars'): Promise<ModuleSearchData> {
    const res = await this._fetch(SEARCH_MODULES(query, limit, page, sort))
    const typed = res as APIResponse
    if (!typed.success) throw new Error(typed.error)

    return typed.data as ModuleSearchData
  }
  
  /**
   * fetch module versions list
   * 
   *     const client = new Client()
   *     const versions = await client.listVersions('harmony')
   *     console.log(`latest version of harmony is ${versions.latest}`)
   * 
   * @param modname exact module name for fetching
   */
  async listVersions (modname: string): Promise<VersionData> {
    const res = await this._fetch(LIST_VERISONS(modname))
    return res as VersionData
  }

  /**
   * fetch dependencies list
   * (works on `std` only yet)
   * 
   *     const client = new Client()
   *     const deps = await client.listDependencies('std', '0.83.0')
   *     console.log(`std module has ${Object.keys(deps.graph.nodes).length}+ dependences`)
   * 
   * @param modname exact module name for fetching
   * @param verison module version for fetching
   */
  async listDependencies (modname: string, verison: string): Promise<DependenciesData> {
    const res = await this._fetch(LIST_DEPENDENCIES(modname, verison))
    return res as DependenciesData
  }

  /**
   * fetch metadata
   * 
   *     const client = new Client()
   *     const meta = await client.getMetadata('ky', 'v0.23.0')
   *     console.log(`total size of ky: ${meta.directory_listing[0].size} bytes`)
   *     console.log(`github repo of ky: ${meta.upload_options.repository}`)
   * 
   * @param modname module name for fetching
   * @param verison module version for fetching
   */
  async getMetadata (modname: string, version: string): Promise<VersionMetaInfo> {
    const res = await this._fetch(GET_METADATA(modname, version))
    return res as VersionMetaInfo
  }

  /**
   * fetch raw source code
   * 
   *     const client = new Client()
   *     const blob = await client.getRawSource('urlcat', 'v2.0.4', '/README.md')
   *     const buffer = await blob.arrayBuffer()
   *     const unit8arr = new Deno.Buffer(buffer).bytes()
   *     Deno.writeFileSync('path/to/README.md', unit8arr)
   *     console.log('saved at path/to/README.md')
   * 
   * @param modname module name for fetching
   * @param verison module version for fetching
   * @param path source path for fetching
   */
  async getRawSource (modname: string, version: string, path: string): Promise<Blob> {
    const res = await fetch(GET_RAW_SOURCE(modname, version, path), {
      method: 'GET',
      headers: new Headers({
        'User-Agent': this.header.get('User-Agent') || USER_AGENT,
        'Accept': '*/*'
      })
    })
    
    return res.blob()
  }
}
