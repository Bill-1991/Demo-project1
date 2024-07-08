/* eslint-disable react/prop-types */
import Axios from "axios";
import FileSaver from 'file-saver';
import { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import VcardUi from "./VcardUi";

export default function Medium() {
        const path = useLocation()
        const [object, setObject] = useState([])
        const [fileName, setFileName] = useState("")
        const [sitesLoading, setSitesLoading] = useState(true)
        const [vCardsLoading, setVCardsLoading] = useState(true)
        const [previewLoading, setPreviewLoading] = useState(true)

        function addressChange(address) {
            if(!address) return ""
            const splitRawAddress = address.split(",")
            const newAddress = `${splitRawAddress[0]} ${splitRawAddress[1]} ${splitRawAddress[2]} ${splitRawAddress[3]}`
            return newAddress
        }

        const fileNameChange = (e) => {
            setFileName(e.target.value)
        }

        const downloadVcard = async (card) => {
            console.log(card)
            let convertedPhoto = card.vCardPhoto.replace(`data:image/${"jpeg" || "png"};base64,`, "");
            let splitRawAddress;
            if (card.address) {
              splitRawAddress = card.address.split(" ")
            } else {
              splitRawAddress = ""
            }
            
            let file = new Blob(
              [
                `BEGIN:VCARD\nVERSION:4.0\nN:${card.firstName};${card.lastName};;\nFN:${card.lastName} ${card.firstName}\nTITLE:${card.title}\nADR;TYPE=home:;;${splitRawAddress[0]};${splitRawAddress[1]};;${splitRawAddress[2]};${splitRawAddress[3]}\nEMAIL:${card.email}\nTEL:${card.tel}\nURL:${card.contactUrl}\nNOTE:${card.notes}\nPHOTO;ENCODING=BASE64;TYPE=JPEG:${convertedPhoto}\nEND:VCARD`
              ],
              { type: "text/vcard;charset=utf-8" }
            );
            FileSaver.saveAs(file, `${fileName}.vcf`);
          }

        useEffect(() => {
            fetch('http://localhost:3001/fetchedsites')
            .then(res => res.json())
            .then(data => {
                if (data.length) {
                    let obj = data.filter(site => site.short === path.pathname.replace("/", ""))
                    let table = ""
                    if (obj.length) {
                        setObject(obj)
                        table = "urls";
                        let redir = obj[0].urlName
                        Axios.post('http://localhost:3001/medium', {
                            name: obj[0].short,
                            table: table
                        })
                        .then((res, err) => {
                            if (err) return err;
                        })
                        .finally(() => {
                            setSitesLoading(false)
                            window.location.replace(`https://${redir}`)
                        });
                    }
                }
            })
          }, [path.pathname])
        
          useEffect(() => {
            fetch('http://localhost:3001/fetchedvcards')
            .then(res => res.json())
            .then(data => {
                if (data.length) {
                    let obj = data.filter(vcard => vcard.short === path.pathname.replace("/", ""))
                    let table = "vcards"
                    if (obj.length) {
                        setObject(obj)
                        table = "vcards";
                        Axios.post('http://localhost:3001/medium', {
                            name: obj[0].short,
                            table: table
                        })
                        .then((res, err) => {
                            if (err) return err;
                        })
                        .finally(() => {
                            setVCardsLoading(false)
                        });
                    }
                }
            })
          }, [path.pathname])
        
          useEffect(() => {
            fetch('http://localhost:3001/fetchedpreviews')
            .then(res => res.json())
            .then(data => {
                if (data.length) {
                    let obj = data.filter(site => site.short === path.pathname.replace("/", ""))
                    let table = "previews"
                    if (obj.length) {
                        addressChange(obj[0].address)
                        setObject(obj)
                        table = "previews";
                        Axios.post('http://localhost:3001/medium', {
                            name: obj[0].short,
                            table: table
                        })
                        .then((res, err) => {
                            if (err) return err;
                        })
                        .finally(() => {
                            setPreviewLoading(false)
                        });
                    }
                }
            })
          }, [path.pathname])

    //const [params]  = useSearchParams()
    //const name = "https://" + params.get("next")

    
    return (
        sitesLoading || vCardsLoading || previewLoading ? <h1>Loading...</h1> :
        <VcardUi curVCard={object[0]} firstName={object[0].firstName} lastName={object[0].lastName} title={object[0].title} email={object[0].email} 
        addressChange={addressChange} tel={object[0].tel} address={object[0].address} notes={object[0].notes} contactUrl={object[0].contactUrl} photo={object[0].vCardPhoto} 
        fileName={fileName} fileNameChange={fileNameChange} downloadVcard={downloadVcard} />
    )
}

/*Axios.post('http://localhost:3001/medium', {
    name: dataSite[0].urlName
})
.then((res, err) => {
    if (err) return err;
    
})
.finally(() => {
    window.location.replace(`https://${dataSite[0].urlName}`)
});*/

/*<VcardUi firstName={firstName} lastName={lastName} title={title} email={email} 
          addressChange={addressChange} tel={tel} notes={notes} contactUrl={contactUrl} photo={photo} fileName={fileName} 
          fileNameChange={fileNameChange} downloadVcard={downloadVcard} />*/