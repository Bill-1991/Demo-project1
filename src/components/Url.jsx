/* eslint-disable react/prop-types */
import './Url.css';


const Url = ({ url, siteUrl, onUrlChange, edit, obj, curTable, onUrlUpdate }) => {
    return (
      <div className='wholeUrl'>
        { !edit && <div className="url">
          <p>Data:</p>
          <p>{siteUrl}</p>
        </div> }
        <div className='siteUrl'>
          <p>Your Site: </p>
          <input value={url} onChange={onUrlChange} placeholder={edit && curTable === 'urls' ? obj.urlName : "Url address"} />
        </div>
        { edit && <button className='save' onClick={() => onUrlUpdate(curTable)} >Save</button> }
      </div>
    )
}

export default Url;