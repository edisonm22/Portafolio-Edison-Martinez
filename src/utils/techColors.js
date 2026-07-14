export const techColors = {
  React: 'bg-blue-500/20 text-blue-400',
  Node: 'bg-green-500/20 text-green-400',
  'Node.js': 'bg-green-500/20 text-green-400',
  MongoDB: 'bg-green-600/20 text-green-500',
  Express: 'bg-gray-500/20 text-gray-400',
  TypeScript: 'bg-blue-600/20 text-blue-300',
  Tailwind: 'bg-cyan-500/20 text-cyan-400',
  'Tailwind CSS': 'bg-cyan-500/20 text-cyan-400',
  'Next.js': 'bg-gray-800/50 text-gray-300',
  PostgreSQL: 'bg-blue-700/20 text-blue-500',
  Docker: 'bg-blue-400/20 text-blue-400',
  AWS: 'bg-orange-500/20 text-orange-400',
  Stripe: 'bg-purple-500/20 text-purple-400',
  GraphQL: 'bg-pink-500/20 text-pink-400',
  default: 'bg-[#2d3a4f] text-[#94a3b8]',
}

export function getTechColor(tech) {
  return techColors[tech] || techColors.default
}
