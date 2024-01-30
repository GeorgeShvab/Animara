import Button, { ButtonProps } from '@/ui/Button'
import { FC, ReactElement } from 'react'

interface Props {
  className?: string
  children: string | ReactElement
}

const DropdownItem: FC<Props & ButtonProps> = ({ className, children, ...rest }) => {
  return (
    <li className="[&:last-child>*]:!rounded-b">
      <Button className={'!rounded-none !justify-start w-full ' + className} {...rest}>
        {children}
      </Button>
    </li>
  )
}

export default DropdownItem
