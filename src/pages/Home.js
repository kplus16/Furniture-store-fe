import { motion } from "framer-motion"
import { useContext } from "react"
import { UserContext } from "../context/UserContext"
import "@google/model-viewer";
import Chair from "../assets/objects/Chair.glb";
import Couch from "../assets/objects/Couch.glb";
import Table from "../assets/objects/Table.glb";

import { Link } from "react-router-dom";


export default function Home(){
    const { user } = useContext(UserContext);

    return (
        <motion.div 
            className="home"

            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            >
            <div className="home-section">
            <div>
                <h1>This.Sofa <Link className="product-link" to="/products">Buy now</Link></h1>
                <h4>Sleeper sofa</h4>
                <h4>Width: 225 cm</h4>
                <h4>Depth: 105 cm</h4>
                <h4>Height: 83 cm</h4>
            </div>
            <div>
                <model-viewer
                    src={Couch} 
                    camera-controls
                    camera-orbit="40deg 75deg 1.75m"
                >
                </model-viewer>
            </div>
            </div>
            <div className="home-section">
                <div>
                    <model-viewer
                        src={Table} 
                        camera-orbit="55deg 75deg 1.75m"
                        camera-controls
                    >
                    </model-viewer>
                </div>
                <div className="right">
                    <h1>This.Table <Link className="product-link" to="/products">Buy now</Link></h1>
                    <h4>Material: Nara</h4>
                    <h4>Length: 120 cm</h4>
                    <h4>Width: 60 cm</h4>
                    <h4>Height: 73 cm</h4>
                </div>
                
            </div>
            <div className="home-section">
                <div>
                    <h1>This.Chair <Link className="product-link" to="/products">Buy now</Link></h1>
                    <h4>Color: Blue</h4>
                    <h4>Width: 39 cm</h4>
                    <h4>Depth: 47 cm</h4>
                    <h4>Height: 77 cm</h4>
                </div>
                <div>
                    <model-viewer
                    src={Chair} 
                    camera-orbit="210deg 75deg 2.2m"
                    camera-controls
                >
                </model-viewer>
                </div>
            </div>
        </motion.div>
    )
}