/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import EditQr from "./EditQr";
import './Users.css';


const Users = () => {
    const [loadingSites, setLoadingSites] = useState(true)
    const [loadingVCards, setLoadingVCards] = useState(true)
    const [sitesArr, setSitesArr] = useState([])
    const [vCardsArr, setVCardsArr] = useState([])
    const [edit, setEdit] = useState(false)
    const [obj, setObj] = useState({})
    const [curTable, setCurTable] = useState("")
    const [urlForm, setUrlForm] = useState(null)
    const [vCardForm, setVCardForm] = useState(null)
    const [url, setUrl] = useState("");
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [title, setTitle] = useState("")
    const [email, setEmail] = useState("")
    const [contactUrl, setContactUrl] = useState("")
    const [notes, setNotes] = useState("")
    const [photo, setPhoto] = useState(null)
    const [tel, setTel] = useState("")
    const [rawAddress, setRawAddress] = useState("")
    

    useEffect(() => {
        fetch('https://demo-project1-ms77.onrender.com/fetchedsites')
        .then(res => res.json())
        .then(data => {
          setSitesArr(data)
          setLoadingSites(false)
        })
    }, [])
    
    useEffect(() => {
        fetch('https://demo-project1-ms77.onrender.com/fetchedvcards')
        .then(res => res.json())
        .then(data => {
          setVCardsArr(data)
          setLoadingVCards(false)
        })
    }, [])

    const onEdit = (id, table) => {
        setEdit(true)
        let object;
        if (table === "urls") {
            object = sitesArr.filter(name => name._id === id)[0]
            setUrlForm(true)
            setVCardForm(false)
        } else if (table === "vcards") {
            object = vCardsArr.filter(name => name._id === id)[0]
            setUrlForm(false)
            setVCardForm(true)
        }
        setCurTable(table)
        setObj(object)
    }

    const closeEdit = () => {
        setEdit(false)
    }

    const selectUrlForm = () => {
        setVCardForm(false)
        setUrlForm(true)
    }

    const selectVCardForm = () => {
        setVCardForm(true)
        setUrlForm(false)
    }

    const onUrlChange = (event) => {
        setUrl(event.target.value);
    };

    const selectImg = (e) => {
        setPhoto(e.target.files[0])
    }
    
      const firstNameChange = (e) => {
        setFirstName(e.target.value)
      }
    
      const lastNameChange = (e) => {
        setLastName(e.target.value)
      }
    
      const titleChange = (e) => {
        setTitle(e.target.value)
      }
    
      const emailChange = (e) => {
        setEmail(e.target.value)
      }
    
      const telChange = (e) => {
        setTel(e.target.value)
      }
    
      const contactUrlChange = (e) => {
        setContactUrl(e.target.value)
      }
    
      const notesChange = (e) => {
        setNotes(e.target.value)
      }
    
      const rawAddressChange = (e) => {
        setRawAddress(e.target.value)
      }

      function resizeImage(base64Str) {
        return new Promise(resolve => {
          let img = new Image();
          img.src = base64Str;
          img.onload = () => {
            let canvas = document.createElement("canvas");
            let width = img.width;
            let height = img.height;
            canvas.width = width;
            canvas.height = height;
            let ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, width, height);
            resolve(canvas.toDataURL("image/jpeg", 0.2));
          };
        });
      }
    
      const convToBase64 = (file) => {
        return new Promise((resolve, reject) => {
          const fileReader = new FileReader();
          fileReader.readAsDataURL(file);
          
          fileReader.onload = () => {
            resizeImage(fileReader.result)
            .then(result => resolve(result))
          };
    
          fileReader.onerror = (error) => {
            reject(error);
          };
        });
      };

    const onUrlUpdate = (curTable) => {
      Axios.post(`https://demo-project1-ms77.onrender.com/sitesupdate/`, {
        obj: {
          qrSvg: obj.qrSvg,
          short: obj.short,
          urlName: url,
        },
        curTable: curTable,
      })
      .then((res, err) => {
        if (err) console.log(err);
      })
      window.location.reload()
    }


    const onVCardUpdate = async (curTable) => {
      console.log(curTable)
      let convertedPhoto;
      if (photo) {
        convertedPhoto = await convToBase64(photo)
        Axios.post('https://demo-project1-ms77.onrender.com/vcardsupdate/', {
          obj: {
            qrSvg: obj.qrSvg,
            short: obj.short,
            firstName: firstName,
            lastName: lastName,
            title: title,
            email: email,
            address: rawAddress,
            website: contactUrl,
            phone: tel,
            notes: notes,
            photo: convertedPhoto
          },
          curTable: curTable
        })
        .then((res, err) => {
          if (err) console.log(err);
        })
        window.location.reload()
      }
      else {
        convertedPhoto = obj.photo
        Axios.post('https://demo-project1-ms77.onrender.com/vcardsupdate/', {
          obj: {
            qrSvg: obj.qrSvg,
            short: obj.short,
            firstName: !firstName ? obj.firstName : firstName,
            lastName: !lastName ? obj.lastName : lastName,
            title: !title ? obj.title : title,
            email: !email ? obj.email : email,
            address: !rawAddress ? obj.address : rawAddress,
            website: !contactUrl ? obj.website : contactUrl,
            phone: !tel ? obj.phone : tel,
            notes: !notes ? obj.notes : notes,
            photo: convertedPhoto
          },
          curTable: curTable
        })
        .then((res, err) => {
          if (err) console.log(err);
        })
        window.location.reload()
      }
    }

    if (loadingSites || loadingVCards) return <h1>Loading...</h1>
    return (  
        <div id="/users" className="users">
            {edit === true ? <EditQr obj={obj} edit={edit} curTable={curTable} closeEdit={closeEdit} selectUrlForm={selectUrlForm} 
            selectVCardForm={selectVCardForm} urlForm={urlForm} vCardForm={vCardForm} url={url} onUrlChange={onUrlChange} firstName={firstName} 
            firstNameChange={firstNameChange} lastName={lastName} lastNameChange={lastNameChange} title={title} titleChange={titleChange} 
            email={email} emailChange={emailChange} contactUrl={contactUrl} contactUrlChange={contactUrlChange} rawAddress={rawAddress} 
            rawAddressChange={rawAddressChange}  tel={tel} telChange={telChange} notes={notes} notesChange={notesChange} photo={photo}
            selectImg={selectImg} onUrlUpdate={onUrlUpdate} onVCardUpdate={onVCardUpdate}  /> : 
            <>
            { !sitesArr.length && !vCardsArr.length ?
            <h1>You have 0 QrCodes, <Link to="/" reloadDocument>Go back</Link> and download some</h1> :
            <div>
            <div className="fetchsites">
                <h2>Sites</h2>
                {
                  sitesArr.length ? 
                  <div className="sitecard">
                    {
                        sitesArr.map(site => <div className="fetchsite" key={site._id}>
                            <img src={`data:image/svg+xml;utf8,${encodeURIComponent(site.qrSvg.replace(`<?xml version="1.0" standalone="no"?>`, ""))}`} />
                            <p>{site.urlName}</p>
                            <button onClick={() => onEdit(site._id, "urls")} >Edit Qr</button>
                        </div>)
                    }
                </div> :
                <h3>No sites yet</h3>
                }
            </div>
            <hr />
            <div className="fetchvcards">
                <h2>V-Cards</h2>
                {
                  vCardsArr.length ? 
                  <div className="vcardscard">
                    {
                        vCardsArr.map(vCard => <div className="fetchvcard" key={vCard._id}>
                            <img src={`data:image/svg+xml;utf8,${encodeURIComponent(vCard.qrSvg.replace(`<?xml version="1.0" standalone="no"?>`, ""))}`} />
                            <p>{vCard.firstName + " " + vCard.lastName}</p>
                            <button onClick={() => onEdit(vCard._id, "vcards")} >Edit Qr</button>
                        </div>)
                    }
                  </div> :
                  <h3>No v-Cards yet</h3>
                }    
            </div>
            </div>
            }
        </> 
        }
        </div>
    )
}

export default Users;