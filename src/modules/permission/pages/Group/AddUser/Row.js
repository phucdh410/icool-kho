import { CCheckbox } from '_components/controls'

export default ({ data, check, onChange}) => {
  return (
    <tr onClick={() => onChange(!data.check)}>
      <td>
        <CCheckbox className="mx-auto" value={check} onChange={onChange} />
      </td>
      <td>
        { data.code }
      </td>
      <td>
        { data.name }
      </td>
    </tr>
  )
}