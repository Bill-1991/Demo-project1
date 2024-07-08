/* eslint-disable react/prop-types */
import './Customize.css';


const Customize = ( { onFileChange, width, onWidthChange, height, onHeightChange, margin, onMarginChange, onDotsStyleChange,
    dotsColor, dotsColorType, onDotsColorTypeChange, onDotsColorChange, dotsGradientType, onDotsGradientTypeChange, dotsGradient1, onDotsGradient1Change, 
    dotsGradient2, onDotsGradient2Change, dotsGradientRotation, onDotsGradientRotationChange, onSquaresStyleChange, squaresColor, squaresColorType, 
    onSquaresColorTypeChange, onSquaresColorChange, squaresGradientType, onSquaresGradientTypeChange, squaresGradient1, onSquaresGradient1Change, 
    squaresGradient2, onSquaresGradient2Change, squaresGradientRotation, onSquaresGradientRotationChange, onCornersDotsStyleChange, cornersDotsColor,
    cornersDotsColorType, onCornersDotsColorTypeChange, onCornersDotsColorChange, cornersDotsGradientType, onCornersDotsGradientTypeChange,
    cornersDotsGradient1, onCornersDotsGradient1Change, cornersDotsGradient2, onCornersDotsGradient2Change, cornersDotsGradientRotation, 
    onCornersDotsGradientRotationChange, backColor, backColorType, onBackColorTypeChange, onBackColorChange, backGradientType, onBackGradientTypeChange, 
    backGradient1, onBackGradient1Change, backGradient2, onBackGradient2Change, backGradientRotation, onBackGradientRotationChange, 
    backgroundDots, onHideBackgroundDots, imgSize, onImgSizeChange, imgMargin, onImgMarginChange, typeNumber, onTypeNumberChange,
    errorCorrectionLevel, onErrorCorrectionLevelChange

 } ) => {
    return <div className="options">
    <div>
      <p>Main Options</p>
      <div className="main">
        <div>
          <p>Image</p>
          <input type="file" style={{alignSelf: "flex-end"}} onChange={onFileChange} />
        </div>
        <div>
          <p>Width</p>
          <input type="number" value={width} onChange={onWidthChange} />
        </div>
        <div>
          <p>Height</p>
          <input type="number" value={height} onChange={onHeightChange} />
        </div>
        <div>
          <p>Margin</p>
          <input type="number" value={margin} onChange={onMarginChange} />
        </div>   
      </div>
    </div>
    <div className="dots">
      <p>Dots Options</p>
      <div className="dots-options">
        <p>Dot style</p>
        <select onChange={onDotsStyleChange}>
          <option value="square">Square</option>
          <option value="dots">Dots</option>
          <option value="rounded">Rounded</option>
          <option value="extra-rounded">Extra rounded</option>
          <option value="classy">Classy</option>
          <option value="classy-rounded">Classy rounded</option>
        </select>
      </div>
      <div className="dotsColorType">
        <p>Color type: </p>
        <div className="colorTypeInputs">
          <div>
            <input type="checkbox" onChange={onDotsColorTypeChange} value="single" checked={dotsColorType === true ? "checked" : ""}/> 
            <p>Single color</p>
          </div>
          <div>
            <input type="checkbox" onChange={onDotsColorTypeChange} value="gradient" checked={dotsColorType === false ? "checked" : ""}/>
            <p>Gradient</p>
          </div>
        </div>
      </div>
      {
        dotsColorType === true ?
          <div className="dots-color">
            <p>Dots color</p>
            <input type="color" onChange={onDotsColorChange} value={"#000000" || dotsColor}/>
          </div>
          :
          <div className="dotsGradient">
            <div className="dotsGradientType">
              <p>Gradient type: </p>
              <div>
                <input type="checkbox" value="linear" onChange={onDotsGradientTypeChange} checked={dotsGradientType === "linear" ? "checked" : ""}/>
                <p>Linear</p>
              </div>
              <div>
                <input type="checkbox" value="radial" onChange={onDotsGradientTypeChange} checked={dotsGradientType === "radial" ? "checked" : ""}/>
                <p>Radial</p>
              </div>
            </div>
            <div className="dotsGradientColors">
              <p>Color gradient: </p>
              <div>
                <input type="color" onChange={onDotsGradient1Change} value={"#000000" || dotsGradient1} />
                <p>Offset 1</p>
              </div>
              <div>
                <input type="color" onChange={onDotsGradient2Change} value={"#000000" || dotsGradient2} />
                <p>Offset 2</p>
              </div>
            </div>
            <div className="dotsGradientRotation">
              <p>Rotation</p>
              <input type="number" onChange={onDotsGradientRotationChange} value={dotsGradientRotation} />
            </div>
          </div>
      }
    </div>
    <div className="squares">
      <p>Squares Options</p>
      <div className="squares-options">
        <p>Square style</p>
        <select onChange={onSquaresStyleChange}>
        <option value="none">None</option>
          <option value="square">Square</option>
          <option value="dot">Dots</option>
          <option value="extra-rounded">Extra rounded</option>
        </select>
      </div>
      <div className="squaresColorType">
        <p>Color type: </p>
        <div className="colorTypeInputs">
          <div>
            <input type="checkbox" onChange={onSquaresColorTypeChange} value="single" checked={squaresColorType === true ? "checked" : ""}/> 
            <p>Single color</p>
          </div>
          <div>
            <input type="checkbox" onChange={onSquaresColorTypeChange} value="gradient" checked={squaresColorType === false ? "checked" : ""}/>
            <p>Gradient</p>
          </div>
        </div>
      </div>
      {
        squaresColorType === true ?
          <div className="squares-color">
            <p>Squares color</p>
            <input type="color" onChange={onSquaresColorChange} value={"#000000" || squaresColor}/>
          </div>
          :
          <div className="squaresGradient">
            <div className="squaresGradientType">
              <p>Gradient type: </p>
              <div>
                <input type="checkbox" value="linear" onChange={onSquaresGradientTypeChange} checked={squaresGradientType === "linear" ? "checked" : ""}/>
                <p>Linear</p>
              </div>
              <div>
                <input type="checkbox" value="radial" onChange={onSquaresGradientTypeChange} checked={squaresGradientType === "radial" ? "checked" : ""}/>
                <p>Radial</p>
              </div>
            </div>
            <div className="squaresGradientColors">
              <p>Color gradient: </p>
              <div>
                <input type="color" onChange={onSquaresGradient1Change} value={squaresGradient1} />
                <p>Offset 1</p>
              </div>
              <div>
                <input type="color" onChange={onSquaresGradient2Change} value={squaresGradient2} />
                <p>Offset 2</p>
              </div>
            </div>
            <div className="squaresGradientRotation">
              <p>Rotation</p>
              <input type="number" onChange={onSquaresGradientRotationChange} value={squaresGradientRotation} />
            </div>
          </div>
        }
      </div>
      <div className="cornersDots">
        <p>Corners Dots Options</p>
        <div className="cornersDots-options">
          <p>Corners Dot Style</p>
          <select onChange={onCornersDotsStyleChange}>
            <option value="none">None</option>
            <option value="square">Square</option>
            <option value="dot">Dots</option>
          </select>
        </div>
        <div className="cornersDotsColorType">
          <p>Color type: </p>
          <div className="colorTypeInputs">
            <div>
              <input type="checkbox" onChange={onCornersDotsColorTypeChange} value="single" checked={cornersDotsColorType === true ? "checked" : ""}/> 
              <p>Single color</p>
            </div>
            <div>
            <input type="checkbox" onChange={onCornersDotsColorTypeChange} value="gradient" checked={cornersDotsColorType === false ? "checked" : ""}/>
            <p>Gradient</p>
          </div>
        </div>
      </div>
      {
        cornersDotsColorType === true ?
          <div className="cornersDots-color">
            <p>Corners Dots color</p>
            <input type="color" onChange={onCornersDotsColorChange} value={cornersDotsColor}/>
          </div>
          :
          <div className="cornersDotsGradient">
            <div className="cornersDotsGradientType">
              <p>Gradient type: </p>
              <div>
                <input type="checkbox" value="linear" onChange={onCornersDotsGradientTypeChange} checked={cornersDotsGradientType === "linear" ? "checked" : ""}/>
                <p>Linear</p>
              </div>
              <div>
                <input type="checkbox" value="radial" onChange={onCornersDotsGradientTypeChange} checked={cornersDotsGradientType === "radial" ? "checked" : ""}/>
                <p>Radial</p>
              </div>
            </div>
            <div className="cornersDotsGradientColors">
              <p>Color gradient: </p>
              <div>
                <input type="color" onChange={onCornersDotsGradient1Change} value={cornersDotsGradient1} />
                <p>Offset 1</p>
              </div>
              <div>
                <input type="color" onChange={onCornersDotsGradient2Change} value={cornersDotsGradient2} />
                <p>Offset 2</p>
              </div>
            </div>
            <div className="cornersDotsGradientRotation">
              <p>Rotation</p>
              <input type="number" onChange={onCornersDotsGradientRotationChange} value={cornersDotsGradientRotation} />
            </div>
          </div>
        }
      </div>
      <div className="back">
        <p>Background Options</p>
        <div className="backColorType">
          <p>Background Color type: </p>
          <div className="colorTypeInputs">
            <div>
              <input type="checkbox" onChange={onBackColorTypeChange} value="single" checked={backColorType === true ? "checked" : ""}/> 
              <p>Single color</p>
            </div>
            <div>
              <input type="checkbox" onChange={onBackColorTypeChange} value="gradient" checked={backColorType === false ? "checked" : ""}/>
              <p>Gradient</p>
            </div>
          </div>
        </div>
        {
        backColorType === true ?
          <div className="back-color">
            <p>Corners Dots color</p>
            <input type="color" onChange={onBackColorChange} value={backColor}/>
          </div>
          :
          <div className="backGradient">
            <div className="backGradientType">
              <p>Gradient type: </p>
              <div>
                <input type="checkbox" value="linear" onChange={onBackGradientTypeChange} checked={backGradientType === "linear" ? "checked" : ""}/>
                <p>Linear</p>
              </div>
              <div>
                <input type="checkbox" value="radial" onChange={onBackGradientTypeChange} checked={backGradientType === "radial" ? "checked" : ""}/>
                <p>Radial</p>
              </div>
            </div>
            <div className="backGradientColors">
              <p>Color gradient: </p>
              <div>
                <input type="color" onChange={onBackGradient1Change} value={backGradient1} />
                <p>Offset 1</p>
              </div>
              <div>
                <input type="color" onChange={onBackGradient2Change} value={backGradient2} />
                <p>Offset 2</p>
              </div>
            </div>
            <div className="backGradientRotation">
              <p>Rotation</p>
              <input type="number" onChange={onBackGradientRotationChange} value={backGradientRotation} />
            </div>
          </div>
        }
      </div>
      <div className="imgOptions">
        <p>Image Options</p>
        <div>
          <p>Hide Background Dots</p>
          <input type="checkbox" onChange={onHideBackgroundDots} value={backgroundDots} checked={backgroundDots === true ? "checked" : ""} />
        </div>
        <div>
          <p>Image Size</p>
          <input type="number" onChange={onImgSizeChange} value={imgSize} step="0.1" />
        </div>
        <div>
          <p>Margin</p>
          <input type="number" onChange={onImgMarginChange} value={imgMargin} />
        </div>
      </div>
      <div className='qrOptions'>
        <p>QR Options</p>
        <div>
          <p>Type Number: </p>
          <input type="number" value={typeNumber} onChange={onTypeNumberChange} />
        </div>
        <div>
          <p>Error correction level: </p>
          <select value={errorCorrectionLevel} onChange={onErrorCorrectionLevelChange}>
            <option value="L">L</option>
            <option value="M">M</option>
            <option value="Q">Q</option>
            <option value="H">H</option>
          </select>
        </div>
      </div>
    </div>
}

export default Customize