import React,{PropsWithChildren} from "react";

const InlineCode: React.FC<PropsWithChildren<{}>> = ({
  children
}) => {
  return <code className="inline-code">{children}</code>
}

export default InlineCode