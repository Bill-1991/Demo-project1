/* eslint-disable react/prop-types */
import Url from './Url';
import Vcard from './Vcard';
import './EditQr.css'
import Memberships from './Memberships';

const EditQr = ({ obj, curTable, edit, closeEdit, selectUrlForm, selectVCardForm, urlForm, vCardForm, url, onUrlChange, firstName, firstNameChange, lastName,
    lastNameChange, title, titleChange, email, emailChange, rawAddress, rawAddressChange,
    contactUrl, contactUrlChange, tel, telChange, notes, notesChange, photo, selectImg, onUrlUpdate, onVCardUpdate, 
    onMembershipUpdate, selectMembershipForm, membershipForm, onNameChange, onExpiresChange, name, expires }) => {
    return (
        <div className='edit'>
            <button className='closeEdit' onClick={closeEdit}>X</button>
            <div className="forms">
                <button onClick={selectUrlForm}>Url</button>
                <button onClick={selectVCardForm}>vCard</button>
                <button onClick={selectMembershipForm}>Memberships</button>
            </div>
            {urlForm === true ? <Url edit={edit} obj={obj} curTable={curTable} url={url} onUrlChange={onUrlChange} onUrlUpdate={onUrlUpdate} />
             : vCardForm === true ? <Vcard edit={edit} obj={obj} curTable={curTable}firstName={firstName} 
             firstNameChange={firstNameChange} lastName={lastName} lastNameChange={lastNameChange} title={title} titleChange={titleChange} 
             email={email} emailChange={emailChange} contactUrl={contactUrl} contactUrlChange={contactUrlChange} rawAddress={rawAddress} 
             rawAddressChange={rawAddressChange}  tel={tel} telChange={telChange} notes={notes} notesChange={notesChange} photo={photo}
             selectImg={selectImg} onVCardUpdate={onVCardUpdate} /> 
             : membershipForm === true ? <Memberships edit={edit} curTable={curTable} obj={obj} onMembershipUpdate={onMembershipUpdate} onNameChange={onNameChange}
             onExpiresChange={onExpiresChange} name={name} expires={expires} /> : undefined}
        </div>
    )
}

export default EditQr;