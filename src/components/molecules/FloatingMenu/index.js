import { useEffect, useRef, useState } from "react";
import { FlexBox } from "../../atoms";
import styles from "./styles.module.scss"

let instances = []

const FloatingMenu = ({
  onClickOutside,
  children,
  style: propStyles,
  ...props
}) => {
  const [offsetStyles, setOffsetStyles] = useState({})
  const menu = useRef()
  
  const removeInstance = () => {
    instances = instances.filter(ins => ins !== menu)
    onClickOutside()
  }
  
  const onClickOutsideListener = (e) => {
    if (menu.current && !menu.current.contains(e.target)) {
      document.removeEventListener("mousedown", onClickOutsideListener)
      return removeInstance()
    }
  }
  
  const onKeyDownListener = (e) => {
    if (e.code === 'Escape' && instances[instances.length - 1] === menu) {
      document.removeEventListener("mousedown", onClickOutsideListener)
      return removeInstance()
    }
  }
  
  useEffect(() => {
    document.addEventListener("mousedown", onClickOutsideListener)
    document.addEventListener('keydown', onKeyDownListener)

    let offsetCoords = {
      zIndex: instances.length + (instances.length * 10 + 10)
    }
    let rect = menu.current.getBoundingClientRect()
    if (rect.top < 12) {
      offsetCoords.top = '12px'
    }
    if (rect.left < 12) {
      offsetCoords.left = '12px'
    }
    if ((rect.left + rect.width) > window.innerWidth) {
      offsetCoords.left = `${window.innerWidth - 24 - rect.width}px`
    }
    
    if (rect.top + rect.height > window.innerHeight) {
      offsetCoords.transform = `translateY(-${((rect.top + rect.height) - window.innerHeight) + 12}px)`
    }

    setOffsetStyles(offsetCoords)
    
    if (instances.length === 0 || instances[instances.length - 1] !== menu) {
      instances.push(menu)
    }
  }, [])
  
  return (
    <FlexBox column className={styles.floatingMenu} {...props} ref={menu} style={{...offsetStyles, ...propStyles}}>
      {children}
    </FlexBox>
  )
}

export default FloatingMenu;