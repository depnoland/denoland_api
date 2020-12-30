import { Client } from '../mod.ts'

const client = new Client()

const stats = await client.getStats()
console.log(`deno.land/x has ${stats.total_count} modules`)

const mod = await client.getModule('lodash')
console.log(`${mod.name} has ${mod.star_count} stars`)

const modslist = await client.listModules(1, 1, 'random')
console.log(`Today's module: ${modslist.results[0].name}`)

const modslist2 = await client.searchModules('middleware', 100)
console.log(`I found ${modslist2.results.length}/100 middlewares!`)

const versions = await client.listVersions('harmony')
console.log(`latest version of harmony is ${versions.latest}`)

const meta = await client.getMetadata('ky', 'v0.23.0')
console.log(`total size of ky: ${meta.directory_listing[0].size} bytes`)
console.log(`github repo of ky: ${meta.upload_options.repository}`)

const deps = await client.listDependencies('std', '0.83.0')
console.log(`std module has ${Object.keys(deps.graph.nodes).length}+ dependences`)

const blob = await client.getRawSource('urlcat', 'v2.0.4', '/README.md')
const buffer = await blob.arrayBuffer()
const unit8arr = new Deno.Buffer(buffer).bytes()
Deno.writeFileSync('./test/README.md', unit8arr)
console.log('urlcat@v2.0.4\'s README.md saved at ./test/README.md')

// NICE WORK!
