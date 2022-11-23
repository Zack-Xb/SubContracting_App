
import { useEffect,useState } from 'react';
import { StyleSheet,Image,TouchableOpacity,Text,View, Platform } from 'react-native';
import logo from '../assets/xxLogo.png';
import navData from './data/navD';
import { useNavigation } from '@react-navigation/native';
import MediaQuery from 'react-responsive';
import { Searchbar } from 'react-native-paper';


export const Navbar=()=>{
  const navigation= useNavigation();
    const[active,setActive]=useState(false);
    const[opac,setOpac]=useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const onChangeSearch = query => setSearchQuery(query);
  
    //useEffect(() => {
      //let LastScrollY = window.scrollY;
  
      //window.addEventListener("scroll", () => {
       // if (LastScrollY < window.scrollY && window.scrollY > 0) {
       //   setOpac(0);
        //} else {
          // setNavOpacity((s) => s + (s > 1 ? 0 : 0.1));/
         // setOpac(1);
       // }
        //LastScrollY = window.scrollY;
     // });
    //}, []);
  
    function handleClick() {
      setActive(!active);
    }
    
  
      return(
          <>
         
            <View style={ Platform.OS === 'web' ? style.NavN : style.Nav }>
              <TouchableOpacity onPress={()=> navigation.navigate('Home')}>
               <Image  style={style.navIcon} resizeMode={'cover'} source={logo}/>
              </TouchableOpacity>
            
              <MediaQuery minDeviceWidth={1224}>
              <Searchbar
               placeholder="Search"
               onChangeText={onChangeSearch}
               value={searchQuery}
               style={{width:'40%'}}
                />
              <View style={style.navPages}>
                {navData.map((data,i)=>(
                  <TouchableOpacity onPress={()=> navigation.navigate(data.label)} key={i}>
                     <Text style={style.navMenuT}>{data.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>
              </MediaQuery>
              <MediaQuery maxDeviceWidth={1224}>
              <Searchbar
               placeholder="Search"
               onChangeText={onChangeSearch}
               value={searchQuery}
               style={{width:'50%',marginTop:'5%'}}
                />
              <TouchableOpacity
                onPress={() => handleClick()}
                onClick={() => handleClick()}
                style={style.menuIdiv}
              >
                 <View style={active ? style.activeHam : style.hamburger} />
                <View style={active ? style.activeHam : style.hamburger} />
                <View style={active ? style.activeHam : style.hamburger} />
              </TouchableOpacity>
              </MediaQuery>
              </View>
             <View style={active ? style.activeMob : style.mobNav}>
              <View style={style.mobMenu}>
              {navData.map((data,i)=>(
                  <TouchableOpacity onPress={()=> navigation.navigate(data.label)} key={i}>
                     <Text style={style.navMenuT}>{data.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>
              </View>
            
          </>
           
      );};


  //check out mints proj, on mobile app nav should be static functional!! web app can be scroll up.

 const style = StyleSheet.create({
    Nav:{
        paddingRight:"5%",
        paddingLeft:'2%',
        paddingTop:'15%',
        display:'flex',
        flexDirection:'row',
        width:'100%',
        alignItems:'center',
        justifyContent:'space-between',
        backgroundColor:'transparent',
        height:'10%',
        
    },
    NavN:{
     padding:'1%',
      display:'flex',
      flexDirection:'row',
      width:'100%',
      alignItems:'center',
      justifyContent:'space-between',
      backgroundColor:'transparent',
      height:'10%',
  },
    ANav:{
        backgroundColor: "#222222",
        overflow: "hidden",
        opacity: 1,
    },
    hidden:{
       // animation: `${anim.hideNav} 700ms`,
    },
    navIcon:{
      width: 100,
      height:100,
    },
    navPages:{
      display:'flex',
      flexDirection:'row',
        alignItems:'center',
        width:'30%',
        justifyContent:'space-between',
        backgroundColor:'transparent',
        '@media screen and (max-width:840px)':{display:'none'}
    },
    navMenuT:{
     
        fontSize:20,
        color:'#FFFFFF',
        
        
    },
    menuIdiv:{
      
      width:30,
      paddingRight:'5%',
      marginTop:'5%',
      height:'auto'
    },
    activeHam:{
      width:30,
      height:3,
      borderRadius:5,
      
      backgroundColor:'#fff',
      transition:'all 0.5s ease-in-out',
  
      '&:before':{
          content: `''`,
          position: "absolute",
          width: 30,
          height: 3,
          background: "#fff",
          borderRadius:5,
          transition: "all 0.5s ease-in-out",
          
      },
      '&:after':{
          content: `''`,
          position: "absolute",
          width: 30,
          height: 3,
          background: "#fff",
          borderRadius:5,
          transition: "all 0.5s ease-in-out",
          
      },
    },
    hamburger:{
      width: 30,
      height: 3,
      backgroundColor: "#fff",
      margin:3,
    borderRadius: 5,
  boxShadow: "© 2px 5px rgb(255, 101, 47,.2)",
  transition: "all 0.5s ease-in-out",
  
      '&:before':{
          content: `''`,
          position: "absolute",
          width: 30,
          height: 3,
          backgroundColor: "#fff",
          borderRadius:5,
         transition: "all 0.5s ease-in-out",
       
  
     },
      '&:after':{
          content: `''`,
          position: "absolute",
          width: 30,
          height: 3,
          backgroundColor: "#fff",
          borderRadius:5,
          transition: "all 0.5s ease-in-out",
         
      }
    },
    mobNav:{
      backgroundColor:'transparent',
      width:'100%',
      minHeight:'100%',
     
      transition: "all 0.5s ease-in-out",
      display:'none',
    },
    activeMob:{
      display:'flex',
      backgroundColor:'#111111',
      width:'100%',
      height:'20%',
      transition: "all 0.5s ease-in-out",
      flexDirection:'column',
      overflow:'hidden',
      
      //animation: `${anim.mobNavX} 1s `,
    },
    mobMenu:{
      display:'flex',
      flexDirection:'column',
      height:'20%',
      width:'100%',
      paddingLeft:5,
      justifyContent:'space-between',
      alignItems:'center'
    }
    
 })     
  