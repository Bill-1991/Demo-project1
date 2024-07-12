/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import Axios from "axios";
import EditQr from "./EditQr";
import './Users.css';


const Users = () => {
    const [loadingSites, setLoadingSites] = useState(true)
    const [loadingVCards, setLoadingVCards] = useState(true)
    const [loadingMemberships, setLoadingMemberships] = useState(true)
    const [sitesArr, setSitesArr] = useState([])
    const [vCardsArr, setVCardsArr] = useState([])
    const [membershipsArr, setMembershipsArr] = useState([])
    const [edit, setEdit] = useState(false)
    const [obj, setObj] = useState({})
    const [curTable, setCurTable] = useState("")
    const [urlForm, setUrlForm] = useState(null)
    const [vCardForm, setVCardForm] = useState(null)
    const [membershipForm, setMembershipForm] = useState(null)
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
    const [name, setName] = useState("")
    const [expires, setExpires] = useState("");
    

    useEffect(() => {
        fetch('https://dynamic-styled-qrcode-generator.onrender.com/fetchedsites')
        .then(res => res.json())
        .then(data => {
          setSitesArr(data)
          setLoadingSites(false)
        })
    }, [])
    
    useEffect(() => {
        fetch('https://dynamic-styled-qrcode-generator.onrender.com/fetchedvcards')
        .then(res => res.json())
        .then(data => {
          setVCardsArr(data)
          setLoadingVCards(false)
        })
    }, [])

    useEffect(() => {
      fetch('https://dynamic-styled-qrcode-generator.onrender.com/fetchedmemberships')
      .then(res => res.json())
      .then(data => {
        setMembershipsArr(data)
        setLoadingMemberships(false)
      })
  }, [])


    const onEdit = (id, table) => {
        setEdit(true)
        let object;
        if (table === "urls") {
            object = sitesArr.filter(name => name._id === id)[0]
            setUrlForm(true)
            setVCardForm(false)
            setMembershipForm(false)
        } else if (table === "vcards") {
            object = vCardsArr.filter(name => name._id === id)[0]
            setUrlForm(false)
            setVCardForm(true)
            setMembershipForm(false)
        } else if (table === "memberships") {
          object = membershipsArr.filter(name => name._id === id)[0]
          setUrlForm(false)
          setVCardForm(false)
          setMembershipForm(true)
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
        setMembershipForm(false)
    }

    const selectVCardForm = () => {
        setVCardForm(true)
        setUrlForm(false)
        setMembershipForm(false)
    }

    const selectMembershipForm = () => {
      setMembershipForm(true)
      setVCardForm(false)
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

      const onNameChange = (e) => {
        setName(e.target.value)
      }

      const onExpiresChange = (e) => {
        setExpires(e.target.value)
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

    const onUrlUpdate = async (curTable) => {
      await Axios.post(`https://dynamic-styled-qrcode-generator.onrender.com/sitesupdate/`, {
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

    const onMembershipUpdate = async (curTable) => {
      await Axios.post(`https://dynamic-styled-qrcode-generator.onrender.com/membershipsupdate/`, {
        obj: {
          qrSvg: obj.qrSvg,
          short: obj.short,
          name: name,
          expires_at: expires
        },
        curTable: curTable,
      })
      .then((res, err) => {
        if (err) console.log(err);
      })
      window.location.reload()
    }

    const onVCardUpdate = async (curTable) => {
      let convertedPhoto;
      if (photo) {
        convertedPhoto = await convToBase64(photo)
        await Axios.post('https://dynamic-styled-qrcode-generator.onrender.com/vcardsupdate/', {
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
        await Axios.post('https://dynamic-styled-qrcode-generator.onrender.com/vcardsupdate/', {
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
      }
    }

    if (loadingSites || loadingVCards || loadingMemberships) return <h1>Loading...</h1>
    return (  
        <div id="/users" className="users">
            {edit === true ? <EditQr obj={obj} edit={edit} curTable={curTable} closeEdit={closeEdit} selectUrlForm={selectUrlForm} 
            selectVCardForm={selectVCardForm} urlForm={urlForm} vCardForm={vCardForm} url={url} onUrlChange={onUrlChange} firstName={firstName} 
            firstNameChange={firstNameChange} lastName={lastName} lastNameChange={lastNameChange} title={title} titleChange={titleChange} 
            email={email} emailChange={emailChange} contactUrl={contactUrl} contactUrlChange={contactUrlChange} rawAddress={rawAddress} 
            rawAddressChange={rawAddressChange}  tel={tel} telChange={telChange} notes={notes} notesChange={notesChange} photo={photo}
            selectImg={selectImg} onUrlUpdate={onUrlUpdate} onVCardUpdate={onVCardUpdate} onMembershipUpdate={onMembershipUpdate} 
            selectMembershipForm={selectMembershipForm} membershipForm={membershipForm} onNameChange={onNameChange} 
            onExpiresChange={onExpiresChange} name={name} expires={expires} /> : 
            <>
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
            <hr />
            <div className="fetchmemberships">
                <h2>Membership Cards</h2>
                {
                  membershipsArr.length ? 
                  <div className="membershipscard">
                    {
                        membershipsArr.map(membership => <div className="fetchmembership" key={membership._id}>
                            <img src={`data:image/svg+xml;utf8,${encodeURIComponent(membership.qrSvg.replace(`<?xml version="1.0" standalone="no"?>`, ""))}`} />
                            <p>{membership.name}</p>
                            <button onClick={() => onEdit(membership._id, "memberships")} >Edit Qr</button>
                        </div>)
                    }
                  </div> :
                  <h3>No Mmeberships yet</h3>
                }    
            </div>
        </> 
        }
        </div>
    )
}

export default Users;