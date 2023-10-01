import React,{PropsWithChildren} from "react";
import TeX from "@matejmazur/react-katex";


const MathBlock: React.FC<PropsWithChildren<{math?:string}>> = ({
  children,math
}) => {
  if(math){
    return <TeX math={math}/>
  }
  return (
        <div className="math-display">
          <TeX block>{children}</TeX>
        </div>
  )
 }

export { MathBlock };