import styles from "../App.module.css";

export default function Badge({ children, habis = false }) {
  return (
    <span className={habis ? styles.error : ""}>
      {children}
    </span>
  );
}