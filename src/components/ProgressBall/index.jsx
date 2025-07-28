import { useEffect, useState } from "react"
import styles from "./ProgressBall.module.css"

function ProgressBall() {
    const [progress, setProgress] = useState(0)
    const [isOnline, setIsOnline] = useState(navigator.onLine)

    // Simulación de carga progresiva
    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                const next = Math.min(prev + Math.random() * 10, 100)
                return next
            })
        }, 300)
        return () => clearInterval(interval)
    }, [])

    // Detectar estado online/offline
    useEffect(() => {
        const handleOnline = () => setIsOnline(true)
        const handleOffline = () => setIsOnline(false)

        window.addEventListener("online", handleOnline)
        window.addEventListener("offline", handleOffline)

        return () => {
            window.removeEventListener("online", handleOnline)
            window.removeEventListener("offline", handleOffline)
        }
    }, [])

    return (
        <div className={styles.wrapper}>
            <div
                className={styles.ball}
                style={{
                    "--progress": `${progress}%`,
                    "--color": isOnline ? "#00c85381" : "#d500007b",
                }}
            ></div>
        </div>
    )
}

export default ProgressBall
