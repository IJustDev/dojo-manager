export function Select({options, selectProps, allowEmpty}) {
    return <select {...selectProps}>
        {allowEmpty ? 
        <option value="undefined"></option>: <></>}
        {options.map(option => {
            return <option value={option.value}>{option.label}</option>
        })}
    </select>
}