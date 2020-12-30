import { API_BASEURL, CDN_BASEURL } from '../consts/baseURLs.ts'
import type { ResultSort } from './responses.ts'

/**
 * fetch deno.land module upload stats
 */
export const GET_STATS = () => API_BASEURL + '/stats'

/**
 * fetch builds
 * @param buildid build id for fetching
 */
export const GET_BULIDS = (buildid: string) => API_BASEURL + '/builds/' + buildid

/**
 * fetch module infomations
 * @param modname module name for fetching
 */
export const GET_MODULE = (modname: string) => API_BASEURL + '/modules/' + modname

/**
 * fetch all of modules
 * @param limit results per page (default: 20)
 * @param page  page number of the results (default: 1)
 * @param sort  sort method of the results (default: 'stars')
 */
export const LIST_MODULES = (limit = 20, page = 1, sort: ResultSort = 'stars') =>
  API_BASEURL + '/modules?limit=' + limit + '&page=' + page + '&sort=' + sort

/**
 * search modules
 * @param modname module name for seaching
 * @param limit results per page (default: 20)
 * @param page  page number of the results (default: 1)
 * @param sort  sort method of the results (default: 'stars', but looks like api server doesn't handle it (except 'random'))
 */
export const SEARCH_MODULES = (modname: string, limit = 20, page = 1, sort: ResultSort = 'stars') =>
  API_BASEURL + '/modules?limit=' + limit + '&page=' + page + '&sort=' + sort + '&query=' + modname

/**
 * fetch module versions list
 * @param modname module name for fetching
 */
export const LIST_VERISONS = (modname: string) =>
  CDN_BASEURL + '/' + modname + '/meta/versions.json'

/**
 * fetch dependencies list
 * (works on `std` only yet)
 * @param modname module name for fetching
 * @param verison module version for fetching
 */
export const LIST_DEPENDENCIES = (modname: string, verison: string) =>
  CDN_BASEURL + '/' + modname + '/versions/' + verison + '/meta/deps_v2.json'

/**
 * fetch metadata
 * @param modname module name for fetching
 * @param verison module version for fetching
 */
export const GET_METADATA = (modname: string, verison: string) =>
  CDN_BASEURL + '/' + modname + '/versions/' + verison + '/meta/meta.json'

/**
 * fetch raw source code
 * @param modname module name for fetching
 * @param verison module version for fetching
 * @param path source path for fetching
 */
export const GET_RAW_SOURCE = (modname: string, verison: string, path: string) =>
  CDN_BASEURL + '/' + modname +  '/versions/' + verison + '/raw' + path
