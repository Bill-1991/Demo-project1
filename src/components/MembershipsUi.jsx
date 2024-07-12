/* eslint-disable react/prop-types */
import './MembershipsUi.css';


const Memberships = ({ name, expiresAt }) => {
    return (
      <div className='card'>
        <div className='logo'>
            <div>
                <p style={{margin: 0, padding: 0}}>WHERE</p>
                <p style={{margin: 0, padding: 0}}>YOUR</p>
            </div>
            <p className='ideas'>IDEAS</p>
            <div className='web'>
                <p className='w'>W</p>
                <p className='eb'>eb.</p>
            </div>
            <p className='come'>COME TO</p>
            <p className='the'>THE</p>
            
        </div>
        <div className='lynx'>
            <p className='header'>lynx</p>
            <div>
                <p>{name}</p>
                <p>Expires at: {expiresAt}</p>
            </div>
        </div>
      </div>
    )
}

export default Memberships;