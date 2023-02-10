import { motion } from "framer-motion"

export default function Home(){
    
    return (
        <motion.div 
            className="home"

            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            >
                <h1>Home page</h1>
        </motion.div>
    )
}