import { useEffect, useRef, useState } from "react";
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import "./App.css";
import Axios from "axios";
import QRCodeStyling from "qr-code-styling";
import Customize from "./components/Customize";
import Url from "./components/Url";
import Vcard from "./components/Vcard";
import Medium from "./components/Medium";
import Users from "./components/Users";


const qrCode = new QRCodeStyling({
  width: 300,
  height: 300,
  type: "svg",
  image:
    "",
  dotsOptions: {
    color: null,
    type: "rounded",
    gradient: {
        type: 'linear',
        rotation: 0,
        colorStops: [{ offset: 0, color: null }, { offset: 1, color: null }]
    }
  },
  imageOptions: {
    crossOrigin: "anonymous",
    imageSize: 0.4,
    hideBackgroundDots: true,
    margin: 0
  },
  backgroundOptions: {
    color: null,
    gradient: {
      type: 'linear', // 'radial'
        rotation: 0,
        colorStops: [{ offset: 0, color: null }, { offset: 1, color: null }]
    }
  },
  cornersSquareOptions: {
    color: null,
      type: 'square',
      gradient: {
        type: 'linear', // 'radial'
        rotation: 0,
        colorStops: [{ offset: 0, color: null }, { offset: 1, color: null }]
      }
  },
  cornersDotOptions: {
    color: null,
      type: 'dot',
      gradient: {
        type: 'linear', // 'radial'
        rotation: 180,
        colorStops: [{ offset: 0, color: null }, { offset: 1, color: null }]
      }
  },
  qrOptions: {
    typeNumber: 0,
    mode: 'Byte',
    errorCorrectionLevel: 'Q'
  }
});

