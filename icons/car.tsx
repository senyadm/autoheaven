import * as React from "react";
import { SVGProps } from "react";

interface Props extends SVGProps<SVGSVGElement> {

}

const Cars = (props: Props) => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0.334064 9.49877C0.333126 9.94689 0.505626 10.3913 0.807501 10.7222L0.334064 9.49877ZM0.334064 9.49877C0.332814 8.90627 0.332814 8.31377 0.334064 7.72127V9.49877ZM5.25031 3.33439C6.26512 3.33267 7.28011 3.33308 8.295 3.33348C8.57178 3.33359 8.84855 3.3337 9.12531 3.33377C9.71594 3.33158 10.2959 3.63721 10.6278 4.12533L5.25031 3.33439Z" fill="#18181B" stroke="#09090B" stroke-width="1.33333" />
    </svg>


);

export { Cars };