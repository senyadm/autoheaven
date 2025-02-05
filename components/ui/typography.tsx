interface TypographyProps{
    children: string;
    className?: string;
}
export function TypographyH1({children, className}: TypographyProps) {
  return (
    <h1 className={`scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl ${className? className:""}`}>
      {children}
    </h1>
  )
}
export function TypographyH2({children, className}: TypographyProps) {
  return (
    <h2 className={`scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 ${className? className:""}`}>
      {children}
    </h2>
  )
}
export function TypographyH3({ children, className }: TypographyProps) {
  return (
    <h3 className={`scroll-m-20 text-2xl font-semibold tracking-tight ${className}`}>
      {children}
    </h3>
  );
}
export function TypographyH4({children, className}: TypographyProps) {
  return (
    <h4 className={`scroll-m-20 text-xl font-semibold tracking-tight ${className? className:""}`}>
      {children}
    </h4>
  )
}
interface TypographyListProps{
    listItems: string[];
    ulClassName?: string;
}
export function TypographyList({ listItems, ulClassName }: TypographyListProps) {
  return (
    <ul className={`text-sm [&>li]:mt-2 ${ulClassName}`}>
      {listItems?.map((listItem) => (
        <li key={listItem}>{listItem}</li>
      ))}
    </ul>
  );
}
export function TypographyLarge({children, className}: TypographyProps) {
  return (
    <div className={`text-lg font-semibold ${className}`}>{children}</div>
  )
}
export function TypographyP({children, className}: TypographyProps) {
  return (
    <p className={`leading-7 [&:not(:first-child)]:mt-6 ${className}`}>
      {children}
    </p>
  );
}