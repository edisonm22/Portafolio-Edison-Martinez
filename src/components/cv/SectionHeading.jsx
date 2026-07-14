export default function SectionHeading({ icon, title }) {
  return (
    <h3 className="flex items-center gap-3 text-xl font-black text-[#f1f5f9] mb-8 pb-4 border-b-2 border-[#2d3a4f]">
      {icon}
      {title}
    </h3>
  )
}
