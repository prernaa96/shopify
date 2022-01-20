import React from 'react';

function App() {

  const [imgPanels, setImgPanels] = React.useState([]);
  
  var res;
  const usingSplit = localStorage.getItem('checkedState');
  if (!usingSplit){
    res=[]
  }else{
    const aa = localStorage.getItem('checkedState').split(',');  
    res = aa.map(j=>JSON.parse(j))
  }

  const [checkedState, setCheckedState] = React.useState(res);

  const handleOnChange = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );
    setCheckedState(updatedCheckedState);
    localStorage.setItem('checkedState', updatedCheckedState);
  };
  
  
  async function getData (props){
    const url = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=2015-6-3&api_key=8OMH0IHVmTDx45kis7av3rdUXoofUlL9i21jP9Av"
    const response = await fetch(url);
    const result = await response.json();

    var imgPanels=[]
   
    for (var i=0; i< result.photos.length; i++){
      imgPanels.push({
        earth_date:result.photos[i].earth_date,
        name:result.photos[i].rover.name,
        status: result.photos[i].rover.status,
        img: result.photos[i].img_src,
        camera:result.photos[i].camera.full_name,
        id : i
      })
    }

  setImgPanels(imgPanels)
  }

  React.useEffect(()=>{
    getData();
  },[])

    return (
        <div style={mainStyle}>
          <p style={TitleStyle}>Spacestagram</p>
          <p style={DescStyle}>Brought to you by NASA's Image Library</p>
          <div>
            {imgPanels.map(function(d, id){
            return (<p key={id}> 
          
            <img src={d.img} style={imgStyle} alt="rover images"></img>
         
            <p style={boxStyle}> 
            <h3>{d.name} Rover - {d.camera}</h3>
            
            <div style={{whiteSpace: "pre-wrap"}}>{d.earth_date} </div>
            
            <div style={{whiteSpace: "pre-wrap"}}>Status - {d.status} </div>
        
            <br></br><div style={{whiteSpace: "pre-wrap"}}><a href={d.img}>Shareable URL </a></div>
            <div>
            
            <input
                type="button"
                id={id}
                name={checkedState[id] ? 'Dislike' : 'Like'}
                value={checkedState[id] ? "Dislike" : "Like"}
                checked={checkedState[id]}
                class="like-btn"
                onClick={() => handleOnChange(id)}
                style={buttonStyle}
              ></input>
            </div>
            </p>
          </p>)
          })}
          </div>
        </div>
    );
  
}

// CSS Styling

const mainStyle={
  backgroundColor: "lightgrey" , 
  marginTop: -100, 
  borderWidth: 2, 
  borderColor: "white"
}
const TitleStyle={fontWeight:400, 
  fontSize: 80 ,
  fontFamily: 'Roboto Slab', 
  fontStretch: "50%", 
  marginTop: "7%", 
  marginLeft: "1%"
}
const DescStyle = {fontWeight:200, fontSize: 25, marginTop: -70, marginBottom: 70, marginLeft: 10}
const imgStyle = {borderRadius : 6,  display: "block", width: "80%", height: 800, marginLeft: "9.5%"}
const boxStyle = {backgroundColor: "white", marginTop: -1, width: "auto" , marginLeft: "9.5%", marginRight: "10.3%", padding: 59, borderRadius: 9, lineHeight: 2}
const buttonStyle = {backgroundColor: "whitesmoke", color:"Black", border: "groove",  paddingLeft: 38, paddingRight: 38, padding: 20, fontSize: 20, display: "flex",marginTop: "3%"}


export default App; 


