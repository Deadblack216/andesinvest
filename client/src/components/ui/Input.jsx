import { forwardRef } from "react";
//texto dentro de los forms 
export const Input = forwardRef((props, ref) => (
  <input
    {...props}
    ref={ref}
    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md"
  />
));
