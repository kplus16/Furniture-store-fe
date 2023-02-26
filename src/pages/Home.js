import { motion } from "framer-motion"
import { useContext } from "react"
import { UserContext } from "../context/UserContext"
import "@google/model-viewer";
import Chair from "../assets/objects/Chair.glb";
import Couch from "../assets/objects/Couch.glb";
import Table from "../assets/objects/Table.glb";


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
            <div className="threedimension-container left">
                <model-viewer
                    src={Couch} 
                    camera-controls
                >
                </model-viewer>
                <h1>This is a Couch Buy now</h1>
            </div>
            <div className="threedimension-container right">
                <model-viewer
                    src={Table} 
                    camera-orbit="90deg"
                    camera-controls
                >
                </model-viewer>
                
                <h1>This is a Table Buy now</h1>
            </div>
            <div className="threedimension-container left">
                <model-viewer
                    src={Chair} 
                    camera-orbit="180deg"
                    camera-controls
                >
                </model-viewer>
                
                <h1>This is a Chair Buy now</h1>
            </div>
        </motion.div>
    )
}