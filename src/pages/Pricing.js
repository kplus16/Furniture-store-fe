import { motion } from "framer-motion"

export default function Pricing(){
    
    return (
        <motion.div 
            className="pricing"

            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            >
                <h1>Pricing</h1>
        </motion.div>
    )
}