export default function App() {
  //const urlParams = new URLSearchParams(window.location.search);
  //const userParam = urlParams.get('user');
  const qrParam = window.location.pathname.replace("/", "")
  const letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",
    "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"
  ]
  //const user = import.meta.env.VITE_REACT_APP_USER;
  const [shortUrl, setShortUrl] = useState("")
  const [width, setWidth] = useState(300)
  const [height, setHeight] = useState(300)
  const [margin, setMargin] = useState(0)
  const [url, setUrl] = useState("google.com");
  const [fileExt, setFileExt] = useState("svg");
  const [image, setImage] = useState(null)
  const [dotsStyle, setDotsStyle] = useState("square")
  const [dotsColor, setDotsColor] = useState("#000000")
  const [dotsGradient1, setDotsGradient1] = useState("#000000")
  const [dotsGradient2, setDotsGradient2] = useState("#000000")
  const [dotsColorType, setDotsColorType] = useState(true)
  const [dotsGradientType, setDotsGradientType] = useState("linear")
  const [dotsGradientRotation, setDotsGradientRotation] = useState(0)
  const [squaresStyle, setSquaresStyle] = useState("none")
  const [squaresColor, setSquaresColor] = useState("#000000")
  const [squaresGradient1, setSquaresGradient1] = useState("#000000")
  const [squaresGradient2, setSquaresGradient2] = useState("#000000")
  const [squaresColorType, setSquaresColorType] = useState(true)
  const [squaresGradientType, setSquaresGradientType] = useState("linear")
  const [squaresGradientRotation, setSquaresGradientRotation] = useState(0)
  const [cornersDotsStyle, setCornersDotsStyle] = useState("none")
  const [cornersDotsColor, setCornersDotsColor] = useState("#000000")
  const [cornersDotsGradient1, setCornersDotsGradient1] = useState("#000000")
  const [cornersDotsGradient2, setCornersDotsGradient2] = useState("#000000")
  const [cornersDotsColorType, setCornersDotsColorType] = useState(true)
  const [cornersDotsGradientType, setCornersDotsGradientType] = useState("linear")
  const [cornersDotsGradientRotation, setCornersDotsGradientRotation] = useState(0)
  const [backColor, setBackColor] = useState("#FFFFFF")
  const [backGradient1, setBackGradient1] = useState("#FFFFFF")
  const [backGradient2, setBackGradient2] = useState("#FFFFFF")
  const [backColorType, setBackColorType] = useState(true)
  const [backGradientType, setBackGradientType] = useState("linear")
  const [backGradientRotation, setBackGradientRotation] = useState(0)
  const [backgroundDots, setBackgroundDots] = useState(true)
  const [imgSize, setImgSize] = useState(0.4)
  const [imgMargin, setImgMargin] = useState(0)
  const [typeNum, setTypeNum] = useState(0)
  const [errorCorrectionLevel, setErrorCorrectionLevel] = useState('Q')
  //const [qrName, setQrName] = useState("test")
  const [customize, setCustomize] = useState(true)
  const [urls, setUrls] = useState(true)
  const [vCards, setVCards] = useState(false)
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [title, setTitle] = useState("")
  const [email, setEmail] = useState("")
  const [contactUrl, setContactUrl] = useState("")
  const [notes, setNotes] = useState("")
  const [photo, setPhoto] = useState(null)
  const [tel, setTel] = useState("")
  const [rawAddress, setRawAddress] = useState("")
  const [backRoute, setBackRoute] = useState("sites")
  let siteUrl = `http://localhost:5173/${shortUrl}`
  let vCardUrl = `http://localhost:5173/${shortUrl}`
  let ref = useRef(null);
  
  //vcards?id=${vCardId}&preview=${preview}
  //vcards?id=${previewId}&preview=${preview}
  //medium?next=${url}
  //console.log(siteUrl)

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
  
  useEffect(() => {
    setShortUrl(produceShortUrl())
  }, [])

  
  function produceShortUrl() {
    let shortUrl = ""
    for (let i = 0; i < 5; i++) {
      shortUrl += letters[Math.round(Math.random() * 51)]
    }
    return shortUrl
  }
  

  /*useEffect(() => {
    fetch('http://localhost:3001/vcardid')
    .then(res => res.json())
    .then(data => {
      let changeId = !data.length ? 1 : data[0].id + 1
      setVCardId(changeId)
    })
  }, [])*/

  /*useEffect(() => {
    fetch('http://localhost:3001/previewid')
    .then(res => res.json())
    .then(data => {
      let changeId = !data.length ? 1 : data[0].id + 1
      setPreviewId(changeId)
    })
  }, [])*/

  useEffect(() => {
    qrCode.append(ref.current);  
  }, []);

  useEffect(() => {
    qrCode.update({
      data: vCards === true ? vCardUrl : siteUrl,
      image: image,
      width: width,
      height: height,
      margin: margin,
      dotsOptions: {
        color: dotsColor,
        type: dotsStyle,
        gradient: dotsColorType === false ? {
          type: dotsGradientType,
          rotation: dotsGradientRotation,
          colorStops: [{ offset: 0, color: dotsGradient1 }, { offset: 1, color: dotsGradient2 }]
        }
        :
        undefined
      },
      cornersSquareOptions: {
        color: squaresColor,
        type: squaresStyle,
        gradient: squaresColorType === false ? {
          type: squaresGradientType,
          rotation: squaresGradientRotation,
          colorStops: [{ offset: 0, color: squaresGradient1 }, { offset: 1, color: squaresGradient2 }]
        }
        :
        undefined
      },
      cornersDotOptions: {
        color: cornersDotsColor,
        type: cornersDotsStyle,
        gradient: cornersDotsColorType === false ? {
          type: cornersDotsGradientType,
          rotation: cornersDotsGradientRotation,
          colorStops: [{ offset: 0, color: cornersDotsGradient1 }, { offset: 1, color: cornersDotsGradient2 }]
        }
        :
        undefined
      },
      backgroundOptions: {
        color: backColor,
        gradient: backColorType === false ? {
          type: backGradientType,
          rotation: backGradientRotation,
          colorStops: [{ offset: 0, color: backGradient1 }, { offset: 1, color: backGradient2 }]
        }
        :
        undefined
      },
      imageOptions: {
        crossOrigin: "anonymous",
        hideBackgroundDots: backgroundDots,
        imageSize: imgSize,
        margin: imgMargin
      },
      qrOptions: {
        typeNumber: typeNum,
        errorCorrectionLevel: errorCorrectionLevel
      }
    });
  }, [siteUrl, width, height, margin, image, dotsStyle, dotsColor, dotsGradient1, dotsGradient2, dotsColorType, dotsGradientType, dotsGradientRotation,
  squaresColor, squaresStyle, squaresColorType, squaresGradientType, squaresGradient1, squaresGradient2, squaresGradientRotation,
  cornersDotsColor, cornersDotsStyle, cornersDotsColorType, cornersDotsGradientType, cornersDotsGradient1, cornersDotsGradient2, cornersDotsGradientRotation,
  backColor, backColorType, backGradientType, backGradient1, backGradient2, backGradientRotation,
  backgroundDots, imgSize, imgMargin, typeNum, errorCorrectionLevel, vCardUrl, vCards]);

  const selectImg = async (e) => {
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

  

  const onCustomizeChange = () => {
    customize === false ? setCustomize(true) : setCustomize(false)
  };

  const onUrlsChange = () => {
    if (urls === false) {
      setUrls(true)
      setVCards(false)
      setMemberships(false)
      setBackRoute("sites")
    }
  }

  const onVCardsChange = () => {
    if (vCards === false) {
      setUrls(false)
      setVCards(true)
      setMemberships(false)
      setBackRoute("vcards")
    }
  }
  
  const onUrlChange = (event) => {
    event.preventDefault();
    setUrl(event.target.value);
  };

  /*const onSaveForPreview = async () => {

    let convertedPhoto;
    if (photo) {
      convertedPhoto = await convToBase64(photo)
    }

    //setCheckIfClicked(checkIfClicked + 1)
    Axios.post(`http://localhost:3001/previews/`, {
      short: shortUrl,
      firstName: firstName,
      lastName: lastName,
      title: title,
      email: email,
      address: rawAddress,
      tel: tel,
      contactUrl: contactUrl,
      notes: notes,
      vCardPhoto: convertedPhoto,
    })
    .then((res, err) => {
      if (err) console.log(err);
    });
  }*/

  const onFileChange = async (e) => {
    let img = e.target.files[0];
    let fileName = img.name
    let image = await convToBase64(img)
    fetch(image)
      .then(res => res.blob())
      .then(blob => {
        const file = new File([blob], fileName,{ type: "image/jpeg" })
        setImage(URL.createObjectURL(file))
      })
  }

  const onExtensionChange = (event) => {
    setFileExt(event.target.value);
  };

  const onDotsColorTypeChange = (e) => {
    if (e.target.value === "single")
    {
      setDotsColorType(true)
    }
    else
    {
      setDotsColorType(false)
    }
    
  }

  const onDotsGradientTypeChange = (e) => {
    setDotsGradientType(e.target.value)
  }

  const onDotsColorChange = (e) => {
    setDotsColor(e.target.value);
  };

  const onDotsGradient1Change = (e) => {
    setDotsGradient1(e.target.value);
  };

  const onDotsGradient2Change = (e) => {
    setDotsGradient2(e.target.value);
  };

  const onDotsGradientRotationChange = (e) => {
    setDotsGradientRotation(e.target.value)
  }

  const onDotsStyleChange = (e) => {
    setDotsStyle(e.target.value);
  };

  const onSquaresColorTypeChange = (e) => {
    if (e.target.value === "single")
    {
      setSquaresColorType(true)
    }
    else
    {
      setSquaresColorType(false)
    }
    
  }

  const onSquaresGradientTypeChange = (e) => {
    setSquaresGradientType(e.target.value)
  }

  const onSquaresColorChange = (e) => {
    setSquaresColor(e.target.value);
  };

  const onSquaresGradient1Change = (e) => {
    setSquaresGradient1(e.target.value);
  };

  const onSquaresGradient2Change = (e) => {
    setSquaresGradient2(e.target.value);
  };

  const onSquaresGradientRotationChange = (e) => {
    setSquaresGradientRotation(e.target.value)
  }

  const onSquaresStyleChange = (e) => {
    setSquaresStyle(e.target.value);
  };

  const onCornersDotsColorTypeChange = (e) => {
    if (e.target.value === "single")
    {
      setCornersDotsColorType(true)
    }
    else
    {
      setCornersDotsColorType(false)
    } 
  }

  const onCornersDotsGradientTypeChange = (e) => {
    setCornersDotsGradientType(e.target.value)
  }

  const onCornersDotsColorChange = (e) => {
    setCornersDotsColor(e.target.value);
  };

  const onCornersDotsGradient1Change = (e) => {
    setCornersDotsGradient1(e.target.value);
  };

  const onCornersDotsGradient2Change = (e) => {
    setCornersDotsGradient2(e.target.value);
  };

  const onCornersDotsGradientRotationChange = (e) => {
    setCornersDotsGradientRotation(e.target.value)
  }

  const onBackColorTypeChange = (e) => {
    if (e.target.value === "single")
    {
      setBackColorType(true)
    }
    else
    {
      setBackColorType(false)
    }
    
  }

  const onBackGradientTypeChange = (e) => {
    setBackGradientType(e.target.value)
  }

  const onBackColorChange = (e) => {
    setBackColor(e.target.value);
  };

  const onBackGradient1Change = (e) => {
    setBackGradient1(e.target.value);
  };

  const onBackGradient2Change = (e) => {
    setBackGradient2(e.target.value);
  };

  const onBackGradientRotationChange = (e) => {
    setBackGradientRotation(e.target.value)
  }

  const onCornersDotsStyleChange = (e) => {
    setCornersDotsStyle(e.target.value);
  };

  const onHideBackgroundDots = () => {
    backgroundDots === true ? setBackgroundDots(false) : setBackgroundDots(true)
  }

  const onImgSizeChange = (e) => {
    let size = e.target.value;
    if (size > 1) size=1;
    if (size < 0) size=0;
    setImgSize(size);
  };

  const onImgMarginChange = (e) => {
    setImgMargin(e.target.value);
  };

  const onWidthChange = (e) => {
    setWidth(e.target.value)
  }

  const onHeightChange = (e) => {
    setHeight(e.target.value)
  }

  const onMarginChange = (e) => {
    setMargin(e.target.value)
  }

  const onTypeNumberChange = (e) => {
    let type = e.target.value
    if (type > 20) type=20
    if (type < 0) type=0
    setTypeNum(type)
    
  }

  const onErrorCorrectionLevelChange = (e) => {
    setErrorCorrectionLevel(e.target.value)
  }



  const onDownloadClick = async () => {
    //const headers = { 'Content-Type': 'application/json' };
      /*Axios({
        method: 'post',
        url: 'http://localhost:3001/sites/',
        headers: {'Content-Type' : 'application/json'},
        body: {photo, qrText}
    })*/
    
    let qrText = qrCode.getRawData('svg');
    let convertedPhoto;
    if (photo) {
      convertedPhoto = await convToBase64(photo)
    }

    async function waitData() {
      let qrBlob = await qrText.then(value => value.text().then(value => value));
      
      if (backRoute === "sites") {
        Axios.post(`https://demo-project1-9big.onrender.com/${backRoute}/`, {
          qrSvg: qrBlob,
          short: shortUrl,
          urlName: url
        })
        .then((res, err) => {
          if (err) console.log(err);
        });

        qrCode.download({
          extension: fileExt
        });

        setShortUrl(produceShortUrl)
      }
      
      else if (backRoute === "vcards") {
        Axios.post(`https://demo-project1-9big.onrender.com/${backRoute}/`, {
          qrSvg: qrBlob,
          short: shortUrl,
          firstName: firstName,
          lastName: lastName,
          title: title,
          email: email,
          address: rawAddress,
          phone: tel,
          website: contactUrl,
          notes: notes,
          photo: convertedPhoto,
        })
        .then((res, err) => {
          if (err) console.log(err);
        });

        qrCode.download({
          extension: fileExt
        });

        setShortUrl(produceShortUrl())
      } 
    }
    
    waitData()
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/*" element={ 
            <div className="App">
              <div className="allqr"> 
                <div className="qr" style={{ overflow: "auto"}} ref={ref} />
                <div className="download">
                  <select onChange={onExtensionChange} value={fileExt}>
                    <option value="svg">SVG</option>
                  </select>
                  <button onClick={onDownloadClick}>Download</button>
                </div>
                <button><Link to='/users' reloadDocument>Log in as Admin</Link></button>
              </div>
              
              <div className="categories">
                <div className="categoryBtns">
                  <button onClick={ onUrlsChange }>Urls</button>
                  <button onClick={ onVCardsChange }>V-Cards</button>
                </div>
                <div className="category">
                  { urls === true ? <Url url={url} siteUrl={siteUrl} onUrlChange={onUrlChange} /> : 
                  <Vcard vCardUrl={vCardUrl} firstName={firstName} firstNameChange={firstNameChange} 
                  lastName={lastName} lastNameChange={lastNameChange} title={title} titleChange={titleChange} email={email} emailChange={emailChange} 
                  contactUrl={contactUrl} contactUrlChange={contactUrlChange} tel={tel} telChange={telChange} rawAddress={rawAddress}
                  rawAddressChange={rawAddressChange} notes={notes} notesChange={notesChange} selectImg={selectImg} 
                  /> }
                </div>
                <div className="customize">
                  <button onClick={onCustomizeChange}>Customize QR</button>
                  { customize && <Customize url={ url } onUrlChange={ onUrlChange } onFileChange={ onFileChange } width={ width } onWidthChange={ onWidthChange }
                  height={ height } onHeightChange={ onHeightChange } margin={ margin } onMarginChange={ onMarginChange }
                  onDotsStyleChange={ onDotsStyleChange } dotsColor={ dotsColor } dotsColorType={ dotsColorType } onDotsColorTypeChange={ onDotsColorTypeChange }
                  onDotsColorChange={onDotsColorChange} dotsGradientType={ dotsGradientType } onDotsGradientTypeChange={ onDotsGradientTypeChange }
                  dotsGradient1={ dotsGradient1 } onDotsGradient1Change={ onDotsGradient1Change } dotsGradient2={ dotsGradient2 }
                  onDotsGradient2Change={ onDotsGradient2Change } dotsGradientRotation={ dotsGradientRotation } 
                  onDotsGradientRotationChange={ onDotsGradientRotationChange } onSquaresStyleChange={ onSquaresStyleChange } 
                  squaresColorType={ squaresColorType } onSquaresColorTypeChange={ onSquaresColorTypeChange } onSquaresColorChange={ onSquaresColorChange } 
                  squaresGradientType={ squaresGradientType } onSquaresGradientTypeChange={ onSquaresGradientTypeChange } 
                  squaresGradient1={ squaresGradient1 } onSquaresGradient1Change={ onSquaresGradient1Change } squaresGradient2={ squaresGradient2 } 
                  onSquaresGradient2Change={ onSquaresGradient2Change } squaresGradientRotation={ squaresGradientRotation } 
                  onSquaresGradientRotationChange={ onSquaresGradientRotationChange } onCornersDotsStyleChange={ onCornersDotsStyleChange } 
                  cornersDotsColor={ cornersDotsColor } cornersDotsColorType={ cornersDotsColorType } onCornersDotsColorTypeChange={ onCornersDotsColorTypeChange } 
                  onCornersDotsColorChange={ onCornersDotsColorChange } cornersDotsGradientType={ cornersDotsGradientType } 
                  onCornersDotsGradientTypeChange={ onCornersDotsGradientTypeChange } cornersDotsGradient1={ cornersDotsGradient1 } 
                  onCornersDotsGradient1Change={ onCornersDotsGradient1Change } cornersDotsGradient2={ cornersDotsGradient2 } 
                  onCornersDotsGradient2Change={ onCornersDotsGradient2Change } cornersDotsGradientRotation={ cornersDotsGradientRotation } 
                  onCornersDotsGradientRotationChange={ onCornersDotsGradientRotationChange } backColor={ backColor } backColorType={ backColorType } 
                  onBackColorTypeChange={ onBackColorTypeChange } onBackColorChange={ onBackColorChange } backGradientType={ backGradientType } 
                  onBackGradientTypeChange={ onBackGradientTypeChange } backGradient1={ backGradient1 } onBackGradient1Change={ onBackGradient1Change } 
                  backGradient2= { backGradient2 } onBackGradient2Change={ onBackGradient2Change } backGradientRotation={ backGradientRotation } 
                  onBackGradientRotationChange={ onBackGradientRotationChange } backgroundDots={ backgroundDots } onHideBackgroundDots={ onHideBackgroundDots } 
                  imgSize={ imgSize } onImgSizeChange={ onImgSizeChange } imgMargin={ imgMargin } onImgMarginChange={ onImgMarginChange } 
                  typeNumber={typeNum} onTypeNumberChange={onTypeNumberChange} errorCorrectionLevel={errorCorrectionLevel} 
                  onErrorCorrectionLevelChange={onErrorCorrectionLevelChange} /> }
                </div>
              </div>
            </div>
           } />
          <Route exact path="/users" element={ <Users url={url} onUrlChange={onUrlChange} firstName={firstName} 
            firstNameChange={firstNameChange} lastName={lastName} lastNameChange={lastNameChange} title={title} titleChange={titleChange} 
            email={email} emailChange={emailChange} contactUrl={contactUrl} contactUrlChange={contactUrlChange} rawAddress={rawAddress} 
            rawAddressChange={rawAddressChange}  tel={tel} telChange={telChange} notes={notes} notesChange={notesChange} photo={photo}
            selectImg={selectImg} /> } />
          { qrParam && <Route exact path={qrParam} element={<Medium qrParam={qrParam} />} /> }
      </Routes>
    </BrowserRouter>
    
  );
}
/*<Route exact path=":short" element={<VcardUi firstName={firstName} lastName={lastName} title={title} email={email} 
          addressChange={addressChange} tel={tel} notes={notes} contactUrl={contactUrl} photo={photo} fileName={fileName} 
          fileNameChange={fileNameChange} downloadVcard={downloadVcard} />} /> */