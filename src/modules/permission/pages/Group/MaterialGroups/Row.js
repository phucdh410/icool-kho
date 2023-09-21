
import { CCheckbox } from '_components/controls'

export default ({ code, name, value, onChange}) => {
  return <tr>
    <td className="text-left">{ name }</td>
    <td className='px-0'>
      <CCheckbox className="mx-auto" value={value} onChange={onChange(code)}/>
    </td>
  </tr>
}