import { IInputBlock } from "../../../types/InputBlock"
import Input from "../../atoms/Input/Input"
import Label from "../../atoms/Label/Label"

const InputBlock = ({ htmlFor, placeholder, text, type, disabled, onChange, className, name, labelClassName, isErrors }: IInputBlock) => {
  return (
    <>
      <div>
        <Label text={text} htmlFor={htmlFor} labelClassName={labelClassName} />
        <Input className={className} type={type} isErrors={isErrors} placeholder={placeholder} disabled={disabled} onChange={onChange} name={name} />
      </div>
    </>
  )
}

export default InputBlock
