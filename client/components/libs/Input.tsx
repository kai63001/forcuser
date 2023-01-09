interface InputInterface {
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  required?: boolean;
  className?: string;
  name: string;
  label?: string;
}
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
const Input = (e: InputInterface) => {
    
    const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      {e.label && (
        <label htmlFor={e.name} className="mb-2">
          {e.label}
        </label>
      )}
      <div className="relative">
        <input
          id={e.name}
          name={e.name}
          type={e.type == 'password' ? showPassword ? 'text' : 'password' : e.type || 'text'}
          placeholder={e.placeholder}
          required={e.required || false}
          autoComplete={e.autoComplete || "off"}
          className={`appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
        />
        {e.type === "password" && (
          <div onClick={()=>setShowPassword(!showPassword)} className="absolute right-3 top-[8px] cursor-pointer z-10">
            <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
          </div>
        )}
      </div>
    </>
  );
};

export default Input;
