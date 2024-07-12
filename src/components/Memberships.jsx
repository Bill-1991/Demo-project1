/* eslint-disable react/prop-types */
import './Memberships.css';


const Memberships = ({ edit, membershipUrl, name, curTable, obj, expires, onExpiresChange, onNameChange, 
  onMembershipUpdate }) => {
    return (
      <div className='memberships'>
      { !edit && <div className="membership">
        <p>Data:</p>
        <p>{membershipUrl}</p>
      </div> }
      <div className='name'>
        <p>Name: </p>
        <input value={name} onChange={onNameChange} placeholder={edit && curTable === 'memberships' ? obj.name : "Name"} />
      </div>
      <div className='expires'>
        <p>Expires at: </p>
        <input value={expires} onChange={onExpiresChange} placeholder={edit && curTable === 'memberships' ? obj.expires_at : "Format: day-month-year"} />
      </div>
      { edit && <button className='save' onClick={() => onMembershipUpdate(curTable)} >Save</button> }
    </div>
    )
}

export default Memberships;