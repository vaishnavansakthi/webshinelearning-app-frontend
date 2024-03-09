import { IInputBlock } from "../../../types/InputBlock"
import Input from "../../atoms/Input/Input"
import Label from "../../atoms/Label/Label"

const InputBlock = ({
  htmlFor,
  placeholder,
  text,
  type,
  disabled,
  className,
  isError,
  errorMessage,
  name
}: IInputBlock) => {
  return (
    <>
      <div>
        <Label text={text} htmlFor={htmlFor} className={className} />
        <Input
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          isError={isError}
          errorMessage={errorMessage}
          name={name}
        />
      </div>
    </>
  )
}

export default InputBlock
