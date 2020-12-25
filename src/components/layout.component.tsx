import { ReactNode } from 'react';


interface ILayoutProps {
  hideNav?: boolean,
  title?: string,
  children: ReactNode
}

export const Layout = (props: ILayoutProps): JSX.Element => {

  return (
    <div className="w-full h-full flex flex-col">
      <div>
        {props.title}
      </div>
      <div>
        {props['children']}
      </div>
    </div>
  )
}