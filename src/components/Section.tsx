import Button, { ButtonProps } from '@/ui/Button'
import { FC, ReactElement, HTMLAttributes } from 'react'

interface Props {
  children: ReactElement
  title?: string | ReactElement
  button?: string | ReactElement
  className?: string
  buttonProps?: Omit<ButtonProps, 'children'>
  headerProps?: HTMLAttributes<HTMLDivElement>
  containerProps?: HTMLAttributes<HTMLDivElement>
  header?: ReactElement
}

const Section: FC<Props> = ({
  children,
  title,
  button,
  buttonProps,
  className,
  headerProps,
  containerProps,
  header,
}) => {
  return (
    <div className={`bg-black py-12 md:py-14 section ${className}`}>
      <div {...containerProps} className={`container ${containerProps?.className || ''}`}>
        {title ? (
          <div
            {...headerProps}
            className={`flex justify-between items-center px-3 mb-4 md:mb-9 ${headerProps?.className || ''}`}
          >
            {typeof title === 'string' ? <h2 className="text-xl md:text-2xl font-bold text-white">{title}</h2> : title}
            {button ? (
              typeof button === 'string' ? (
                <Button
                  {...(buttonProps as ButtonProps)}
                  className={`font-bold !text-theme !bg-transparent py-0 !px-0 text-sm md:text-base !h-10 hover:!text-theme-dark ${
                    buttonProps?.className || ''
                  }`}
                  endIcon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={3.5}
                      stroke="currentColor"
                      className="h-5 w-5 md:w-6 md:h-6"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                  }
                >
                  {button}
                </Button>
              ) : (
                button
              )
            ) : null}
          </div>
        ) : header ? (
          header
        ) : null}
        {children}
      </div>
    </div>
  )
}

export default Section
