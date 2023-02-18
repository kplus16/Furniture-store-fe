import { motion } from "framer-motion"
import "@google/model-viewer";
import Couch from "../assets/objects/Couch.glb";

export default function Pricing(){
    
    return (
        <motion.div 
            className="pricing"

            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            >
                <h1>Products</h1>
                <model-viewer
                    src={Couch} 
                    camera-controls
                ></model-viewer>
        </motion.div>
    )
}