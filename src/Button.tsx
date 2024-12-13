import React from 'react';

const Button = (props: ButtonProps) => {
  return (
    <button>
      {props.children}
    </button>
  )
}

export default Button;