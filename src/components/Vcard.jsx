/* eslint-disable react/prop-types */
import { Form } from 'react-bootstrap';
import './Vcard.css';


const Vcard = ({ vCardUrl, firstName, firstNameChange, lastName, lastNameChange, title, titleChange, email, emailChange, rawAddress, rawAddressChange,
  contactUrl, contactUrlChange, org, orgChange, secondTel, secondTelChange, tel, telChange, notes, notesChange, selectImg, edit, obj, curTable, onVCardUpdate 
}) => {
    /*
    { !edit && <div className='vcardUrl'>
            <p>Data</p>
            <input value={`${vCardUrl}`} readOnly />
          </div> }
    */
    return (
      <div className='vcard'>
        
        <Form>
          <Form.Group className='firstname'>
            <p>First name: </p>
            <Form.Control type="text" onChange={firstNameChange} value={firstName} placeholder={edit && curTable === "vcards" ? obj.firstName : "First name"} />
          </Form.Group>
          <Form.Group className='lastname'>
            <p>Last name: </p>
            <Form.Control type="text" onChange={lastNameChange} value={lastName} placeholder={edit && curTable === 'vcards' ? obj.lastName : "Last name"} />
          </Form.Group>
          <Form.Group className='org'>
            <p>Organization: </p>
            <Form.Control type="text" onChange={orgChange} value={org} placeholder={edit && curTable === 'vcards' ? obj.title : "Organization"} />
          </Form.Group>
          <Form.Group className='title'>
            <p>Title: </p>
            <Form.Control type="text" onChange={titleChange} value={title} placeholder={edit && curTable === 'vcards' ? obj.title : "Title"} />
          </Form.Group>
          <Form.Group className='email'>
            <p>Email: </p>
            <Form.Control type="email" onChange={emailChange} value={email} placeholder={edit && curTable === 'vcards' ? obj.email : "example@gmail.com"} />
          </Form.Group>
          <Form.Group className='address'>
            <p>Address: </p>
            <Form.Control type="text" onChange={rawAddressChange} value={rawAddress} placeholder={edit && curTable === 'vcards' ? obj.address : "Street,City,Zip,Country. Separated by comma"} />
          </Form.Group>
          <Form.Group className='contactUrl'>
            <p>Url of contact: </p>
            <Form.Control type="text" onChange={contactUrlChange} value={contactUrl} placeholder={edit && curTable === 'vcards' ? obj.website : "Website"} />
          </Form.Group>
          <Form.Group className='tel'>
            <p>Phone number: </p>
            <Form.Control type="tel" onChange={telChange} value={tel} placeholder={ edit && curTable === 'vcards' ? obj.phone : "Only numbers format: 6900000000" } />
          </Form.Group>
          <Form.Group className='workTel'>
            <p>Work Phone number: </p>
            <Form.Control type="tel" onChange={secondTelChange} value={secondTel} placeholder={ edit && curTable === 'vcards' ? obj.phone : "Only numbers format: 6900000000 / 2100000000" } />
          </Form.Group>
          <Form.Group className='notes'>
            <p>Notes: </p>
            <Form.Control type="text" onChange={notesChange} value={notes} placeholder={edit && curTable === 'vcards' ? obj.notes : "Notes for contact"} />
          </Form.Group>
          <Form.Group  className='photo'>
            <p>Photo: </p>
            <Form.Control type="file" onChange={selectImg} placeholder='Photo' />
          </Form.Group>
        </Form>
        
      </div>
    )
}
//{ edit && <button className='save' onClick={() => onVCardUpdate(curTable)} >Save</button> }
export default Vcard;