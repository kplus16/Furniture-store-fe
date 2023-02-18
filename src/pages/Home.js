import { motion } from "framer-motion"
import { useContext } from "react"
import { UserContext } from "../context/UserContext"

export default function Home(){
    const { user } = useContext(UserContext);
    return (
        <motion.div 
            className="home"

            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            >
                <h1>Home page</h1>
                <h1>{user}</h1>
        </motion.div>
    )
}