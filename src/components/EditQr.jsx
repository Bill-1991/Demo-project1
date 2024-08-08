/* eslint-disable react/prop-types */
import Url from './Url';
import Vcard from './Vcard';
import './EditQr.css'

const EditQr = ({ obj, curTable, edit, closeEdit, selectUrlForm, selectVCardForm, urlForm, vCardForm, url, onUrlChange, firstName, firstNameChange, lastName,
    lastNameChange, title, titleChange, email, emailChange, rawAddress, rawAddressChange,
    contactUrl, contactUrlChange, tel, telChange, notes, notesChange, photo, selectImg, onUrlUpdate, onVCardUpdate, 
     }) => {
    return (
        <div className='edit'>
            <button className='closeEdit' onClick={closeEdit}>X</button>
            <p>*If the page doesn't reload after updating vcard content, then reload it manually to see the changes</p>
            <div className="forms">
                <button onClick={selectUrlForm}>Url</button>
                <button onClick={selectVCardForm}>vCard</button>
            </div>
            {urlForm === true ? <Url edit={edit} obj={obj} curTable={curTable} url={url} onUrlChange={onUrlChange} onUrlUpdate={onUrlUpdate} />
             : vCardForm === true ? <Vcard edit={edit} obj={obj} curTable={curTable}firstName={firstName} 
             firstNameChange={firstNameChange} lastName={lastName} lastNameChange={lastNameChange} title={title} titleChange={titleChange} 
             email={email} emailChange={emailChange} contactUrl={contactUrl} contactUrlChange={contactUrlChange} rawAddress={rawAddress} 
             rawAddressChange={rawAddressChange}  tel={tel} telChange={telChange} notes={notes} notesChange={notesChange} photo={photo}
             selectImg={selectImg} onVCardUpdate={onVCardUpdate} /> 
             : undefined}
        </div>
    )
}

export default EditQr;