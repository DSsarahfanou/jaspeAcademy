const Input = ({ disabled = false, className = '', ...props }) => (
    <input
        disabled={disabled}
        className={`
            w-full px-3 py-2 text-sm text-gray-700 placeholder-gray-400 
            bg-white border border-gray-300 rounded-md shadow-sm 
            focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
            disabled:opacity-50 disabled:cursor-not-allowed 
            ${className}
        `}
        {...props}
    />
)

export default Input
