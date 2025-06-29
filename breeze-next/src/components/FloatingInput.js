import InputError from './InputError';
import Label from '/src/components/Label'
const FloatingInput = ({ icon, label, type = "text", name, value, onChange, error }) => (
  <div>
    <Label htmlFor={name}>{label}</Label>
    <div className="relative">
      {icon && <span className="absolute text-gray-400 -translate-y-1/2 left-3 top-1/2">{icon}</span>}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full py-2 pl-10 pr-3 transition border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
    {error && <InputError messages={error} className="mt-1" />}
  </div>
);
export default FloatingInput