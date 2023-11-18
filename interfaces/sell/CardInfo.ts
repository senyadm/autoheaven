interface CardInfo{
    title: string,
    description: string,
    text: string[],
    buttonText:string,
    plan?: 'classic' | 'direct'
  }
export interface PlansInfo extends CardInfo{
  icon: JSX.Element;
}
export interface ProcessInfo extends CardInfo {
  icon: JSX.Element;
  icons: JSX.Element[];
}