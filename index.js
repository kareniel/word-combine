fs = require('fs')

const args = process.argv.slice(2)
const filename = args[0]
const prefix = findArg(args, '-p=')
const suffix = findArg(args, '-s=')

const combine = (p, c, i, a) => p.concat(a.map(c => [a[i], c]))
const same = x => x[0] !== x[1]
const join = x => prefix + x.join('') + suffix + '\n'

const words = fs.readFileSync(filename, 'utf8').trim().split('\n')
const pairs = words
  .reduce(combine, [])
  .filter(same)
  .map(join)
  .join('')

console.log(pairs)

function findArg (args, name) {
  const arg = args.find(x => x.includes(name))
  if (arg) {
    return arg.slice(name.length)
  }
  return ''
}