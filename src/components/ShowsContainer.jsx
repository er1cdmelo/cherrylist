import styles from "./ShowsContainer.module.css"


const ShowsContainer = (props) => {
  return (
    <div className={styles.container}>
        <h2>{props.title}</h2>
        <div className={styles.subcontainer}>{props.children}</div>
    </div>
  )
}

export default ShowsContainer