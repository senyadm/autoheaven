interface CardInfo{
    title: string,
    description: string,
    text: string[],
    buttonText:string,
    
  }
export interface PlansInfo extends CardInfo{
  icon: JSX.Element;
}
export interface ProcessInfo extends CardInfo {
  icons: JSX.Element[];
}