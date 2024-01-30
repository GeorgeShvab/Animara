import { FC, LiHTMLAttributes, ReactElement } from 'react'

interface Props extends LiHTMLAttributes<HTMLLIElement> {
  className?: string
  children: string | ReactElement
}

const SettingsItem: FC<Props> = ({ children, className = '', ...rest }) => {
  return (
    <li
      role="button"
      className={`bg-black/75 px-5 last:pb-4 first:pt-4 py-2.5 text-sm flex gap-5 items-center group ${className}`}
      {...rest}
    >
      {typeof children === 'string' ? (
        <span className="text-neutral-300 group-hover:text-neutral-100 text-xs duration-200 tracking-wider">
          {children}
        </span>
      ) : (
        children
      )}
    </li>
  )
}

export default SettingsItem
