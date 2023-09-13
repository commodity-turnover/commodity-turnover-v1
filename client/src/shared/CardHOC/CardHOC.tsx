import styles from "./cardHOC.module.scss"

const CardHOC = (props:any) => {
  return (
    <div className={styles.cardHOC}>
        {props.children}
    </div>
  )
}

export default CardHOC