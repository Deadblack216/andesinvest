import { forwardRef } from "react";
//Color del texto de direccion 
export const Textarea = forwardRef((props, ref, rows = 2) => (
  <textarea
    {...props}
    ref={ref}
    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md"
    rows={rows}
  />
));
