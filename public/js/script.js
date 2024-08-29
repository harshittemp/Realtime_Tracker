const socket=io();
if(navigator.geolocation){
  navigator.geolocation.watchPosition((position)=>{
    const{latitude,longitude}=position.coords;
    socket.emit("send-location",{latitude,longitude}) // fornet end se ev evint emit kar raha hai
  },(error)=>{
    console.log(error);
  },{
    enableHighAccuracy:true,
    timeout:5000,
    maximumAge:0  // for no cheching storage
  });
}

const map=L.map("map").setView([0,0],10);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{
    attribution:"Agra"
}).addTo(map)

const markers={};
socket.on("recive-location",(data)=>{
  const{id,latitude,longitude}=data;
  map.setView([latitude,longitude],16);
  if(markers[id]){
    markers[id].setLatLng([latitude,longitude]);
}else{
    markers[id]=L.marker([latitude,longitude]).addTo(map);
  }
})
socket.on("user-disconnected",(id)=>{
  if(markers[i]){
   map.removeLayer(markers[id]);
   delete markers[id];
  }
});
