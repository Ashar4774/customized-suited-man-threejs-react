import React, { useRef, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

const MODEL_PATH = "/man_in_suit.glb"; // Replace with your model URL

function ManModel({ colors }) {
    const { scene } = useGLTF(MODEL_PATH);
    const modelRef = useRef();

    useEffect(() => {
        scene.traverse((child) => {
            if (child.isMesh) {
                if (child.name.toLowerCase().includes("coat")) {
                    child.material.color.set(colors.coat);
                } else if (child.name.toLowerCase().includes("suit_suit")) {
                    child.material.color.set(colors.pants);
                } else if (child.name.toLowerCase().includes("shirt")) {
                    child.material.color.set(colors.shirt);
                } else if (child.name.toLowerCase().includes("tie")) {
                    child.material.color.set(colors.tie);
                }
            }
        });
    }, [colors, scene]);

    return <primitive object={scene} ref={modelRef} scale={1.5} position={[0, 0, 0]} />;
}

export default function ManWithSuit() {
    const [colors, setColors] = useState({
        coat: "#0000FF", // Default Blue
        pants: "#000000", // Default Black
        shirt: "#FFFFFF", // Default White
        tie: "#FF0000", // Default Red
    });

    const handleColorChange = (part, color) => {
        setColors((prev) => ({ ...prev, [part]: color }));
    };

    return (
        <div style={{ width: "100vw", height: "100vh", background: "#f1f1f1" }}>
            <Canvas camera={{ position: [0, 3, 7], fov: 45 }} shadows>
                <ambientLight intensity={0.6} />
                <directionalLight position={[5, 10, 5]} intensity={1.2} castShadow />
                <ManModel colors={colors} />
                <OrbitControls enablePan={false} />
            </Canvas>

            <div style={{ position: "absolute", bottom: 20, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", gap: "10px" }}>
                {["coat", "pants", "shirt", "tie"].map((part) => (
                    <div key={part} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <label style={{ color: "#333" }}>{part.toUpperCase()}:</label>
                        {["#000000", "#0000FF", "#FF0000", "#008000", "#800080", "#FFFFFF"].map((color) => (
                            <button
                                key={color}
                                style={{ background: color, width: "40px", height: "40px", border: "2px solid white", cursor: "pointer" }}
                                onClick={() => handleColorChange(part, color)}
                            />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}
