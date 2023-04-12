import igniteLogo from '../assets/ignite-logo.svg'

console.log(igniteLogo)

import styles from './Header.module.css'

export const Header = () => {
  return (
    <header className={styles.header}>
        <img src={igniteLogo} alt="Logotipo do Ignite" />
    </header>
    )
}
