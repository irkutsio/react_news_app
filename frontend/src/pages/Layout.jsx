import { Outlet, useNavigation } from "react-router-dom"
import MainNavigation from "../components/MainNavigation"

export const Layout = () => {

  // const navigation = useNavigation()

  // console.log(navigation.state)



  return <>
  <MainNavigation/>
  <main>
    {/* {navigation.state === 'loading' && <p>...loading</p>} */}
    <Outlet/>
  </main>
  </>
}