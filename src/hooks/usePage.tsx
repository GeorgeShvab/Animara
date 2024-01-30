import { usePathname } from 'next/navigation'

const usePage = () => {
  const path = usePathname()

  const page = path.split('/')[1]

  return page
}

export default usePage
