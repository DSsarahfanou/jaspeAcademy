import Label from '/src/components/Label'
const FloatingSelect = ({ icon, label, name, value, onChange, options, error }) => (
  <div>
    <Label htmlFor={name}>{label}</Label>
    <div className="relative">
      {icon && <span className="absolute text-gray-400 -translate-y-1/2 left-3 top-1/2">{icon}</span>}
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full py-2 pl-10 pr-3 transition border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">-- Sélectionnez --</option>
        {options.map(({ value, label }) => (
          <option key={value} value={value}>{label}</option>
        ))}
      </select>
    </div>
    {error && <InputError messages={error} className="mt-1" />}
  </div>
);
export default FloatingSelect