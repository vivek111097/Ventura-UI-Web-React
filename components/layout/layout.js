import ButtonUI from "../ui/Button.component"


const Layout = (props) => {
  
  return (
    <>
      {/* {props.isAuth && <ButtonUI />} */}
         <main>{props.children}</main>
    </>
  )
}

export default Layout