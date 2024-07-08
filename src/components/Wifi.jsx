/* eslint-disable react/prop-types */
import './Wifi.css';


const Wifi = ({ url, onUrlChange }) => {
    return (
        <div className="wifi">
          <p>Data</p>
          <input value={url} onChange={onUrlChange} />
        </div>
    )
}

export default Wifi;