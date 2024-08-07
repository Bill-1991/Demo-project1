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
                { title && <p>{title}</p> }
            </div>
            <div className="emailUi">
                { email && <p>{email}</p> }
            </div>
            <div className="addressUi">
                { address && <p>{address} </p> }
            </div>
            <div className="phoneUi">
                { tel && <p>{tel}</p> }
            </div>
            <div className="webUi">
                { contactUrl && <p>{contactUrl}</p> }
            </div>
            <div className="notesUi">
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