/* eslint-disable react/prop-types */
import './Memberships.css';


const Memberships = ({ edit, membershipUrl, membershipName, curTable, obj, expires, onExpiresChange, onMembershipNameChange, 
  onMembershipUpdate }) => {
    return (
      <div className='memberships'>
      { !edit && <div className="membership">
        <p>Data:</p>
        <p>{membershipUrl}</p>
      </div> }
      <div className='name'>
        <p>Name: </p>
        <input value={membershipName} onChange={onMembershipNameChange} placeholder={edit && curTable === 'memberships' ? obj.name : "Name"} />
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