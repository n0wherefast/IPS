
 const handleHomeClick = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
 }
export const dataLink = [
  [
    {
    "id":0,
    "name":"Home",
    "path": "",
    "onClick" : handleHomeClick(),
    "delay":0.3,
    "isMenuPage": false
    },
    {
    "id":1,
    "name":"Package",
    "path":"#packages",
    "delay":0.4
    },
    {
    "id":2,
    "name":"Menu",
    "path":"#menu",
    "delay":0.6
    },
    {
    "id":3,
    "name":"Gallery",
    "path":"#gallery",
    "delay":0.8
    },
    {
    "id":5,
    "name":"About",
    "path":"#about",
    "delay":1
    }
  ],
    [
      {
      "id":0,
      "name":"Back To Home",
      "path":"/",
      "delay":0.3,
      "isMenuPage": true
      }
    
    ]
]