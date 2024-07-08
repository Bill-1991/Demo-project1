/* eslint-disable react/prop-types */
import './VcardUi.css';


const VcardUi = ({ curVCard, addressChange, fileName, fileNameChange, downloadVcard, firstName, lastName, title, email, address, tel, notes, 
    contactUrl, photo
 }) => {
    
    address = addressChange(address)

    return (
        <div id="vcards" className="vcardUi">
            <div className="mainUi">
                { photo && <img src={photo} /> }
                <div className='name'>
                    { firstName && <p>{firstName}</p> }
                    { lastName && <p>{lastName}</p> }
                </div>
            </div>
            <div className="titleUi">
                <p style={{textDecoration: "underline"}}>Title: </p>
                { title && <p>{title}</p> }
            </div>
            <div className="emailUi">
                <p  style={{textDecoration: "underline"}}>email: </p>
                { email && <p>{email}</p> }
            </div>
            <div className="addressUi">
                <p  style={{textDecoration: "underline"}}>Address:</p>
                { address && <p>{address} </p> }
            </div>
            <div className="phoneUi">
                <p  style={{textDecoration: "underline"}}>Phone Number: </p>
                { tel && <p>{tel}</p> }
            </div>
            <div className="webUi">
                <p style={{textDecoration: "underline"}}>Website: </p>
                { contactUrl && <p>{contactUrl}</p> }
            </div>
            <div className="notesUi">
                <p style={{textDecoration: "underline"}}>Notes: </p>
                { notes && <p>{notes}</p> }
            </div>
            <div className='downloadCard'>
                <input type="text" value={fileName} onChange={fileNameChange} placeholder='File name' />
                <button onClick={() => downloadVcard(curVCard)}>Download</button>
            </div>
        </div>
    )
}

export default VcardUi;