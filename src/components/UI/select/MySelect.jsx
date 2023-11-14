const MySelect = ({options, defaultValue, value, onChange}) => {
    return (
        <div style={{margin: '10px 0'}}>
            <select
                value={value}
                onChange={event => onChange(event.target.value)}
            >
                <option disabled value="">{defaultValue}</option>
                {options.map(option => 
                    <option key={option.value} value={option.value}>
                        {option.name}
                    </option>
                )}
            </select>
        </div>
    )
}


export default MySelect;
