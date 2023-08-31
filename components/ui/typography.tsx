interface TypographyH2Props{
    children: JSX.Element;
}
export function TypographyH2({children}: TypographyH2Props) {
  return (
    <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
      {children}
    </h2>
  )
}
interface TypographyListProps{
    listItems: string[];
}
export function TypographyList({listItems}: TypographyListProps) {
  return (
    <ul className="text-sm [&>li]:mt-2">
       {listItems.map(listItem => <li key={listItem}>{listItem}</li>)}
    </ul>
  )
}
