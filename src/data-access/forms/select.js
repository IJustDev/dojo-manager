export function Select({options, selectProps}) {
    return <select {...selectProps}>
        {options.map(option => {
            return <option value={option.value}>{option.label}</option>
        })}
    </select>
}