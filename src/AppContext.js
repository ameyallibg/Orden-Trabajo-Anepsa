  
import React, { Component } from "react";
import db from "./Fire.js";
import firebase from 'firebase';





export const AppContext = React.createContext()

 export class AppContextProvider extends Component {
    constructor(props){
        super(props)
        //Datos que se obtienen de las respuestas del formulario
        this.state ={
            vendedor:"", uge:"",  estatus:"",            
            productClave:"",
            items:[] ,
            newcontador: 0,
            mes: [],
            getDate:[],
            consulta:[],
            consultaCliente:[],
            buscador:"",
            newestatus:"",
            getName:"",
            idItem:"",
            copia:"",
            oferta:"",
            presupuesto: 0,
            comision:0,
            montoVendido:0,
            dataClientes:[],
            contClientes:[],
            nombreCliente:"", rfcCliente:"", direccionCliente:"", delegacionCliente:"", EDOCliente:"", atencion:"", telCliente:"", extTel:"",emailCliente:"",

           
            
           
        }
    this.handleSubmitCliente = this.handleSubmitCliente.bind(this);
    this.onClickItem = this.onClickItem.bind(this)
    this.onClickItemUpdate =this.onClickItemUpdate.bind(this)
    this.onClickItemCliente = this.onClickItemCliente.bind(this)
    this.onClickItemUpdateCliente =this.onClickItemUpdateCliente.bind(this)
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeDate= this.handleChangeDate.bind(this)
    this.handleChangeFound = this.handleChangeFound.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.deleteFilter = this.deleteFilter.bind(this)
    this.handleChangeSelect = this.handleChangeSelect.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleChangeSeller = this.handleChangeSeller.bind(this);
    this.handleChangeProject = this.handleChangeProject.bind(this)
    this.onDelete = this.onDelete.bind(this)
    this.onDeleteCliente = this.onDeleteCliente.bind(this)
  
    }
    //Funcion para cuando aparece el modal
    openModal() {
        this.setState({modalIsOpen: true});
      }

    closeModal() {
        this.setState({modalIsOpen: false});
      }
   //Actualizacion del estado por cada cambio de valor
    handleChange = (e)=>{
        
        this.setState({ 
            [e.target.name]:e.target.value
        },()=>{console.log(this.state)
          const montoVendido= parseInt(this.state.presupuesto) + parseInt(this.state.comision)
          this.setState({
            montoVendido: montoVendido,
           
          })
        })
        
       
        
        
    } 
    handleChangeCost = (e)=>{
        
      this.setState({ 
          [e.target.name]:e.target.value
      })
    
      
      
  } 
    onDelete(e){
       
     const newid=  e.target.id
     console.log(newid)
     db.collection("orden").where("productClave", "==", newid )
     .get()
     .then(querySnapshot => {
      querySnapshot.forEach((doc) => {
        doc.ref.delete().then(() => {
          console.log("Document successfully deleted!");
        }).catch(function(error) {
          console.error("Error removing document: ", error);
        });
      });
    })
    .catch(function(error) {
      console.log("Error getting documents: ", error);
    });
    }
    onDeleteCliente(e){
       
      const newid=  e.target.id
      console.log(newid)
      db.collection("clientes").where("clave", "==", newid )
      .get()
      .then(querySnapshot => {
       querySnapshot.forEach((doc) => {
         doc.ref.delete().then(() => {
           console.log("Document successfully deleted!");
         }).catch(function(error) {
           console.error("Error removing document: ", error);
         });
       });
     })
     .catch(function(error) {
       console.log("Error getting documents: ", error);
     });
     }


    handleChangeFound= (e)=>{
        
      const handle = e.target.value
      
      console.log(handle)
      console.log(this.state.buscador)
      if(handle === ""){
       
        db.collection("orden").onSnapshot(this.obtenerBD)
     
        }else {
          db.collection("orden").where("productClave", "==", handle )
          .get()
          .then(querySnapshot => {
              const data = querySnapshot.docs.map(doc => doc.data());
                  
                  this.setState({
                    items:data
    
                  })
                  
                  
              });
        }
      
      
  } 
  handleChangeSeller= (e)=>{
        
    const handle = e.target.value
    
    console.log(handle)
   
    if(handle === ""){
     
      db.collection("orden").onSnapshot(this.obtenerBD)
   
      }else {
        db.collection("orden").where("vendedor", "==", handle )
        .get()
        .then(querySnapshot => {
            const data = querySnapshot.docs.map(doc => doc.data());
                
                this.setState({
                  items:data
  
                })
                
                
            });
      }
    
    
} 
handleChangeProject= (e)=>{
        
  const handle = e.target.value
  
  console.log(handle)
  console.log(this.state.buscador)
  if(handle === ""){
   
    db.collection("orden").onSnapshot(this.obtenerBD)
 
    }else {
      db.collection("orden").where("uge", "==", handle )
      .get()
      .then(querySnapshot => {
          const data = querySnapshot.docs.map(doc => doc.data());
              
              this.setState({
                items:data

              })
              
              
          });
    }
  
  
} 
  handleChangeDate = (e) =>{

    const handle = e.target.value.replace(/-/g,"/")
      
    console.log(handle)
    
    if(handle === ""){
     
      db.collection("orden").onSnapshot(this.obtenerBD)
   
      }else {
        db.collection("orden").where("getNewDate", "==", handle )
        .get()
        .then(querySnapshot => {
            const data = querySnapshot.docs.map(doc => doc.data());
                
                this.setState({
                  items:data
                })         
            });
      }
  }

  handleChangeSelect = (e) =>{

    const handle = e.target.value
      
    console.log(handle)
    
    if(handle === "estatus"){
     
      db.collection("orden").onSnapshot(this.obtenerBD)
   
      }else {
        db.collection("orden").where("estatus", "==", handle )
        .get()
        .then(querySnapshot => {
            const data = querySnapshot.docs.map(doc => doc.data());
                
                this.setState({
                  items:data
  
                })
                
                
            });
      }
    
  

  }
    handleUpdate=(e) =>{

               
    const newid=  this.state.idItem
    const vendedor = this.state.vendedor
    db.collection("orden").where("productClave", "==", newid )
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            console.log(doc.id, " => ", doc.data());
            db.collection("orden").doc(doc.id).update({ vendedor: vendedor    });
        });
   })
  }

  handleSubmitCliente =(e)=>{
    e.preventDefault();
    let contador = parseInt(this.state.contClientes) + 1 ;
    
    let claveUnica;
    if( contador < 10){ 
      claveUnica =  '00'+ contador
   } else if(contador < 100 && contador >= 10){
      claveUnica =  '0'+ contador
   } else { 
      claveUnica =  contador
   }

      db.collection("clientes").add({
        
        nombre: this.state.nombreCliente,
        rfc: this.state.rfcCliente,      
        direccion: this.state.direccionCliente,
        delegacion: this.state.delegacionCliente,
        estado: this.state.EDOCliente,
        atencion:this.state.atencion,
        telefono: this.state.telCliente,
        clave: claveUnica,
        email:this.state.emailCliente,
        vendedor:this.state.getName,
        date: firebase.firestore.FieldValue.serverTimestamp(),
        getNewDate: new Date().toLocaleString(),
      })

      
     
      this.setState({
        contClientes:"",nombreCliente:"", rfcCliente:"", direccionCliente:"", delegacionCliente:"", EDOCliente:"", atencion:"", telCliente:"", extTel:"",emailCliente:"",
     }, () => {console.log(this.state.mes)})

  }
    //Validacion del for=mulario
    handleSubmit = (e)  => {
        
        e.preventDefault();
        if(!this.validate()){
            return
        }   
           
            let obtDate=  new Date().toLocaleDateString("zh-TW");   
            const ugeClave = this.state.uge.substr(0,3).toUpperCase(); 
            const dateClave = obtDate.slice(5,7).replace("/","")
            const newDate = obtDate.slice(0, 2)
            
           if(dateClave ===
             this.state.mes){
              
             let contador = parseInt(this.state.getDate) + 1 ;

             let claveUnica ;
                   
              if( contador < 10){ 
                 claveUnica = newDate+ dateClave + ugeClave + '00'+ contador
              } else if(contador < 100 && contador >= 10){
                 claveUnica = newDate + dateClave + ugeClave + '0'+ contador
              } else { 
                 claveUnica = newDate + dateClave + ugeClave + contador
              }
              
        if(this.state.rol === "admin"){
                         
          db.collection("orden").add({
            vendedor: this.state.vendedor,
            uge: this.state.uge,      
            estatus: this.state.estatus,
            productClave: claveUnica,
            contador: contador,
            mes:dateClave,
            date: firebase.firestore.FieldValue.serverTimestamp(),
            getNewDate: new Date().toLocaleString(),
         })

        

          }else{
            db.collection("orden").add({
              vendedor: this.state.getName,
              uge: this.state.uge,      
              estatus: this.state.estatus,
              productClave: claveUnica,
              contador: contador,
              mes:dateClave,
              date: firebase.firestore.FieldValue.serverTimestamp(),
              getNewDate: new Date().toLocaleString(),
           })

          }
         
          this.setState({
            vendedor:"",
            uge:"",
            fecha:"",
            estatus:"",
            productClave:"",
            newcontador: contador,
           
            

 
         }, () => {console.log(this.state.mes)})

    }
   else {
    const contador = 1;
    const claveUnica = newDate + dateClave + ugeClave + '00'+ contador

      db.collection("orden").add({
      
        vendedor: this.state.vendedor,
        uge: this.state.uge,      
        estatus: this.state.estatus,
        productClave: claveUnica,
        contador: contador,
        mes:dateClave,
        date: firebase.firestore.FieldValue.serverTimestamp(),
        getNewDate: new Date().toLocaleDateString("zh-TW"),
      
     })
    this.setState({
      vendedor:"",
      uge:"",
      fecha:"",
      estatus:"",
      productClave:"",
      newcontador: contador,
   
     

      }, () => {console.log(this.state.mes)})
    }
  }

  handleLogout(){
    firebase.auth().signOut()
    .then(result => console.log(`${result.user.email} ha salido`))
    .catch(error => console.log(`Error ${error.code}: ${error.message}`));
  }


  obtenerUser= ()=>{
    const usuario = this.state.user
    console.log(usuario)

    db.collection("usuarios").where("email","==",  usuario ).get().then(querySnapshot => {
      const data = querySnapshot.docs.map(doc => doc.data());
      
      const getUser = data[0].name
      const admin = data[0].rol
      const dataNew = data
      console.log(admin, dataNew, getUser)

            this.setState({ getName: getUser,
            rol:admin })
          }) 
   
    
  }


  obtenerBD=()=>{
        const obtRol = this.state.rol
        const obtName = this.state.getName
        console.log(obtRol, obtName)
        if(obtRol === "admin"){
    db.collection("orden").orderBy("date", "desc")
      .get()
      .then(querySnapshot => {
        const data = querySnapshot.docs.map(doc => doc.data());
        console.log(data)
        const newobj = data[0].contador
       const newmes = data[0].mes
       console.log(newobj, newmes)
        this.setState({ items: data, getDate:newobj, mes:newmes });
       
      }, console.log(this.state.items));

    } else{
      db.collection("orden").where("vendedor", "==", obtName).orderBy("date", "desc")
      .get()
      .then(querySnapshot => {
        const data = querySnapshot.docs.map(doc => doc.data());
        console.log(data)
        const newobj = data[0].contador
       const newmes = data[0].mes
       console.log(newobj, newmes)

        this.setState({ items: data ,getDate: newobj, mes:newmes});
      }, console.log(this.state.items));
    }
  }

  obtenerClientes=()=>{
    const obtRol = this.state.rol
    const obtName = this.state.getName
    console.log(obtRol, obtName)
    if(obtRol === "admin"){

            db.collection("clientes").orderBy("date", "desc")
              .get()
              .then(querySnapshot => {
                const data = querySnapshot.docs.map(doc =>  doc.data())
                  const news = data[0].contador
                this.setState({ dataClientes:data, contClientes: news});
                
              
              }, console.log(this.state.dataClientes));

            } else{
              db.collection("clientes").where("vendedor", "==", obtName).orderBy("date", "desc")
              .get()
              .then(querySnapshot => {
               const data =  querySnapshot.docs.map(doc => doc.data());
                console.log(data)
                 const news = data[0].contador
                this.setState({ dataClientes:data, contClientes:news});
              }, console.log(this.state.dataClientes));
            }
            }



    componentDidMount() {
      const user =  firebase.auth().currentUser.email
      this.setState({
        user:user,
        dateNew: new Date().toLocaleDateString()
      })
    
      db.collection("usuarios").onSnapshot(this.obtenerUser)
      
      setTimeout(()=>{db.collection("orden").onSnapshot(this.obtenerBD)
      
    
    },2000)
    setTimeout(()=>{
    db.collection("clientes").onSnapshot(this.obtenerClientes)
  
  },2000)
      }
    

    onClickItem(e){
      
      
     let newid=  e.target.id
     console.log(newid)

      db.collection("orden").where("productClave", "==", newid)
      .get()
      .then(querySnapshot => {
        const data = querySnapshot.docs.map(doc => doc.data());
            
            console.log(data);
            this.setState({ consulta: data , modalIsOpen:true})
            
        });
    
       
          

    }
    onClickItemUpdate(e){
      
      
      let newid=  e.target.id
       db.collection("orden").where("productClave", "==", newid)
     .get()
     .then(querySnapshot => {
         const data = querySnapshot.docs.map(doc => doc.data());
         const ven= data.vendedor
         console.log(data
          )
            
             this.setState({ idItem:newid, consulta: data ,  vendedor:ven,  modalIsOpen:true})
             
         });
     
        
           
 
     }
     onClickItemCliente(e){
      
      
      let newid=  e.target.id
      console.log(newid)
 
       db.collection("clientes").where("clave", "==", newid)
       .get()
       .then(querySnapshot => {
         const data = querySnapshot.docs.map(doc => doc.data());
             
             console.log(data);
             this.setState({ consultaCliente: data , modalIsOpen:true})
             
         });
     
        
           
 
     }
     onClickItemUpdateCliente(e){
       
       
       let newid=  e.target.id
        db.collection("clientes").where("clave", "==", newid)
      .get()
      .then(querySnapshot => {
          const data = querySnapshot.docs.map(doc => doc.data());
          const ven= data.vendedor
          console.log(data
           )
             
              this.setState({ idItem:newid, consultaCliente: data ,  vendedor:ven,  modalIsOpen:true})
              
          });
      
         
            
  
      }
    deleteFilter() {
      document.getElementsByName("estatus")[0].value  = "";
      document.getElementsByName("buscador")[0].value = "";
      document.getElementsByName("fechaBuscador")[0].value = "";
      document.getElementsByName("nombreVendedor")[0].value= "";
      document.getElementsByName("tipoProyecto")[0].value="";
      db.collection("orden").onSnapshot(this.obtenerBD)

    
    }
    
    validate(){
        const state = this.state.uge
       
        if(state === '' ){
            this.setState({
                modalIsOpen:true,
                message:'Contesta los campos obligatorios'

            })
              
                return   false
         

           
        }
       
        this.setState({
          modalIsOpen:true,
          message:'Se ha enviado correctamente'

      })
        return true
    }
    //Generador de clave unica

    

  
    render() {
        const {newOrder, list,dataClientes, items, consulta, getName, user, dateNew, message, rol, montoVendido, comision, presupuesto} = this.state;
      return (
        <AppContext.Provider
        value={{
        
          onClickItem: this.onClickItem,
          onClickItemUpdate: this.onClickItemUpdate,
          handleChange: this.handleChange,
          handleChangeFound: this.handleChangeFound,
          handleChangeDate: this.handleChangeDate,
          handleChangeSeller:this.handleChangeSeller,
          handleChangeProject:this.handleChangeProject,
          handleChangeSelect: this.handleChangeSelect,
          handleSubmitCliente: this.handleSubmitCliente,
          deleteFilter: this.deleteFilter,
          handleSubmit: this.handleSubmit ,
          handleLogout:this.handleLogout,
          productClave:this.state.productClave,
          modalIsOpen:this.state.modalIsOpen,
          openModal:this.openModal,
          closeModal:this.closeModal,
          handleUpdate:this.handleUpdate,
          onDelete: this.onDelete,
          onDeleteCliente: this.onDeleteCliente,
          rol,
          message,
          newOrder,
          list,
          items,
          dataClientes,
          consulta,
          getName,
          user,
          dateNew,
          montoVendido,
          comision,
          presupuesto,
         

        }}
        >
          {this.props.children}

        </AppContext.Provider>
      );
    }
  }
 
  export const AppContextConsumer = AppContext.Consumer;