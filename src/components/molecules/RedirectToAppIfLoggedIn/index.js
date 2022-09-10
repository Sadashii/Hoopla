import { useRouter } from "next/router";
import { useEffect } from "react";
import UserHelper from "../../../helper/UserHelper";

const RedirectToAppIfLoggedIn = () => {
  const user = UserHelper.getUser()
  const router = useRouter()
  
  
  useEffect(() => {
    if (user) {
      router.push('/app')
    }
  }, [])

  return (
    <></>
  )
}

export default RedirectToAppIfLoggedIn;